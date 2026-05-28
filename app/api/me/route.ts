import { getUserRole, requireAuth } from '@/lib/firebase-admin';
import { json, withErrorHandling } from '@/lib/http';

export const runtime = 'nodejs';

export const GET = withErrorHandling(async (req: Request) => {
  const ctx = await requireAuth(req);
  const role = await getUserRole(ctx.uid);
  return json({
    uid: ctx.uid,
    email: ctx.email,
    emailVerified: ctx.emailVerified,
    role: role ?? 'patient',
    isAdmin: role === 'admin',
    isEditor: role === 'admin' || role === 'medecin_nuc',
  });
});
