import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { AtlasProvider } from '@/lib/AtlasContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
});

import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'NucleAtlas',
  description: 'Encyclopédie de référence en médecine nucléaire',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <AtlasProvider>
              {children}
            </AtlasProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
