import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { AtlasProvider } from '@/lib/AtlasContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CookieConsent } from '@/components/CookieConsent';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'arial'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'arial'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', 'arial'],
});

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'NucleAtlas — Encyclopédie de médecine nucléaire',
    template: '%s | NucleAtlas',
  },
  description:
    "NucleAtlas est l'encyclopédie collaborative francophone de référence en médecine nucléaire. Articles adaptés au patient, au médecin prescripteur et au médecin nucléaire.",
  applicationName: 'NucleAtlas',
  keywords: [
    'médecine nucléaire',
    'TEP',
    'TEP-TDM',
    'PET-CT',
    'scintigraphie',
    'radiopharmacie',
    'théranostique',
    'PSMA',
    'iode-131',
    'encyclopédie médicale',
    'Afrique francophone',
  ],
  authors: [{ name: 'Dr Agboton & contributeurs' }],
  creator: 'NucleAtlas',
  publisher: 'NucleAtlas',
  category: 'health',
  // Pas de `canonical` global ici : défini au niveau du layout racine, il ferait
  // hériter à TOUTES les pages (catégories, annuaire, /home…) un canonical vers
  // « / », les déclarant duplicatas de la page d'accueil → jamais indexées.
  // Chaque route se canonicalise sur sa propre URL ; la page article définit son
  // canonical par article dans son generateMetadata.
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'NucleAtlas',
    title: 'NucleAtlas — Encyclopédie de médecine nucléaire',
    description:
      'Encyclopédie collaborative francophone de référence en médecine nucléaire. Contenu adapté à votre profil (patient, médecin, médecin nucléaire).',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@nucleatlas',
    title: 'NucleAtlas — Encyclopédie de médecine nucléaire',
    description: 'Encyclopédie collaborative francophone de référence en médecine nucléaire.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Icônes : on déclare le SVG (asset réel) + la route PNG générée à la volée
  // par app/icon.tsx (/icon) et l'apple-icon par app/apple-icon.tsx (/apple-icon).
  // On ne référence plus /favicon.ico ni /apple-touch-icon.png (inexistants =
  // 404). Note : déclarer `icons` ici prend le pas sur la détection auto des
  // fichiers app/icon.tsx — on pointe donc explicitement vers leurs routes.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: { url: '/apple-icon', sizes: '180x180' },
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0F19' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <AtlasProvider>
              {children}
              <CookieConsent />
            </AtlasProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
