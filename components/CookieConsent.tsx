'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'nucleatlas_cookie_consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let needsConsent = false;
    try {
      needsConsent = !localStorage.getItem(STORAGE_KEY);
    } catch {
      // localStorage indisponible (mode privé) — on n'affiche rien
    }
    if (!needsConsent) return;
    // Différé hors du corps de l'effet pour éviter un rendu en cascade
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, at: new Date().toISOString() }));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Information sur les cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[200] bg-bg2 border border-border-main rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
          <Cookie className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] text-text2 leading-relaxed">
            NucleAtlas utilise uniquement des traceurs strictement nécessaires (session, préférences).
            Aucun cookie publicitaire.{' '}
            <Link href="/confidentialite" className="text-teal underline hover:text-teal2">
              En savoir plus
            </Link>
            .
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={accept}
              className="px-3 py-1.5 bg-teal text-bg rounded-md text-xs font-medium hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
            >
              J&apos;ai compris
            </button>
            <Link
              href="/confidentialite"
              className="px-3 py-1.5 text-xs text-text3 hover:text-text-main transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
        <button
          onClick={accept}
          aria-label="Fermer"
          className="shrink-0 text-text3 hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
