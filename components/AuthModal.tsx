'use client';

import React, { useState } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { UserProfile } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { X, Mail, Stethoscope, User, Radio, ArrowLeft, Loader2 } from 'lucide-react';

type AuthMode = 'select' | 'email-login' | 'email-signup';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail, signupWithEmail, authIntent } = useAtlas();
  const [profileType, setProfileType] = useState<UserProfile>(
    (authIntent === 'patient' || authIntent === 'medecin_non_nuc' || authIntent === 'medecin_nuc') 
      ? authIntent as UserProfile 
      : 'medecin_nuc'
  );
  const [authMode, setAuthMode] = useState<AuthMode>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update profileType when authIntent changes
  React.useEffect(() => {
    if (authIntent === 'patient' || authIntent === 'medecin_non_nuc' || authIntent === 'medecin_nuc') {
      setProfileType(authIntent as UserProfile);
    }
    setAuthMode('select');
    setEmail('');
    setPassword('');
    setError('');
  }, [authIntent, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await loginWithGoogle(profileType, authIntent || 'patient');
      closeAuthModal();
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue avec Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      if (authMode === 'email-login') {
        await loginWithEmail(email, password, profileType, authIntent || 'patient');
      } else {
        await signupWithEmail(email, password, profileType, authIntent || 'patient');
      }
      closeAuthModal();
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError("Email ou mot de passe incorrect.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("Cet email est déjà utilisé. Veuillez vous connecter.");
      } else if (err.code === 'auth/weak-password') {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
      } else {
        setError(err.message || "Une erreur est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
      <div className="bg-bg2 border border-border-main rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={closeAuthModal} className="absolute top-4 right-4 text-text3 hover:text-text-main transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        {authMode !== 'select' && (
          <button 
            onClick={() => { setAuthMode('select'); setError(''); }} 
            className="absolute top-4 left-4 text-text3 hover:text-text-main transition-colors flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
        )}
        
        <h2 className="text-2xl font-serif mb-2 text-text-main mt-4">
          {authMode === 'select' ? 'Bienvenue' : authMode === 'email-login' ? 'Connexion' : 'Inscription'}
        </h2>
        <p className="text-sm text-text2 mb-6">
          {authMode === 'select' 
            ? (authIntent === 'medecin_non_nuc' || authIntent === 'medecin_nuc' 
                ? "Créez un compte pour activer votre abonnement." 
                : "Connectez-vous pour accéder à l'encyclopédie.")
            : (authMode === 'email-login' ? "Connectez-vous avec votre email." : "Créez un compte avec votre email.")}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs">
            {error}
          </div>
        )}

        {authMode === 'select' ? (
          <>
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
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-white text-black rounded-xl py-3.5 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5" />}
                Continuer avec Google
              </button>
              
              <button 
                onClick={() => setAuthMode('email-signup')} 
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-teal text-bg rounded-xl py-3.5 font-medium hover:bg-teal2 transition-colors disabled:opacity-50"
              >
                <Mail className="w-5 h-5" />
                S&apos;inscrire avec Email
              </button>

              <button 
                onClick={() => setAuthMode('email-login')} 
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-bg3 text-text-main border border-border-main rounded-xl py-3.5 font-medium hover:bg-bg-light transition-colors disabled:opacity-50"
              >
                Se connecter avec Email
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text2 mb-1.5">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text2 mb-1.5">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal text-bg rounded-xl py-3.5 font-medium hover:bg-teal2 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {authMode === 'email-login' ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        )}
        
        <p className="text-[10px] text-text3 text-center mt-6 leading-relaxed">
          En continuant, vous acceptez nos <Link href="/mentions-legales" onClick={closeAuthModal} className="underline hover:text-teal transition-colors">conditions d&apos;utilisation et notre politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  );
}
