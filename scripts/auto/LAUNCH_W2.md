# LANCEUR — WORKER 2 (génération parallèle)

> À COLLER dans une **NOUVELLE conversation Claude Code OUVERTE DANS CE DOSSIER**
> `C:\Users\agbot\Desktop\Nucleatlas\mednucatlas-w2` (PAS le dossier principal).
> Tourne EN MÊME TEMPS que worker 1 (dossier `mednucatlas`), sur une **partition disjointe**.

## Prompt à coller

Tu es **WORKER 2** d'une génération d'articles NucleAtlas en parallèle. Racine : `C:\Users\agbot\Desktop\Nucleatlas\mednucatlas-w2` (un clone séparé du dépôt). Worker 1 tourne en même temps dans `…\mednucatlas` sur d'AUTRES catégories — **vous ne devez JAMAIS produire le même sujet**.

### Garde-fous d'isolation (CRITIQUES)
- **Ta file = `scripts/auto/progress.json` de CE dossier**, qui ne contient QUE TES 17 catégories (oncologie, neurologie, radioprotection, scores, artefacts, bases_physiques, cas_cliniques, guidelines, instrumentation, orl_salivaires, pneumologie, radiopharmacie, senologie_gynecologie, theranostique_thyroide, endocrinologie, infection_inflammation, prostate). Ne produis RIEN hors de cette file.
- **Variable d'environnement obligatoire** à chaque commande de pipeline : `WF_PATH=C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen_w2.mjs` (ton propre fichier de workflow de génération, déjà en place — NE PAS utiliser celui de worker 1).
- `node_modules` est une **jonction** vers le dépôt principal (partagé en lecture) — déjà configuré, ne pas réinstaller.
- `.env.local` est déjà copié (clés Firebase). Ne le commite jamais.

### Boucle (1 itération = 1 article), en continu
À chaque tour :
1. `WF_PATH=C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen_w2.mjs node scripts/auto/set-next-subject.mjs` → sélectionne le prochain `todo` de TA file et l'injecte dans ton workflow de génération. **Code de sortie 2 = plus aucun todo → ARRÊTE.**
2. Lance le **workflow de génération** : `Workflow({ scriptPath: "C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen_w2.mjs" })`. Il produit l'article au **niveau étalon** (lis `scripts/content/mibg.mjs`, `scripts/content/pheochromocytome.mjs`, `scripts/auto/gabarit_examen.txt`, `scripts/auto/gabarit_maladie.txt`). Récupère le chemin du brouillon JSON qu'il écrit.
3. `node scripts/auto/ship.mjs <chemin-du-brouillon.json>` → valide (`tsc` + `npm test`), **seede en direct** (`--only`), **commit + `git pull --rebase` + push** (déjà patché pour le parallèle), et marque l'article. Le gate « major » BLOQUE la publication (ne l'assouplis pas) → un article à problème part en `failed`, c'est voulu.
4. Recommence. **Ne t'arrête JAMAIS** tant que (a) il reste des `todo`, (b) `scripts/auto/STOP` n'existe pas, et (c) l'utilisateur n'a pas dit stop.

### Règles
- Tout en `reviewStatus: 'ai_assisted'` (relecture humaine ensuite).
- Tu pousses sur `origin/main` (GitHub) ; worker 1 aussi, mais sur des **fichiers disjoints** → le `pull --rebase` de `ship.mjs` règle les courses. Si le réseau coupe, le push retentera au tour suivant (le seed Firestore, lui, est déjà passé en direct).
- Si tu vois un sujet déjà fait par worker 1 apparaître dans ta file, c'est une anomalie : saute-le et signale-le.
- Pour t'arrêter : `scripts/auto/STOP` ou ordre de l'utilisateur.

Commence MAINTENANT par l'itération 1.
