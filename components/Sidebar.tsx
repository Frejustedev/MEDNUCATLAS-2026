'use client';

import React, { useState, useMemo } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Category, MENU_STRUCTURE, getAllowedAudiences } from '@/lib/data';
import { 
  Home, Book, Activity, Heart, Target, Bone, Shield, FlaskConical, Star, 
  ChevronDown, ChevronRight, Hash, Info, Mail, Search,
  Brain, Droplet, Wind, User, Flame, Baby, Radio, Dna, ActivitySquare, 
  Settings, ListOrdered, Calculator, AlertTriangle, ClipboardList, FileText,
  Disc, X
} from 'lucide-react';

const getIcon = (id: string, className: string = "w-3.5 h-3.5") => {
  switch (id) {
    case 'dashboard': return <ActivitySquare className={className} />;
    case 'favorites': return <Star className={className} />;
    case 'index': return <Hash className={className} />;
    case 'endocrinologie': return <Activity className={className} />;
    case 'oncologie': return <Target className={className} />;
    case 'cardiologie': return <Heart className={className} />;
    case 'neurologie': return <Brain className={className} />;
    case 'nephro_urologie': return <Droplet className={className} />;
    case 'pneumologie': return <Wind className={className} />;
    case 'gastro_enterologie': return <Disc className={className} />;
    case 'senologie_gynecologie': return <User className={className} />;
    case 'infection_inflammation': return <Flame className={className} />;
    case 'pediatrie': return <Baby className={className} />;
    case 'theranostique_thyroide': return <Radio className={className} />;
    case 'tne': return <Dna className={className} />;
    case 'prostate': return <ActivitySquare className={className} />;
    case 'rhumatologie': return <Bone className={className} />;
    case 'sirt': return <Disc className={className} />;
    case 'radiopharmacie': return <FlaskConical className={className} />;
    case 'instrumentation': return <Settings className={className} />;
    case 'radioprotection': return <Shield className={className} />;
    case 'scores': return <ListOrdered className={className} />;
    case 'calculateurs': return <Calculator className={className} />;
    case 'artefacts': return <AlertTriangle className={className} />;
    case 'preparation': return <ClipboardList className={className} />;
    case 'guidelines': return <FileText className={className} />;
    case 'about': return <Info className={className} />;
    case 'annuaire': return <User className={className} />;
    case 'contact': return <Mail className={className} />;
    default: return <div className="w-1.5 h-1.5 rounded-full bg-border-main ml-1" />;
  }
};

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

export function Sidebar() {
  const { showHome, showCategory, openArticle, articles, userProfile, isMobileMenuOpen, setIsMobileMenuOpen, isDesktopMenuCollapsed } = useAtlas();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>('🔍 DIAGNOSTIC (Organes)');
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (title: string) => {
    setExpandedSection(prev => prev === title ? null : title);
  };

  const getCount = (catId: string) => articles.filter(a => a.cat === catId).length;

  const filteredMenu = useMemo(() => {
    let menu = MENU_STRUCTURE;
    const allowedAudiences = getAllowedAudiences(userProfile);
    
    // First filter by user profile
    menu = menu.map(section => {
      // If section has targetAudience and user is not in it, return null
      if ((section as any).targetAudience && !(section as any).targetAudience.some((audience: string) => allowedAudiences.includes(audience as any))) {
        return null;
      }
      
      // Filter items
      const filteredItems = section.items.filter(item => {
        if ((item as any).targetAudience && !(item as any).targetAudience.some((audience: string) => allowedAudiences.includes(audience as any))) {
          return false;
        }
        return true;
      });
      
      return { ...section, items: filteredItems };
    }).filter(Boolean) as typeof MENU_STRUCTURE;

    // Then filter by search term
    if (!searchTerm.trim()) return menu;
    const term = searchTerm.toLowerCase();
    return menu.map(section => ({
      ...section,
      items: section.items.filter(item => item.label.toLowerCase().includes(term))
    })).filter(section => section.items.length > 0);
  }, [searchTerm, userProfile]);

  const sidebarContent = (
    <>
      <div className="px-4 mb-4 mt-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg3 border border-border-main rounded-md pl-9 pr-3 py-1.5 text-[13px] text-text-main focus:outline-none focus:border-teal transition-colors"
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="text-[9px] tracking-[3px] uppercase text-text3 font-mono px-5 mb-1 mt-3">Navigation</div>
        <div
          onClick={showHome}
          className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
            pathname === '/home' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
          }`}
        >
          <Home className="w-4 h-4" /> Accueil
        </div>
        <div
          onClick={() => showCategory('all')}
          className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
            pathname === '/categories/all' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
          }`}
        >
          <Book className="w-4 h-4" /> Toutes les entrées
          <span className="ml-auto text-[10px] font-mono text-text3 bg-bg3 px-1.5 py-0.5 rounded-full">{articles.length}</span>
        </div>
        <div
          onClick={() => showCategory('index')}
          className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
            pathname === '/categories/index' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
          }`}
        >
          <Hash className="w-4 h-4" /> Index A-Z
        </div>
      </div>

      <div className="h-px bg-border-main mx-4 my-3" />

      <div className="mb-2">
        {filteredMenu.map((section) => {
          const isExpanded = searchTerm ? true : expandedSection === section.title;
          return (
            <div key={section.title} className="mb-2">
              <div 
                onClick={() => toggleSection(section.title)}
                className={`flex items-center justify-between px-5 py-1.5 cursor-pointer group transition-colors ${isExpanded ? 'bg-bg3/50' : ''}`}
              >
                <span className="text-[9px] tracking-[2px] uppercase text-text3 font-mono group-hover:text-text-main transition-colors">
                  {section.title}
                </span>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-text3 group-hover:text-text-main" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-text3 group-hover:text-text-main" />
                )}
              </div>
              
              {isExpanded && (
                <div className="mt-1 mb-2">
                  {section.items.map((item) => {
                    const count = getCount(item.id);
                    const isSpecial = ['dashboard', 'favorites', 'index', 'about', 'contact', 'annuaire'].includes(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        onClick={() => showCategory(item.id as Category)}
                        className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
                          pathname === `/categories/${item.id}` || pathname === `/${item.id}`
                            ? 'bg-teal3 text-teal border-teal' 
                            : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
                        }`}
                      >
                        {getIcon(item.id)}
                        <span className={isSpecial ? "font-medium" : ""}>{item.label}</span>
                        {!isSpecial && count > 0 && (
                          <span className="ml-auto text-[10px] font-mono text-text3 bg-bg3 px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-auto pt-8 pb-4 px-5">
        <div className="flex flex-col gap-2">
          <Link href="/mentions-legales" className="text-[11px] text-text3 hover:text-teal transition-colors">Mentions légales</Link>
          <Link href="/contact" className="text-[11px] text-text3 hover:text-teal transition-colors">Contact</Link>
          <Link href="/contribuer" className="text-[11px] text-text3 hover:text-teal transition-colors">Contribuer</Link>
        </div>
        <div className="text-[10px] text-text3/50 mt-4">© 2026 NucleAtlas</div>
      </div>
    </>
  );

  return (
    <>
      <div 
        className={`bg-bg2 border-r border-border-main overflow-y-auto py-4 hidden flex-col shrink-0 transition-all duration-300 ${isDesktopMenuCollapsed ? 'w-0 border-none opacity-0 overflow-hidden !px-0' : 'w-[260px] md:flex'}`}
      >
        {sidebarContent}
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-bg2 border-r border-border-main z-50 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-border-main shrink-0">
                <div className="flex items-center gap-2 text-teal">
                  <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3">
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(30 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(90 50 50)" />
                    <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(150 50 50)" />
                    <circle cx="50" cy="50" r="16" fill="currentColor" stroke="none" />
                  </svg>
                  <span className="font-serif text-lg font-semibold text-text-main">
                    Nucle<span className="text-[#C8A96E]">Atlas</span>
                  </span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text3 hover:text-text-main transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
