import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getAdminDb } from '@/lib/firebase-admin';
import snapshotList from '@/lib/articles-snapshot-list.json';

// Liste LÉGÈRE des articles pour les vues client (catégories, index, recherche,
// favoris, cartes). Lue via l'Admin SDK côté serveur et MISE EN CACHE 1 h
// (unstable_cache + revalidate ISR + Cache-Control CDN).
//
// Pourquoi : auparavant, AtlasContext lisait TOUTE la collection `articles`
// depuis le client (getDocs) à chaque montage de page et pour chaque visiteur.
// Avec ~70 articles, cela faisait ~70 lectures Firestore par navigation × par
// visiteur, ce qui a épuisé le quota GRATUIT de 50 000 lectures/jour (site KO,
// « Impossible de charger les articles »). En passant par ce point d'API mis en
// cache, Firestore n'est lu au plus qu'une fois par heure et par instance,
// quel que soit le trafic (~70 × 24 = ~1 680 lectures/jour au pire, en pratique
// bien moins grâce au cache CDN). Le CONTENU complet n'est pas renvoyé ici : la
// page article est rendue côté serveur (ISR) séparément.
//
// `force-dynamic` : on NE veut PAS que Next prérende ce point d'API au build
// (cela exécuterait la lecture Firestore pendant `next build` et pourrait figer
// un 503 pendant 1 h). Le plafonnement réel des lectures vient de
// `unstable_cache` (≈ 1 lecture Firestore/heure/instance) ; l'en-tête
// Cache-Control assure en plus la mise en cache CDN (edge) des réponses.
export const dynamic = 'force-dynamic';

type ArticleListItem = {
  id: string;
  cat: string;
  catLabel: string;
  title: string;
  excerpt: string;
  tags: string[];
  difficulty: string;
  targetAudience: string[];
  authors: string[];
  reviewStatus: string;
};

const getArticlesList = unstable_cache(
  async (): Promise<ArticleListItem[]> => {
    const snap = await getAdminDb().collection('articles').get();
    return snap.docs.map((d) => {
      const x = d.data() as Record<string, unknown>;
      return {
        id: (x.id as string) || d.id,
        cat: (x.cat as string) || '',
        catLabel: (x.catLabel as string) || '',
        title: (x.title as string) || '',
        excerpt: (x.excerpt as string) || '',
        tags: (x.tags as string[]) || [],
        difficulty: (x.difficulty as string) || 'fondamental',
        targetAudience:
          (x.targetAudience as string[]) || ['medecin_nuc', 'medecin_non_nuc', 'patient'],
        authors: (x.authors as string[]) || [],
        reviewStatus: (x.reviewStatus as string) || 'ai_assisted',
      };
    });
  },
  ['articles-list-v1'],
  { revalidate: 3600, tags: ['articles'] }
);

export async function GET() {
  try {
    const articles = await getArticlesList();
    return NextResponse.json(
      { articles },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    // Firestore indisponible (typiquement quota gratuit de lectures épuisé — la
    // base AI Studio est plafonnée au tier gratuit). On sert l'INSTANTANÉ
    // STATIQUE du catalogue embarqué dans l'app pour que le site reste
    // consultable (listes/recherche/cartes) au lieu de renvoyer une erreur.
    console.error('[api/articles] Firestore indisponible → repli sur instantané statique:', err);
    return NextResponse.json(
      { articles: snapshotList, fallback: true },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400' } }
    );
  }
}
