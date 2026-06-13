// Lot 8 — Articles NucleAtlas (assistance IA, à relire). IDs préfixés V2_.
import {
  GAMMA_CAMERA,
  PET_COINCIDENCE,
  BULLSEYE_17,
  GASTRIC_EMPTYING,
  FDG_UPTAKE,
} from './diagrams.mjs';

const A = ['Rédaction NucleAtlas', 'Assistance IA (Gemini)'];
const RS = 'ai_assisted';

export const articles = [
  // 1 — Cholescintigraphie (HIDA) ────────────────────────────────────────────
  {
    id: 'V2_CHOLESCINTIGRAPHIE', cat: 'gastro_enterologie', catLabel: 'Gastro-entérologie',
    title: 'Cholescintigraphie hépatobiliaire (HIDA)', difficulty: 'intermédiaire',
    tags: ['cholescintigraphie', 'HIDA', 'voies biliaires', 'cholécystite', 'atrésie', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI/EANM — Hepatobiliary scintigraphy guideline', url: 'https://doi.org/10.2967/jnumed.117.196683' },
    ],
    content: {
      lead: 'La **cholescintigraphie** (traceurs **HIDA** marqués au 99mTc) suit en temps réel la sécrétion de la bile par le foie et son cheminement vers la vésicule et l’intestin. Elle est utile pour la **cholécystite aiguë**, les fuites biliaires post-chirurgicales et l’**atrésie des voies biliaires** du nourrisson.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À vérifier que la **bile** est bien fabriquée par le foie et s’écoule correctement vers la vésicule et l’intestin.' },
          { title: 'Déroulement', text: 'Après une injection, on enregistre des images **dynamiques** pendant 1 h (parfois plus, avec des images tardives). On peut administrer un médicament pour stimuler la vésicule.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Cholécystite aiguë** : absence de visualisation de la vésicule (canal cystique obstrué).', '**Fuite biliaire** post-cholécystectomie/traumatisme.', '**Atrésie des voies biliaires** vs cholestase néonatale (nourrisson).', 'Dyskinésie vésiculaire (fraction d’éjection après stimulation).'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Jeûne adapté', text: 'Un jeûne ni trop court ni trop long est requis (une vésicule trop pleine ou contractée fausse l’examen). Pour l’atrésie, un prétraitement par phénobarbital est souvent utilisé.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole', text: 'Injection de **99mTc-HIDA** (mébrofénine), acquisition dynamique 60 min ± images tardives (jusqu’à 24 h pour l’atrésie). Stimulation par **cholécystokinine** pour la fraction d’éjection vésiculaire.',
            figure: { svg: GASTRIC_EMPTYING, alt: 'Courbe activité-temps (illustration d’un suivi dynamique).', caption: 'Comme d’autres examens dynamiques, on suit l’activité au cours du temps (sécrétion/excrétion biliaire).' },
            stats: [{ value: '99mTc-HIDA', label: 'Traceur' }, { value: '60 min', label: 'Acquisition dynamique' }, { value: 'CCK', label: 'Fraction d’éjection' }] },
          { title: 'Pièges', list: ['Jeûne inadéquat (vésicule pleine = non-visualisation factice).', 'Foie très cholestatique : excrétion intestinale retardée → images tardives.', 'Atrésie : absence d’excrétion intestinale à 24 h malgré phénobarbital.'] },
        ],
      },
    },
  },

  // 2 — TEMP/TDM (SPECT/CT) ──────────────────────────────────────────────────
  {
    id: 'V2_TEMP_TDM', cat: 'instrumentation', catLabel: 'Instrumentation',
    title: 'La TEMP/TDM (SPECT-CT) : principe et apports', difficulty: 'avancé',
    tags: ['TEMP', 'SPECT', 'TDM', 'tomographie', 'correction d’atténuation', 'hybride'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — SPECT/CT guidelines', url: 'https://www.eanm.org' },
      { title: 'IAEA — SPECT/CT physics', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'La **TEMP (tomographie d’émission monophotonique, SPECT)** reconstruit une image **en 3D** à partir de projections acquises en rotation autour du patient. Couplée à un **scanner (TDM)**, elle apporte la **localisation anatomique** et la **correction d’atténuation**, améliorant nettement la spécificité.',
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi c’est utile', text: 'La TEMP « déplie » l’information en volume (vs une image plane), et la fusion avec le scanner indique **précisément où** se situe une fixation — par exemple distinguer une lésion osseuse bénigne d’une métastase sur le rachis.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Principe', text: 'Une (ou deux) tête(s) de gamma-caméra tourne(nt) autour du patient pour acquérir des **projections** ; une **reconstruction itérative (OSEM)** génère les coupes. La **TDM** fournit la carte d’atténuation et le repère anatomique.',
            figure: { svg: GAMMA_CAMERA, alt: 'Chaîne de détection de la gamma-caméra, base de la TEMP.', caption: 'La TEMP acquiert des projections avec la gamma-caméra, reconstruites en coupes.' } },
          { title: 'Apports de la fusion', list: ['**Correction d’atténuation** (TDM) → quantification et contraste améliorés.', 'Localisation anatomique précise (ostéo-articulaire, endocrine, infection).', 'Réduction des examens « équivoques ».'] },
          { title: 'Points d’attention', infoBox: { type: 'info', title: 'Centre de rotation & alignement', text: 'La qualité dépend du contrôle du centre de rotation et de l’alignement TEMP/TDM ; les mouvements du patient entre les deux acquisitions créent des artefacts.' } },
        ],
      },
    },
  },

  // 3 — Contrôle qualité de la gamma-caméra ─────────────────────────────────
  {
    id: 'V2_CQ_GAMMA_CAMERA', cat: 'instrumentation', catLabel: 'Instrumentation',
    title: 'Contrôle qualité d’une gamma-caméra', difficulty: 'avancé',
    tags: ['contrôle qualité', 'uniformité', 'résolution', 'centre de rotation', 'gamma-caméra'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Routine quality control of nuclear medicine instrumentation', url: 'https://doi.org/10.1007/s00259-010-1549-3' },
      { title: 'IAEA — Quality control of gamma cameras', url: 'https://www.iaea.org' },
    ],
    content: {
      lead: 'Le **contrôle qualité (CQ)** régulier de la gamma-caméra garantit des images fiables et quantifiables. Il porte sur l’**uniformité**, la **résolution spatiale**, la **linéarité**, la sensibilité, et — pour la TEMP — le **centre de rotation**.',
      medecin_nuc: {
        sections: [
          { title: 'Tests et fréquences', list: ['**Uniformité** (quotidienne) : réponse homogène du détecteur à un flux uniforme.', '**Résolution spatiale & linéarité** (hebdomadaire) : mire à barres.', '**Centre de rotation (COR)** (pour la TEMP) : alignement mécanique/électronique.', '**Sensibilité**, énergie/pic, **CQ TDM** pour les systèmes hybrides.'] },
          { title: 'Pourquoi c’est critique',
            infoBox: { type: 'warning', title: 'Artefacts évitables', text: 'Une non-uniformité ou un COR mal réglé créent des artefacts en anneau ou un flou de reconstruction en TEMP — sources d’erreurs d’interprétation. Le CQ documenté est aussi une exigence réglementaire.' },
            figure: { svg: GAMMA_CAMERA, alt: 'Composants de la gamma-caméra contrôlés par le CQ.', caption: 'Le CQ vérifie chaque maillon : cristal, PMT, électronique de positionnement.' } },
        ],
      },
    },
  },

  // 4 — Cyclotron & production du 18F ────────────────────────────────────────
  {
    id: 'V2_CYCLOTRON', cat: 'radiopharmacie', catLabel: 'Radiopharmacie',
    title: 'Le cyclotron et la production des émetteurs de positons', difficulty: 'avancé',
    tags: ['cyclotron', '18F', 'production', 'fluor-18', 'radiopharmacie', 'TEP'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IAEA — Cyclotron produced radionuclides', url: 'https://www.iaea.org' },
      { title: 'EANM — Radiopharmacy & PET production', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'Les **émetteurs de positons** à courte période (18F, 11C, 13N, 15O) sont produits par un **cyclotron** qui accélère des particules chargées pour bombarder une cible. Le **18F** (T½ 110 min) est le plus utilisé, notamment pour le **FDG**.',
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi cela compte', text: 'La disponibilité des traceurs TEP dépend de la proximité d’un cyclotron : la période courte du 18F (≈ 2 h) impose une **logistique régionale** (production puis livraison rapide). En Afrique, l’implantation de cyclotrons conditionne l’accès à la TEP.' },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Principe', text: 'Le cyclotron accélère des **protons** (ou deutons) en spirale grâce à un champ magnétique et un champ électrique alternatif, jusqu’à une énergie suffisante pour induire une **réaction nucléaire** sur une cible. Ex. : ¹⁸O(p,n)¹⁸F produit le fluor-18 à partir d’eau enrichie en ¹⁸O.',
            figure: { svg: PET_COINCIDENCE, alt: 'Le 18F produit émet des positons détectés en coïncidence en TEP.', caption: 'Le 18F produit au cyclotron est un émetteur β⁺ exploité par la TEP.' },
            stats: [{ value: '18F : 110 min', label: 'Période' }, { value: '¹⁸O(p,n)¹⁸F', label: 'Réaction (FDG)' }, { value: '11C : 20 min', label: 'Autres émetteurs' }] },
          { title: 'De la cible au traceur', text: 'Après production, le radionucléide est acheminé en cellule blindée pour la **radiosynthèse** automatisée (ex. marquage du FDG), suivie des **contrôles qualité** avant libération du lot.' },
        ],
      },
    },
  },

  // 5 — Cystographie isotopique ──────────────────────────────────────────────
  {
    id: 'V2_CYSTOGRAPHIE_ISOTOPIQUE', cat: 'pediatrie', catLabel: 'Pédiatrie',
    title: 'Cystographie isotopique (reflux vésico-urétéral)', difficulty: 'intermédiaire',
    tags: ['cystographie isotopique', 'reflux vésico-urétéral', 'pédiatrie', 'faible dose', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM — Radionuclide cystography guideline', url: 'https://www.eanm.org' },
      { title: 'SNMMI — Vesicoureteral reflux imaging', url: 'https://www.snmmi.org' },
    ],
    content: {
      lead: 'La **cystographie isotopique** recherche un **reflux vésico-urétéral** (remontée d’urine de la vessie vers les reins) chez l’enfant, avec une **irradiation très faible** et une **sensibilité élevée** pour le reflux intermittent, ce qui en fait un bon examen de suivi.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À vérifier si l’urine **remonte** anormalement de la vessie vers les reins, ce qui peut favoriser les infections urinaires de l’enfant.' },
          { title: 'Déroulement', text: 'On instille un produit dans la vessie via une petite sonde, puis la caméra surveille en continu le remplissage et la miction. Examen court ; la dose de rayonnement est **très faible**.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications & atouts', list: ['Recherche/suivi du **reflux vésico-urétéral** (infections urinaires récidivantes).', 'Très **faible dose** et acquisition continue → bonne détection du reflux intermittent.', 'Souvent préférée à la cystographie radiologique pour le **suivi** (la radiologique précise mieux le grade et l’anatomie urétrale).'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Technique', text: 'Cystographie **directe** (instillation intravésicale de 99mTc) ou **indirecte** (après MAG3, sans sondage). Acquisition dynamique du remplissage et de la miction, surveillance du reflux vers les uretères/reins.',
            stats: [{ value: 'Faible dose', label: 'Atout pédiatrique' }, { value: 'Directe / indirecte', label: 'Deux techniques' }, { value: 'Dynamique', label: 'Détection du reflux' }] },
          { title: 'Pièges', list: ['Coopération de l’enfant ; technique de sondage stérile (directe).', 'Cystographie indirecte : nécessite une bonne fonction rénale et une miction coopérante.', 'Moins précise que la radiologique pour le grading anatomique.'] },
        ],
      },
    },
  },

  // 6 — Scintimammographie / MBI ─────────────────────────────────────────────
  {
    id: 'V2_SCINTIMAMMOGRAPHIE', cat: 'senologie_gynecologie', catLabel: 'Sénologie & Gynécologie',
    title: 'Imagerie moléculaire mammaire (MBI / scintimammographie)', difficulty: 'avancé',
    tags: ['scintimammographie', 'MBI', 'MIBI', 'sein dense', 'cancer du sein', '99mTc'],
    targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SNMMI — Breast-specific gamma imaging / MBI', url: 'https://www.snmmi.org' },
      { title: 'EANM — Molecular breast imaging', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'L’**imagerie moléculaire mammaire (MBI)** au **99mTc-sestamibi** détecte les lésions mammaires métaboliquement actives, indépendamment de la densité du sein. Elle est surtout utilisée en **complément** de la mammographie dans les **seins denses** ou les situations équivoques.',
      patient: {
        sections: [
          { title: 'À quoi ça sert ?', text: 'À mieux explorer le sein quand la mammographie est difficile à interpréter (seins denses) : le produit se fixe davantage sur les zones suspectes.' },
          { title: 'Déroulement', text: 'Une injection, puis des images des seins (compression douce), ~30–40 min. Examen complémentaire, pas un remplacement de la mammographie.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Seins denses** : complément à la mammographie pour augmenter la détection.', 'Lésions équivoques, contre-indication/intolérance à l’IRM mammaire.', 'Évaluation de l’étendue lésionnelle dans certains cas.'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Place', text: 'La MBI ne se substitue pas au dépistage par mammographie ni à l’histologie ; c’est un outil de résolution de problème, dont l’irradiation est à mettre en balance avec le bénéfice.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Technique', text: 'Injection de **99mTc-MIBI**, acquisition sur **détecteurs dédiés** (semi-conducteurs CZT) avec compression légère, incidences cranio-caudale et oblique. Optimisation de la dose (faibles activités sur détecteurs CZT).',
            stats: [{ value: '99mTc-MIBI', label: 'Traceur' }, { value: 'CZT dédié', label: 'Détecteur' }, { value: 'Seins denses', label: 'Indication clé' }] },
          { title: 'Pièges', list: ['Captation inflammatoire/fibroadénome (faux positifs).', 'Petites lésions infracentimétriques : sensibilité limitée.', 'Optimisation dosimétrique indispensable.'] },
        ],
      },
    },
  },

  // 7 — TEP-FET (gliomes) ────────────────────────────────────────────────────
  {
    id: 'V2_TEP_FET_GLIOME', cat: 'neurologie', catLabel: 'Neurologie',
    title: 'TEP aux acides aminés (18F-FET) des tumeurs cérébrales', difficulty: 'avancé',
    tags: ['18F-FET', 'gliome', 'tumeur cérébrale', 'récidive', 'radionécrose', 'acides aminés'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/EANO/RANO — Amino acid PET in gliomas', url: 'https://doi.org/10.1007/s00259-018-4207-9' },
    ],
    content: {
      lead: 'Les **TEP aux acides aminés** (18F-FET, 11C-méthionine) ciblent le **transport accru d’acides aminés** des cellules tumorales cérébrales. Contrairement au FDG (capté aussi par le cortex sain), le FET offre un excellent contraste tumeur/fond pour les **gliomes** : délimitation, biopsie, récidive vs radionécrose.',
      medecin_non_nuc: {
        sections: [
          { title: 'Pourquoi pas le FDG au cerveau ?', text: 'Le cortex cérébral normal consomme beaucoup de glucose : le FDG y est peu contrasté. Le **FET** est peu capté par le cerveau sain, ce qui fait **ressortir** la tumeur.' },
          { title: 'Indications', list: ['Délimitation tumorale et **ciblage de biopsie**/radiothérapie.', 'Distinction **récidive tumorale vs radionécrose** (post-traitement).', 'Évaluation de la réponse, suivi des gliomes.'] },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Protocole et interprétation', text: 'Acquisition **dynamique** possible (les courbes temps-activité aident à grader : précoce/décroissante évoquant le haut grade). Ratios tumeur/fond (TBR). Le 11C-méthionine (T½ 20 min) nécessite un cyclotron sur site.',
            figure: { svg: FDG_UPTAKE, alt: 'Mécanisme de captation cellulaire d’un traceur métabolique (analogie).', caption: 'Le FET exploite le transport d’acides aminés, surexprimé par les gliomes.' },
            stats: [{ value: '18F-FET', label: 'Acide aminé (T½ 110 min)' }, { value: 'TBR', label: 'Ratio tumeur/fond' }, { value: 'Dynamique', label: 'Aide au grade' }] },
          { title: 'Pièges', list: ['Captation inflammatoire post-thérapeutique modérée possible.', 'Interprétation conjointe IRM indispensable.', '11C-méthionine : logistique cyclotron.'] },
        ],
      },
    },
  },

  // 8 — Innervation myocardique (123I-MIBG) ──────────────────────────────────
  {
    id: 'V2_MIBG_CARDIAQUE', cat: 'cardiologie', catLabel: 'Cardiologie',
    title: 'Scintigraphie de l’innervation myocardique (123I-MIBG)', difficulty: 'avancé',
    tags: ['123I-MIBG', 'innervation', 'insuffisance cardiaque', 'rapport cœur/médiastin', 'pronostic'],
    targetAudience: ['medecin_non_nuc', 'medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'EANM/ASNC — Cardiac sympathetic imaging (123I-mIBG)', url: 'https://www.eanm.org' },
      { title: 'ADMIRE-HF study', url: 'https://doi.org/10.1016/j.jacc.2010.01.014' },
    ],
    content: {
      lead: 'La **scintigraphie cardiaque à la 123I-MIBG** évalue l’**innervation sympathique** du cœur. Le **rapport cœur/médiastin (H/M)** et le **washout** ont une valeur **pronostique** dans l’insuffisance cardiaque et certaines maladies neurodégénératives (corps de Lewy).',
      medecin_non_nuc: {
        sections: [
          { title: 'Indications', list: ['**Stratification pronostique** de l’insuffisance cardiaque (un H/M abaissé = pronostic plus défavorable).', 'Aide au diagnostic de la **démence à corps de Lewy** (dénervation cardiaque caractéristique).'] },
          { title: 'À savoir', infoBox: { type: 'info', title: 'Médicaments', text: 'Comme pour la MIBG tumorale, certains médicaments interfèrent avec la captation et doivent être suspendus selon protocole.' } },
        ],
      },
      medecin_nuc: {
        sections: [
          { title: 'Technique et mesures', text: 'Blocage thyroïdien, injection de **123I-MIBG**, images **précoce (15 min)** et **tardive (3–4 h)**. Calcul du **rapport H/M** (cœur/médiastin) et du **washout** ; ± TEMP.',
            figure: { svg: BULLSEYE_17, alt: 'Représentation polaire du myocarde.', caption: 'L’innervation est analysée globalement (H/M) et régionalement.' },
            stats: [{ value: '123I-MIBG', label: 'Traceur' }, { value: 'H/M', label: 'Rapport cœur/médiastin' }, { value: '15 min / 4 h', label: 'Précoce / tardif' }] },
          { title: 'Pièges', list: ['Blocage thyroïdien requis (123I).', 'Médicaments interférents.', 'Standardisation du calcul H/M (ROI, collimateur).'] },
        ],
      },
    },
  },

  // 9 — Statistique de comptage & résolution ─────────────────────────────────
  {
    id: 'V2_STATISTIQUE_COMPTAGE', cat: 'bases_physiques', catLabel: 'Bases Physiques',
    title: 'Statistique de comptage, résolution et qualité d’image', difficulty: 'avancé',
    tags: ['statistique de comptage', 'Poisson', 'résolution', 'bruit', 'sensibilité', 'physique'],
    targetAudience: ['medecin_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'IAEA — Nuclear Medicine Physics: counting statistics', url: 'https://www.iaea.org' },
      { title: 'EANM — Image quality fundamentals', url: 'https://www.eanm.org' },
    ],
    content: {
      lead: 'En médecine nucléaire, l’image résulte d’un **comptage d’événements aléatoires** suivant une **loi de Poisson**. Comprendre le compromis entre **bruit, résolution, sensibilité et temps/activité** est central pour optimiser les protocoles.',
      medecin_nuc: {
        sections: [
          { title: 'Loi de Poisson', text: 'Pour N événements détectés, l’**écart-type** est √N : le **rapport signal/bruit** s’améliore comme √N. Doubler les comptages ne réduit le bruit relatif que d’un facteur √2 — d’où l’intérêt d’optimiser temps d’acquisition et activité.',
            stats: [{ value: '√N', label: 'Écart-type (Poisson)' }, { value: 'SNR ∝ √N', label: 'Signal/bruit' }, { value: 'Temps vs activité', label: 'Leviers de comptage' }] },
          { title: 'Compromis qualité', list: ['**Résolution spatiale** vs **sensibilité** (choix du collimateur).', '**Bruit** vs **temps d’acquisition/activité** (ALARA, confort patient).', 'Reconstruction (itérations, filtres) : lissage vs détail.', 'Effet de **volume partiel** pour les petites structures.'] },
          { title: 'Application', infoBox: { type: 'tip', title: 'Optimiser sans surdoser', text: 'Plutôt que d’augmenter l’activité (et la dose), on peut allonger le temps d’acquisition ou optimiser la reconstruction pour atteindre la qualité diagnostique — principe clé en pédiatrie.' } },
        ],
      },
    },
  },

  // 10 — FAQ / idées reçues (SEO patient) ────────────────────────────────────
  {
    id: 'V2_FAQ_MN', cat: 'generalites', catLabel: 'Généralités',
    title: 'Médecine nucléaire : foire aux questions et idées reçues', difficulty: 'fondamental',
    tags: ['FAQ', 'idées reçues', 'sécurité', 'radioactivité', 'patient', 'questions fréquentes'],
    targetAudience: ['patient', 'medecin_non_nuc'], authors: A, reviewStatus: RS,
    sources: [
      { title: 'SFMN — Questions fréquentes des patients', url: 'https://www.sfmn.org' },
      { title: 'IRSN — Idées reçues sur la radioactivité', url: 'https://www.irsn.fr' },
    ],
    content: {
      lead: 'Réponses claires aux **questions les plus fréquentes** sur la médecine nucléaire — pour lever les inquiétudes courantes et démêler le vrai du faux.',
      patient: {
        sections: [
          { title: 'Vais-je devenir radioactif ?', text: 'Vous émettez un rayonnement **très faible et transitoire** pendant quelques heures. C’est sans danger pour vous, et de simples précautions de distance suffisent vis-à-vis des jeunes enfants et femmes enceintes pour les premières heures.' },
          { title: 'Est-ce douloureux ? Dangereux ?', text: 'En dehors de la piqûre, l’examen est **indolore**. Les réactions allergiques sont **exceptionnelles**. La dose de rayonnement est faible et justifiée par le bénéfice diagnostique.' },
          { title: 'Idées reçues fréquentes', list: ['« C’est comme une bombe atomique » → **Faux** : quantités infimes, sans rapport.', '« Je vais contaminer ma famille » → **Faux** : précautions simples, courte durée.', '« L’IRM serait toujours mieux » → **Faux** : la médecine nucléaire montre la **fonction**, pas seulement l’anatomie ; elles sont complémentaires.', '« Le produit reste dans le corps » → **Faux** : il s’élimine (urines) et décroît en quelques heures.'] },
          { title: 'Puis-je conduire / reprendre le travail ?', text: 'Oui, en général immédiatement après un examen diagnostique. Pour les **traitements** (iode, etc.), des consignes spécifiques et parfois un arrêt court vous sont précisés.' },
        ],
      },
      medecin_non_nuc: {
        sections: [
          { title: 'Messages clés à transmettre', text: 'Rassurer sur la faible dose et la justification, vérifier grossesse/allaitement, rappeler le jeûne éventuel, et expliquer la complémentarité fonction/anatomie pour favoriser l’adhésion du patient.' },
        ],
      },
    },
  },
];
