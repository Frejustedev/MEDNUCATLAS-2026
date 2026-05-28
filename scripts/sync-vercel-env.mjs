#!/usr/bin/env node
/**
 * Synchronise les variables d'environnement de .env.local vers Vercel
 * via l'API REST officielle. Utilise le token Vercel CLI.
 *
 * Usage : node scripts/sync-vercel-env.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import https from 'node:https';
import dns from 'node:dns';
import { Buffer } from 'node:buffer';

dns.setDefaultResultOrder('ipv4first');
const httpsAgent = new https.Agent({ family: 4, keepAlive: true, timeout: 30000 });

const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const ENV_LOCAL = path.join(PROJECT_ROOT, '.env.local');
const VERCEL_PROJECT_JSON = path.join(PROJECT_ROOT, '.vercel', 'project.json');

function log(...m) { console.log('[vercel-env]', ...m); }
function fail(m) { console.error('[vercel-env] ERREUR :', m); process.exit(1); }

function getVercelToken() {
  const candidates = [
    path.join(os.homedir(), 'AppData', 'Roaming', 'com.vercel.cli', 'Data', 'auth.json'),
    path.join(os.homedir(), '.local', 'share', 'com.vercel.cli', 'auth.json'),
    path.join(os.homedir(), 'Library', 'Application Support', 'com.vercel.cli', 'auth.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const j = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (j.token) return j.token;
    }
  }
  fail('Token Vercel introuvable. Lance "vercel login".');
}

function readEnvLocal() {
  if (!fs.existsSync(ENV_LOCAL)) fail('.env.local introuvable.');
  const lines = fs.readFileSync(ENV_LOCAL, 'utf8').split(/\r?\n/);
  const vars = {};
  for (const line of lines) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=("?)([^]*?)\2\s*$/);
    if (m) vars[m[1]] = m[3];
  }
  return vars;
}

function readVercelProject() {
  if (!fs.existsSync(VERCEL_PROJECT_JSON)) {
    fail('.vercel/project.json introuvable. Lance "vercel link --yes --project mednucatlas-2026".');
  }
  return JSON.parse(fs.readFileSync(VERCEL_PROJECT_JSON, 'utf8'));
}

const TOKEN = getVercelToken();
const project = readVercelProject();
const PROJECT_ID = project.projectId;
const TEAM_ID = project.orgId; // teamId est utilisé même pour les comptes personnels

function httpRequest(method, urlPath, body) {
  const url = `https://api.vercel.com${urlPath}${urlPath.includes('?') ? '&' : '?'}teamId=${encodeURIComponent(TEAM_ID)}`;
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = body ? JSON.stringify(body) : undefined;
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/json',
    };
    if (data) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(data);
    }
    const req = https.request({
      method,
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers,
      family: 4,
      agent: httpsAgent,
      timeout: 30000,
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => (chunks += c));
      res.on('end', () => {
        if (!chunks) return resolve({ statusCode: res.statusCode });
        try {
          const j = JSON.parse(chunks);
          j.__statusCode = res.statusCode;
          resolve(j);
        } catch {
          resolve({ statusCode: res.statusCode, raw: chunks });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('timeout')));
    if (data) req.write(data);
    req.end();
  });
}

async function listExistingEnv() {
  const res = await httpRequest('GET', `/v10/projects/${PROJECT_ID}/env`);
  if (res.__statusCode >= 400) fail('list env échec : ' + JSON.stringify(res));
  return res.envs || [];
}

async function deleteEnvById(id) {
  const res = await httpRequest('DELETE', `/v10/projects/${PROJECT_ID}/env/${id}`);
  if (res.__statusCode >= 400) log(`⚠ delete ${id} : ${res.error?.message || res.__statusCode}`);
}

async function createEnv(key, value, target = ['production', 'preview', 'development']) {
  const res = await httpRequest('POST', `/v10/projects/${PROJECT_ID}/env`, {
    key,
    value,
    target,
    type: 'encrypted',
  });
  if (res.__statusCode >= 400) {
    log(`⚠ create ${key} échec : ${res.error?.message || JSON.stringify(res)}`);
    return false;
  }
  log(`✓ ${key} (cible: ${target.join(',')})`);
  return true;
}

(async () => {
  log(`Projet Vercel : ${PROJECT_ID}`);
  log(`Team : ${TEAM_ID}`);

  const envFromFile = readEnvLocal();
  // Filtrer les vars utiles (server-only)
  const keysToPush = [
    'GEMINI_API_KEY',
    'GEMINI_MODEL_GENERATE',
    'GEMINI_MODEL_CHAT',
    'FIREBASE_SERVICE_ACCOUNT_B64',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_FIRESTORE_DATABASE_ID',
    'APP_URL',
    'ADMIN_NOTIFICATION_EMAIL',
  ].filter((k) => envFromFile[k] && envFromFile[k].trim().length > 0);

  // APP_URL : remplace localhost par le domaine de prod
  if (envFromFile.APP_URL?.includes('localhost')) {
    envFromFile.APP_URL = 'https://nucleatlas.org';
    log('APP_URL remplacé par https://nucleatlas.org pour Vercel.');
  }

  log(`Variables à synchroniser : ${keysToPush.join(', ')}`);

  const existing = await listExistingEnv();
  log(`Variables existantes sur Vercel : ${existing.length}`);

  // Supprime les anciennes versions des clés qu'on va re-pousser (idempotent)
  for (const k of keysToPush) {
    const matches = existing.filter((e) => e.key === k);
    for (const m of matches) {
      log(`Suppression de l'ancienne valeur pour ${k} (id ${m.id})…`);
      await deleteEnvById(m.id);
    }
  }

  for (const k of keysToPush) {
    await createEnv(k, envFromFile[k]);
  }

  log('');
  log('✓ Variables synchronisées.');
  log('  → Redéploie pour les rendre effectives : `vercel --prod` ou git push.');
})().catch((e) => fail(e.stack || e.message));
