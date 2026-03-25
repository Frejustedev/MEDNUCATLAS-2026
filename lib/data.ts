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
    id:'MN000_GEN', cat:'generalites', catLabel:'Généralités',
    title:'Introduction à la Médecine Nucléaire',
    tags:['Bases','Traceurs','Imagerie'],
    difficulty:'fondamental',
    excerpt:"Principes de base de l'imagerie fonctionnelle et moléculaire.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Société Française de Médecine Nucléaire (SFMN)', url: 'https://www.sfmn.org' },
      { title: 'European Association of Nuclear Medicine (EANM)', url: 'https://www.eanm.org' }
    ],
    content:{
      lead:"La médecine nucléaire est une spécialité d'imagerie médicale et de thérapie qui utilise des propriétés radioactives pour explorer le fonctionnement des organes à l'échelle moléculaire.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {
            title:'Définition et Concept', 
            text:"Contrairement à la radiologie qui s'intéresse principalement à l'anatomie (la structure), la médecine nucléaire s'intéresse à la physiologie (le fonctionnement). Elle repose sur l'administration d'un radiopharmaceutique dont la distribution in vivo reflète un processus biologique spécifique.",
            infoBox: {
              type: 'tip',
              title: 'Le concept de Théranostique',
              text: "C'est l'association d'un test diagnostique et d'une thérapie ciblée utilisant le même vecteur moléculaire. Si la cible est présente à l'imagerie, on peut la traiter en changeant simplement l'isotope radioactif (ex: Gallium-68 pour le diagnostic, Lutécium-177 pour la thérapie)."
            }
          },
          {
            title:"L'Imagerie Hybride", 
            text:"Aujourd'hui, la quasi-totalité des caméras sont hybrides : elles couplent une modalité fonctionnelle (TEP ou TEMP) à une modalité anatomique (TDM ou IRM) pour une localisation précise des anomalies.",
            stats: [
              { value: 'TEP-TDM', label: 'Métabolisme + Anatomie' },
              { value: 'TEMP-TDM', label: 'Fonction + Anatomie' },
              { value: 'TEP-IRM', label: 'Haute résolution tissulaire' }
            ]
          },
          {
            title:'Le Radiopharmaceutique', 
            text:"C'est le médicament administré au patient. Il est toujours composé de deux parties indissociables :",
            steps: [
              { title: 'Le Vecteur', text: "C'est la molécule 'intelligente' qui cible spécifiquement l'organe ou la pathologie (ex: le glucose pour les tumeurs, un anticorps, un peptide)." },
              { title: 'Le Marqueur', text: "C'est l'isotope radioactif (ex: Fluor-18, Technétium-99m) qui émet des rayonnements détectables par les caméras pour créer l'image." }
            ]
          }
        ]
      },
      patient:{
        sections:[
          {
            title:"Qu'est-ce que la médecine nucléaire ?", 
            text:"C'est une spécialité médicale qui permet de voir comment fonctionnent vos organes. Contrairement à une radiographie classique qui montre la 'forme' de vos os ou organes, la médecine nucléaire montre leur 'activité'.",
            infoBox: {
              type: 'info',
              title: 'Radiologie vs Médecine Nucléaire',
              text: "En radiologie (scanner, radio), la machine émet les rayons qui traversent votre corps. En médecine nucléaire, c'est le produit qu'on vous injecte qui émet des rayons très faibles, captés par la machine."
            }
          },
          {
            title:"Comment se déroule un examen ?", 
            steps: [
              { title: "L'administration", text: "On vous donne un produit légèrement radioactif, le plus souvent par une simple piqûre dans le bras." },
              { title: "L'attente", text: "Il faut souvent patienter (de quelques minutes à quelques heures) pour que le produit se fixe sur l'organe à examiner." },
              { title: "L'image", text: "Vous vous allongez sur la machine (la caméra) qui va prendre des photos de votre corps sans vous toucher." }
            ]
          },
          {
            title:"Est-ce dangereux ?", 
            text:"Non. Les doses de radioactivité utilisées sont extrêmement faibles et calculées sur mesure pour votre poids et votre âge.",
            stats: [
              { value: 'Très faible', label: 'Dose de radioactivité' },
              { value: 'Quelques heures', label: 'Élimination du produit' }
            ]
          }
        ]
      }
    }
  },
  {
    id:'MN000_PHYS', cat:'bases_physiques', catLabel:'Bases Physiques',
    title:'Physique des rayonnements',
    tags:['Isotopes','Rayonnements','Détection'],
    difficulty:'fondamental',
    excerpt:'Nature des rayonnements, interactions avec la matière et principes de détection.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'IRSN - Bases physiques', url: 'https://www.irsn.fr' }
    ],
    content:{
      lead:'La compréhension de la physique des rayonnements est essentielle pour optimiser la qualité des images et garantir la sécurité dosimétrique.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {
            title:"Origine de la radioactivité", 
            text:"La radioactivité est un phénomène naturel ou artificiel par lequel un noyau atomique instable (radionucléide) se transforme en un noyau plus stable en émettant de l'énergie sous forme de rayonnements."
          },
          {
            title:"Les types de rayonnements", 
            stats: [
              { value: 'Alpha (α)', label: 'Particule lourde, très ionisante, parcours très court (thérapie)' },
              { value: 'Bêta (β)', label: 'Électron (β-) ou Positon (β+), parcours millimétrique (thérapie/TEP)' },
              { value: 'Gamma (γ)', label: 'Onde électromagnétique, très pénétrante (diagnostic TEMP)' }
            ]
          },
          {
            title:"De l'émission à l'image", 
            steps: [
              { title: "Émission", text: "Le radiopharmaceutique se désintègre dans le corps du patient et émet des photons gamma." },
              { title: "Interaction", text: "Certains photons sont absorbés ou déviés (effet Compton, effet photoélectrique) par les tissus du patient." },
              { title: "Détection", text: "Les photons qui sortent du corps traversent un collimateur, interagissent avec un cristal scintillateur (qui transforme le rayon en lumière), puis le signal est amplifié par des photomultiplicateurs pour créer l'image numérique." }
            ]
          }
        ]
      },
      patient:{
        sections:[
          {
            title:"La radioactivité médicale", 
            text:"La radioactivité utilisée dans nos services est spécialement fabriquée pour la médecine. Elle a une durée de vie très courte.",
            infoBox: {
              type: 'tip',
              title: 'Naturelle vs Médicale',
              text: "Nous sommes tous exposés en permanence à une radioactivité naturelle (le soleil, le sol, certains aliments). L'examen que vous allez passer correspond souvent à quelques mois de cette radioactivité naturelle."
            }
          },
          {
            title:"Le voyage du produit", 
            steps: [
              { title: "Dans votre corps", text: "Le produit voyage dans votre sang pour aller se fixer uniquement sur l'organe malade ou à étudier." },
              { title: "Le signal", text: "Une fois fixé, il envoie de minuscules signaux (des rayons invisibles) vers l'extérieur de votre corps." },
              { title: "La caméra", text: "Notre machine agit comme un appareil photo ultra-sensible qui capte ces signaux pour dessiner votre organe sur l'écran du médecin." }
            ]
          }
        ]
      }
    }
  },
  {
    id:'MN000_BIO', cat:'radiobiologie', catLabel:'Radiobiologie',
    title:'Radiobiologie médicale',
    tags:['ADN','Cellules','Effets'],
    difficulty:'fondamental',
    excerpt:'Étude des effets des rayonnements ionisants sur les tissus vivants.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'CIPR - Commission Internationale de Protection Radiologique', url: 'https://www.icrp.org' }
    ],
    content:{
      lead:'La radiobiologie étudie les effets biologiques des rayonnements ionisants, base de la radioprotection et de la radiothérapie interne vectorisée.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {
            title:"Action sur la cellule", 
            text:"Les rayonnements ionisants agissent sur les cellules de deux manières : une action directe (ionisation directe de l'ADN) et une action indirecte (radiolyse de l'eau créant des radicaux libres toxiques qui endommagent l'ADN). L'action indirecte est prédominante."
          },
          {
            title:"Les deux types d'effets", 
            steps: [
              { title: "Effets Déterministes (Tissulaires)", text: "Ils apparaissent au-delà d'un certain seuil de dose (ex: brûlure cutanée, cataracte). La gravité augmente avec la dose. Ils ne surviennent jamais aux doses diagnostiques de médecine nucléaire." },
              { title: "Effets Stochastiques (Aléatoires)", text: "Ils n'ont pas de seuil connu. La probabilité d'apparition (cancer, anomalies génétiques) augmente avec la dose, mais pas la gravité. C'est le risque principal géré en radioprotection." }
            ]
          },
          {
            title:"Sensibilité tissulaire", 
            infoBox: {
              type: 'warning',
              title: 'Loi de Bergonié et Tribondeau',
              text: "Les cellules sont d'autant plus radiosensibles qu'elles se divisent rapidement (forte activité mitotique) et qu'elles sont peu différenciées. C'est pourquoi les fœtus, les enfants et les cellules cancéreuses sont très sensibles aux rayonnements."
            }
          }
        ]
      },
      patient:{
        sections:[
          {
            title:"Les effets sur le corps", 
            text:"Les rayons utilisés en médecine nucléaire traversent le corps et peuvent interagir avec nos cellules. Cependant, les doses utilisées pour le diagnostic sont si faibles qu'elles ne provoquent aucun symptôme ni douleur."
          },
          {
            title:"La réparation cellulaire", 
            infoBox: {
              type: 'info',
              title: 'Le corps se défend',
              text: "Notre corps est une machine incroyable. Nos cellules possèdent des mécanismes de réparation très efficaces capables de corriger immédiatement les minuscules dommages causés par les faibles doses de rayonnements."
            }
          },
          {
            title:"Le rapport bénéfice/risque", 
            text:"Avant de vous prescrire cet examen, votre médecin a évalué que l'information médicale qu'il va en tirer est largement supérieure au risque minime lié à la radioactivité.",
            stats: [
              { value: 'Immense', label: 'Bénéfice Diagnostique' },
              { value: 'Minime', label: 'Risque Radiologique' }
            ]
          }
        ]
      }
    }
  },
  {
    id:'MN000_RAD', cat:'radioprotection', catLabel:'Radioprotection',
    title:'Principes de Radioprotection',
    tags:['ALARA','Doses','Sécurité'],
    difficulty:'fondamental',
    excerpt:'Protection des patients, du public et des travailleurs contre les rayonnements.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'ASN - Autorité de Sûreté Nucléaire', url: 'https://www.asn.fr' }
    ],
    content:{
      lead:'La radioprotection repose sur trois grands principes : Justification, Optimisation (ALARA) et Limitation.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {
            title:"Les 3 piliers de la radioprotection", 
            steps: [
              { title: "Justification", text: "Tout acte exposant aux rayonnements doit présenter un bénéfice médical supérieur au risque encouru. Il ne doit pas exister d'alternative non irradiante aussi performante (ex: IRM, échographie)." },
              { title: "Optimisation (ALARA)", text: "As Low As Reasonably Achievable. Les doses administrées doivent être maintenues au niveau le plus bas possible tout en garantissant une qualité d'image diagnostique." },
              { title: "Limitation", text: "Les doses reçues par les travailleurs et le public ne doivent pas dépasser les limites réglementaires (ex: 20 mSv/an pour un travailleur exposé)." }
            ]
          },
          {
            title:"Moyens de protection pratiques", 
            stats: [
              { value: 'Temps', label: "Réduire le temps d'exposition au minimum" },
              { value: 'Distance', label: "S'éloigner de la source (la dose diminue avec le carré de la distance)" },
              { value: 'Écran', label: 'Utiliser des protections (plomb, tungstène, verre au plomb)' }
            ]
          },
          {
            title:"Cas particuliers", 
            infoBox: {
              type: 'warning',
              title: 'Grossesse et Allaitement',
              text: "La grossesse est une contre-indication relative (à évaluer au cas par cas). L'allaitement doit souvent être suspendu temporairement selon l'isotope utilisé pour éviter la contamination du nourrisson."
            }
          }
        ]
      },
      patient:{
        sections:[
          {
            title:"Votre sécurité avant tout", 
            text:"Dans notre service, tout est conçu pour garantir votre sécurité, celle de vos proches et celle de notre personnel. Les doses que nous vous administrons sont calculées au plus juste."
          },
          {
            title:"Les bons gestes après l'examen", 
            steps: [
              { title: "Boire de l'eau", text: "Buvez abondamment et urinez souvent. Le produit s'élimine naturellement par les urines." },
              { title: "Distance", text: "Évitez le contact prolongé et très rapproché avec les autres le jour de l'examen." },
              { title: "Hygiène", text: "Tirez la chasse d'eau deux fois et lavez-vous bien les mains pour éviter de laisser des traces du produit." }
            ]
          },
          {
            title:"Et pour l'entourage ?", 
            infoBox: {
              type: 'tip',
              title: 'Femmes enceintes et jeunes enfants',
              text: "Par précaution, il vous sera demandé d'éviter de prendre de jeunes enfants sur vos genoux ou de dormir à côté d'une femme enceinte le jour de votre examen."
            }
          }
        ]
      }
    }
  },
  {
    id:'MN000_REG', cat:'reglementation', catLabel:'Réglementation',
    title:'Réglementation en Médecine Nucléaire',
    tags:['ASN','Déchets','Législation'],
    difficulty:'intermédiaire',
    excerpt:'Cadre légal, Autorité de Sûreté Nucléaire (ASN) et gestion des déchets.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Code de la Santé Publique', url: 'https://www.legifrance.gouv.fr' },
      { title: 'Guide de l\'ASN', url: 'https://www.asn.fr' }
    ],
    content:{
      lead:'L\'utilisation des rayonnements ionisants est strictement encadrée par la loi pour garantir la sécurité de tous.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {
            title:"Le cadre institutionnel", 
            stats: [
              { value: 'ASN', label: 'Autorité de Sûreté Nucléaire (Contrôle et Inspections)' },
              { value: 'IRSN', label: 'Institut de Radioprotection et de Sûreté Nucléaire (Expertise)' },
              { value: 'ANSM', label: 'Agence du Médicament (Contrôle des radiopharmaceutiques)' }
            ]
          },
          {
            title:"Le zonage radiologique", 
            steps: [
              { title: "Zone Surveillée (Bleue)", text: "Dose susceptible de dépasser 1 mSv/an. Accès réglementé." },
              { title: "Zone Contrôlée (Verte/Jaune/Orange/Rouge)", text: "Dose susceptible de dépasser 6 mSv/an. Accès restreint aux travailleurs classés, port du dosimètre obligatoire." }
            ]
          },
          {
            title:"Gestion des déchets radioactifs", 
            infoBox: {
              type: 'info',
              title: 'Décroissance sur site',
              text: "Les déchets (seringues, compresses) contaminés par des isotopes à vie courte (ex: Tc-99m, F-18) sont stockés dans des locaux blindés jusqu'à ce que leur radioactivité disparaisse (décroissance). Ils sont ensuite éliminés comme des déchets médicaux classiques."
            }
          }
        ]
      },
      patient:{
        sections:[
          {
            title:"Un environnement ultra-contrôlé", 
            text:"Le service de médecine nucléaire est l'un des endroits les plus surveillés de l'hôpital. Tout est réglementé : la construction des murs, la ventilation, et même les canalisations."
          },
          {
            title:"Qui surveille ?", 
            infoBox: {
              type: 'info',
              title: 'Des autorités indépendantes',
              text: "Des inspecteurs de l'État (l'Autorité de Sûreté Nucléaire) viennent régulièrement vérifier que nos machines sont bien réglées et que nous travaillons en toute sécurité."
            }
          },
          {
            title:"Le devenir des produits", 
            steps: [
              { title: "Stockage sécurisé", text: "Tout ce qui a touché le produit radioactif (coton, seringue) est mis dans des poubelles spéciales en plomb." },
              { title: "Décroissance", text: "Nous gardons ces poubelles dans une pièce fermée à clé jusqu'à ce que la radioactivité disparaisse totalement." },
              { title: "Élimination", text: "Une fois qu'il n'y a plus aucun danger, ils sont jetés avec les déchets médicaux habituels." }
            ]
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
    id:'MN002', cat:'radiopharmacie', catLabel:'Radiopharmacie',
    title:'Technétium-99m : propriétés et usages',
    tags:['Tc-99m','Physique','Générateur','Mo-99'],
    difficulty:'fondamental',
    excerpt:'Radionucléide le plus utilisé en médecine nucléaire diagnostique. Émetteur γ pur (140 keV), T½ = 6h, obtenu par générateur Mo-99/Tc-99m.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'Pharmacopée Européenne', url: 'https://www.edqm.eu' }
    ],
    content:{
      lead:'Le Technétium-99m est le cheval de bataille de la médecine nucléaire moderne. Il représente environ 80% de tous les examens scintigraphiques réalisés dans le monde grâce à ses propriétés physiques idéales.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Propriétés physiques', list:['Numéro atomique : Z = 43','Masse atomique : 99 uma','Désintégration : isomère métastable → ⁹⁹Tc par émission γ','Énergie γ : 140 keV (optimale pour caméra gamma)','Période physique : T½ = 6,02 heures','Période biologique : variable selon le vecteur','Obtention : élution de générateur Mo-99m/Tc-99m']},
          {title:'Pourquoi 140 keV est idéal ?', text:"L'énergie de 140 keV est parfaitement adaptée aux caméras gamma équipées de collimateurs basse énergie haute résolution (LEHR). Trop faible = absorption tissulaire excessive. Trop haute = pénétration du collimateur. 140 keV représente le compromis optimal entre atténuation et collimation."},
          {title:'Marquages principaux', list:['Tc-MDP / HDP : scintigraphie osseuse','Tc-Sestamibi / Tetrofosmin : scintigraphie myocardique','Tc-MAA : scintigraphie pulmonaire de perfusion','Tc-DTPA : scintigraphie rénale dynamique','Tc-DMSA : scintigraphie rénale corticale','Tc-pertechnétate : thyroïde, Meckel, glandes salivaires','Tc-nanocolloides : lymphoscintigraphie']},
          {title:"Contrôle qualité de l'éluat", list:['Pureté radionucléidique : Mo-99 < 0,1 kBq/MBq Tc','Pureté radiochimique : TcO₄⁻ libre < 10%','pH : 4-8','Stérilité et apyrogénicité','Test d\'aluminium : ≤ 10 µg Al/mL']}
        ],
        table:{headers:['Marquage','Organe cible','Mécanisme','Délai acquisition'], rows:[['Tc-MDP','Squelette','Adsorption hydroxyapatite','3h post-injection'],['Tc-Sestamibi','Myocarde/Parathyroïde','Mitochondries','30-60 min'],['Tc-MAA','Poumons (perfusion)','Embolie capillaire','Immédiat'],['Tc-DTPA','Reins','Filtration glomérulaire','2-30 min'],['Tc-DMSA','Reins (cortex)','Liaison tubulaire','2-3h']]}
      },
      patient:{
        sections:[
          {title:"Le Technétium, c'est quoi ?", text:"Le Technétium-99m est un produit légèrement radioactif utilisé comme \"traceur\" dans de nombreux examens médicaux. On l'injecte dans votre veine, et il se dirige vers l'organe qu'on veut examiner. Une caméra spéciale capte ensuite les rayons qu'il émet pour créer des images."},
          {title:'Pour quels examens est-il utilisé ?', list:['Scintigraphie osseuse (douleurs osseuses, métastases)','Scintigraphie cardiaque (circulation sanguine du cœur)','Scintigraphie des poumons (embolie pulmonaire)','Scintigraphie rénale (fonction des reins)','Scintigraphie de la thyroïde']},
          {title:'Est-ce dangereux ?', text:"Non. Le Technétium-99m est choisi précisément parce qu'il est très peu dangereux : il disparaît de votre corps en quelques heures (sa \"durée de vie\" est de seulement 6 heures). La dose de radioactivité reçue est comparable à celle d'un scanner classique."}
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
    id:'MN004', cat:'oncologie', catLabel:'Oncologie',
    title:'TEP-TDM au ¹⁸F-FDG',
    tags:['PET-CT','¹⁸F-FDG','Oncologie','Staging'],
    difficulty:'intermédiaire',
    excerpt:"La tomographie par émission de positons au fluorodésoxyglucose exploite l'hypermétabolisme glucidique tumoral pour le bilan d'extension oncologique.",
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'SNMMI Procedure Standard for FDG PET/CT', url: 'https://www.snmmi.org' }
    ],
    content:{
      lead:"La TEP-TDM au ¹⁸F-FDG est l'examen de médecine nucléaire le plus révolutionnaire des 30 dernières années. Elle combine l'information métabolique (TEP) et anatomique (TDM) en une seule acquisition, offrant une sensibilité et une spécificité supérieures au bilan conventionnel pour la majorité des cancers.",
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Principe du FDG', text:"Le ¹⁸F-FDG (fluorodésoxyglucose) est un analogue du glucose marqué au fluor-18 (T½=110 min, émetteur β⁺). Il est capté par les cellules à fort métabolisme glucidique via GLUT1/3, phosphorylé par l'hexokinase mais non métabolisé davantage (effet de trapping). Les tumeurs malignes surexpriment GLUT et hexokinase → hyperfixation FDG."},
          {title:'Indications validées (HAS)', list:['Lymphomes hodgkiniens et non hodgkiniens : staging, réponse, rechute','CBNPC et CBP à petites cellules : staging initial','Cancer colorectal : rechute, métastases hépatiques','Mélanome : staging, recherche de récidive','Cancer du sein : rechute métastatique','Cancers ORL : staging, rechute','Tumeurs stromales gastro-intestinales (GIST) sous Glivec']},
          {title:'Préparation et réalisation', list:['Glycémie < 8 mmol/L (idéalement < 6,5)','Jeûne strict 6h (sauf eau)','Éviter exercice musculaire 24h avant',"Repos au chaud pendant l'attente (60 min)",'Dose : 3-4 MBq/kg (adulte)','Acquisition : tête→cuisses, couplée TDM avec/sans injection']}
        ],
        table:{headers:['Cancer','Sensibilité','Spécificité','Indication principale'], rows:[['Lymphome','85-95%','90-95%','Staging, réponse Deauville'],['CBNPC','80-90%','85-90%','Staging TNM, GTV radiothérapie'],['Colorectal (rechute)','90-95%','75-85%','Suspicion de récidive'],['Mélanome','85-90%','88-94%','Stade III-IV']]}
      },
      patient:{
        sections:[
          {title:"C'est quoi la TEP-scan ?", text:'La TEP-scan (ou PET-scan) est un examen qui montre comment vos cellules consomment du sucre. On vous injecte un sucre légèrement radioactif. Les cellules cancéreuses mangent beaucoup plus de sucre que les cellules normales, donc elles apparaissent en "brillant" sur les images.'},
          {title:"Pourquoi c'est important ?", text:"Cet examen permet à votre médecin de voir en une seule fois tout votre corps, de repérer où est le cancer et s'il s'est propagé ailleurs. C'est une information essentielle pour choisir le meilleur traitement."},
          {title:'Comment me préparer ?', list:['Ne rien manger ni boire (sauf eau) 6 heures avant','Vérifier votre glycémie si vous êtes diabétique',"Rester au calme et au chaud pendant l'heure d'attente",'Prévenir si vous êtes enceinte ou allaitez',"Boire beaucoup d'eau après l'examen pour éliminer le produit"]}
        ]
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
    id:'MN006', cat:'radioprotection', catLabel:'Radioprotection',
    title:'Principe ALARA en médecine nucléaire',
    tags:['ALARA','Dosimétrie','Sécurité','Réglementation'],
    difficulty:'fondamental',
    excerpt:'As Low As Reasonably Achievable. Principes fondamentaux de radioprotection applicables en pratique clinique quotidienne.',
    authors: ['Dr. Fréjuste Agboton'],
    sources: [
      { title: 'CIPR - Recommandations', url: 'https://www.icrp.org' },
      { title: 'IRSN - Radioprotection', url: 'https://www.irsn.fr' }
    ],
    content:{
      lead:'Le principe ALARA est le pilier de la radioprotection moderne. Il impose de maintenir toute exposition aux rayonnements ionisants au niveau le plus bas possible, compte tenu des facteurs économiques et sociaux.',
      medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },
      medecin_nuc:{
        sections:[
          {title:'Les 3 principes fondamentaux', list:['Justification : tout acte entraînant une exposition doit être justifié par un bénéfice > risque','Optimisation (ALARA) : les doses doivent être maintenues au plus bas niveau raisonnablement possible','Limitation : les doses individuelles ne doivent pas dépasser les limites réglementaires']},
          {title:'Limites réglementaires (travailleurs)', list:['Dose efficace : 20 mSv/an en moyenne sur 5 ans (max 50 mSv en 1 an)','Cristallin : 20 mSv/an','Extrémités et peau : 500 mSv/an','Femme enceinte : 1 mSv/mois (abdomen)']},
          {title:'Moyens de radioprotection pratiques', list:["Temps : réduire au maximum le temps d'exposition",'Distance : doubler la distance = diviser la dose par 4 (loi 1/r²)','Écrans : plomb pour rayonnements X/γ, matériaux légers pour β','Confinement : zones contrôlées, surveillées','Formation et dosimétrie individuelle obligatoires']}
        ],
        table:{headers:['Situation','Dose typique','Référence'], rows:[['TEP-TDM FDG','~7-10 mSv','Patient adulte'],['Scintigraphie osseuse Tc-MDP','~3-4 mSv','Patient adulte'],['Ablation ¹³¹I 3,7 GBq','~50-100 mSv thyroïde','Patient thyroïdien'],['Fond naturel (France)','~2,9 mSv/an','Population générale']]}
      },
      patient:{
        sections:[
          {title:"La radioactivité, c'est dangereux ?", text:"En médecine nucléaire, les doses utilisées sont soigneusement calculées pour que le bénéfice de l'examen soit toujours bien supérieur au risque lié à la radioactivité. Les médecins appliquent le principe \"ALARA\" : utiliser le minimum de radioactivité nécessaire."},
          {title:'Pour vous rassurer', list:["Une scintigraphie = environ 1 an de radioactivité naturelle de l'environnement","Les produits radioactifs disparaissent d'eux-mêmes en quelques heures ou jours","Les examens ne rendent pas radioactif de façon permanente","Vos proches ne sont pas en danger (sauf précautions spécifiques post-thérapeutiques)"]}
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
