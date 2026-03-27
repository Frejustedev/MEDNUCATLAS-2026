'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Search, X, BookOpen, Tag, ChevronRight, FileText, Activity, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Article, Category, MENU_STRUCTURE } from '@/lib/data';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdvancedSearch({ isOpen, onClose }: AdvancedSearchProps) {
  const { articles, openArticle, userProfile } = useAtlas();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'fondamental' | 'intermédiaire' | 'avancé'>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setActiveIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('all');
      setSelectedDifficulty('all');
    }
  }, [isOpen]);

  // Filter articles
  let results = articles;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(a => 
      a.title.toLowerCase().includes(q) || 
      a.excerpt?.toLowerCase().includes(q) || 
      a.tags?.some(t => t.toLowerCase().includes(q)) ||
      a.id.toLowerCase().includes(q)
    );
  }

  if (selectedCategory !== 'all') {
    results = results.filter(a => a.cat === selectedCategory);
  }

  if (selectedDifficulty !== 'all') {
    results = results.filter(a => a.difficulty === selectedDifficulty);
  }

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query, selectedCategory, selectedDifficulty]);

  const handleSelect = useCallback((id: string) => {
    openArticle(id);
    onClose();
  }, [openArticle, onClose]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[activeIndex]) {
          handleSelect(results[activeIndex].id);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, activeIndex, handleSelect]);

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && resultsRef.current) {
      const activeElement = resultsRef.current.querySelector(`[data-index="${activeIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIndex, isOpen]);

  // Group by category
  const groupedResults = results.reduce((acc, article) => {
    if (!acc[article.catLabel]) {
      acc[article.catLabel] = [];
    }
    acc[article.catLabel].push(article);
    return acc;
  }, {} as Record<string, Article[]>);

  // Extract all categories for the filter
  const allCategories = Array.from(new Set(articles.map(a => a.catLabel))).map(label => {
    const article = articles.find(a => a.catLabel === label);
    return { id: article?.cat || 'all', label };
  });

  let globalIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 sm:px-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-bg2 border border-border-main rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-border-main bg-bg">
              <Search className="w-5 h-5 text-teal mr-3 shrink-0" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Rechercher une pathologie, un radiopharmaceutique, un tag..." 
                className="flex-1 bg-transparent border-none outline-none text-text-main text-lg placeholder:text-text3"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-bg3 rounded-md text-text3 hover:text-text-main transition-colors ml-2 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border-main bg-bg3/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text3 uppercase tracking-wider">Catégorie:</span>
                <select 
                  value={selectedCategory} 
                  onChange={e => setSelectedCategory(e.target.value as any)}
                  className="bg-bg border border-border-main rounded text-xs px-2 py-1 text-text2 outline-none focus:border-teal"
                >
                  <option value="all" className="bg-bg text-text-main">Toutes les catégories</option>
                  {allCategories.map(c => (
                    <option key={c.id} value={c.id} className="bg-bg text-text-main">{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-text3 uppercase tracking-wider">Difficulté:</span>
                <div className="flex bg-bg border border-border-main rounded overflow-hidden">
                  {['all', 'fondamental', 'intermédiaire', 'avancé'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff as any)}
                      className={`px-3 py-1 text-xs font-medium capitalize transition-colors ${selectedDifficulty === diff ? 'bg-teal/10 text-teal' : 'text-text2 hover:bg-bg3'}`}
                    >
                      {diff === 'all' ? 'Tous' : diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-2" ref={resultsRef}>
              {Object.keys(groupedResults).length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-text3">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-sm">Aucun résultat trouvé pour &quot;{query}&quot;</p>
                  <button 
                    onClick={() => { setQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); }}
                    className="mt-4 text-teal text-sm hover:underline"
                  >
                    Effacer les filtres
                  </button>
                </div>
              ) : (
                <div className="space-y-6 p-2">
                  {Object.entries(groupedResults).map(([categoryLabel, categoryArticles]) => (
                    <div key={categoryLabel}>
                      <h3 className="text-xs font-mono text-text3 uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" />
                        {categoryLabel}
                        <span className="bg-bg3 text-text2 px-1.5 py-0.5 rounded-full text-[10px]">{categoryArticles.length}</span>
                      </h3>
                      <div className="space-y-1">
                        {categoryArticles.map((article) => {
                          const currentIndex = globalIndex++;
                          const isActive = currentIndex === activeIndex;
                          
                          return (
                            <button
                              key={article.id}
                              data-index={currentIndex}
                              onClick={() => handleSelect(article.id)}
                              onMouseEnter={() => setActiveIndex(currentIndex)}
                              className={`w-full text-left flex items-start p-3 rounded-lg transition-colors group ${isActive ? 'bg-bg3 ring-1 ring-teal/30' : 'hover:bg-bg3/50'}`}
                            >
                              <div className={`mt-1 mr-3 transition-colors ${isActive ? 'text-teal' : 'text-teal/50 group-hover:text-teal/80'}`}>
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-text-main truncate">{article.title}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border ${
                                    article.difficulty === 'fondamental' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                    article.difficulty === 'intermédiaire' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                  }`}>
                                    {article.difficulty}
                                  </span>
                                </div>
                                <p className="text-xs text-text2 line-clamp-1 mb-1.5">{article.excerpt}</p>
                                {article.tags && article.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {article.tags.slice(0, 3).map(tag => (
                                      <span key={tag} className="text-[10px] text-text3 bg-bg flex items-center gap-1 px-1.5 py-0.5 rounded border border-border-main">
                                        <Tag className="w-2.5 h-2.5" /> {tag}
                                      </span>
                                    ))}
                                    {article.tags.length > 3 && (
                                      <span className="text-[10px] text-text3">+{article.tags.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-opacity ml-2 shrink-0 self-center ${isActive ? 'opacity-100 text-teal' : 'opacity-0 group-hover:opacity-50 text-text3'}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-border-main bg-bg3/30 flex items-center justify-between text-[10px] text-text3 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="bg-bg border border-border-main rounded px-1.5 py-0.5 font-sans">↑</kbd> <kbd className="bg-bg border border-border-main rounded px-1.5 py-0.5 font-sans">↓</kbd> Naviguer</span>
                <span className="flex items-center gap-1"><kbd className="bg-bg border border-border-main rounded px-1.5 py-0.5 font-sans">Enter</kbd> Ouvrir</span>
                <span className="flex items-center gap-1"><kbd className="bg-bg border border-border-main rounded px-1.5 py-0.5 font-sans">Esc</kbd> Fermer</span>
              </div>
              <div>
                {results.length} résultat{results.length !== 1 ? 's' : ''}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
