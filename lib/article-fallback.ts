import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

// Repli hors-ligne de la page article : quand Firestore est indisponible
// (typiquement quota gratuit de lectures/jour épuisé — la base AI Studio est
// plafonnée au tier gratuit), on sert le contenu depuis l'instantané STATIQUE
// COMPLET embarqué dans la fonction (lib/articles-snapshot-full.json, inclus via
// `outputFileTracingIncludes`). Le fichier (~11 Mo) est lu via `fs` (pas un
// `import`, qui ferait exploser le typecheck) et mis en cache en mémoire au
// premier accès.

type DocData = Record<string, unknown>;
let cache: Record<string, DocData> | null = null;

function load(): Record<string, DocData> {
  if (cache) return cache;
  // Candidats de chemin : racine du process (cas Vercel/standalone) puis repli.
  const candidates = [
    path.join(process.cwd(), 'lib', 'articles-snapshot-full.json'),
    path.join(process.cwd(), '.next', 'server', 'lib', 'articles-snapshot-full.json'),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        cache = JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, DocData>;
        return cache;
      }
    } catch (err) {
      console.error('[article-fallback] lecture instantané échouée:', p, err);
    }
  }
  console.error('[article-fallback] instantané complet introuvable (repli indisponible)');
  cache = {};
  return cache;
}

/** Renvoie les données document (shape Firestore) d'un article depuis
 * l'instantané statique, ou null si absent. */
export function getArticleFallback(id: string): DocData | null {
  const snap = load();
  return snap[id] ?? null;
}
