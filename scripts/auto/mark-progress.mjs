#!/usr/bin/env node
// Met à jour le statut d'un article dans scripts/auto/progress.json.
// Usage : node scripts/auto/mark-progress.mjs <id> <todo|done|failed> [note...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, 'progress.json');
const [, , id, status, ...noteParts] = process.argv;
if (!id || !status) { console.error('Usage : node scripts/auto/mark-progress.mjs <id> <status> [note]'); process.exit(2); }

const j = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const it = j.items.find((x) => x.id === id);
if (!it) { console.error('[mark] id introuvable :', id); process.exit(1); }
it.status = status;
const note = noteParts.join(' ').trim();
if (note) it.note = note; else delete it.note;
j.updated = new Date().toISOString();
fs.writeFileSync(OUT, JSON.stringify(j, null, 2) + '\n', 'utf8');

const c = (s) => j.items.filter((x) => x.status === s).length;
console.log(`[mark] ${id} -> ${status}  |  todo=${c('todo')} done=${c('done')} failed=${c('failed')}`);
