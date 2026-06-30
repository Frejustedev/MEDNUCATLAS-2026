'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { AuthModal } from '@/components/AuthModal';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-dvh bg-bg text-text-main overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        {children}
      </div>
      <AuthModal />
    </div>
  );
}
