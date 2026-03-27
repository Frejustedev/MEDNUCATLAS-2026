'use client';

import React, { useState } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { motion } from 'motion/react';
import { User, Mail, Shield, Activity, Settings, Save, AlertCircle } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';
import Image from 'next/image';

export function Profile() {
  const { dbUser, authUser, showHome, setDbUser, setUserProfile } = useAtlas();
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  // Local state for edits
  const [displayName, setDisplayName] = useState(dbUser?.displayName || '');
  const [profileType, setProfileType] = useState(dbUser?.profileType || 'patient');

  if (!dbUser || !authUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-bg">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-serif text-text-main mb-2">Accès refusé</h2>
          <p className="text-text2 mb-6">Vous devez être connecté pour voir cette page.</p>
          <button onClick={showHome} className="px-6 py-2 bg-teal text-bg rounded-md hover:bg-teal2 transition-colors">
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const userRef = doc(db, 'users', authUser.uid);
      await updateDoc(userRef, {
        displayName,
        profileType
      });
      setDbUser({ ...dbUser, displayName, profileType });
      setUserProfile(profileType as any);
      setSuccessMsg('Profil mis à jour avec succès.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMsg('Erreur lors de la mise à jour du profil.');
      handleFirestoreError(error, OperationType.UPDATE, `users/${authUser.uid}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-7 md:p-8 bg-bg animate-in fade-in duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-light text-text-main mb-2">Mon Profil</h1>
          <p className="text-text2">Gérez vos informations personnelles et vos préférences.</p>
        </div>

        <div className="bg-bg2 border border-border-main rounded-xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border-main">
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center text-teal text-2xl font-bold border-2 border-teal/20 overflow-hidden">
              {authUser.photoURL ? (
                <Image src={authUser.photoURL} alt="Profile" width={80} height={80} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                displayName.charAt(0).toUpperCase() || authUser.email?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div>
              <h2 className="text-xl font-medium text-text-main">{displayName || 'Utilisateur'}</h2>
              <div className="flex items-center gap-2 text-text3 text-sm mt-1">
                <Mail className="w-3.5 h-3.5" />
                {authUser.email}
              </div>
            </div>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-teal/10 border border-teal/20 text-teal rounded-lg text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" /> {successMsg}
            </div>
          )}
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {errorMsg}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text2 mb-2">Nom d&apos;affichage</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-bg3 border border-border-main rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-teal transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text2 mb-2">Type de profil</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setProfileType('patient')}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                    profileType === 'patient' 
                      ? 'bg-teal/10 border-teal text-teal' 
                      : 'bg-bg3 border-border-main text-text3 hover:border-teal/50'
                  }`}
                >
                  <User className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Patient</span>
                </button>
                {(dbUser.role === 'medecin_non_nuc' || dbUser.role === 'medecin_nuc' || dbUser.role === 'admin') && (
                  <button
                    onClick={() => setProfileType('medecin_non_nuc')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                      profileType === 'medecin_non_nuc' 
                        ? 'bg-teal/10 border-teal text-teal' 
                        : 'bg-bg3 border-border-main text-text3 hover:border-teal/50'
                    }`}
                  >
                    <Activity className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium text-center">Médecin (Autre)</span>
                  </button>
                )}
                {(dbUser.role === 'medecin_nuc' || dbUser.role === 'admin') && (
                  <button
                    onClick={() => setProfileType('medecin_nuc')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                      profileType === 'medecin_nuc' 
                        ? 'bg-teal/10 border-teal text-teal' 
                        : 'bg-bg3 border-border-main text-text3 hover:border-teal/50'
                    }`}
                  >
                    <Shield className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium text-center">Médecin Nucléaire</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-text3 mt-2">
                Le type de profil détermine les contenus et le niveau de détail auxquels vous avez accès.
              </p>
            </div>

            <div className="pt-6 border-t border-border-main flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving || (displayName === dbUser.displayName && profileType === dbUser.profileType)}
                className="flex items-center gap-2 px-6 py-2.5 bg-teal text-bg rounded-lg font-medium hover:bg-teal2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
