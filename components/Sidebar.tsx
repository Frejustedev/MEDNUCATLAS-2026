'use client';

import React, { useState, useMemo } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Category, MENU_STRUCTURE, getAllowedAudiences } from '@/lib/data';
import {
  Home, Book, Activity, Heart, Target, Bone, Shield, FlaskConical, Star,
  ChevronDown, ChevronRight, Hash, Info, Mail, Search,
  Brain, Droplet, Wind, User, Flame, Baby, Radio, Dna, ActivitySquare,
  Settings, ListOrdered, Calculator, AlertTriangle, ClipboardList, FileText,
  Disc, X,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

function getIcon(id: string, className = 'w-3.5 h-3.5') {
  switch (id) {
    case 'dashboard': return <ActivitySquare className={className} aria-hidden="true" />;
    case 'favorites': return <Star className={className} aria-hidden="true" />;
    case 'index': return <Hash className={className} aria-hidden="true" />;
    case 'endocrinologie': return <Activity className={className} aria-hidden="true" />;
    case 'oncologie': return <Target className={className} aria-hidden="true" />;
    case 'cardiologie': return <Heart className={className} aria-hidden="true" />;
    case 'neurologie': return <Brain className={className} aria-hidden="true" />;
    case 'nephro_urologie': return <Droplet className={className} aria-hidden="true" />;
    case 'pneumologie': return <Wind className={className} aria-hidden="true" />;
    case 'gastro_enterologie': return <Disc className={className} aria-hidden="true" />;
    case 'senologie_gynecologie': return <User className={className} aria-hidden="true" />;
    case 'infection_inflammation': return <Flame className={className} aria-hidden="true" />;
    case 'pediatrie': return <Baby className={className} aria-hidden="true" />;
    case 'theranostique_thyroide': return <Radio className={className} aria-hidden="true" />;
    case 'tne': return <Dna className={className} aria-hidden="true" />;
    case 'prostate': return <ActivitySquare className={className} aria-hidden="true" />;
    case 'rhumatologie': return <Bone className={className} aria-hidden="true" />;
    case 'sirt': return <Disc className={className} aria-hidden="true" />;
    case 'radiopharmacie': return <FlaskConical className={className} aria-hidden="true" />;
    case 'instrumentation': return <Settings className={className} aria-hidden="true" />;
    case 'radioprotection': return <Shield className={className} aria-hidden="true" />;
    case 'scores': return <ListOrdered className={className} aria-hidden="true" />;
    case 'calculateurs': return <Calculator className={className} aria-hidden="true" />;
    case 'artefacts': return <AlertTriangle className={className} aria-hidden="true" />;
    case 'preparation': return <ClipboardList className={className} aria-hidden="true" />;
    case 'guidelines': return <FileText className={className} aria-hidden="true" />;
    case 'about': return <Info className={className} aria-hidden="true" />;
    case 'annuaire': return <User className={className} aria-hidden="true" />;
    case 'contact': return <Mail className={className} aria-hidden="true" />;
    default: return <span className="w-1.5 h-1.5 rounded-full bg-border-main ml-1 inline-block" aria-hidden="true" />;
  }
}

// Entrées de navigation toujours visibles (même sans article).
const SPECIAL_ITEMS = new Set(['dashboard', 'favorites', 'index', 'about', 'contact', 'annuaire']);

export function Sidebar() {
  const {
    showHome, showCategory, articles, userProfile,
    isMobileMenuOpen, setIsMobileMenuOpen, isDesktopMenuCollapsed,
  } = useAtlas();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSection = (title: string) => setExpandedSection((prev) => (prev === title ? null : title));
  const getCount = (catId: string) => articles.filter((a) => a.cat === catId).length;

  const filteredMenu = useMemo(() => {
    const allowedAudiences = getAllowedAudiences(userProfile);
    const counts = articles.reduce<Record<string, number>>((acc, a) => {
      acc[a.cat] = (acc[a.cat] || 0) + 1;
      return acc;
    }, {});
    const term = searchTerm.trim().toLowerCase();

    return MENU_STRUCTURE
      .map((section) => {
        const sectionTarget = (section as { targetAudience?: string[] }).targetAudience;
        if (sectionTarget && !sectionTarget.some((aud) => allowedAudiences.includes(aud as never))) {
          return null;
        }
        const items = section.items.filter((item) => {
          // Audience
          const itemTarget = (item as { targetAudience?: string[] }).targetAudience;
          if (itemTarget && !itemTarget.some((aud) => allowedAudiences.includes(aud as never))) return false;
          // Masquer les catégories de contenu vides (on garde toujours les entrées de navigation)
          if (!SPECIAL_ITEMS.has(item.id) && (counts[item.id] || 0) === 0) return false;
          // Recherche
          if (term && !item.label.toLowerCase().includes(term)) return false;
          return true;
        });
        return { ...section, items };
      })
      .filter((s): s is typeof MENU_STRUCTURE[number] => s !== null && s.items.length > 0);
  }, [searchTerm, userProfile, articles]);

  const sidebarContent = (
    <>
      <div className="px-4 mb-4 mt-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text3" aria-hidden="true" />
          <label htmlFor="sidebar-search" className="sr-only">
            Rechercher une catégorie
          </label>
          <input
            id="sidebar-search"
            type="text"
            placeholder="Rechercher une catégorie…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-bg3 border border-border-main rounded-md pl-9 pr-3 py-1.5 text-[13px] text-text-main focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 transition-colors"
          />
        </div>
      </div>

      <nav aria-label="Navigation principale">
        <div className="mb-2">
          <div className="text-[9px] tracking-[3px] uppercase text-text3 font-mono px-5 mb-1 mt-3" aria-hidden="true">
            Navigation
          </div>
          <SidebarLink
            label="Accueil"
            icon={<Home className="w-4 h-4" aria-hidden="true" />}
            active={pathname === '/home'}
            onClick={showHome}
          />
          <SidebarLink
            label="Toutes les entrées"
            icon={<Book className="w-4 h-4" aria-hidden="true" />}
            active={pathname === '/categories/all'}
            onClick={() => showCategory('all')}
            count={articles.length}
          />
          <SidebarLink
            label="Index A-Z"
            icon={<Hash className="w-4 h-4" aria-hidden="true" />}
            active={pathname === '/categories/index'}
            onClick={() => showCategory('index')}
          />
        </div>

        <div className="h-px bg-border-main mx-4 my-3" />

        <div className="mb-2">
          {filteredMenu.map((section) => {
            const isExpanded = searchTerm ? true : expandedSection === section.title;
            return (
              <div key={section.title} className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  aria-expanded={isExpanded}
                  className={`w-full flex items-center justify-between px-5 py-1.5 cursor-pointer group transition-colors focus:outline-none focus:ring-2 focus:ring-teal/40 ${isExpanded ? 'bg-bg3/50' : ''}`}
                >
                  <span className="text-[9px] tracking-[2px] uppercase text-text3 font-mono group-hover:text-text-main transition-colors">
                    {section.title}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-text3 group-hover:text-text-main" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-text3 group-hover:text-text-main" aria-hidden="true" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-1 mb-2">
                    {section.items.map((item) => {
                      const count = getCount(item.id);
                      const isSpecial = ['dashboard', 'favorites', 'index', 'about', 'contact', 'annuaire'].includes(item.id);
                      const isActive = pathname === `/categories/${item.id}` || pathname === `/${item.id}`;
                      return (
                        <SidebarLink
                          key={item.id}
                          label={item.label}
                          icon={getIcon(item.id)}
                          active={isActive}
                          onClick={() => showCategory(item.id as Category)}
                          count={!isSpecial ? count : undefined}
                          emphasized={isSpecial}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto pt-8 pb-4 px-5">
        <div className="flex flex-col gap-2">
          <Link href="/mentions-legales" className="text-[11px] text-text3 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded">
            Mentions légales
          </Link>
          <Link href="/confidentialite" className="text-[11px] text-text3 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded">
            Confidentialité
          </Link>
          <Link href="/cgu" className="text-[11px] text-text3 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded">
            CGU
          </Link>
          <Link href="/contact" className="text-[11px] text-text3 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded">
            Contact
          </Link>
          <Link href="/contribuer" className="text-[11px] text-text3 hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded">
            Contribuer
          </Link>
        </div>
        <div className="text-[10px] text-text3/50 mt-4">© 2026 NucleAtlas</div>
      </div>
    </>
  );

  return (
    <>
      <aside
        aria-label="Menu latéral"
        className={`bg-bg2 border-r border-border-main overflow-y-auto py-4 hidden flex-col shrink-0 transition-all duration-300 ${
          isDesktopMenuCollapsed ? 'w-0 border-none opacity-0 overflow-hidden !px-0' : 'w-[260px] md:flex'
        }`}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              aria-label="Menu mobile"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-bg2 border-r border-border-main z-50 flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-border-main shrink-0">
                <div className="flex items-center gap-2 text-teal">
                  <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
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
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Fermer le menu mobile"
                  className="p-2 text-text3 hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded-md"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4">{sidebarContent}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarLink({
  label,
  icon,
  active,
  onClick,
  count,
  emphasized,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  count?: number;
  emphasized?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`w-full flex items-center gap-2.5 px-5 py-2 cursor-pointer transition-colors border-l-2 text-[13px] text-left focus:outline-none focus:ring-2 focus:ring-teal/40 ${
        active ? 'bg-teal3 text-teal border-teal' : 'text-text2 border-transparent hover:bg-bg3 hover:text-text-main'
      }`}
    >
      {icon}
      <span className={emphasized ? 'font-medium' : ''}>{label}</span>
      {typeof count === 'number' && count > 0 && (
        <span className="ml-auto text-[10px] font-mono text-text3 bg-bg3 px-1.5 py-0.5 rounded-full">{count}</span>
      )}
    </button>
  );
}
