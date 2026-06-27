import React from 'react';
import { LangProvider } from '@/lib/i18n.jsx';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import MissionSection from '@/components/landing/MissionSection';
import DoctorForm from '@/components/landing/DoctorForm';
import NotifySection from '@/components/landing/NotifySection';
import ShareSection from '@/components/landing/ShareSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <MissionSection />
          <DoctorForm />
          <NotifySection />
          <ShareSection />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}