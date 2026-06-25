#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// fix-isotopes.mjs — corrige les notations erronées du technétium métastable.
// ─────────────────────────────────────────────────────────────────────────────
// Le SEUL Tc métastable utilisé en imagerie clinique est le ⁹⁹ᵐTc. Des erreurs
// systématiques de chiffres en exposant (⁹ᵐTc, ⁹⁵ᵐTc, ²⁹ᵐTc, ¹⁹⁹ᵐTc…) ont été
// publiées. On normalise TOUTE notation <exposants>ᵐTc → ⁹⁹ᵐTc dans auto/ + drafts/.
// Imprime les ids corrigés et la ligne RESEED_IDS=<csv> (articles seedés à réécrire).
// Usage : node scripts/auto/fix-isotopes.mjs
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const DIRS = ['scripts/content/auto', 'scripts/content/drafts'];
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const RE = new RegExp('[' + SUP + ']+ᵐTc', 'g');
const GOOD = '⁹⁹ᵐTc';

const changed = {};
for (const d of DIRS) {
  const abs = path.join(ROOT, d);
  if (!fs.existsSync(abs)) continue;
  for (const f of fs.readdirSync(abs).filter((x) => x.endsWith('.json'))) {
    const p = path.join(abs, f);
    const s = fs.readFileSync(p, 'utf8');
    let n = 0;
    const out = s.replace(RE, (m) => { if (m !== GOOD) n++; return GOOD; });
    if (n > 0) { fs.writeFileSync(p, out, 'utf8'); const id = f.replace(/\.json$/, ''); changed[id] = (changed[id] || 0) + n; }
  }
}
console.log('[fix-iso] articles corrigés :', Object.keys(changed).length);
for (const [id, n] of Object.entries(changed)) console.log(`  ${id} : ${n} correction(s)`);
const autoIds = Object.keys(changed).filter((id) => fs.existsSync(path.join(ROOT, 'scripts/content/auto', id + '.json')));
console.log('RESEED_IDS=' + autoIds.join(','));
