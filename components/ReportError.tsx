'use client';

import React from 'react';
import { Flag } from 'lucide-react';

const CONTACT_EMAIL = 'contact@nucleatlas.org';

/**
 * Bouton discret en pied d'article « Signaler une erreur ».
 *
 * Ouvre un simple lien `mailto:` vers l'adresse de contact du site, avec un
 * sujet pré-rempli identifiant l'article concerné. Volontairement sans backend :
 * pas de nouvelle collection Firestore ni de règle à maintenir.
 */
export function ReportError({
  articleId,
  articleTitle,
}: {
  articleId: string;
  articleTitle?: string;
}) {
  const subject = encodeURIComponent(`Signalement — ${articleId}`);
  const body = encodeURIComponent(
    [
      `Article : ${articleTitle ?? articleId} (${articleId})`,
      `URL : ${typeof window !== 'undefined' ? window.location.href : ''}`,
      '',
      'Décrivez l’erreur ou l’imprécision repérée :',
      '',
    ].join('\n')
  );
  const href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <div className="mt-10 pt-6 border-t border-border-main flex justify-center">
      <a
        href={href}
        className="inline-flex items-center gap-2 text-[11px] text-text3 hover:text-teal transition-colors font-mono tracking-[0.5px]"
        title="Signaler une erreur ou une imprécision dans cet article"
      >
        <Flag className="w-3.5 h-3.5" aria-hidden="true" />
        Signaler une erreur
      </a>
    </div>
  );
}
