import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { Plus } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/d79d1b943_image.png';

export default function Hero() {
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background image — no dark filter */}
      <img
        src={HERO_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
        loading="eager"
      />

      <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20 md:py-32 flex justify-center">
        {/* Frosted glass container */}
        <div
          className="w-full max-w-3xl text-center px-6 py-10 md:px-12 md:py-14 rounded-3xl"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          {/* Logo */}
          <img
            src="https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/73f9c99fa_image-removebg-preview.png"
            alt="CANPORVEN.ORG"
            className="mx-auto h-20 sm:h-24 md:h-28 w-auto object-contain mb-6 md:mb-8"
          />

          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
          >
            {t('hero.headline', lang)}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto mb-3 leading-relaxed drop-shadow">
            {t('hero.subheadline', lang)}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed drop-shadow">
            {t('hero.mission_statement', lang)}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch">
            <a
              href="#sumate"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#1565C0] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-[#1255A0] transition-colors min-h-[48px] shadow-lg shadow-[#1565C0]/30"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E23124] shrink-0">
                <Plus size={14} className="text-white" strokeWidth={3} />
              </span>
              {t('hero.cta_doctor', lang)}
            </a>
            <a
              href="?tab=company#sumate"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold text-sm sm:text-base rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/20 transition-colors min-h-[48px] backdrop-blur-sm"
            >
              {t('hero.cta_professional', lang)}
            </a>
            <a
              href="?tab=individual#sumate"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold text-sm sm:text-base rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/20 transition-colors min-h-[48px] backdrop-blur-sm"
            >
              {t('hero.cta_individual', lang)}
            </a>
            <a
              href="#aviso"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white font-semibold text-sm sm:text-base rounded-lg border-2 border-white/50 hover:border-white hover:bg-white/20 transition-colors min-h-[48px] backdrop-blur-sm"
            >
              {t('hero.cta_notify', lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}