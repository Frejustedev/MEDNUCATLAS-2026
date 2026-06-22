import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeAll, afterAll, beforeEach, describe, it } from 'vitest';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Test des règles Firestore via l'émulateur (lancé par `npm run test:rules`).
// C'est CE test qui aurait attrapé l'incident : des règles déployées par erreur
// ont retiré la lecture publique des articles et tout cassé.

const EMU = process.env.FIRESTORE_EMULATOR_HOST ?? '127.0.0.1:8080';
const [host, port] = EMU.split(':');

let env: RulesTestEnvironment;

const validArticle = (id: string, authorId: string) => ({
  id,
  cat: 'oncologie',
  title: 'Article de test valide',
  content: '{}',
  authorId,
});

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-nucleatlas',
    firestore: {
      rules: readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8'),
      host,
      port: Number(port),
    },
  });
});

afterAll(async () => {
  await env.cleanup();
});

beforeEach(async () => {
  await env.clearFirestore();
  // Pré-remplissage hors règles : un article + des profils utilisateurs.
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'articles/SEED'), { id: 'SEED', cat: 'oncologie', title: 'Seed', content: '{}' });
    await setDoc(doc(db, 'users/patient1'), { uid: 'patient1', email: 'p@e.com', role: 'patient' });
    await setDoc(doc(db, 'users/editor1'), { uid: 'editor1', email: 'e@e.com', role: 'medecin_nuc' });
  });
});

describe('Règles Firestore — articles', () => {
  it('lecture publique autorisée (visiteur non authentifié)', async () => {
    const anon = env.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(anon, 'articles/SEED')));
  });

  it('création refusée pour un visiteur non authentifié', async () => {
    const anon = env.unauthenticatedContext().firestore();
    await assertFails(setDoc(doc(anon, 'articles/NEW'), validArticle('NEW', 'anon')));
  });

  it('création refusée pour un utilisateur sans rôle éditeur (patient)', async () => {
    const db = env.authenticatedContext('patient1').firestore();
    await assertFails(setDoc(doc(db, 'articles/NEW'), validArticle('NEW', 'patient1')));
  });

  it('création autorisée pour un éditeur (medecin_nuc)', async () => {
    const db = env.authenticatedContext('editor1').firestore();
    await assertSucceeds(setDoc(doc(db, 'articles/NEW'), validArticle('NEW', 'editor1')));
  });
});

describe('Règles Firestore — escalade de privilège', () => {
  it("un patient ne peut pas s'auto-promouvoir admin", async () => {
    const db = env.authenticatedContext('patient1').firestore();
    await assertFails(
      setDoc(doc(db, 'users/patient1'), { uid: 'patient1', email: 'p@e.com', role: 'admin' }, { merge: true })
    );
  });
});
