import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NucleAtlas — Encyclopédie de médecine nucléaire',
    short_name: 'NucleAtlas',
    description:
      "Encyclopédie collaborative francophone de médecine nucléaire. Patient, médecin prescripteur, médecin nucléaire.",
    start_url: '/home',
    display: 'standalone',
    background_color: '#0B0F19',
    theme_color: '#0B0F19',
    lang: 'fr',
    orientation: 'portrait-primary',
    categories: ['health', 'medical', 'education'],
    // Icônes : on n'utilise que des assets réellement servis pour éviter les
    // 404. `/favicon.svg` existe dans public/ ; `/icon` et `/apple-icon` sont
    // générés à la volée par app/icon.tsx et app/apple-icon.tsx (next/og).
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
      { src: '/icon', sizes: '32x32', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}
