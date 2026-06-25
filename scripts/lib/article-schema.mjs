// ─────────────────────────────────────────────────────────────────────────────
// CONTRAT DE DONNÉES « DRAFT » + VALIDATION DÉTERMINISTE
// ─────────────────────────────────────────────────────────────────────────────
// Un `draft` est l'objet JSON produit par le workflow de génération (1 agent /
// mouvement). L'assembleur (assemble-article.mjs) le transforme en objet Article
// NucleAtlas (scripts/content/generated/<id>.mjs). Le validateur
// (validate-article.mjs) vérifie sa fidélité au gabarit avant tout seed.
//
// Forme d'une Section (miroir de lib/data.ts Section, figures à plat) :
//   { title, text?, list?[], steps?[{title,text}], stats?[{value,label}],
//     infoBox?{type,title,text}, infoBoxes?[{type,title,text}],
//     figureKey?, figureAlt?, figureCaption? }
//
// Forme d'un draft :
//   { id, type:'examen'|'maladie', cat, catLabel, title, difficulty, tags[],
//     targetAudience[], authors[], sources[{title,url}], lead,
//     identityCard[{icon,label,value}], relatedLinks[{type,label,href?}],
//     quiz[{question,options[],answer,explanation,difficulty}],
//     revisionSheet{keyPoints[],protocol[],scores[],pitfalls[]},
//     patient{sections[]}, medecin_non_nuc{sections[]}, medecin_nuc{sections[]} }
// ─────────────────────────────────────────────────────────────────────────────

import { TEMPLATES, IDENTITY_ICONS, LINK_TYPES, expectedMedecinNucSectionCodes } from '../content/templates.mjs';

const INFOBOX_TYPES = ['info', 'warning', 'tip'];
const QUIZ_DIFF = ['facile', 'moyen', 'difficile'];
// Plancher dur = 12 (niveau des étalons mibg.mjs / pheochromocytome.mjs, validés
// par l'auteur). Idéal gabarit = 15 → avertissement si 12–14.
const MIN_QUIZ_HARD = 12;
const MIN_QUIZ_IDEAL = 15;

// ── JSON Schemas (réutilisables par les agents du workflow pour la sortie
//    structurée). Volontairement permissifs : la fidélité fine est vérifiée
//    par validateDraft(). ──────────────────────────────────────────────────────
export const SECTION_SCHEMA = {
  type: 'object',
  required: ['title'],
  additionalProperties: false,
  properties: {
    title: { type: 'string', description: 'Préfixé du code de section, ex. "A4 · Principe : la cible"' },
    text: { type: 'string', description: 'Markdown GFM (tableaux | gras | citations [n])' },
    list: { type: 'array', items: { type: 'string' } },
    steps: { type: 'array', items: { type: 'object', required: ['title', 'text'], additionalProperties: false, properties: { title: { type: 'string' }, text: { type: 'string' } } } },
    stats: { type: 'array', items: { type: 'object', required: ['value', 'label'], additionalProperties: false, properties: { value: { type: 'string' }, label: { type: 'string' } } } },
    infoBox: { type: 'object', required: ['type', 'title', 'text'], additionalProperties: false, properties: { type: { type: 'string', enum: INFOBOX_TYPES }, title: { type: 'string' }, text: { type: 'string' } } },
    infoBoxes: { type: 'array', items: { type: 'object', required: ['type', 'title', 'text'], additionalProperties: false, properties: { type: { type: 'string', enum: INFOBOX_TYPES }, title: { type: 'string' }, text: { type: 'string' } } } },
    figureKey: { type: 'string', description: 'Clé d’un export de scripts/content/diagrams.mjs (UPPER_SNAKE), ou omise' },
    figureAlt: { type: 'string' },
    figureCaption: { type: 'string' },
  },
};

export const SECTIONS_SCHEMA = { type: 'array', items: SECTION_SCHEMA };

export const IDENTITY_CARD_SCHEMA = {
  type: 'array',
  items: { type: 'object', required: ['label', 'value'], additionalProperties: false, properties: { icon: { type: 'string', enum: IDENTITY_ICONS }, label: { type: 'string' }, value: { type: 'string' } } },
};

export const RELATED_LINKS_SCHEMA = {
  type: 'array',
  items: { type: 'object', required: ['type', 'label'], additionalProperties: false, properties: { type: { type: 'string', enum: LINK_TYPES }, label: { type: 'string' }, href: { type: 'string' } } },
};

export const QUIZ_SCHEMA = {
  type: 'array',
  items: { type: 'object', required: ['question', 'options', 'answer', 'explanation'], additionalProperties: false, properties: { question: { type: 'string' }, options: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 5 }, answer: { type: 'integer' }, explanation: { type: 'string' }, difficulty: { type: 'string', enum: QUIZ_DIFF } } },
};

export const REVISION_SHEET_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: { keyPoints: { type: 'array', items: { type: 'string' } }, protocol: { type: 'array', items: { type: 'string' } }, scores: { type: 'array', items: { type: 'string' } }, pitfalls: { type: 'array', items: { type: 'string' } } },
};

export const SOURCES_SCHEMA = {
  type: 'array',
  items: { type: 'object', required: ['title', 'url'], additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' }, verified: { type: 'boolean' } } },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
const isNonEmptyStr = (v) => typeof v === 'string' && v.trim().length > 0;
const isArr = (v) => Array.isArray(v);

// Collecte récursive de toutes les chaînes de texte d'un objet (pour citations).
function collectStrings(node, out = []) {
  if (typeof node === 'string') { out.push(node); return out; }
  if (Array.isArray(node)) { for (const x of node) collectStrings(x, out); return out; }
  if (node && typeof node === 'object') { for (const k of Object.keys(node)) collectStrings(node[k], out); return out; }
  return out;
}

// Numéros de citation référencés par [n] / [n, m] / [n–m] dans tous les textes.
export function citedNumbers(strings) {
  const nums = new Set();
  for (const s of strings) {
    const matches = s.match(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g) || [];
    for (const m of matches) {
      const inner = m.slice(1, -1);
      for (const part of inner.split(',')) {
        const range = part.split(/[–-]/).map((x) => parseInt(x.trim(), 10)).filter((x) => !Number.isNaN(x));
        if (range.length === 1) nums.add(range[0]);
        else if (range.length === 2) for (let i = range[0]; i <= range[1]; i++) nums.add(i);
      }
    }
  }
  return nums;
}

function checkSections(sections, label, errors, warnings, { requireContent = true } = {}) {
  if (!isArr(sections)) { errors.push(`${label}: sections manquantes (tableau attendu)`); return; }
  sections.forEach((s, i) => {
    const where = `${label}[${i}] "${s?.title ?? '?'}"`;
    if (!isNonEmptyStr(s?.title)) errors.push(`${where}: titre manquant`);
    if (requireContent) {
      const hasBody = isNonEmptyStr(s?.text) || (isArr(s?.list) && s.list.length) || (isArr(s?.steps) && s.steps.length) ||
        (isArr(s?.stats) && s.stats.length) || s?.infoBox || (isArr(s?.infoBoxes) && s.infoBoxes.length) || isNonEmptyStr(s?.figureKey);
      if (!hasBody) errors.push(`${where}: section vide (ni text/list/steps/stats/infoBox/figure)`);
    }
    if (s?.figureKey && !/^[A-Z][A-Z0-9_]+$/.test(s.figureKey)) errors.push(`${where}: figureKey "${s.figureKey}" mal formée (UPPER_SNAKE attendue)`);
    if (s?.figureKey && !isNonEmptyStr(s?.figureAlt)) warnings.push(`${where}: figure sans texte alternatif (accessibilité)`);
    if (s?.infoBox && !INFOBOX_TYPES.includes(s.infoBox.type)) errors.push(`${where}: infoBox.type invalide`);
    (s?.infoBoxes || []).forEach((b, k) => { if (!INFOBOX_TYPES.includes(b?.type)) errors.push(`${where}: infoBoxes[${k}].type invalide`); });
  });
}

/**
 * Validation déterministe d'un draft : structure, fidélité au gabarit,
 * intégrité des citations, anti-fabrication de base.
 * @returns {{ errors: string[], warnings: string[], stats: object }}
 */
export function validateDraft(draft) {
  const errors = [];
  const warnings = [];
  if (!draft || typeof draft !== 'object') return { errors: ['draft vide ou non-objet'], warnings, stats: {} };

  // 1. Métadonnées
  if (!isNonEmptyStr(draft.id) || !/^[A-Za-z0-9_-]+$/.test(draft.id)) errors.push('id invalide (attendu [A-Za-z0-9_-]+)');
  if (!isNonEmptyStr(draft.title) || draft.title.length < 3) errors.push('title trop court');
  if (!isNonEmptyStr(draft.cat)) errors.push('cat manquante');
  if (!['examen', 'maladie', 'autre'].includes(draft.type)) errors.push(`type invalide : ${draft.type} (examen|maladie|autre)`);
  if (draft.difficulty && !['fondamental', 'intermédiaire', 'avancé'].includes(draft.difficulty)) warnings.push(`difficulty inhabituelle : ${draft.difficulty}`);
  if (!isArr(draft.tags) || draft.tags.length < 3) warnings.push('tags : au moins 3 recommandés');
  const template = TEMPLATES[draft.type];

  // 2. Lead (§0)
  if (!isNonEmptyStr(draft.lead)) errors.push('lead (§0) manquant');
  else {
    if (/^#{1,6}\s/m.test(draft.lead)) warnings.push('lead : pas de titre Markdown (#) attendu');
    if (draft.lead.length < 80) warnings.push('lead : très court (< 80 caractères)');
    if (draft.lead.length > 1100) warnings.push('lead : trop long (> 1100 caractères ; viser 4–5 phrases)');
  }

  // 3. Carte d'identité (§1)
  if (!isArr(draft.identityCard) || draft.identityCard.length < 8) errors.push('identityCard : au moins 8 champs attendus');
  else draft.identityCard.forEach((f, i) => {
    if (!isNonEmptyStr(f?.label) || !isNonEmptyStr(f?.value)) errors.push(`identityCard[${i}]: label/value manquant`);
    if (f?.icon && !IDENTITY_ICONS.includes(f.icon)) warnings.push(`identityCard[${i}]: icône inconnue "${f.icon}" (ignorée au rendu)`);
    if (!f?.icon) warnings.push(`identityCard[${i}]: sans icône`);
  });

  // 4. Carte de liens (§25/§24)
  if (!isArr(draft.relatedLinks) || draft.relatedLinks.length < 6) errors.push('relatedLinks : au moins 6 liens attendus');
  else draft.relatedLinks.forEach((l, i) => {
    if (!LINK_TYPES.includes(l?.type)) errors.push(`relatedLinks[${i}]: type invalide "${l?.type}"`);
    if (!isNonEmptyStr(l?.label)) errors.push(`relatedLinks[${i}]: label manquant`);
  });

  // 5. Quiz (§23/§22) — plancher 12 (étalons), idéal 15 (gabarit)
  if (!isArr(draft.quiz) || draft.quiz.length < MIN_QUIZ_HARD) errors.push(`quiz : ${MIN_QUIZ_HARD} questions minimum, trouvé ${isArr(draft.quiz) ? draft.quiz.length : 0}`);
  else {
    if (draft.quiz.length < MIN_QUIZ_IDEAL) warnings.push(`quiz : ${draft.quiz.length} questions (gabarit idéal ≥ ${MIN_QUIZ_IDEAL})`);
    draft.quiz.forEach((q, i) => {
    if (!isNonEmptyStr(q?.question)) errors.push(`quiz[${i}]: question manquante`);
    if (!isArr(q?.options) || q.options.length < 3) errors.push(`quiz[${i}]: au moins 3 options`);
    else if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) errors.push(`quiz[${i}]: answer hors bornes (${q.answer})`);
    if (!isNonEmptyStr(q?.explanation)) errors.push(`quiz[${i}]: explication manquante`);
    if (q?.difficulty && !QUIZ_DIFF.includes(q.difficulty)) warnings.push(`quiz[${i}]: difficulté inconnue "${q.difficulty}"`);
    });
  }

  // 6. Fiche de révision (§24/§23)
  if (!draft.revisionSheet || typeof draft.revisionSheet !== 'object') errors.push('revisionSheet manquante');
  else {
    if (!isArr(draft.revisionSheet.keyPoints) || draft.revisionSheet.keyPoints.length < 4) errors.push('revisionSheet.keyPoints : au moins 4 attendus');
    else if (draft.revisionSheet.keyPoints.length < 6) warnings.push('revisionSheet.keyPoints : 6–8 recommandés');
    for (const k of ['protocol', 'scores', 'pitfalls']) {
      if (!isArr(draft.revisionSheet[k]) || draft.revisionSheet[k].length === 0) warnings.push(`revisionSheet.${k} : vide`);
    }
  }

  // 7. Profils dérivés
  if (!isArr(draft.patient?.sections) || draft.patient.sections.length < 2) errors.push('patient.sections : au moins 2 sections');
  else checkSections(draft.patient.sections, 'patient', errors, warnings);
  if (!isArr(draft.medecin_non_nuc?.sections) || draft.medecin_non_nuc.sections.length < 2) errors.push('medecin_non_nuc.sections : au moins 2 sections');
  else checkSections(draft.medecin_non_nuc.sections, 'medecin_non_nuc', errors, warnings);

  // 8. Mouvement expert + couverture du gabarit
  const mnSections = draft.medecin_nuc?.sections;
  if (!isArr(mnSections) || mnSections.length === 0) {
    errors.push('medecin_nuc.sections manquantes');
  } else {
    checkSections(mnSections, 'medecin_nuc', errors, warnings);
    const titles = mnSections.map((s) => (s?.title || '').trim());
    if (template) {
      const expected = expectedMedecinNucSectionCodes(draft.type);
      for (const code of expected) {
        const re = new RegExp(`^\\s*${code}(?![0-9])\\b`);
        if (!titles.some((t) => re.test(t))) errors.push(`medecin_nuc : section ${code} absente (titre attendu « ${code} · … »)`);
      }
    } else if (draft.type === 'autre') {
      // Plan bespoke (sujet « autre » : généralités, physique, radioprotection,
      // calculateurs, scores, instrumentation, artefacts…). PAS de gabarit fixe —
      // mais on EXIGE la même rigueur que l'étalon : les 5 mouvements A→E présents,
      // densité comparable, et la carte d'identité (logique Comprendre→Réaliser→
      // Interpréter→Maîtriser→Ancrer, adaptée au sujet).
      const MIN_AUTRE = 12;
      if (mnSections.length < MIN_AUTRE) errors.push(`medecin_nuc (autre) : ${MIN_AUTRE} sections minimum pour égaler la densité de l'étalon (trouvé ${mnSections.length})`);
      const seenMv = new Set(titles.map((t) => (t.match(/^\s*([A-E])\d/) || [])[1]).filter(Boolean));
      for (const mv of ['A', 'B', 'C', 'D', 'E']) {
        if (!seenMv.has(mv)) errors.push(`medecin_nuc (autre) : mouvement ${mv} absent (sections « ${mv}1 · … » attendues — plan en 5 mouvements)`);
      }
    }
    if (!titles.some((t) => /carte d.identit/i.test(t))) errors.push('medecin_nuc : aucune section « Carte d’identité » (le composant IdentityCard ne s’afficherait pas)');
  }

  // 9. Sources + intégrité des citations
  if (!isArr(draft.sources) || draft.sources.length < 4) errors.push('sources : au moins 4 références attendues');
  else {
    const seen = new Set();
    draft.sources.forEach((src, i) => {
      if (!isNonEmptyStr(src?.title)) errors.push(`sources[${i}]: titre manquant`);
      if (!isNonEmptyStr(src?.url)) warnings.push(`sources[${i}]: url manquante`);
      else if (!/^https?:\/\//.test(src.url)) errors.push(`sources[${i}]: url non http(s) : ${src.url}`);
      const key = (src?.title || '').toLowerCase().slice(0, 60);
      if (seen.has(key)) warnings.push(`sources[${i}]: doublon probable (« ${src.title?.slice(0, 50)}… »)`);
      seen.add(key);
      if (src?.verified === false) warnings.push(`sources[${i}]: NON vérifiée par la recherche (risque de fabrication) — ${src.title?.slice(0, 50)}`);
    });
  }
  const strings = collectStrings({
    lead: draft.lead, identityCard: draft.identityCard, quiz: draft.quiz,
    revisionSheet: draft.revisionSheet, patient: draft.patient,
    medecin_non_nuc: draft.medecin_non_nuc, medecin_nuc: draft.medecin_nuc,
  });
  const cited = citedNumbers(strings);
  const nSources = isArr(draft.sources) ? draft.sources.length : 0;
  const maxRef = cited.size ? Math.max(...cited) : 0;
  if (maxRef > nSources) errors.push(`citations : [${maxRef}] référencée mais seulement ${nSources} source(s) (citation orpheline → fabrication probable)`);
  if (nSources > 0 && cited.size === 0) warnings.push('aucune citation [n] dans le texte alors que des sources existent');

  const stats = {
    type: draft.type,
    medecinNucSections: isArr(mnSections) ? mnSections.length : 0,
    patientSections: isArr(draft.patient?.sections) ? draft.patient.sections.length : 0,
    nonNucSections: isArr(draft.medecin_non_nuc?.sections) ? draft.medecin_non_nuc.sections.length : 0,
    quiz: isArr(draft.quiz) ? draft.quiz.length : 0,
    sources: nSources,
    citationsUsed: cited.size,
    identityFields: isArr(draft.identityCard) ? draft.identityCard.length : 0,
    relatedLinks: isArr(draft.relatedLinks) ? draft.relatedLinks.length : 0,
  };
  return { errors, warnings, stats };
}

export default validateDraft;
