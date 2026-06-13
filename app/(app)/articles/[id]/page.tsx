import React from 'react';
import { ArticleView } from '@/components/ArticleView';
import { Metadata } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';

type Params = { id: string };

async function getArticleSummary(id: string) {
  try {
    const snap = await getAdminDb().collection('articles').doc(id).get();
    if (!snap.exists) return null;
    const data = snap.data() as Record<string, unknown>;
    return {
      title: (data.title as string) || 'Article',
      excerpt: (data.excerpt as string) || '',
      cat: (data.cat as string) || '',
      catLabel: (data.catLabel as string) || '',
      tags: (data.tags as string[]) || [],
      authors: (data.authors as string[]) || [],
      difficulty: (data.difficulty as string) || '',
      updatedAt: data.updatedAt as { toDate?: () => Date } | undefined,
      createdAt: data.createdAt as { toDate?: () => Date } | undefined,
    };
  } catch (err) {
    console.error('[articles/[id]] metadata fetch error:', err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleSummary(id);
  const base = process.env.APP_URL ? new URL(process.env.APP_URL) : undefined;

  if (!article) {
    return {
      metadataBase: base,
      title: { absolute: 'Article introuvable | NucleAtlas' },
      description: 'Article non trouvé sur NucleAtlas.',
      robots: { index: false, follow: true },
    };
  }

  return {
    metadataBase: base,
    // Titre absolu : on évite que le template "%s | NucleAtlas" du layout racine s'ajoute en double.
    title: { absolute: `${article.title} | NucleAtlas` },
    description:
      article.excerpt ||
      `Découvrez l'article "${article.title}" sur NucleAtlas, encyclopédie collaborative de médecine nucléaire.`,
    keywords: article.tags,
    authors: article.authors.map((name) => ({ name })),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      siteName: 'NucleAtlas',
      locale: 'fr_FR',
      url: base ? `${base.origin}/articles/${id}` : undefined,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: base ? `${base.origin}/articles/${id}` : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const article = await getArticleSummary(id);

  // JSON-LD pour SERP médicale + Knowledge Graph
  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        name: article.title,
        description: article.excerpt,
        about: article.catLabel,
        inLanguage: 'fr',
        author: article.authors.length > 0 ? article.authors.map((name) => ({ '@type': 'Person', name })) : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'NucleAtlas',
        },
        dateModified: article.updatedAt?.toDate ? article.updatedAt.toDate().toISOString() : undefined,
        datePublished: article.createdAt?.toDate ? article.createdAt.toDate().toISOString() : undefined,
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
      <ArticleView />
    </>
  );
}
