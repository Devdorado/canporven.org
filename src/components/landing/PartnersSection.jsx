import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ExternalLink, Heart } from 'lucide-react';

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

const PLACEHOLDER_COUNT = 5;

export default function PartnersSection() {
  const { lang } = useLang();

  return (
    <section id="apoyos" className="py-16 md:py-24 bg-gray-50" aria-labelledby="partners-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="partners-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            {t('partners.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto">{t('partners.subtitle', lang)}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {partners.map((p) => {
            const desc = lang === 'es' ? p.descEs : p.descEn;
            const card = (
              <div className="flex items-start gap-3 h-full">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0] font-bold text-sm overflow-hidden">
                  {p.logo ? (
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-full h-full object-contain p-1"
                      loading="lazy"
                    />
                  ) : (
                    p.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#121212] leading-tight">{p.name}</p>
                  <p className="text-sm text-[#121212]/60 mt-0.5">{desc}</p>
                </div>
              </div>
            );
            return p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-[#1565C0]/30 transition-all"
              >
                {card}
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#1565C0]">
                  <ExternalLink size={14} />
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {p.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </a>
            ) : (
              <div
                key={p.name}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                {card}
              </div>
            );
          })}

          {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
            <div
              key={`ph-${i}`}
              className="rounded-xl border-2 border-dashed border-gray-300 bg-white/50 p-5 flex items-center justify-center min-h-[110px]"
            >
              <p className="text-sm font-medium text-[#121212]/40 text-center">
                {t('partners.placeholder', lang)}
              </p>
            </div>
          ))}
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
    </section>
  );
}