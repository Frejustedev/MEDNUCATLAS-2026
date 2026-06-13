#!/usr/bin/env node
/**
 * Statistiques sur la collection articles :
 *  - Nombre total
 *  - Distribution par catégorie
 *  - Distribution par difficulté
 *  - Distribution par audience
 *  - Articles les plus anciens / récents
 */
import fs from 'node:fs';
import path from 'node:path';
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
const SA = JSON.parse(Buffer.from(readEnv('FIREBASE_SERVICE_ACCOUNT_B64'), 'base64').toString('utf8'));

async function getToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT', kid: SA.private_key_id })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: SA.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600, iat: now,
  })).toString('base64url');
  const data = `${header}.${payload}`;
  const sig = crypto.sign('RSA-SHA256', Buffer.from(data), {
    key: SA.private_key, padding: crypto.constants.RSA_PKCS1_PADDING,
  }).toString('base64url');
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: `${data}.${sig}`,
  }).toString();
  return new Promise((resolve, reject) => {
    const u = new URL('https://oauth2.googleapis.com/token');
    const req = https.request({
      method: 'POST', hostname: u.hostname, path: u.pathname,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) },
      family: 4, agent: httpsAgent, timeout: 30000,
    }, (resp) => {
      let c = '';
      resp.on('data', (x) => (c += x));
      resp.on('end', () => { try { resolve(JSON.parse(c).access_token); } catch (e) { reject(e); } });
    });
    req.on('error', reject);
    req.write(body); req.end();
  });
}

async function fetchAllArticles(token) {
  const base = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents`;
  const articles = [];
  let pageToken = null;
  for (let i = 0; i < 50; i++) {
    const url = `${base}/articles?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const j = await new Promise((resolve, reject) => {
      const u = new URL(url);
      const req = https.request({
        method: 'GET', hostname: u.hostname, path: u.pathname + u.search,
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
        family: 4, agent: httpsAgent, timeout: 30000,
      }, (resp) => {
        let c = '';
        resp.on('data', (x) => (c += x));
        resp.on('end', () => { try { resolve(JSON.parse(c)); } catch (e) { reject(e); } });
      });
      req.on('error', reject); req.end();
    });
    for (const d of (j.documents || [])) {
      const f = d.fields || {};
      articles.push({
        id: d.name.split('/').pop(),
        title: f.title?.stringValue || '',
        cat: f.cat?.stringValue || 'unknown',
        catLabel: f.catLabel?.stringValue || '',
        difficulty: f.difficulty?.stringValue || 'unknown',
        targetAudience: (f.targetAudience?.arrayValue?.values || []).map((v) => v.stringValue),
        tags: (f.tags?.arrayValue?.values || []).map((v) => v.stringValue),
        createdAt: f.createdAt?.timestampValue || f.createdAt?.stringValue,
        updatedAt: f.updatedAt?.timestampValue || f.updatedAt?.stringValue,
      });
    }
    if (!j.nextPageToken) break;
    pageToken = j.nextPageToken;
  }
  return articles;
}

(async () => {
  const token = await getToken();
  const articles = await fetchAllArticles(token);

  console.log('═══════════════════════════════════════════');
  console.log(`📊 Total articles : ${articles.length}`);
  console.log('═══════════════════════════════════════════\n');

  // Par catégorie
  const byCat = {};
  for (const a of articles) {
    byCat[a.cat] = byCat[a.cat] || { count: 0, label: a.catLabel, articles: [] };
    byCat[a.cat].count++;
    byCat[a.cat].articles.push(a.title);
  }
  console.log('📁 Distribution par catégorie :');
  Object.entries(byCat)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([cat, d]) => {
      console.log(`  ${d.count.toString().padStart(3)} · ${cat.padEnd(28)} (${d.label || '—'})`);
    });

  // Par difficulté
  const byDiff = {};
  for (const a of articles) byDiff[a.difficulty] = (byDiff[a.difficulty] || 0) + 1;
  console.log('\n🎓 Distribution par difficulté :');
  Object.entries(byDiff).forEach(([k, v]) => console.log(`  ${v.toString().padStart(3)} · ${k}`));

  // Par audience
  const byAud = {};
  for (const a of articles) for (const aud of a.targetAudience) byAud[aud] = (byAud[aud] || 0) + 1;
  console.log('\n👥 Distribution par audience cible :');
  Object.entries(byAud).forEach(([k, v]) => console.log(`  ${v.toString().padStart(3)} · ${k}`));

  // Catégories vides du menu vs catégories utilisées
  const ALL_MENU_CATS = [
    'generalites', 'bases_physiques', 'radiobiologie', 'reglementation',
    'endocrinologie', 'oncologie', 'hematologie', 'cardiologie', 'neurologie',
    'nephro_urologie', 'pneumologie', 'gastro_enterologie', 'rhumatologie',
    'senologie_gynecologie', 'dermatologie_melanome', 'orl_salivaires',
    'vasculaire_lymphatique', 'infection_inflammation', 'urgences', 'pediatrie',
    'theranostique_thyroide', 'tne', 'prostate', 'sirt',
    'radiopharmacie', 'instrumentation', 'radioprotection',
    'scores', 'calculateurs', 'artefacts', 'cas_cliniques', 'preparation', 'guidelines',
  ];
  const emptyCats = ALL_MENU_CATS.filter((c) => !byCat[c]);
  console.log(`\n📭 Catégories du menu SANS article : ${emptyCats.length}/${ALL_MENU_CATS.length}`);
  emptyCats.forEach((c) => console.log(`     · ${c}`));

  // Récents / anciens
  const withDate = articles.filter((a) => a.updatedAt).sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  if (withDate.length > 0) {
    console.log('\n🕐 5 derniers articles modifiés :');
    withDate.slice(0, 5).forEach((a) => console.log(`  ${a.updatedAt?.slice(0, 10)} · [${a.cat}] ${a.title}`));
  }

  // Top tags
  const tagCount = {};
  for (const a of articles) for (const t of a.tags) tagCount[t] = (tagCount[t] || 0) + 1;
  console.log('\n🏷️  Top 10 tags :');
  Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([t, c]) => console.log(`  ${c.toString().padStart(3)} · ${t}`));
})().catch((e) => { console.error(e); process.exit(1); });
