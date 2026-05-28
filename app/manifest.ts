import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NucleAtlas — Encyclopédie de médecine nucléaire',
    short_name: 'NucleAtlas',
    description:
      "Encyclopédie collaborative francophone de médecine nucléaire. Patient, médecin prescripteur, médecin nucléaire.",
    start_url: '/home',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0B0F19',
    lang: 'fr',
    orientation: 'portrait-primary',
    categories: ['health', 'medical', 'education'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
