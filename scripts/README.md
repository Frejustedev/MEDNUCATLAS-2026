# Scripts ad-hoc

Scripts ponctuels utilisés pour des migrations passées. **Ne pas exécuter sans
relecture** — la plupart sont obsolètes (le contenu `JSON.stringify` a été
remplacé par une structure imbriquée native dans Firestore depuis la Phase 1).

| Script | Usage historique | Statut |
|--------|------------------|--------|
| `update_data.js` | Renommage des modes `pro` → `medecin_nuc` / `medecin_non_nuc` dans `lib/data.ts` | **Obsolète** |
| `update_data2.js` | Variante du précédent | **Obsolète** |
| `update_mn004.ts` | Insertion manuelle d'un article (TEP-FDG poumon) | **Archivé** |
| `migrate.mjs` | Squelette de migration (incomplet) | **Obsolète** |

Pour ajouter un article aujourd'hui : passer par le panel `/admin` (générateur IA
ou import JSON validé par Zod).
