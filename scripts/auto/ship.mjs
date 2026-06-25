#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// ship.mjs <outputFile> — CORPS COMPLET d'une itération de la boucle nocturne.
// ─────────────────────────────────────────────────────────────────────────────
// Prend le .output d'un run `nucleatlas-article`, et exécute tout le gate dur :
//   extraire+sanitiser le draft → validateDraft → politique « critique » →
//   assemble → tsc → npm test → seed --only → git commit+push (retries) →
//   mark-progress → sélectionne le prochain todo (set-next-subject).
// Imprime une ligne JSON de synthèse : { id, status, stage?, stats, next }.
// Politique : 0 erreur validateDraft requis ; ≥1 issue 'critical' adversariale
// => failed (PAS de seed) ; 'major'/'minor' => seed + note + sidecar issues/.
// Idempotent côté git (push non-fatal : le commit local sera poussé au tour suivant).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';
import { execSync } from 'node:child_process';
import * as DIAGRAMS from '../content/diagrams.mjs';
import { validateDraft } from '../lib/article-schema.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DRAFTS = path.join(ROOT, 'scripts', 'content', 'drafts');
const ISSUES = path.join(__dirname, 'issues');
const STOP = path.join(__dirname, 'STOP');
const FIG = new Set(Object.keys(DIAGRAMS).filter((k) => typeof DIAGRAMS[k] === 'string'));
const INFOBOX = new Set(['info', 'warning', 'tip']);

const run = (cmd) => execSync(cmd, { cwd: ROOT, stdio: 'pipe', encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const sanitizeNote = (s) => String(s || '').replace(/[^A-Za-z0-9 .;:/+%-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90);
const mark = (id, status, note) => { try { run(`node scripts/auto/mark-progress.mjs ${id} ${status} ${sanitizeNote(note)}`); } catch (e) { console.error('[ship] mark err', e.message); } };

const outPath = process.argv[2];
if (!outPath || !fs.existsSync(outPath)) { console.error('[ship] usage : node scripts/auto/ship.mjs <output.json> (introuvable)'); process.exit(2); }
const raw = JSON.parse(fs.readFileSync(outPath, 'utf8'));
const draft = raw && raw.result && raw.result.draft;
const verify = (raw && raw.result && raw.result.verify) || [];
if (!draft || !draft.id) { console.error('[ship] pas de result.draft.id'); process.exit(2); }
const id = draft.id;

function san(secs) {
  if (!Array.isArray(secs)) return;
  for (const s of secs) {
    if (s.figureKey && !FIG.has(s.figureKey)) { delete s.figureKey; delete s.figureAlt; delete s.figureCaption; }
    if (Array.isArray(s.infoBoxes)) s.infoBoxes = s.infoBoxes.filter((b) => b && INFOBOX.has(b.type) && b.title && b.text);
    if (s.infoBox && !INFOBOX.has(s.infoBox.type)) delete s.infoBox;
  }
}
for (const m of ['patient', 'medecin_non_nuc', 'medecin_nuc']) if (draft[m] && draft[m].sections) san(draft[m].sections);

// Normalisation des isotopes : le SEUL Tc métastable d'imagerie clinique est le
// ⁹⁹ᵐTc. Corrige toute erreur systématique de chiffres en exposant (⁹ᵐ/⁹⁵ᵐ/²⁹ᵐ/¹⁹⁹ᵐTc → ⁹⁹ᵐTc).
const TC_RE = new RegExp('[⁰¹²³⁴⁵⁶⁷⁸⁹]+ᵐTc', 'g');
let isoFixed = 0;
function normIso(n) {
  if (typeof n === 'string') return n.replace(TC_RE, (m) => { if (m !== '⁹⁹ᵐTc') isoFixed++; return '⁹⁹ᵐTc'; });
  if (Array.isArray(n)) return n.map(normIso);
  if (n && typeof n === 'object') { for (const k of Object.keys(n)) n[k] = normIso(n[k]); return n; }
  return n;
}
normIso(draft);

// Réparation déterministe : retire les citations [n] orphelines (n > nb de sources),
// 1re cause d'échec validateDraft (un rédacteur sur-numérote). Le claim reste (devient
// non cité = simple warning) ; on le NOTE (cit-strip) pour la relecture humaine.
function stripOrphanCitations(node, maxN) {
  const fix = (str) => str.replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, (full, inner) => {
    const keep = [];
    for (const part of inner.split(',')) {
      const m = part.trim().split(/[–-]/).map((x) => parseInt(x.trim(), 10)).filter((x) => !Number.isNaN(x));
      if (m.length === 1) { if (m[0] <= maxN) keep.push(String(m[0])); }
      else if (m.length === 2) { for (let i = m[0]; i <= m[1]; i++) if (i <= maxN) keep.push(String(i)); }
    }
    return keep.length ? '[' + keep.join(', ') + ']' : '';
  });
  const walk = (n) => {
    if (typeof n === 'string') return fix(n);
    if (Array.isArray(n)) return n.map(walk);
    if (n && typeof n === 'object') { for (const k of Object.keys(n)) n[k] = walk(n[k]); return n; }
    return n;
  };
  return walk(node);
}

let { errors, warnings, stats } = validateDraft(draft);
let citStripped = false;
if (errors.length && errors.every((e) => /citation orpheline/.test(e))) {
  stripOrphanCitations(draft, Array.isArray(draft.sources) ? draft.sources.length : 0);
  const re = validateDraft(draft);
  if (!re.errors.length) { citStripped = true; errors = re.errors; warnings = re.warnings; stats = re.stats; }
}
fs.mkdirSync(DRAFTS, { recursive: true });
fs.writeFileSync(path.join(DRAFTS, id + '.json'), JSON.stringify(draft, null, 2) + '\n');
const issues = verify.flatMap((v) => (v && v.issues) || []);
const critical = issues.filter((i) => i.severity === 'critical');
const major = issues.filter((i) => i.severity === 'major');
const minor = issues.filter((i) => i.severity === 'minor');
if (issues.length) { fs.mkdirSync(ISSUES, { recursive: true }); fs.writeFileSync(path.join(ISSUES, id + '.json'), JSON.stringify(issues, null, 2)); }

function pickNext() {
  if (fs.existsSync(STOP)) return { next: null, stop: true };
  try {
    const o = run('node scripts/auto/set-next-subject.mjs');
    const m = o.match(/SUBJECT_SET\s+(\S+)/);
    return { next: m ? m[1] : null };
  } catch (e) {
    const out = ((e.stdout || '') + (e.stderr || '')).toString();
    if (/NO_TODO/.test(out)) return { next: null, done: true };
    return { next: null, error: 'set-next: ' + out.slice(-200) };
  }
}
function emit(result) { console.log(JSON.stringify({ id, ...result, stats, ...pickNext() })); process.exit(0); }

if (errors.length) { mark(id, 'failed', 'validateDraft ' + errors.length + ' err'); emit({ status: 'failed', stage: 'validate', errors: errors.slice(0, 6) }); }
if (critical.length) { mark(id, 'failed', critical.length + ' critique adversariale'); emit({ status: 'failed', stage: 'adversarial', critical: critical.map((c) => c.problem.slice(0, 90)) }); }

try { run(`node scripts/assemble-article.mjs ${id}`); }
catch (e) { mark(id, 'failed', 'assemble'); emit({ status: 'failed', stage: 'assemble', err: ((e.stdout || e.message) + '').slice(-300) }); }
try { run('npx tsc --noEmit'); }
catch (e) { mark(id, 'failed', 'tsc'); emit({ status: 'failed', stage: 'tsc', err: ((e.stdout || '') + '').slice(-300) }); }
try { run('npm test'); }
catch (e) { mark(id, 'failed', 'test'); emit({ status: 'failed', stage: 'test', err: ((e.stdout || '') + '').slice(-300) }); }
try { run(`node scripts/seed-articles.mjs --only ${id}`); }
catch (e) { mark(id, 'failed', 'seed'); emit({ status: 'failed', stage: 'seed', err: ((e.stdout || e.message) + '').slice(-300) }); }

// Seedé en prod. git : commit local puis push (retries) — push non-fatal.
let pushed = false;
try {
  run('git add -A');
  const msg = `content(${draft.type}): ${id} au niveau etalon (boucle auto)\n\n`
    + `${stats.medecinNucSections} sections, ${stats.quiz} quiz, ${stats.sources} refs verifiees`
    + `${major.length ? `, ${major.length} note(s) majeure(s) a relire` : ''}. reviewStatus: ai_assisted.\n\n`
    + `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>\n`;
  const msgFile = path.join(os.tmpdir(), 'nucleatlas_commit.msg');
  fs.writeFileSync(msgFile, msg);
  run(`git commit -q -F "${msgFile}"`);
  for (let k = 0; k < 3 && !pushed; k++) { try { run('git push origin main'); pushed = true; } catch (e) { /* retry */ } }
} catch (e) { /* commit peut échouer si rien à committer ; non bloquant */ }

mark(id, 'done', `auto OK ${warnings.length}w ${major.length}maj${citStripped ? ' cit-strip' : ''}${isoFixed ? ' iso:' + isoFixed : ''}${pushed ? '' : ' PUSH-A-REFAIRE'}`);
emit({ status: 'done', pushed, citStripped, isoFixed, warnings: warnings.length, major: major.length, minor: minor.length });
