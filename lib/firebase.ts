import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Réduit le bruit Firestore en console (déconnexions transitoires, idle streams).
if (typeof window !== 'undefined') {
  setLogLevel('warn');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// App Check (anti-abus) — activé uniquement si une clé reCAPTCHA v3 est fournie.
// No-op tant que NEXT_PUBLIC_RECAPTCHA_SITE_KEY est vide : aucun impact sur
// l'app actuelle, mais prêt à protéger Firestore/Auth dès la clé renseignée.
if (typeof window !== 'undefined') {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (siteKey) {
    import('firebase/app-check')
      .then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true,
        });
      })
      .catch((e) => console.warn('[firebase] App Check non initialisé', e));
  }
}
