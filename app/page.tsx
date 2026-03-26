'use client';

import React, { useEffect } from 'react';
import { useAtlas } from '@/lib/AtlasContext';
import { LandingPage } from '@/components/LandingPage';
import { AuthModal } from '@/components/AuthModal';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { authUser, authLoading } = useAtlas();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && authUser) {
      router.push('/home');
    }
  }, [authUser, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <div className="text-teal font-mono animate-pulse">Chargement...</div>
      </div>
    );
  }

  if (authUser) {
    return null; // Will redirect
  }

  return (
    <>
      <LandingPage />
      <AuthModal />
    </>
  );
}
