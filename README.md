# NucleAtlas

> Encyclopédie collaborative francophone de référence en médecine nucléaire.
> Contenu adapté au patient, au médecin prescripteur et au médecin nucléaire.

![NucleAtlas](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## Stack

- **Framework** : Next.js 15 (App Router, RSC, route handlers Node)
- **UI** : React 19 + Tailwind CSS 4 + motion + lucide-react
- **Auth & data** : Firebase Auth (Google + Email) + Firestore
- **IA** : Gemini (server-side uniquement, jamais exposé au client)
- **Validation** : Zod sur toutes les frontières (API + admin)
- **Build** : standalone (Cloud Run / Firebase Hosting / Vercel)

## Démarrage rapide

### Prérequis

- Node.js ≥ 20
- npm ≥ 10
- Compte Firebase (projet existant : `gen-lang-client-0346429614`)
- Clé API Gemini (Google AI Studio)

### Installation

```bash
npm install
cp .env.example .env.local
# Renseigne les valeurs (voir section « Variables d'environnement »)
npm run dev
```

L'application est servie sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Toutes les variables sont décrites dans [`.env.example`](.env.example). Les
plus critiques :

| Variable | Côté | Description |
|----------|------|-------------|
| `GEMINI_API_KEY` | server | Clé Gemini. **Ne JAMAIS** préfixer `NEXT_PUBLIC_`. |
| `FIREBASE_SERVICE_ACCOUNT_B64` | server | JSON du service account Firebase, encodé base64. |
| `FIREBASE_PROJECT_ID` | server | ID du projet Firebase. |
| `FIREBASE_FIRESTORE_DATABASE_ID` | server | ID de la base Firestore nommée. |
| `APP_URL` | server | URL de prod (utilisée pour metadata, sitemap, CORS). |
| `UPSTASH_REDIS_REST_URL/TOKEN` | server | Optionnel — rate limit avancé (fallback Firestore). |

Pour générer la valeur de `FIREBASE_SERVICE_ACCOUNT_B64` :

```bash
# Téléchargez le JSON depuis Firebase Console > Paramètres > Comptes de service
cat service-account.json | base64 | tr -d '\n'
```

## Architecture

```
app/
  (app)/                Pages authentifiées (layout client)
    admin/              Panel admin (réservé role: admin)
    annuaire/           Annuaire centres et médecins (Afrique)
    articles/[id]/      Article (RSC + JSON-LD MedicalWebPage)
    categories/[id]/    Listing par catégorie
    contact/            Formulaire contact (Firestore)
    contribuer/         Page explicative
    dashboard/          Tableau de bord utilisateur
    demande-acces/      Demande d'élévation de rôle
    home/               Accueil app
    mentions-legales/   RGPD + mentions
    profile/            Profil utilisateur
  api/                  Routes server-side
    ai/chat/            Assistant IA (auth user, rate-limited)
    ai/generate/        Génération article (auth editor, rate-limited)
    contact/            Réception des messages (Firestore)
    directory/          Annuaire (GET public verified, POST modéré)
    me/                 Identité serveur (uid, role, isAdmin)
    role-request/       Élévation de rôle (POST user, GET/PATCH admin)
  layout.tsx            Root layout (metadata, fonts, theme)
  manifest.ts           PWA manifest
  not-found.tsx         404 FR
  robots.ts             robots.txt
  sitemap.ts            Sitemap dynamique (articles depuis Firestore)
components/             Composants client réutilisables
hooks/                  Hooks React custom
lib/
  AtlasContext.tsx      Provider global (auth, articles, UI state)
  api-client.ts         Wrapper fetch authentifié
  data.ts               Types et menu structure
  directory.ts          Seed initial de l'annuaire
  firebase.ts           SDK client (Auth + Firestore)
  firebase-admin.ts     SDK serveur (Auth + Firestore + helpers role)
  firestore-errors.ts   Helpers d'erreurs Firestore typés
  http.ts               Wrappers route handlers (zod, error, json)
  rate-limit.ts         Token bucket Firestore
  schemas.ts            Schémas Zod centralisés
  utils.ts              cn() helper
middleware.ts           En-têtes sécurité globaux
firestore.rules         Règles Firestore strictes (validation + role-based)
firestore.indexes.json  Index composites
firebase.json           Config CLI Firebase
```

## Sécurité

Voir [`firestore.rules`](firestore.rules) pour le détail. Points forts :

- **Aucune clé secrète côté client.** Gemini, Admin SDK = server-only.
- **Pas de hardcode admin.** Le rôle vient de Firestore (`users/{uid}.role`).
- **Auto-élévation bloquée.** Un user ne peut PAS s'attribuer `medecin_nuc`
  ou `admin` — il doit passer par la page `/demande-acces`, qui crée une
  entrée `role_requests` validée par un admin.
- **Validation Zod systématique** sur les routes API et l'admin.
- **Rate-limit Firestore** sur chaque endpoint sensible (IA, contact,
  annuaire, role-request).
- **Anti-prompt-injection** : le contenu d'article est passé en données
  isolées (`<article_content>...</article_content>`), jamais en
  `systemInstruction`.
- **Honeypot** sur le formulaire de contact.
- **En-têtes sécurité** appliqués via middleware + next.config (X-Frame,
  Referrer-Policy, HSTS, Permissions-Policy).

## Scripts

```bash
npm run dev      # Serveur de dev (port 3000)
npm run build    # Build production (output: standalone)
npm run start    # Sert le build
npm run lint     # ESLint flat config (Next 16)
npm run clean    # Nettoie .next
npx tsc --noEmit # Type-check sans build
```

## Déploiement

### Firebase Hosting (recommandé)

```bash
# Déployer les règles Firestore et les indexes
npx firebase-tools deploy --only firestore:rules,firestore:indexes

# L'app Next.js peut être déployée via Cloud Run (output: standalone) :
docker build -t nucleatlas .
gcloud run deploy nucleatlas --image nucleatlas --region europe-west1
```

### Vercel

```bash
npx vercel --prod
```

N'oublie pas de configurer les variables d'environnement (voir plus haut).

## Contribuer

Le workflow éditorial passe par le panel admin (`/admin`) :

1. Demande un rôle `medecin_nuc` via `/demande-acces`.
2. Un admin valide ta demande.
3. Tu peux ensuite générer des articles via IA, importer du JSON
   (validation Zod stricte) ou rédiger à la main.

Les soumissions à l'annuaire (`/annuaire`) sont modérées depuis le panel
admin (statut `pending` → `verified`).

## Licence

© 2026 NucleAtlas. Tous droits réservés.
