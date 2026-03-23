'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { ArticleCard } from './ArticleCard';
import { ArticleView } from './ArticleView';
import { AdminPanel } from './AdminPanel';
import { motion } from 'motion/react';
import { getAllowedAudiences } from '@/lib/data';
import { Search, Activity, Heart, Target, Bone, Shield, FlaskConical, Sparkles, ArrowRight } from 'lucide-react';

export function MainContent() {
  const { view, currentCategory, searchQuery, setSearchQuery, showCategory, articles, loading, userProfile } = useAtlas();
  const allowedAudiences = getAllowedAudiences(userProfile);

  if (view === 'article') {
    return <ArticleView />;
  }

  if (view === 'admin') {
    return <AdminPanel />;
  }

  let entries = articles;
  if (currentCategory !== 'all') {
    entries = entries.filter(e => e.cat === currentCategory);
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
    thyroide: 'Thyroïde',
    cardio: 'Cardio-nucléaire',
    onco: 'Oncologie',
    os: 'Ostéo-articulaire',
    radio: 'Radiopharmaceutiques',
    protection: 'Radioprotection'
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-text3 font-mono animate-pulse">Chargement des données...</div>
      </div>
    );
  }

  if (view === 'home' && !searchQuery) {
    const featured = articles.slice(0, 6);
    return (
      <div className="flex-1 overflow-y-auto bg-bg">
        {/* Hero Section */}
        <div className="relative overflow-hidden px-6 py-16 md:py-24 border-b border-border-main">
          {/* Background decoration */}
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
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal2">
                Médecine Nucléaire
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text2 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Une encyclopédie interactive conçue pour les professionnels de santé et les patients, offrant des informations claires, précises et à jour.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-xl mx-auto relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal to-teal2 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative flex items-center bg-bg2 border border-border-main rounded-xl p-2 shadow-lg">
                <Search className="w-5 h-5 text-text3 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher une pathologie, un examen, un traceur..."
                  className="w-full bg-transparent border-none px-4 py-3 text-text-main placeholder:text-text3 focus:outline-none focus:ring-0"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-b border-border-main bg-bg2/50">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-main">
              <div className="text-center px-4">
                <div className="text-3xl font-light text-teal mb-1">{articles.length}</div>
                <div className="text-xs text-text3 uppercase tracking-wider font-mono">Articles</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-light text-teal mb-1">15+</div>
                <div className="text-xs text-text3 uppercase tracking-wider font-mono">Spécialités</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-light text-teal mb-1">3</div>
                <div className="text-xs text-text3 uppercase tracking-wider font-mono">Langues</div>
              </div>
              <div className="text-center px-4">
                <div className="text-3xl font-light text-teal mb-1">2</div>
                <div className="text-xs text-text3 uppercase tracking-wider font-mono">Niveaux de lecture</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Categories Grid */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-light text-text-main">Spécialités principales</h2>
              <button onClick={() => showCategory('all')} className="text-teal text-sm hover:underline flex items-center gap-1">
                Voir tout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Activity, label: 'Endocrinologie', key: 'endocrinologie', desc: 'Thyroïde, parathyroïdes, surrénales', targetAudience: ['medecin_nuc', 'medecin_non_nuc', 'patient'] },
                { icon: Heart, label: 'Cardiologie', key: 'cardiologie', desc: 'Myocarde, fraction d\'éjection, amylose', targetAudience: ['medecin_nuc', 'medecin_non_nuc', 'patient'] },
                { icon: Target, label: 'Oncologie', key: 'oncologie', desc: 'TEP FDG, bilan d\'extension, suivi', targetAudience: ['medecin_nuc', 'medecin_non_nuc', 'patient'] },
                { icon: Bone, label: 'Rhumatologie', key: 'rhumatologie', desc: 'Scintigraphie osseuse, métastases', targetAudience: ['medecin_nuc', 'medecin_non_nuc', 'patient'] },
                { icon: FlaskConical, label: 'Radiopharmacie', key: 'radiopharmacie', desc: 'Traceurs, marquage, contrôles', targetAudience: ['medecin_nuc'] },
                { icon: Shield, label: 'Radioprotection', key: 'radioprotection', desc: 'Dosimétrie, réglementation, sécurité', targetAudience: ['medecin_nuc'] },
              ].filter(c => c.targetAudience.some(audience => allowedAudiences.includes(audience as any))).map((c, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={c.key}
                  onClick={() => showCategory(c.key as any)}
                  className="group cursor-pointer bg-bg2 border border-border-main rounded-2xl p-6 hover:bg-bg3 hover:border-teal/30 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-bg border border-border-main flex items-center justify-center mb-4 group-hover:border-teal/30 group-hover:text-teal transition-colors">
                      <c.icon className="w-6 h-6 text-text2 group-hover:text-teal transition-colors" />
                    </div>
                    <h3 className="text-lg font-medium text-text-main mb-1">{c.label}</h3>
                    <p className="text-sm text-text3 mb-4">{c.desc}</p>
                    <div className="flex items-center text-xs font-mono text-teal">
                      <span>{articles.filter(a => a.cat === c.key).length} articles</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-light text-text-main">Dernières publications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {featured.map((e, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  key={e.id}
                  className="h-full"
                >
                  <ArticleCard article={e} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-7 md:p-8 animate-in fade-in duration-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="font-serif text-[28px] font-light leading-[1.2]">
            {catNames[currentCategory] || 'Résultats'}
          </div>
          <div className="text-xs text-text3 mt-1">
            {searchQuery ? `Recherche : "${searchQuery}"` : 'Encyclopédie de médecine nucléaire'}
          </div>
        </div>
        <div className="font-mono text-[11px] text-text3 bg-bg3 px-3 py-1 rounded-full border border-border-main self-center whitespace-nowrap">
          {entries.length} entrée{entries.length > 1 ? 's' : ''}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-text3 text-center p-10">
          <div className="text-4xl mb-4 opacity-40">🔬</div>
          <div className="font-serif text-2xl mb-2 text-text2">Aucun résultat</div>
          <div className="text-[13px] leading-[1.6]">Essayez un autre terme de recherche<br />ou parcourez une catégorie.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {entries.map(e => (
            <ArticleCard key={e.id} article={e} />
          ))}
        </div>
      )}
    </div>
  );
}
