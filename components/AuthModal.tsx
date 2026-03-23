'use client';

import React, { useState } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import Image from 'next/image';
import { X, Mail, Stethoscope, User, Radio } from 'lucide-react';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, authIntent } = useAtlas();
  const [profileType, setProfileType] = useState<'patient' | 'medecin_non_nuc' | 'medecin_nuc'>('medecin_nuc');

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    await loginWithGoogle(profileType, authIntent || 'free');
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
      <div className="bg-bg2 border border-border-main rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={closeAuthModal} className="absolute top-4 right-4 text-text3 hover:text-text-main transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-serif mb-2 text-text-main">Bienvenue</h2>
        <p className="text-sm text-text2 mb-6">
          {authIntent === 'pro' || authIntent === 'expert' 
            ? "Créez un compte pour activer votre abonnement." 
            : "Connectez-vous pour accéder à l&apos;encyclopédie."}
        </p>

        <div className="mb-6">
          <label className="text-xs font-mono tracking-wide text-text3 uppercase mb-3 block">Je suis :</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => setProfileType('patient')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${profileType === 'patient' ? 'border-gold bg-gold/10 text-gold' : 'border-border-main bg-bg3 text-text2 hover:border-gold/50'}`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium text-center">Patient</span>
            </button>
            <button 
              onClick={() => setProfileType('medecin_non_nuc')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${profileType === 'medecin_non_nuc' ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-border-main bg-bg3 text-text2 hover:border-blue-500/50'}`}
            >
              <Stethoscope className="w-6 h-6" />
              <span className="text-xs font-medium text-center">Médecin non nucléaire</span>
            </button>
            <button 
              onClick={() => setProfileType('medecin_nuc')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${profileType === 'medecin_nuc' ? 'border-teal bg-teal/10 text-teal' : 'border-border-main bg-bg3 text-text2 hover:border-teal/50'}`}
            >
              <Radio className="w-6 h-6" />
              <span className="text-xs font-medium text-center">Médecin Nucléaire</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleGoogleLogin} 
            className="flex items-center justify-center gap-3 w-full bg-white text-black rounded-xl py-3.5 font-medium hover:bg-gray-100 transition-colors"
          >
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5" />
            Continuer avec Google
          </button>
          
          <button 
            onClick={() => alert("L'authentification par email nécessite une configuration dans Firebase. Demandez à l'assistant de l'activer si vous le souhaitez !")} 
            className="flex items-center justify-center gap-3 w-full bg-bg3 text-text-main border border-border-main rounded-xl py-3.5 font-medium hover:bg-bg-light transition-colors"
          >
            <Mail className="w-5 h-5" />
            Continuer avec Email
          </button>
        </div>
        
        <p className="text-[10px] text-text3 text-center mt-6 leading-relaxed">
          En continuant, vous acceptez nos conditions d&apos;utilisation et notre politique de confidentialité.
        </p>
      </div>
    </div>
  );
}
