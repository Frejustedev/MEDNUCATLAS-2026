import type {Metadata} from 'next';
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css'; // Global styles

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

export const metadata: Metadata = {
  title: 'NucleAtlas',
  description: 'Encyclopédie de référence en médecine nucléaire',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">{children}</body>
    </html>
  );
}
