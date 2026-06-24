// Article V2_PHEOCHROMOCYTOME — Maladie · Médecin nucléaire (gabarit Maladie,
// 24 sections / 5 mouvements). Transcription fidèle de la version de référence
// (Dr B. F. P. Agboton). Referme le graphe avec l'article Scintigraphie à la MIBG.
import { PHEO_TARGETS, THERANOSTIC_LOOP, MIBG_BIODISTRIB } from './diagrams.mjs';

const A = ['Dr Babatounde Fréjuste Pinocio Agboton', 'Assistance IA (Claude)'];

export const article = {
  id: 'V2_PHEOCHROMOCYTOME', cat: 'endocrinologie', catLabel: 'Endocrinologie',
  title: 'Phéochromocytome',
  difficulty: 'avancé',
  tags: ['phéochromocytome', 'paragangliome', 'PPGL', 'catécholamines', 'métanéphrines', 'SDHB', 'DOTATATE', 'FDOPA', 'FDG', 'MIBG', 'théranostique', 'OMS 2022'],
  targetAudience: ['patient', 'medecin_non_nuc', 'medecin_nuc'],
  authors: A, reviewStatus: 'ai_assisted',
  sources: [
    { title: '[1] Mete O, Asa SL, et al. Overview of the 2022 WHO Classification of Paragangliomas and Pheochromocytomas. Endocr Pathol 2022;33:90-114', url: 'https://doi.org/10.1007/s12022-022-09704-6' },
    { title: '[2] Rindi G, Mete O, et al. Overview of the 2022 WHO Classification of Neuroendocrine Neoplasms. Endocr Pathol 2022;33:115-154', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[3] Lenders JWM, Duh QY, Eisenhofer G, et al. Pheochromocytoma and Paraganglioma: an Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab 2014;99:1915-1942', url: 'https://doi.org/10.1210/jc.2014-1498' },
    { title: '[4] Taïeb D, Hicks RJ, Hindié E, et al. EANM/SNMMI 2019 practice guideline for radionuclide imaging of phaeochromocytoma & paraganglioma. Eur J Nucl Med Mol Imaging 2019;46:2112-2137', url: 'https://www.eanm.org/publications/guidelines/' },
    { title: '[5] Nölting S, Bechmann N, Taïeb D, et al. Personalized management of pheochromocytoma and paraganglioma. Endocr Rev 2022;43:199-239', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[6] Crona J, Taïeb D, Pacak K. New perspectives on PPGL: toward a molecular classification. Endocr Rev 2017;38:489-515', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[7] Timmers HJLM, et al. Superiority of ¹⁸F-FDG PET in metastatic SDHB-associated PPGL. J Clin Oncol 2007;25:2262-2269', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[8] Han S, Suh CH, Woo S, et al. Performance of ⁶⁸Ga-DOTA-SSA PET in PPGL: systematic review & meta-analysis. J Nucl Med 2019;60:369-376', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[9] Janssen I, Blanchet EM, Adams K, et al. Superiority of ⁶⁸Ga-DOTATATE PET/CT in SDHB-associated metastatic PPGL. Clin Cancer Res 2015;21:3888-3895', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[10] Pryma DA, Chin BB, Noto RB, et al. Efficacy & safety of high-specific-activity ¹³¹I-MIBG (iobenguane I-131) in advanced PPGL. J Nucl Med 2019;60:623-630', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[11] Satapathy S, Mittal BR, Bhansali A. PRRT in advanced PPGL: systematic review & meta-analysis. Clin Endocrinol (Oxf) 2019;91:718-727', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[12] U.S. FDA — Belzutifan (Welireg) approval for pheochromocytoma/paraganglioma, mai 2025', url: 'https://www.fda.gov' },
    { title: '[13] Eisenhofer G, et al. Biochemical phenotypes and catecholamine metabolites in PPGL (profil sécrétoire)', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: '[14] Fishbein L, et al. Comprehensive molecular characterization of PPGL (TCGA). Cancer Cell 2017;31:181-193', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
  ],
  content: {
    // Carte d'identité (maladie, gabarit §1)
    identityCard: [
      { icon: 'microscope', label: 'Type', value: 'TNE chromaffine — paragangliome intra-surrénalien (OMS 2022)' },
      { icon: 'target', label: 'Siège × système', value: 'Médullosurrénale · sympatho-adrénergique' },
      { icon: 'activity', label: 'Épidémiologie', value: '~0,5/100 000/an · pic 30–50 ans · 2 sexes' },
      { icon: 'flask', label: 'Sécrétion', value: 'Catécholamines : adrénergique / noradrénergique / dopaminergique' },
      { icon: 'flask', label: 'Marqueurs', value: 'Métanéphrines libres plasmatiques ou urinaires fractionnées' },
      { icon: 'dna', label: 'Génétique', value: '30–40 % héréditaire · clusters 1 (SDHx, VHL) & 2 (RET, NF1, MAX, TMEM127)' },
      { icon: 'target', label: 'Cibles imageables', value: 'NET · SSTR2 · décarboxylation · glycolyse' },
      { icon: 'atom', label: 'Examens NM phares', value: 'Ga-DOTATATE · ¹⁸F-FDOPA · ¹⁸F-FDG · ¹²³I-MIBG' },
      { icon: 'radiation', label: 'Cible théranostique', value: '¹²³I/¹³¹I-MIBG · Ga/¹⁷⁷Lu-DOTATATE' },
      { icon: 'alert', label: 'Risque métastatique', value: '~10 % (↑ si SDHB, extra-surrénalien, > 5 cm)' },
      { icon: 'list', label: 'Classification', value: 'OMS 2022 — potentiel métastatique pour toute lésion' },
    ],
    relatedLinks: [
      { type: 'examen', label: '⁶⁸Ga-DOTATATE TEP' },
      { type: 'examen', label: '¹⁸F-FDOPA TEP' },
      { type: 'examen', label: '¹⁸F-FDG TEP' },
      { type: 'examen', label: 'Scintigraphie à la MIBG' },
      { type: 'traceur', label: '¹²³I/¹³¹I-MIBG' },
      { type: 'traceur', label: '⁶⁸Ga-DOTATATE' },
      { type: 'theranostique', label: '¹³¹I-MIBG' },
      { type: 'theranostique', label: '¹⁷⁷Lu-DOTATATE (PRRT)' },
      { type: 'maladie', label: 'Paragangliome (sympathique / tête & cou)' },
      { type: 'maladie', label: 'Adénome surrénalien' },
      { type: 'maladie', label: 'Corticosurrénalome' },
      { type: 'score', label: 'TNM AJCC 8ᵉ éd.' },
    ],
    quiz: [
      { question: 'Chez un patient SDHB avec suspicion de maladie métastatique, quel examen fonctionnel est privilégié en 1ʳᵉ intention ?', options: ['¹²³I-MIBG TEMP', '⁶⁸Ga-DOTATATE TEP', 'Scintigraphie osseuse', '¹⁸F-FDOPA TEP'], answer: 1, explanation: 'Dans le contexte SDHx/SDHB métastatique, le ⁶⁸Ga-DOTATATE (SSTR2) est le plus sensible ; le FDG complète, la MIBG est prise en défaut.', difficulty: 'moyen' },
      { question: 'Quel traceur a la meilleure sensibilité globale par lésion dans le PPGL ?', options: ['¹²³I-MIBG (~38 %)', '¹⁸F-FDG (~74 %)', '¹⁸F-FDOPA (~80 %)', '⁶⁸Ga-DOTATATE (~93 %)'], answer: 3, explanation: 'DOTATATE ~93 % > FDOPA ~80 % > FDG ~74 % > MIBG ~38 %.', difficulty: 'facile' },
      { question: 'Pourquoi conserver la MIBG malgré sa faible sensibilité ?', options: ['Elle est moins chère', 'Pour sélectionner la thérapie ¹³¹I-MIBG', 'Elle est plus spécifique que tout', 'Pour le diagnostic biochimique'], answer: 1, explanation: 'Seule une tumeur ¹²³I-MIBG-positive bénéficiera d’une radiothérapie interne par ¹³¹I-MIBG (logique théranostique).', difficulty: 'moyen' },
      { question: 'Phéochromocytome sporadique : traceur de 1ʳᵉ intention (EANM/SNMMI 2019) ?', options: ['¹⁸F-FDOPA', '⁶⁸Ga-DOTATATE', '¹⁸F-FDG', 'Scintigraphie osseuse'], answer: 0, explanation: 'Pour le phéo sporadique non-SDHx, la ¹⁸F-FDOPA est très performante (~94 %) ; DOTATATE pour les PGL et formes SDHx/métastatiques.', difficulty: 'difficile' },
      { question: 'Un profil noradrénergique (normétanéphrine ↑) oriente vers quel cluster ?', options: ['Cluster 2 (signalisation kinase)', 'Cluster 1 (pseudohypoxie)', 'Cluster 3 (Wnt)', 'Aucun'], answer: 1, explanation: 'Adrénergique (métanéphrine) → cluster 2 ; noradrénergique → cluster 1 ; 3-méthoxytyramine → SDHx / risque métastatique.', difficulty: 'difficile' },
      { question: 'Le diagnostic positif de phéochromocytome repose D’ABORD sur :', options: ['L’imagerie nucléaire', 'La biochimie (métanéphrines)', 'La biopsie', 'L’échographie'], answer: 1, explanation: 'Séquence Endocrine Society : confirmation biochimique d’abord (métanéphrines), localisation ensuite.', difficulty: 'facile' },
      { question: 'Préparation avant la chirurgie d’un phéochromocytome :', options: ['Bêta- puis alpha-bloquant', 'Alpha-bloquant puis bêta-bloquant', 'Bêta-bloquant seul', 'Aucune'], answer: 1, explanation: 'Alpha-blocage d’abord (+ expansion volémique), puis bêta-blocage — jamais l’inverse (risque de crise hypertensive).', difficulty: 'moyen' },
      { question: 'Selon l’OMS 2022, le terme « malin » pour le phéochromocytome est :', options: ['Réservé aux SDHB', 'Abandonné (potentiel métastatique pour toute lésion)', 'Synonyme de métastatique', 'Réservé aux > 5 cm'], answer: 1, explanation: 'L’OMS 2022 abandonne « bénin/malin » : toute lésion a un potentiel métastatique ; on parle de maladie métastatique.', difficulty: 'moyen' },
      { question: 'Quelle mutation porte le risque métastatique le plus élevé ?', options: ['RET (NEM2)', 'NF1', 'SDHB', 'VHL'], answer: 2, explanation: 'SDHB : risque métastatique (~30–40 %) et mortalité spécifique les plus élevés ; tumeurs souvent FDG-avides et MIBG-négatives.', difficulty: 'facile' },
      { question: 'Quel couple théranostique cible les récepteurs de la somatostatine ?', options: ['¹²³I/¹³¹I-MIBG', '⁶⁸Ga/¹⁷⁷Lu-DOTATATE', '¹⁸F-FDG / ¹³¹I', 'DaTscan / ¹⁷⁷Lu'], answer: 1, explanation: 'On image au ⁶⁸Ga-DOTATATE (SSTR2) et on traite au ¹⁷⁷Lu-DOTATATE (PRRT). L’autre couple est ¹²³I→¹³¹I-MIBG (NET).', difficulty: 'facile' },
      { question: 'La graisse brune en TEP-FDG est un piège car :', options: ['Elle masque la tumeur', 'Captation symétrique cervico-thoracique déclenchée par le froid (faux positif)', 'Elle bloque le NET', 'Elle augmente la dose'], answer: 1, explanation: 'Captation symétrique du tissu adipeux brun, déclenchée par le froid → faux positif ; réchauffer le patient limite ce piège.', difficulty: 'moyen' },
      { question: 'Principal risque d’une radiothérapie interne dans le phéochromocytome ?', options: ['Hypothyroïdie', 'Crise hypertensive (relargage de catécholamines)', 'Allergie à l’iode', 'Insuffisance rénale aiguë'], answer: 1, explanation: 'La lyse tumorale peut libérer des catécholamines → crise hypertensive ; un alpha-blocage préalable est requis.', difficulty: 'moyen' },
    ],
    revisionSheet: {
      keyPoints: [
        'OMS 2022 : phéo = paragangliome intra-surrénalien ; plus de « bénin/malin », potentiel métastatique pour toute lésion.',
        'Diagnostic : métanéphrines d’abord, localisation ensuite ; test génétique pour TOUS.',
        '4 cibles imageables : NET (MIBG) · catécholamines (FDOPA) · SSTR2 (DOTATATE) · glycolyse (FDG) — le génotype choisit.',
        'Sensibilité : DOTATATE ~93 % > FDOPA ~80 % > FDG ~74 % > MIBG ~38 % ; FDG domine dans SDHB.',
        'Théranostique : ¹²³I→¹³¹I-MIBG (NET) et ⁶⁸Ga→¹⁷⁷Lu-DOTATATE (SSTR2) ; alpha-blocage avant traitement.',
        'SDHB = risque métastatique le plus élevé ; Azedra approuvé 2018 (production arrêtée 2024) ; belzutifan approuvé 2025.',
      ],
      protocol: [
        'Suspicion → confirmation biochimique (métanéphrines, Se ~98 %).',
        'Localisation : TDM surrénale (1ᵉʳ choix) ou IRM (enfant, grossesse, tête & cou).',
        'Imagerie fonctionnelle guidée par le génotype (§8) : caractérise la cible, cherche multifocalité/métastases, sélectionne pour la théranostique.',
        'Test génétique pour tous ; préparation chirurgicale : alpha- puis bêta-blocage + expansion volémique.',
      ],
      scores: [
        'TNM AJCC 8ᵉ éd. : T1 < 5 cm · T2 ≥ 5 cm ou PGL sympathique · T3 envahissement ; N1 / M1.',
        'En imagerie : on cartographie l’extension et on caractérise la cible (avidité SSTR/MIBG/FDG), plutôt qu’un score type Deauville.',
      ],
      pitfalls: [
        'Graisse brune (FDG) : captation symétrique cervico-thoracique au froid → faux positif.',
        'Fixations physiologiques MIBG (myocarde, salivaires, foie, digestif) + interférents (tricycliques, labétalol…) : arrêt + blocage thyroïdien.',
        'SDHx : multifocalité = tumeurs primitives synchrones possibles (≠ métastases) ; intégrer le génotype.',
        'Radiothérapie interne : flare osseux transitoire pouvant simuler une progression précoce.',
      ],
    },
    // §0 — Présentation générale (commune aux 4 profils)
    lead: 'Le **phéochromocytome** est une tumeur rare de la glande surrénale qui fabrique en excès les hormones du stress, les **catécholamines** (adrénaline et noradrénaline). Cet excès peut provoquer des poussées de tension, des palpitations, des maux de tête et des sueurs. La **médecine nucléaire** y occupe une place centrale : en une acquisition du corps entier, elle localise la tumeur, recherche d’éventuelles localisations à distance et détermine si un **traitement radioactif ciblé** est envisageable. La grande majorité de ces tumeurs se guérit par chirurgie.',
    patient: {
      sections: [
        { title: 'Qu’est-ce que c’est ?', text: 'Une **tumeur de la glande surrénale** (au-dessus du rein) qui produit trop d’**hormones du stress**. D’où des poussées de **tension**, des **palpitations**, des **maux de tête** et des **sueurs**. C’est rare, et le plus souvent **guéri par une opération**.' },
        { title: 'Le rôle des examens de médecine nucléaire', text: 'Des images du **corps entier** permettent de **localiser** la tumeur, de vérifier qu’elle est **unique**, et parfois de **préparer un traitement radioactif ciblé**. Un dosage sanguin/urinaire (les **métanéphrines**) confirme le diagnostic en amont.' },
        { title: 'Bon à savoir', list: [
          'Un **bilan génétique** est proposé : la maladie est souvent **familiale**.',
          'Avant l’opération, un **traitement préparatoire** de la tension est indispensable.',
          'Certains examens nécessitent l’**arrêt de médicaments** et un **blocage de la thyroïde** (sur consigne).',
        ] },
      ],
    },
    medecin_non_nuc: {
      sections: [
        { title: 'Quand y penser', text: 'Triade **céphalées – sueurs – palpitations** + HTA (paroxystique ou permanente), **incidentalome surrénalien**, ou **dépistage** chez un porteur de mutation (SDHx, VHL, NEM2). Le tableau est évocateur mais **inconstant**.' },
        { title: 'Démarche', list: [
          '**Métanéphrines** libres plasmatiques ou urinaires fractionnées **d’abord** (le profil sécrétoire oriente déjà le génotype).',
          '**Localisation** : TDM surrénale (ou IRM) ; puis **imagerie fonctionnelle nucléaire** guidée par le génotype.',
          '**Test génétique pour tous** ; préparation chirurgicale par **alpha- puis bêta-bloquant** (jamais l’inverse).',
        ] },
        { title: 'Apport de la médecine nucléaire', infoBox: { type: 'info', title: 'Pourquoi adresser', text: 'L’imagerie fonctionnelle **caractérise la cible** (NET, SSTR2, glycolyse), détecte la **multifocalité** et les **métastases** (souvent manquées en TDM/IRM) et **sélectionne** les patients pour un **traitement théranostique** (¹³¹I-MIBG ou ¹⁷⁷Lu-DOTATATE).' } },
      ],
    },
    medecin_nuc: {
      sections: [
        // ───────── MOUVEMENT A — COMPRENDRE ─────────
        { title: 'A1 · Carte d’identité', text: '**Synonymes** : PHÉO · PCC (pheochromocytoma) · paragangliome surrénalien. **Apparenté** : paragangliome extra-surrénalien (sympathique abdominal · parasympathique tête & cou). **Classification OMS 2022** : toute lésion a un potentiel métastatique — les termes « bénin/malin » sont abandonnés.[1,2]' },
        { title: 'A2 · Définition', text: 'Le phéochromocytome est une **tumeur neuroendocrine** développée aux dépens des **cellules chromaffines de la médullosurrénale**, dérivées de la **crête neurale**. Il synthétise, stocke et sécrète des **catécholamines**. Son équivalent extra-surrénalien est le **paragangliome (PGL)** : sympathique (chaîne para-aortique, organe de Zuckerkandl, vessie) ou parasympathique (tête & cou, le plus souvent non sécrétant). Les deux entités forment les **PPGL**.[1,2]\n\nLa **classification OMS 2022** a changé le vocabulaire : le phéochromocytome est désormais défini comme un **paragangliome intra-surrénalien**, et « bénin/malin » sont abandonnés. Toute lésion possède un **potentiel métastatique** ; on parle de **maladie métastatique** lorsque du tissu tumoral est retrouvé là où il n’existe normalement pas de cellules chromaffines (ganglions, os, foie, poumon).[1,2]',
          infoBox: { type: 'info', title: 'Point expert', text: 'Distinguer « fonctionnel » et « morphologique » : le diagnostic positif repose d’abord sur la **biochimie** (excès de métanéphrines), la surrénale n’étant que le siège. La médecine nucléaire apporte une information **moléculaire** — quelle cible la tumeur exprime — que ni le scanner ni l’IRM ne donnent.' } },
        { title: 'A3 · Épidémiologie & facteurs de risque', list: [
          'Incidence ~**0,4–0,6/100 000 personnes-années** ; pic à **30–50 ans**, sans prédominance de sexe nette.[3]',
          'Répartition : ~**80–85 %** des PPGL sont surrénaliens (phéo), **15–20 %** extra-surrénaliens (paragangliome).[5]',
          'Découverts dans ~**4–7 %** des incidentalomes surrénaliens ; impliqués dans ~0,1–0,2 % des HTA.[3]',
          'Tumeur **la plus héréditaire** de la pathologie humaine : ~**30–40 %** de mutation germinale ; un driver identifié dans ~**70 %** des cas.[5,14]',
          'Risque métastatique global ~**10 %**, plus élevé pour les PGL sympathiques et la mutation **SDHB** (~30–40 %).[5]',
        ],
          infoBox: { type: 'warning', title: 'Piège — la « règle des 10 % »', text: 'La règle des 10 % (10 % bilatéral, extra-surrénalien, héréditaire, métastatique) est **obsolète** : l’hérédité dépasse largement 10 %, et bilatéralité, siège et risque métastatique varient surtout selon le **génotype**.[5]' } },
        { title: 'A4 · Physiopathologie & cibles biologiques imageables', text: 'La cellule chromaffine capte la L-DOPA et les catécholamines, les stocke dans des vésicules et les sécrète : **cette machinerie est précisément ce que la médecine nucléaire exploite**. Le phéochromocytome offre plusieurs **« prises » imageables**, et c’est le **génotype** qui détermine laquelle prédomine — d’où une imagerie réellement **personnalisée**.[4,5]\n\n| Cible biologique | Mécanisme exploité | Traceur(s) | Phénotype où elle prime |\n|---|---|---|---|\n| **NET / uptake-1** | Capture des analogues de catécholamines | ¹²³I/¹³¹I-MIBG | Tumeurs adrénergiques (cluster 2), phéo non-SDHx |\n| **Décarboxylation (AADC)** | Précurseur → dopamine, stockage VMAT | ¹⁸F-FDOPA | Phéo, PGL ; bon en SDHx tête & cou |\n| **Récepteurs SSTR2** | Analogue de la somatostatine | ⁶⁸Ga-DOTATATE | Cluster 1, surtout SDHB, métastatique |\n| **Glycolyse / pseudohypoxie** | Hyperconsommation de glucose (Warburg, succinate) | ¹⁸F-FDG | SDHB, tumeurs dédifférenciées |\n\n**Hyperfixation** = surexpression de la cible (NET, SSTR2) ou hypermétabolisme ; **hypofixation** = perte de différenciation (tumeurs SDHx/dédifférenciées, qui perdent l’avidité MIBG mais gagnent en FDG et SSTR). C’est la **clé de lecture** de tout l’article : à chaque cible correspond un examen, et le génotype oriente le choix.[4,5]',
          figure: { svg: PHEO_TARGETS, alt: 'Le phéochromocytome au centre, quatre flèches typées vers MIBG (NET), FDOPA (décarboxylation), DOTATATE (SSTR2) et FDG (glycolyse).', caption: 'Fig. 2 — Quatre cibles imageables → quatre examens. La charnière du graphe : la maladie exprime ce que l’examen cible.' } },
        { title: 'A5 · Classification & formes', text: 'Au-delà de l’histologie, la **classification moléculaire (TCGA)** structure la maladie en **trois clusters** aux conséquences directes sur le phénotype sécrétoire, le risque métastatique et l’imagerie.[5,6,14]\n\n| Cluster | Gènes principaux | Sécrétion | Risque métastatique | Imagerie préférentielle |\n|---|---|---|---|---|\n| **1 — pseudohypoxie** | SDHx, FH, VHL, EPAS1/HIF2A | Noradrénergique → dopaminergique | Élevé (SDHB 30–40 %) | **Ga-DOTATATE > FDG** ; MIBG/FDOPA faibles (SDHx) |\n| **2 — signalisation kinase** | RET, NF1, MAX, TMEM127, HRAS | Adrénergique (adrénaline) | Faible (~2–11 %) | **FDOPA / MIBG excellents** |\n| **3 — Wnt** | MAML3 (fusion), CSDE1 | Variable | Intermédiaire | Données limitées |\n\n- **Syndromes héréditaires** : NEM2 (RET ; phéo souvent bilatéral, peu métastatique), VHL (bilatéral, noradrénergique), NF1, syndromes paragangliomes SDHx (SDHB → risque métastatique, SDHD → tête & cou).[5,18]\n- **Phénotype sécrétoire** : adrénergique (métanéphrine ↑) → cluster 2 ; noradrénergique (normétanéphrine ↑) → cluster 1 ; **dopaminergique (3-méthoxytyramine ↑)** → SDHx + risque métastatique.[13]' },

        // ───────── MOUVEMENT B — DIAGNOSTIQUER ─────────
        { title: 'B6 · Présentation clinique & circonstances de découverte', text: 'Tableau dominé par l’**excès de catécholamines**. La triade **céphalées – sueurs – palpitations** + HTA (paroxystique ou permanente) est évocatrice mais **inconstante**.[3]',
          list: [
            'Signes : HTA, tachycardie, pâleur, anxiété, tremblements, amaigrissement, hyperglycémie, hypotension orthostatique.',
            'Crise aiguë : urgence hypertensive, **cardiomyopathie aux catécholamines (tako-tsubo)**, trouble du rythme — pronostic vital engagé.',
            'Découverte fortuite : part croissante via un **incidentalome** surrénalien ou un **dépistage génétique** (souvent asymptomatiques).',
            'PGL tête & cou : le plus souvent **non sécrétant** — masse cervicale indolore, acouphène pulsatile, atteinte de nerfs crâniens.',
          ],
          infoBox: { type: 'info', title: 'Point expert', text: 'Chez un patient porteur d’une mutation connue (SDHx, VHL, NEM2), la surveillance détecte des tumeurs **avant tout symptôme** : l’imagerie est alors un outil de **dépistage et de stadification**, pas seulement de confirmation.' } },
        { title: 'B7 · Démarche diagnostique', text: 'Séquence recommandée par l’**Endocrine Society** : **confirmation biochimique d’abord, localisation ensuite**.[3]',
          steps: [
            { title: '1 · Confirmation biochimique', text: 'Métanéphrines libres plasmatiques ou fractionnées urinaires (Se ~98 %). Le profil sécrétoire oriente déjà le génotype.[3,13]' },
            { title: '2 · Localisation anatomique', text: 'TDM surrénale (1ᵉʳ choix) ou IRM (enfant, grossesse, tête & cou, recherche d’extra-surrénalien).' },
            { title: '3 · Imagerie fonctionnelle nucléaire', text: 'Caractérise la cible, recherche multifocalité et métastases, sélectionne pour la théranostique — choix **guidé par le génotype** (§B8).[4]' },
            { title: '4 · Test génétique', text: 'Pour TOUS les patients (panel SDHx, VHL, RET, NF1, MAX, TMEM127…).[3,5]' },
            { title: '5 · Préparation à la chirurgie', text: 'Alpha-bloquant (puis bêta-bloquant) + expansion volémique — **jamais l’inverse**.[3]' },
          ] },
        { title: 'B8 · Imagerie nucléaire au diagnostic', text: 'Quatre traceurs principaux, chacun ciblant une « prise » différente (§A4). Leurs performances dépendent du **génotype et du siège** — d’où un **algorithme personnalisé**.[4,5]\n\n| Traceur | Sensibilité (par lésion) | Forces | Limites |\n|---|---|---|---|\n| **⁶⁸Ga-DOTATATE** (TEP) | **~93 %**[8,9] | Meilleure globalement ; SDHx, tête & cou, métastatique ; base de la PRRT | Disponibilité ; fixations SSTR physiologiques |\n| **¹⁸F-FDOPA** (TEP) | ~80 %[8] | Phéo non-SDHx (~94 %), spécifique | Médiocre dans SDHx ; PGL sympathique ~70 % |\n| **¹⁸F-FDG** (TEP) | ~74 %[8] | SDHB (par région ~97 %) ; révèle des lésions MIBG-négatives | Peu spécifique ; graisse brune |\n| **¹²³I-MIBG** (TEMP) | ~38 %[8] | Indispensable pour sélectionner la thérapie ¹³¹I-MIBG | Faible Se ; médiocre tête & cou (10–42 %) |\n\n**Algorithme par génotype (EANM/SNMMI 2019)** : phéo sporadique → **¹⁸F-FDOPA** en 1ʳᵉ intention (ou ¹²³I-MIBG si indisponible) ; PGL sympathique ou tête & cou → **⁶⁸Ga-DOTATATE** ; maladie métastatique surtout SDHx/SDHB → **DOTATATE d’abord, puis ¹⁸F-FDG** (préféré à la FDOPA dans SDHB), la MIBG restant le 3ᵉ choix et l’outil de sélection théranostique.[4]' },
        { title: 'B9 · Diagnostics différentiels', text: '| Contexte | Différentiel | Ce qui distingue |\n|---|---|---|\n| **Clinique** | HTA essentielle, trouble anxieux, hyperthyroïdie, syndrome carcinoïde | **Métanéphrines normales** ; contexte |\n| **Masse surrénalienne** | Adénome (riche en lipides, wash-out), corticosurrénalome, métastase | Densité TDM, wash-out, IRM en opposition de phase |\n| **Imagerie fonctionnelle** | Autre TNE SSTR⁺, captation surrénalienne physiologique | Profil sécrétoire, topographie, génotype |\n| **FDG** | Graisse brune, foyers inflammatoires | Topographie symétrique, déclenchée par le froid |',
          infoBox: { type: 'warning', title: 'Piège', text: 'En contexte héréditaire (SDHx), des lésions multifocales peuvent être des **tumeurs primitives synchrones** plutôt que des métastases : l’OMS rappelle qu’une localisation inhabituelle (poumon, foie) n’est pas, à elle seule, la preuve d’une dissémination.[1]' } },

        // ───────── MOUVEMENT C — STADIFIER ─────────
        { title: 'C10 · Bilan d’extension (rôle pivot de la MN)', text: 'En cas de risque métastatique (taille **> 5 cm**, siège extra-surrénalien, **SDHB**, 3-méthoxytyramine élevée), l’**imagerie fonctionnelle corps entier est pivot** : elle détecte des métastases osseuses et des lésions de petite taille des parties molles souvent **invisibles ou sous-estimées en TDM/IRM**.[4,5]',
          list: [
            'Sites métastatiques fréquents : **os, foie, poumon, ganglions**.',
            'Le **⁶⁸Ga-DOTATATE** est le plus sensible pour la cartographie métastatique ; le **FDG** complète dans les tumeurs SDHB dédifférenciées.[8,9]',
            'Le bilan conditionne directement la stratégie : résécabilité, indication de radiothérapie interne, surveillance.',
          ] },
        { title: 'C11 · Stadification & scores', text: 'Il existe une **stadification TNM (AJCC 8ᵉ éd.)** pour le phéo et les PGL sympathiques. L’OMS 2022 n’endosse pas les scores histopronostiques (PASS, GAPP, COPPS) — toute lésion étant néoplasique — sans en décourager l’usage.[1,6]\n\n| Repères AJCC 8ᵉ éd. | |\n|---|---|\n| **T** | T1 < 5 cm · T2 ≥ 5 cm (phéo) ou PGL sympathique fonctionnel · T3 envahissement des tissus voisins |\n| **N / M** | N1 ganglions régionaux · M1 métastases à distance (os / foie-poumon / autres) |\n| **Stade** | I–II selon T ; III si N1 ou T3 ; IV si M1 |\n| **Limite** | valeur pronostique imparfaite — le **génotype** reste déterminant |\n\nEn imagerie, on ne « score » pas le phéo comme un lymphome : on **cartographie l’extension** et on **caractérise la cible** (avidité SSTR/MIBG/FDG), information directement utile au traitement.[4]' },
        { title: 'C12 · Facteurs pronostiques & stratification du risque', text: '| Facteur | Sens |\n|---|---|\n| **Mutation SDHB** | Risque métastatique et mortalité spécifique les plus élevés |\n| Taille > 5 cm · siège extra-surrénalien | Risque métastatique accru |\n| **3-méthoxytyramine élevée** | Phénotype dopaminergique / métastatique |\n| Avidité **FDG élevée** + perte d’avidité MIBG | Dédifférenciation, biomarqueur d’agressivité |\n| Ki-67 élevé · invasion locale | Lésions plus agressives (hors score formel) |',
          infoBox: { type: 'info', title: 'Point expert', text: 'Les **biomarqueurs d’imagerie** (intensité FDG, expression SSTR) complètent les facteurs cliniques/génétiques : un profil **très FDG-avide et peu MIBG-avide** signe une tumeur dédifférenciée, à surveiller étroitement et candidate préférentielle à la **PRRT au ¹⁷⁷Lu-DOTATATE** plutôt qu’au ¹³¹I-MIBG.[5]' } },

        // ───────── MOUVEMENT D — TRAITER & SUIVRE ─────────
        { title: 'D13 · Stratégie thérapeutique générale', text: 'La **chirurgie** est le seul traitement curatif de la maladie localisée, après **alpha-blocage (puis bêta-blocage)** et expansion volémique. En situation métastatique, aucune option n’est curative : prise en charge **multidisciplinaire et individualisée** selon la cinétique, le génotype et le phénotype d’imagerie.[3,5]',
          list: [
            '**Radiothérapie interne** (cœur de la médecine nucléaire — §D14).',
            'Chimiothérapie : protocole **CVD** (cyclophosphamide–vincristine–dacarbazine) ; **témozolomide** oral, actif dans les tumeurs SDHB (méthylation de MGMT).[5]',
            'Thérapies ciblées : inhibiteurs de tyrosine kinase (sunitinib, cabozantinib) ; **belzutifan** (inhibiteur de HIF-2α, FDA mai 2025), surtout cluster 1.[12]',
            'Traitements locaux : métastasectomie, radiothérapie externe, radiofréquence, embolisation.',
          ] },
        { title: 'D14 · Médecine nucléaire thérapeutique & théranostique', text: 'Le phéochromocytome est un **modèle de théranostique** : on **image la cible**, on **sélectionne** les patients dont les lésions l’expriment, on **traite** avec le radionucléide apparié, puis on **réévalue**. Deux couples coexistent — le choix dépend du **phénotype d’avidité** et du niveau de catécholamines.[4,10,11]\n\n| Couple | Sélection (diagnostic) | Traitement | Statut / points clés |\n|---|---|---|---|\n| **¹²³I → ¹³¹I-MIBG** | Positivité ¹²³I-MIBG | ¹³¹I-MIBG (iobenguane I-131) | Azedra (haute activité spécifique) approuvé FDA 2018 (≥ 12 ans, scan-positif) ; production arrêtée 2024 ; ¹³¹I-MIBG « carrier-added » encore utilisé.[10] |\n| **⁶⁸Ga → ¹⁷⁷Lu-DOTATATE** | Avidité SSTR2 (Ga-DOTATATE) | ¹⁷⁷Lu-DOTATATE (PRRT) | Contrôle de la maladie chez ~80 % ; réponse meilleure si SUVmax élevé ; alternative/complément au MIBG.[11] |',
          figure: { svg: THERANOSTIC_LOOP, alt: 'Boucle théranostique : imager la cible (DOTATATE/¹²³I-MIBG) → sélectionner (avidité SSTR2/NET) → traiter (¹⁷⁷Lu-DOTATATE/¹³¹I-MIBG) → réévaluer (réponse + dosimétrie).', caption: 'Fig. 3 — La boucle théranostique : on traite ce que l’on voit.' },
          infoBox: { type: 'warning', title: 'Précaution', text: 'Risque de **crise hypertensive** : la lyse tumorale sous radiothérapie interne peut libérer des catécholamines. Une **préparation par alpha-blocage** est requise. À très fort taux de catécholamines, le ¹³¹I-MIBG peut être préféré au ¹⁷⁷Lu-DOTATATE (moindre risque de relargage rapporté, données limitées).[5]' } },
        { title: 'D15 · Évaluation de la réponse', list: [
          '**Morphologique** : RECIST 1.1 sur TDM/IRM (souvent stabilisation plutôt que régression).',
          '**Fonctionnelle** : ré-imagerie avec le **même traceur** (SSTR, MIBG ou FDG) — comparaison de l’extension et de l’intensité.',
          '**Biochimique** : décroissance des métanéphrines (en pratique, normétanéphrine plasmatique).',
          'Un **SUVmax initial élevé en Ga-DOTATATE** prédit une meilleure réponse à la PRRT.[11]',
        ] },
        { title: 'D16 · Suivi & détection de récidive', text: 'La surveillance est **prolongée, voire à vie**, surtout dans les formes héréditaires et **SDHB** (récidives possibles des années après la chirurgie).[1,5]',
          list: [
            '**Biochimie** (métanéphrines) à intervalles réguliers : une ré-ascension déclenche une imagerie fonctionnelle.',
            'Imagerie fonctionnelle **ciblée selon le génotype** pour localiser la récidive ou de nouvelles localisations.',
            'Dépistage familial et suivi des **porteurs asymptomatiques** de mutation.',
          ] },
        { title: 'D17 · Pièges & situations particulières', text: 'Écueils propres au phéochromocytome et au contexte traité (cf. aussi la biodistribution normale de la MIBG, à connaître).',
          figure: { svg: MIBG_BIODISTRIB, alt: 'Biodistribution physiologique de la ¹²³I-MIBG : salivaires, myocarde, foie, rate, digestif, vessie.', caption: 'Fig. 4 — Fixations physiologiques de la MIBG à ne pas prendre pour des métastases.' },
          infoBoxes: [
            { type: 'warning', title: 'Piège — Graisse brune (TEP-FDG)', text: 'Captation symétrique cervico-thoracique, déclenchée par le froid — à ne pas confondre avec des métastases. Réchauffer le patient limite ce piège.' },
            { type: 'warning', title: 'Piège — Fixations physiologiques & interférences (MIBG)', text: 'Myocarde, glandes salivaires, foie, intestin, vessie ; interférences médicamenteuses (tricycliques, labétalol, sympathomimétiques) → arrêt requis et blocage thyroïdien systématique avant scintigraphie.' },
            { type: 'warning', title: 'Piège — Multifocalité héréditaire vs métastases', text: 'En contexte SDHx, plusieurs foyers peuvent être primitifs et synchrones — l’interprétation doit intégrer le génotype.[1]' },
            { type: 'warning', title: 'Précaution — Sous radiothérapie interne', text: 'Surveiller le relargage de catécholamines (crise hypertensive) ; un **flare osseux transitoire** peut simuler une progression précoce.' },
          ] },

        // ───────── MOUVEMENT E — ANCRER & ÉVALUER ─────────
        { title: 'E18 · Algorithme décisionnel global', text: 'De la suspicion au suivi, la médecine nucléaire intervient à **chaque étape clé** : caractérisation, bilan d’extension, sélection théranostique, évaluation de la réponse et détection de récidive.\n\n*Parcours* : suspicion → **métanéphrines** → TDM/IRM → **imagerie fonctionnelle (par génotype)** → chirurgie ou, si métastatique, **sélection théranostique** → traitement → réévaluation → suivi.' },
        { title: 'E19 · Cas cliniques commentés', steps: [
          { title: 'Cas 1 — Phéochromocytome sporadique de la surrénale droite', text: '*Contexte* : femme 45 ans, HTA paroxystique, triade céphalées–sueurs–palpitations ; métanéphrines plasmatiques très élevées (profil adrénergique). *Images* : TDM masse surrénalienne droite 4 cm ; **¹⁸F-FDOPA** fixation intense unique, sans autre foyer. *Analyse* : profil adrénergique + FDOPA mono-focale → tumeur **cluster-2-like, non métastatique** ; test génétique à prévoir. *Conclusion* : surrénalectomie après alpha- puis bêta-blocage ; guérison ; surveillance biochimique.' },
          { title: 'Cas 2 — Paragangliome SDHB métastatique', text: '*Contexte* : homme 23 ans, antécédent de phéo opéré à 10 ans, **mutation SDHB** ; normétanéphrine et 3-méthoxytyramine élevées. *Images* : **⁶⁸Ga-DOTATATE** multiples foyers osseux/hépatiques/ganglionnaires ; **FDG** concordant ; FDOPA et MIBG sous-estiment l’extension. *Analyse* : phénotype SDHx typique (forte avidité SSTR et FDG, faible MIBG), maladie métastatique étendue. *Conclusion* : sélection pour **¹⁷⁷Lu-DOTATATE** (forte avidité SSTR) ; RCP ; alpha-blocage préalable.' },
          { title: 'Cas 3 — NEM2, phéochromocytomes bilatéraux', text: '*Contexte* : patiente 32 ans, **mutation RET (NEM2)**, dépistage ; asymptomatique, métanéphrines modérément élevées. *Images* : IRM nodules surrénaliens bilatéraux ; **¹²³I-MIBG / FDOPA** fixation bilatérale, pas de localisation à distance. *Analyse* : phéo bilatéral du cluster 2, faible risque métastatique, typique de la NEM2. *Conclusion* : chirurgie épargnant le cortex si possible ; surveillance du carcinome médullaire thyroïdien associé.' },
        ] },
        { title: 'E20 · Points clés / à retenir', list: [
          'OMS 2022 : phéo = **paragangliome intra-surrénalien** ; plus de « bénin/malin », potentiel métastatique pour toute lésion.',
          'Diagnostic : **métanéphrines d’abord**, localisation ensuite ; **test génétique pour tous**.',
          'Quatre cibles imageables : **NET (MIBG) · catécholamines (FDOPA) · SSTR2 (DOTATATE) · glycolyse (FDG)** — le génotype choisit.',
          'Sensibilité globale : **DOTATATE ~93 % > FDOPA ~80 % > FDG ~74 % > MIBG ~38 %** ; FDG domine dans SDHB.',
          'Théranostique : **¹²³I→¹³¹I-MIBG** et **⁶⁸Ga→¹⁷⁷Lu-DOTATATE** ; **alpha-blocage** avant traitement (risque de crise).',
          'SDHB = risque métastatique le plus élevé ; Azedra approuvé 2018 (production arrêtée 2024) ; belzutifan approuvé 2025.',
        ] },
        { title: 'E21 · FAQ & pièges d’examen', text: '**Quel traceur en 1ʳᵉ intention ?** Selon le contexte : **FDOPA** pour le phéo sporadique, **DOTATATE** pour le PGL et la maladie SDHx/métastatique.[4]\n\n**Pourquoi le FDG dans SDHB ?** Pseudohypoxie + interaction succinate-stroma → forte avidité FDG, alors que l’avidité MIBG s’effondre.[7]\n\n**MIBG a une faible sensibilité, pourquoi la garder ?** Pour **sélectionner la thérapie ¹³¹I-MIBG** : seule une tumeur ¹³¹I-MIBG-positive en bénéficiera.\n\n**Adrénergique vs noradrénergique ?** Métanéphrine (adrénaline) → cluster 2 ; normétanéphrine → cluster 1 ; 3-méthoxytyramine → SDHx / risque métastatique.[13]\n\n**Bloque-t-on avant la chirurgie ?** Oui : **alpha-bloquant puis bêta-bloquant**, jamais l’inverse.' },
        { title: 'E24 · Références & liens', text: 'Bibliographie complète et datée en bas de page (**Sources & Références**, 14 réfs). **Carte de liens (la « carte »)** — la cible biologique vue côté maladie, symétrique de l’article *Scintigraphie à la MIBG* (vue côté examen) : Examens (Ga-DOTATATE, ¹⁸F-FDOPA, ¹⁸F-FDG, MIBG) · Traceurs / théranostique (¹³¹I-MIBG, ¹⁷⁷Lu-DOTATATE) · Différentiel (adénome surrénalien, corticosurrénalome) · Variante (paragangliome extra-surrénalien). *Valeurs locales à adapter par centre. Dernière mise à jour : juin 2026 — profil médecin nucléaire.*' },
      ],
    },
  },
};
