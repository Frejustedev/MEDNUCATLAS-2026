#!/usr/bin/env node
/**
 * Vérifie l'état du setup :
 *  - Lecture du doc admin users/{uid}
 *  - Liste des derniers contact_messages
 *  - Liste des role_requests
 *  - Liste des directory_entries
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import https from 'node:https';
import dns from 'node:dns';
import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

dns.setDefaultResultOrder('ipv4first');
const httpsAgent = new https.Agent({ family: 4, keepAlive: true, timeout: 30000 });

const PROJECT_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const ENV_LOCAL = path.join(PROJECT_ROOT, '.env.local');

function readEnv(name) {
  const c = fs.readFileSync(ENV_LOCAL, 'utf8');
  const m = c.match(new RegExp(`^${name}="?([^"\\n]+)"?$`, 'm'));
  return m ? m[1] : null;
}

const PROJECT_ID = readEnv('FIREBASE_PROJECT_ID');
const DATABASE_ID = readEnv('FIREBASE_FIRESTORE_DATABASE_ID');
const SA_B64 = readEnv('FIREBASE_SERVICE_ACCOUNT_B64');
if (!SA_B64) {
  console.error('FIREBASE_SERVICE_ACCOUNT_B64 manquant.');
  process.exit(1);
}
const SA = JSON.parse(Buffer.from(SA_B64, 'base64').toString('utf8'));

function httpReq(method, url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = body ? JSON.stringify(body) : undefined;
    const h = { Accept: 'application/json', ...headers };
    if (data) {
      h['Content-Type'] = 'application/json';
      h['Content-Length'] = Buffer.byteLength(data);
    }
    const req = https.request({
      method, hostname: u.hostname, path: u.pathname + u.search,
      headers: h, family: 4, agent: httpsAgent, timeout: 30000,
    }, (res) => {
      let chunks = '';
      res.on('data', (c) => (chunks += c));
      res.on('end', () => {
        try { resolve(JSON.parse(chunks)); } catch { resolve({ statusCode: res.statusCode, raw: chunks }); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('timeout')));
    if (data) req.write(data);
    req.end();
  });
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: SA.private_key_id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: SA.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');
  const data = `${header}.${payload}`;
  const sig = crypto.sign('RSA-SHA256', Buffer.from(data), {
    key: SA.private_key,
    padding: crypto.constants.RSA_PKCS1_PADDING,
  }).toString('base64url');
  const jwt = `${data}.${sig}`;
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt,
  }).toString();
  return new Promise((resolve, reject) => {
    const u = new URL('https://oauth2.googleapis.com/token');
    const req = https.request({
      method: 'POST', hostname: u.hostname, path: u.pathname,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
        Accept: 'application/json',
      },
      family: 4, agent: httpsAgent, timeout: 30000,
    }, (resp) => {
      let chunks = '';
      resp.on('data', (c) => (chunks += c));
      resp.on('end', () => {
        try {
          const j = JSON.parse(chunks);
          if (j.access_token) resolve(j.access_token);
          else reject(new Error('No access_token: ' + chunks));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('OAuth timeout')));
    req.write(body);
    req.end();
  });
}

function fmtField(field) {
  if (!field) return undefined;
  if (field.stringValue !== undefined) return field.stringValue;
  if (field.timestampValue !== undefined) return field.timestampValue;
  if (field.booleanValue !== undefined) return field.booleanValue;
  if (field.integerValue !== undefined) return field.integerValue;
  if (field.arrayValue) return (field.arrayValue.values || []).map(fmtField);
  if (field.mapValue) {
    const out = {};
    for (const [k, v] of Object.entries(field.mapValue.fields || {})) out[k] = fmtField(v);
    return out;
  }
  return field;
}

function fmtDoc(doc) {
  const out = { _name: doc.name?.split('/').pop() };
  for (const [k, v] of Object.entries(doc.fields || {})) out[k] = fmtField(v);
  return out;
}

(async () => {
  const token = await getAccessToken();
  const auth = { Authorization: `Bearer ${token}` };
  const base = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents`;

  console.log('--- Admin (users/dKIazNNSeleQr3eMEl4awIqles22) ---');
  const adminDoc = await httpReq('GET', `${base}/users/dKIazNNSeleQr3eMEl4awIqles22`, null, auth);
  console.log(JSON.stringify(fmtDoc(adminDoc), null, 2));

  console.log('\n--- Derniers contact_messages (5) ---');
  const msgs = await httpReq('POST', `${base}:runQuery`, {
    structuredQuery: {
      from: [{ collectionId: 'contact_messages' }],
      orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
      limit: 5,
    },
  }, auth);
  for (const r of (msgs || [])) {
    if (r.document) console.log('•', JSON.stringify(fmtDoc(r.document), null, 2));
  }

  console.log('\n--- role_requests ---');
  const reqs = await httpReq('POST', `${base}:runQuery`, {
    structuredQuery: { from: [{ collectionId: 'role_requests' }], limit: 5 },
  }, auth);
  for (const r of (reqs || [])) {
    if (r.document) console.log('•', JSON.stringify(fmtDoc(r.document), null, 2));
  }
  if (!reqs.find?.((r) => r.document)) console.log('(aucune)');

  console.log('\n--- directory_entries ---');
  const dirs = await httpReq('POST', `${base}:runQuery`, {
    structuredQuery: { from: [{ collectionId: 'directory_entries' }], limit: 5 },
  }, auth);
  for (const r of (dirs || [])) {
    if (r.document) console.log('•', JSON.stringify(fmtDoc(r.document), null, 2));
  }
  if (!dirs.find?.((r) => r.document)) console.log('(aucune)');
})().catch((e) => { console.error(e); process.exit(1); });
