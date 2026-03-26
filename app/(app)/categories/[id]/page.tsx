'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { ArticleCard } from '@/components/ArticleCard';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { articles, dbUser, searchQuery } = useAtlas();
  const params = useParams();
  const categoryId = params.id as string;

  let entries = articles;
  if (categoryId === 'favorites') {
    entries = entries.filter(e => dbUser?.favorites?.includes(e.id));
  } else if (categoryId !== 'all') {
    entries = entries.filter(e => e.cat === categoryId);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    entries = entries.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.excerpt.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q)) ||
      e.catLabel.toLowerCase().includes(q)
    );
  }

  const catNames: Record<string, string> = {
    all: 'Toutes les entrées',
    favorites: 'Mes Favoris',
    dashboard: 'Tableau de bord',
    index: 'Index A-Z',
    thyroide: 'Thyroïde',
    cardio: 'Cardio-nucléaire',
    onco: 'Oncologie',
    os: 'Ostéo-articulaire',
    radio: 'Radiopharmaceutiques',
    protection: 'Radioprotection'
  };

  const title = catNames[categoryId] || categoryId;

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-light text-text-main mb-2 capitalize">{title}</h1>
          <p className="text-text2">{entries.length} article(s) disponible(s)</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {entries.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
        {entries.length === 0 && (
          <div className="text-center py-20 border border-dashed border-border-main rounded-xl bg-bg2">
            <p className="text-text3 font-mono">Aucun article trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
