import 'server-only';
import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import firebaseConfig from '../firebase-applet-config.json';

let adminApp: App | undefined;

function getServiceAccount() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (!b64) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_B64 manquant. Générer une clé de compte de service Firebase ' +
        'et l\'encoder en base64 dans .env.local. Voir .env.example.'
    );
  }
  try {
    const json = Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(json) as { project_id: string; client_email: string; private_key: string };
  } catch (err) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_B64 illisible. Vérifie l\'encodage base64 du JSON de service account.'
    );
  }
}

export function getAdminApp(): App {
  if (adminApp) return adminApp;
  const existing = getApps()[0];
  if (existing) {
    adminApp = existing;
    return adminApp;
  }
  const sa = getServiceAccount();
  adminApp = initializeApp({
    credential: cert({
      projectId: sa.project_id,
      clientEmail: sa.client_email,
      privateKey: sa.private_key.replace(/\\n/g, '\n'),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  });
  return adminApp;
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  const databaseId =
    process.env.FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId || '(default)';
  return getFirestore(getAdminApp(), databaseId);
}

export type AuthContext = {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  token: DecodedIdToken;
};

export async function verifyIdToken(idToken: string): Promise<AuthContext> {
  const decoded = await getAdminAuth().verifyIdToken(idToken, true);
  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    emailVerified: decoded.email_verified ?? false,
    token: decoded,
  };
}

export async function getAuthFromRequest(req: Request): Promise<AuthContext | null> {
  const header = req.headers.get('authorization') ?? req.headers.get('Authorization');
  if (!header || !header.toLowerCase().startsWith('bearer ')) return null;
  const idToken = header.slice(7).trim();
  if (!idToken) return null;
  try {
    return await verifyIdToken(idToken);
  } catch {
    return null;
  }
}

export async function getUserRole(uid: string): Promise<string | null> {
  const snap = await getAdminDb().collection('users').doc(uid).get();
  if (!snap.exists) return null;
  const data = snap.data() as { role?: string } | undefined;
  return data?.role ?? null;
}

export async function requireAuth(req: Request): Promise<AuthContext> {
  const ctx = await getAuthFromRequest(req);
  if (!ctx) throw new HttpError(401, 'Non authentifié');
  return ctx;
}

export async function requireAdmin(req: Request): Promise<AuthContext> {
  const ctx = await requireAuth(req);
  const role = await getUserRole(ctx.uid);
  if (role !== 'admin') throw new HttpError(403, 'Accès administrateur requis');
  return ctx;
}

export async function requireEditor(req: Request): Promise<AuthContext> {
  const ctx = await requireAuth(req);
  const role = await getUserRole(ctx.uid);
  if (role !== 'admin' && role !== 'medecin_nuc') {
    throw new HttpError(403, 'Accès éditeur requis');
  }
  return ctx;
}

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}
