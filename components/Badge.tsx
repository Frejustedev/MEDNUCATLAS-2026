'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

type Tone = 'teal' | 'gold' | 'blue' | 'red' | 'purple' | 'neutral';

const TONES: Record<Tone, string> = {
  teal: 'bg-teal/10 text-teal border-teal/25',
  gold: 'bg-gold/10 text-gold border-gold/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  neutral: 'bg-bg3 text-text3 border-border-main',
};

/** Badge générique (gabarit : niveau de preuve, statut, type de lien…). */
export function Badge({
  tone = 'teal',
  icon: Icon,
  children,
}: {
  tone?: Tone;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-mono tracking-[0.5px] px-2 py-[3px] rounded-full border ${TONES[tone]}`}
    >
      {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
      {children}
    </span>
  );
}
