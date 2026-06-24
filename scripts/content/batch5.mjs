// Lot 5 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  FDG_UPTAKE,
  PET_COINCIDENCE,
  GAMMA_CAMERA,
  BULLSEYE_17,
  MIBG_UPTAKE,
  MIBG_BIODISTRIB,
  ALARA_TDS,
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
    title: 'Scintigraphie à la MIBG (¹²³I/¹³¹I) — phéochromocytome, paragangliome, neuroblastome', difficulty: 'avancé',
    tags: ['MIBG', '123I', '131I', 'phéochromocytome', 'paragangliome', 'neuroblastome', 'NET', 'SIOPEN', 'Curie', 'théranostique', 'sympatho-adrénergique'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'Bombardieri E et al. — EANM procedure guidelines for ¹³¹I/¹²³I-mIBG scintigraphy in tumour imaging. Eur J Nucl Med Mol Imaging 2010;37(12):2436-2446', url: 'https://doi.org/10.1007/s00259-010-1545-7' },
      { title: 'Taïeb D et al. — EANM/SNMMI practice guideline for radionuclide imaging of phaeochromocytoma & paraganglioma. Eur J Nucl Med Mol Imaging 2019;46(10):2112-2137', url: 'https://www.eanm.org/publications/guidelines/' },
      { title: 'Lenders JWM et al. — Pheochromocytoma and Paraganglioma: an Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab 2014;99(6):1915-1942', url: 'https://doi.org/10.1210/jc.2014-1498' },
      { title: 'SIOPEN — Semi-quantitative ¹²³I-mIBG skeletal scoring (neuroblastome)', url: 'https://www.siopen.net' },
      { title: 'SNMMI — Procedure Standard for ¹²³I/¹³¹I-mIBG scintigraphy', url: 'https://www.snmmi.org/guidelines' },
      { title: 'ICRP Publication 128 — Radiation dose to patients from radiopharmaceuticals (coefficients de dose)', url: 'https://www.icrp.org' },
    ],
    content: {
      // §0 — Présentation générale (commune aux 4 profils)
      lead: 'La **scintigraphie à la MIBG** (méta-iodobenzylguanidine) repère les tumeurs dérivées du **tissu nerveux sympathique** — surtout le **phéochromocytome**, le **paragangliome** et le **neuroblastome** de l’enfant. On injecte un traceur faiblement radioactif qui se fixe spécifiquement sur ces tumeurs, puis une caméra réalise des images du corps entier, en général **le lendemain**. L’examen est indolore et l’irradiation modérée. Il sert aussi à savoir si un **traitement par MIBG radioactive (¹³¹I-MIBG)** est envisageable — c’est un couple *théranostique*.',
      patient: {
        sections: [
          { title: 'À quoi sert l’examen ?', text: 'À **localiser** certaines tumeurs rares des glandes surrénales ou du système nerveux, et à voir si elles sont uniques ou multiples. Le produit injecté se fixe **spécifiquement** sur ces tumeurs, ce qui les fait « ressortir » sur les images.' },
          { title: 'Comment se préparer', list: [
            'Vous prendrez des **comprimés pour protéger la thyroïde** (iode/Lugol), à débuter avant l’examen et à poursuivre quelques jours après.',
            'Certains **médicaments** (pour la tension, antidépresseurs, décongestionnants…) gênent l’examen : ils sont arrêtés un temps **sur consigne médicale** — ne rien arrêter seul.',
            'Prévenez en cas de **grossesse** ou d’**allaitement**.',
          ] },
          { title: 'Le jour de l’examen et après', text: 'Une **injection** lente dans une veine. Les images sont prises **le lendemain** (parfois aussi à 2 jours), avec parfois un complément couplé au scanner (SPECT/CT). C’est indolore ; pensez à **bien boire**. Quelques consignes simples de précaution vous seront remises pour les heures qui suivent.' },
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
      medecin_nuc: {
        sections: [
          // ───────── MOUVEMENT A — COMPRENDRE ─────────
          { title: 'A1 · Carte d’identité', text: 'Fiche-réflexe de l’examen (champs constants d’un article à l’autre).\n\n| Champ | Valeur |\n|---|---|\n| Acronyme × modalité | MIBG · planaire corps entier + **TEMP/TDM** |\n| Traceur principal | **¹²³I-MIBG** (alternative : ¹³¹I-MIBG) |\n| Émission × énergie | ¹²³I : γ **159 keV** · T½ 13,2 h |\n| Voie × activité adulte | **IV lente** · ~**370 MBq** (¹²³I) |\n| Délai × durée | **24 h** (± 48 h) · ~30–60 min |\n| Organe critique × dose | Foie/vessie ; **thyroïde si non bloquée** · ≈ **5 mSv** |\n| Préparation clé | **Blocage thyroïdien** + arrêt médicaments interférents |\n| Disponibilité × liés | ¹²³I sur commande · couple **théranostique ¹³¹I-MIBG** |',
            stats: [{ value: '¹²³I-MIBG', label: 'Traceur diagnostic' }, { value: '159 keV', label: 'γ (¹²³I, T½ 13,2 h)' }, { value: '~370 MBq', label: 'Activité adulte' }, { value: '24 h (±48 h)', label: 'Délai d’imagerie' }] },
          { title: 'A2 · Définition', text: 'La scintigraphie à la MIBG est une imagerie **fonctionnelle et moléculaire** : elle ne montre pas la *forme* d’une lésion mais sa **capacité à capter et stocker un analogue de la noradrénaline**. La MIBG emprunte le **transporteur de la noradrénaline (NET / uptake-1)** puis est stockée dans les **granules neurosécrétoires**. Une fixation traduit donc un tissu **sympatho-adrénergique fonctionnel** (normal ou tumoral) — information **fonctionnelle**, à coupler à l’imagerie **morphologique** (TDM/IRM) via la TEMP/TDM.' },
          { title: 'A3 · Rappels anatomo-physiologiques', text: 'Les cellules cibles dérivent de la **crête neurale** : **médullosurrénale** (cellules chromaffines) et **ganglions sympathiques/paraganglions** (de la base du crâne au pelvis). Elles synthétisent et stockent les **catécholamines** (noradrénaline/adrénaline) dans des granules, via le **NET** (recapture membranaire) et le **VMAT** (stockage vésiculaire). C’est précisément cette machinerie qu’exploite la MIBG — d’où sa spécificité pour les tumeurs de cette lignée.' },
          { title: 'A4 · Principe : la cible biologique', text: 'La MIBG (analogue de la noradrénaline) est **captée activement par le NET** des cellules sympatho-adrénergiques, puis **séquestrée** dans les granules par le VMAT. \n\n- **Hyperfixation** = densité élevée de cellules exprimant le NET (tumeur avide).\n- **Hypofixation/absence** = perte d’expression du NET (dédifférenciation, SDHB) **ou** blocage pharmacologique du NET.\n\nCe mécanisme explique à la fois les **indications** (§A5) et les **faux négatifs** (§C14).',
            figure: { svg: MIBG_UPTAKE, alt: 'La MIBG, analogue de la noradrénaline, est captée par le transporteur NET (uptake-1) de la cellule chromaffine puis stockée dans les granules via le VMAT ; de nombreux médicaments bloquent le NET.', caption: 'Captation par le NET (uptake-1) puis stockage vésiculaire (VMAT) — base de la spécificité ET des faux négatifs médicamenteux.' } },
          { title: 'A5 · Indications', text: 'Le cœur clinique — quand et pourquoi prescrire.\n\n| Domaine | Indication | Ce que l’examen apporte |\n|---|---|---|\n| Endocrinologie | **Phéochromocytome** | Localisation, bilatéralité, formes héréditaires, extension |\n| Endocrinologie/ORL | **Paragangliome** | Cartographie (multifocalité), caractérisation fonctionnelle |\n| Pédiatrie/Onco | **Neuroblastome** | Diagnostic, extension osseuse/médullaire, **réponse (SIOPEN)** |\n| Théranostique | Sélection pré-**¹³¹I-MIBG** | Confirme l’avidité = candidat au traitement |\n\nToujours expliciter le **rationale** (renvoi §A4) et le **statut** (validée vs émergente). Pour le phéo/para, intégrer la **TEP-SSTR** dans la décision (§D17-D19).' },
          { title: 'A6 · Contre-indications & précautions', text: 'Pas de CI absolue en dehors de la **grossesse** ; précautions essentielles :\n\n| Type | Éléments |\n|---|---|\n| **Absolues** | Grossesse (iode radioactif) |\n| **Relatives** | Allaitement (suspendre), médicaments interférents non arrêtés, surcharge iodée |\n\nInjection **lente** (le bolus rapide peut théoriquement déclencher une décharge catécholaminergique chez le phéochromocytome).',
            infoBox: { type: 'warning', title: 'Alerte — à vérifier impérativement', text: '**Blocage thyroïdien obligatoire** (iodure de potassium/Lugol ou perchlorate) débuté **avant** l’injection et poursuivi quelques jours (protège la thyroïde de l’iode radioactif libre). **Grossesse contre-indiquée**, allaitement à suspendre. Revoir la liste des **médicaments interférents** (§B8) et la fonction rénale.' } },

          // ───────── MOUVEMENT B — RÉALISER ─────────
          { title: 'B7 · Radiopharmaceutique(s) & mécanisme de fixation', text: 'Deux marquages, un même vecteur (MIBG) ; le choix dépend de l’objectif.\n\n| | **¹²³I-MIBG** | **¹³¹I-MIBG** |\n|---|---|---|\n| Usage | Diagnostic (**préféré**) | Diagnostic (ancien) + **thérapie** |\n| Émission γ | 159 keV | 364 keV (+ β⁻ thérapeutique) |\n| Période | 13,2 h | 8,02 j |\n| Image / dose | **Meilleure / plus faible** | Moindre / plus forte |\n| Imagerie | 24 h (± 48 h) | 24–72 h |\n\n**Contrôle qualité** du traceur : pureté radiochimique (chromatographie), pureté radionucléidique, pH, stérilité/apyrogénicité. **Activités** : adulte ~370 MBq (¹²³I) ; **enfant selon la carte de dose EANM** (fonction du poids, activité minimale garantie).' },
          { title: 'B8 · Préparation du patient', steps: [
            { title: 'J-1 → blocage thyroïdien', text: 'Iodure de potassium/Lugol (ou perchlorate) débuté ~24 h avant, poursuivi quelques jours après — protège la thyroïde de l’iode libre.' },
            { title: 'Arrêt des médicaments interférents', text: 'Selon demi-vie : labétalol ~72 h ; tricycliques, sympathomimétiques (décongestionnants/pseudoéphédrine), certains inhibiteurs calciques/antipsychotiques, tramadol, cocaïne, réserpine. Toujours sur avis médical.' },
            { title: 'Le jour J', text: 'Hydratation, vérification des arrêts, voie veineuse ; injection **lente** ; vidange vésicale avant l’acquisition.' },
          ],
            infoBox: { type: 'warning', title: 'Médicaments interférents (faux négatifs)', text: 'Mécanisme : inhibition du NET ou déplétion des granules. Principaux : **labétalol**, **antidépresseurs tricycliques**, **sympathomimétiques** (décongestionnants), inhibiteurs calciques (certains), antipsychotiques, tramadol, cocaïne, réserpine. Établir la liste personnalisée et les délais d’arrêt avant l’examen.' } },
          { title: 'B9 · Instrument, CQ & protocole d’acquisition', text: 'CQ de la γ-caméra **en prérequis** (uniformité, COR, résolution, sensibilité). Paramètres recommandés :\n\n| Paramètre | Recommandation | Pourquoi |\n|---|---|---|\n| Collimateur | **LEHR** (¹²³I, 159 keV) ; **haute énergie** pour ¹³¹I | limiter la pénétration septale |\n| Fenêtre | 159 keV ± 10 % | photopic ¹²³I |\n| Acquisition | **corps entier planaire** + **TEMP/TDM** ciblée | localisation anatomique, ↑ sensibilité |\n| Délai | 24 h (± 48 h) | meilleur contraste tumeur/fond |',
            figure: { svg: GAMMA_CAMERA, alt: 'Schéma d’une gamma-caméra (collimateur, cristal NaI(Tl), photomultiplicateurs, électronique de positionnement).', caption: 'L’imagerie MIBG repose sur la γ-caméra (planaire + TEMP/TDM) ; le collimateur est adapté à l’énergie de l’iode utilisé.' } },
          { title: 'B10 · Traitement, reconstruction & quantification', text: 'Reconstruction TEMP par **OSEM** (itérations/sous-ensembles, filtre) avec **correction d’atténuation** (TDM) et de diffusé. La quantification est surtout **semi-quantitative** (scores) : voir §C12. La fusion TEMP/TDM améliore la localisation et la distinction physiologique/pathologique (renvoi §C14).' },

          // ───────── MOUVEMENT C — INTERPRÉTER ─────────
          { title: 'C11 · Aspect normal & variantes physiologiques', text: 'Connaître le **normal** avant le pathologique. Fixations physiologiques attendues (¹²³I-MIBG) : **glandes salivaires, myocarde, foie (intense), rate, tube digestif (variable), vessie** ; parfois **graisse brune**, muqueuse nasale. Les **surrénales normales** peuvent être faiblement visibles en ¹²³I (plus qu’en ¹³¹I) — ne pas surinterpréter une fixation surrénalienne **symétrique et modérée**.',
            figure: { svg: MIBG_BIODISTRIB, alt: 'Biodistribution normale de la ¹²³I-MIBG : glandes salivaires, myocarde, foie intense, rate, tube digestif, vessie, surrénales faibles.', caption: 'Repères physiologiques normaux — indispensables avant d’affirmer une fixation tumorale anormale.' } },
          { title: 'C12 · Sémiologie, interprétation & scores', text: '**Méthode de lecture systématique** : 1) qualité technique & blocage ; 2) biodistribution physiologique ; 3) recherche de **foyer(s) anormal(aux)** (surrénalien / extra-surrénalien / osseux / médullaire) ; 4) corrélation TEMP/TDM ; 5) comparaison à l’antériorité. **Positivité** = fixation focale **supérieure au bruit de fond**, non physiologique, à substrat anatomique.',
            infoBox: { type: 'info', title: 'Scores (neuroblastome)', text: '**Score de Curie** et **score SIOPEN** : cotation semi-quantitative de l’extension squelettique/des tissus mous, segment par segment. Utilisés pour le **bilan initial** et surtout l’**évaluation de la réponse** au traitement (valeur pronostique).' } },
          { title: 'C13 · Compte rendu structuré', infoBox: { type: 'tip', title: 'Trame de compte rendu', text: 'Administratif (indication, traceur/activité, blocage, délais) → Technique (planaire ± TEMP/TDM, qualité) → Résultats (biodistribution, foyer(s) : siège, intensité, corrélat TDM ; score si neuroblastome) → **Conclusion répondant à la question clinique** (avide/non avide, extension, candidat ¹³¹I-MIBG ?).' },
            text: '*Exemple (conclusion)* : « Fixation focale intense de la surrénale droite (corrélée à une masse de 4 cm en TDM), sans autre foyer : aspect en faveur d’un **phéochromocytome MIBG-avide**, candidat potentiel à une thérapie par ¹³¹I-MIBG. »' },
          { title: 'C14 · Pièges, artefacts & faux positifs/négatifs', text: 'Tableau récapitulatif des écueils :\n\n| Faux **négatifs** | Faux **positifs** |\n|---|---|\n| Médicaments interférents non arrêtés | Contamination cutanée/urinaire |\n| Tumeurs dédifférenciées / **SDHB** | Fixation physiologique (surrénale, digestif) |\n| Petites lésions (< résolution) | Foyer inflammatoire/infectieux occasionnel |\n| Blocage du NET | Activité résiduelle vésicale |',
            infoBox: { type: 'warning', title: 'Piège — le faux négatif médicamenteux', text: 'Cause : un médicament non arrêté bloque le NET. Aspect : examen « négatif » malgré une forte suspicion. Conduite : vérifier la liste des arrêts AVANT de conclure ; en cas de doute SDHB/dédifférenciation, orienter vers **⁶⁸Ga-DOTATATE** ou **¹⁸F-FDG**.' } },

          // ───────── MOUVEMENT D — MAÎTRISER & SITUER ─────────
          { title: 'D15 · Dosimétrie', text: 'Maîtriser la dose délivrée.\n\n| Paramètre | ¹²³I-MIBG | ¹³¹I-MIBG (diagnostic) |\n|---|---|---|\n| Coefficient / dose efficace | ≈ 0,013 mSv/MBq → **≈ 5 mSv** (370 MBq) | nettement **plus élevée** |\n| Organe critique | foie, vessie ; **thyroïde si non bloquée** | thyroïde, foie |\n| Pédiatrie | **carte de dose EANM** (poids) | — |\n\nDose absorbée ≠ dose efficace ; facteurs modulants : activité, biocinétique, hydratation, fonction rénale. Mise en perspective : ordre de grandeur d’une **TDM** thoraco-abdomino-pelvienne.',
            infoBox: { type: 'warning', title: 'Grossesse / allaitement', text: 'Iode radioactif **contre-indiqué pendant la grossesse**. Allaitement : suspension (passage dans le lait) selon le radionucléide et l’activité.' } },
          { title: 'D16 · Radioprotection', text: 'Principes **justification / optimisation (ALARA) / limitation**. Le **¹²³I** (159 keV, T½ 13,2 h) est bien plus favorable que le **¹³¹I** (364 keV, β⁻, T½ 8 j → consignes renforcées, surtout en thérapie). Protéger **personnel** (temps/distance/écran, dosimétrie, zonage), **entourage/public** (consignes post-examen : distance vis-à-vis des enfants et femmes enceintes pour quelques heures, hygiène, hydratation), et gérer **effluents/déchets**.',
            figure: { svg: ALARA_TDS, alt: 'Temps, distance, écran : les trois leviers de réduction de dose (ALARA).', caption: 'Le bon sens « temps / distance / écran » structure les consignes au personnel et à l’entourage.' } },
          { title: 'D17 · Performances diagnostiques & comparaison', text: 'Situer la valeur diagnostique (sensibilité indicative, ¹²³I-MIBG) :\n\n| Indication | Sensibilité | Commentaire |\n|---|---|---|\n| Phéochromocytome sporadique | ~**85–90 %** | ↓ si métastatique / SDHx |\n| Paragangliome | variable | ↓ tête-cou & SDHx → **DOTATATE** supérieur |\n| Neuroblastome | ~**90 %** | référence pédiatrique (SIOPEN) |\n\nLa **TEP** (⁶⁸Ga-DOTATATE, ¹⁸F-FDOPA, ¹⁸F-FDG) surpasse souvent la MIBG dans le phéo/para, en particulier métastatique et lié à **SDHx**.' },
          { title: 'D18 · Place dans la stratégie & algorithmes', text: 'Logique décisionnelle : devant un **phéo/para** confirmé biologiquement, l’imagerie morphologique (TDM/IRM) localise, puis l’imagerie **fonctionnelle** caractérise et cherche d’autres sites — avec, selon le contexte (métastatique, SDHx, tête-cou), une **TEP-SSTR (⁶⁸Ga-DOTATATE)** souvent privilégiée. La **MIBG** s’impose si l’on envisage une **thérapie ¹³¹I-MIBG** (il faut prouver l’avidité) et reste le standard du **neuroblastome**. C’est l’archétype d’une démarche **théranostique** : *on traite ce que l’on voit*.' },
          { title: 'D19 · Examens apparentés & variantes', text: 'Choisir le bon traceur selon la cible :\n\n| Examen | Cible biologique | Quand le préférer |\n|---|---|---|\n| **¹²³I-MIBG** | NET (uptake-1) | Neuroblastome ; sélection pré-¹³¹I-MIBG |\n| **⁶⁸Ga-DOTATATE** TEP | Récepteurs SSTR | Para tête-cou, SDHx, métastatique |\n| **¹⁸F-FDOPA** TEP | Décarboxylation (AADC) | Phéo/para (excellente Se) |\n| **¹⁸F-FDG** TEP | Glycolyse | Tumeurs dédifférenciées / SDHB |\n| **¹³¹I-MIBG** (thérapie) | NET | Traiter les formes MIBG-avides |' },

          // ───────── MOUVEMENT E — ANCRER & ÉVALUER ─────────
          { title: 'E20 · Cas cliniques commentés', steps: [
            { title: 'Cas 1 — Phéochromocytome', text: 'HTA paroxystique, métanéphrines élevées, masse surrénalienne droite en TDM. MIBG : fixation focale intense surrénalienne droite, pas d’autre foyer → phéochromocytome unilatéral MIBG-avide ; avidité compatible avec une option ¹³¹I-MIBG si maligne.' },
            { title: 'Cas 2 — Neuroblastome', text: 'Enfant, masse abdominale, catécholamines urinaires élevées. MIBG : fixation de la tumeur primitive + foyers osseux multiples → extension métastatique ; **score SIOPEN** établi pour le suivi de la réponse.' },
          ],
            infoBox: { type: 'info', title: 'Atypie utile', text: 'Une tumeur fortement suspecte mais **MIBG-négative** doit faire évoquer une **dédifférenciation / mutation SDHB** → réorienter vers DOTATATE ou FDG plutôt que conclure à l’absence de tumeur.' } },
          { title: 'E21 · Points clés / à retenir', list: [
            'MIBG = analogue de la **noradrénaline**, capté par le **NET (uptake-1)**, stocké via le **VMAT**.',
            'Cibles : **phéochromocytome, paragangliome, neuroblastome** (lignée crête neurale).',
            '**¹²³I** (159 keV, diagnostic) préféré ; **¹³¹I** = diagnostic ancien **et thérapie** (théranostique).',
            'Activité adulte ~**370 MBq** ¹²³I ; enfant = **carte de dose EANM** ; dose efficace ≈ **5 mSv**.',
            '**Blocage thyroïdien obligatoire** (iode/perchlorate) avant et après.',
            'Arrêter les **médicaments interférents** (labétalol, tricycliques, sympathomimétiques…) — cause n°1 de **faux négatif**.',
            'Imagerie à **24 h (± 48 h)**, planaire **+ TEMP/TDM** ; collimateur adapté à l’énergie.',
            'Connaître la **biodistribution normale** (salivaires, myocarde, foie, rate, digestif, vessie).',
            'Neuroblastome : **scores de Curie / SIOPEN** pour l’extension et la **réponse**.',
            'Formes **SDHB/dédifférenciées** → faible avidité MIBG ⇒ **⁶⁸Ga-DOTATATE / ¹⁸F-FDG**.',
            'Injection **lente** (risque théorique de décharge catécholaminergique).',
            'Pour le phéo/para, la **TEP-SSTR** est souvent plus sensible ; la MIBG reste clé pour la **sélection thérapeutique**.',
          ] },
          { title: 'E22 · FAQ & pièges d’examen', text: '**Q : MIBG ou DOTATATE en première intention pour un paragangliome ?** R : Souvent **DOTATATE** (SSTR), surtout tête-cou/SDHx/métastatique ; MIBG si question théranostique ¹³¹I-MIBG.\n\n**Q : Pourquoi bloquer la thyroïde ?** R : Pour protéger la thyroïde de l’**iode radioactif libre** issu du traceur.\n\n**Q : Examen négatif malgré forte suspicion ?** R : Penser **médicament interférent non arrêté** ou **dédifférenciation/SDHB**.\n\n**Q : ¹²³I vs ¹³¹I pour le diagnostic ?** R : **¹²³I** (meilleure image, moindre dose) ; ¹³¹I surtout pour la **thérapie**.\n\n*(Un quiz interactif et une fiche de révision téléchargeable — §23/§24 du gabarit — sont des fonctionnalités de la plateforme à activer ; les QCM ci-dessus en constituent l’amorce.)*' },
          { title: 'E25 · Références & liens', text: 'Références complètes et datées en bas de page (section **Sources & Références**) : EANM 2010 (Bombardieri), EANM/SNMMI 2019 (Taïeb), Endocrine Society 2014 (Lenders), SIOPEN, SNMMI, ICRP 128. **Liens typés** à relier dans le graphe : Traceurs (MIBG, ¹³¹I-MIBG thérapie) · Maladies (phéochromocytome, paragangliome, neuroblastome) · Examens (⁶⁸Ga-DOTATATE, ¹⁸F-FDOPA, ¹⁸F-FDG) · Scores (Curie, SIOPEN). Dernière mise à jour : 2026.' },
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
