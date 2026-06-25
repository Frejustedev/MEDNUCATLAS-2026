import { ImageResponse } from 'next/og';

// Icône Apple touch (écran d'accueil iOS) générée à la volée — remplace
// /apple-touch-icon.png manquant et corrige le 404. Next.js sert cette route à
// /apple-icon. Format recommandé 180x180, fond opaque (iOS n'aime pas la
// transparence).
export const runtime = 'edge';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          color: '#00c9b1',
          fontSize: 104,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          letterSpacing: -4,
        }}
      >
        Nc
      </div>
    ),
    { ...size }
  );
}
