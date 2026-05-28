import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb, HttpError, getAuthFromRequest } from '@/lib/firebase-admin';
import { rateLimit } from '@/lib/rate-limit';
import { contactMessageSchema } from '@/lib/schemas';
import { json, parseBody, withErrorHandling } from '@/lib/http';

export const runtime = 'nodejs';

function clientKey(req: Request, uid?: string | null) {
  if (uid) return `contact:uid:${uid}`;
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';
  return `contact:ip:${ip}`;
}

export const POST = withErrorHandling(async (req: Request) => {
  const auth = await getAuthFromRequest(req);

  const rl = await rateLimit({
    key: clientKey(req, auth?.uid),
    limit: 5,
    windowSec: 3600,
  });
  if (!rl.allowed) {
    throw new HttpError(429, 'Trop de messages envoyés récemment. Réessaie dans une heure.');
  }

  const data = await parseBody(req, contactMessageSchema);

  // Honeypot anti-bot : champ caché qui doit rester vide.
  if (data.honeypot && data.honeypot.length > 0) {
    return json({ ok: true });
  }

  const userAgent = req.headers.get('user-agent') || 'unknown';
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null;

  await getAdminDb()
    .collection('contact_messages')
    .add({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      authorUid: auth?.uid ?? null,
      authorEmail: auth?.email ?? null,
      status: 'new',
      userAgent: userAgent.slice(0, 500),
      ip: ip ? ip.slice(0, 64) : null,
      createdAt: FieldValue.serverTimestamp(),
    });

  return json({ ok: true });
});
