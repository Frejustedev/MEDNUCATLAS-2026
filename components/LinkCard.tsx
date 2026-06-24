'use client';

import React from 'react';
import { Badge } from './Badge';
import type { RelatedLink } from '@/lib/data';

const GROUPS: { type: RelatedLink['type']; title: string; tone: 'gold' | 'red' | 'teal' | 'purple' | 'blue' }[] = [
  { type: 'traceur', title: 'Traceurs', tone: 'gold' },
  { type: 'maladie', title: 'Maladies', tone: 'red' },
  { type: 'examen', title: 'Examens', tone: 'teal' },
  { type: 'score', title: 'Scores', tone: 'purple' },
  { type: 'theranostique', title: 'Théranostique', tone: 'blue' },
];

/**
 * Carte de liens typés (gabarit §25 — « la carte ») : réseau des entités
 * connectées (traceurs, maladies, examens, scores) en clôture d'article.
 */
export function LinkCard({ links }: { links?: RelatedLink[] }) {
  if (!links || links.length === 0) return null;
  return (
    <section aria-label="Carte de liens de l'article" className="mt-10 pt-6 border-t border-border-main">
      <h4 className="font-mono text-[10px] tracking-[2px] uppercase text-text3 mb-3">Carte de liens</h4>
      <div className="space-y-2.5">
        {GROUPS.map(({ type, title, tone }) => {
          const items = links.filter((l) => l.type === type);
          if (items.length === 0) return null;
          return (
            <div key={type} className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-text3 w-24 shrink-0">{title}</span>
              {items.map((l, i) =>
                l.href ? (
                  <a key={i} href={l.href} className="no-underline focus:outline-none focus:ring-2 focus:ring-teal rounded-full">
                    <Badge tone={tone}>{l.label}</Badge>
                  </a>
                ) : (
                  <Badge key={i} tone={tone}>{l.label}</Badge>
                )
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
