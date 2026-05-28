#!/usr/bin/env node
/**
 * Bootstrap NucleAtlas — automation totale :
 *  1. Récupère le token Firebase CLI
 *  2. Crée (ou récupère) un service account "nucleatlas-server"
 *  3. Lui accorde les rôles Firebase Admin + Firestore User
 *  4. Génère une clé JSON et l'encode base64 dans .env.local
 *  5. Promeut l'utilisateur connecté en admin (Firestore doc users/{uid})
 *
 * Usage :  node scripts/bootstrap.mjs [--project <projectId>] [--admin-email <email>]
 */

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import https from 'node:https';
import dns from 'node:dns';
import { Buffer } from 'node:buffer';

// Force IPv4 — évite les ETIMEDOUT sur Windows quand IPv6 ne route pas
dns.setDefaultResultOrder('ipv4first');
const httpsAgent = new https.Agent({ family: 4, keepAlive: true, timeout: 30000 });

const args = process.argv.slice(2);
function getArg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  if (i !== -1 && args[i + 1]) return args[i + 1];
  return fallback;
}

const PROJECT_ID = getArg('project', 'gen-lang-client-0346429614');
const DATABASE_ID = getArg('database', 'ai-studio-77e401c9-98b2-4e02-9088-8a3ea6d17150');
const SA_ACCOUNT_ID = getArg('sa-id', 'nucleatlas-server');
const SA_DISPLAY = 'NucleAtlas Server';
const ROLES = ['roles/firebase.admin', 'roles/datastore.user'];
const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const ENV_LOCAL = path.join(PROJECT_ROOT, '.env.local');

function log(...m) { console.log('[bootstrap]', ...m); }
function fail(msg, code = 1) { console.error('[bootstrap] ERREUR :', msg); process.exit(code); }

function readFirebaseTokens() {
  const candidates = [
    path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json'),
    path.join(os.homedir(), 'AppData', 'Roaming', 'configstore', 'firebase-tools.json'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (raw?.tokens?.access_token) return raw.tokens;
    }
  }
  fail('Aucun token Firebase trouvé. Lance "npx firebase login" et relance ce script.');
}

let TOKENS = readFirebaseTokens();

async function refreshIfNeeded() {
  if (TOKENS.expires_at && TOKENS.expires_at > Date.now() + 60_000) return;
  if (!TOKENS.refresh_token) fail('Token expiré et pas de refresh_token disponible.');
  log('Token expiré, refresh…');
  // Firebase CLI utilise client_id officiel
  const clientId = '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com';
  const clientSecret = 'j9iVZfS8kkCEFUPaAeJV0sAi';
  const body = new URLSearchParams({
    refresh_token: TOKENS.refresh_token,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
  }).toString();
  const res = await httpRequest('POST', 'https://oauth2.googleapis.com/token', body, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  if (!res.access_token) fail('Refresh OAuth a échoué : ' + JSON.stringify(res));
  TOKENS.access_token = res.access_token;
  TOKENS.expires_at = Date.now() + res.expires_in * 1000;
}

async function httpRequestWithRetry(method, url, body, extraHeaders = {}, useAuth = false, retries = 4) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await httpRequestOnce(method, url, body, extraHeaders, useAuth);
    } catch (err) {
      lastErr = err;
      log(`HTTP retry ${attempt}/${retries} (${err.code || err.message})`);
      if (attempt < retries) await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastErr;
}

function httpRequest(method, url, body, extraHeaders = {}, useAuth = false) {
  return httpRequestWithRetry(method, url, body, extraHeaders, useAuth);
}

function httpRequestOnce(method, url, body, extraHeaders = {}, useAuth = false) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      Accept: 'application/json',
      ...extraHeaders,
    };
    if (useAuth) headers.Authorization = `Bearer ${TOKENS.access_token}`;
    if (body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
    const data = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined;
    if (data) headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request(
      {
        method,
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers,
        family: 4,
        agent: httpsAgent,
        timeout: 30000,
      },
      (res) => {
        let chunks = '';
        res.on('data', (c) => (chunks += c));
        res.on('end', () => {
          if (!chunks) return resolve({ statusCode: res.statusCode });
          try {
            const parsed = JSON.parse(chunks);
            parsed.__statusCode = res.statusCode;
            resolve(parsed);
          } catch {
            resolve({ statusCode: res.statusCode, raw: chunks });
          }
        });
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error(`timeout sur ${method} ${url}`));
    });
    if (data) req.write(data);
    req.end();
  });
}

async function api(method, url, body) {
  await refreshIfNeeded();
  return httpRequest(method, url, body, {}, true);
}

async function step1_findOrCreateServiceAccount() {
  const email = `${SA_ACCOUNT_ID}@${PROJECT_ID}.iam.gserviceaccount.com`;
  log(`Vérification du service account ${email}…`);
  const got = await api(
    'GET',
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts/${encodeURIComponent(email)}`
  );
  if (got && got.email) {
    log('Service account existant trouvé.');
    return got;
  }
  log('Création du service account…');
  const created = await api(
    'POST',
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts`,
    {
      accountId: SA_ACCOUNT_ID,
      serviceAccount: { displayName: SA_DISPLAY },
    }
  );
  if (created.error) fail('Création SA échouée : ' + JSON.stringify(created.error));
  log('Service account créé.');
  return created;
}

async function step2_grantRoles(saEmail) {
  log('Récupération de la policy IAM projet…');
  const policy = await api(
    'POST',
    `https://cloudresourcemanager.googleapis.com/v1/projects/${PROJECT_ID}:getIamPolicy`,
    { options: { requestedPolicyVersion: 3 } }
  );
  if (policy.error) fail('getIamPolicy échouée : ' + JSON.stringify(policy.error));
  delete policy.__statusCode;

  const member = `serviceAccount:${saEmail}`;
  let changed = false;
  for (const role of ROLES) {
    let binding = policy.bindings?.find((b) => b.role === role);
    if (!binding) {
      binding = { role, members: [] };
      policy.bindings = policy.bindings || [];
      policy.bindings.push(binding);
    }
    if (!binding.members.includes(member)) {
      binding.members.push(member);
      changed = true;
    }
  }

  if (!changed) {
    log('Rôles déjà attribués, rien à faire.');
    return;
  }

  log(`Attribution des rôles : ${ROLES.join(', ')}…`);
  const updated = await api(
    'POST',
    `https://cloudresourcemanager.googleapis.com/v1/projects/${PROJECT_ID}:setIamPolicy`,
    { policy }
  );
  if (updated.error) fail('setIamPolicy échouée : ' + JSON.stringify(updated.error));
  log('Rôles attribués.');
}

async function step3_createKey(saEmail) {
  log('Génération d\'une clé JSON…');
  const key = await api(
    'POST',
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts/${encodeURIComponent(saEmail)}/keys`,
    {
      privateKeyType: 'TYPE_GOOGLE_CREDENTIALS_FILE',
      keyAlgorithm: 'KEY_ALG_RSA_2048',
    }
  );
  if (!key.privateKeyData) fail('Création de clé échouée : ' + JSON.stringify(key));
  log('Clé créée.');
  return key.privateKeyData; // base64 du JSON SA
}

async function step4_writeEnvLocal(saB64) {
  log('Mise à jour de .env.local…');
  let content = '';
  if (fs.existsSync(ENV_LOCAL)) {
    content = fs.readFileSync(ENV_LOCAL, 'utf8');
  } else if (fs.existsSync(path.join(PROJECT_ROOT, '.env.example'))) {
    content = fs.readFileSync(path.join(PROJECT_ROOT, '.env.example'), 'utf8');
  }

  const upsert = (k, v) => {
    const re = new RegExp(`^${k}=.*$`, 'm');
    const line = `${k}="${v}"`;
    if (re.test(content)) content = content.replace(re, line);
    else content += (content.endsWith('\n') || content.length === 0 ? '' : '\n') + line + '\n';
  };

  upsert('FIREBASE_SERVICE_ACCOUNT_B64', saB64);
  upsert('FIREBASE_PROJECT_ID', PROJECT_ID);
  upsert('FIREBASE_FIRESTORE_DATABASE_ID', DATABASE_ID);
  fs.writeFileSync(ENV_LOCAL, content, { mode: 0o600 });
  log('.env.local écrit.');
}

async function step5_promoteAdmin(saB64) {
  const adminEmail = getArg('admin-email', 'agbotonfrejuste@gmail.com');
  log(`Promotion admin du compte ${adminEmail}…`);

  // On utilise le service account fraîchement créé pour obtenir un Google ID token
  // côté serveur, puis on appelle Firestore REST API.
  const sa = JSON.parse(Buffer.from(saB64, 'base64').toString('utf8'));

  // 1. Demander un access token via JWT signé
  const jwt = await makeServiceAccountJwt(sa, [
    'https://www.googleapis.com/auth/datastore',
    'https://www.googleapis.com/auth/identitytoolkit',
  ]);
  const tokenRes = await httpRequest('POST', 'https://oauth2.googleapis.com/token',
    new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString(),
    { 'Content-Type': 'application/x-www-form-urlencoded' }
  );
  if (!tokenRes.access_token) fail('SA token échec : ' + JSON.stringify(tokenRes));
  const saToken = tokenRes.access_token;

  // 2. Récupérer le uid Firebase Auth de l'admin via Identity Toolkit (Admin API)
  const idtUrl = `https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:lookup`;
  const lookup = await httpRequest('POST', idtUrl, { email: [adminEmail] }, {
    'Authorization': `Bearer ${saToken}`,
    'Content-Type': 'application/json',
  });
  if (!lookup.users || lookup.users.length === 0) {
    log(`⚠ Utilisateur ${adminEmail} pas encore inscrit. Inscris-toi via l'app (Google sign-in), puis relance avec --admin-email pour finaliser la promotion.`);
    return null;
  }
  const uid = lookup.users[0].localId;
  log(`UID admin trouvé : ${uid}`);

  // 3. Lire/écrire le doc Firestore users/{uid} avec role: admin
  const docUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/users/${uid}`;
  const existing = await httpRequest('GET', docUrl, null, { 'Authorization': `Bearer ${saToken}` });

  const fields = {
    uid: { stringValue: uid },
    email: { stringValue: adminEmail },
    role: { stringValue: 'admin' },
    profileType: { stringValue: 'medecin_nuc' },
    displayName: { stringValue: (existing.fields?.displayName?.stringValue) || adminEmail.split('@')[0] },
    lastLogin: { stringValue: new Date().toISOString() },
  };
  if (!existing.fields) {
    fields.createdAt = { stringValue: new Date().toISOString() };
  }

  // PATCH avec updateMask sur les champs admin uniquement
  const mask = ['role', 'profileType', 'email', 'uid', 'lastLogin'];
  if (!existing.fields) mask.push('displayName', 'createdAt');
  const queryMask = mask.map((m) => `updateMask.fieldPaths=${encodeURIComponent(m)}`).join('&');
  const patchRes = await httpRequest(
    'PATCH',
    `${docUrl}?${queryMask}`,
    { fields },
    { 'Authorization': `Bearer ${saToken}`, 'Content-Type': 'application/json' }
  );
  if (patchRes.error) fail('PATCH user échec : ' + JSON.stringify(patchRes.error));
  log(`✓ ${adminEmail} est désormais admin.`);
  return uid;
}

async function makeServiceAccountJwt(sa, scopes) {
  const crypto = await import('node:crypto');
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: sa.private_key_id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');
  const data = `${header}.${payload}`;
  const sig = crypto.sign('RSA-SHA256', Buffer.from(data), {
    key: sa.private_key,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }).toString('base64url');
  return `${data}.${sig}`;
}

function readEnvLocalKey(name) {
  if (!fs.existsSync(ENV_LOCAL)) return null;
  const content = fs.readFileSync(ENV_LOCAL, 'utf8');
  const re = new RegExp(`^${name}="?([^"\\n]+)"?$`, 'm');
  const m = content.match(re);
  return m ? m[1] : null;
}

(async () => {
  log(`Projet : ${PROJECT_ID}`);
  log(`Base Firestore : ${DATABASE_ID}`);
  log(`Service account : ${SA_ACCOUNT_ID}@${PROJECT_ID}.iam.gserviceaccount.com`);

  const onlyPromote = args.includes('--only-promote-admin');
  let keyB64 = readEnvLocalKey('FIREBASE_SERVICE_ACCOUNT_B64');

  if (!onlyPromote) {
    const sa = await step1_findOrCreateServiceAccount();
    await step2_grantRoles(sa.email);
    await new Promise((r) => setTimeout(r, 4000));
    // Si on a déjà une clé valide, on évite de la régénérer (quotas keys)
    if (!keyB64) {
      keyB64 = await step3_createKey(sa.email);
      await step4_writeEnvLocal(keyB64);
      await new Promise((r) => setTimeout(r, 6000));
    } else {
      log('Clé déjà présente dans .env.local, réutilisation.');
    }
  }

  if (!keyB64) fail('Aucune clé disponible — relance sans --only-promote-admin.');
  await step5_promoteAdmin(keyB64);

  log('');
  log('✓ Bootstrap terminé !');
  log('  - Service account créé et configuré');
  log('  - Clé écrite dans .env.local');
  log('  - Utilisateur admin promu (si déjà inscrit)');
  log('');
  log('Tu peux maintenant lancer : npm run dev');
})().catch((err) => fail(err.stack || err.message || err));
