import { ImageResponse } from 'next/og';

// Icône de l'application générée à la volée (remplace /favicon.ico manquant et
// évite les 404 d'assets). Charte NucleAtlas : fond sombre, monogramme « Nc »
// en teal. Next.js sert cette route à /icon.
export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F19',
          borderRadius: 6,
          color: '#00c9b1',
          fontSize: 20,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: -1,
        }}
      >
        Nc
      </div>
    ),
    { ...size }
  );
}
