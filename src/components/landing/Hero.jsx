import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';

const HERO_IMG = 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/9ed9f8a87_generated_8fc9e8ba.png';

export default function Hero() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-[#121212]" aria-labelledby="hero-heading">
      {/* Background image */}
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/40 to-[#121212]/80" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 text-center">
        {/* Logo */}
        <img
          src="https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/73f9c99fa_image-removebg-preview.png"
          alt="CANPORVEN.ORG"
          className="mx-auto h-24 md:h-28 w-auto object-contain mb-8"
        />

        <h1
          id="hero-heading"
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          {t('hero.headline', lang)}
        </h1>

        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-3 leading-relaxed">
          {t('hero.subheadline', lang)}
        </p>

        <p className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
          {t('hero.mission_statement', lang)}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#medicos"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#1565C0] text-white font-semibold text-base rounded-lg hover:bg-[#1255A0] transition-colors min-h-[48px] shadow-lg shadow-[#1565C0]/30"
          >
            {t('hero.cta_doctor', lang)}
          </a>
          <a
            href="#aviso"
            className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold text-base rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-colors min-h-[48px]"
          >
            {t('hero.cta_notify', lang)}
          </a>
        </div>
      </div>
    </section>
  );
}