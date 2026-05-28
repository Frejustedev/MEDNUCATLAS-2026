import 'server-only';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDb } from './firebase-admin';

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Rate-limiter token-bucket simple stocké dans Firestore.
 * Suffisant pour les routes IA à faible trafic. Pour du trafic intense,
 * brancher Upstash Redis via les variables UPSTASH_REDIS_REST_URL/TOKEN.
 */
export async function rateLimit(opts: {
  key: string;
  limit: number;
  windowSec: number;
}): Promise<RateLimitResult> {
  const { key, limit, windowSec } = opts;
  const db = getAdminDb();
  const ref = db.collection('rate_limits').doc(encodeURIComponent(key));
  const now = Date.now();

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data() as { count?: number; resetAt?: number } | undefined;
    if (!data || !data.resetAt || data.resetAt < now) {
      const resetAt = now + windowSec * 1000;
      tx.set(ref, { count: 1, resetAt, updatedAt: FieldValue.serverTimestamp() });
      return { allowed: true, remaining: limit - 1, resetAt };
    }
    if ((data.count ?? 0) >= limit) {
      return { allowed: false, remaining: 0, resetAt: data.resetAt };
    }
    tx.update(ref, { count: FieldValue.increment(1), updatedAt: FieldValue.serverTimestamp() });
    return { allowed: true, remaining: limit - (data.count ?? 0) - 1, resetAt: data.resetAt };
  });

  return result;
}
