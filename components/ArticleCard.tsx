'use client';

import React from 'react';
import { Article } from '@/lib/data';
import { useAtlas } from '@/lib/AtlasContext';
import { Star, User, Stethoscope, Atom } from 'lucide-react';

export function ArticleCard({ article }: { article: Article }) {
  const { openArticle, dbUser, toggleFavorite } = useAtlas();
  const isFavorite = dbUser?.favorites?.includes(article.id) || false;

  const diffColor = {
    fondamental: 'bg-teal3 text-teal border-teal/20',
    intermédiaire: 'bg-[#4a5a7833] text-text3 border-[#4a5a784d]',
    avancé: 'bg-gold3 text-gold border-gold/20'
  }[article.difficulty] || 'bg-[#4a5a7833] text-text3 border-[#4a5a784d]';

  const getAudienceIcon = (aud: string) => {
    switch (aud) {
      case 'patient': return <User className="w-3 h-3 text-blue-400" />;
      case 'medecin_non_nuc': return <Stethoscope className="w-3 h-3 text-teal" />;
      case 'medecin_nuc': return <Atom className="w-3 h-3 text-atom" />;
      default: return null;
    }
  };

  const getAudienceTooltip = (aud: string) => {
    switch (aud) {
      case 'patient': return 'Patient';
      case 'medecin_non_nuc': return 'Médecin (Non MN)';
      case 'medecin_nuc': return 'Médecin Nucléaire';
      default: return '';
    }
  };

  return (
    <div
      onClick={() => openArticle(article.id)}
      className="bg-bg2 border border-border-main rounded-[10px] p-5 cursor-pointer transition-all relative overflow-hidden hover:bg-bg3 hover:border-teal/25 hover:-translate-y-px group flex flex-col h-full"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      <div className="flex justify-between items-start mb-2.5">
        <div className="font-mono text-[9px] text-text3 tracking-[1px]">{article.id}</div>
        <div className="flex gap-2 items-center">
          {article.targetAudience && article.targetAudience.length > 0 && (
            <div className="flex gap-1 mr-1 bg-bg3 px-1.5 py-0.5 rounded-full border border-border-main">
              {article.targetAudience.map(aud => (
                <div key={aud} title={getAudienceTooltip(aud)}>
                  {getAudienceIcon(aud)}
                </div>
              ))}
            </div>
          )}
          <span className={`text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border ${diffColor}`}>
            {article.difficulty}
          </span>
          {dbUser && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(article.id);
              }}
              className={`p-1 rounded-full transition-colors ${isFavorite ? 'text-gold' : 'text-text3 hover:text-gold'}`}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>
      
      <div className="text-[10px] text-teal font-mono tracking-[1px] mb-1.5">{article.catLabel}</div>
      <div className="font-serif text-[19px] leading-[1.25] mb-2">{article.title}</div>
      <div className="text-[11px] text-text3 leading-[1.6] line-clamp-3 flex-1">{article.excerpt}</div>
      
      <div className="flex gap-1 flex-wrap mt-3.5 pt-3 border-t border-border-main">
        {article.tags.slice(0, 3).map(t => (
          <span key={t} className="text-[9px] px-[7px] py-[2px] rounded-[3px] font-mono tracking-[0.5px] border bg-teal3 text-teal border-teal/20">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
