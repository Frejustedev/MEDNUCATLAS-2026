'use client';

import React from 'react';
import { AtlasProvider, useAtlas } from '@/lib/AtlasContext';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { MainContent } from '@/components/MainContent';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LandingPage } from '@/components/LandingPage';
import { AuthModal } from '@/components/AuthModal';

function AppContent() {
  const { view } = useAtlas();

  if (view === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-bg text-text-main overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        <MainContent />
      </div>
      <AuthModal />
    </div>
  );
}

export default function Page() {
  return (
    <ErrorBoundary>
      <AtlasProvider>
        <AppContent />
      </AtlasProvider>
    </ErrorBoundary>
  );
}
