'use client';

import React, { useState, useMemo } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Category, MENU_STRUCTURE, getAllowedAudiences } from '@/lib/data';
import { 
  Home, Book, Activity, Heart, Target, Bone, Shield, FlaskConical, Star, 
  ChevronDown, ChevronRight, Hash, Info, Mail, Search,
  Brain, Droplet, Wind, User, Flame, Baby, Radio, Dna, ActivitySquare, 
  Settings, ListOrdered, Calculator, AlertTriangle, ClipboardList, FileText,
  Disc
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
    case 'contact': return <Mail className={className} />;
    default: return <div className="w-1.5 h-1.5 rounded-full bg-border-main ml-1" />;
  }
};

export function Sidebar() {
  const { view, currentCategory, showHome, showCategory, openArticle, articles, userProfile } = useAtlas();
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

  return (
    <div className="w-[260px] bg-bg2 border-r border-border-main overflow-y-auto py-4 hidden md:block shrink-0">
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
            view === 'home' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
          }`}
        >
          <Home className="w-4 h-4" /> Accueil
        </div>
        <div
          onClick={() => showCategory('all')}
          className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
            view === 'grid' && currentCategory === 'all' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
          }`}
        >
          <Book className="w-4 h-4" /> Toutes les entrées
          <span className="ml-auto text-[10px] font-mono text-text3 bg-bg3 px-1.5 py-0.5 rounded-full">{articles.length}</span>
        </div>
        <div
          onClick={() => showCategory('index')}
          className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
            view === 'grid' && currentCategory === 'index' ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
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
                    const isSpecial = ['dashboard', 'favorites', 'index', 'about', 'contact'].includes(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        onClick={() => showCategory(item.id as Category)}
                        className={`flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] ${
                          view === 'grid' && currentCategory === item.id 
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
    </div>
  );
}
