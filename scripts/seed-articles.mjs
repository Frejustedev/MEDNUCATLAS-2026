#!/usr/bin/env node
/**
 * Seed des articles V2 dans Firestore via Firebase Admin SDK.
 * Lit le service account depuis .env.local (FIREBASE_SERVICE_ACCOUNT_B64).
 * Les articles sont marqués reviewStatus: 'ai_assisted' et préfixés V2_
 * pour coexister avec l'ancien contenu (comparaison).
 *
 * Usage : node scripts/seed-articles.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { Buffer } from 'node:buffer';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { articles as batch1 } from './content/batch1.mjs';
import { articles as batch2 } from './content/batch2.mjs';
import { articles as batch3 } from './content/batch3.mjs';
import { articles as batch4 } from './content/batch4.mjs';
import { articles as batch5 } from './content/batch5.mjs';
import { articles as batch6 } from './content/batch6.mjs';
import { articles as batch7 } from './content/batch7.mjs';
import { articles as batch8 } from './content/batch8.mjs';
import { articles as batch9 } from './content/batch9.mjs';
import { articles as batch10 } from './content/batch10.mjs';
import { articles as batch11 } from './content/batch11.mjs';

const articles = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7, ...batch8, ...batch9, ...batch10, ...batch11];

const DRY = process.argv.includes('--dry');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const ENV_LOCAL = path.join(ROOT, '.env.local');

function readEnv(name) {
  const c = fs.readFileSync(ENV_LOCAL, 'utf8');
  const m = c.match(new RegExp(`^${name}="?([^"\\n]+)"?$`, 'm'));
  return m ? m[1] : null;
}

function log(...m) { console.log('[seed]', ...m); }
function fail(m) { console.error('[seed] ERREUR :', m); process.exit(1); }

const SA_B64 = readEnv('FIREBASE_SERVICE_ACCOUNT_B64');
const PROJECT_ID = readEnv('FIREBASE_PROJECT_ID');
const DATABASE_ID = readEnv('FIREBASE_FIRESTORE_DATABASE_ID') || '(default)';
if (!SA_B64) fail('FIREBASE_SERVICE_ACCOUNT_B64 manquant dans .env.local');

const sa = JSON.parse(Buffer.from(SA_B64, 'base64').toString('utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: sa.project_id,
      clientEmail: sa.client_email,
      privateKey: sa.private_key.replace(/\\n/g, '\n'),
    }),
    projectId: PROJECT_ID || sa.project_id,
  });
}

const db = getFirestore(getApps()[0], DATABASE_ID);
db.settings({ ignoreUndefinedProperties: true });

function validate(a) {
  const errs = [];
  if (!a.id || !/^[A-Za-z0-9_-]+$/.test(a.id)) errs.push('id invalide');
  if (!a.title || a.title.length < 3) errs.push('titre trop court');
  if (!a.cat) errs.push('catégorie manquante');
  if (!a.content || !a.content.lead) errs.push('content.lead manquant');
  // On exige des sections seulement pour les profils ciblés (targetAudience).
  const modes = (a.targetAudience && a.targetAudience.length ? a.targetAudience : ['patient', 'medecin_non_nuc', 'medecin_nuc'])
    .filter((m) => m !== 'admin');
  for (const mode of modes) {
    if (!a.content?.[mode]?.sections?.length) errs.push(`mode ${mode} sans sections`);
  }
  return errs;
}

(async () => {
  log(`Projet ${PROJECT_ID} / base ${DATABASE_ID}`);
  log(`${articles.length} article(s) à traiter${DRY ? ' (DRY RUN)' : ''}`);

  for (const a of articles) {
    const errs = validate(a);
    if (errs.length) {
      log(`✗ ${a.id} ignoré : ${errs.join(', ')}`);
      continue;
    }
    const payload = {
      id: a.id,
      cat: a.cat,
      catLabel: a.catLabel ?? '',
      title: a.title,
      tags: a.tags ?? [],
      difficulty: a.difficulty ?? 'fondamental',
      excerpt: a.excerpt ?? (a.content.lead || '').replace(/[*_#`]/g, '').slice(0, 240),
      targetAudience: a.targetAudience ?? ['patient', 'medecin_non_nuc', 'medecin_nuc'],
      authors: a.authors ?? [],
      sources: a.sources ?? [],
      reviewStatus: a.reviewStatus ?? 'ai_assisted',
      // Stocké en JSON string : Firestore interdit les tableaux imbriqués
      // (les tableaux `rows` des tables sont des string[][]). Le chemin de
      // lecture (AtlasContext) parse déjà les deux formats.
      content: JSON.stringify(a.content),
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      authorId: 'seed',
    };

    const bytes = Buffer.byteLength(JSON.stringify(payload));
    if (DRY) {
      log(`• ${a.id} — OK (${(bytes / 1024).toFixed(1)} Ko) — « ${a.title} »`);
      continue;
    }
    try {
      await db.collection('articles').doc(a.id).set(payload, { merge: false });
      log(`✓ ${a.id} écrit (${(bytes / 1024).toFixed(1)} Ko)`);
    } catch (e) {
      log(`✗ ${a.id} échec : ${e.message}`);
    }
  }

  log(DRY ? 'Dry run terminé.' : 'Seed terminé.');
  process.exit(0);
})().catch((e) => fail(e.stack || e.message));
