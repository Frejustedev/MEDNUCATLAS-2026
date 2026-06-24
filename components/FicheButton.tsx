'use client';

import React from 'react';
import { FileText, Download } from 'lucide-react';
import type { Article } from '@/lib/data';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Fiche de révision téléchargeable (gabarit §24). Génère une fiche 1–2 pages
 * (carte d'identité + points clés + protocole + scores + pièges) dans une
 * fenêtre dédiée à la charte du gabarit (bordeaux/crème/or, A4, N&B) et
 * déclenche l'impression → « Enregistrer en PDF ». Sans dépendance.
 */
export function FicheButton({ article }: { article: Article }) {
  const rs = article.content.revisionSheet;
  const idc = article.content.identityCard;
  if (!rs && (!idc || idc.length === 0)) return null;

  const buildAndPrint = () => {
    const list = (items?: string[]) =>
      items && items.length ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
    const idRows =
      idc && idc.length
        ? `<div class="grid">${idc
            .map((f) => `<div class="cell"><span class="lab">${esc(f.label)}</span><span class="val">${esc(f.value)}</span></div>`)
            .join('')}</div>`
        : '';

    const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Fiche — ${esc(article.title)}</title><style>
      @page { size: A4; margin: 14mm; }
      * { box-sizing: border-box; }
      body { font-family: Georgia, 'Times New Roman', serif; color:#2a2118; margin:0; background:#fff; }
      .sheet { max-width: 800px; margin:0 auto; }
      h1 { color:#7b1e2b; font-size:20px; margin:0 0 2px; }
      .sub { color:#9a7b2e; font-size:11px; letter-spacing:1px; text-transform:uppercase; margin-bottom:12px; }
      h2 { color:#7b1e2b; font-size:13px; border-bottom:1.5px solid #c9a24b; padding-bottom:3px; margin:14px 0 6px; }
      .grid { display:grid; grid-template-columns:1fr 1fr; gap:4px; }
      .cell { border:1px solid #e3d9c2; border-radius:4px; padding:5px 7px; background:#faf7f0; }
      .lab { display:block; font-size:8px; text-transform:uppercase; letter-spacing:.5px; color:#9a7b2e; }
      .val { display:block; font-size:11px; }
      ul { margin:4px 0; padding-left:18px; }
      li { font-size:11px; line-height:1.4; margin-bottom:2px; }
      .foot { margin-top:16px; border-top:1px solid #c9a24b; padding-top:6px; font-size:9px; color:#8a7a5e; }
      .bar { text-align:right; margin-bottom:10px; }
      .bar button { padding:7px 13px; background:#7b1e2b; color:#fff; border:none; border-radius:5px; cursor:pointer; font-family:inherit; }
      @media print { .bar { display:none; } }
    </style></head><body><div class="sheet">
      <div class="bar"><button onclick="window.print()">Imprimer / Enregistrer en PDF</button></div>
      <h1>${esc(article.title)}</h1>
      <div class="sub">Fiche de révision · NucleAtlas</div>
      ${idRows ? `<h2>Carte d'identité</h2>${idRows}` : ''}
      ${rs?.keyPoints?.length ? `<h2>Points clés</h2>${list(rs.keyPoints)}` : ''}
      ${rs?.protocol?.length ? `<h2>Protocole (résumé)</h2>${list(rs.protocol)}` : ''}
      ${rs?.scores?.length ? `<h2>Scores</h2>${list(rs.scores)}` : ''}
      ${rs?.pitfalls?.length ? `<h2>Pièges</h2>${list(rs.pitfalls)}` : ''}
      <div class="foot">Contenu assisté par IA, en attente de relecture médicale — vérifiez les informations critiques (EANM, SNMMI, SFMN). Imprimable en noir et blanc.</div>
    </div>
    <script>setTimeout(function(){try{window.print();}catch(e){}},350);</script>
    </body></html>`;

    const w = window.open('', '_blank', 'width=840,height=1000');
    if (!w) {
      alert('Veuillez autoriser les fenêtres pop-up pour générer la fiche PDF.');
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
  };

  return (
    <section
      aria-label="Fiche de révision"
      className="mt-10 p-4 rounded-xl border border-gold/20 bg-bg2 flex items-center justify-between gap-3 flex-wrap"
    >
      <div className="flex items-start gap-2.5">
        <FileText className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <div className="text-[14px] font-medium text-text-main">Fiche de révision</div>
          <div className="text-[12px] text-text3">
            Synthèse 1–2 pages : carte d&apos;identité, points clés, protocole, scores, pièges.
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={buildAndPrint}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20 transition focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <Download className="w-4 h-4" aria-hidden="true" /> Télécharger la fiche (PDF)
      </button>
    </section>
  );
}
