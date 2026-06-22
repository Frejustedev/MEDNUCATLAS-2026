import { Article, Category, ArticleContent } from './data';

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
    catLabel: (data.catLabel as string) ?? '',
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
