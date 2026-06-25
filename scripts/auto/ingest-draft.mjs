#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// ingest-draft.mjs — extrait le draft d'une sortie de workflow et le prépare
// ─────────────────────────────────────────────────────────────────────────────
// Lit le fichier .output d'un run `nucleatlas-article` (JSON { result:{draft,…} }),
// SANITISE le draft (figureKeys hors liste retirées → l'assembleur ne peut plus
// hard-fail ; infoBoxes/infoBox au type invalide filtrées), l'écrit dans
// scripts/content/drafts/<id>.json, puis affiche le rapport validateDraft +
// les remarques de la vérif adversariale.
//
// Usage : node scripts/auto/ingest-draft.mjs <chemin-output.json>
// Sortie : 0 = draft valide (gate déterministe OK) · 3 = erreurs de validation.
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as DIAGRAMS from '../content/diagrams.mjs';
import { validateDraft } from '../lib/article-schema.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..', '..');
const DRAFTS = path.join(REPO, 'scripts', 'content', 'drafts');
const FIG = new Set(Object.keys(DIAGRAMS).filter((k) => typeof DIAGRAMS[k] === 'string'));
const INFOBOX = new Set(['info', 'warning', 'tip']);

const outPath = process.argv[2];
if (!outPath) { console.error('Usage : node scripts/auto/ingest-draft.mjs <output.json>'); process.exit(2); }
if (!fs.existsSync(outPath)) { console.error('[ingest] introuvable :', outPath); process.exit(2); }

const raw = JSON.parse(fs.readFileSync(outPath, 'utf8'));
const draft = raw?.result?.draft || raw?.draft || raw;
if (!draft || !draft.id) { console.error('[ingest] pas de result.draft.id dans', outPath); process.exit(1); }

function sanitizeSections(secs) {
  if (!Array.isArray(secs)) return [];
  for (const s of secs) {
    if (s.figureKey && !FIG.has(s.figureKey)) { delete s.figureKey; delete s.figureAlt; delete s.figureCaption; }
    if (Array.isArray(s.infoBoxes)) s.infoBoxes = s.infoBoxes.filter((b) => b && INFOBOX.has(b.type) && b.title && b.text);
    if (s.infoBox && !INFOBOX.has(s.infoBox.type)) delete s.infoBox;
  }
  return secs;
}
for (const m of ['patient', 'medecin_non_nuc', 'medecin_nuc']) if (draft[m]?.sections) sanitizeSections(draft[m].sections);

fs.mkdirSync(DRAFTS, { recursive: true });
const out = path.join(DRAFTS, draft.id + '.json');
fs.writeFileSync(out, JSON.stringify(draft, null, 2) + '\n', 'utf8');

const { errors, warnings, stats } = validateDraft(draft);
console.log('[ingest] écrit', path.relative(REPO, out));
console.log('[ingest] stats', JSON.stringify(stats));
console.log(`[ingest] validateDraft : ${errors.length} erreur(s), ${warnings.length} avertissement(s)`);
errors.slice(0, 40).forEach((e) => console.log('  ✗', e));

if (raw?.result?.verify) {
  const issues = (raw.result.verify || []).flatMap((v) => v?.issues || []);
  const crit = issues.filter((i) => ['critical', 'major'].includes(i.severity));
  console.log(`[ingest] vérif adversariale : ${issues.length} remarque(s), ${crit.length} critique(s)/majeure(s)`);
  crit.slice(0, 15).forEach((i) => console.log(`  ⚠[${i.severity}] ${i.where} : ${i.problem}`));
}
process.exit(errors.length ? 3 : 0);
