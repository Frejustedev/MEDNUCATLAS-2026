import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, HttpError, requireAuth, requireAdmin } from '@/lib/firebase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { roleRequestSchema } from '@/lib/schemas-extra';
import { json, parseBody, withErrorHandling } from '@/lib/http';

export const runtime = 'nodejs';

export const POST = withErrorHandling(async (req: Request) => {
  const ctx = await requireAuth(req);
  const data = await parseBody(req, roleRequestSchema);

  const rl = await rateLimit({ key: `rolereq:${ctx.uid}`, limit: 2, windowSec: 24 * 3600 });
  if (!rl.allowed) {
    throw new HttpError(429, 'Tu as déjà soumis trop de demandes aujourd\'hui.');
  }

  const db = getAdminDb();

  // Vérifier qu'il n'y a pas déjà une demande pending pour ce user
  const existing = await db
    .collection('role_requests')
    .where('uid', '==', ctx.uid)
    .where('status', '==', 'pending')
    .limit(1)
    .get();
  if (!existing.empty) {
    throw new HttpError(409, "Tu as déjà une demande en attente.");
  }

  await db.collection('role_requests').add({
    uid: ctx.uid,
    email: ctx.email ?? '',
    requestedRole: data.requestedRole,
    justification: data.justification,
    status: 'pending',
    createdAt: FieldValue.serverTimestamp(),
  });

  return json({ ok: true });
});

// Lecture par admin (liste des demandes en attente)
export const GET = withErrorHandling(async (req: Request) => {
  await requireAdmin(req);

  const snap = await getAdminDb()
    .collection('role_requests')
    .where('status', '==', 'pending')
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();

  const requests = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      uid: data.uid,
      email: data.email,
      requestedRole: data.requestedRole,
      justification: data.justification,
      status: data.status,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
    };
  });

  return json({ requests });
});

// Approbation/refus admin
export const PATCH = withErrorHandling(async (req: Request) => {
  const ctx = await requireAdmin(req);
  const body = (await req.json()) as { id?: unknown; action?: unknown; comment?: unknown };
  if (typeof body.id !== 'string' || (body.action !== 'approve' && body.action !== 'reject')) {
    throw new HttpError(400, 'Paramètres invalides');
  }

  const db = getAdminDb();
  const ref = db.collection('role_requests').doc(body.id);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpError(404, 'Demande introuvable');
  const reqData = snap.data() as { uid: string; requestedRole: string; status: string };

  if (reqData.status !== 'pending') {
    throw new HttpError(409, 'Demande déjà traitée');
  }

  await db.runTransaction(async (tx) => {
    tx.update(ref, {
      status: body.action === 'approve' ? 'approved' : 'rejected',
      reviewedAt: FieldValue.serverTimestamp(),
      reviewedBy: ctx.uid,
      comment: typeof body.comment === 'string' ? body.comment.slice(0, 1000) : '',
    });
    if (body.action === 'approve') {
      tx.update(db.collection('users').doc(reqData.uid), {
        role: reqData.requestedRole,
      });
    }
  });

  return json({ ok: true });
});
