export type Category = 'all' | 'dashboard' | 'favorites' | 'index' | 'generalites' | 'bases_physiques' | 'radiobiologie' | 'reglementation' | 'endocrinologie' | 'oncologie' | 'hematologie' | 'cardiologie' | 'neurologie' | 'nephro_urologie' | 'pneumologie' | 'gastro_enterologie' | 'rhumatologie' | 'senologie_gynecologie' | 'dermatologie_melanome' | 'orl_salivaires' | 'vasculaire_lymphatique' | 'infection_inflammation' | 'urgences' | 'pediatrie' | 'theranostique_thyroide' | 'tne' | 'prostate' | 'sirt' | 'radiopharmacie' | 'instrumentation' | 'radioprotection' | 'scores' | 'calculateurs' | 'artefacts' | 'cas_cliniques' | 'preparation' | 'guidelines' | 'about' | 'contact' | 'annuaire';

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
      { id: 'oncologie', label: 'Oncologie (Tumeurs Solides)' },
      { id: 'hematologie', label: 'Hématologie & Lymphomes' },
      { id: 'cardiologie', label: 'Cardiologie' },
      { id: 'neurologie', label: 'Neurologie' },
      { id: 'nephro_urologie', label: 'Néphro-Urologie' },
      { id: 'pneumologie', label: 'Pneumologie' },
      { id: 'gastro_enterologie', label: 'Gastro-entérologie' },
      { id: 'rhumatologie', label: 'Rhumatologie & Os' },
      { id: 'senologie_gynecologie', label: 'Sénologie & Gynécologie' },
      { id: 'dermatologie_melanome', label: 'Dermatologie & Mélanome' },
      { id: 'orl_salivaires', label: 'ORL & Glandes Salivaires' },
      { id: 'vasculaire_lymphatique', label: 'Vasculaire & Lymphatique' },
      { id: 'infection_inflammation', label: 'Infection & Inflammation' },
      { id: 'urgences', label: 'Urgences en MN' },
      { id: 'pediatrie', label: 'Pédiatrie' },
    ]
  },
  {
    title: "☢️ THÉRANOSTIQUE & RIV",
    items: [
      { id: 'theranostique_thyroide', label: 'Pathologies Thyroïdiennes' },
      { id: 'tne', label: 'Tumeurs Neuroendocrines' },
      { id: 'prostate', label: 'Cancer de la Prostate' },
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
      { id: 'cas_cliniques', label: 'Cas Cliniques & Quiz' },
      { id: 'preparation', label: 'Préparation Patient' },
      { id: 'guidelines', label: 'Guidelines (EANM/SNMMI)', targetAudience: ['medecin_nuc', 'medecin_non_nuc'] },
    ]
  },
  {
    title: "ℹ️ INFORMATIONS",
    items: [
      { id: 'about', label: 'Mentions Légales' },
      { id: 'annuaire', label: 'Annuaire des Médecins' },
      { id: 'contact', label: 'Nous contacter' },
    ]
  }
];

export type ArticleMode = 'patient' | 'medecin_non_nuc' | 'medecin_nuc';

export interface Figure {
  // Schéma vectoriel original (préféré : libre de droits, adapté au thème).
  svg?: string;
  // Image bitmap optionnelle (URL distante autorisée par next.config).
  imageUrl?: string;
  // Texte alternatif obligatoire pour l'accessibilité.
  alt: string;
  caption?: string;
}

export interface Section {
  title: string;
  text?: string;
  list?: string[];
  figure?: Figure;
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

// Carte d'identité de l'examen (gabarit §1) — fiche-réflexe visuelle.
export interface IdentityField {
  label: string;
  value: string;
  icon?: string; // clé d'icône (voir components/IdentityCard.tsx)
}

// Liens sortants typés (gabarit §25 — « la carte »).
export interface RelatedLink {
  type: 'traceur' | 'maladie' | 'examen' | 'score' | 'theranostique';
  label: string;
  href?: string;
}

// Question de quiz (gabarit §23).
export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number; // index de la bonne réponse dans options
  explanation?: string;
  difficulty?: 'facile' | 'moyen' | 'difficile';
}

export interface ArticleContent {
  lead: string;
  medecin_non_nuc: ContentMode;
  medecin_nuc: ContentMode;
  patient: ContentMode;
  // Composants transverses du gabarit (optionnels, communs à l'article).
  identityCard?: IdentityField[];
  relatedLinks?: RelatedLink[];
  quiz?: QuizQuestion[];
}

// Statut de relecture médicale — transparence éditoriale.
// 'ai_assisted' = rédigé avec assistance IA, pas encore relu par un médecin (défaut prudent).
// 'reviewed'    = relu et validé par un médecin nucléaire identifié.
// 'draft'       = brouillon non publié.
export type ReviewStatus = 'draft' | 'ai_assisted' | 'reviewed';

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
  reviewStatus?: ReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
}

export const ENTRIES: Article[] = [];
