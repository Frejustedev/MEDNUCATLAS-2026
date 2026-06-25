#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// ASSEMBLEUR DÉTERMINISTE — draft JSON → objet Article NucleAtlas (auto/<id>.json)
// ─────────────────────────────────────────────────────────────────────────────
// Lit   scripts/content/drafts/<id>.json  (produit par le workflow de génération)
// Écrit scripts/content/auto/<id>.json     (chargé/surchargé par seed-articles.mjs)
//
// - Valide le draft (scripts/lib/article-schema.mjs).
// - Résout chaque figureKey contre les exports de diagrams.mjs (erreur si absent)
//   et l'émet en `figure.figureRef` — le seeder (resolveFigures) injecte le SVG.
// - Préfixe les sources « [n] », marque reviewStatus: 'ai_assisted'.
// - Émet un Article propre (mêmes champs que mibg.mjs / pheochromocytome.mjs).
//
// Usage : node scripts/assemble-article.mjs <id|chemin-draft.json> [--stdout]
// ─────────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { validateDraft } from './lib/article-schema.mjs';
import * as DIAGRAMS from './content/diagrams.mjs';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1').replace(/^\//, '')), '..');
const DRAFTS_DIR = path.join(ROOT, 'scripts', 'content', 'drafts');
const AUTO_DIR = path.join(ROOT, 'scripts', 'content', 'auto');
const DIAGRAM_KEYS = new Set(Object.keys(DIAGRAMS).filter((k) => typeof DIAGRAMS[k] === 'string'));

const AUTHORS = ['Dr Babatounde Fréjuste Pinocio Agboton', 'Assistance IA (Claude)'];

function mapSection(s, usedKeys, where, errors) {
  const out = { title: s.title };
  if (s.text) out.text = s.text;
  if (Array.isArray(s.list) && s.list.length) out.list = s.list;
  if (Array.isArray(s.steps) && s.steps.length) out.steps = s.steps.map((st) => ({ title: st.title, text: st.text }));
  if (Array.isArray(s.stats) && s.stats.length) out.stats = s.stats.map((st) => ({ value: st.value, label: st.label }));
  if (s.infoBox) out.infoBox = { type: s.infoBox.type, title: s.infoBox.title, text: s.infoBox.text };
  if (Array.isArray(s.infoBoxes) && s.infoBoxes.length) out.infoBoxes = s.infoBoxes.map((b) => ({ type: b.type, title: b.title, text: b.text }));
  if (s.figureKey) {
    if (!DIAGRAM_KEYS.has(s.figureKey)) {
      errors.push(`${where}: figureKey "${s.figureKey}" introuvable dans diagrams.mjs (${DIAGRAM_KEYS.size} exports disponibles)`);
    } else {
      usedKeys.add(s.figureKey);
      // Référence par nom ; le seeder (resolveFigures) injecte le SVG depuis diagrams.mjs.
      out.figure = { figureRef: s.figureKey, alt: s.figureAlt || s.title, ...(s.figureCaption ? { caption: s.figureCaption } : {}) };
    }
  }
  return out;
}

function formatSources(sources) {
  return (sources || []).map((src, i) => {
    const n = i + 1;
    const title = /^\s*\[\d+\]/.test(src.title) ? src.title : `[${n}] ${src.title}`;
    return src.url ? { title, url: src.url } : { title };
  });
}

/**
 * Transforme un draft validé en { article, usedKeys }.
 * Lève si des figureKeys sont introuvables dans diagrams.mjs.
 */
export function assembleArticle(draft) {
  const usedKeys = new Set();
  const errors = [];
  const mapSections = (sections, label) => (sections || []).map((s, i) => mapSection(s, usedKeys, `${label}[${i}]`, errors));

  const content = {
    identityCard: (draft.identityCard || []).map((f) => ({ ...(f.icon ? { icon: f.icon } : {}), label: f.label, value: f.value })),
    relatedLinks: (draft.relatedLinks || []).map((l) => ({ type: l.type, label: l.label, ...(l.href ? { href: l.href } : {}) })),
    quiz: (draft.quiz || []).map((q) => ({ question: q.question, options: q.options, answer: q.answer, explanation: q.explanation, ...(q.difficulty ? { difficulty: q.difficulty } : {}) })),
    revisionSheet: {
      ...(draft.revisionSheet?.keyPoints?.length ? { keyPoints: draft.revisionSheet.keyPoints } : {}),
      ...(draft.revisionSheet?.protocol?.length ? { protocol: draft.revisionSheet.protocol } : {}),
      ...(draft.revisionSheet?.scores?.length ? { scores: draft.revisionSheet.scores } : {}),
      ...(draft.revisionSheet?.pitfalls?.length ? { pitfalls: draft.revisionSheet.pitfalls } : {}),
    },
    lead: draft.lead,
    patient: { sections: mapSections(draft.patient?.sections, 'patient') },
    medecin_non_nuc: { sections: mapSections(draft.medecin_non_nuc?.sections, 'medecin_non_nuc') },
    medecin_nuc: { sections: mapSections(draft.medecin_nuc?.sections, 'medecin_nuc') },
  };

  if (errors.length) throw new Error('Résolution des figures impossible :\n  - ' + errors.join('\n  - '));

  const article = {
    id: draft.id,
    cat: draft.cat,
    catLabel: draft.catLabel || '',
    title: draft.title,
    difficulty: draft.difficulty || 'avancé',
    tags: draft.tags || [],
    targetAudience: draft.targetAudience || ['patient', 'medecin_non_nuc', 'medecin_nuc'],
    authors: draft.authors && draft.authors.length ? draft.authors : AUTHORS,
    reviewStatus: 'ai_assisted',
    sources: formatSources(draft.sources),
    content,
  };

  return { article, usedKeys: [...usedKeys].sort() };
}

// Réplique la validation structurelle de seed-articles.mjs (garde-fou final).
function seedValidate(a) {
  const errs = [];
  if (!a.id || !/^[A-Za-z0-9_-]+$/.test(a.id)) errs.push('id invalide');
  if (!a.title || a.title.length < 3) errs.push('titre trop court');
  if (!a.cat) errs.push('catégorie manquante');
  if (!a.content || !a.content.lead) errs.push('content.lead manquant');
  const modes = (a.targetAudience?.length ? a.targetAudience : ['patient', 'medecin_non_nuc', 'medecin_nuc']).filter((m) => m !== 'admin');
  for (const mode of modes) if (!a.content?.[mode]?.sections?.length) errs.push(`mode ${mode} sans sections`);
  return errs;
}

function main() {
  const arg = process.argv[2];
  const toStdout = process.argv.includes('--stdout');
  if (!arg) { console.error('Usage : node scripts/assemble-article.mjs <id|draft.json> [--stdout]'); process.exit(2); }
  const draftPath = arg.endsWith('.json') ? path.resolve(arg) : path.join(DRAFTS_DIR, `${arg}.json`);
  if (!fs.existsSync(draftPath)) { console.error(`[assemble] draft introuvable : ${draftPath}`); process.exit(1); }

  const draft = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
  const { errors, warnings, stats } = validateDraft(draft);
  warnings.forEach((w) => console.warn(`[assemble][warn] ${w}`));
  if (errors.length) {
    console.error(`[assemble] ✗ ${draft.id} : ${errors.length} erreur(s) de validation :`);
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
  }

  const { article, usedKeys } = assembleArticle(draft);
  const seedErrs = seedValidate(article);
  if (seedErrs.length) {
    console.error(`[assemble] ✗ ${draft.id} : échec garde-fou seed : ${seedErrs.join(', ')}`);
    process.exit(1);
  }

  const json = JSON.stringify(article, null, 2);
  if (toStdout) { process.stdout.write(json + '\n'); return; }
  fs.mkdirSync(AUTO_DIR, { recursive: true });
  const outPath = path.join(AUTO_DIR, `${draft.id}.json`);
  fs.writeFileSync(outPath, json + '\n', 'utf8');
  console.log(`[assemble] ✓ ${draft.id} → scripts/content/auto/${draft.id}.json`);
  console.log(`[assemble]   figures: ${usedKeys.length ? usedKeys.join(', ') : '(aucune)'}`);
  console.log(`[assemble]   stats: ${JSON.stringify(stats)}`);
}

main();
