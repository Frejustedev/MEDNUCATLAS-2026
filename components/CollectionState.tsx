'use client';

import React from 'react';
import { Loader2, WifiOff, RefreshCw, FileQuestion } from 'lucide-react';

/**
 * Affiche l'état d'une collection d'articles : chargement / erreur / vide.
 * Retourne `null` quand les données sont prêtes ET non vides (la liste s'affiche alors).
 *
 * Objectif : ne JAMAIS présenter « 0 article » alors que le chargement est en
 * cours ou que la lecture Firestore a échoué (leçon de l'incident d'écrasement
 * des règles : l'échec retombait silencieusement sur une liste vide).
 */
export function CollectionState({
  loading,
  error,
  onRetry,
  isEmpty,
  emptyLabel = 'Aucun article trouvé.',
}: {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  isEmpty: boolean;
  emptyLabel?: string;
}) {
  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-text3"
        role="status"
        aria-live="polite"
      >
        <Loader2 className="w-7 h-7 animate-spin text-teal mb-3" aria-hidden="true" />
        <p className="text-sm font-mono">Chargement des articles…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 px-6 text-center border border-dashed border-orange-500/30 rounded-xl bg-orange-500/5"
        role="alert"
        aria-live="assertive"
      >
        <WifiOff className="w-8 h-8 text-orange-400 mb-3" aria-hidden="true" />
        <p className="text-sm text-text-main font-medium mb-1">
          Impossible de charger les articles
        </p>
        <p className="text-xs text-text3 max-w-md mb-5">{error}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-teal text-bg hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-bg"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" /> Réessayer
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border-main rounded-xl bg-bg2 text-center px-6">
        <FileQuestion className="w-7 h-7 text-text3 mb-3" aria-hidden="true" />
        <p className="text-text3 font-mono text-sm">{emptyLabel}</p>
      </div>
    );
  }

  return null;
}
