'use client';

import React from 'react';
import { Article } from '@/lib/data';
import { useAtlas } from '@/lib/AtlasContext';
import { Star, User, Stethoscope, Atom } from 'lucide-react';

const DIFFICULTY_COLORS: Record<Article['difficulty'], string> = {
  fondamental: 'bg-teal3 text-teal border-teal/20',
  intermédiaire: 'bg-[#4a5a7833] text-text3 border-[#4a5a784d]',
  avancé: 'bg-gold3 text-gold border-gold/20',
};

function getAudienceIcon(aud: string) {
  switch (aud) {
    case 'patient':
      return <User className="w-3 h-3 text-blue-400" aria-hidden="true" />;
    case 'medecin_non_nuc':
      return <Stethoscope className="w-3 h-3 text-teal" aria-hidden="true" />;
    case 'medecin_nuc':
      return <Atom className="w-3 h-3 text-atom" aria-hidden="true" />;
    default:
      return null;
  }
}

function getAudienceTooltip(aud: string) {
  switch (aud) {
    case 'patient':
      return 'Patient';
    case 'medecin_non_nuc':
      return 'Médecin (non MN)';
    case 'medecin_nuc':
      return 'Médecin Nucléaire';
    default:
      return '';
  }
}

export function ArticleCard({ article }: { article: Article }) {
  const { openArticle, dbUser, toggleFavorite } = useAtlas();
  const isFavorite = dbUser?.favorites?.includes(article.id) || false;
  const diffColor = DIFFICULTY_COLORS[article.difficulty] ?? DIFFICULTY_COLORS.intermédiaire;

  return (
    <article
      className="bg-bg2 border border-border-main rounded-[10px] p-5 transition-all relative overflow-hidden hover:bg-bg3 hover:border-teal/25 hover:-translate-y-px group flex flex-col h-full focus-within:ring-2 focus-within:ring-teal"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex justify-between items-start mb-2.5 gap-2">
        <div className="font-mono text-[9px] text-text3 tracking-[1px] truncate flex-1" title={article.id}>
          {article.id}
        </div>
        <div className="flex gap-2 items-center shrink-0">
          {article.targetAudience && article.targetAudience.length > 0 && (
            <div
              className="flex gap-1 mr-1 bg-bg3 px-1.5 py-0.5 rounded-full border border-border-main shrink-0"
              aria-label="Publics ciblés"
            >
              {article.targetAudience.map((aud) => (
                <span key={aud} title={getAudienceTooltip(aud)}>
                  {getAudienceIcon(aud)}
                  <span className="sr-only">{getAudienceTooltip(aud)}</span>
                </span>
              ))}
            </div>
          )}
          <span className={`text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border shrink-0 ${diffColor}`}>
            {article.difficulty}
          </span>
          {dbUser && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void toggleFavorite(article.id);
              }}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? `Retirer "${article.title}" des favoris` : `Ajouter "${article.title}" aux favoris`}
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              className={`p-1 rounded-full transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-gold ${isFavorite ? 'text-gold' : 'text-text3 hover:text-gold'}`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => openArticle(article.id)}
        className="text-left flex flex-col flex-1 focus:outline-none"
        aria-label={`Ouvrir l'article : ${article.title}`}
      >
        <div className="text-[10px] text-teal font-mono tracking-[1px] mb-1.5 line-clamp-1">{article.catLabel}</div>
        <h3 className="font-serif text-[19px] leading-[1.25] mb-2 line-clamp-2 text-text-main group-hover:text-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-[11px] text-text3 leading-[1.6] line-clamp-3 mb-3">{article.excerpt}</p>

        <div className="flex gap-1 flex-wrap mt-auto pt-3 border-t border-border-main">
          {article.tags && article.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border bg-teal3 text-teal border-teal/20 truncate max-w-full"
            >
              {t}
            </span>
          ))}
        </div>
      </button>
    </article>
  );
}
