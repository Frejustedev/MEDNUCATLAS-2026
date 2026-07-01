#!/usr/bin/env node
/**
 * Génère un INSTANTANÉ STATIQUE du catalogue d'articles, commité dans le repo et
 * embarqué dans l'app, pour servir de REPLI quand Firestore est indisponible
 * (ex. quota gratuit de lectures/jour épuisé — la base AI Studio est plafonnée
 * au tier gratuit et ne peut PAS être débridée par la facturation).
 *
 * Source = exactement le jeu que `seed-articles.mjs` pousse en prod, restreint
 * au SET LIVE : fichiers `scripts/content/auto/*.json` (record des articles
 * réellement expédiés par la boucle) + MIBG + Phéo + tout id `done` de
 * `scripts/auto/progress.json` (fichier LOCAL, gitignoré — d'où la génération
 * en local puis commit du JSON résultat). Les anciens articles des lots, purgés
 * de Firestore, sont EXCLUS (absents de auto/ et non `done`).
 *
 * Sorties (commitées) :
 *   - lib/articles-snapshot-list.json : liste LÉGÈRE (sans content) → /api/articles
 *   - lib/articles-snapshot-full.json : { [id]: docData complet } → page article
 *
 * Usage : node scripts/build-snapshot.mjs
 */
import fs from 'node:fs';
import { articles as batch1 } from './content/batch1.mjs';
import { articles as batch2 } from './content/batch2.mjs';
import { articles as batch3 } from './content/batch3.mjs';
import { articles as batch4 } from './content/batch4.mjs';
import { articles as batch5 } from './content/batch5.mjs';
import { articles as batch6 } from './content/batch6.mjs';
import { articles as batch7 } from './content/batch7.mjs';
import { articles as batch8 } from './content/batch8.mjs';
import { articles as batch9 } from './content/batch9.mjs';
import { articles as batch10 } from './content/batch10.mjs';
import { articles as batch11 } from './content/batch11.mjs';
import { articles as batch12 } from './content/batch12.mjs';
import { article as mibgArticle } from './content/mibg.mjs';
import { article as pheoArticle } from './content/pheochromocytome.mjs';
import * as DIAGRAMS from './content/diagrams.mjs';

function resolveFigures(a) {
  for (const mode of ['patient', 'medecin_non_nuc', 'medecin_nuc']) {
    for (const s of a?.content?.[mode]?.sections ?? []) {
      if (s.figure?.figureRef) {
        const svg = DIAGRAMS[s.figure.figureRef];
        if (svg) s.figure.svg = svg;
        delete s.figure.figureRef;
        if (!s.figure.svg) delete s.figure;
      }
    }
  }
  return a;
}

const AUTO_DIR = new URL('./content/auto/', import.meta.url);
let autoArticles = [];
try {
  autoArticles = fs.readdirSync(AUTO_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try { return resolveFigures(JSON.parse(fs.readFileSync(new URL(f, AUTO_DIR), 'utf8'))); }
      catch (e) { console.error('[snapshot] auto/' + f + ' ignoré :', e.message); return null; }
    })
    .filter(Boolean);
} catch { /* dossier auto/ absent */ }

// Set LIVE : ids auto + étalons + tout `done` de progress.json (local).
const liveIds = new Set([...autoArticles.map((a) => a.id), 'V2_MIBG', 'V2_PHEOCHROMOCYTOME']);
try {
  const prog = JSON.parse(fs.readFileSync(new URL('../scripts/auto/progress.json', import.meta.url), 'utf8'));
  for (const it of prog.items ?? []) if (it.status === 'done') liveIds.add(it.id);
} catch { /* progress.json absent : on se contente de auto/ + étalons */ }

// Jeu complet (comme seed-articles) puis restriction au set live.
const overrideIds = new Set([...autoArticles.map((a) => a.id), 'V2_MIBG', 'V2_PHEOCHROMOCYTOME']);
const all = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7, ...batch8, ...batch9, ...batch10, ...batch11, ...batch12]
  .filter((a) => !overrideIds.has(a.id))
  .concat([mibgArticle, pheoArticle], autoArticles)
  .filter((a) => liveIds.has(a.id));

// Déduplication défensive par id (dernier gagne).
const byIdMap = new Map();
for (const a of all) byIdMap.set(a.id, a);
const live = [...byIdMap.values()];

function toDoc(a) {
  return {
    id: a.id,
    cat: a.cat,
    catLabel: a.catLabel ?? '',
    title: a.title,
    tags: a.tags ?? [],
    difficulty: a.difficulty ?? 'fondamental',
    excerpt: a.excerpt ?? (a.content?.lead || '').replace(/[*_#`]/g, '').slice(0, 240),
    targetAudience: a.targetAudience ?? ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: a.authors ?? [],
    sources: a.sources ?? [],
    reviewStatus: a.reviewStatus ?? 'ai_assisted',
    content: a.content,
  };
}

const listItems = live.map((a) => {
  const d = toDoc(a);
  // Liste légère : pas de content ni sources.
  const { content: _c, sources: _s, ...light } = d;
  return light;
}).sort((x, y) => x.title.localeCompare(y.title, 'fr', { sensitivity: 'base' }));

const fullById = {};
for (const a of live) fullById[a.id] = toDoc(a);

const LIST_PATH = new URL('../lib/articles-snapshot-list.json', import.meta.url);
const FULL_PATH = new URL('../lib/articles-snapshot-full.json', import.meta.url);
fs.writeFileSync(LIST_PATH, JSON.stringify(listItems));
fs.writeFileSync(FULL_PATH, JSON.stringify(fullById));

const kb = (u) => (fs.statSync(u).size / 1024).toFixed(0);
console.log(`[snapshot] ${live.length} articles live`);
console.log(`[snapshot] lib/articles-snapshot-list.json — ${kb(LIST_PATH)} Ko`);
console.log(`[snapshot] lib/articles-snapshot-full.json — ${kb(FULL_PATH)} Ko`);
