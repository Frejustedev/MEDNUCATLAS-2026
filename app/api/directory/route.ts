import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, HttpError, getAuthFromRequest } from '@/lib/firebase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { directoryEntrySchema } from '@/lib/schemas';
import { json, parseBody, withErrorHandling } from '@/lib/http';

export const runtime = 'nodejs';

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

export const GET = withErrorHandling(async (_req: Request) => {
  // Lecture publique des entrées vérifiées uniquement.
  const snapshot = await getAdminDb()
    .collection('directory_entries')
    .where('verified', '==', true)
    .get();

  const entries = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return json({ entries });
});
