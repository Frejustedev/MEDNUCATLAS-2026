import type { MetadataRoute } from 'next';
import { getAdminDb } from '@/lib/firebase-admin';
import { MENU_STRUCTURE } from '@/lib/data';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export const revalidate = 3600; // re-build sitemap toutes les heures

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${APP_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${APP_URL}/home`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${APP_URL}/categories/all`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/categories/index`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${APP_URL}/annuaire`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${APP_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${APP_URL}/contribuer`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${APP_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = MENU_STRUCTURE.flatMap((section) =>
    section.items
      .filter(
        (item) =>
          !['dashboard', 'favorites', 'about', 'contact', 'annuaire'].includes(item.id)
      )
      .map((item) => ({
        url: `${APP_URL}/categories/${item.id}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }))
  );

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const snap = await getAdminDb().collection('articles').get();
    articleRoutes = snap.docs.map((d) => {
      const data = d.data() as { updatedAt?: { toDate?: () => Date } };
      return {
        url: `${APP_URL}/articles/${d.id}`,
        lastModified: data.updatedAt?.toDate ? data.updatedAt.toDate() : now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      };
    });
  } catch (err) {
    console.error('[sitemap] articles fetch failed', err);
  }

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
