import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ExternalLink, Heart, X, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

const partners = [
  {
    name: 'CANARYmedic.es',
    descEs: 'Plataforma de telemedicina y médicos voluntarios',
    descEn: 'Telemedicine platform and volunteer doctors',
    url: 'https://canarymedic.es',
  },
  {
    name: 'CANARYmedtech.es',
    descEs: 'Soluciones de IA · Tech for Good',
    descEn: 'AI solutions · Tech for Good',
    url: 'https://canarymedtech.es',
    logo: 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/72e0b2a3e_image.png',
  },
  {
    name: 'Jarocco AG',
    descEs: 'Hosting técnico',
    descEn: 'Technical hosting',
    url: null,
  },
  {
    name: 'webandsun.es',
    descEs: 'Sitio web',
    descEn: 'Website',
    url: 'https://webandsun.es',
  },
  {
    name: 'lanz.es',
    descEs: 'IA y arquitectura · conexión e implementación',
    descEn: 'AI & architecture · networking and delivery',
    url: 'https://lanz.es',
  },
  {
    name: 'Centro Clínico Betanzos 60',
    descEs: 'Médicos voluntarios para telemedicina y soporte',
    descEn: 'Volunteer doctors for telemedicine and support',
    url: 'https://centroclinicobetanzos60.es',
    logo: 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/5d2196561_WhatsAppImage2026-06-27at154517.jpg',
  },
];

export default function PartnersSection() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  // Auto-rotate
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = setInterval(() => {
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 5;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="apoyos" className="py-16 md:py-24 bg-gray-50" aria-labelledby="partners-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="partners-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            {t('partners.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto">{t('partners.subtitle', lang)}</p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canLeft}
            aria-label={t('partners.prev', lang)}
            className="p-2 rounded-full border border-gray-300 bg-white hover:border-[#1565C0] hover:text-[#1565C0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canRight}
            aria-label={t('partners.next', lang)}
            className="p-2 rounded-full border border-gray-300 bg-white hover:border-[#1565C0] hover:text-[#1565C0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScroll}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {partners.map((p) => {
            const desc = lang === 'es' ? p.descEs : p.descEn;
            return (
              <button
                key={p.name}
                onClick={() => setSelected(p)}
                className="snap-center shrink-0 w-64 md:w-72 group rounded-2xl border border-gray-200 bg-white p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-[#1565C0]/30 transition-all"
              >
                <div className="w-full h-36 md:h-40 shrink-0 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden mb-4">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-full h-full object-contain p-3"
                      loading="lazy"
                    />
                  ) : (
                    <Building2 size={56} className="text-[#1565C0]/40" />
                  )}
                </div>
                <p className="font-semibold text-[#121212] leading-tight mb-1">{p.name}</p>
                <p className="text-sm text-[#121212]/60 leading-snug">{desc}</p>
              </button>
            );
          })}

          {/* Placeholder */}
          <div className="snap-center shrink-0 w-64 md:w-72 rounded-2xl border-2 border-dashed border-gray-300 bg-white/50 p-6 flex flex-col items-center justify-center text-center min-h-[280px]">
            <p className="text-sm font-medium text-[#121212]/40">
              {t('partners.placeholder', lang)}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-xl bg-[#1565C0] px-6 py-8 text-center">
          <p className="text-lg md:text-xl font-semibold text-white mb-4">
            {t('partners.cta_title', lang)}
          </p>
          <a
            href="#aviso"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base bg-[#F5B301] text-[#121212] hover:bg-[#e0a300] transition-colors min-h-[48px]"
          >
            <Heart size={18} />
            {t('partners.cta_button', lang)}
          </a>
        </div>
      </div>

      {/* Popup */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label={t('partners.close', lang)}
              className="absolute top-4 right-4 p-2 text-[#121212]/50 hover:text-[#121212] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-full h-44 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden mb-5">
                {selected.logo ? (
                  <img
                    src={selected.logo}
                    alt={selected.name}
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <Building2 size={64} className="text-[#1565C0]/40" />
                )}
              </div>

              <h3 className="text-xl font-bold text-[#121212] mb-2">{selected.name}</h3>
              <p className="text-[#121212]/70 mb-6">
                {lang === 'es' ? selected.descEs : selected.descEn}
              </p>

              {selected.url ? (
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base bg-[#1565C0] text-white hover:bg-[#1255A0] transition-colors min-h-[48px]"
                >
                  <ExternalLink size={18} />
                  {t('partners.visit', lang)}
                </a>
              ) : (
                <p className="text-sm text-[#121212]/50">{t('partners.no_link', lang)}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}