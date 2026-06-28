import React from 'react';
import { LangProvider } from '@/lib/i18n.jsx';
import AlphaBanner from '@/components/landing/AlphaBanner';
import Header from '@/components/landing/Header';
import NewsTicker from '@/components/landing/NewsTicker';
import Hero from '@/components/landing/Hero';
import VenezuelaCTA from '@/components/landing/VenezuelaCTA';
import MissionSection from '@/components/landing/MissionSection';
import GetInvolvedSection from '@/components/landing/GetInvolvedSection';
import NotifySection from '@/components/landing/NotifySection';
import NewsSection from '@/components/landing/NewsSection';
import DigitalResponseSection from '@/components/landing/DigitalResponseSection';
import CitizenSolutionsSection from '@/components/landing/CitizenSolutionsSection';
import ToolboxSection from '@/components/landing/ToolboxSection';
import ShareSection from '@/components/landing/ShareSection';
import PartnersSection from '@/components/landing/PartnersSection';
import Footer from '@/components/landing/Footer';
import ManitoChat from '@/components/landing/ManitoChat';

export default function Home() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-white">
        <AlphaBanner />
        <Header />
        <NewsTicker />
        <main>
          <Hero />
          <VenezuelaCTA />
          <MissionSection />
          <GetInvolvedSection />
          <NewsSection />
          <NotifySection />
          <DigitalResponseSection />
          <CitizenSolutionsSection />
          <ToolboxSection />
          <ShareSection />
          <PartnersSection />
        </main>
        <Footer />
        <ManitoChat />
      </div>
    </LangProvider>
  );
}