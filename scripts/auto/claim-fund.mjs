// Réclame le prochain fondamental 'todo', le marque 'in_progress' (anti-doublon
// entre flux parallèles), imprime "CLAIM <id>" ou "NONE".
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const P = path.join(path.dirname(fileURLToPath(import.meta.url)), 'progress.json');
const FOND = new Set(['generalites','bases_physiques','instrumentation','radioprotection','radiobiologie','radiopharmacie']);
const p = JSON.parse(fs.readFileSync(P,'utf8'));
const it = p.items.find(i => i.status==='todo' && FOND.has(i.cat));
if (!it) { console.log('NONE'); process.exit(0); }
it.status='in_progress'; p.updated=new Date().toISOString();
fs.writeFileSync(P, JSON.stringify(p,null,2));
console.log('CLAIM '+it.id);
