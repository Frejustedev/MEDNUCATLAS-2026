// Assemble l'article MIBG : parties A-E rédigées par les agents + injection des
// figures + carte (lead/patient/medecin_non_nuc) → scripts/content/mibg.generated.json
import fs from 'node:fs';
import { MIBG_UPTAKE, MIBG_BIODISTRIB, GAMMA_CAMERA, ALARA_TDS } from './content/diagrams.mjs';

const PARTS = ['A', 'B', 'C', 'D', 'E'];
const DIR = new URL('./content/parts/', import.meta.url);
const OUT = new URL('./content/mibg.generated.json', import.meta.url);

const ALLOWED = ['title', 'text', 'list', 'infoBox', 'steps', 'stats', 'figure'];
const pick = (s) => Object.fromEntries(Object.entries(s).filter(([k]) => ALLOWED.includes(k)));

// Figures à injecter selon le préfixe de titre.
const FIGS = [
  { test: (t) => /^A4\b/.test(t), svg: MIBG_UPTAKE, alt: 'La MIBG, analogue de la noradrénaline, est captée par le transporteur NET (uptake-1) puis stockée dans les granules via le VMAT.', caption: 'Captation par le NET (uptake-1) puis stockage vésiculaire (VMAT) — base de la spécificité et des faux négatifs médicamenteux.' },
  { test: (t) => /^B9\b/.test(t), svg: GAMMA_CAMERA, alt: 'Schéma d’une gamma-caméra : collimateur, cristal NaI(Tl), photomultiplicateurs, électronique de positionnement.', caption: 'L’imagerie MIBG repose sur la γ-caméra (planaire + TEMP/TDM) ; le collimateur est adapté à l’énergie de l’iode.' },
  { test: (t) => /^C11\b/.test(t), svg: MIBG_BIODISTRIB, alt: 'Biodistribution physiologique de la ¹²³I-MIBG : glandes salivaires, myocarde, foie intense, rate, tube digestif, vessie, surrénales faibles.', caption: 'Repères physiologiques normaux — indispensables avant d’affirmer une fixation tumorale anormale.' },
  { test: (t) => /^D16\b/.test(t), svg: ALARA_TDS, alt: 'Temps, distance, écran : les trois leviers de réduction de dose (ALARA).', caption: 'Le triptyque « temps / distance / écran » structure les consignes au personnel et à l’entourage.' },
];

const sections = [];
for (const p of PARTS) {
  const fp = new URL(`./content/parts/mibg_${p}.json`, import.meta.url);
  if (!fs.existsSync(fp)) { console.error(`⚠ partie ${p} manquante (${fp.pathname})`); continue; }
  let arr;
  try { arr = JSON.parse(fs.readFileSync(fp, 'utf8')); }
  catch (e) { console.error(`✗ partie ${p} JSON invalide : ${e.message}`); process.exit(1); }
  for (const raw of arr) {
    const s = pick(raw);
    const fig = FIGS.find((f) => f.test(s.title || ''));
    if (fig && !s.figure) s.figure = { svg: fig.svg, alt: fig.alt, caption: fig.caption };
    sections.push(s);
  }
  console.log(`partie ${p} : ${arr.length} sections`);
}

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];

const article = {
  id: 'V2_MIBG', cat: 'endocrinologie', catLabel: 'Endocrinologie',
  title: 'Scintigraphie à la MIBG (¹²³I/¹³¹I) — phéochromocytome, paragangliome, neuroblastome',
  difficulty: 'avancé',
  tags: ['MIBG', '123I', '131I', 'phéochromocytome', 'paragangliome', 'neuroblastome', 'NET', 'SIOPEN', 'Curie', 'théranostique', 'sympatho-adrénergique'],
  targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
  authors: A, reviewStatus: 'ai_assisted',
  sources: [
    { title: 'Bombardieri E et al. — EANM procedure guidelines for ¹³¹I/¹²³I-mIBG scintigraphy in tumour imaging. Eur J Nucl Med Mol Imaging 2010;37(12):2436-2446', url: 'https://doi.org/10.1007/s00259-010-1545-7' },
    { title: 'Taïeb D et al. — EANM/SNMMI practice guideline for radionuclide imaging of phaeochromocytoma & paraganglioma. Eur J Nucl Med Mol Imaging 2019;46(10):2112-2137', url: 'https://www.eanm.org/publications/guidelines/' },
    { title: 'Lenders JWM et al. — Pheochromocytoma and Paraganglioma: an Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab 2014;99(6):1915-1942', url: 'https://doi.org/10.1210/jc.2014-1498' },
    { title: 'SIOPEN — Semi-quantitative ¹²³I-mIBG skeletal scoring (neuroblastome)', url: 'https://www.siopen.net' },
    { title: 'SNMMI — Procedure Standard for ¹²³I/¹³¹I-mIBG scintigraphy', url: 'https://www.snmmi.org/guidelines' },
    { title: 'ICRP Publication 128 — Radiation dose to patients from radiopharmaceuticals', url: 'https://www.icrp.org' },
  ],
  content: {
    lead: 'La **scintigraphie à la MIBG** (méta-iodobenzylguanidine) repère les tumeurs dérivées du **tissu nerveux sympathique** — surtout le **phéochromocytome**, le **paragangliome** et le **neuroblastome** de l’enfant. On injecte un traceur faiblement radioactif qui se fixe spécifiquement sur ces tumeurs, puis une caméra réalise des images du corps entier, en général **le lendemain**. L’examen est indolore et l’irradiation modérée. Il sert aussi à savoir si un **traitement par MIBG radioactive (¹³¹I-MIBG)** est envisageable — c’est un couple *théranostique*.',
    patient: {
      sections: [
        { title: 'À quoi sert l’examen ?', text: 'À **localiser** certaines tumeurs rares des glandes surrénales ou du système nerveux, et à voir si elles sont uniques ou multiples. Le produit injecté se fixe **spécifiquement** sur ces tumeurs, ce qui les fait « ressortir » sur les images.' },
        { title: 'Comment se préparer', list: [
          'Vous prendrez des **comprimés pour protéger la thyroïde** (iode/Lugol), à débuter avant l’examen et à poursuivre quelques jours après.',
          'Certains **médicaments** (pour la tension, antidépresseurs, décongestionnants…) gênent l’examen : ils sont arrêtés un temps **sur consigne médicale** — ne rien arrêter seul.',
          'Prévenez en cas de **grossesse** ou d’**allaitement**.',
        ] },
        { title: 'Le jour de l’examen et après', text: 'Une **injection** lente dans une veine. Les images sont prises **le lendemain** (parfois aussi à 2 jours), avec parfois un complément couplé au scanner (TEMP/TDM). C’est indolore ; pensez à **bien boire**. Quelques consignes simples de précaution vous seront remises pour les heures qui suivent.' },
      ],
    },
    medecin_non_nuc: {
      sections: [
        { title: 'Quand y penser', list: [
          '**Phéochromocytome / paragangliome** : localisation, formes multiples ou héréditaires (SDHx, NF1, VHL, MEN2), bilan d’extension.',
          '**Neuroblastome** de l’enfant : diagnostic, extension, évaluation de la réponse (score **SIOPEN**).',
          'Sélection des patients candidats à une **thérapie par ¹³¹I-MIBG** (tumeur MIBG-avide).',
        ] },
        { title: 'Avant d’adresser', infoBox: { type: 'warning', title: 'Deux pièges fréquents', text: '1) De nombreux **médicaments** (labétalol, tricycliques, sympathomimétiques…) bloquent la captation et donnent des **faux négatifs** : à anticiper. 2) Les formes **SDHB / dédifférenciées** fixent mal la MIBG → la **TEP au ⁶⁸Ga-DOTATATE** (ou ¹⁸F-FDOPA/FDG) est souvent plus performante. La MIBG garde sa place pour le neuroblastome et la sélection théranostique.' } },
        { title: 'Place dans la stratégie', text: 'Pour le **phéochromocytome/paragangliome**, les recommandations récentes placent souvent la **TEP-SSTR (⁶⁸Ga-DOTATATE)** en première ligne (sensibilité supérieure, surtout métastatique et SDHx). La **MIBG** reste centrale en **pédiatrie (neuroblastome)** et pour décider d’un **traitement par ¹³¹I-MIBG**.' },
      ],
    },
    medecin_nuc: { sections },
  },
};

fs.writeFileSync(OUT, JSON.stringify(article, null, 2), 'utf8');
const kb = (fs.statSync(OUT).size / 1024).toFixed(1);
console.log(`\n✓ mibg.generated.json écrit — ${sections.length} sections médecin nucléaire — ${kb} Ko`);
