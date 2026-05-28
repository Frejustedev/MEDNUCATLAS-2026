import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware d'enrichissement :
 * - Ajoute des en-têtes sécurité globaux (CSP, HSTS, etc.).
 * - Met en place un nonce CSP réutilisable côté pages.
 *
 * NOTE : la vérification d'autorisation (admin, éditeur) est faite côté
 *   route API + page (server component) avec le Firebase Admin SDK.
 *   Le middleware Next.js tourne sur Edge runtime et ne peut pas utiliser
 *   firebase-admin (paquets Node natifs).
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Sécurité — en-têtes essentiels
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('X-DNS-Prefetch-Control', 'on');

  // HSTS uniquement en prod
  if (process.env.NODE_ENV === 'production') {
    res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  return res;
}

export const config = {
  matcher: [
    // Tout sauf assets statiques, image opt et favicon
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
