import React from 'react';
import { LangProvider } from '@/lib/i18n.jsx';
import AlphaBanner from '@/components/landing/AlphaBanner';
import Header from '@/components/landing/Header';
import FooterMega from '@/components/landing/FooterMega';

export default function PageShell({ children }) {
  return (
    <LangProvider>
      <div className="min-h-screen bg-white flex flex-col">
        <AlphaBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <FooterMega />
      </div>
    </LangProvider>
  );
}