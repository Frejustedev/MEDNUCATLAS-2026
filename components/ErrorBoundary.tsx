'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Capture les erreurs React non gérées. Affiche un fallback FR
 * et expose un hook de reporting (à brancher sur Sentry/LogRocket
 * via `window.__nucleatlasReport`).
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (typeof window !== 'undefined') {
      const reporter = (window as unknown as { __nucleatlasReport?: (e: Error, info: ErrorInfo) => void })
        .__nucleatlasReport;
      if (typeof reporter === 'function') {
        try {
          reporter(error, errorInfo);
        } catch {
          // ignore reporter failures
        }
      }
    }
    console.error('[NucleAtlas] Erreur React non capturée :', error, errorInfo);
  }

  private reset = () => {
    this.setState({ hasError: false, error: null });
  };

  private goHome = () => {
    if (typeof window !== 'undefined') window.location.href = '/';
  };

  public render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-text-main p-8" role="alert">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-serif text-text-main mb-3">Quelque chose s&apos;est mal passé</h1>
          <p className="text-text2 mb-6 leading-relaxed">
            Une erreur inattendue est survenue. Tu peux essayer de relancer cette page ou revenir à
            l&apos;accueil. L&apos;équipe a été notifiée.
          </p>
          {process.env.NODE_ENV !== 'production' && (
            <pre className="bg-bg2 border border-border-main p-4 rounded-lg text-xs text-left text-text2 overflow-auto max-h-48 mb-6">
              {this.state.error.message}
              {'\n'}
              {this.state.error.stack}
            </pre>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={this.reset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal text-bg rounded-md text-sm font-medium hover:bg-teal2 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" /> Réessayer
            </button>
            <button
              onClick={this.goHome}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border-main rounded-md text-sm font-medium text-text2 hover:text-text-main hover:bg-bg3 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <Home className="w-4 h-4" aria-hidden="true" /> Retour à l&apos;accueil
            </button>
          </div>
        </div>
      </div>
    );
  }
}
