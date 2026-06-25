'use client';

import React, { useState, useEffect } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Search, Sparkles, UserCircle, Menu } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { ThemeToggle } from './ThemeToggle';
import { UserProfile } from '@/lib/data';
import { AdvancedSearch } from './AdvancedSearch';

export function Topbar() {
  const { searchQuery, setSearchQuery, userProfile, setUserProfile, showLanding, isMobileMenuOpen, setIsMobileMenuOpen, isDesktopMenuCollapsed, setIsDesktopMenuCollapsed, dbUser } = useAtlas();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProfile(e.target.value as UserProfile);
  };

  // Determine allowed profiles based on dbUser role
  const allowedProfiles = ['patient'];
  if (dbUser?.role === 'medecin_non_nuc' || dbUser?.role === 'medecin_nuc' || dbUser?.role === 'admin') {
    allowedProfiles.push('medecin_non_nuc');
  }
  if (dbUser?.role === 'medecin_nuc' || dbUser?.role === 'admin') {
    allowedProfiles.push('medecin_nuc');
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="col-span-full flex items-center bg-bg2 border-b border-border-main relative z-10 h-14 shrink-0">
        <button 
          className="md:hidden p-3 text-text2 hover:text-teal transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div 
          className={`${isDesktopMenuCollapsed ? 'w-14 justify-center px-0' : 'w-[260px] px-5'} flex items-center gap-2.5 border-r border-border-main h-full shrink-0 hidden md:flex transition-all duration-300`}
        >
          <div 
            className="relative flex items-center justify-center w-8 h-8 text-teal shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={showLanding}
            title="Accueil"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,201,177,0.4)]" fill="none" stroke="currentColor" strokeWidth="3">
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(30 50 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(90 50 50)" />
              <ellipse cx="50" cy="50" rx="42" ry="14" transform="rotate(150 50 50)" />
              <circle cx="86" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(30 50 50)" />
              <circle cx="50" cy="8" r="5" fill="currentColor" stroke="none" transform="rotate(90 50 50)" />
              <circle cx="14" cy="71" r="5" fill="currentColor" stroke="none" transform="rotate(150 50 50)" />
              <circle cx="50" cy="50" r="16" fill="currentColor" stroke="none" />
              <text x="50" y="55" fontSize="16" fontWeight="bold" fill="#0B0F19" stroke="none" textAnchor="middle" fontFamily="serif">Nc</text>
            </svg>
          </div>
          {!isDesktopMenuCollapsed && (
            <div 
              className="font-serif text-xl font-semibold ml-1 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden whitespace-nowrap"
              onClick={showLanding}
            >
              Nucle<span className="text-[#C8A96E]">Atlas</span>
            </div>
          )}
          
          <button 
            className={`ml-auto p-1.5 text-text3 hover:text-teal hover:bg-bg3 rounded-md transition-colors ${isDesktopMenuCollapsed ? 'hidden' : 'block'}`}
            onClick={() => setIsDesktopMenuCollapsed(true)}
            title="Réduire le menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {isDesktopMenuCollapsed && (
          <button 
            className="hidden md:block p-3 text-text2 hover:text-teal transition-colors ml-2"
            onClick={() => setIsDesktopMenuCollapsed(false)}
            title="Afficher le menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1 flex items-center gap-3 px-2 md:px-5">
          <div className="flex-1 max-w-[520px] relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text3 w-3.5 h-3.5 pointer-events-none group-hover:text-teal transition-colors" />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-bg3 border border-border-main rounded-lg py-2 pr-4 pl-10 text-left text-text3 font-sans text-[13px] outline-none transition-colors hover:border-teal/40 hover:bg-bg3/80 flex items-center justify-between"
            >
              <span className="truncate">Rechercher...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border-main bg-bg text-[10px] font-mono text-text3">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 md:px-5 ml-auto">
          <div className="flex items-center gap-2 bg-bg3 border border-border-main rounded-md px-2 py-1">
            <UserCircle className="w-4 h-4 text-text3" />
            <select
              value={userProfile}
              onChange={handleProfileChange}
              className="bg-transparent border-none text-text-main text-xs font-mono cursor-pointer outline-none"
            >
              <option value="patient" className="bg-bg text-text-main">👤 Patient</option>
              {allowedProfiles.includes('medecin_non_nuc') && (
                <option value="medecin_non_nuc" className="bg-bg text-text-main">🩺 Médecin non nucléaire</option>
              )}
              {allowedProfiles.includes('medecin_nuc') && (
                <option value="medecin_nuc" className="bg-bg text-text-main">☢️ Médecin Nucléaire</option>
              )}
              {dbUser?.role === 'admin' && (
                <option value="admin" className="bg-bg text-text-main">👑 Administrateur</option>
              )}
            </select>
          </div>

          {/* Badge « FR » retiré : le site est monolingue (français). Un
              sélecteur de langue laissait croire à tort à un multilingue
              inexistant. À réintroduire le jour où d'autres langues existent. */}

          <ThemeToggle />
          
          <AuthButton />
        </div>
      </div>

      <AdvancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
