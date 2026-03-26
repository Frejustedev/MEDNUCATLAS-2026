'use client';

import React, { useEffect } from 'react';
import { LogIn, LogOut, Settings, User } from 'lucide-react';
import { useAtlas } from '@/lib/AtlasContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function AuthButton() {
  const { authUser, dbUser, openAuthModal, logout, showAdmin, showProfile, showHome } = useAtlas();
  const pathname = usePathname();

  const isAdmin = dbUser?.role === 'admin' || (authUser?.email === 'agbotonfrejuste@gmail.com' && authUser?.emailVerified);

  useEffect(() => {
    if (pathname === '/admin' && !isAdmin && authUser !== undefined) {
      showHome();
    }
  }, [pathname, isAdmin, authUser, showHome]);

  return (
    <div className="flex items-center gap-3 ml-2">
      {authUser ? (
        <>
          {isAdmin && (
            <button
              onClick={showAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${pathname === '/admin' ? 'bg-teal text-bg' : 'bg-bg3 text-text2 hover:bg-bg-light'}`}
              title="Panneau d'administration"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
          
          <div className="flex items-center gap-2 pl-2 border-l border-border-main">
            {authUser.photoURL ? (
              <Image 
                src={authUser.photoURL} 
                alt="Profile" 
                width={24} 
                height={24} 
                className="rounded-full border border-border-main"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal text-[10px] font-bold">
                {authUser.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            
            <button
              onClick={showProfile}
              className={`flex items-center gap-1.5 px-2 py-1.5 transition-colors ${pathname === '/profile' ? 'text-teal' : 'text-text3 hover:text-text-main'}`}
              title="Mon Profil"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-2 py-1.5 text-text3 hover:text-red-400 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => openAuthModal()}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-teal text-bg rounded-md text-xs font-medium hover:bg-teal2 transition-colors shadow-[0_0_15px_rgba(0,201,177,0.2)]"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Connexion</span>
        </button>
      )}
    </div>
  );
}
