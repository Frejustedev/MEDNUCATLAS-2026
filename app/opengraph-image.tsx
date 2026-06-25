import { ImageResponse } from 'next/og';

// Image Open Graph / Twitter par défaut, générée à la volée (remplace l'asset
// statique manquant référencé par les balises OG, corrige le 404 des partages
// sociaux). Charte NucleAtlas : fond sombre, « Nucle » blanc + « Atlas » or,
// sous-titre teal. Next.js sert cette route à /opengraph-image et l'associe
// automatiquement aux métadonnées OG/Twitter de la racine.
export const runtime = 'edge';

export const alt = 'NucleAtlas — Encyclopédie de médecine nucléaire';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(ellipse at 60% 35%, rgba(0,201,177,0.16) 0%, transparent 60%), #0B0F19',
          color: '#f8fafc',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Monogramme */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 132,
            height: 132,
            borderRadius: 28,
            background: 'rgba(0,201,177,0.10)',
            border: '2px solid rgba(0,201,177,0.35)',
            color: '#00c9b1',
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -4,
            marginBottom: 40,
          }}
        >
          Nc
        </div>

        {/* Logotype */}
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 600, letterSpacing: -2 }}>
          <span style={{ color: '#f8fafc' }}>Nucle</span>
          <span style={{ color: '#C8A96E' }}>Atlas</span>
        </div>

        {/* Sous-titre */}
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: '#00c9b1',
            fontFamily: 'Helvetica, Arial, sans-serif',
            letterSpacing: 1,
          }}
        >
          Encyclopédie de médecine nucléaire
        </div>
      </div>
    ),
    { ...size }
  );
}
