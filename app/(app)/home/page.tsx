'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ArticleCard } from '@/components/ArticleCard';
import { CollectionState } from '@/components/CollectionState';

export default function HomePage() {
  const { articles, showCategory, searchQuery, loading, articlesError, reloadArticles } = useAtlas();

  // If there's a search query, show search results instead of home
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    const entries = articles.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.excerpt.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q)) ||
      e.catLabel.toLowerCase().includes(q)
    );

    return (
      <div className="flex-1 overflow-y-auto bg-bg p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-light text-text-main mb-2">Résultats de recherche</h1>
            {!loading && !articlesError && (
              <p className="text-text2">{entries.length} résultat(s) pour &quot;{searchQuery}&quot;</p>
            )}
          </div>
          <CollectionState
            loading={loading}
            error={articlesError}
            onRetry={reloadArticles}
            isEmpty={entries.length === 0}
            emptyLabel={`Aucun résultat pour « ${searchQuery} ».`}
          />
          {!loading && !articlesError && entries.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {entries.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const featured = articles.slice(0, 6);

  return (
    <div className="flex-1 overflow-y-auto bg-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-6 py-16 md:py-24 border-b border-border-main">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-teal/5 blur-[120px] rounded-full transform rotate-12" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[150%] bg-teal2/5 blur-[120px] rounded-full transform -rotate-12" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 text-teal text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>La référence francophone en médecine nucléaire</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif font-light leading-tight mb-6 text-text-main"
          >
            Explorez l&apos;univers de la <br />
            <span className="text-teal font-normal">Médecine Nucléaire</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text2 max-w-2xl mx-auto mb-10"
          >
            Une encyclopédie collaborative, structurée et adaptée à votre profil. 
            Découvrez nos articles fondamentaux, nos guides cliniques et nos protocoles.
          </motion.p>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-text-main mb-2">Articles à la une</h2>
            <p className="text-text2 text-sm">Sélection d&apos;articles fondamentaux pour bien démarrer</p>
          </div>
          <button 
            onClick={() => showCategory('all')}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-teal hover:text-teal2 transition-colors"
          >
            Voir tout l&apos;index <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <CollectionState
          loading={loading}
          error={articlesError}
          onRetry={reloadArticles}
          isEmpty={featured.length === 0}
          emptyLabel="Aucun article disponible pour le moment."
        />
        {!loading && !articlesError && featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
