'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { ArticleCard } from './ArticleCard';
import { motion } from 'motion/react';
import { Clock, Star, Sparkles, ArrowRight, Target } from 'lucide-react';

export function Dashboard() {
  const { articles, dbUser, showCategory, openAuthModal } = useAtlas();

  if (!dbUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-bg animate-in fade-in duration-300">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-teal" />
          </div>
          <h1 className="text-2xl font-serif font-light text-text-main mb-4">
            Connectez-vous pour accéder à votre tableau de bord
          </h1>
          <p className="text-text2 mb-8">
            Retrouvez vos articles favoris, votre historique de lecture et des suggestions personnalisées.
          </p>
          <button
            onClick={() => openAuthModal()}
            className="px-6 py-3 bg-teal text-bg rounded-lg font-medium hover:bg-teal2 transition-colors"
          >
            Se connecter ou s&apos;inscrire
          </button>
        </div>
      </div>
    );
  }

  const recentArticles = dbUser?.recentArticles
    ? articles.filter(a => dbUser.recentArticles!.includes(a.id))
        .sort((a, b) => dbUser.recentArticles!.indexOf(a.id) - dbUser.recentArticles!.indexOf(b.id))
    : [];

  const favoriteArticles = dbUser?.favorites
    ? articles.filter(a => dbUser.favorites!.includes(a.id))
    : [];

  const nouveautes = [...articles].reverse().slice(0, 3);

  // Get newest articles (assuming higher ID or just taking the last ones if no date)
  // Or we can just take some random ones for suggestions
  const suggestions = articles
    .filter(a => !dbUser?.recentArticles?.includes(a.id) && !nouveautes.find(n => n.id === a.id))
    .slice(0, 3);

  return (
    <div className="flex-1 overflow-y-auto p-7 md:p-8 bg-bg animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-light text-text-main mb-2">
            Bonjour{dbUser?.displayName ? `, ${dbUser.displayName.split(' ')[0]}` : ''}
          </h1>
          <p className="text-text2">Bienvenue sur votre tableau de bord personnalisé.</p>
        </div>

        {recentArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-teal" />
              <h2 className="text-xl font-serif text-text-main">Récemment consultés</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {recentArticles.slice(0, 3).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {favoriteArticles.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-teal" />
                <h2 className="text-xl font-serif text-text-main">Vos favoris</h2>
              </div>
              <button 
                onClick={() => showCategory('favorites')}
                className="text-sm text-teal hover:underline flex items-center gap-1"
              >
                Voir tout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {favoriteArticles.slice(0, 3).map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-teal" />
            <h2 className="text-xl font-serif text-text-main">Nouveautés</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {nouveautes.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-teal" />
            <h2 className="text-xl font-serif text-text-main">Suggestions pour vous</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {suggestions.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
