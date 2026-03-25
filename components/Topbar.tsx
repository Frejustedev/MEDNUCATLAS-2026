'use client';

import React, { useState, useEffect } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Search, Sparkles, UserCircle } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { UserProfile } from '@/lib/data';
import { AdvancedSearch } from './AdvancedSearch';

export function Topbar() {
  const { searchQuery, setSearchQuery, userProfile, setUserProfile, lang, setLang, showLanding } = useAtlas();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProfile(e.target.value as UserProfile);
  };

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
        <div 
          className="w-[260px] flex items-center gap-2.5 px-5 border-r border-border-main h-full shrink-0 hidden md:flex cursor-pointer hover:bg-bg3 transition-colors"
          onClick={showLanding}
        >
          <div className="w-[30px] h-[30px] bg-gradient-to-br from-teal to-teal2 rounded-md flex items-center justify-center font-mono text-xs text-bg font-medium shadow-[0_0_16px_var(--color-glow)] shrink-0">
            Mn
          </div>
          <div className="font-serif text-[17px] font-semibold">
            MedNuc<span className="text-teal">Atlas</span>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-3 px-5">
          <div className="flex-1 max-w-[520px] relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text3 w-3.5 h-3.5 pointer-events-none group-hover:text-teal transition-colors" />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full bg-bg3 border border-border-main rounded-lg py-2 pr-4 pl-10 text-left text-text3 font-sans text-[13px] outline-none transition-colors hover:border-teal/40 hover:bg-bg3/80 flex items-center justify-between"
            >
              <span>Rechercher une entrée, un radiopharmaceutique...</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border-main bg-bg text-[10px] font-mono text-text3">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 px-5 ml-auto">
          <div className="flex items-center gap-2 bg-bg3 border border-border-main rounded-md px-2 py-1">
            <UserCircle className="w-4 h-4 text-text3" />
            <select
              value={userProfile}
              onChange={handleProfileChange}
              className="bg-transparent border-none text-text-main text-xs font-mono cursor-pointer outline-none"
            >
              <option value="patient">👤 Patient</option>
              <option value="medecin_non_nuc">🩺 Médecin non nucléaire</option>
              <option value="medecin_nuc">☢️ Médecin Nucléaire</option>
            </select>
          </div>

          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-bg3 border border-border-main rounded-md px-2.5 py-1.5 text-text2 text-xs font-mono cursor-pointer outline-none hidden sm:block"
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
            <option value="ar">🇩🇿 عربي</option>
          </select>
          
          <AuthButton />
        </div>
      </div>

      <AdvancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
