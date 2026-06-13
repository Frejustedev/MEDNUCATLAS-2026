// Lot 4 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  SENTINEL_NODE,
  PET_COINCIDENCE,
  FDG_UPTAKE,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Mélanome / ganglion sentinelle ───────────────────────────────────────
  {
    id: 'V2_GANGLION_SENTINELLE_MELANOME', cat: 'dermatologie_melanome', catLabel: 'Dermatologie & Mélanome',
    title: 'Détection du ganglion sentinelle dans le mélanome', difficulty: 'intermédiaire',
    tags: ['ganglion sentinelle', 'mélanome', 'lymphoscintigraphie', '99mTc-nanocolloïdes', 'SPECT/CT'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI guideline — Sentinel node in melanoma', url: 'https://doi.org/10.1007/s00259-015-3135-1' },
      { title: 'INCa — Prise en charge du mélanome cutané', url: 'https://www.e-cancer.fr' },
    ],
    content: {
      lead: 'Dans le **mélanome cutané**, la **lymphoscintigraphie** repère le ou les **ganglions sentinelles** drainant la tumeur — souvent imprévisibles du fait du drainage cutané complexe. Leur exérèse sélective évalue l’extension ganglionnaire sans curage systématique.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Le mélanome peut diffuser d’abord vers un **premier ganglion**. On injecte près de la cicatrice un produit faiblement radioactif qui suit le trajet lymphatique pour identifier ce ganglion, qui sera ensuite analysé.',
            figure: { svg: SENTINEL_NODE, alt: 'Drainage lymphatique d’une tumeur cutanée vers le premier relais (ganglion sentinelle).', caption: 'Le drainage cutané est repéré jusqu’au premier ganglion (sentinelle).' } },
          { title: 'Déroulement', text: 'Plusieurs petites injections autour de la cicatrice, puis des images du trajet lymphatique. Le repérage final a lieu au bloc avec une sonde.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indication', text: 'Proposée pour les mélanomes d’épaisseur intermédiaire (selon indice de Breslow et facteurs de risque) sans atteinte ganglionnaire clinique : valeur **pronostique** majeure et orientation thérapeutique.' },
          { title: 'Particularité', infoBox: { type: 'info', title: 'Drainage imprévisible', text: 'Le drainage cutané peut être multidirectionnel (plusieurs bassins, ganglions « en transit »). La lymphoscintigraphie + SPECT/CT cartographie ces trajets atypiques, essentiels au chirurgien.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection intradermique péri-cicatricielle de **99mTc-nanocolloïdes**, imagerie dynamique précoce + statique, **SPECT/CT** pour la localisation anatomique. Marquage cutané des points en regard.',
            stats: [{ value: '99mTc-nanocolloïdes', label: 'Traceur' }, { value: 'SPECT/CT', label: 'Localisation' }, { value: 'Sonde per-op', label: 'Repérage' }] },
          { title: 'Points clés', list: ['Repérer les ganglions « en transit » et les bassins multiples.', 'Délai injection–chirurgie maîtrisé.', 'Coordination avec le chirurgien (points cutanés, intensité).'] },
        ],
      },
    },
  },

  // 2 — Lymphœdème / lymphoscintigraphie ──────────────────────────────────────
  {
    id: 'V2_LYMPHO_LYMPHOEDEME', cat: 'vasculaire_lymphatique', catLabel: 'Vasculaire & Lymphatique',
    title: 'Lymphoscintigraphie des membres (lymphœdème)', difficulty: 'intermédiaire',
    tags: ['lymphoscintigraphie', 'lymphœdème', 'reflux dermique', '99mTc-nanocolloïdes', 'œdème'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Lymphoscintigraphy procedure', url: 'https://www.eanm.org' },
      { title: 'ISL Consensus — Diagnosis of lymphedema', url: 'https://www.lymphology.org' },
    ],
    content: {
      lead: 'La **lymphoscintigraphie** explore le **système lymphatique** d’un membre œdématié : elle confirme le **lymphœdème**, en précise le mécanisme (primaire/secondaire) et guide la prise en charge (drainage, chirurgie de reconstruction lymphatique).',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'Quand un bras ou une jambe gonfle de façon persistante, cet examen vérifie si la **circulation lymphatique** (qui draine les liquides) fonctionne correctement.' },
          { title: 'Déroulement', text: 'Une injection entre les orteils ou les doigts, puis des images à plusieurs temps (parfois après une marche douce pour stimuler la circulation). Examen long mais indolore.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Confirmer un **lymphœdème** devant un œdème chronique inexpliqué.', 'Distinguer lymphœdème primaire vs secondaire (post-chirurgie/radiothérapie, ex. après curage axillaire).', 'Bilan pré-opératoire de chirurgie lymphatique (anastomoses).'] },
          { title: 'Apport', infoBox: { type: 'info', title: 'Signes évocateurs', text: 'Retard de transit, asymétrie droite/gauche, et surtout le « reflux dermique » (diffusion cutanée du traceur) sont caractéristiques du lymphœdème.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection sous-cutanée/interdigitale de **99mTc-nanocolloïdes**, acquisitions à temps précoces et tardifs (± épreuve d’effort standardisée). Analyse qualitative (voies, ganglions, reflux dermique) et semi-quantitative (transit, index).',
            stats: [{ value: '99mTc-nanocolloïdes', label: 'Traceur' }, { value: 'Précoce + tardif', label: 'Temps d’acquisition' }, { value: 'Reflux dermique', label: 'Signe clé' }] },
          { title: 'Pièges', list: ['Technique d’injection et d’effort à standardiser (comparabilité).', 'Asymétrie physiologique modérée.', 'Œdème non lymphatique (veineux, hypoprotidique) : transit conservé.'] },
        ],
      },
    },
  },

  // 3 — Urgences en médecine nucléaire ────────────────────────────────────────
  {
    id: 'V2_URGENCES_MN', cat: 'urgences', catLabel: 'Urgences en MN',
    title: 'Situations urgentes et incidents en médecine nucléaire', difficulty: 'intermédiaire',
    tags: ['urgences', 'extravasation', 'réaction', 'contamination', 'radioprotection', 'sécurité'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Radiation safety & incident management', url: 'https://www.eanm.org' },
      { title: 'SFMN — Guide de gestion des incidents', url: 'https://www.sfmn.org' },
    ],
    content: {
      lead: 'La médecine nucléaire est globalement très sûre, mais quelques **situations à connaître** nécessitent une réaction adaptée : extravasation du traceur, réaction au radiopharmaceutique, malaise lors d’une épreuve d’effort, ou incident de contamination. Anticipation et procédures écrites en sont la clé.',
      patient: {
        sections: [
          { title: 'Est-ce dangereux ?', text: 'Les incidents sérieux sont **rares**. Les produits injectés sont à très faible dose et bien tolérés. L’équipe est formée pour gérer rapidement tout imprévu (malaise, douleur au point d’injection…). N’hésitez jamais à signaler une gêne.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'À connaître', list: ['**Épreuve d’effort/stress pharmacologique** : surveiller le patient (ECG, tension), antidotes disponibles (aminophylline pour les vasodilatateurs).', 'Réactions aux radiopharmaceutiques : exceptionnelles mais possibles (MAA, colloïdes).', 'Thérapies (I-131, 177Lu, 90Y) : consignes de radioprotection et conduite en cas d’hospitalisation/urgence vitale.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Incidents fréquents et conduite', steps: [
            { title: 'Extravasation', text: 'Arrêt de l’injection, surélévation, documentation ; impact dosimétrique local et sur la qualité (paravasat). Imagerie à réinterpréter.' },
            { title: 'Réaction au traceur', text: 'Protocole d’urgence standard ; signalement de pharmacovigilance/matériovigilance.' },
            { title: 'Contamination', text: 'Délimiter, décontaminer (du moins vers le plus contaminé), contrôler à la sonde, tracer l’incident.' },
            { title: 'Patient traité décédé / urgence vitale', text: 'Procédures spécifiques (radioprotection des soignants, autopsie/inhumation après thérapie par radionucléides).' },
          ] },
          { title: 'Prévention', infoBox: { type: 'warning', title: 'Procédures écrites', text: 'Disposer de procédures d’urgence affichées, d’un chariot d’urgence vérifié, d’une formation régulière et d’une PCR (personne compétente en radioprotection) joignable.' } },
        ],
      },
    },
  },

  // 4 — TEP-FDG cancers ORL ────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_ORL', cat: 'orl_salivaires', catLabel: 'ORL & Glandes Salivaires',
    title: 'TEP-TDM au 18F-FDG dans les cancers ORL', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'cancers ORL', 'cavum', 'cancer occulte', 'récidive'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET/CT in head and neck cancer', url: 'https://doi.org/10.1007/s00259-019-04580-5' },
      { title: 'NCCN / INCa — Cancers des voies aérodigestives supérieures', url: 'https://www.e-cancer.fr' },
    ],
    content: {
      lead: 'Dans les **cancers ORL** (voies aérodigestives supérieures), la **TEP-FDG** contribue au bilan d’extension ganglionnaire et métastatique, à la **recherche d’un primitif occulte** devant une adénopathie cervicale, à la planification de radiothérapie et au suivi post-traitement.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Il cartographie en une fois la tumeur, les ganglions du cou et d’éventuelles localisations à distance, et aide à **trouver l’origine** d’un ganglion suspect.',
            figure: { svg: PET_COINCIDENCE, alt: 'Schéma de la détection en coïncidence en TEP.', caption: 'La TEP localise les foyers de forte consommation de glucose, y compris de petits ganglions.' } },
          { title: 'Préparation', text: 'TEP-FDG classique : jeûne 4–6 h, glycémie contrôlée, **repos vocal et musculaire** (parler/mâcher peut faire fixer les muscles du cou).' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Bilan d’extension des carcinomes ORL localement avancés.', '**Adénopathie cervicale métastatique de primitif inconnu** (recherche du primitif).', 'Planification de radiothérapie (volumes cibles), évaluation de la réponse à ~12 semaines.'] },
          { title: 'Limites', infoBox: { type: 'warning', title: 'Inflammation et muqueuses', text: 'Forte captation physiologique des amygdales, glandes salivaires, muscles et muqueuses ; l’inflammation post-radique précoce génère des faux positifs — respecter un délai de ~12 semaines après radiothérapie.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et lecture', text: 'Acquisition dédiée tête-cou (bras le long du corps), repos vocal/musculaire, glycémie contrôlée. Interprétation guidée par la TDM/IRM ; attention aux captations physiologiques (lymphoïde de Waldeyer, salivaires, graisse brune cervicale).',
            stats: [{ value: '~3–4 MBq/kg', label: 'FDG' }, { value: '~12 sem', label: 'Délai post-radiothérapie' }, { value: 'Tête-cou dédié', label: 'Acquisition' }] },
          { title: 'Pièges', list: ['Amygdales/anneau de Waldeyer asymétriques (physiologique vs tumoral).', 'Muscles (déglutition, phonation), graisse brune.', 'Inflammation post-thérapeutique (faux positifs précoces).'] },
        ],
      },
    },
  },

  // 5 — Calculateur : activité pédiatrique ─────────────────────────────────────
  {
    id: 'V2_CALCUL_DOSE_PEDIATRIQUE', cat: 'calculateurs', catLabel: 'Calculateurs',
    title: 'Calcul de l’activité pédiatrique (EANM Dosage Card)', difficulty: 'avancé',
    tags: ['calculateur', 'dose pédiatrique', 'EANM Dosage Card', 'activité', 'radioprotection'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM Dosage Card (version courante)', url: 'https://www.eanm.org/publications/dosage-card/' },
      { title: 'Lassmann M. et al. — The EANM paediatric dosage card', url: 'https://doi.org/10.1007/s00259-007-0494-2' },
    ],
    content: {
      lead: 'Chez l’enfant, l’activité injectée n’est **jamais** une dose adulte « réduite à vue ». Elle est calculée à partir d’une **activité de base** propre à chaque examen, multipliée par un **facteur lié au poids** (EANM Dosage Card), avec respect d’une **activité minimale** garantissant la qualité d’image.',
      medecin_non_nuc: {
        sections: [
          { title: 'Principe', text: 'L’activité = **activité de base (par classe d’examen) × coefficient(poids)**, sans descendre sous l’activité minimale recommandée. L’objectif : la **dose la plus faible** compatible avec une image diagnostique (ALARA).' },
          { title: 'En pratique', infoBox: { type: 'info', title: 'À transmettre', text: 'Indiquer le **poids** exact de l’enfant et l’examen demandé : c’est la base du calcul. La médecine nucléaire applique la table EANM en vigueur.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Méthode de calcul', steps: [
            { title: 'Activité de base', text: 'Lire la « baseline activity » de l’examen dans la Dosage Card (classes A/B/C selon le type d’examen).' },
            { title: 'Coefficient poids', text: 'Multiplier par le facteur dépendant du poids de l’enfant.' },
            { title: 'Activité minimale', text: 'Comparer au minimum recommandé ; retenir la valeur la plus élevée des deux.' },
            { title: 'Vérification', text: 'Contrôler la cohérence (durée d’acquisition adaptable pour compenser une faible activité).' },
          ] },
          { title: 'Repères usuels (indicatifs)', table: undefined,
            text: 'Toujours se référer à la **dernière version** de l’EANM Dosage Card ; les classes et coefficients sont mis à jour périodiquement.' },
        ],
        table: {
          headers: ['Levier', 'Effet sur la dose / qualité'],
          rows: [
            ['↑ Activité', 'Meilleur comptage, mais ↑ dose — à éviter'],
            ['↑ Temps d’acquisition', 'Meilleur comptage à dose constante (préféré)'],
            ['Hydratation / mictions', '↓ dose vésicale et gonadique'],
            ['Contention / distraction', 'Évite la sédation et les reprises'],
          ],
        },
      },
    },
  },

  // 6 — Guidelines de référence ────────────────────────────────────────────────
  {
    id: 'V2_GUIDELINES_REFERENCE', cat: 'guidelines', catLabel: 'Guidelines (EANM/SNMMI)',
    title: 'Recommandations de référence en médecine nucléaire (EANM/SNMMI)', difficulty: 'intermédiaire',
    tags: ['guidelines', 'EANM', 'SNMMI', 'HAS', 'recommandations', 'bonnes pratiques'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM Guidelines (portail)', url: 'https://www.eanm.org/publications/guidelines/' },
      { title: 'SNMMI Procedure Standards', url: 'https://www.snmmi.org/ClinicalPractice/content.aspx?ItemNumber=6414' },
      { title: 'HAS — Médecine nucléaire', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'Les pratiques de médecine nucléaire s’appuient sur des **recommandations internationales** (EANM, SNMMI) et nationales (HAS, SFMN). Cet article récapitule les sources de référence et leur logique : standardisation des protocoles, harmonisation quantitative et radioprotection.',
      medecin_non_nuc: {
        sections: [
          { title: 'À quoi servent ces recommandations ?', text: 'Elles garantissent que, d’un centre à l’autre, un examen est **réalisé et interprété de façon comparable** — condition essentielle pour suivre un patient dans le temps et entre établissements.' },
          { title: 'Où trouver l’information', list: ['**EANM** : guidelines par traceur et par organe (Europe).', '**SNMMI** : procedure standards (Amérique du Nord).', '**HAS / SFMN** : cadre français (indications, pertinence).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Logique transversale', list: ['**Standardisation** : préparation, activité, délais, acquisition.', '**Harmonisation quantitative** (ex. EARL pour les SUV) : comparabilité multicentrique.', '**Radioprotection** : optimisation (ALARA), justification, niveaux de référence diagnostiques (NRD).'] },
          { title: 'Principales familles', table: undefined, text: 'Se reporter à la version en vigueur ; les recommandations sont régulièrement actualisées.' },
        ],
        table: {
          headers: ['Domaine', 'Référentiels clés'],
          rows: [
            ['TEP oncologique', 'EANM FDG 2.0, EARL, PERCIST'],
            ['Théranostique', 'EANM 177Lu-PSMA / DOTATATE, dosimétrie'],
            ['Cardiologie', 'ASNC, EANM/ESC'],
            ['Radioprotection', 'CIPR, directives Euratom, ASN'],
          ],
        },
      },
    },
  },

  // 7 — Atlas des artefacts ────────────────────────────────────────────────────
  {
    id: 'V2_ATLAS_ARTEFACTS', cat: 'artefacts', catLabel: 'Atlas des Artefacts',
    title: 'Atlas des artefacts en TEP et TEMP', difficulty: 'avancé',
    tags: ['artefacts', 'TEP', 'TEMP', 'atténuation', 'mouvement', 'graisse brune', 'pièges'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Image artefacts and pitfalls', url: 'https://www.eanm.org' },
      { title: 'SNMMI — Artifacts in PET/CT and SPECT/CT', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'Reconnaître un **artefact** évite des erreurs d’interprétation. Cet atlas synthétise les principaux pièges en TEP-TDM et TEMP-TDM : artefacts de correction d’atténuation, mouvement, captations physiologiques et contaminations.',
      medecin_nuc: {
        sections: [
          { title: 'Mécanisme général', text: 'La plupart des artefacts proviennent d’un **désalignement TEP/TDM** (respiration, mouvement), d’une **correction d’atténuation** erronée (métal, produit de contraste) ou de **captations physiologiques/iatrogènes** mal interprétées.',
            figure: { svg: FDG_UPTAKE, alt: 'Rappel du mécanisme de captation du FDG.', caption: 'Comprendre la captation physiologique du FDG aide à distinguer le vrai positif de l’artefact.' } },
          { title: 'Principaux artefacts', list: ['**Mouvement / respiration** : désalignement, faux défaut ou faux foyer à la coupole hépatique.', '**Métal / contraste** : surestimation de l’atténuation → faux hypermétabolisme.', '**Graisse brune** : captation symétrique cervicale/paravertébrale (FDG).', '**Atténuation** mammaire/diaphragmatique en TEMP myocardique.', '**Contamination** urinaire/cutanée, infiltration au point d’injection.', '**Hyperglycémie / insuline** : redistribution musculaire du FDG.'] },
          { title: 'Bonnes pratiques', infoBox: { type: 'tip', title: 'Réflexes', text: 'Toujours comparer images corrigées et non corrigées de l’atténuation, vérifier l’alignement TEP/TDM, et corréler à la clinique et à la TDM avant de conclure.' } },
        ],
      },
    },
  },

  // 8 — Cas clinique pédagogique ───────────────────────────────────────────────
  {
    id: 'V2_CAS_CLINIQUE_LYMPHOME', cat: 'cas_cliniques', catLabel: 'Cas Cliniques & Quiz',
    title: 'Cas clinique : TEP-FDG intermédiaire d’un lymphome de Hodgkin', difficulty: 'avancé',
    tags: ['cas clinique', 'lymphome', 'Hodgkin', 'Deauville', 'TEP intérimaire', 'quiz'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Lugano classification (Cheson, 2014)', url: 'https://doi.org/10.1200/JCO.2013.54.8800' },
      { title: 'Deauville 5-point scale — consensus', url: 'https://doi.org/10.1007/s00259-016-3690-8' },
    ],
    content: {
      lead: 'Cas pédagogique illustrant l’usage de la **TEP-FDG intermédiaire** (après 2 cures) dans un **lymphome de Hodgkin** et l’application du **score de Deauville** pour adapter la stratégie thérapeutique.',
      medecin_non_nuc: {
        sections: [
          { title: 'Présentation', text: 'Patient de 28 ans, lymphome de Hodgkin stade II sus-diaphragmatique, masse médiastinale hypermétabolique au bilan initial. TEP réalisée après 2 cures (TEP « interim »).' },
          { title: 'Question', text: 'Quelle est la valeur de la TEP intérimaire et comment l’interpréter ?',
            infoBox: { type: 'info', title: 'Réponse', text: 'La TEP interim a une forte valeur pronostique. Une réponse métabolique complète (Deauville 1–3) autorise souvent une désescalade ; un score 4–5 fait discuter une intensification. La décision est multidisciplinaire.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Analyse', text: 'Comparaison à l’examen initial sur acquisitions **harmonisées** (EARL). La fixation résiduelle médiastinale est cotée par rapport au **médiastin** (Deauville 2) et au **foie** (Deauville 3).' },
          { title: 'Score de Deauville', table: undefined, text: 'Cotation visuelle en 5 points (voir tableau). Ici, une fixation résiduelle ≤ foie correspond à une réponse favorable.' },
          { title: 'Points d’attention', list: ['Respecter le délai par rapport à la cure et au G-CSF.', 'Rebond thymique chez le sujet jeune (faux positif).', 'Harmonisation indispensable entre baseline et interim.'] },
        ],
        table: {
          headers: ['Deauville', 'Définition', 'Interprétation'],
          rows: [
            ['1–2', '≤ médiastin', 'Réponse complète métabolique'],
            ['3', '> médiastin, ≤ foie', 'Généralement favorable'],
            ['4', 'modérément > foie', 'Réponse partielle / à surveiller'],
            ['5', '≫ foie ou nouvelles lésions', 'Réponse insuffisante'],
          ],
        },
      },
    },
  },

  // 9 — Radioprotection : grossesse & allaitement ──────────────────────────────
  {
    id: 'V2_RADIOPROTECTION_GROSSESSE', cat: 'radioprotection', catLabel: 'Radioprotection',
    title: 'Grossesse et allaitement en médecine nucléaire', difficulty: 'intermédiaire',
    tags: ['radioprotection', 'grossesse', 'allaitement', 'interruption', 'I-131', 'sécurité'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'CIPR 84 — Grossesse et irradiation médicale', url: 'https://www.icrp.org' },
      { title: 'EANM — Breastfeeding interruption guidance', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La grossesse et l’allaitement imposent des **précautions spécifiques**. La plupart des examens diagnostiques exposent très peu le fœtus, mais le principe de **justification** est renforcé ; l’allaitement nécessite parfois une **interruption temporaire** selon le radiopharmaceutique.',
      patient: {
        sections: [
          { title: 'Vous êtes enceinte ou vous allaitez ?', text: 'Signalez-le **systématiquement**. Beaucoup d’examens restent possibles avec des adaptations ; d’autres sont reportés. Pour l’allaitement, on vous indiquera s’il faut **suspendre temporairement** et tirer/jeter le lait.',
            infoBox: { type: 'warning', title: 'Thérapies à l’iode-131', text: 'Les traitements par iode-131 sont formellement contre-indiqués pendant la grossesse et imposent l’arrêt définitif de l’allaitement en cours. Une contraception est requise après traitement.' } },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Repères', list: ['**Diagnostic** : dose fœtale généralement faible (justification + optimisation). Hydratation et mictions réduisent la dose vésicale (proximité utérine).', '**Allaitement** : interruption variable selon le traceur (de quelques heures à arrêt définitif pour l’I-131).', 'Toujours rechercher une grossesse méconnue avant une thérapie.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Conduite pratique', list: ['Test de grossesse avant toute **thérapie** par radionucléides.', 'Optimiser l’activité diagnostique chez la femme enceinte ; privilégier les traceurs à faible passage lacté.', 'Remettre des **consignes écrites** d’interruption d’allaitement et de contact rapproché.'] },
          { title: 'Interruption de l’allaitement (indicatif)', table: undefined, text: 'Se référer aux tables EANM/CIPR à jour pour chaque radiopharmaceutique.' },
        ],
        table: {
          headers: ['Radiopharmaceutique', 'Allaitement (indicatif)'],
          rows: [
            ['99mTc-MDP, MAG3, DTPA', 'Poursuite possible (parfois courte interruption)'],
            ['99mTc-pertechnétate', 'Interruption ~12 h'],
            ['18F-FDG', 'Interruption courte + éviter contact rapproché ~quelques h'],
            ['Iode-131 (thérapie)', 'Arrêt définitif de l’allaitement en cours'],
          ],
        },
      },
    },
  },

  // 10 — Comprendre le SUV ─────────────────────────────────────────────────────
  {
    id: 'V2_COMPRENDRE_SUV', cat: 'bases_physiques', catLabel: 'Bases Physiques',
    title: 'Comprendre le SUV en TEP (Standardized Uptake Value)', difficulty: 'intermédiaire',
    tags: ['SUV', 'SUVmax', 'SULpeak', 'quantification', 'TEP', 'EARL', 'harmonisation'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Boellaard R. et al. — FDG PET/CT: EANM procedure guidelines for tumour imaging v2.0', url: 'https://doi.org/10.1007/s00259-014-2961-x' },
      { title: 'EARL — Harmonisation des SUV', url: 'https://earl.eanm.org' },
    ],
    content: {
      lead: 'Le **SUV** (Standardized Uptake Value) est l’indice **semi-quantitatif** le plus utilisé en TEP : il rapporte la concentration de traceur dans une région à l’activité injectée normalisée au poids. Bien compris, il aide au suivi ; mal maîtrisé, il induit en erreur.',
      medecin_non_nuc: {
        sections: [
          { title: 'Ce que mesure le SUV', text: 'C’est un **rapport** : combien de traceur s’accumule dans une lésion par rapport à ce qu’on attendrait si tout le produit injecté se répartissait uniformément dans le corps. Plus une lésion est « avide », plus le SUV est élevé — mais ce n’est **pas** une mesure absolue de malignité.' },
          { title: 'À retenir', infoBox: { type: 'warning', title: 'Comparer ce qui est comparable', text: 'Pour suivre un patient, les deux TEP doivent être réalisées dans des conditions harmonisées (même délai, glycémie, machine/reconstruction). Un SUV n’est interprétable qu’en contexte.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Définitions', list: ['**SUVmax** : voxel le plus intense (sensible au bruit, très utilisé).', '**SUVpeak / SULpeak** : moyenne d’un petit volume autour du max, normalisée à la masse maigre (robuste, base de PERCIST).', '**SUVmean** : moyenne sur un volume (dépend de la segmentation).'] },
          { title: 'Facteurs d’influence', list: ['Glycémie, délai d’incorporation, extravasation, poids/masse maigre.', 'Reconstruction (PSF, ToF) et résolution : impact majeur → **harmonisation EARL**.', 'Taille de la lésion (effet de volume partiel pour les petites cibles).'] },
          { title: 'Usage raisonné', figure: { svg: FDG_UPTAKE, alt: 'Mécanisme de captation du FDG, base biologique du SUV.', caption: 'Le SUV reflète la captation métabolique — à interpréter avec ses facteurs de confusion.' },
            text: 'Utiliser le SUV pour le **suivi** (mêmes conditions) plus que pour un seuil absolu de malignité ; documenter les paramètres d’acquisition.' },
        ],
      },
    },
  },
];
