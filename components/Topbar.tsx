'use client';

import React from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { Search, Sparkles, UserCircle } from 'lucide-react';
import { AuthButton } from './AuthButton';
import { UserProfile } from '@/lib/data';

export function Topbar() {
  const { searchQuery, setSearchQuery, userProfile, setUserProfile, lang, setLang, showLanding } = useAtlas();

  const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProfile(e.target.value as UserProfile);
  };

  return (
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
        <div className="flex-1 max-w-[520px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text3 w-3.5 h-3.5 pointer-events-none" />
          <input
            type="text"
            className="w-full bg-bg3 border border-border-main rounded-lg py-2 pr-4 pl-10 text-text-main font-sans text-[13px] outline-none transition-colors focus:border-teal/40 placeholder:text-text3"
            placeholder="Rechercher une entrée, un radiopharmaceutique, un protocole..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
  );
}
