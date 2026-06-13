'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { ArticleMode } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { X, Mail, Stethoscope, User, Radio, ArrowLeft, Loader2 } from 'lucide-react';

type AuthMode = 'select' | 'email-login' | 'email-signup';
type AuthError = { code?: string; message?: string };

function isValidProfileIntent(value: string | null): value is ArticleMode {
  return value === 'patient' || value === 'medecin_non_nuc' || value === 'medecin_nuc';
}

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, loginWithEmail, signupWithEmail, authIntent } = useAtlas();
  const [profileType, setProfileType] = useState<ArticleMode>(
    isValidProfileIntent(authIntent) ? authIntent : 'medecin_nuc'
  );
  const [authMode, setAuthMode] = useState<AuthMode>('select');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isValidProfileIntent(authIntent)) setProfileType(authIntent);
    setAuthMode('select');
    setEmail('');
    setPassword('');
    setError('');
  }, [authIntent, isAuthModalOpen]);

  // Focus management — accessibilité
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, [isAuthModalOpen]);

  // Esc pour fermer
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isAuthModalOpen, closeAuthModal]);

  const formatAuthError = useCallback((err: AuthError): string => {
    switch (err.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email ou mot de passe incorrect.';
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé. Connecte-toi à la place.';
      case 'auth/weak-password':
        return 'Le mot de passe doit contenir au moins 6 caractères.';
      case 'auth/popup-closed-by-user':
        return 'Fenêtre Google fermée. Réessaie quand tu veux.';
      case 'auth/network-request-failed':
        return 'Problème réseau. Vérifie ta connexion.';
      default:
        return err.message || 'Une erreur est survenue.';
    }
  }, []);

  if (!isAuthModalOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await loginWithGoogle(profileType, authIntent || 'patient');
      closeAuthModal();
    } catch (err) {
      setError(formatAuthError(err as AuthError));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Remplis tous les champs.');
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
    } catch (err) {
      setError(formatAuthError(err as AuthError));
    } finally {
      setIsLoading(false);
    }
  };

  const title = authMode === 'select' ? 'Bienvenue' : authMode === 'email-login' ? 'Connexion' : 'Inscription';
  const subtitle =
    authMode === 'select'
      ? authIntent === 'medecin_non_nuc' || authIntent === 'medecin_nuc'
        ? "Crée un compte pour activer ton abonnement."
        : "Connecte-toi pour accéder à l'encyclopédie."
      : authMode === 'email-login'
      ? 'Connecte-toi avec ton email.'
      : 'Crée un compte avec ton email.';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-bg2 border border-border-main rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          ref={closeBtnRef}
          onClick={closeAuthModal}
          aria-label="Fermer la fenêtre"
          className="absolute top-4 right-4 text-text3 hover:text-text-main transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded-md"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {authMode !== 'select' && (
          <button
            onClick={() => {
              setAuthMode('select');
              setError('');
            }}
            aria-label="Revenir au choix d'authentification"
            className="absolute top-4 left-4 text-text3 hover:text-text-main transition-colors flex items-center gap-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal rounded-md"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour
          </button>
        )}

        <h2 id="auth-modal-title" className="text-2xl font-serif mb-2 text-text-main mt-4">
          {title}
        </h2>
        <p className="text-sm text-text2 mb-6">{subtitle}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs" role="alert">
            {error}
          </div>
        )}

        {authMode === 'select' ? (
          <>
            <div className="mb-6">
              <fieldset>
                <legend className="text-xs font-mono tracking-wide text-text3 uppercase mb-3 block">
                  Je suis :
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <ProfileOption
                    icon={<User className="w-6 h-6" aria-hidden="true" />}
                    label="Patient"
                    value="patient"
                    selected={profileType}
                    onSelect={setProfileType}
                    color="gold"
                  />
                  <ProfileOption
                    icon={<Stethoscope className="w-6 h-6" aria-hidden="true" />}
                    label="Médecin non nucléaire"
                    value="medecin_non_nuc"
                    selected={profileType}
                    onSelect={setProfileType}
                    color="blue"
                  />
                  <ProfileOption
                    icon={<Radio className="w-6 h-6" aria-hidden="true" />}
                    label="Médecin Nucléaire"
                    value="medecin_nuc"
                    selected={profileType}
                    onSelect={setProfileType}
                    color="teal"
                  />
                </div>
              </fieldset>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-white text-black rounded-xl py-3.5 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Image src="https://www.google.com/favicon.ico" alt="" width={20} height={20} className="w-5 h-5" />
                )}
                Continuer avec Google
              </button>

              <button
                onClick={() => setAuthMode('email-signup')}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-teal text-bg rounded-xl py-3.5 font-medium hover:bg-teal2 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                S&apos;inscrire avec Email
              </button>

              <button
                onClick={() => setAuthMode('email-login')}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 w-full bg-bg3 text-text-main border border-border-main rounded-xl py-3.5 font-medium hover:bg-bg-light transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                Se connecter avec Email
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-xs font-medium text-text2 mb-1.5">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 transition-colors"
                placeholder="votre@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="auth-password" className="block text-xs font-medium text-text2 mb-1.5">
                Mot de passe
              </label>
              <input
                id="auth-password"
                type="password"
                autoComplete={authMode === 'email-signup' ? 'new-password' : 'current-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal text-bg rounded-xl py-3.5 font-medium hover:bg-teal2 transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {authMode === 'email-login' ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        )}

        <p className="text-[10px] text-text3 text-center mt-6 leading-relaxed">
          En continuant, tu acceptes nos{' '}
          <Link
            href="/cgu"
            onClick={closeAuthModal}
            className="underline hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded"
          >
            conditions d&apos;utilisation
          </Link>
          {' '}et notre{' '}
          <Link
            href="/confidentialite"
            onClick={closeAuthModal}
            className="underline hover:text-teal transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function ProfileOption({
  icon,
  label,
  value,
  selected,
  onSelect,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: ArticleMode;
  selected: ArticleMode;
  onSelect: (v: ArticleMode) => void;
  color: 'gold' | 'blue' | 'teal';
}) {
  const isSelected = selected === value;
  const palette = {
    gold: isSelected ? 'border-gold bg-gold/10 text-gold' : 'border-border-main bg-bg3 text-text2 hover:border-gold/50',
    blue: isSelected
      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
      : 'border-border-main bg-bg3 text-text2 hover:border-blue-500/50',
    teal: isSelected ? 'border-teal bg-teal/10 text-teal' : 'border-border-main bg-bg3 text-text2 hover:border-teal/50',
  };
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-teal ${palette[color]}`}
    >
      {icon}
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  );
}
