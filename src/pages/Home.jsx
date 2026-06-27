import React from 'react';
import { LangProvider } from '@/lib/i18n.jsx';
import AlphaBanner from '@/components/landing/AlphaBanner';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import MissionSection from '@/components/landing/MissionSection';
import DoctorForm from '@/components/landing/DoctorForm';
import NotifySection from '@/components/landing/NotifySection';
import ShareSection from '@/components/landing/ShareSection';
import PartnersSection from '@/components/landing/PartnersSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-white">
        <AlphaBanner />
        <Header />
        <main>
          <Hero />
          <MissionSection />
          <DoctorForm />
          <NotifySection />
          <ShareSection />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}