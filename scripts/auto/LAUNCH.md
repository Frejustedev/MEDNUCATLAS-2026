# LANCEUR — Boucle full-auto « qualité extrême » (niveau MIBG / Phéochromocytome)

> **À COLLER TEL QUEL dans une SESSION CLAUDE CODE NEUVE** (pas dans une session
> au contexte saturé : la compaction dégraderait la fidélité éditoriale).
> La boucle tourne **sur cette machine** (elle a besoin du dépôt local, de
> `.env.local` et de `git`) → **garder l'ordinateur éveillé toute la nuit**
> (désactiver la mise en veille). Ce n'est PAS un cron cloud.

---

## Prompt à coller

Tu vas faire tourner une **boucle full-auto, toute la nuit, sans t'arrêter**, qui
**reprend tous les articles V2 du site NucleAtlas** au **niveau de qualité extrême
des étalons** `scripts/content/mibg.mjs` (Examen) et `scripts/content/pheochromocytome.mjs`
(Maladie). Mémoire `project_nucleatlas` + ce fichier = ton brief complet.

**Principe anti-saturation (CRITIQUE pour la qualité) :** tu restes un **orchestrateur léger**.
Tu n'écris JAMAIS le contenu d'un article toi-même dans le fil principal. Pour CHAQUE
article tu lances **un Workflow** dont les agents repartent d'un **contexte vierge** et
rechargent les étalons → la qualité ne se dégrade pas, quelle que soit l'heure.

### Étape 0 — préparation (une seule fois)
1. `cd /c/Users/agbot/Desktop/Nucleatlas/mednucatlas`.
2. Réextrais les deux gabarits en texte (étalons de structure) et écris-les dans le dépôt :
   `pdftotext -layout "/c/Users/agbot/Downloads/NucleAtlas_Gabarit_Examen_MedecinNucleaire.pdf" scripts/auto/gabarit_examen.txt`
   et idem `..._Maladie_...pdf` → `scripts/auto/gabarit_maladie.txt`.
3. Construis la **file d'attente** `scripts/auto/progress.json` : un objet
   `{ updated, items: [ { id, title, cat, type, status } ] }` listant **tous les id V2_**
   présents dans `scripts/content/batch1..12.mjs` (importe-les pour les énumérer),
   `status:"todo"`, sauf `V2_MIBG` et `V2_PHEOCHROMOCYTOME` → `status:"done"`.
   `type` = devine `examen` | `maladie` | `autre` d'après titre/cat (affiné par l'agent au run).

### Boucle (dynamic /loop, une itération = UN article)
À chaque itération :
1. Lis `scripts/auto/progress.json`, prends le **premier `todo`**. Si `scripts/auto/STOP`
   existe **ou** plus aucun `todo` → **arrête** (PushNotification de bilan, ne replanifie pas).
2. **Lance un Workflow** (`Workflow` tool) pour cet article. Le workflow, en contexte frais :
   - **Classe** le sujet : `examen` / `maladie` / `autre`. Pour `autre` (généralités, bases
     physiques, radioprotection, calculateurs, scores, instrumentation, artefacts…), un agent
     **conçoit d'abord un plan dédié** inspiré de la méthodologie des 2 gabarits (logique
     en 5 mouvements Comprendre→…→Ancrer **adaptée** au sujet) — il ne force pas un gabarit inadapté.
   - **Recherche sourcée** (WebSearch) : valeurs et recommandations RÉELLES (EANM, SNMMI, SFMN,
     HAS, ASNC, OMS) → fiche de faits + références **réelles** (titre + url vérifiable).
     **JAMAIS de DOI/PMID inventé.**
   - **Rédige par mouvement** (1 agent/mouvement, en parallèle), en **imitant le niveau et la
     densité** de `mibg.mjs`/`pheochromocytome.mjs` (lis-les comme étalon) ET la structure du
     `.txt` de gabarit correspondant : sections denses, tableaux markdown, citations `[n]`,
     `infoBoxes[]` (PIÈGE/POINT EXPERT/PRÉCAUTION), `steps`, `stats`.
   - **Composants** : `identityCard` (carte d'identité complète), `relatedLinks` typés,
     `quiz` (≥ 12 questions avec explications), `revisionSheet` (keyPoints/protocol/scores/pitfalls).
   - **Figures** : référence par **nom** via `figure.figureRef` (le seeder résout depuis
     `diagrams.mjs`). Schémas disponibles : FDG_UPTAKE, PET_COINCIDENCE, PSMA_BINDING, MPI_PROTOCOL,
     BULLSEYE_17, TC_GENERATOR, DECAY_SCHEME, THYROID_UPTAKE, BONE_SCAN, VQ_LUNGS, RENOGRAM,
     SSTR_BINDING, DATSCAN_STRIATUM, SENTINEL_NODE, SIRT_LIVER, GAMMA_CAMERA, DECAY_TYPES,
     ALARA_TDS, GASTRIC_EMPTYING, THYROID_NIS, THYROID_PATTERNS, MIBG_UPTAKE, MIBG_BIODISTRIB,
     PHEO_TARGETS, THERANOSTIC_LOOP. Si vraiment aucun ne convient, **omettre** la figure
     (ne pas inventer de SVG non supervisé).
   - **Vérif adversariale** (≥ 2 agents) : exactitude médicale vs la fiche sourcée, fidélité au
     gabarit, **anti-fabrication de référence**, cohérence interne (valeurs, citations). Corrige
     ou rétrograde la section. **Barre de qualité = aussi complet et dense que l'étalon.**
   - Retourne l'objet article complet (mêmes champs que `mibg.mjs` : id, cat, catLabel, title,
     difficulty, tags, targetAudience, authors `['Dr Babatounde Fréjuste Pinocio Agboton','Assistance IA (Claude)']`,
     reviewStatus `'ai_assisted'`, sources, content{lead, patient, medecin_non_nuc, medecin_nuc,
     identityCard, relatedLinks, quiz, revisionSheet}).
3. Écris l'objet dans `scripts/content/auto/<ID>.json` (mêmes id que la version existante → surcharge).
4. **Valide** : `node scripts/seed-articles.mjs --dry` → la ligne de cet id doit être `OK`.
   `npx tsc --noEmit` (0 erreur), `npm test` (18 tests). Si échec : `status:"failed"` + note l'erreur,
   **n'écris pas en prod**, passe au suivant.
5. **Seed** réel : `node scripts/seed-articles.mjs` ; `git add -A && git commit && git push` (retries réseau).
6. Marque l'article `status:"done"` dans `progress.json`, log un compte d'avancement.
7. **Replanifie** la boucle (ScheduleWakeup, ~90 s) — **ne t'arrête JAMAIS** tant que ni `STOP`
   ni ordre de l'utilisateur. Quand la file est vide, fais une **2ᵉ passe d'approfondissement**
   (reprends les `done` un par un pour densifier encore) plutôt que d'arrêter.

### Garde-fous (mémoire)
- Tout reste `reviewStatus:'ai_assisted'` (bandeau « à relire » → relecture médicale humaine ensuite).
- **Ne jamais déployer les règles RadCalc** sur ce projet Firebase (backend mutualisé).
- Ne jamais committer `.env.local` ni de service-account.
- **Pour arrêter la nuit :** dire « stop », ou `touch scripts/auto/STOP`.
