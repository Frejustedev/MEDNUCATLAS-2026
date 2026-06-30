import { Article, Category, ArticleContent } from './data';

// Libellés de catégorie (miroir du registre de navigation de data.ts). Sert de
// repli quand un article a un catLabel vide (cas des nouvelles catégories
// générées en masse), pour que le badge de catégorie s'affiche toujours.
const CAT_LABELS: Record<string, string> = {
  generalites: 'Généralités', bases_physiques: 'Bases Physiques', radiobiologie: 'Radiobiologie',
  radioprotection: 'Radioprotection', reglementation: 'Réglementation', endocrinologie: 'Endocrinologie',
  oncologie: 'Oncologie (Tumeurs Solides)', hematologie: 'Hématologie & Lymphomes', cardiologie: 'Cardiologie',
  neurologie: 'Neurologie', nephro_urologie: 'Néphro-Urologie', pneumologie: 'Pneumologie',
  gastro_enterologie: 'Gastro-entérologie', rhumatologie: 'Rhumatologie & Os',
  senologie_gynecologie: 'Sénologie & Gynécologie', dermatologie_melanome: 'Dermatologie & Mélanome',
  orl_salivaires: 'ORL & Glandes Salivaires', vasculaire_lymphatique: 'Vasculaire & Lymphatique',
  infection_inflammation: 'Infection & Inflammation', urgences: 'Urgences en MN', pediatrie: 'Pédiatrie',
  theranostique_thyroide: 'Pathologies Thyroïdiennes', tne: 'Tumeurs Neuroendocrines',
  prostate: 'Cancer de la Prostate', sirt: 'Radioembolisation (SIRT)', radiopharmacie: 'Radiopharmacie',
  instrumentation: 'Instrumentation', scores: 'Scores & Classifications', calculateurs: 'Calculateurs',
  artefacts: 'Atlas des Artefacts', cas_cliniques: 'Cas Cliniques & Quiz', preparation: 'Préparation Patient',
  guidelines: 'Guidelines (EANM/SNMMI)',
};

/**
 * Convertit les données brutes d'un document Firestore `articles` en objet
 * `Article` typé. Le champ `content` est stocké en JSON string (Firestore
 * interdit les tableaux imbriqués) — on le parse ici. Utilisé à la fois côté
 * client (AtlasContext) et côté serveur (page article ISR) pour garantir un
 * parsing identique.
 */
export function articleFromDocData(data: Record<string, unknown>): Article {
  const rawContent = data.content;
  let content: ArticleContent;
  if (typeof rawContent === 'string') {
    try {
      content = JSON.parse(rawContent) as ArticleContent;
    } catch {
      content = emptyContent();
    }
  } else if (rawContent && typeof rawContent === 'object') {
    content = rawContent as ArticleContent;
  } else {
    content = emptyContent();
  }

  return {
    id: data.id as string,
    cat: data.cat as Category,
    catLabel: (data.catLabel as string) || CAT_LABELS[data.cat as string] || '',
    title: (data.title as string) ?? '',
    tags: (data.tags as string[]) ?? [],
    difficulty: (data.difficulty as Article['difficulty']) ?? 'fondamental',
    excerpt: (data.excerpt as string) ?? '',
    targetAudience:
      (data.targetAudience as Article['targetAudience']) ??
      (['medecin_nuc', 'medecin_non_nuc', 'patient'] as Article['targetAudience']),
    authors: data.authors as string[] | undefined,
    sources: data.sources as Article['sources'],
    content,
    reviewStatus: (data.reviewStatus as Article['reviewStatus']) ?? 'ai_assisted',
    reviewedBy: data.reviewedBy as string | undefined,
    reviewedAt: data.reviewedAt as string | undefined,
  };
}

function emptyContent(): ArticleContent {
  return {
    lead: '',
    patient: { sections: [] },
    medecin_non_nuc: { sections: [] },
    medecin_nuc: { sections: [] },
  };
}
