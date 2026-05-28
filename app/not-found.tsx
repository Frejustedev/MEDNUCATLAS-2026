import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export const metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text-main p-8">
      <div className="max-w-lg w-full text-center">
        <div className="font-serif text-[120px] leading-none text-teal mb-2">404</div>
        <h1 className="text-2xl font-serif text-text-main mb-3">Page introuvable</h1>
        <p className="text-text2 mb-8 leading-relaxed">
          La page que tu cherches a été déplacée ou n&apos;existe plus. Tu peux revenir à l&apos;accueil ou
          explorer l&apos;encyclopédie.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-bg rounded-md text-sm font-medium hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <Home className="w-4 h-4" aria-hidden="true" /> Accueil
          </Link>
          <Link
            href="/categories/all"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border-main rounded-md text-sm font-medium text-text2 hover:text-text-main hover:bg-bg3 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <Search className="w-4 h-4" aria-hidden="true" /> Explorer
          </Link>
        </div>
      </div>
    </div>
  );
}
