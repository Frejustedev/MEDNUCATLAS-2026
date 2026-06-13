// Lot 7 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  BULLSEYE_17,
  PET_COINCIDENCE,
  FDG_UPTAKE,
  BONE_SCAN,
  RENOGRAM,
  GAMMA_CAMERA,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — TEP de perfusion myocardique ─────────────────────────────────────────
  {
    id: 'V2_TEP_PERFUSION_MYOCARDE', cat: 'cardiologie', catLabel: 'Cardiologie',
    title: 'TEP de perfusion myocardique (Rubidium-82 / 13N-ammoniac)', difficulty: 'avancé',
    tags: ['TEP', 'perfusion myocardique', 'rubidium-82', '13N-ammoniac', 'réserve coronaire', 'MBF'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'ASNC/SNMMI — Cardiac PET perfusion imaging', url: 'https://www.asnc.org' },
      { title: 'EANM — Myocardial perfusion PET', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **TEP de perfusion myocardique** (rubidium-82 ou 13N-ammoniac) évalue l’irrigation du cœur à l’effort pharmacologique et au repos, avec une **quantification absolue du débit sanguin myocardique (MBF)** et de la **réserve coronaire** — un atout sur la TEMP pour la maladie microvasculaire et l’atteinte tritronculaire.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À mesurer très précisément l’irrigation de votre cœur au repos et lors d’un « stress » (déclenché par un médicament), afin de détecter un manque d’apport sanguin.',
            figure: { svg: BULLSEYE_17, alt: 'Cible polaire à 17 segments du myocarde.', caption: 'La perfusion est analysée territoire par territoire (modèle 17 segments).' } },
          { title: 'Déroulement', text: 'Injection au repos puis sous stress pharmacologique, acquisitions rapides. Évitez la **caféine** 12–24 h avant (elle bloque le test).' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Atouts vs TEMP', list: ['**Quantification du MBF** (mL/min/g) et de la réserve coronaire (MFR).', 'Meilleure performance chez l’obèse, détection de l’atteinte **tritronculaire équilibrée** et **microvasculaire**.', 'Irradiation souvent moindre, examen rapide (traceurs à période très courte).'] },
          { title: 'Logistique', infoBox: { type: 'info', title: 'Disponibilité', text: 'Le Rb-82 nécessite un générateur dédié ; le 13N-ammoniac un cyclotron sur site (T½ 10 min). D’où une diffusion plus limitée que la TEMP.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceurs et protocole', text: '**Rb-82** (générateur 82Sr/82Rb, T½ 76 s) ou **13N-ammoniac** (cyclotron, T½ 10 min). Acquisition **dynamique** pour le calcul du MBF, stress pharmacologique (vasodilatateur). Gated-PET pour la FEVG.',
            stats: [{ value: '76 s / 10 min', label: 'T½ (Rb-82 / 13N)' }, { value: 'MBF + MFR', label: 'Quantification' }, { value: 'Gated-PET', label: 'FEVG' }] },
          { title: 'Pièges', list: ['Caféine/théophylline (bloquent le vasodilatateur).', 'Qualité du timing dynamique (modélisation cinétique).', 'Mouvement/contamination ; correction d’atténuation TDM alignée.'] },
        ],
      },
    },
  },

  // 2 — Sarcoïdose cardiaque (FDG) ───────────────────────────────────────────
  {
    id: 'V2_SARCOIDOSE_CARDIAQUE', cat: 'cardiologie', catLabel: 'Cardiologie',
    title: 'TEP-FDG dans la sarcoïdose cardiaque', difficulty: 'avancé',
    tags: ['sarcoïdose', 'TEP-FDG', 'inflammation cardiaque', 'préparation diététique', 'cardiologie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI/ASNC — Cardiac sarcoidosis FDG-PET expert consensus', url: 'https://www.asnc.org' },
      { title: 'HRS Expert Consensus — Cardiac sarcoidosis', url: 'https://www.hrsonline.org' },
    ],
    content: {
      lead: 'La **TEP-FDG cardiaque** détecte l’**inflammation active** de la sarcoïdose myocardique, complète l’IRM (fibrose/œdème) et guide le traitement immunosuppresseur et son suivi. Sa fiabilité dépend d’une **préparation diététique** stricte supprimant la captation physiologique du glucose par le myocarde.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À repérer des zones **inflammatoires** dans le muscle cardiaque (dans le cadre d’une maladie appelée sarcoïdose) et à suivre l’effet du traitement.' },
          { title: 'Préparation cruciale', infoBox: { type: 'warning', title: 'Régime spécifique', text: 'Un régime riche en graisses et pauvre en glucides (puis jeûne prolongé) la veille est indispensable : il « éteint » la consommation normale de sucre par le cœur pour ne voir que l’inflammation.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Diagnostic et évaluation de l’**activité** d’une sarcoïdose cardiaque suspectée (troubles du rythme/conduction, IC inexpliquée).', 'Bilan d’extension (TEP corps entier : ganglions, poumons) et **suivi sous immunosuppresseurs**.'] },
          { title: 'Complémentarité IRM', text: 'L’IRM montre la **fibrose** (rehaussement tardif) ; la TEP-FDG montre l’**inflammation active** (cible thérapeutique). Les deux sont souvent associées.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Préparation diététique (≥ 1–2 repas gras pauvres en glucides + jeûne 12–18 h ± héparine selon protocole). TEP cardiaque dédiée + corps entier. Analyse de la **distribution** (focale/diffuse) et corrélation perfusion si disponible.',
            figure: { svg: FDG_UPTAKE, alt: 'Mécanisme de captation du FDG par les cellules métaboliquement actives (ici inflammatoires).', caption: 'Le FDG marque les cellules inflammatoires actives — d’où la nécessité d’éteindre le myocarde normal.' } },
          { title: 'Pièges', list: ['Préparation diététique inadéquate → captation physiologique résiduelle (faux positifs).', 'Distinguer captation latérale physiologique des foyers pathologiques.', 'Couplage perfusion/FDG pour le pattern (mismatch).'] },
        ],
      },
    },
  },

  // 3 — Scintigraphie des glandes salivaires ─────────────────────────────────
  {
    id: 'V2_SCINTI_SALIVAIRE', cat: 'orl_salivaires', catLabel: 'ORL & Glandes Salivaires',
    title: 'Scintigraphie des glandes salivaires (syndrome de Sjögren)', difficulty: 'intermédiaire',
    tags: ['glandes salivaires', 'Sjögren', 'pertechnétate', '99mTc', 'xérostomie', 'fonction'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Salivary gland scintigraphy', url: 'https://www.eanm.org' },
      { title: 'ACR/EULAR — Sjögren classification criteria', url: 'https://www.eular.org' },
    ],
    content: {
      lead: 'La **scintigraphie des glandes salivaires** au **99mTc-pertechnétate** évalue de façon dynamique la **fonction** des glandes (captation et excrétion de salive), utile notamment dans le **syndrome de Sjögren** et l’exploration d’une bouche sèche (xérostomie).',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À mesurer le **fonctionnement** de vos glandes salivaires, par exemple en cas de bouche sèche persistante.' },
          { title: 'Déroulement', text: 'Après une injection, on suit en continu l’activité des glandes ; on vous donne parfois un **stimulant** (jus de citron) pour observer la sécrétion. Indolore, ~30–45 min.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Évaluation fonctionnelle dans le **syndrome de Sjögren** et autres causes de xérostomie.', 'Bilan d’une obstruction/atteinte glandulaire, suivi post-thérapeutique (ex. après ira-thérapie).'] },
          { title: 'Apport', infoBox: { type: 'info', title: 'Fonction vs structure', text: 'Contrairement à l’échographie/IRM (structure), la scintigraphie quantifie la fonction sécrétoire — utile quand l’imagerie morphologique est peu contributive.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Acquisition **dynamique** après injection de **99mTc-pertechnétate**, avec **stimulation** (acide citrique) pour évaluer l’excrétion. Courbes activité-temps par glande (parotides, sous-maxillaires).',
            stats: [{ value: '99mTc-pertechnétate', label: 'Traceur' }, { value: 'Dynamique', label: 'Acquisition' }, { value: 'Stimulation citron', label: 'Excrétion' }] },
          { title: 'Lecture', text: 'Analyse de la **captation** (fonction parenchymateuse) et de l’**excrétion** post-stimulation ; atteinte typiquement diffuse et symétrique dans le Sjögren évolué.' },
        ],
      },
    },
  },

  // 4 — TEP-18F-choline ──────────────────────────────────────────────────────
  {
    id: 'V2_TEP_CHOLINE', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM à la 18F-choline (prostate, parathyroïde)', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-choline', 'prostate', 'parathyroïde', 'récidive', 'membrane'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Choline PET/CT in prostate cancer', url: 'https://www.eanm.org' },
      { title: 'SNMMI — 18F-fluorocholine applications', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **TEP à la 18F-choline** explore la **synthèse des membranes cellulaires** (choline incorporée dans les phospholipides). Historiquement utilisée dans la **récidive du cancer de la prostate**, elle est aujourd’hui souvent supplantée par le PSMA, mais reste très utile pour la **localisation des adénomes parathyroïdiens**.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications actuelles', list: ['**Hyperparathyroïdie** : localisation d’adénome, notamment si échographie/MIBI non concluants (excellente sensibilité).', 'Cancer de la **prostate** : récidive biochimique (alternative au PSMA selon disponibilité).'] },
          { title: 'Positionnement', infoBox: { type: 'info', title: 'Choline vs PSMA', text: 'Pour la prostate, la TEP-PSMA est plus sensible à PSA bas. La choline garde une place quand le PSMA n’est pas disponible, et s’impose pour la parathyroïde.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et interprétation', text: 'Injection de **18F-choline**, acquisition précoce ± tardive. Pour la parathyroïde : TEP/TDM (ou TEP/IRM) ciblée cervico-médiastinale. Attention aux captations physiologiques (foie, pancréas, intestin, glandes salivaires).',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'Comme tout traceur TEP au 18F, la choline est détectée par coïncidence des photons de 511 keV.' },
            stats: [{ value: '18F-choline', label: 'Traceur (T½ 110 min)' }, { value: 'Parathyroïde', label: 'Indication phare' }, { value: 'PSMA', label: 'Souvent préféré (prostate)' }] },
          { title: 'Pièges', list: ['Captations inflammatoires (ganglions réactionnels).', 'Lésions peu avides ; comparer aux données cliniques.', 'Pour la parathyroïde : repérer les sites ectopiques.'] },
        ],
      },
    },
  },

  // 5 — TEP-18F-NaF osseux ───────────────────────────────────────────────────
  {
    id: 'V2_TEP_NAF_OS', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-fluorure de sodium (NaF) — os', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-NaF', 'métastases osseuses', 'remodelage osseux', 'oncologie'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI/EANM — 18F-NaF PET/CT bone imaging', url: 'https://doi.org/10.2967/jnumed.115.167759' },
    ],
    content: {
      lead: 'La **TEP au 18F-fluorure de sodium (NaF)** est un traceur osseux à très haute résolution : le fluorure se fixe sur l’**hydroxyapatite** des zones de remodelage. Elle offre une **sensibilité supérieure** à la scintigraphie osseuse planaire pour les métastases, au prix d’une moindre disponibilité.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Recherche/suivi de **métastases osseuses** quand une grande sensibilité est requise.', 'Bilan de douleurs osseuses complexes ; pathologies bénignes sélectionnées.'] },
          { title: 'Vs scintigraphie osseuse', infoBox: { type: 'info', title: 'Plus sensible', text: 'Le NaF-TEP a une meilleure résolution et un contraste supérieur au 99mTc-MDP, mais nécessite une TEP (coût/disponibilité). Le choix dépend du contexte et des ressources.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Mécanisme et protocole', text: 'Le **18F⁻** échange avec les ions hydroxyle de l’hydroxyapatite (captation proportionnelle au remodelage et à la perfusion). Acquisition TEP/TDM ~45–60 min après injection.',
            figure: { svg: BONE_SCAN, alt: 'Fixation osseuse d’un traceur sur les zones de remodelage.', caption: 'Comme le MDP, le NaF marque le remodelage osseux — avec la résolution de la TEP.' },
            stats: [{ value: '18F-NaF', label: 'Traceur (T½ 110 min)' }, { value: '~45–60 min', label: 'Délai' }, { value: 'Hydroxyapatite', label: 'Cible' }] },
          { title: 'Pièges', list: ['Forte fixation des remaniements bénins (arthrose, fractures) : corréler à la TDM.', 'Spécificité améliorée par le couplage TDM.'] },
        ],
      },
    },
  },

  // 6 — TEP-18F-FDOPA ────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDOPA', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'TEP à la 18F-FDOPA (mouvements, TNE, gliomes)', difficulty: 'avancé',
    tags: ['18F-FDOPA', 'TEP', 'Parkinson', 'tumeurs neuroendocrines', 'gliome', 'dopamine'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — 18F-DOPA PET procedure guidelines', url: 'https://doi.org/10.1007/s00259-020-05038-9' },
    ],
    content: {
      lead: 'La **18F-FDOPA** est un analogue de la L-DOPA, marqueur du **métabolisme de la dopamine** et des cellules à activité décarboxylase. Ses applications sont variées : exploration **présynaptique dopaminergique** (syndromes parkinsoniens), **tumeurs neuroendocrines**, **gliomes** et hyperinsulinisme.',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Syndromes parkinsoniens** : atteinte dopaminergique présynaptique (alternative/complément au DaTscan).', '**TNE** et phéochromocytome/paragangliome (selon disponibilité).', '**Gliomes** : délimitation, récidive vs radionécrose ; hyperinsulinisme congénital.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Prémédication possible (carbidopa) pour augmenter la disponibilité cérébrale/tumorale selon l’indication. Acquisition dédiée (cérébrale ou corps entier). Interprétation spécifique à l’indication.',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP.', caption: 'Traceur TEP au 18F : détection en coïncidence des photons de 511 keV.' },
            stats: [{ value: '18F-FDOPA', label: 'Traceur' }, { value: 'Carbidopa', label: 'Prémédication (selon indic.)' }, { value: 'Multi-usage', label: 'Neuro / TNE / gliome' }] },
          { title: 'Pièges', list: ['Captation physiologique des noyaux gris (neuro) et du pancréas/voies biliaires (corps entier).', 'Protocole adapté à chaque indication (prémédication, timing).'] },
        ],
      },
    },
  },

  // 7 — Cadre réglementaire ──────────────────────────────────────────────────
  {
    id: 'V2_REGLEMENTATION', cat: 'reglementation', catLabel: 'Réglementation',
    title: 'Cadre réglementaire de la médecine nucléaire', difficulty: 'intermédiaire',
    tags: ['réglementation', 'ASN', 'Euratom', 'AIEA', 'autorisation', 'radioprotection'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Directive Euratom 2013/59 (normes de base)', url: 'https://eur-lex.europa.eu' },
      { title: 'ASN — Médecine nucléaire (France)', url: 'https://www.asn.fr' },
      { title: 'AIEA — Basic Safety Standards (GSR Part 3)', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'La médecine nucléaire est strictement encadrée pour protéger patients, personnel et public. Le socle repose sur les principes de **justification, optimisation (ALARA) et limitation**, déclinés par des autorités (**ASN** en France) et des cadres internationaux (**Euratom**, **AIEA**).',
      medecin_non_nuc: {
        sections: [
          { title: 'Les trois principes', list: ['**Justification** : toute exposition doit apporter un bénéfice supérieur au risque.', '**Optimisation (ALARA)** : dose aussi faible que raisonnablement possible.', '**Limitation** : limites de dose réglementaires (public, travailleurs).'] },
          { title: 'En pratique', text: 'Autorisations de détention/utilisation des sources, locaux et zonage conformes, personnel formé, contrôles qualité, traçabilité des sources et des déchets.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Acteurs et obligations', list: ['**ASN** (autorisations, inspections), **IRSN** (expertise), en France.', 'Personne Compétente en Radioprotection (**PCR**), physicien médical.', 'Niveaux de Référence Diagnostiques (**NRD**), assurance qualité, matériovigilance/pharmacovigilance.'] },
          { title: 'Spécificités africaines', infoBox: { type: 'info', title: 'Contexte régional', text: 'De nombreux pays s’appuient sur les standards de l’AIEA et mettent en place des autorités nationales de radioprotection ; l’AIEA accompagne la formation et l’équipement des centres.' } },
        ],
      },
    },
  },

  // 8 — Comment se déroule un examen (SEO patient) ──────────────────────────
  {
    id: 'V2_DEROULEMENT_EXAMEN', cat: 'generalites', catLabel: 'Généralités',
    title: 'Comment se déroule un examen de médecine nucléaire ?', difficulty: 'fondamental',
    tags: ['déroulement', 'examen', 'scintigraphie', 'TEP', 'patient', 'durée'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SFMN — Déroulement des examens', url: 'https://www.sfmn.org' },
      { title: 'EANM — Patient pathway', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Un examen de médecine nucléaire suit presque toujours les mêmes grandes étapes : **accueil et vérifications**, **administration du traceur** (souvent une injection), **temps d’attente** pour que le produit se fixe, puis **acquisition des images**. La durée varie selon l’examen.',
      patient: {
        sections: [
          { title: 'Les étapes', steps: [
            { title: 'Accueil', text: 'Vérification de votre identité, de l’indication et des consignes (jeûne, médicaments, grossesse).' },
            { title: 'Administration', text: 'Injection (le plus souvent), parfois inhalation ou prise orale. Geste rapide.' },
            { title: 'Attente', text: 'De quelques minutes à 2–3 h selon l’examen, le temps que le produit se fixe.' },
            { title: 'Images', text: 'Vous êtes allongé sous une caméra ; il faut rester immobile. Indolore, sans bruit fort.' },
          ] },
          { title: 'Après', text: 'Vous rentrez chez vous et reprenez une activité normale. **Buvez beaucoup**. Le compte-rendu est transmis à votre médecin.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Variabilité', text: 'La durée totale dépend du délai de fixation (immédiat pour une perfusion cérébrale, ~1 h pour une TEP-FDG, 2–3 h pour une scintigraphie osseuse). Préciser au patient l’organisation et l’éventuel jeûne.' },
        ],
      },
    },
  },

  // 9 — L'équipe de médecine nucléaire ───────────────────────────────────────
  {
    id: 'V2_EQUIPE_MN', cat: 'generalites', catLabel: 'Généralités',
    title: 'L’équipe de médecine nucléaire : qui fait quoi ?', difficulty: 'fondamental',
    tags: ['équipe', 'médecin nucléaire', 'manipulateur', 'radiopharmacien', 'physicien', 'PCR'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SFMN — Les métiers de la médecine nucléaire', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'Un service de médecine nucléaire réunit plusieurs métiers complémentaires qui garantissent la **qualité** des examens et la **sécurité** (radioprotection) : médecin nucléaire, manipulateur, radiopharmacien, physicien médical, et personne compétente en radioprotection.',
      patient: {
        sections: [
          { title: 'Qui allez-vous rencontrer ?', list: ['**Le manipulateur (MERM)** : vous accueille, réalise l’injection et les images.', '**Le médecin nucléaire** : valide l’indication, interprète et rédige le compte-rendu.', 'En coulisses : le **radiopharmacien** (prépare et contrôle le produit), le **physicien médical** (qualité/dosimétrie), la **PCR** (radioprotection).'] },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Organisation', text: 'Cette équipe pluridisciplinaire assure la chaîne complète : préparation du radiopharmaceutique, contrôle qualité, acquisition optimisée, interprétation et radioprotection — garantie d’un examen fiable et sûr.' },
        ],
      },
    },
  },

  // 10 — Scintigraphie rénale au DMSA ────────────────────────────────────────
  {
    id: 'V2_SCINTI_DMSA', cat: 'nephro_urologie', catLabel: 'Néphro-Urologie',
    title: 'Scintigraphie rénale statique au 99mTc-DMSA', difficulty: 'intermédiaire',
    tags: ['DMSA', 'scintigraphie rénale', 'cicatrices', 'pyélonéphrite', 'fonction séparée', 'pédiatrie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — DMSA renal scintigraphy guideline', url: 'https://doi.org/10.1007/s00259-018-3923-4' },
      { title: 'SNMMI — Renal cortical scintigraphy', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **scintigraphie rénale au 99mTc-DMSA** image le **cortex rénal fonctionnel**. C’est l’examen de référence pour détecter les **cicatrices** rénales et les séquelles de **pyélonéphrite** (surtout chez l’enfant), et pour mesurer la **fonction rénale séparée**.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À examiner en détail le **tissu** de chaque rein, par exemple pour rechercher des cicatrices après des infections urinaires.',
            figure: { svg: RENOGRAM, alt: 'Illustration de courbes rénales (rénogramme) — le DMSA, lui, donne une image statique du cortex.', caption: 'À la différence du MAG3 (dynamique), le DMSA fournit une image statique du cortex rénal.' } },
          { title: 'Déroulement', text: 'Une injection, puis un délai de **2–4 h** avant des images des reins. Indolore ; chez l’enfant, la préparation est adaptée.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Détection des **cicatrices** corticales (séquelles de pyélonéphrite), surtout en pédiatrie.', 'Mesure de la **fonction rénale séparée** (% par rein).', 'Bilan de reins dysplasiques/ectopiques.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection de **99mTc-DMSA** (fixation corticale tubulaire), imagerie statique à **2–4 h** (incidences postérieure et obliques), ± TEMP pour les cicatrices. Calcul de la fonction séparée.',
            stats: [{ value: '99mTc-DMSA', label: 'Traceur cortical' }, { value: '2–4 h', label: 'Délai d’imagerie' }, { value: 'Fonction séparée', label: '% par rein' }] },
          { title: 'Pièges', list: ['Délai insuffisant (mauvaise fixation corticale).', 'Distinguer cicatrice fixée d’une atteinte aiguë (contexte clinique).', 'Pédiatrie : activité adaptée au poids (EANM card).'] },
        ],
      },
    },
  },
];
