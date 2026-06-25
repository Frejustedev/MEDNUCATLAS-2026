'use client';

import React, { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';

/**
 * Transforme un titre de section en identifiant d'ancre stable et lisible.
 * - minuscules, accents retirés (NFD), espaces → tirets
 * - caractères non alphanumériques supprimés
 * - préfixe d'index pour garantir l'unicité même si deux sections partagent
 *   le même titre (ou un titre vide / non latin).
 *
 * Exporté pour être partagé à l'identique entre ArticleView (génération des
 * `id` sur les `<h3>`) et ArticleTOC (cibles des liens d'ancrage).
 */
export function slugifySection(title: string, index: number): string {
  const base = (title || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+)|(-+$)/g, '');
  return `sec-${index}${base ? `-${base}` : ''}`;
}

export interface TOCItem {
  id: string;
  title: string;
}

/**
 * Table des matières flottante de l'article.
 * - variant="desktop" (lg:) : colonne sticky listant les sections du profil
 *   actif, surbrillance de la section courante au scroll (IntersectionObserver).
 * - variant="mobile" : bouton « Sommaire » dépliant un panneau escamotable.
 *
 * Deux instances (mobile + desktop) sont rendues à des emplacements DOM
 * distincts ; chacune n'affiche que sa propre variante via les utilitaires
 * Tailwind `lg:hidden` / `hidden lg:block`, donc une seule est visible à la fois.
 *
 * Respecte le contrat de classes partagé : .toc / .toc-link / .toc-link-active.
 */
export function ArticleTOC({
  items,
  variant = 'desktop',
}: {
  items: TOCItem[];
  variant?: 'mobile' | 'desktop';
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || items.length === 0) return;
    // Sécurité : IntersectionObserver peut manquer dans de très vieux moteurs.
    if (typeof IntersectionObserver === 'undefined') return;

    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      // Fenêtre d'activation : la section « courante » est celle dont le titre
      // est dans le tiers supérieur du viewport.
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Met à jour l'ancre courante immédiatement pour un retour visuel net.
      setActiveId(id);
      // Met à jour l'URL sans recharger (lien partageable vers la section).
      if (typeof history !== 'undefined') {
        history.replaceState(null, '', `#${id}`);
      }
    }
    setIsOpen(false);
  };

  if (items.length === 0) return null;

  const list = (
    <nav className="toc" aria-label="Table des matières">
      <div className="toc-title font-mono text-[9px] tracking-[2px] uppercase text-text3 mb-3">
        Sommaire
      </div>
      <ul className="flex flex-col gap-px list-none m-0 p-0">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              aria-current={activeId === it.id ? 'location' : undefined}
              className={`toc-link ${activeId === it.id ? 'toc-link-active' : ''}`}
            >
              {it.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Mobile : bouton + panneau escamotable, dans le flux de l'article.
  if (variant === 'mobile') {
    return (
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="article-toc-mobile"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border-main bg-bg2 text-text2 text-[12px] font-mono tracking-[0.5px] hover:text-teal hover:border-teal/40 transition-colors"
        >
          {isOpen ? <X className="w-3.5 h-3.5" /> : <List className="w-3.5 h-3.5" />}
          Sommaire
        </button>
        {isOpen && (
          <div
            id="article-toc-mobile"
            className="mt-3 p-4 rounded-lg border border-border-main bg-bg2"
          >
            {list}
          </div>
        )}
      </div>
    );
  }

  // Grand écran : colonne latérale, sœur de la colonne de texte. Elle scrolle
  // indépendamment (le conteneur parent est en overflow-hidden, la colonne de
  // texte étant le scroller principal) ; elle reste donc visible en permanence.
  return (
    <div className="hidden lg:block w-[220px] shrink-0 overflow-y-auto p-5 px-4 border-l border-border-main">
      {list}
    </div>
  );
}
