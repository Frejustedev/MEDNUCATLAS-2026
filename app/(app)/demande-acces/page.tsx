'use client';

import React, { useState } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { apiFetch, ApiError } from '@/lib/api-client';
import { CheckCircle, Loader2, Shield, Stethoscope, Radio } from 'lucide-react';

type RequestedRole = 'medecin_non_nuc' | 'medecin_nuc';

export default function DemandeAccesPage() {
  const { authUser, dbUser, openAuthModal } = useAtlas();
  const [requestedRole, setRequestedRole] = useState<RequestedRole>('medecin_non_nuc');
  const [justification, setJustification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!authUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg p-8">
        <div className="text-center max-w-md">
          <Shield className="w-12 h-12 text-teal mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-serif text-text-main mb-3">Connexion requise</h1>
          <p className="text-text2 mb-6">Connecte-toi pour demander un accès professionnel.</p>
          <button
            onClick={() => openAuthModal()}
            className="px-6 py-2.5 bg-teal text-bg rounded-lg font-medium hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (dbUser?.role === 'admin' || dbUser?.role === 'medecin_nuc') {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg p-8">
        <div className="text-center max-w-md">
          <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-serif text-text-main mb-3">Accès déjà actif</h1>
          <p className="text-text2">Tu disposes déjà du rôle « {dbUser.role} ».</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (justification.trim().length < 20) {
      setError('Justification trop courte (20 caractères minimum).');
      return;
    }
    setIsSubmitting(true);
    try {
      await apiFetch('/api/role-request', {
        method: 'POST',
        body: JSON.stringify({ requestedRole, justification }),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erreur d'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex-1 flex items-center justify-center bg-bg p-8">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-teal mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-2xl font-serif text-text-main mb-3">Demande envoyée</h1>
          <p className="text-text2 mb-6">
            Notre équipe va examiner ta demande. Tu recevras une notification dès qu&apos;elle sera traitée.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-bg p-6 md:p-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif text-text-main mb-3">Demande d&apos;accès professionnel</h1>
          <p className="text-text2 leading-relaxed">
            Tu es médecin et souhaites accéder aux contenus professionnels de NucleAtlas ? Choisis le
            rôle correspondant à ta pratique et justifie brièvement ta demande. Notre équipe la
            relira manuellement (sous 48-72h ouvrées).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-bg2 border border-border-main rounded-xl p-6 space-y-6">
          <fieldset>
            <legend className="block text-sm font-medium text-text-main mb-3">Rôle demandé</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRequestedRole('medecin_non_nuc')}
                aria-pressed={requestedRole === 'medecin_non_nuc'}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-colors text-left focus:outline-none focus:ring-2 focus:ring-teal ${
                  requestedRole === 'medecin_non_nuc'
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-border-main bg-bg3 text-text2 hover:border-teal/50'
                }`}
              >
                <Stethoscope className="w-6 h-6" aria-hidden="true" />
                <div>
                  <div className="font-medium">Médecin (non MN)</div>
                  <div className="text-xs opacity-80">Médecin généraliste, cardiologue, oncologue…</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRequestedRole('medecin_nuc')}
                aria-pressed={requestedRole === 'medecin_nuc'}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-colors text-left focus:outline-none focus:ring-2 focus:ring-teal ${
                  requestedRole === 'medecin_nuc'
                    ? 'border-teal bg-teal/10 text-teal'
                    : 'border-border-main bg-bg3 text-text2 hover:border-teal/50'
                }`}
              >
                <Radio className="w-6 h-6" aria-hidden="true" />
                <div>
                  <div className="font-medium">Médecin Nucléaire</div>
                  <div className="text-xs opacity-80">Spécialiste exerçant en médecine nucléaire.</div>
                </div>
              </button>
            </div>
          </fieldset>

          <div>
            <label htmlFor="justification" className="block text-sm font-medium text-text-main mb-2">
              Justification * <span className="text-xs text-text3">({justification.length}/2000)</span>
            </label>
            <textarea
              id="justification"
              required
              rows={6}
              minLength={20}
              maxLength={2000}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Décris ton activité (établissement, ville, fonction, N° RPPS si applicable). Cette information sera revue par notre équipe."
              className="w-full bg-bg3 border border-border-main rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/40 resize-y transition-colors"
            />
          </div>

          {error && (
            <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal text-bg rounded-lg text-sm font-medium hover:bg-teal2 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              Envoyer la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
