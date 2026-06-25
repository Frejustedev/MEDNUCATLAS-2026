// ─────────────────────────────────────────────────────────────────────────────
// FILE D'ATTENTE DES SUJETS — pipeline FULL-AUTO de génération NucleAtlas
// ─────────────────────────────────────────────────────────────────────────────
// Chaque sujet est généré au gabarit correspondant (examen → EXAMEN_TEMPLATE,
// maladie → MALADIE_TEMPLATE). Les `id` n'entrent JAMAIS en collision avec les
// 110 articles V2 existants + V2_MIBG + V2_PHEOCHROMOCYTOME (vérifié).
//
// Champs :
//   id           identifiant Firestore (préfixe V2_, [A-Za-z0-9_-]+)
//   type         'examen' | 'maladie'
//   title        titre affiché (UTF-8, exposants Unicode ¹²³…)
//   cat          catégorie (lib/data.ts Category)
//   catLabel     libellé de catégorie
//   difficulty   'fondamental' | 'intermédiaire' | 'avancé'
//   status       'pilot' | 'pending' | 'done'   (les 2 pilotes sont produits d'abord)
//   scope        brief court : ce que l'article doit couvrir (cadre la recherche)
//   suggestedFigures  clés de diagrams.mjs réutilisables (figures déterministes)
//   graphLinks   ids d'articles existants à connecter (referme le graphe)
// ─────────────────────────────────────────────────────────────────────────────

export const QUEUE = [
  // ── PILOTES (bout-en-bout) ─────────────────────────────────────────────────
  // Paire qui referme le graphe PSMA : examen diagnostique ↔ maladie ↔ théranostique
  // (V2_177LU_PSMA_PLUVICTO, V2_225AC_PSMA) ↔ score (V2_PSMA_RADS), tous existants.
  {
    id: 'V2_TEP_PSMA',
    type: 'examen',
    title: 'TEP au ⁶⁸Ga-PSMA-11 / ¹⁸F-PSMA',
    cat: 'prostate',
    catLabel: 'Cancer de la Prostate',
    difficulty: 'avancé',
    status: 'pilot',
    scope: 'TEP des ligands du PSMA (⁶⁸Ga-PSMA-11, ¹⁸F-DCFPyL/piflufolastat, ¹⁸F-PSMA-1007) dans le cancer de la prostate : cible PSMA, indications (bilan initial haut risque, récidive biochimique, sélection pré-RLT), sémiologie & PSMA-RADS / miTNM (PROMISE), pièges (ganglions cœliaques, côtes, fixations physiologiques glandes salivaires/rein/grêle), performances (proPSMA), place vs TEP-choline/IRM, axe théranostique ¹⁷⁷Lu-PSMA.',
    suggestedFigures: ['PSMA_BINDING', 'PET_COINCIDENCE', 'THERANOSTIC_LOOP', 'BONE_SCAN', 'ALARA_TDS'],
    graphLinks: ['V2_177LU_PSMA_PLUVICTO', 'V2_225AC_PSMA', 'V2_PSMA_RADS', 'V2_TEP_CHOLINE'],
  },
  {
    id: 'V2_CANCER_PROSTATE',
    type: 'maladie',
    title: 'Cancer de la prostate',
    cat: 'prostate',
    catLabel: 'Cancer de la Prostate',
    difficulty: 'avancé',
    status: 'pilot',
    scope: 'Adénocarcinome prostatique vu par la médecine nucléaire : cibles imageables (PSMA surexprimé, métabolisme choline, atteinte osseuse), classification (ISUP/Gleason, d’Amico, TNM), rôle pivot de la TEP-PSMA au bilan d’extension haut risque et en récidive biochimique, stratification (PSA, PSADT), boucle théranostique ¹⁸F/⁶⁸Ga-PSMA → ¹⁷⁷Lu-PSMA-617 (VISION/TheraP) et ²²⁵Ac-PSMA, scintigraphie osseuse / ¹⁸F-NaF, pièges post-traitement (flare osseux, ADT et baisse d’avidité PSMA).',
    suggestedFigures: ['PSMA_BINDING', 'THERANOSTIC_LOOP', 'BONE_SCAN', 'PET_COINCIDENCE'],
    graphLinks: ['V2_TEP_PSMA', 'V2_177LU_PSMA_PLUVICTO', 'V2_225AC_PSMA', 'V2_PSMA_RADS', 'V2_TEP_CHOLINE', 'V2_TEP_NAF_OS'],
  },

  // ── BACKLOG EXAMENS (pending) ──────────────────────────────────────────────
  {
    id: 'V2_OCTREOSCAN', type: 'examen', title: 'Scintigraphie des récepteurs de la somatostatine (¹¹¹In-pentétréotide)',
    cat: 'tne', catLabel: 'Tumeurs Neuroendocrines', difficulty: 'intermédiaire', status: 'pending',
    scope: 'OctreoScan historique (¹¹¹In-DTPA-octréotide) : cible SSTR, place résiduelle vs ⁶⁸Ga-DOTATATE TEP, score de Krenning, protocole TEMP/TDM.',
    suggestedFigures: ['SSTR_BINDING', 'GAMMA_CAMERA', 'ALARA_TDS'], graphLinks: ['V2_TEP_DOTATATE_TNE', 'V2_LUTATHERA'],
  },
  {
    id: 'V2_TEP_FDG_PROTOCOLE', type: 'examen', title: 'TEP-TDM au ¹⁸F-FDG : principes & protocole',
    cat: 'instrumentation', catLabel: 'Instrumentation', difficulty: 'intermédiaire', status: 'pending',
    scope: 'Examen générique TEP-FDG (physique de la coïncidence, captation FDG, préparation glycémie, SUV, PERCIST) — socle transversal référencé par les nombreux articles TEP-FDG d’organe.',
    suggestedFigures: ['FDG_UPTAKE', 'PET_COINCIDENCE', 'ALARA_TDS'], graphLinks: ['V2_COMPRENDRE_SUV', 'V2_PERCIST_RECIST'],
  },
  {
    id: 'V2_LYMPHOSCINTIGRAPHIE', type: 'examen', title: 'Lymphoscintigraphie',
    cat: 'vasculaire_lymphatique', catLabel: 'Vasculaire & Lymphatique', difficulty: 'fondamental', status: 'pending',
    scope: 'Cartographie lymphatique au ⁹⁹ᵐTc-nanocolloïde : lymphœdème, repérage du ganglion sentinelle, protocole, pièges.',
    suggestedFigures: ['SENTINEL_NODE', 'GAMMA_CAMERA'], graphLinks: ['V2_LYMPHO_LYMPHOEDEME', 'V2_GANGLION_SENTINELLE_MELANOME'],
  },
  {
    id: 'V2_TEP_PERFUSION_RB82', type: 'examen', title: 'TEP de perfusion myocardique au ⁸²Rb',
    cat: 'cardiologie', catLabel: 'Cardiologie', difficulty: 'avancé', status: 'pending',
    scope: 'TEP de perfusion au Rubidium-82 (générateur), réserve de flux coronaire (MBF/CFR), comparaison à la TEMP MPI.',
    suggestedFigures: ['MPI_PROTOCOL', 'BULLSEYE_17', 'PET_COINCIDENCE'], graphLinks: ['V2_TEP_PERFUSION_MYOCARDE'],
  },

  // ── BACKLOG MALADIES (pending) ─────────────────────────────────────────────
  {
    id: 'V2_CANCER_THYROIDE_DIFFERENCIE', type: 'maladie', title: 'Cancer thyroïdien différencié',
    cat: 'theranostique_thyroide', catLabel: 'Pathologies Thyroïdiennes', difficulty: 'avancé', status: 'pending',
    scope: 'Carcinome thyroïdien différencié (papillaire/folliculaire) : captation iodée (NIS) comme cible, stratification ATA, balayage corps entier ¹³¹I diagnostique/post-thérapeutique, thyroglobuline, boucle théranostique ¹²³I→¹³¹I, formes réfractaires (TEP-FDG).',
    suggestedFigures: ['THYROID_NIS', 'THYROID_UPTAKE', 'THERANOSTIC_LOOP'], graphLinks: ['V2_I131_CANCER_THYROIDE', 'V2_TEP_FDG_THYROIDE_DEDIFF', 'V2_SCINTI_THYROIDE'],
  },
  {
    id: 'V2_NEUROBLASTOME', type: 'maladie', title: 'Neuroblastome',
    cat: 'pediatrie', catLabel: 'Pédiatrie', difficulty: 'avancé', status: 'pending',
    scope: 'Tumeur sympathique de l’enfant : cible NET (MIBG ~90 %), scores Curie/SIOPEN, INRG, boucle théranostique ¹²³I→¹³¹I-MIBG, place du ¹⁸F-FDG si MIBG-négatif.',
    suggestedFigures: ['MIBG_UPTAKE', 'MIBG_BIODISTRIB', 'THERANOSTIC_LOOP'], graphLinks: ['V2_MIBG', 'V2_SCINTI_OSSEUSE_PEDIATRIE'],
  },
  {
    id: 'V2_TUMEURS_NEUROENDOCRINES', type: 'maladie', title: 'Tumeurs neuroendocrines digestives (GEP-NET)',
    cat: 'tne', catLabel: 'Tumeurs Neuroendocrines', difficulty: 'avancé', status: 'pending',
    scope: 'GEP-NET : cible SSTR2, grade Ki-67, ⁶⁸Ga-DOTATATE (Krenning) vs ¹⁸F-FDG (haut grade), boucle théranostique ⁶⁸Ga→¹⁷⁷Lu-DOTATATE (NETTER-1).',
    suggestedFigures: ['SSTR_BINDING', 'THERANOSTIC_LOOP', 'FDG_UPTAKE'], graphLinks: ['V2_TEP_DOTATATE_TNE', 'V2_LUTATHERA'],
  },
  {
    id: 'V2_LYMPHOME_HODGKIN', type: 'maladie', title: 'Lymphome de Hodgkin',
    cat: 'hematologie', catLabel: 'Hématologie & Lymphomes', difficulty: 'intermédiaire', status: 'pending',
    scope: 'Lymphome de Hodgkin : hypermétabolisme (FDG), classification Ann Arbor/Lugano, TEP intérimaire (Deauville, PET-adapted), évaluation de réponse, pièges (thymus, rebond, inflammation).',
    suggestedFigures: ['FDG_UPTAKE', 'PET_COINCIDENCE'], graphLinks: ['V2_TEP_FDG_LYMPHOME', 'V2_LUGANO'],
  },
];

// Sélecteurs utilitaires.
export const pilots = () => QUEUE.filter((s) => s.status === 'pilot');
export const pending = () => QUEUE.filter((s) => s.status === 'pending');
export const bySubjectId = (id) => QUEUE.find((s) => s.id === id);

export default QUEUE;
