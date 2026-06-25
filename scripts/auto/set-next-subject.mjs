#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// set-next-subject.mjs — sélectionne le prochain article et l'injecte dans le
// script de workflow (entre les marqueurs SUBJECT_BEGIN / SUBJECT_END).
// ─────────────────────────────────────────────────────────────────────────────
// - Choisit le 1er `todo` de scripts/auto/progress.json (ou l'id passé en arg).
// - PILOTE (présent dans queue.mjs) : reprend scope/figures/graphLinks curés.
// - RÉÉCRITURE V2 : reconstruit un SUBJECT depuis l'article existant des lots
//   (titre, cat, catLabel, tags, extrait du lead → scope « élever au niveau étalon »).
// - Réécrit `const SUBJECT = {…}` dans le fichier de workflow (chemin via
//   $WF_PATH, défaut = Temp/nucleatlas_gen.mjs).
// Sortie : « SUBJECT_SET <id> type=<type> [pilot] » · exit 2 si plus aucun todo.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { QUEUE } from '../content/queue.mjs';
import { articles as b1 } from '../content/batch1.mjs';
import { articles as b2 } from '../content/batch2.mjs';
import { articles as b3 } from '../content/batch3.mjs';
import { articles as b4 } from '../content/batch4.mjs';
import { articles as b5 } from '../content/batch5.mjs';
import { articles as b6 } from '../content/batch6.mjs';
import { articles as b7 } from '../content/batch7.mjs';
import { articles as b8 } from '../content/batch8.mjs';
import { articles as b9 } from '../content/batch9.mjs';
import { articles as b10 } from '../content/batch10.mjs';
import { articles as b11 } from '../content/batch11.mjs';
import { articles as b12 } from '../content/batch12.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRESS = path.join(__dirname, 'progress.json');
const WF = process.env.WF_PATH || 'C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen.mjs';
const BEGIN = '// <<<SUBJECT_BEGIN>>>';
const END = '// <<<SUBJECT_END>>>';

const ALL = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12].flat();
const byId = new Map(ALL.filter((a) => a?.id).map((a) => [a.id, a]));
const queueById = new Map(QUEUE.map((q) => [q.id, q]));

const j = JSON.parse(fs.readFileSync(PROGRESS, 'utf8'));
const idArg = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : null;
const item = idArg ? j.items.find((x) => x.id === idArg) : j.items.find((x) => x.status === 'todo');
if (!item) { console.log('NO_TODO'); process.exit(2); }

const clean = (s) => String(s || '').replace(/\s+/g, ' ').trim();
let subject;
const q = queueById.get(item.id);
if (q && q.scope) {
  subject = {
    id: q.id, type: q.type, title: q.title, cat: q.cat, catLabel: q.catLabel || '',
    difficulty: q.difficulty || 'avancé', scope: clean(q.scope),
    suggestedFigures: q.suggestedFigures || [], graphLinks: q.graphLinks || [], tags: [], existing: null,
  };
} else {
  const a = byId.get(item.id) || {};
  const leadExcerpt = clean((a.content && a.content.lead) || '').slice(0, 400);
  const tags = (a.tags || []).slice(0, 12);
  const scope = `Reecriture au niveau ETALON de l'article existant « ${clean(a.title || item.title)} ». `
    + `Couvre EXHAUSTIVEMENT le sujet selon le gabarit ${item.type}. `
    + (tags.length ? `Mots-cles : ${tags.join(', ')}. ` : '')
    + (leadExcerpt ? `Resume actuel (a refondre et enrichir, sourcer chaque valeur) : ${leadExcerpt}` : '');
  subject = {
    id: item.id, type: item.type, title: clean(a.title || item.title), cat: a.cat || item.cat || '',
    catLabel: a.catLabel || '', difficulty: a.difficulty || 'avancé', scope,
    suggestedFigures: [], graphLinks: [], tags, existing: null,
  };
}

let src = fs.readFileSync(WF, 'utf8');
const bi = src.indexOf(BEGIN);
const ei = src.indexOf(END);
if (bi < 0 || ei < 0 || ei < bi) {
  console.error(`[set-subject] marqueurs SUBJECT introuvables dans ${WF} (ajouter ${BEGIN} / ${END}).`);
  process.exit(1);
}
const block = `${BEGIN}\nconst SUBJECT = ${JSON.stringify(subject, null, 2)};\n${END}`;
src = src.slice(0, bi) + block + src.slice(ei + END.length);
fs.writeFileSync(WF, src, 'utf8');

console.log(`SUBJECT_SET ${subject.id} type=${subject.type}${q ? ' pilot' : ''}`);
