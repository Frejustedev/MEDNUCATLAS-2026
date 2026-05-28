#!/usr/bin/env node
/**
 * Crée (ou récupère) une clé API Google pour Gemini, et l'injecte dans .env.local.
 * Utilise le token Firebase CLI (scope cloud-platform).
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import https from 'node:https';
import dns from 'node:dns';
import { Buffer } from 'node:buffer';

dns.setDefaultResultOrder('ipv4first');
const httpsAgent = new https.Agent({ family: 4, keepAlive: true, timeout: 30000 });

const PROJECT_ID = process.argv.includes('--project') ? process.argv[process.argv.indexOf('--project') + 1] : 'gen-lang-client-0346429614';
const KEY_NAME = 'nucleatlas-gemini';
const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const ENV_LOCAL = path.join(PROJECT_ROOT, '.env.local');

function log(...m) { console.log('[gemini-key]', ...m); }
function fail(m) { console.error('[gemini-key] ERREUR :', m); process.exit(1); }

function readFirebaseTokens() {
  const p = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');
  if (!fs.existsSync(p)) fail('Firebase CLI config introuvable, lance "npx firebase login".');
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!raw?.tokens?.access_token) fail('Pas de token Firebase.');
  return raw.tokens;
}

let TOKENS = readFirebaseTokens();

async function refreshIfNeeded() {
  if (TOKENS.expires_at && TOKENS.expires_at > Date.now() + 60_000) return;
  if (!TOKENS.refresh_token) fail('Token expiré.');
  const body = new URLSearchParams({
    refresh_token: TOKENS.refresh_token,
    client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
    client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
    grant_type: 'refresh_token',
  }).toString();
  const res = await httpRequest('POST', 'https://oauth2.googleapis.com/token', body, {
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  if (!res.access_token) fail('Refresh OAuth échoué.');
  TOKENS.access_token = res.access_token;
  TOKENS.expires_at = Date.now() + res.expires_in * 1000;
}

async function httpRequest(method, url, body, extra = {}, retries = 4) {
  let lastErr;
  for (let i = 1; i <= retries; i++) {
    try {
      return await new Promise((resolve, reject) => {
        const u = new URL(url);
        const headers = { Accept: 'application/json', ...extra };
        if (body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
        const data = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined;
        if (data) headers['Content-Length'] = Buffer.byteLength(data);
        const req = https.request({
          method, hostname: u.hostname, path: u.pathname + u.search,
          headers, family: 4, agent: httpsAgent, timeout: 30000,
        }, (res) => {
          let chunks = '';
          res.on('data', (c) => (chunks += c));
          res.on('end', () => {
            if (!chunks) return resolve({ statusCode: res.statusCode });
            try { resolve(JSON.parse(chunks)); } catch { resolve({ statusCode: res.statusCode, raw: chunks }); }
          });
        });
        req.on('error', reject);
        req.on('timeout', () => req.destroy(new Error('timeout')));
        if (data) req.write(data);
        req.end();
      });
    } catch (err) {
      lastErr = err;
      log(`retry ${i}/${retries} (${err.message})`);
      if (i < retries) await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
  throw lastErr;
}

async function api(method, url, body) {
  await refreshIfNeeded();
  return httpRequest(method, url, body, { Authorization: `Bearer ${TOKENS.access_token}` });
}

async function enableApi(serviceName) {
  log(`Vérification de l'activation ${serviceName}…`);
  const status = await api(
    'GET',
    `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/${serviceName}`
  );
  if (status.state === 'ENABLED') {
    log(`${serviceName} déjà activé.`);
    return;
  }
  log(`Activation de ${serviceName}…`);
  const op = await api(
    'POST',
    `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/${serviceName}:enable`,
    {}
  );
  if (op.error) fail(`Activation ${serviceName} échouée : ${JSON.stringify(op.error)}`);
  // attendre que l'op soit terminée
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const check = await api('GET', `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/${serviceName}`);
    if (check.state === 'ENABLED') { log(`${serviceName} activé.`); return; }
  }
  log(`⚠ ${serviceName} : activation en cours, peut prendre quelques minutes.`);
}

async function findExistingKey() {
  log('Recherche d\'une clé existante…');
  const list = await api(
    'GET',
    `https://apikeys.googleapis.com/v2/projects/${PROJECT_ID}/locations/global/keys`
  );
  if (list.error) {
    log(`list keys échoué : ${JSON.stringify(list.error)}`);
    return null;
  }
  const existing = (list.keys || []).find((k) => k.displayName === KEY_NAME);
  if (!existing) return null;
  log(`Clé existante trouvée : ${existing.name}`);
  // Récupérer la valeur de la clé
  const keyStr = await api('GET', `https://apikeys.googleapis.com/v2/${existing.name}/keyString`);
  if (keyStr.keyString) return keyStr.keyString;
  return null;
}

async function createKey() {
  log('Création d\'une nouvelle clé API…');
  const op = await api(
    'POST',
    `https://apikeys.googleapis.com/v2/projects/${PROJECT_ID}/locations/global/keys?keyId=${KEY_NAME}`,
    {
      displayName: KEY_NAME,
      restrictions: {
        apiTargets: [
          { service: 'generativelanguage.googleapis.com' },
        ],
      },
    }
  );
  if (op.error) fail(`Création de clé échouée : ${JSON.stringify(op.error)}`);
  // op est une LRO ; attendre la finalisation
  let opName = op.name;
  if (!opName) {
    log('Pas de nom d\'opération, on tente direct la récupération.');
  } else {
    for (let i = 0; i < 30; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const status = await api('GET', `https://apikeys.googleapis.com/v2/${opName}`);
      if (status.done) {
        if (status.error) fail(`Opération échouée : ${JSON.stringify(status.error)}`);
        if (status.response?.keyString) return status.response.keyString;
        const nm = status.response?.name;
        if (nm) {
          const ks = await api('GET', `https://apikeys.googleapis.com/v2/${nm}/keyString`);
          if (ks.keyString) return ks.keyString;
        }
        break;
      }
    }
  }
  // dernier recours : list & match
  const fallback = await findExistingKey();
  if (fallback) return fallback;
  fail('Clé créée mais impossible de récupérer keyString.');
}

function upsertEnvLocal(key, value) {
  let content = fs.existsSync(ENV_LOCAL) ? fs.readFileSync(ENV_LOCAL, 'utf8') : '';
  const re = new RegExp(`^${key}=.*$`, 'm');
  const line = `${key}="${value}"`;
  if (re.test(content)) content = content.replace(re, line);
  else content += (content.endsWith('\n') || content.length === 0 ? '' : '\n') + line + '\n';
  fs.writeFileSync(ENV_LOCAL, content, { mode: 0o600 });
}

(async () => {
  log(`Projet : ${PROJECT_ID}`);
  await enableApi('apikeys.googleapis.com');
  await enableApi('generativelanguage.googleapis.com');

  let keyStr = await findExistingKey();
  if (!keyStr) keyStr = await createKey();

  upsertEnvLocal('GEMINI_API_KEY', keyStr);
  upsertEnvLocal('GEMINI_MODEL_GENERATE', 'gemini-2.5-pro');
  upsertEnvLocal('GEMINI_MODEL_CHAT', 'gemini-2.5-flash');
  log('✓ Clé Gemini écrite dans .env.local');
})().catch((err) => fail(err.stack || err.message));
