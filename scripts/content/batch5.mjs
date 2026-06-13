// Lot 5 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  FDG_UPTAKE,
  PET_COINCIDENCE,
  GAMMA_CAMERA,
  BULLSEYE_17,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — TEP-FDG cancer du sein ─────────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_SEIN', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG dans le cancer du sein', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'cancer du sein', 'bilan d’extension', 'réponse', 'récidive'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET/CT in breast cancer', url: 'https://doi.org/10.1007/s00259-021-05335-x' },
      { title: 'INCa / HAS — Cancer du sein, bilan d’extension', url: 'https://www.e-cancer.fr' },
    ],
    content: {
      lead: 'Dans le **cancer du sein**, la **TEP-FDG** intervient surtout pour le **bilan d’extension des formes localement avancées ou métastatiques**, l’évaluation de la réponse au traitement systémique et la recherche de récidive. Elle complète l’IRM mammaire et l’imagerie conventionnelle.',
      patient: {
        sections: [
          { title: 'Pourquoi cet examen ?', text: 'Il recherche en une seule fois d’éventuelles localisations de la maladie dans tout le corps (ganglions, os, foie…) et aide à **vérifier l’efficacité** du traitement.',
            figure: { svg: FDG_UPTAKE, alt: 'Mécanisme de captation du FDG par les cellules tumorales.', caption: 'La TEP repère les foyers consommant beaucoup de glucose.' } },
          { title: 'Préparation', text: 'TEP-FDG classique : jeûne 4–6 h, glycémie contrôlée, repos. Signalez un diabète, une grossesse ou un allaitement.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Bilan d’extension des cancers **localement avancés** (≥ T3, N+) et **métastatiques**.', 'Évaluation de la **réponse** au traitement néoadjuvant/systémique.', 'Suspicion de **récidive** (élévation des marqueurs, signe clinique).'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Limites', text: 'Faible sensibilité pour les petites lésions et les carcinomes **lobulaires** (peu avides) ; la TEP ne remplace pas l’IRM mammaire pour le bilan local ni l’histologie.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et interprétation', text: 'TEP-FDG corps entier standardisée (incorporation 60 min, glycémie contrôlée). Quantification par **SUV** harmonisé (EARL) pour le suivi ; critères **PERCIST** pour la réponse.',
            stats: [{ value: '~3–4 MBq/kg', label: 'FDG' }, { value: '60 min', label: 'Incorporation' }, { value: 'PERCIST', label: 'Réponse' }] },
          { title: 'Pièges', list: ['Carcinome **lobulaire** et lésions < 1 cm : faux négatifs.', 'Inflammation post-biopsie/chirurgie, ganglions réactionnels.', 'Captation musculaire/graisse brune ; activité physiologique.'] },
        ],
      },
    },
  },

  // 2 — TEP-FDG cancer colorectal ──────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_COLORECTAL', cat: 'oncologie', catLabel: 'Oncologie',
    title: 'TEP-TDM au 18F-FDG dans le cancer colorectal', difficulty: 'avancé',
    tags: ['TEP-TDM', '18F-FDG', 'cancer colorectal', 'métastases hépatiques', 'récidive', 'ACE'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — FDG-PET/CT in colorectal cancer', url: 'https://doi.org/10.1007/s00259-021-05227-0' },
      { title: 'TNCD / HAS — Cancer colorectal', url: 'https://www.snfge.org' },
    ],
    content: {
      lead: 'Dans le **cancer colorectal**, la **TEP-FDG** est surtout utile pour le bilan d’une **récidive** (élévation de l’ACE, imagerie équivoque), la caractérisation de lésions à distance et le bilan pré-opératoire de **métastases** (notamment hépatiques) avant chirurgie à visée curative.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'Surtout à **rechercher une reprise de la maladie** ou à préciser des images douteuses, en explorant tout le corps en une fois.' },
          { title: 'Préparation', text: 'TEP-FDG standard (jeûne, glycémie). Une préparation digestive légère peut être demandée selon le centre.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Récidive** suspectée (↑ ACE, imagerie équivoque).', 'Bilan pré-opératoire de **métastases hépatiques/pulmonaires** résécables (recherche d’autres sites).', 'Caractérisation de lésions indéterminées.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Captation physiologique colique', text: 'Le côlon fixe physiologiquement le FDG de façon variable ; une captation focale persistante doit faire évoquer une lésion (polype/tumeur) et conduire à une coloscopie.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'TEP-FDG corps entier ; attention au délai post-chimiothérapie (≥ 4–6 semaines) et post-chirurgie. Hydratation, glycémie contrôlée.',
            stats: [{ value: '~3–4 MBq/kg', label: 'FDG' }, { value: '≥ 4–6 sem', label: 'Délai post-chimio' }, { value: 'Côlon variable', label: 'Capt. physiologique' }] },
          { title: 'Pièges', list: ['Captation colique physiologique/inflammatoire.', 'Mucineux et petites lésions : faux négatifs.', 'Activité urétéro-vésicale au pelvis.'] },
        ],
      },
    },
  },

  // 3 — Scintigraphie de l'amylose cardiaque ────────────────────────────────
  {
    id: 'V2_AMYLOSE_CARDIAQUE', cat: 'cardiologie', catLabel: 'Cardiologie',
    title: 'Scintigraphie osseuse de l’amylose cardiaque (DPD/HMDP)', difficulty: 'avancé',
    tags: ['amylose', 'transthyrétine', 'DPD', 'HMDP', 'Perugini', 'cardiologie'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/ASNC/SNMMI — Cardiac amyloidosis imaging (multisociety)', url: 'https://doi.org/10.1007/s00259-021-05262-x' },
      { title: 'Perugini D. et al. — Score de fixation cardiaque', url: 'https://doi.org/10.1016/j.jacc.2005.05.073' },
    ],
    content: {
      lead: 'La **scintigraphie aux traceurs osseux (99mTc-DPD ou HMDP)** est devenue un examen clé pour diagnostiquer l’**amylose cardiaque à transthyrétine (ATTR)** de façon **non invasive** : une fixation cardiaque intense, en l’absence de gammapathie, permet souvent d’éviter la biopsie myocardique.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À rechercher une maladie particulière qui « rigidifie » le cœur (l’amylose). Le produit habituellement utilisé pour les os se fixe aussi, dans cette maladie, sur le **muscle cardiaque**.' },
          { title: 'Déroulement', text: 'Une injection, un délai (souvent 3 h), puis des images du thorax. Examen indolore, identique en pratique à une scintigraphie osseuse.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', text: 'Suspicion d’**amylose cardiaque** (insuffisance cardiaque à FEVG préservée avec hypertrophie inexpliquée, canal carpien bilatéral, microvoltage…). Examen à coupler **impérativement** à la recherche d’une gammapathie monoclonale (sang/urines).' },
          { title: 'Interprétation', infoBox: { type: 'info', title: 'Score de Perugini', text: 'Cotation 0–3 de la fixation cardiaque vs os. Un grade ≥ 2 SANS composant monoclonal est très évocateur d’ATTR et peut suffire au diagnostic non invasif.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection de **99mTc-DPD/HMDP/PYP**, imagerie planaire **à 3 h** (± précoce) + **SPECT/CT** pour confirmer la fixation **myocardique** (et non un simple blood-pool).',
            figure: { svg: BULLSEYE_17, alt: 'Représentation polaire du myocarde (modèle 17 segments).', caption: 'La SPECT/CT confirme la fixation myocardique diffuse, distincte du pool sanguin.' } },
          { title: 'Points clés', list: ['Score de **Perugini** (planaire) + ratio cœur/poumon ; SPECT/CT pour la fixation myocardique réelle.', 'Toujours associer l’**exclusion d’une gammapathie** (sinon biopsie).', 'Le PYP-99mTc est l’équivalent nord-américain du DPD/HMDP.'] },
        ],
      },
    },
  },

  // 4 — Ventriculographie isotopique (FEVG) ─────────────────────────────────
  {
    id: 'V2_VENTRICULOGRAPHIE_FEVG', cat: 'cardiologie', catLabel: 'Cardiologie',
    title: 'Ventriculographie isotopique (mesure de la FEVG)', difficulty: 'intermédiaire',
    tags: ['ventriculographie', 'FEVG', 'MUGA', 'hématies marquées', 'cardiotoxicité', 'gated'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/ASNC — Equilibrium radionuclide angiography (MUGA)', url: 'https://www.eanm.org' },
      { title: 'ESC — Cardio-oncologie (surveillance de la FEVG)', url: 'https://www.escardio.org' },
    ],
    content: {
      lead: 'La **ventriculographie isotopique d’équilibre (MUGA)** mesure la **fraction d’éjection du ventricule gauche (FEVG)** avec une excellente reproductibilité. Elle est précieuse pour la **surveillance de la cardiotoxicité** des chimiothérapies (anthracyclines, trastuzumab).',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À mesurer **précisément** la force de pompe de votre cœur, souvent pour surveiller l’effet de certains traitements anticancéreux.' },
          { title: 'Déroulement', text: 'Marquage de vos globules rouges, puis acquisition synchronisée à l’ECG (~20–30 min). Examen indolore.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indication phare', text: 'Surveillance répétée de la **FEVG** sous traitements cardiotoxiques : la MUGA offre une **reproductibilité** supérieure à l’échographie pour détecter une baisse significative.' },
          { title: 'Atout', infoBox: { type: 'info', title: 'Reproductibilité', text: 'La faible variabilité inter-examen permet de fixer un seuil d’alerte fiable (ex. baisse absolue de FEVG) pour adapter la chimiothérapie.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Technique', text: 'Marquage des **hématies au 99mTc**, acquisition **synchronisée à l’ECG** (gated, 16–24 images/cycle). Calcul de la FEVG à partir des variations de comptage télédiastole/télésystole sur une ROI ventriculaire gauche.',
            stats: [{ value: 'Hématies-99mTc', label: 'Traceur' }, { value: 'Gated ECG', label: 'Synchronisation' }, { value: 'FEVG reproductible', label: 'Atout' }] },
          { title: 'Pièges', list: ['Marquage érythrocytaire de qualité (rendement).', 'Arythmie altérant la synchronisation ECG.', 'Chevauchement des cavités (incidence OAG à optimiser).'] },
        ],
      },
    },
  },

  // 5 — TEP-FDG cérébrale (démences) ────────────────────────────────────────
  {
    id: 'V2_TEP_FDG_DEMENCES', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'TEP cérébrale au 18F-FDG dans les démences', difficulty: 'avancé',
    tags: ['TEP cérébrale', '18F-FDG', 'démence', 'Alzheimer', 'DFT', 'hypométabolisme'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/EAN — FDG-PET in dementia', url: 'https://doi.org/10.1007/s00259-021-05524-8' },
      { title: 'HAS — Maladie d’Alzheimer et apparentées', url: 'https://www.has-sante.fr' },
    ],
    content: {
      lead: 'La **TEP cérébrale au 18F-FDG** cartographie le **métabolisme glucidique** du cerveau. Les profils d’**hypométabolisme** régional aident à différencier les causes de démence (maladie d’Alzheimer, dégénérescence fronto-temporale, démence à corps de Lewy) lorsque le diagnostic clinique reste incertain.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À étudier le **fonctionnement** de différentes régions du cerveau. Certaines maladies de la mémoire montrent des zones moins actives, selon des motifs caractéristiques.' },
          { title: 'Déroulement', text: 'Injection, puis repos au calme (lumière tamisée, peu de stimulation), enfin images de la tête. Examen indolore.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['Diagnostic **différentiel des démences** quand la clinique/IRM ne tranchent pas.', 'Distinguer **Alzheimer** (hypométabolisme temporo-pariétal et cingulaire postérieur) de la **DFT** (hypométabolisme frontal/temporal antérieur).', 'Évaluation de troubles cognitifs atypiques/précoces.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Complémentarité', text: 'La TEP-FDG explore le métabolisme ; les TEP « amyloïde » et « tau » (traceurs dédiés) ciblent les lésions spécifiques d’Alzheimer. Les indications et le remboursement varient.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et analyse', text: 'Conditions standardisées (repos sensoriel, glycémie contrôlée). Analyse visuelle + **comparaison à une base de données** normale (cartes statistiques type z-score, SPM) pour objectiver l’hypométabolisme régional.',
            figure: { svg: FDG_UPTAKE, alt: 'Mécanisme de captation du FDG (base du signal métabolique cérébral).', caption: 'Le FDG reflète le métabolisme glucidique neuronal régional.' } },
          { title: 'Pièges', list: ['Captation corticale physiologique élevée (limite la détection de petites lésions).', 'Effet de l’hyperglycémie, de la sédation et de l’ambiance lors de l’incorporation.', 'Atrophie : corréler à l’IRM (effet de volume partiel).'] },
        ],
      },
    },
  },

  // 6 — Perfusion cérébrale (HMPAO/ECD) ─────────────────────────────────────
  {
    id: 'V2_PERFUSION_CEREBRALE', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'Scintigraphie de perfusion cérébrale (HMPAO / ECD)', difficulty: 'avancé',
    tags: ['perfusion cérébrale', 'HMPAO', 'ECD', 'épilepsie', 'mort encéphalique', 'TEMP'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Brain perfusion SPECT guidelines', url: 'https://doi.org/10.1007/s00259-009-1266-y' },
      { title: 'SNMMI — Brain death scintigraphy', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **TEMP de perfusion cérébrale** (99mTc-HMPAO ou ECD) image le **débit sanguin cérébral régional**. Ses indications principales sont la localisation du **foyer épileptogène** (TEMP ictale/inter-ictale), certaines démences et la confirmation de la **mort encéphalique**.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À évaluer la **circulation du sang** dans les différentes régions du cerveau, ce qui renseigne sur leur fonctionnement.' },
          { title: 'Déroulement', text: 'Injection (parfois au moment d’une crise pour l’épilepsie), puis images de la tête. Indolore.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Épilepsie** pharmacorésistante : localisation du foyer (TEMP **ictale** vs inter-ictale), bilan pré-chirurgical.', 'Confirmation de **mort encéphalique** (absence de perfusion intracrânienne).', 'Démences et troubles vasculaires (en complément).'] },
          { title: 'Particularité', infoBox: { type: 'warning', title: 'TEMP ictale', text: 'Pour l’épilepsie, le traceur doit être injecté **dès le début de la crise** : il « fige » la perfusion du moment, imagée ensuite à froid. Organisation lourde (vidéo-EEG, traceur prêt).' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Traceurs et protocole', text: 'Le **99mTc-HMPAO** et l’**ECD** franchissent la barrière hémato-encéphalique et se fixent proportionnellement au débit, avec une **redistribution négligeable** (snapshot du moment de l’injection). TEMP cérébrale ± comparaison ictale/inter-ictale (soustraction, SISCOM).',
            stats: [{ value: 'HMPAO / ECD', label: 'Traceurs' }, { value: 'Snapshot', label: 'Fixation figée' }, { value: 'Ictal vs interictal', label: 'Épilepsie' }] },
          { title: 'Pièges', list: ['Délai/qualité de l’injection ictale (sinon localisation erronée).', 'Stabilité du HMPAO (préparation/contrôle).', 'Mort encéphalique : technique et critères stricts.'] },
        ],
      },
    },
  },

  // 7 — Scintigraphie parathyroïdienne (MIBI) ───────────────────────────────
  {
    id: 'V2_SCINTI_PARATHYROIDE', cat: 'endocrinologie', catLabel: 'Endocrinologie',
    title: 'Scintigraphie parathyroïdienne (MIBI double phase / SPECT-CT)', difficulty: 'avancé',
    tags: ['parathyroïde', 'MIBI', 'hyperparathyroïdie', 'adénome', 'SPECT/CT', 'double phase'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — Parathyroid scintigraphy guideline', url: 'https://doi.org/10.1007/s00259-021-05334-y' },
      { title: 'SFE/AFCE — Hyperparathyroïdie primaire', url: 'https://www.sfendocrino.org' },
    ],
    content: {
      lead: 'La **scintigraphie parathyroïdienne au 99mTc-MIBI** localise un **adénome parathyroïdien** responsable d’une **hyperparathyroïdie primaire**, en vue d’une chirurgie ciblée (mini-invasive). L’association à la **SPECT/CT** améliore nettement la localisation.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'Quand une petite glande parathyroïde fabrique trop d’hormone (excès de calcium), cet examen aide à **localiser** la glande responsable avant l’opération.' },
          { title: 'Déroulement', text: 'Injection puis images précoces et tardives (technique « double phase »), souvent complétées par une SPECT/CT. Indolore.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indication', text: 'Localisation pré-opératoire d’un **adénome parathyroïdien** dans l’hyperparathyroïdie primaire confirmée biologiquement (calcium + PTH élevés). Couplée à l’échographie cervicale (concordance = chirurgie ciblée).' },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Concordance écho + scinti', text: 'La concordance échographie–scintigraphie permet une parathyroïdectomie mini-invasive ciblée. En cas de discordance, des examens complémentaires (TEP-choline) peuvent aider.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Techniques', text: '**Double phase MIBI** (rétention plus prolongée dans le tissu parathyroïdien hyperfonctionnel que dans la thyroïde) et/ou **soustraction** (MIBI + traceur thyroïdien). **SPECT/CT** indispensable pour les localisations ectopiques (médiastin).',
            stats: [{ value: '99mTc-MIBI', label: 'Traceur' }, { value: 'Double phase', label: 'Précoce + tardif' }, { value: 'SPECT/CT', label: 'Localisation' }] },
          { title: 'Pièges', list: ['Lavage rapide du MIBI par certains adénomes (faux négatif tardif).', 'Nodule thyroïdien MIBI-avide (faux positif).', 'Glandes ectopiques (médiastin) : SPECT/CT large champ ; alternative TEP-18F-choline.'] },
        ],
      },
    },
  },

  // 8 — MIBG (phéochromocytome / neuroblastome) ─────────────────────────────
  {
    id: 'V2_MIBG', cat: 'endocrinologie', catLabel: 'Endocrinologie',
    title: 'Scintigraphie à la 123I-MIBG (phéochromocytome, neuroblastome)', difficulty: 'avancé',
    tags: ['MIBG', '123I', 'phéochromocytome', 'paragangliome', 'neuroblastome', 'théranostique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — 123I/131I-mIBG scintigraphy guideline', url: 'https://doi.org/10.1007/s00259-010-1357-9' },
      { title: 'SIOPEN — Neuroblastoma mIBG scoring', url: 'https://www.siopen.net' },
    ],
    content: {
      lead: 'La **MIBG** (méta-iodo-benzylguanidine, marquée à l’**123I**) est captée par les tissus du système **sympatho-adrénergique**. Elle image les **phéochromocytomes, paragangliomes** et le **neuroblastome** de l’enfant, et identifie les patients candidats à un traitement par **131I-MIBG**.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À localiser certaines tumeurs particulières (des glandes surrénales ou du système nerveux). Le produit se fixe spécifiquement sur ces tumeurs.' },
          { title: 'Préparation', text: 'Un **blocage de la thyroïde** (iode) est donné avant et après l’injection. Certains médicaments interférents sont à suspendre selon consignes. Images sur 1–2 jours.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Phéochromocytome / paragangliome** : localisation, formes multiples/héréditaires, extension.', '**Neuroblastome** (enfant) : diagnostic, extension, suivi (score SIOPEN).', 'Sélection avant **thérapie au 131I-MIBG**.'] },
          { title: 'À savoir', infoBox: { type: 'warning', title: 'Médicaments interférents', text: 'De nombreux médicaments (certains antihypertenseurs, antidépresseurs, sympathomimétiques) bloquent la captation de la MIBG et doivent être arrêtés avant l’examen.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: '**Blocage thyroïdien** (iodure/perchlorate) avant et après. Injection de **123I-MIBG**, imagerie à **24 h** (± 48 h) planaire + **SPECT/CT**. Arrêt préalable des médicaments interférents.',
            stats: [{ value: '123I-MIBG', label: 'Diagnostic' }, { value: '24–48 h', label: 'Imagerie' }, { value: 'Blocage thyroïde', label: 'Obligatoire' }] },
          { title: 'Théranostique et pièges', list: ['Une fixation tumorale franche prédit l’efficacité d’un traitement **131I-MIBG**.', 'Captation physiologique : myocarde, foie, glandes salivaires, surrénales normales.', 'Faux négatifs : tumeurs peu différenciées (envisager TEP-DOTATATE ou FDG).'] },
        ],
      },
    },
  },

  // 9 — Gamma-caméra ────────────────────────────────────────────────────────
  {
    id: 'V2_GAMMA_CAMERA', cat: 'instrumentation', catLabel: 'Instrumentation',
    title: 'La gamma-caméra (caméra d’Anger) : principe et composants', difficulty: 'avancé',
    tags: ['gamma-caméra', 'Anger', 'collimateur', 'NaI', 'photomultiplicateur', 'CZT', 'TEMP'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IAEA — Nuclear Medicine Physics: Gamma camera', url: 'https://www.iaea.org' },
      { title: 'EANM — Instrumentation & quality control', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'La **gamma-caméra** (ou caméra d’Anger) détecte les photons γ émis par le patient et reconstruit une image de la répartition du radiopharmaceutique. Elle est au cœur de la **scintigraphie planaire et de la TEMP (SPECT)**.',
      medecin_non_nuc: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'C’est l’appareil qui « photographie » le rayonnement émis par le produit injecté. Sa qualité (résolution, sensibilité) conditionne la finesse des images de scintigraphie.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Chaîne de détection', text: 'Le **collimateur** (plomb) ne laisse passer que les photons d’une direction donnée ; le **cristal scintillant NaI(Tl)** convertit le γ en lumière ; les **photomultiplicateurs (PMT)** transforment cette lumière en signal ; la **logique d’Anger** calcule la position (X,Y) et l’énergie de chaque événement.',
            figure: { svg: GAMMA_CAMERA, alt: 'Chaîne de détection d’une gamma-caméra : patient, collimateur, cristal NaI(Tl), photomultiplicateurs, logique d’Anger, image.', caption: 'De l’émission du photon à l’image : collimateur → cristal → PMT → logique d’Anger.' } },
          { title: 'Paramètres et évolutions', list: ['Compromis **résolution/sensibilité** selon le collimateur (LEHR, etc.).', 'Fenêtrage en **énergie** (ex. 140 keV ± 10 % pour le 99mTc) pour rejeter le diffusé.', 'Caméras **CZT** (semi-conducteur) : meilleure résolution en énergie et compacité (cardio dédié).'] },
          { title: 'Contrôle qualité', infoBox: { type: 'info', title: 'CQ régulier', text: 'Uniformité, résolution spatiale, linéarité, centre de rotation (pour la TEMP) sont contrôlés périodiquement — garants de la fiabilité des images.' } },
        ],
      },
    },
  },

  // 10 — TEP-IRM ─────────────────────────────────────────────────────────────
  {
    id: 'V2_TEP_IRM', cat: 'instrumentation', catLabel: 'Instrumentation',
    title: 'La TEP-IRM : principe et intérêts cliniques', difficulty: 'avancé',
    tags: ['TEP-IRM', 'PET-MRI', 'correction d’atténuation', 'neuro', 'pédiatrie', 'irradiation'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/SNMMI — PET/MRI procedures and applications', url: 'https://doi.org/10.1007/s00259-018-4082-4' },
      { title: 'IAEA — Hybrid imaging PET/MRI', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'La **TEP-IRM** combine l’imagerie métabolique (TEP) et l’excellent **contraste des tissus mous** de l’IRM, avec une **irradiation réduite** (pas de scanner). Elle est particulièrement intéressante en neurologie, pédiatrie, et pour certaines tumeurs (pelvis, foie, tête-cou).',
      patient: {
        sections: [
          { title: 'Qu’est-ce que c’est ?', text: 'Un appareil qui réalise **en même temps** une TEP (métabolisme) et une IRM (images très détaillées des tissus), sans rayons X — donc avec **moins d’irradiation** qu’une TEP-scanner.' },
          { title: 'Bon à savoir', text: 'Comme pour une IRM, signalez tout **implant métallique/pacemaker** et toute claustrophobie. L’examen peut être plus long qu’une TEP-TDM.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Atouts et indications', list: ['**Irradiation moindre** : intérêt en **pédiatrie** et pour les examens répétés.', 'Contraste tissulaire supérieur : **neuro-oncologie**, tête-cou, pelvis (prostate, gynéco), foie.', 'Acquisition simultanée (recalage parfait TEP/IRM).'] },
          { title: 'Limites', infoBox: { type: 'warning', title: 'Contraintes IRM', text: 'Contre-indications de l’IRM (certains implants), durée d’examen plus longue, disponibilité limitée et coût. La correction d’atténuation est plus complexe qu’en TEP-TDM.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Principe technique', text: 'Détecteurs TEP compatibles avec le champ magnétique (SiPM). La **correction d’atténuation** ne peut utiliser un scanner : elle repose sur des **séquences IRM dédiées** (Dixon, UTE) segmentant les tissus — défi méthodologique (os, cavités aériennes).',
            figure: { svg: PET_COINCIDENCE, alt: 'Détection en coïncidence en TEP, intégrée dans la TEP-IRM.', caption: 'La partie TEP repose sur la même détection en coïncidence ; l’IRM remplace le scanner.' } },
          { title: 'Points clés', list: ['Correction d’atténuation basée IRM (Dixon/UTE) : attention aux artefacts (os, métal, air).', 'Protocoles longs : optimiser l’enchaînement TEP/IRM.', 'Quantification SUV : harmonisation spécifique TEP-IRM.'] },
        ],
      },
    },
  },
];
