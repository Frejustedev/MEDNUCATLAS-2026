import React, { cache } from 'react';
import { ArticleView } from '@/components/ArticleView';
import { Metadata } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';
import { articleFromDocData } from '@/lib/article-mapper';
import { getArticleFallback } from '@/lib/article-fallback';

// ISR : la page article est régénérée au plus toutes les heures. Le corps est
// rendu côté serveur (plus de dépendance au chargement client complet), ce qui
// améliore le premier rendu, le SEO et la résilience.
export const revalidate = 3600;

// INTERRUPTEUR SEO / juridique (laissé à false = comportement actuel préservé).
// Passer à `true` désindexe automatiquement tout article dont le statut de
// relecture n'est pas `reviewed` (= rédigé avec assistance IA, pas encore relu
// par un médecin). C'est une décision SEO/juridique qui appartient au
// propriétaire du site : tant que le contenu n'est pas relu médicalement, on
// peut vouloir le tenir hors de l'index Google pour limiter le risque.
const NOINDEX_UNTIL_REVIEWED = true;

type Params = { id: string };

// Lecture unique du document par requête (déduplication via React cache),
// partagée entre generateMetadata et le composant de page.
const getArticleDoc = cache(async (id: string): Promise<Record<string, unknown> | null> => {
  try {
    const snap = await getAdminDb().collection('articles').doc(id).get();
    if (snap.exists) return snap.data() as Record<string, unknown>;
    // Document absent en base : repli sur l'instantané statique si présent.
    return getArticleFallback(id);
  } catch (err) {
    // Firestore indisponible (typiquement quota gratuit épuisé) : on sert le
    // contenu depuis l'instantané statique embarqué, pour que l'article reste
    // lisible malgré la base HS.
    console.error('[articles/[id]] Firestore indisponible → repli sur instantané statique:', err);
    return getArticleFallback(id);
  }
});

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getArticleDoc(id);
  const base = process.env.APP_URL ? new URL(process.env.APP_URL) : undefined;

  if (!data) {
    return {
      metadataBase: base,
      title: { absolute: 'Article introuvable | NucleAtlas' },
      description: 'Article non trouvé sur NucleAtlas.',
      robots: { index: false, follow: true },
    };
  }

  const title = (data.title as string) || 'Article';
  const excerpt = (data.excerpt as string) || '';
  const tags = (data.tags as string[]) || [];
  const authors = (data.authors as string[]) || [];
  // Statut de relecture (même défaut prudent que article-mapper : 'ai_assisted').
  const reviewStatus = (data.reviewStatus as string) || 'ai_assisted';

  return {
    metadataBase: base,
    // Indexation : par défaut on indexe tout (NOINDEX_UNTIL_REVIEWED = false).
    // Si le propriétaire bascule l'interrupteur à true, seuls les articles
    // réellement relus par un médecin ('reviewed') restent indexables ; les
    // contenus assistés par IA non relus passent en noindex.
    robots: {
      index: NOINDEX_UNTIL_REVIEWED ? reviewStatus === 'reviewed' : true,
      follow: true,
    },
    // Titre absolu : on évite que le template "%s | NucleAtlas" du layout racine s'ajoute en double.
    title: { absolute: `${title} | NucleAtlas` },
    description:
      excerpt ||
      `Découvrez l'article "${title}" sur NucleAtlas, encyclopédie collaborative de médecine nucléaire.`,
    keywords: tags,
    authors: authors.map((name) => ({ name })),
    openGraph: {
      title,
      description: excerpt,
      type: 'article',
      siteName: 'NucleAtlas',
      locale: 'fr_FR',
      url: base ? `${base.origin}/articles/${id}` : undefined,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: excerpt,
    },
    alternates: {
      canonical: base ? `${base.origin}/articles/${id}` : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const data = await getArticleDoc(id);
  const article = data ? articleFromDocData(data) : null;

  const updatedAt = data?.updatedAt as { toDate?: () => Date } | undefined;
  const createdAt = data?.createdAt as { toDate?: () => Date } | undefined;

  // JSON-LD pour SERP médicale + Knowledge Graph.
  // IMPORTANT (honnêteté éditoriale) : on garde le type MedicalWebPage mais on
  // NE revendique AUCUNE relecture médicale humaine. Ne PAS ajouter ici de
  // `reviewedBy` / `reviewer` / `lastReviewed` tant que le contenu n'est pas
  // réellement relu par un médecin identifié — ce serait une fausse allégation.
  // Le champ `author` reflète seulement la rédaction (assistée par IA), pas une
  // validation médicale.
  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: article.title,
        description: article.excerpt,
        about: article.catLabel,
        inLanguage: 'fr',
        author:
          article.authors && article.authors.length > 0
            ? article.authors.map((name) => ({ '@type': 'Person', name }))
            : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'NucleAtlas',
        },
        dateModified: updatedAt?.toDate ? updatedAt.toDate().toISOString() : undefined,
        datePublished: createdAt?.toDate ? createdAt.toDate().toISOString() : undefined,
        keywords: article.tags?.join(', '),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // Le contenu vient de notre serveur, valeurs simples — sécurisé.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ArticleView article={article ?? undefined} />
    </>
  );
}
