#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// build-progress.mjs — construit scripts/auto/progress.json (file d'attente)
// ─────────────────────────────────────────────────────────────────────────────
// Ordre : 2 PILOTES (scripts/content/queue.mjs, nouveaux id) d'abord, puis TOUS
// les id V2_ des lots batch1..12 (réécriture en surcharge auto/<id>.json).
// V2_MIBG / V2_PHEOCHROMOCYTOME = étalons → status "done".
// `type` deviné (examen|maladie|autre) — l'agent du workflow l'affine au run.
//
// Idempotent : préserve le `status` déjà atteint (done/failed) si progress.json
// existe — relancer ne réinitialise pas l'avancement.
// Usage : node scripts/auto/build-progress.mjs
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
import { QUEUE } from '../content/queue.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'progress.json');
const DONE_IDS = new Set(['V2_MIBG', 'V2_PHEOCHROMOCYTOME']);

const all = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12].flat();

// Heuristique de type — affinée par l'agent au run (juste un indice de départ).
function guessType(a) {
  const t = (a.title || '').toLowerCase();
  const c = (a.cat || '').toLowerCase();
  const isExam = /scintigraph|tep|temp|spect|\bpet\b|scanner|irm|imagerie|protocole|épreuve|ventriculograph|cystograph|r[eé]nograph|lymphoscint|octreoscan|datscan|balayage|dmsa|mag3|dtpa|hmpao|leucocyt|octr[eé]oscan|d[eé]roulement/.test(t);
  const isMal = /cancer|tumeur|maladie|lymphome|ph[eé]ochromo|paragangli|neuroblast|carcinome|ad[eé]nome|hyperparathyro|hyperthyro|hypothyro|parkinson|alzheimer|embolie|amylose|sarco[iï]d|infection|ost[eé]omy[eé]l|nodule|goitre|basedow|graves|lewy|c[oœ]ur|insuffisance/.test(t);
  const catMal = /cancer|maladie|tumeur|patholog|lymphom|\bonco|neuro|endocrin|cardio/.test(c);
  if (isExam && !isMal) return 'examen';
  if (isMal) return 'maladie';
  if (isExam) return 'examen';
  if (catMal) return 'maladie';
  return 'autre';
}

// Préserve l'avancement existant.
let prevStatus = {};
if (fs.existsSync(OUT)) {
  try {
    const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    for (const it of prev.items || []) prevStatus[it.id] = it.status;
  } catch { /* fichier corrompu : on repart de zéro */ }
}

const seen = new Set();
const items = [];

// 1) Pilotes en tête (nouveaux sujets curés).
for (const p of QUEUE.filter((s) => s.status === 'pilot')) {
  if (seen.has(p.id)) continue;
  seen.add(p.id);
  items.push({ id: p.id, title: p.title, cat: p.cat, type: p.type, status: prevStatus[p.id] || 'todo', pilot: true });
}

// 2) Tous les V2_ existants (réécriture).
for (const a of all) {
  if (!a?.id || !/^V2_/.test(a.id) || seen.has(a.id)) continue;
  seen.add(a.id);
  const done = DONE_IDS.has(a.id);
  items.push({
    id: a.id,
    title: a.title || a.id,
    cat: a.cat || '',
    type: guessType(a),
    status: done ? 'done' : (prevStatus[a.id] || 'todo'),
  });
}

const progress = { updated: new Date().toISOString(), items };
fs.writeFileSync(OUT, JSON.stringify(progress, null, 2) + '\n', 'utf8');

const byStatus = items.reduce((m, i) => ((m[i.status] = (m[i.status] || 0) + 1), m), {});
const byType = items.reduce((m, i) => ((m[i.type] = (m[i.type] || 0) + 1), m), {});
console.log(`[build-progress] ${items.length} items → ${OUT}`);
console.log(`[build-progress] status : ${JSON.stringify(byStatus)}`);
console.log(`[build-progress] types  : ${JSON.stringify(byType)}`);
