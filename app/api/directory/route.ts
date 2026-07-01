import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import { getAdminDb, HttpError, getAuthFromRequest } from '@/lib/firebase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { directoryEntrySchema } from '@/lib/schemas';
import { json, parseBody, withErrorHandling } from '@/lib/http';
import { INITIAL_DIRECTORY, type DirectoryEntry } from '@/lib/directory';

export const runtime = 'nodejs';
// Voir /api/articles : on NE prérend PAS ce point d'API au build (éviterait une
// lecture Firestore pendant `next build`). Le plafonnement des lectures vient
// d'unstable_cache + du header Cache-Control CDN.
export const dynamic = 'force-dynamic';

export const POST = withErrorHandling(async (req: Request) => {
  const auth = await getAuthFromRequest(req);

  const key = auth?.uid
    ? `directory:uid:${auth.uid}`
    : `directory:ip:${
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      }`;

  const rl = await rateLimit({ key, limit: 5, windowSec: 3600 });
  if (!rl.allowed) {
    throw new HttpError(429, 'Trop de soumissions récentes. Réessaie dans une heure.');
  }

  const data = await parseBody(req, directoryEntrySchema);

  await getAdminDb()
    .collection('directory_entries')
    .add({
      ...data,
      verified: false,
      status: 'pending',
      submittedByUid: auth?.uid ?? null,
      submittedByEmail: auth?.email ?? null,
      createdAt: FieldValue.serverTimestamp(),
    });

  return json({ ok: true });
});

// LISTE BLANCHE des champs exposés publiquement. Le document Firestore contient
// aussi submittedByUid / submittedByEmail / status — des données PERSONNELLES et
// internes qui ne DOIVENT jamais sortir de cet endpoint public non authentifié
// (RGPD + vecteur de spam/phishing). On ne renvoie donc QUE les champs suivants.
function toPublicEntry(id: string, data: Record<string, unknown>): DirectoryEntry {
  return {
    id,
    type: (data.type as DirectoryEntry['type']) ?? 'center',
    name: (data.name as string) ?? '',
    country: (data.country as string) ?? '',
    city: (data.city as string) ?? '',
    address: (data.address as string) || undefined,
    phone: (data.phone as string) || undefined,
    email: (data.email as string) || undefined,
    website: (data.website as string) || undefined,
    description: (data.description as string) || undefined,
    equipment: (data.equipment as string[]) || undefined,
    verified: data.verified === true,
    imageUrl: (data.imageUrl as string) || undefined,
  };
}

// Lecture publique des entrées vérifiées uniquement, MISE EN CACHE 1 h.
// Auparavant : lecture Firestore complète à CHAQUE requête anonyme (aucun cache,
// aucun rate-limit) → un pic de trafic ou un script pouvait épuiser le quota
// gratuit de lectures, exactement comme lors de la panne de juin 2026 (et le
// backend est partagé avec RadCalc Pro → les deux apps tombent ensemble).
const getVerifiedEntries = unstable_cache(
  async (): Promise<DirectoryEntry[]> => {
    const snapshot = await getAdminDb()
      .collection('directory_entries')
      .where('verified', '==', true)
      .get();
    return snapshot.docs.map((d) => toPublicEntry(d.id, d.data() as Record<string, unknown>));
  },
  ['directory-verified-v1'],
  { revalidate: 3600, tags: ['directory'] }
);

export async function GET() {
  try {
    const entries = await getVerifiedEntries();
    return NextResponse.json(
      { entries },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } }
    );
  } catch (err) {
    // Firestore indisponible (quota épuisé, etc.) : on sert l'annuaire statique
    // curé embarqué dans l'app pour rester consultable, comme /api/articles.
    console.error('[api/directory] Firestore indisponible → repli sur annuaire statique:', err);
    return NextResponse.json(
      { entries: INITIAL_DIRECTORY, fallback: true },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400' } }
    );
  }
}
