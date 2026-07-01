import type { NextConfig } from 'next';
import path from 'node:path';

// Content-Security-Policy — durcissement. Volontairement permissive sur
// connect-src/img-src (https:) pour ne PAS casser les nombreux endpoints
// Firebase (Firestore, Auth, Installations, App Check), tout en bloquant le
// chargement de scripts/ressources depuis des origines tierces non autorisées.
// 'unsafe-inline'/'unsafe-eval' restent nécessaires à l'hydratation Next + au
// SDK Firebase ; resserrement possible ultérieurement via nonce.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com https://www.google.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https: wss:",
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://www.google.com https://apis.google.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // Évite l'inférence erronée du workspace root quand un lockfile parent
  // existe (cas Windows si C:\Users\<user>\package-lock.json traîne).
  outputFileTracingRoot: path.resolve(__dirname),

  // Embarque l'instantané COMPLET du catalogue (~11 Mo) dans la fonction de la
  // page article, pour servir de repli quand Firestore est indisponible (quota
  // gratuit épuisé). Lu via `fs` au runtime (cf. lib/article-fallback.ts), donc
  // à inclure explicitement dans le tracing (un `import` d'un JSON de 11 Mo
  // ferait exploser le typecheck).
  outputFileTracingIncludes: {
    '/articles/[id]': ['./lib/articles-snapshot-full.json'],
  },

  eslint: {
    // Lint réellement pendant le build — pas d'ignore en sourdine.
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.google.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Déployée d'abord en Report-Only (n'impose RIEN, journalise seulement)
          // pour valider en conditions réelles sans risque de casser Firebase/Auth.
          // Bascule en application : renommer la clé en 'Content-Security-Policy'.
          { key: 'Content-Security-Policy-Report-Only', value: CSP },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
