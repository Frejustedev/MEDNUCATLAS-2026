# LANCEUR — WORKER 1 (relance propre)

> À COLLER dans une **NOUVELLE conversation Claude Code OUVERTE DANS CE DOSSIER**
> `C:\Users\agbot\Desktop\Nucleatlas\mednucatlas` (abandonne l'ancienne session worker 1 si elle bloque).
> Tourne en parallèle de worker 2 (dossier `mednucatlas-w2`), sur une **partition disjointe**.

## Prompt à coller

**ultracode** — Tu es **WORKER 1** d'une génération d'articles NucleAtlas. Tu es **explicitement autorisé à utiliser l'outil `Workflow`** (multi-agents) en boucle ; c'est le cœur de ta tâche. Racine : `C:\Users\agbot\Desktop\Nucleatlas\mednucatlas`.

### Contexte
Worker 2 tourne en même temps dans `…\mednucatlas-w2` sur d'AUTRES catégories. **Ta file = `scripts/auto/progress.json` de CE dossier** (déjà partitionnée : 16 catégories, ~70 todo). Ne produis RIEN hors de cette file. Tout sort en `reviewStatus: 'ai_assisted'`.

### Boucle (en continu, 1 itération = 1 article)
1. `node scripts/auto/set-next-subject.mjs` → sélectionne le prochain `todo` et l'injecte dans le workflow de génération (`C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen.mjs`, chemin par défaut). **Code de sortie 2 = plus aucun todo → ARRÊTE.**
2. Lance le workflow : `Workflow({ scriptPath: "C:/Users/agbot/AppData/Local/Temp/nucleatlas_gen.mjs" })`. Il produit l'article au **niveau étalon** (réfs : `scripts/content/mibg.mjs`, `scripts/content/pheochromocytome.mjs`, `scripts/auto/gabarit_examen.txt`, `gabarit_maladie.txt`). Récupère le chemin du fichier `.output` de la tâche terminée.
3. `node scripts/auto/ship.mjs <chemin-.output>` → valide (`tsc` + `npm test`), **seede en direct** (`--only`), **commit + `git pull --rebase` + push**, marque l'article (gate « major » bloquant). Il imprime une ligne JSON `{id,status,next}`.
4. Recommence pour `next`. **Ne t'arrête JAMAIS** tant qu'il reste des `todo`, que `scripts/auto/STOP` n'existe pas, et que l'utilisateur n'a pas dit stop.

### Notes
- Tu pousses sur `origin/main` ; worker 2 aussi, mais sur des **fichiers disjoints** → le `pull --rebase` de `ship.mjs` gère les courses. Push raté = réessayé au tour suivant (le seed Firestore, lui, est déjà passé).
- Le sujet est déjà préchargé (`V2_DOSIMETRIE_THERANOSTIQUE`) : tu peux directement faire l'étape 2 au premier tour, puis reprendre la boucle complète.
- Pour t'arrêter : `scripts/auto/STOP` dans ce dossier, ou ordre de l'utilisateur.

Commence MAINTENANT.
