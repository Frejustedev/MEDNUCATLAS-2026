#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// VALIDATEUR DÉTERMINISTE — vérifie la fidélité d'un draft au gabarit
// ─────────────────────────────────────────────────────────────────────────────
// La moitié DÉTERMINISTE de la vérif (structure, couverture du gabarit, intégrité
// des citations, anti-fabrication de base). La moitié ADVERSARIALE (exactitude
// médicale, anti-fabrication fine de réf) est portée par le workflow d'agents.
//
// Usage : node scripts/validate-article.mjs <id|draft.json> [--json]
//         node scripts/validate-article.mjs --all     (tous les drafts)
// Sortie : rapport lisible + code de sortie 0 (OK) / 1 (erreurs).
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { validateDraft } from './lib/article-schema.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1').replace(/^\//, '')), '..');
const DRAFTS_DIR = path.join(ROOT, 'scripts', 'content', 'drafts');

function loadDraft(arg) {
  const p = arg.endsWith('.json') ? path.resolve(arg) : path.join(DRAFTS_DIR, `${arg}.json`);
  if (!fs.existsSync(p)) { console.error(`[validate] draft introuvable : ${p}`); process.exit(1); }
  return { id: path.basename(p, '.json'), draft: JSON.parse(fs.readFileSync(p, 'utf8')) };
}

function report(id, res, asJson) {
  if (asJson) { console.log(JSON.stringify({ id, ...res }, null, 2)); return res.errors.length === 0; }
  const ok = res.errors.length === 0;
  console.log(`\n${ok ? '✓' : '✗'} ${id} — ${res.errors.length} erreur(s), ${res.warnings.length} avertissement(s)`);
  console.log(`  stats : ${JSON.stringify(res.stats)}`);
  res.errors.forEach((e) => console.log(`  ✗ ${e}`));
  res.warnings.forEach((w) => console.log(`  ⚠ ${w}`));
  return ok;
}

function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const positional = args.filter((a) => !a.startsWith('--'));

  if (args.includes('--all')) {
    if (!fs.existsSync(DRAFTS_DIR)) { console.error('[validate] aucun dossier drafts/'); process.exit(1); }
    const files = fs.readdirSync(DRAFTS_DIR).filter((f) => f.endsWith('.json'));
    let allOk = true;
    for (const f of files) {
      const draft = JSON.parse(fs.readFileSync(path.join(DRAFTS_DIR, f), 'utf8'));
      const ok = report(path.basename(f, '.json'), validateDraft(draft), asJson);
      allOk = allOk && ok;
    }
    process.exit(allOk ? 0 : 1);
  }

  if (!positional.length) { console.error('Usage : node scripts/validate-article.mjs <id|draft.json> [--json] | --all'); process.exit(2); }
  const { id, draft } = loadDraft(positional[0]);
  const ok = report(id, validateDraft(draft), asJson);
  process.exit(ok ? 0 : 1);
}

main();
