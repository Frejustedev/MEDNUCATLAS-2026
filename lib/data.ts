export type Category = 'all' | 'dashboard' | 'favorites' | 'index' | 'generalites' | 'bases_physiques' | 'radiobiologie' | 'reglementation' | 'endocrinologie' | 'oncologie' | 'cardiologie' | 'neurologie' | 'nephro_urologie' | 'pneumologie' | 'gastro_enterologie' | 'senologie_gynecologie' | 'infection_inflammation' | 'pediatrie' | 'theranostique_thyroide' | 'tne' | 'prostate' | 'rhumatologie' | 'sirt' | 'radiopharmacie' | 'instrumentation' | 'radioprotection' | 'scores' | 'calculateurs' | 'artefacts' | 'preparation' | 'guidelines' | 'about' | 'contact' | 'annuaire';

export type UserProfile = 'patient' | 'medecin_non_nuc' | 'medecin_nuc' | 'admin';

export const getAllowedAudiences = (profile: string): UserProfile[] => {
  if (profile === 'admin' || profile === 'medecin_nuc') return ['patient', 'medecin_non_nuc', 'medecin_nuc'];
  if (profile === 'medecin_non_nuc') return ['patient', 'medecin_non_nuc'];
  return ['patient'];
};

export const MENU_STRUCTURE = [
  {
    title: "🏠 ESPACE PERSONNEL",
    items: [
      { id: 'dashboard', label: 'Tableau de bord' },
      { id: 'favorites', label: 'Mes Favoris' },
    ]
  },
  {
    title: "📚 FONDAMENTAUX",
    items: [
      { id: 'generalites', label: 'Généralités' },
      { id: 'bases_physiques', label: 'Bases Physiques' },
      { id: 'radiobiologie', label: 'Radiobiologie' },
      { id: 'radioprotection', label: 'Radioprotection' },
      { id: 'reglementation', label: 'Réglementation' },
    ]
  },
  {
    title: "🔍 DIAGNOSTIC (Organes)",
    items: [
      { id: 'endocrinologie', label: 'Endocrinologie' },
      { id: 'oncologie', label: 'Oncologie' },
      { id: 'cardiologie', label: 'Cardiologie' },
      { id: 'neurologie', label: 'Neurologie' },
      { id: 'nephro_urologie', label: 'Néphro-Urologie' },
      { id: 'pneumologie', label: 'Pneumologie' },
      { id: 'gastro_enterologie', label: 'Gastro-entérologie' },
      { id: 'senologie_gynecologie', label: 'Sénologie & Gynéco.' },
      { id: 'infection_inflammation', label: 'Infection & Inflammation' },
      { id: 'pediatrie', label: 'Pédiatrie' },
    ]
  },
  {
    title: "☢️ THÉRANOSTIQUE & RIV",
    items: [
      { id: 'theranostique_thyroide', label: 'Pathologies Thyroïdiennes' },
      { id: 'tne', label: 'Tumeurs Neuroendocrines' },
      { id: 'prostate', label: 'Cancer de la Prostate' },
      { id: 'rhumatologie', label: 'Rhumatologie & Os' },
      { id: 'sirt', label: 'Radioembolisation (SIRT)' },
    ]
  },
  {
    title: "🔬 PLATEAU TECHNIQUE",
    targetAudience: ['medecin_nuc'],
    items: [
      { id: 'radiopharmacie', label: 'Radiopharmacie', targetAudience: ['medecin_nuc'] },
      { id: 'instrumentation', label: 'Instrumentation', targetAudience: ['medecin_nuc'] },
    ]
  },
  {
    title: "🛠️ OUTILS DÉCISIONNELS",
    items: [
      { id: 'scores', label: 'Scores & Classifications', targetAudience: ['medecin_nuc', 'medecin_non_nuc'] },
      { id: 'calculateurs', label: 'Calculateurs', targetAudience: ['medecin_nuc', 'medecin_non_nuc'] },
      { id: 'artefacts', label: 'Atlas des Artefacts', targetAudience: ['medecin_nuc'] },
      { id: 'preparation', label: 'Préparation Patient' },
      { id: 'guidelines', label: 'Guidelines (EANM/SNMMI)', targetAudience: ['medecin_nuc', 'medecin_non_nuc'] },
    ]
  },
  {
    title: "ℹ️ INFORMATIONS",
    items: [
      { id: 'about', label: 'À propos' },
      { id: 'annuaire', label: 'Annuaire des Médecins' },
      { id: 'contact', label: 'Nous contacter' },
    ]
  }
];

export type ArticleMode = 'patient' | 'medecin_non_nuc' | 'medecin_nuc';

export interface Section {
  title: string;
  text?: string;
  list?: string[];
  infoBox?: {
    type: 'info' | 'warning' | 'tip';
    title: string;
    text: string;
  };
  stats?: {
    value: string;
    label: string;
  }[];
  steps?: {
    title: string;
    text: string;
  }[];
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ContentMode {
  sections: Section[];
  table?: TableData;
}

export interface ArticleContent {
  lead: string;
  medecin_non_nuc: ContentMode;
  medecin_nuc: ContentMode;
  patient: ContentMode;
}

export interface Article {
  id: string;
  cat: Category;
  catLabel: string;
  title: string;
  tags: string[];
  difficulty: 'fondamental' | 'intermédiaire' | 'avancé';
  excerpt: string;
  targetAudience?: UserProfile[];
  authors?: string[];
  sources?: { title: string; url?: string }[];
  content: ArticleContent;
}

export const ENTRIES: Article[] = [
  {
    id: 'MN000_GEN',
    cat: 'generalites',
    catLabel: 'Généralités',
    title: 'Introduction à la Médecine Nucléaire',
    tags: ['Bases', 'Traceurs', 'Imagerie', 'Théranostique'],
    difficulty: 'fondamental',
    excerpt: "Principes de base de l'imagerie fonctionnelle et moléculaire, de la TEMP à la TEP, et introduction à la théranostique.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Société Française de Médecine Nucléaire (SFMN)', url: 'https://www.sfmn.org' },
      { title: 'European Association of Nuclear Medicine (EANM)', url: 'https://www.eanm.org' }
    ],
    content: {
      lead: "La médecine nucléaire est une spécialité médicale d'imagerie fonctionnelle et moléculaire, ainsi que de thérapie ciblée, reposant sur l'administration de radiopharmaceutiques.",
      patient: {
        sections: [
          {
            title: "La médecine nucléaire, qu'est-ce que c'est ?",
            text: "Contrairement à la radiologie classique (comme les radios ou les scanners) qui photographie l'anatomie de vos organes (leur forme), la médecine nucléaire photographie leur fonctionnement. Pour cela, nous utilisons de très petites quantités de médicaments légèrement radioactifs, appelés « traceurs »."
          },
          {
            title: "Comment ça marche ?",
            text: "Le principe est simple :",
            list: [
              "L'administration : On vous injecte (ou vous fait avaler/respirer) le traceur. Ce produit est conçu pour aller se fixer spécifiquement sur l'organe que l'on souhaite étudier (les os, le cœur, la thyroïde...).",
              "L'attente : Il faut souvent patienter un peu pour que le produit atteigne sa cible.",
              "Les images : Vous passez sous une caméra spéciale (caméra gamma ou TEP). Cette machine ne vous envoie aucun rayon ! Elle se contente de capter les signaux émis par le traceur à l'intérieur de votre corps pour créer une image."
            ]
          },
          {
            title: "Est-ce dangereux ?",
            text: "C'est une question très fréquente, mais rassurez-vous : la médecine nucléaire est très sûre.",
            list: [
              "Dose minime : La quantité de radioactivité est extrêmement faible, souvent comparable à ce que vous recevez naturellement en vivant sur Terre pendant quelques mois.",
              "Élimination rapide : Le produit perd rapidement sa radioactivité et s'élimine naturellement (par les urines) en quelques heures ou jours.",
              "Pas d'allergie : Les produits utilisés ne rendent pas malade, ne font pas dormir et les allergies sont exceptionnelles (il n'y a pas d'iode comme dans les scanners classiques)."
            ],
            infoBox: {
              type: "info",
              title: "Grossesse et allaitement",
              text: "Par précaution, ces examens sont généralement évités chez la femme enceinte. Si vous êtes enceinte, pensez à l'être, ou si vous allaitez, signalez-le impérativement lors de la prise de rendez-vous."
            }
          },
          {
            title: "La thérapie (Théranostique)",
            text: "La médecine nucléaire ne sert pas qu'à faire des diagnostics. Parfois, en utilisant un traceur un peu plus puissant, nous pouvons traiter directement certaines maladies (comme l'hyperthyroïdie ou certains cancers) en ciblant précisément les cellules malades tout en épargnant les cellules saines."
          }
        ]
      },
      medecin_non_nuc: {
        sections: [
          {
            title: "L'imagerie fonctionnelle et moléculaire",
            text: "La médecine nucléaire apporte une dimension fonctionnelle et métabolique à l'imagerie médicale. Là où la TDM ou l'IRM excellent dans la résolution spatiale et l'analyse morphologique, la médecine nucléaire (TEMP et TEP) détecte des anomalies biochimiques et physiologiques souvent bien avant l'apparition de modifications anatomiques."
          },
          {
            title: "Les deux grandes modalités diagnostiques",
            list: [
              "La TEMP (Tomographie par Émission Monophotonique) : Utilise des émetteurs gamma (principalement le Technétium-99m). Idéale pour l'exploration d'organes spécifiques (scintigraphie osseuse, myocardique, pulmonaire, rénale).",
              "La TEP (Tomographie par Émission de Positons) : Utilise des émetteurs de positons (principalement le Fluor-18). Offre une résolution spatiale et une sensibilité supérieures. C'est l'outil de référence en oncologie (TEP-FDG), mais aussi en neurologie et cardiologie."
            ]
          },
          {
            title: "Le concept de Théranostique",
            text: "C'est la contraction de « Thérapie » et « Diagnostic ». Le principe est d'utiliser le même vecteur moléculaire pour imager une cible (avec un isotope diagnostique comme le 68Ga ou le 18F) puis, si la cible est présente, de traiter la maladie en remplaçant l'isotope par un émetteur de particules destructrices (bêta- ou alpha, comme le 177Lu ou le 225Ac).",
            infoBox: {
              type: "tip",
              title: "L'adage de la théranostique",
              text: "« We see what we treat, and we treat what we see. » (Nous voyons ce que nous traitons, et nous traitons ce que nous voyons)."
            }
          },
          {
            title: "Sécurité et Radioprotection",
            text: "Les doses efficaces délivrées lors des examens diagnostiques sont faibles (généralement entre 1 et 10 mSv), comparables à celles de la radiologie conventionnelle ou de la tomodensitométrie. Le rapport bénéfice/risque est toujours largement en faveur de la réalisation de l'examen lorsqu'il est justifié."
          }
        ]
      },
      medecin_nuc: {
        sections: [
          {
            title: "1. Définition et Évolution Historique",
            text: "La médecine nucléaire est la spécialité médicale consacrée à l'utilisation des radionucléides non scellés à des fins diagnostiques (imagerie in vivo, biologie in vitro) et thérapeutiques (Radiothérapie Interne Vectorisée - RIV). Née des travaux de George de Hevesy (principe des indicateurs) et de la découverte de la radioactivité artificielle par Irène et Frédéric Joliot-Curie, elle a évolué de la cartographie planaire (caméra Anger) vers l'imagerie tomographique hybride (TEMP/TDM, TEP/TDM, TEP/IRM)."
          },
          {
            title: "2. Principes Fondamentaux de l'Imagerie Moléculaire",
            text: "L'imagerie repose sur l'administration d'un radiopharmaceutique (traceur), composé d'un vecteur (déterminant la biodistribution et la cible biologique) et d'un marqueur radioactif (déterminant les propriétés physiques de détection).",
            list: [
              "Sensibilité extrême : Détection de concentrations molaires de l'ordre du picomolaire (10⁻¹² M), permettant d'étudier des processus physiologiques sans les perturber (principe de tracerie).",
              "Spécificité : Dépend du vecteur (anticorps, peptide, analogue métabolique) ciblant des récepteurs, des transporteurs ou des voies enzymatiques spécifiques."
            ]
          },
          {
            title: "3. Instrumentation et Innovations Technologiques",
            text: "L'évolution technologique majeure de la dernière décennie est la transition de l'analogique vers le numérique :",
            list: [
              "TEMP (SPECT) : Remplacement progressif des cristaux scintillateurs couplés aux photomultiplicateurs (PMT) par des détecteurs semi-conducteurs CZT (Tellurure de Cadmium-Zinc). Avantages : conversion directe, meilleure résolution énergétique et spatiale, design compact (caméras dédiées cardiologie).",
              "TEP (PET) : Remplacement des PMT par des photomultiplicateurs en silicium (SiPM) couplés à des cristaux LSO/LYSO. Avantages : excellente résolution temporelle permettant un Temps de Vol (Time-Of-Flight - TOF) très précis (< 300 ps), améliorant drastiquement le rapport signal/bruit."
            ]
          },
          {
            title: "4. Le Paradigme Théranostique",
            text: "La théranostique représente l'apogée de la médecine de précision en médecine nucléaire. Elle repose sur des paires d'isotopes (ex: ⁶⁸Ga/¹⁷⁷Lu pour les récepteurs de la somatostatine dans les TNE, ou pour le PSMA dans le cancer de la prostate). L'imagerie pré-thérapeutique permet de sélectionner les patients répondeurs, de réaliser une dosimétrie personnalisée, et l'imagerie post-thérapeutique (Bremsstrahlung ou émission gamma résiduelle) permet de vérifier le ciblage."
          },
          {
            title: "5. Radiopharmacie et Dosimétrie",
            text: "La manipulation des radiopharmaceutiques obéit à des règles strictes de radioprotection (ALARA) et de bonnes pratiques de préparation (BPPR). La dosimétrie interne (formalisme MIRD) devient un enjeu central, passant d'une approche empirique (activité fixe) à une approche personnalisée basée sur la dose absorbée à la tumeur et aux organes à risque (reins, moelle osseuse)."
          },
          {
            title: "6. Perspectives et Intelligence Artificielle",
            infoBox: {
              type: "tip",
              title: "L'avenir de la spécialité",
              text: "L'IA transforme la médecine nucléaire : réduction du temps d'acquisition et de la dose injectée (deep learning reconstruction), segmentation automatique des volumes tumoraux (MTV), radiomique (extraction de caractéristiques quantitatives invisibles à l'œil nu pour prédire la réponse thérapeutique), et aide au diagnostic."
            }
          }
        ]
      }
    }
  },




  {
    id:'ANN001', cat:'annuaire', catLabel:'Annuaire des Médecins',
    title:'Annuaire National des Médecins Nucléaires',
    tags:['Annuaire','Contacts','Centres'],
    difficulty:'fondamental',
    excerpt:'Retrouvez les coordonnées des médecins nucléaires et des centres de médecine nucléaire.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Conseil National de l\'Ordre des Médecins', url: 'https://www.conseil-national.medecin.fr' }
    ],
    content:{
      lead:'Cet annuaire vous permet de trouver un médecin nucléaire ou un centre de médecine nucléaire près de chez vous pour vos examens ou traitements.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Recherche de confrères', text:'Accédez à la base de données nationale pour trouver les coordonnées de vos confrères, classés par région, par centre ou par sur-spécialité (théranostique, cardiologie, etc.).'},
          {title:'Centres TEP et Gamma-caméras', list:['Liste des centres équipés en TEP-TDM','Liste des centres équipés en caméras CZT','Centres agréés pour les thérapies vectorisées (RIV)']}
        ]
      },
      patient:{
        sections:[
          {title:'Trouver un centre', text:'Vous devez passer un examen de médecine nucléaire (scintigraphie, TEP-scan) ? Utilisez notre annuaire pour trouver le centre le plus proche de chez vous.'},
          {title:'Prendre rendez-vous', text:'La plupart des centres nécessitent une ordonnance de votre médecin traitant ou de votre spécialiste pour prendre rendez-vous. N\'oubliez pas de vous en munir lors de votre appel.'}
        ]
      }
    }
  },
  {
    id:'MN001', cat:'endocrinologie', catLabel:'Endocrinologie',
    title:"Scintigraphie thyroïdienne à l'iode",
    tags:['¹³¹I','¹²³I','Protocole','Diagnostic'],
    difficulty:'intermédiaire',
    excerpt:"Méthode de référence pour l'exploration fonctionnelle du tissu thyroïdien et des métastases de carcinomes différenciés de la thyroïde.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Guidelines EANM pour la scintigraphie thyroïdienne', url: 'https://www.eanm.org/publications/guidelines/' },
      { title: 'Recommandations SFE (Société Française d\'Endocrinologie)', url: 'https://www.sfendocrino.org' }
    ],
    content:{
      lead:"La scintigraphie thyroïdienne à l'iode radioactif est l'examen de référence pour l'évaluation fonctionnelle de la glande thyroïde et la détection de tissu thyroïdien résiduel ou métastatique après thyroïdectomie totale.",
      medecin_non_nuc: { 
        sections: [
          {
            title: "Indications cliniques principales",
            text: "La scintigraphie thyroïdienne reste un examen central dans l'algorithme diagnostique des dysthyroïdies, bien qu'elle soit souvent précédée par l'échographie et la biologie.",
            list: [
              "Bilan étiologique d'une hyperthyroïdie (TSH basse) : diagnostic différentiel entre Maladie de Basedow, Nodule toxique, Goitre multinodulaire toxique et Thyroïdite.",
              "Évaluation d'un nodule thyroïdien : uniquement si la TSH est basse (recherche d'un nodule chaud, presque toujours bénin, dispensant de cytoponction).",
              "Bilan d'extension et suivi des carcinomes thyroïdiens différenciés (après thyroïdectomie totale et irathérapie).",
              "Recherche de tissu thyroïdien ectopique (struma ovarii, thyroïde linguale)."
            ]
          },
          {
            title: "Contre-indications et Précautions",
            infoBox: {
              type: "warning",
              title: "Surcharge iodée : l'ennemi de la scintigraphie",
              text: "Toute surcharge en iode sature les récepteurs thyroïdiens et empêche la fixation du traceur radioactif, rendant l'examen ininterprétable (examen 'blanc')."
            },
            list: [
              "Grossesse (contre-indication absolue).",
              "Allaitement (suspension nécessaire, durée variable selon l'isotope).",
              "Scanner avec injection de produit de contraste iodé récent (délai minimum de 4 à 6 semaines).",
              "Prise d'Amiodarone (Cordarone) : surcharge iodée massive pouvant durer de 3 à 6 mois après l'arrêt.",
              "Compléments alimentaires riches en iode ou algues."
            ]
          },
          {
            title: "Préparation du patient (à prescrire)",
            text: "Pour que l'examen soit contributif, la thyroïde doit être 'avide' d'iode et stimulée par la TSH.",
            steps: [
              { title: "Sevrage hormonal (si applicable)", text: "Arrêt de la Lévothyroxine (T4) pendant 4 semaines, ou de la Liothyronine (T3) pendant 2 semaines. Alternative : injections de rhTSH (Thyrogen) selon le protocole." },
              { title: "Arrêt des antithyroïdiens de synthèse (ATS)", text: "Arrêt du Néo-Mercazole, Thyrozol ou PTU 3 à 5 jours avant l'examen." },
              { title: "Régime pauvre en iode", text: "À suivre pendant les 10 à 15 jours précédant l'examen (éviter fruits de mer, sel iodé, poissons marins)." }
            ]
          },
          {
            title: "Interprétation simplifiée du compte-rendu",
            text: "Le compte-rendu de médecine nucléaire décrira la morphologie fonctionnelle et le taux de fixation (uptake).",
            list: [
              "Fixation homogène et diffuse, augmentée : typique de la Maladie de Basedow.",
              "Hyperfixation focale avec extinction du reste de la glande : Nodule toxique (adénome de Plummer).",
              "Fixation hétérogène en damier : Goitre multinodulaire toxique.",
              "Absence de fixation (glande 'blanche') : Thyroïdite subaiguë (de Quervain), thyroïdite du post-partum, ou surcharge iodée factice."
            ]
          }
        ]
      },
      medecin_nuc:{
        sections:[
          {
            title: "Choix du Radiopharmaceutique", 
            text: "Le choix dépend de l'indication clinique (bénin vs malin) et de la disponibilité.",
            list: [
              "Iode-123 (Na¹²³I) : Isotope de choix pour le diagnostic bénin. Émetteur gamma pur (159 keV), T½ = 13.2h. Excellente qualité d'image, dosimétrie favorable. Activité : 10 à 20 MBq.",
              "Iode-131 (Na¹³¹I) : Réservé au suivi du cancer thyroïdien (balayage corps entier) et à la thérapie. Émetteur bêta- et gamma (364 keV), T½ = 8 jours. Activité diagnostique : 74 à 185 MBq. Activité thérapeutique : 1.1 à 7.4 GBq.",
              "Technétium-99m (⁹⁹ᵐTc-pertechnétate) : Alternative pour l'imagerie bénigne. Capté par le NIS mais non organifié. T½ = 6h. Images précoces (20 min). Moins irradiant, moins cher, mais moins physiologique que l'iode."
            ]
          },
          {
            title: "Protocoles d'Acquisition", 
            steps: [
              { title: "Iode-123 (Bénin)", text: "Administration orale. Acquisition à H+2 ou H+4 (parfois H+24). Caméra gamma, collimateur sténopé (Pinhole) pour une haute résolution spatiale, ou LEHR avec zoom. Matrice 128x128 ou 256x256. 100k à 200k coups par image." },
              { title: "Iode-131 (Balayage Corps Entier - WBS)", text: "Acquisition tardive à J+2 ou J+3 (diagnostic) ou J+3 à J+7 (post-thérapie). Collimateur Haute Énergie (HE). Vitesse de balayage lente (ex: 10 cm/min). Couplage TEMP/TDM systématique sur les foyers suspects pour localisation anatomique précise." }
            ]
          },
          {
            title: "Dosimétrie et Radioprotection", 
            text: "L'iode-131 nécessite des précautions strictes en raison de son émission bêta- (irradiation des tissus) et gamma (irradiation externe).",
            stats: [
              { value: "~1.5 mSv", label: "Dose efficace (¹²³I, 15 MBq)" },
              { value: "~15 mSv", label: "Dose efficace (¹³¹I diag, 185 MBq)" },
              { value: "1-2 jours", label: "Éviction enfants/femmes enceintes (¹³¹I diag)" }
            ]
          },
          {
            title: "Pièges et Artefacts", 
            list: [
              "Stunning effect (sidération) : L'utilisation d'une dose diagnostique d'¹³¹I peut réduire la fixation de la dose thérapeutique subséquente. Préférer l'¹²³I pour la dosimétrie pré-thérapeutique.",
              "Fixations physiologiques (WBS) : Glandes salivaires, muqueuse gastrique, vessie, intestin, foie (métabolisme des hormones thyroïdiennes), thymus (parfois).",
              "Faux positifs (WBS) : Kystes pleuro-péricardiques, aspergillome, tératome, inflammation locale."
            ]
          }
        ],
        table:{
          headers:['Isotope','T½','Émission principale','Énergie','Usage principal'], 
          rows:[
            ['¹²³I','13.2h','Gamma (γ)','159 keV','Diagnostic (Bénin)'],
            ['¹³¹I','8.02j','Bêta (β-) et Gamma (γ)','364 keV (γ)','Thérapie & WBS Cancer'],
            ['⁹⁹ᵐTc','6.02h','Gamma (γ)','140 keV','Alternative diagnostique']
          ]
        }
      },
      patient:{
        sections:[
          {
            title: "Comprendre votre examen", 
            text: "La scintigraphie thyroïdienne est un examen d'imagerie qui permet de voir comment fonctionne votre thyroïde (une petite glande en forme de papillon située à la base de votre cou). Contrairement à une échographie qui montre la 'forme' de la glande, la scintigraphie montre son 'activité'.",
            infoBox: {
              type: "info",
              title: "Pourquoi utilise-t-on de l'iode ?",
              text: "La thyroïde est le seul organe du corps qui se nourrit d'iode pour fabriquer ses hormones. En vous donnant une infime quantité d'iode très légèrement radioactif, on peut suivre son trajet et voir exactement quelles parties de votre thyroïde travaillent trop, ou pas assez."
            }
          },
          {
            title: "Pourquoi votre médecin a-t-il prescrit cet examen ?", 
            list: [
              "Pour comprendre la cause d'une hyperthyroïdie (quand la thyroïde travaille trop).",
              "Pour analyser un nodule (une petite boule) découvert à l'échographie ou à la palpation.",
              "Pour vérifier s'il reste des cellules thyroïdiennes après une opération chirurgicale de la thyroïde.",
              "Pour préparer un traitement à l'iode radioactif."
            ]
          },
          {
            title: "Comment bien vous préparer ?", 
            text: "La préparation est l'étape la plus importante pour la réussite de cet examen. Si votre thyroïde est déjà 'pleine' d'iode provenant de votre alimentation ou de médicaments, elle n'absorbera pas le produit de l'examen.",
            steps: [
              { title: "Médicaments pour la thyroïde", text: "Si vous prenez du Lévothyrox, du Néo-Mercazole ou un médicament similaire, votre médecin vous demandera probablement de l'arrêter plusieurs jours ou semaines avant l'examen. Suivez ses instructions à la lettre." },
              { title: "Régime sans iode", text: "Pendant les 10 à 15 jours avant l'examen, évitez les aliments riches en iode : poissons de mer, fruits de mer, algues, sel enrichi en iode, et certains compléments alimentaires." },
              { title: "Examens récents", text: "Si vous avez passé un scanner avec injection de produit de contraste (qui contient beaucoup d'iode) dans le mois précédent, signalez-le impérativement lors de la prise de rendez-vous." }
            ]
          },
          {
            title: "Le déroulement le jour J", 
            steps: [
              { title: "L'administration", text: "À votre arrivée, on vous fera avaler une petite gélule (ou boire un liquide) contenant l'iode radioactif. Cela n'a pas de goût et ne rend pas malade." },
              { title: "L'attente", text: "Il faut laisser le temps à votre thyroïde d'absorber l'iode. Vous devrez patienter entre 2 heures et 24 heures selon le type d'iode utilisé. Vous pourrez généralement rentrer chez vous ou aller travailler pendant cette attente." },
              { title: "Les images", text: "Vous reviendrez dans le service. Vous serez allongé(e) sur le dos, la tête légèrement en arrière. La caméra s'approchera très près de votre cou sans vous toucher. L'enregistrement dure environ 15 à 20 minutes. Il faut rester immobile." }
            ]
          },
          {
            title: "Est-ce dangereux ? (Radioprotection)", 
            text: "La quantité de radioactivité utilisée pour le diagnostic est extrêmement faible. Il n'y a pas d'effets secondaires (pas de chute de cheveux, pas de nausées, pas d'allergie à l'iode radioactif).",
            list: [
              "Grossesse et allaitement : L'examen est strictement interdit si vous êtes enceinte. Si vous allaitez, il faudra suspendre l'allaitement pendant une période que le médecin vous précisera.",
              "Après l'examen : L'iode s'élimine naturellement par les urines. On vous conseillera de boire beaucoup d'eau. Par précaution, on vous demandera d'éviter les contacts très proches et prolongés avec les femmes enceintes et les jeunes enfants pendant 24 à 48 heures."
            ]
          }
        ]
      }
    }
  },

  {
    id:'MN003', cat:'cardiologie', catLabel:'Cardiologie',
    title:'Scintigraphie myocardique de perfusion',
    tags:['SPECT','Stress test','Tc-Sestamibi','Coronaire'],
    difficulty:'avancé',
    excerpt:"Évaluation de la perfusion coronarienne au repos et à l'effort. Sensibilité 87–89%, spécificité 73–85%.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'ASNC Guidelines for Nuclear Cardiology', url: 'https://www.asnc.org' },
      { title: 'ESC Guidelines on Chronic Coronary Syndromes', url: 'https://www.escardio.org' }
    ],
    content:{
      lead:"La scintigraphie myocardique de perfusion (SMP) est l'examen de médecine nucléaire le plus prescrit en cardiologie. Elle permet d'évaluer la viabilité myocardique et de détecter une ischémie coronarienne avec une excellente sensibilité.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Principes et traceurs', list:['Tc-99m Sestamibi (MIBI) : captation mitochondriale, redistribution nulle','Tc-99m Tetrofosmin : similaire au MIBI, clairance hépatique plus rapide','Tl-201 : analogue du potassium, redistribution tardive (viabilité)','Rb-82 / N-13-NH3 : TEP myocardique (gold standard)']},
          {title:'Protocoles stress-repos', list:['Protocole 1 jour : repos (300 MBq) → stress (900 MBq) à 3h','Protocole 2 jours : stress J1 (1000 MBq), repos J2 (1000 MBq)','Stress pharmacologique : adénosine, dipyridamole (IC: asthme, BAV)','Stress dobutamine : si CI aux vasodilatateurs','Couplage SPECT / TDM (atténuation + coronarographie)']},
          {title:"Critères d'interprétation", text:"La perfusion est évaluée en 17 segments selon le modèle ASE/ASNC. Le score de perfusion en somme (SSS, SRS, SDS) quantifie l'étendue et la sévérité de l'ischémie. Un SDS ≥ 10% prédit un bénéfice à la revascularisation. La FEVG est calculée en post-traitement (QGSPECT)."}
        ],
        table:{headers:['Paramètre','Seuil','Signification'], rows:[['SSS > 8','Défect modéré-sévère','Ischémie/nécrose étendue'],['SDS > 4','Différentiel repos/effort','Ischémie réversible'],['FEVG < 45%','Dysfonction VG','Haut risque'],['Dilatation ischémique transitoire',"VG + grand à l'effort",'Maladie tritronculaire']]}
      },
      patient:{
        sections:[
          {title:'Pourquoi cet examen ?', text:"La scintigraphie cardiaque permet de voir si votre cœur reçoit suffisamment de sang. On prend des images de votre cœur au repos et après un effort (ou après un médicament qui simule l'effort) pour comparer les deux."},
          {title:"Comment se déroule l'examen ?", list:['On vous injecte un produit traceur dans le bras','Vous faites un effort sur tapis roulant ou vélo (ou recevez un médicament)','Des images sont prises immédiatement et quelques heures plus tard',"L'examen dure au total 4 à 6 heures"]},
          {title:'Que voit-on sur les images ?', text:"Le médecin compare les images au repos et à l'effort. Si une zone du cœur reçoit moins de sang à l'effort qu'au repos, cela peut indiquer une artère coronaire rétrécie qui a besoin d'être traitée."}
        ]
      }
    }
  },
  {
    id: 'MN004',
    cat: 'oncologie',
    catLabel: 'Oncologie',
    title: 'TEP-TDM au ¹⁸F-FDG dans le cancer du poumon',
    tags: ['PET-CT', '¹⁸F-FDG', 'Oncologie', 'Poumon', 'Staging'],
    difficulty: 'avancé',
    excerpt: "La TEP-TDM au ¹⁸F-FDG est l'examen de référence pour le bilan d'extension, l'évaluation thérapeutique et la planification de radiothérapie des cancers broncho-pulmonaires.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: "EANM procedure guidelines for tumour imaging: version 3.0", url: "https://link.springer.com/article/10.1007/s00259-024-06684-x" },
      { title: "Joint EANM/SNMMI/ESTRO practice recommendations for the use of 2-[18F]FDG PET/CT external beam radiation treatment planning in lung cancer", url: "https://link.springer.com/article/10.1007/s00259-022-05720-y" },
      { title: "SNMMI Appropriate Use Criteria for Initial Staging of Non-Small Cell Lung Cancer (2025)", url: "#" }
    ],
    content: {
      lead: "La TEP-TDM au ¹⁸F-FDG est l'examen d'imagerie moléculaire de référence dans la prise en charge du cancer du poumon, combinant la précision anatomique du scanner à la cartographie métabolique tumorale pour un bilan d'extension et un suivi optimisés.",
      patient: {
        sections: [
          {
            title: "Introduction : Pourquoi cet examen pour moi ?",
            text: "Nous savons que le diagnostic de cancer du poumon est une épreuve difficile et source d'anxiété. Votre médecin vous a prescrit une TEP-TDM (ou Pet-scan) au FDG. Derrière ce nom complexe se cache un examen indolore et extrêmement utile. Pour faire simple : c'est une caméra très sensible couplée à un scanner, qui permet de voir exactement où les cellules de votre corps « mangent » du sucre. Comme les cellules cancéreuses sont très gourmandes en énergie, elles vont absorber ce sucre (le FDG) et devenir visibles sur nos écrans comme de petites ampoules allumées."
          },
          {
            title: "À quoi sert cet examen dans mon cancer du poumon ?",
            text: "Cet examen est une véritable boussole pour votre équipe médicale. Il a plusieurs rôles majeurs :",
            list: [
              "Faire un bilan complet : Il permet de vérifier en un seul examen l'ensemble de votre corps (des yeux jusqu'aux cuisses) pour s'assurer que la maladie est localisée au poumon ou si elle a touché des ganglions ou d'autres organes (métastases).",
              "Choisir le meilleur traitement : En connaissant l'étendue exacte de la maladie, vos médecins pourront décider si une chirurgie est possible, ou s'il vaut mieux privilégier une radiothérapie, une chimiothérapie ou une immunothérapie.",
              "Guider les rayons : Si vous devez avoir de la radiothérapie, la TEP aide le radiothérapeute à cibler précisément la tumeur tout en épargnant vos poumons sains.",
              "Vérifier l'efficacité des traitements : Après quelques mois, un nouveau Pet-scan permettra de voir si le traitement a bien fonctionné (les « ampoules » s'éteignent)."
            ],
            infoBox: {
              type: "tip",
              title: "Un bénéfice concret",
              text: "La TEP-TDM permet souvent d'éviter des opérations chirurgicales inutiles en détectant des éléments invisibles sur un scanner classique."
            }
          },
          {
            title: "Comment me préparer ? (Conseils pratiques)",
            text: "Pour que l'examen soit réussi, le sucre que nous allons vous injecter ne doit pas être en concurrence avec le sucre de votre alimentation. C'est pourquoi la préparation est stricte :",
            list: [
              "Être à jeun strict : Ne rien manger, ne rien boire (sauf de l'eau pure), ne pas mâcher de chewing-gum ni sucer de bonbon pendant les 6 heures précédant l'examen.",
              "Boire de l'eau : Il est très important de boire beaucoup d'eau plate avant et après l'examen pour bien vous hydrater et éliminer le produit.",
              "Pas de sport : Évitez toute activité physique intense (sport, jardinage, bricolage lourd) la veille et le jour de l'examen, pour que vos muscles soient au repos et n'absorbent pas le sucre."
            ],
            infoBox: {
              type: "warning",
              title: "Cas particulier : Si vous êtes diabétique",
              text: "Le diabète modifie le taux de sucre dans le sang. Lors de la prise de rendez-vous, signalez-le impérativement. Nous vous donnerons des consignes spécifiques pour vos médicaments (insuline, metformine) et l'heure de votre repas, afin que votre glycémie soit parfaite le jour J."
            }
          },
          {
            title: "Déroulement de l'examen : pas à pas",
            text: "L'examen se déroule en plusieurs étapes, dans une ambiance calme et bienveillante :",
            list: [
              "L'accueil : Un manipulateur vous installe dans un box individuel confortable et vérifie votre taux de sucre au bout du doigt.",
              "L'injection : On vous pose une petite perfusion dans le bras pour injecter le produit (le FDG). C'est totalement indolore et vous ne ressentirez aucun effet bizarre (pas de chaleur, pas de nausée).",
              "Le repos : Vous devrez rester allongé, au calme, sans lire ni parler ni regarder votre téléphone pendant environ 60 minutes. C'est le temps nécessaire pour que le produit se diffuse dans votre corps.",
              "Les images : Vous passerez ensuite sous la caméra (qui ressemble à un gros anneau, comme un scanner). L'appareil est très ouvert, vous ne serez pas enfermé. L'enregistrement dure environ 20 à 30 minutes. La machine fait un léger ronronnement, mais ce n'est pas bruyant comme une IRM."
            ]
          },
          {
            title: "Est-ce dangereux ? La radiation expliquée",
            text: "Le mot « nucléaire » peut faire peur, mais la dose de rayonnements que vous allez recevoir est très faible. Elle correspond à peu près à ce que l'on reçoit naturellement en vivant sur Terre pendant 2 à 3 ans, ou lors de quelques vols long-courriers en avion. Le produit s'élimine très vite (en quelques heures) par les urines.",
            infoBox: {
              type: "info",
              title: "Précautions après l'examen",
              text: "Par principe de précaution, nous vous demanderons d'éviter les contacts étroits et prolongés avec les femmes enceintes et les jeunes enfants (moins de 10 ans) pendant le reste de la journée."
            }
          },
          {
            title: "Que vont-ils voir sur les images ?",
            text: "Le médecin nucléaire va analyser une fusion de deux images : le scanner (qui montre l'anatomie de vos poumons) et la TEP (qui montre l'activité). Sur l'écran, les zones très actives (comme la tumeur) apparaîtront sous forme de taches lumineuses (souvent colorées en rouge ou jaune sur nos écrans). Cela permet de faire la différence entre une simple cicatrice (qui ne s'allume pas) et une tumeur active."
          },
          {
            title: "Après l'examen : résultats et suivi",
            text: "Vous pourrez repartir immédiatement après l'examen, conduire votre voiture et manger normalement. Le médecin nucléaire a besoin de temps pour analyser minutieusement les centaines d'images obtenues. Le compte-rendu détaillé sera envoyé directement au médecin (pneumologue ou oncologue) qui vous a prescrit l'examen. C'est lui qui vous expliquera les résultats lors de votre prochaine consultation, car il a une vision globale de votre dossier."
          },
          {
            title: "Conclusion",
            text: "La TEP-TDM est un allié précieux. C'est une technologie de pointe mise à votre service pour vous garantir le traitement le plus juste et le plus personnalisé possible. Toute notre équipe est là pour vous accompagner lors de cette étape."
          }
        ]
      },
      medecin_non_nuc: {
        sections: [
          {
            title: "Introduction et bases physiopathologiques",
            text: "La TEP-TDM au ¹⁸F-FDG repose sur l'hypermétabolisme glucidique des cellules tumorales (effet Warburg). Le FDG, un analogue du glucose, pénètre dans la cellule via les transporteurs GLUT (surexprimés dans le cancer du poumon) et est phosphorylé par l'hexokinase. Ne pouvant poursuivre la glycolyse, il reste piégé dans la cellule. La fusion avec la TDM low-dose ou diagnostique permet une localisation anatomique précise des foyers d'hypermétabolisme, offrant une sensibilité et une spécificité très supérieures à la TDM seule pour le staging ganglionnaire et métastatique."
          },
          {
            title: "Indications cliniques dans le cancer du poumon (CPNPC et CPC)",
            text: "La TEP-TDM est incontournable dans la prise en charge des cancers broncho-pulmonaires :",
            list: [
              "Staging initial (Bilan d'extension) : Indication de grade A. Selon les AUC SNMMI 2025, elle obtient un score de 9 (hautement approprié) pour les maladies potentiellement curables (stades I à III) afin d'éliminer une atteinte ganglionnaire médiastinale (N2/N3) ou des métastases à distance (M1) occultes. Pour les maladies d'emblée métastatiques (score 6), elle reste utile pour identifier le site de biopsie le plus accessible.",
              "Caractérisation du nodule pulmonaire solitaire (NPS) : Utile pour les nodules solides > 8 mm à risque intermédiaire de malignité.",
              "Planification de radiothérapie : Recommandée (EANM/SNMMI/ESTRO 2022) pour la délimitation précise du volume tumoral macroscopique (GTV), en différenciant la tumeur active de l'atélectasie ou de la pneumopathie obstructive.",
              "Évaluation de la réponse thérapeutique : En fin de traitement (chimiothérapie, radiothérapie, immunothérapie) pour évaluer la réponse métabolique complète, partielle ou la progression.",
              "Détection de récidive : Devant une symptomatologie clinique, une élévation des marqueurs ou une anomalie morphologique équivoque au scanner."
            ]
          },
          {
            title: "Quand prescrire et à quel moment ?",
            text: "Le timing de la prescription est crucial pour éviter les faux positifs liés à l'inflammation :",
            list: [
              "Post-Chimiothérapie : Attendre au moins 2 à 3 semaines après la dernière cure.",
              "Post-Radiothérapie : L'inflammation radique est intense. Il faut attendre au moins 12 semaines (idéalement 3 à 4 mois) après la fin de la RT pour évaluer la réponse.",
              "Post-Chirurgie : Attendre environ 6 semaines pour éviter la fixation cicatricielle.",
              "Post-Biopsie : Idéalement, la TEP doit être réalisée AVANT la biopsie. Si la biopsie a eu lieu, attendre au moins 1 à 2 semaines."
            ],
            infoBox: {
              type: "warning",
              title: "Contre-indications et Précautions",
              text: "Grossesse (sauf urgence absolue avec adaptation dosimétrique). L'hyperglycémie non contrôlée (> 2 g/L ou 11 mmol/L) est une contre-indication relative majeure car elle induit une compétition compétitive avec le FDG, diminuant la sensibilité de l'examen."
            }
          },
          {
            title: "Interprétation du compte-rendu : ce que le médecin nucléaire vous dit",
            text: "Le compte-rendu TEP utilise des paramètres semi-quantitatifs qu'il faut savoir interpréter :",
            list: [
              "SUVmax (Standardized Uptake Value) : Reflète l'intensité maximale de fixation. Un SUVmax élevé est souvent corrélé à l'agressivité tumorale (Ki-67 élevé) et a une valeur pronostique péjorative.",
              "MTV (Metabolic Tumor Volume) et TLG (Total Lesion Glycolysis) : Nouveaux biomarqueurs reflétant la charge tumorale globale, de plus en plus utilisés dans les essais cliniques.",
              "Critères PERCIST : Système standardisé d'évaluation de la réponse thérapeutique. Une diminution de 30% du SULpeak (SUV corrigé sur la masse maigre) signe une réponse métabolique partielle.",
              "iPERCIST / imPERCIST : Critères adaptés à l'immunothérapie pour gérer le phénomène de pseudo-progression (flare-up immunitaire)."
            ]
          },
          {
            title: "Impact sur la prise en charge multidisciplinaire",
            text: "La TEP-TDM modifie le stade de la maladie dans environ 30% des cas (le plus souvent par un up-staging). Elle évite des thoracotomies inutiles chez 20% des patients en révélant des métastases occultes (surrénales, os, foie). Elle permet également de guider les biopsies vers les sites les plus hypermétaboliques (évitant la nécrose) et d'identifier les patients candidats aux traitements ablatifs locaux (oligométastases)."
          },
          {
            title: "Limites, pièges et faux positifs/négatifs spécifiques au poumon",
            text: "Le FDG n'est pas un traceur spécifique du cancer, mais du métabolisme glucidique.",
            list: [
              "Faux Positifs (Inflammation/Infection) : Tuberculose, sarcoïdose, pneumopathie infectieuse, abcès, pneumopathie radique, ganglions réactionnels (anthracose).",
              "Faux Négatifs (Faible avidité ou petite taille) : Adénocarcinomes lépidiques (anciennement carcinomes bronchiolo-alvéolaires), tumeurs carcinoïdes typiques (bien différenciées), lésions < 8 mm (effet de volume partiel)."
            ],
            infoBox: {
              type: "info",
              title: "Le Cerveau",
              text: "Le cerveau consomme physiologiquement énormément de glucose. La TEP au FDG est donc peu performante pour la recherche de métastases cérébrales. Une IRM cérébrale injectée reste indispensable dans le bilan d'extension systématique du cancer du poumon."
            }
          },
          {
            title: "Conclusion et prise en charge intégrée",
            text: "La TEP-TDM au ¹⁸F-FDG est le pivot de la décision en Réunion de Concertation Pluridisciplinaire (RCP) d'oncologie thoracique. Une prescription au bon timing et une transmission précise des données cliniques (diabète, traitements récents, histologie) au médecin nucléaire sont les garants d'une interprétation optimale."
          }
        ]
      },
      medecin_nuc: {
        sections: [
          {
            title: "1. Introduction et Épidémiologie",
            text: "Le cancer du poumon reste la première cause de mortalité par cancer dans le monde. La TEP-TDM au ¹⁸F-FDG a révolutionné sa prise en charge, avec un niveau de preuve IA (EANM) pour le staging initial des CPNPC (Cancers Pulmonaires Non à Petites Cellules). Elle permet une stadification TNM métabolique d'une précision inégalée, modifiant la stratégie thérapeutique dans près d'un tiers des cas, principalement par la détection d'atteintes ganglionnaires médiastinales (N2/N3) inattendues ou de métastases à distance (M1b/c) occultes."
          },
          {
            title: "2. Principes Biophysiques et Radiopharmacie",
            text: "Le rationnel repose sur l'effet Warburg : la reprogrammation métabolique des cellules cancéreuses vers la glycolyse aérobie.",
            list: [
              "Mécanisme d'uptake : Le ¹⁸F-FDG (2-désoxy-2-[¹⁸F]fluoro-D-glucose) pénètre la membrane cellulaire via les transporteurs GLUT (principalement GLUT-1 et GLUT-3, surexprimés par l'hypoxie via HIF-1α).",
              "Piégeage intracellulaire : Il est phosphorylé par l'hexokinase II (HK-II) en FDG-6-phosphate. L'absence de groupement hydroxyle en C2 empêche la poursuite de la glycolyse (isomérisation impossible). La faible activité de la glucose-6-phosphatase dans les cellules tumorales entraîne une accumulation (trapping) continue du traceur.",
              "Isotope : Le Fluor-18 est un émetteur β+ pur (97%), d'énergie maximale 0.634 MeV (parcours moyen dans l'eau ~0.6 mm, garantissant une excellente résolution spatiale intrinsèque), de demi-vie physique T½ = 109.8 minutes.",
              "Dosimétrie : L'organe critique est la vessie. La dose efficace est d'environ 0.019 mSv/MBq. Pour une activité standard de 3 MBq/kg, la dose liée au radiopharmaceutique est d'environ 4 à 5 mSv, à laquelle s'ajoute la dose de la TDM (2 à 5 mSv pour un low-dose, jusqu'à 10-15 mSv pour un scanner diagnostique injecté)."
            ]
          },
          {
            title: "3. Indications et Recommandations Internationales (EBM)",
            text: "La pratique doit s'aligner sur les guidelines récentes :",
            list: [
              "Staging Initial : Les AUC SNMMI 2025 confirment un score de 9 pour l'évaluation initiale des CPNPC de stades I-III. La TEP a une VPP élevée pour les N2/N3, mais toute fixation médiastinale isolée modifiant la résécabilité DOIT être confirmée histologiquement (EBUS/EUS ou médiastinoscopie) en raison des faux positifs inflammatoires.",
              "Planification de Radiothérapie (RT) : Les recommandations conjointes EANM/SNMMI/ESTRO (2022) valident l'utilisation de la TEP pour délimiter le GTV (Gross Tumor Volume). Elle permet de distinguer la tumeur de l'atélectasie d'accompagnement. L'acquisition doit idéalement se faire en position de traitement (table plate, contentions) avec synchronisation respiratoire (TEP 4D) pour évaluer le mouvement tumoral (ITV - Internal Target Volume).",
              "Évaluation de la réponse : Utilisation recommandée des critères PERCIST 1.0. Pour l'immunothérapie (inhibiteurs de checkpoints immunitaires type anti-PD1/PD-L1), l'utilisation des critères iPERCIST ou imPERCIST est cruciale pour ne pas classer à tort en progression un phénomène de pseudo-progression (infiltrat lymphocytaire tumoral induisant un hypermétabolisme transitoire)."
            ]
          },
          {
            title: "4. Protocoles d'Acquisition et Harmonisation (EANM v3.0)",
            text: "Le respect des standards EARL 2 est impératif pour la reproductibilité multicentrique et l'utilisation des SUV en recherche clinique.",
            list: [
              "Préparation : Jeûne de 4 à 6h. Glycémie capillaire < 11 mmol/L (idéalement < 8.3 mmol/L). Hydratation per os (500 mL).",
              "Activité administrée : Selon les abaques EANM, généralement fonction du poids (ex: 3 MBq/kg) ou du BMI, adaptée à la sensibilité du système (caméras numériques SiPM permettant une réduction drastique de la dose).",
              "Délai d'uptake : 60 minutes (tolérance 55-75 min). Un délai strict est vital pour la reproductibilité du SUV. Des acquisitions tardives (à 2h) peuvent aider à différencier tumeur (le SUV augmente) et inflammation (le SUV stagne ou diminue), bien que ce concept de double phase soit débattu.",
              "Champ de vue (FOV) : Du vertex (ou base du crâne) jusqu'à la mi-cuisse. Un balayage corps entier (incluant les membres inférieurs) est recommandé en cas de suspicion de métastases osseuses distales ou cutanées.",
              "Acquisition TDM : TDM low-dose pour la correction d'atténuation et le repérage. L'utilisation d'un TDM diagnostique injecté (temps portal) au cours de la même session est de plus en plus standardisée pour un « one-stop shop »."
            ]
          },
          {
            title: "5. Sémiologie, Interprétation et Critères d'Analyse",
            text: "L'analyse visuelle reste la pierre angulaire, complétée par la semi-quantification.",
            list: [
              "Paramètres quantitatifs : Le SUVmax est sensible au bruit. Le SUVpeak (moyenne d'une ROI sphérique de 1 cm³ centrée sur la zone la plus chaude) est recommandé par PERCIST car plus robuste. Le SUL (SUV normalisé sur la Lean Body Mass) réduit la variabilité liée à l'adiposité.",
              "Paramètres volumétriques : Le MTV (Metabolic Tumor Volume) et le TLG (Total Lesion Glycolysis = MTV × SUVmean) sont d'excellents facteurs pronostiques indépendants, reflétant la charge tumorale globale.",
              "Critères PERCIST : Une réponse métabolique partielle (PMR) nécessite une baisse de ≥ 30% et d'au moins 0.8 unité du SULpeak de la lésion cible. La progression (PMD) est une augmentation de ≥ 30% ou l'apparition d'une nouvelle lésion."
            ]
          },
          {
            title: "6. Pièges, Artefacts et Faux Positifs/Négatifs",
            text: "La connaissance des limites de la technique est la marque de l'expert :",
            list: [
              "Faux Positifs : Granulomatoses (sarcoïdose, tuberculose, histoplasmose), pneumopathies infectieuses/organisées, pneumopathie radique (peut persister > 6 mois), hyperplasie thymique rebond post-chimiothérapie, fixation de la graisse brune (Brown Adipose Tissue - BAT, à prévenir par réchauffement ou bêta-bloquants).",
              "Faux Négatifs : Adénocarcinomes de type lépidique (faible densité cellulaire, métabolisme lent), tumeurs carcinoïdes typiques, lésions millimétriques (effet de volume partiel, sous-estimant le SUV).",
              "Artefacts techniques : Artefact de mouvement respiratoire (flou cinétique, mismatch TEP/TDM au niveau des bases pulmonaires créant un faux aspect de lésion hépatique ou diaphragmatique), artefact métallique (pacemaker, prothèse) sur-corrigeant l'atténuation."
            ]
          },
          {
            title: "7. Structure du Compte-Rendu Type",
            text: "Un compte-rendu de qualité doit être structuré, clair et répondre à la question clinique :",
            list: [
              "Indication et Contexte : Histologie, date des traitements, glycémie à jeun.",
              "Technique : Activité injectée, délai, type de machine (analogique/numérique, TOF), type de TDM.",
              "Résultats (T) : Description de la lésion primitive (localisation, taille TDM, SUVmax/peak).",
              "Résultats (N) : Statut ganglionnaire hilaire et médiastinal (préciser les stations ganglionnaires selon la classification IASLC).",
              "Résultats (M) : Statut métastatique (surrénales, os, foie, autres).",
              "Conclusion : Stadification TNM métabolique (mTNM). Réponse claire à la question posée. Recommandation éventuelle (ex: confrontation histologique d'un ganglion N2 isolé)."
            ]
          },
          {
            title: "8. Points clés FMC (Take-home messages)",
            infoBox: {
              type: "tip",
              title: "À retenir pour la pratique",
              text: "1. Toute fixation médiastinale (N2/N3) isolée modifiant la résécabilité chirurgicale exige une preuve histologique (EBUS) en raison des faux positifs inflammatoires.\n2. Le cerveau doit toujours être exploré par IRM, la TEP-FDG y étant aveugle pour les petites métastases.\n3. En évaluation de réponse à l'immunothérapie, méfiez-vous de la pseudo-progression (iPERCIST) : ne pas conclure hâtivement à un échec thérapeutique devant une majoration modérée de la fixation lors du premier bilan."
            }
          }
        ],
        table: {
          headers: ["Paramètre", "Spécification (Guidelines EANM v3.0)"],
          rows: [
            ["Radiopharmaceutique", "2-[¹⁸F]FDG"],
            ["Préparation", "Jeûne > 4-6h, Glycémie < 11 mmol/L"],
            ["Activité recommandée", "Abaques EANM (ex: 3 MBq/kg pour systèmes standards, < 2 MBq/kg pour SiPM)"],
            ["Délai d'uptake", "60 minutes (± 5 min de tolérance idéale)"],
            ["Acquisition TDM", "Low-dose (10-30 mAs) ou Diagnostique (avec injection d'iode)"],
            ["Reconstruction", "OSEM avec TOF (Time-Of-Flight) et PSF (Point Spread Function) si disponibles"],
            ["Critères de réponse", "PERCIST 1.0 (SULpeak) ou EORTC (SUVmax)"]
          ]
        }
      }
    }
  },
  {
    id:'MN005', cat:'theranostique_thyroide', catLabel:'Pathologies Thyroïdiennes',
    title:'Radioiodothérapie : désescalade thérapeutique',
    tags:['¹³¹I','CPT','Ablation','30 mCi','Désescalade'],
    difficulty:'avancé',
    excerpt:"Données récentes sur l'équivalence des doses 30/50/100 mCi dans les carcinomes thyroïdiens différenciés à faible risque. Taux d'ablation ~94%.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Étude ESTIMABL', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1110831' },
      { title: 'Étude HiLo', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1111073' }
    ],
    content:{
      lead:"Les données récentes remettent en question les hautes doses d'iode radioactif dans les carcinomes thyroïdiens différenciés à faible risque. L'équivalence d'efficacité des doses de 30 à 100 mCi ouvre la voie à une désescalade thérapeutique significative, avec une réduction de la charge dosimétrique et des effets secondaires.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Contexte et enjeux', text:"Pendant des décennies, des doses de 100 mCi (3,7 GBq) ont été utilisées de manière quasi-systématique pour l'ablation du reliquat thyroïdien post-thyroïdectomie. Les études ESTIMABL (2012) et HiLo (2012) ont démontré la non-infériorité des basses doses (30 mCi / 1,1 GBq) dans les tumeurs à faible risque selon la classification ATA/ETA."},
          {title:'Résultats de notre série (CHU Bab El Oued, n=235)', list:["Taux d'ablation complète à 30 mCi : 93,8%","Taux d'ablation complète à 50 mCi : 94,1%","Taux d'ablation complète à 100 mCi : 94,3%","Différence non significative (p > 0,05)","Critère d'ablation : Tg stimulée < 1 ng/mL + scintigraphie négative","Résultats maintenus sans biologie moléculaire disponible localement"]},
          {title:'Implications pratiques en contexte algérien', text:"En l'absence de panel de biologie moléculaire (BRAF, RET/PTC...) systématiquement disponible dans notre contexte, nos données soutiennent une approche basée sur les critères histopathologiques classiques (TNM, taille, invasion vasculaire) pour stratifier le risque et justifier la désescalade thérapeutique."},
          {title:'Critères de sélection pour basse dose', list:['Carcinome papillaire ou vésiculaire différencié','Thyroïdectomie totale confirmée par imagerie','Risque faible ATA : pT1-T2 N0 M0',"Absence d'emboles vasculaires extensifs",'Tg post-opératoire < 10 ng/mL (sous hormonosuppression)',"Pas d'antécédent d'irradiation cervicale"]}
        ],
        table:{headers:['Dose','n','Taux ablation','IC 95%','Délai contrôle'], rows:[['30 mCi (1,1 GBq)','78','93,8%','[85,8-97,4]','6-12 mois'],['50 mCi (1,85 GBq)','81','94,1%','[86,4-97,5]','6-12 mois'],['100 mCi (3,7 GBq)','76','94,3%','[86,5-97,6]','6-12 mois']]}
      },
      patient:{
        sections:[
          {title:"Le traitement à l'iode radioactif, c'est quoi ?", text:"Après l'ablation chirurgicale de votre thyroïde, on vous donne une capsule d'iode radioactif. Cet iode va détruire les petits restes de tissu thyroïdien que le chirurgien n'a pas pu enlever, et tuer d'éventuelles cellules cancéreuses."},
          {title:'Pourquoi une "petite" dose peut suffire ?', text:"Les études médicales récentes montrent que pour les cancers thyroïdiens peu agressifs, une petite dose d'iode radioactif marche aussi bien qu'une grande dose. C'est ce qu'on appelle la \"désescalade\". L'avantage : moins d'effets secondaires (bouche sèche, nausées) et moins de contraintes d'isolement."},
          {title:'Précautions après le traitement', list:['Rester à distance des enfants et femmes enceintes pendant 3-7 jours',"Boire beaucoup d'eau pour éliminer l'iode",'Sucer des bonbons acides pour protéger les glandes salivaires','Un contrôle sanguin et une scintigraphie seront programmés à 6-12 mois']}
        ]
      }
    }
  },

  {
    id:'MN007', cat:'rhumatologie', catLabel:'Rhumatologie & Os',
    title:'Scintigraphie osseuse au Tc-MDP',
    tags:['Tc-MDP','Os','Métastases','Fracture'],
    difficulty:'fondamental',
    excerpt:"Exploration de l'ensemble du squelette en une acquisition. Détecte les lésions osseuses avec 6-12 mois d'avance sur la radiographie standard.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'EANM Guidelines for Bone Scintigraphy', url: 'https://www.eanm.org' }
    ],
    content:{
      lead:"La scintigraphie osseuse au Tc-MDP reste l'examen de référence pour le bilan d'extension osseuse des cancers, la détection de fractures occultes et l'évaluation des pathologies ostéo-articulaires. Sa sensibilité élevée compense une spécificité modérée.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Mécanisme', text:"Le méthylènediphosphonate marqué au Tc-99m (Tc-MDP) s'adsorbe sur les cristaux d'hydroxyapatite du tissu osseux néoformé. L'intensité de fixation est proportionnelle à l'activité ostéoblastique locale."},
          {title:'Indications principales', list:["Bilan d'extension osseuse (cancer prostate, sein, poumon, rein, thyroïde)",'Fractures de fatigue et occultes','Ostéonécrose aseptique','Prothèses douloureuses (infection, descellement)','Maladie de Paget','Algodystrophie (SDRC)','Spondylodiscite (3 temps = 4h)']},
          {title:'Protocole', list:['Injection IV : 700-800 MBq Tc-MDP','Acquisition 3h post-injection (élimination rénale optimale)','Images corps entier + coupes SPECT si nécessaire','Option SPECT/CT : meilleure localisation anatomique']},
          {title:'Pièges et limites', list:['Faux négatifs : myélome multiple, métastases ostéolytiques pures, lésions très récentes','Faux positifs : arthrose, fractures bénignes, infections','"Super-scan" : fixation globale intense sans clairance rénale (métastases diffuses)']}
        ],
        table:{headers:['Cancer primitif','% métastases osseuses','Profil scintigraphique'], rows:[['Prostate','65-75%','Ostéoblastique +++'],['Sein','65-75%','Mixte'],['Poumon','30-40%','Variable'],['Rein','20-30%','Ostéolytique/mixte'],['Thyroïde (diff.)','5-10%','Hyperfixant si ¹³¹I capté']]}
      },
      patient:{
        sections:[
          {title:'À quoi sert cet examen ?', text:"La scintigraphie osseuse permet de prendre une \"photo\" de tout votre squelette en une seule fois. Elle est très utile pour voir si un cancer s'est propagé aux os, ou pour détecter des fractures que les radiographies normales ne voient pas encore."},
          {title:'Comment ça se passe ?', list:['On vous injecte un produit radioactif dans le bras (indolore)','Vous attendez 3 heures (le produit se fixe sur les os)','Vous passez sous un grand scanner qui prend des photos de tout votre corps',"L'examen lui-même dure 30-45 minutes","Boire beaucoup d'eau pendant l'attente aide à éliminer le produit"]}
        ]
      }
    }
  },
  {
    id:'MN008', cat:'tne', catLabel:'Tumeurs Neuroendocrines',
    title:'Théranostique — PRRT au Lu-177 DOTATATE',
    tags:['Lu-177','PRRT','NET','DOTATATE','Théranostique'],
    difficulty:'avancé',
    excerpt:"Radiothérapie interne vectorisée des tumeurs neuroendocrines. Le Lu-177 DOTATATE (Lutathera®) est le standard pour les TNE gastro-entéropancréatiques.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Étude NETTER-1', url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1607427' },
      { title: 'ENETS Consensus Guidelines', url: 'https://www.enets.org' }
    ],
    content:{
      lead:"Le concept théranostique — même molécule pour diagnostiquer et traiter — révolutionne l'oncologie nucléaire. Le couple Ga-68 DOTATATE (diagnostic TEP) / Lu-177 DOTATATE (traitement) est l'exemple paradigmatique de cette approche personnalisée.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Principe théranostique', text:"La même molécule (DOTATATE = octréotide modifié) cible les récepteurs à la somatostatine (SSTR2) surexprimés par les tumeurs neuroendocrines. Marquée au Ga-68, elle permet un bilan TEP diagnostique. Marquée au Lu-177 (émetteur β⁻), elle délivre une irradiation locale létale aux cellules tumorales."},
          {title:'Sélection des patients', list:['TNE gastro-entéropancréatiques bien différenciées (grade 1-2, Ki67 < 20%)','Expression SSTR confirmée par TEP Ga-68 DOTATATE (Krenning score ≥ 3)','Maladie progressive sous analogues de la somatostatine','Clairance créatinine ≥ 50 mL/min','Hémogramme suffisant (PNN > 1500, plaquettes > 70G/L)']},
          {title:'Protocole LUTATHERA® (étude NETTER-1)', list:['4 cycles de Lu-177 DOTATATE (7,4 GBq chaque)','Intervalle : 8 semaines',"Protection rénale : perfusion d'acides aminés (Lys/Arg)",'Contrôle dosimétrique post-injection (SPECT/CT à 24-48h)','SRO 65,2% vs 11% (octréotide LAR seul)','SSP médiane : 28,4 mois vs 8,4 mois (HR 0,21)']}
        ],
        table:{headers:['Paramètre','PRRT Lu-177','Comparateur'], rows:[['SRO','65,2%','11%'],['SSP (mois)','28,4','8,4'],['HR progression','0,21 [0,13-0,33]','—'],['Toxicité grade ≥3','Rein 1,8%, Hémato 9%','—']]}
      },
      patient:{
        sections:[
          {title:"Ce traitement révolutionnaire, c'est quoi ?", text:"Le PRRT est un traitement où on injecte dans votre veine un médicament radioactif qui va chercher les cellules de votre tumeur comme un missile guidé. Il se fixe directement sur les cellules cancéreuses et les détruit par radioactivité, en épargnant le plus possible les cellules saines."},
          {title:'Pour quelles tumeurs ?', text:"Ce traitement est réservé à certaines tumeurs appelées \"neuroendocrines\" du tube digestif ou du pancréas. Votre médecin aura d'abord vérifié par un examen spécial (TEP DOTATATE) que vos tumeurs expriment bien les récepteurs ciblés par ce traitement."},
          {title:'Comment se déroule le traitement ?', list:['4 injections au total, espacées de 8 semaines',"Chaque injection se fait à l'hôpital, en hospitalisation courte","Une perfusion de protection des reins est administrée en même temps","Des contrôles réguliers (sang, imagerie) sont réalisés entre chaque cycle"]}
        ]
      }
    }
  }
];
