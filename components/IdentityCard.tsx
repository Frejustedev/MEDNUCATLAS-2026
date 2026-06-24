'use client';

import React from 'react';
import {
  Atom, Syringe, Clock, Activity, Zap, Target, ShieldCheck, Droplets,
  Baby, Stethoscope, FlaskConical, Radiation, ListChecks, Microscope,
  type LucideIcon,
} from 'lucide-react';
import type { IdentityField } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  atom: Atom, syringe: Syringe, clock: Clock, activity: Activity, zap: Zap,
  target: Target, shield: ShieldCheck, droplets: Droplets, baby: Baby,
  stetho: Stethoscope, flask: FlaskConical, radiation: Radiation,
  list: ListChecks, microscope: Microscope,
};

/**
 * Carte d'identité de l'examen (gabarit §1) : fiche-réflexe scannable en
 * 5 secondes, grille de pictogrammes + libellé + valeur, en tête d'article.
 */
export function IdentityCard({ fields }: { fields?: IdentityField[] }) {
  if (!fields || fields.length === 0) return null;
  return (
    <section
      aria-label="Carte d'identité de l'examen"
      className="mb-8 rounded-xl border border-teal/20 bg-bg2 overflow-hidden"
    >
      <div className="px-4 py-2.5 bg-teal/10 border-b border-teal/20 flex items-center gap-2">
        <Atom className="w-4 h-4 text-teal" aria-hidden="true" />
        <h2 className="font-mono text-[11px] tracking-[1.5px] uppercase text-teal m-0">
          Carte d&apos;identité
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-main">
        {fields.map((f, i) => {
          const Icon = f.icon ? ICONS[f.icon] : undefined;
          return (
            <div key={i} className="bg-bg2 p-3 flex gap-2.5">
              {Icon ? (
                <Icon className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <span className="w-4 shrink-0" aria-hidden="true" />
              )}
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-text3 mb-0.5">
                  {f.label}
                </div>
                <div className="text-[12px] text-text-main leading-snug">{f.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
