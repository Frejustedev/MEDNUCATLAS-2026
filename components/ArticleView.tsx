'use client';

import React, { useEffect, useState } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { ArrowLeft, Sparkles, Info, AlertTriangle, Lightbulb, Star, User, Stethoscope, Atom, ShieldCheck, ShieldAlert } from 'lucide-react';
import { AiAssistant } from './AiAssistant';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { useParams } from 'next/navigation';

// Sanitiseur SVG isomorphe sans dépendance (s'exécute serveur ET client).
// Les figures proviennent de sources contrôlées (seed + admin authentifié) ;
// on retire par prudence script, foreignObject, handlers inline et URLs javascript.
function sanitizeSvg(svg: string): string {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|xlink:href)\s*=\s*("\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, '');
}

export function ArticleView() {
  const { showCategory, articleMode, setArticleMode, articles, userProfile, dbUser, toggleFavorite } = useAtlas();
  const params = useParams();
  const currentArticle = params.id as string;
  const [isAiOpen, setIsAiOpen] = useState(false);
  
  const article = articles.find(e => e.id === currentArticle);
  if (!article) return null;

  // Mode demandé ; si vide (article ciblant d'autres profils), on bascule
  // vers le premier mode disposant de contenu pour ne pas afficher une page vide.
  const content =
    article.content[articleMode]?.sections?.length
      ? article.content[articleMode]
      : [article.content.medecin_nuc, article.content.medecin_non_nuc, article.content.patient].find(
          (c) => c?.sections?.length
        ) ?? article.content[articleMode];
  const isFavorite = dbUser?.favorites?.includes(article.id) || false;

  const scrollToSection = (i: number) => {
    const el = document.getElementById(`sec-${i}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getAudienceIcon = (aud: string) => {
    switch (aud) {
      case 'patient': return <User className="w-3 h-3 text-blue-400" />;
      case 'medecin_non_nuc': return <Stethoscope className="w-3 h-3 text-teal" />;
      case 'medecin_nuc': return <Atom className="w-3 h-3 text-atom" />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden animate-in fade-in duration-300 relative">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12">
        <button
          onClick={() => showCategory(article.cat)}
          className="inline-flex items-center gap-2 text-xs text-text3 cursor-pointer mb-8 transition-colors hover:text-teal bg-transparent border-none font-sans"
        >
          <ArrowLeft className="w-3 h-3" /> Retour à {article.catLabel}
        </button>

        <div className="mb-7">
          <div className="font-mono text-[10px] text-text3 tracking-[2px] mb-2">{article.id}</div>
          <div className="text-[11px] text-teal font-mono tracking-[1.5px] uppercase mb-3">{article.catLabel}</div>
          <div className="flex items-start justify-between mb-4">
            <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.1]">
              {article.title}
            </h1>
            {dbUser && (
              <button 
                onClick={() => toggleFavorite(article.id)}
                className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-gold/10 text-gold' : 'bg-bg2 text-text3 hover:text-gold hover:bg-gold/5'}`}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap mb-6 items-center">
            {article.tags.map(t => (
              <span key={t} className="text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border bg-teal3 text-teal border-teal/20">
                {t}
              </span>
            ))}
            <span className="text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border bg-gold3 text-gold border-gold/20 mr-1">
              {article.difficulty}
            </span>
            {article.targetAudience && article.targetAudience.map(aud => (
              <span key={aud} className="flex items-center gap-1.5 text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border bg-bg3 text-text3 border-border-main">
                {getAudienceIcon(aud)}
                {aud === 'patient' ? 'Patient' : aud === 'medecin_nuc' ? 'Médecin Nucléaire' : 'Médecin (Non MN)'}
              </span>
            ))}
          </div>
        </div>

        {/* Statut de relecture médicale — transparence éditoriale */}
        {(() => {
          const status = article.reviewStatus ?? 'ai_assisted';
          if (status === 'reviewed') {
            return (
              <div className="mb-4 flex items-start gap-3 p-3 rounded-lg border bg-teal/10 border-teal/20 text-teal" role="status">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-[13px] leading-relaxed">
                  <span className="font-medium">Contenu relu et validé médicalement</span>
                  {article.reviewedBy ? ` — par ${article.reviewedBy}` : ''}
                  {article.reviewedAt ? ` le ${new Date(article.reviewedAt).toLocaleDateString('fr-FR')}` : ''}.
                </div>
              </div>
            );
          }
          return (
            <div className="mb-4 flex items-start gap-3 p-3 rounded-lg border bg-orange-500/10 border-orange-500/20 text-orange-400" role="status">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-[13px] leading-relaxed">
                <span className="font-medium">Contenu rédigé avec assistance IA, en cours de relecture par un médecin nucléaire.</span>{' '}
                Vérifiez les informations critiques auprès des sources de référence (EANM, SNMMI, HAS).
              </div>
            </div>
          );
        })()}

        {/* Avertissement médical permanent */}
        <div className="mb-6 flex items-start gap-2.5 p-3 rounded-lg bg-bg2 border border-border-main text-text3">
          <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-[12px] leading-relaxed">
            Information à visée éducative et informative. Ne remplace pas une consultation, un diagnostic
            ou l&apos;avis d&apos;un médecin spécialiste. <a href="/mentions-legales" className="underline hover:text-teal">En savoir plus</a>.
          </p>
        </div>

        <div className="flex items-center gap-3 mb-8 p-3 bg-bg2 rounded-lg border border-border-main flex-wrap">
          {userProfile !== 'patient' && (
            <>
              <span className="text-[11px] text-text3">Mode lecture :</span>
              {userProfile === 'medecin_nuc' || userProfile === 'admin' ? (
                <button
                  onClick={() => setArticleMode('medecin_nuc')}
                  className={`px-4 py-1.5 rounded-[5px] text-[11px] font-mono cursor-pointer border-none transition-all tracking-[0.5px] ${
                    articleMode === 'medecin_nuc' ? 'bg-teal text-bg' : 'bg-transparent text-text3 hover:text-text-main'
                  }`}
                >
                  ⚛️ Médecin Nucléaire
                </button>
              ) : null}
              <button
                onClick={() => setArticleMode('medecin_non_nuc')}
                className={`px-4 py-1.5 rounded-[5px] text-[11px] font-mono cursor-pointer border-none transition-all tracking-[0.5px] ${
                  articleMode === 'medecin_non_nuc' ? 'bg-teal2 text-bg' : 'bg-transparent text-text3 hover:text-text-main'
                }`}
              >
                🩺 Médecin (Non MN)
              </button>
              <button
                onClick={() => setArticleMode('patient')}
                className={`px-4 py-1.5 rounded-[5px] text-[11px] font-mono cursor-pointer border-none transition-all tracking-[0.5px] ${
                  articleMode === 'patient' ? 'bg-gold text-bg' : 'bg-transparent text-text3 hover:text-text-main'
                }`}
              >
                👤 Patient
              </button>
            </>
          )}
          <button
            onClick={() => setIsAiOpen(true)}
            className={`${userProfile === 'patient' ? '' : 'ml-auto'} px-4 py-1.5 rounded-[5px] text-[11px] font-mono cursor-pointer border border-teal/30 text-teal hover:bg-teal/10 transition-all flex items-center gap-2`}
          >
            <Sparkles className="w-3 h-3" /> Assistant IA
          </button>
        </div>

        <div className="text-[15px] text-text2 leading-[1.75] border-l-2 border-teal pl-4 mb-9 prose dark:prose-invert prose-teal max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{article.content.lead || ''}</ReactMarkdown>
        </div>

        {content?.sections?.map((s, i) => (
          <div key={i} className="mb-8" id={`sec-${i}`}>
            <h3 className="font-serif text-[22px] font-normal mb-3 text-text-main pb-2 border-b border-border-main">
              {s.title}
            </h3>
            {s.text && (
              <div className="text-[14px] text-text2 leading-[1.8] mb-3 prose dark:prose-invert prose-teal max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{s.text}</ReactMarkdown>
              </div>
            )}

            {s.figure && (s.figure.svg || s.figure.imageUrl) && (
              <figure className="my-7">
                {s.figure.svg ? (
                  <div
                    className="w-full overflow-x-auto rounded-xl border border-border-main bg-bg2 p-4 md:p-6 flex justify-center text-text-main [&_svg]:max-w-full [&_svg]:h-auto"
                    role="img"
                    aria-label={s.figure.alt}
                    dangerouslySetInnerHTML={{ __html: sanitizeSvg(s.figure.svg) }}
                  />
                ) : null}
                {s.figure.caption && (
                  <figcaption className="text-[11px] text-text3 mt-2.5 text-center italic px-4">
                    {s.figure.caption}
                  </figcaption>
                )}
              </figure>
            )}

            {s.infoBox && (
              <div className={`my-6 p-4 rounded-lg border flex gap-4 ${
                s.infoBox.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                s.infoBox.type === 'warning' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                'bg-teal/10 border-teal/20 text-teal'
              }`}>
                <div className="shrink-0 mt-1">
                  {s.infoBox.type === 'info' && <Info className="w-5 h-5" />}
                  {s.infoBox.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                  {s.infoBox.type === 'tip' && <Lightbulb className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-[13px] mb-1">{s.infoBox.title}</h4>
                  <div className="text-[13px] leading-relaxed opacity-90 prose dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{s.infoBox.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {s.stats && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                {s.stats.map((stat, idx) => (
                  <div key={idx} className="bg-bg2 border border-border-main rounded-lg p-4 text-center flex flex-col justify-center min-h-[100px]">
                    <div className="text-2xl font-light text-teal mb-2">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-text3 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {s.steps && (
              <div className="my-6 space-y-3">
                {s.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 bg-bg2 p-4 rounded-lg border border-border-main">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-teal/10 text-teal flex items-center justify-center font-mono text-sm border border-teal/20">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[14px] text-text-main mb-1">{step.title}</h4>
                      <div className="text-[13px] text-text2 leading-relaxed prose dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{step.text}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {s.list && (
              <ul className="flex flex-col gap-2 my-3">
                {s.list.map((l, j) => (
                  <li key={j} className="text-[13px] text-text2 leading-[1.6] pl-5 relative before:content-['▸'] before:absolute before:left-0 before:text-teal before:text-[10px] before:top-[3px]">
                    <span className="prose dark:prose-invert max-w-none"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{l}</ReactMarkdown></span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {content?.table && (
          <div className="mb-8">
            <h3 className="font-serif text-[22px] font-normal mb-3 text-text-main pb-2 border-b border-border-main">
              Données de référence
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-4 text-xs">
                <thead>
                  <tr>
                    {content.table.headers.map((h, i) => (
                      <th key={i} className="text-left p-2 px-3 bg-bg3 text-text3 font-mono text-[10px] tracking-[1px] border-b border-border-main">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.table.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-bg3 transition-colors">
                      {r.map((c, j) => (
                        <td key={j} className="p-2 px-3 border-b border-teal/5 text-text2 align-top">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(article.authors || article.sources) && (
          <div className="mt-12 pt-8 border-t border-border-main">
            {article.authors && article.authors.length > 0 && (
              <div className="mb-6">
                <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-text3 mb-2">Auteur(s)</h4>
                <div className="flex flex-wrap gap-2">
                  {article.authors.map((author, idx) => (
                    <span key={idx} className="text-[12px] text-text2 bg-bg2 px-3 py-1 rounded-md border border-border-main">
                      {author}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {article.sources && article.sources.length > 0 && (
              <div>
                <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-text3 mb-2">Sources & Références</h4>
                <ul className="flex flex-col gap-1.5">
                  {article.sources.map((source, idx) => (
                    <li key={idx} className="text-[12px] text-text2 flex items-start gap-2">
                      <span className="text-teal mt-0.5">▸</span>
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-teal hover:underline transition-colors">
                          {source.title}
                        </a>
                      ) : (
                        <span>{source.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-[200px] shrink-0 p-8 px-5 border-l border-border-main overflow-y-auto hidden lg:block">
        <div className="font-mono text-[9px] tracking-[2px] uppercase text-text3 mb-3">Sommaire</div>
        {content?.sections?.map((s, i) => (
          <div
            key={i}
            onClick={() => scrollToSection(i)}
            className="text-[11px] text-text3 py-1 cursor-pointer transition-colors border-l-2 border-transparent pl-2 hover:text-teal"
          >
            {s.title}
          </div>
        ))}
      </div>

      {isAiOpen && (
        <AiAssistant article={article} onClose={() => setIsAiOpen(false)} userProfile={userProfile} />
      )}
    </div>
  );
}
