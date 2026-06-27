import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { FileText, Stethoscope } from 'lucide-react';

export default function DigitalResponseSection() {
  const { lang } = useLang();

  const stats = [
    { value: '7,2 + 7,5', labelEs: 'magnitud del doblete', labelEn: 'magnitude of the doublet' },
    { value: '~920', labelEs: 'fallecidos confirmados', labelEn: 'confirmed deaths' },
    { value: '50.000+', labelEs: 'desaparecidos', labelEn: 'missing people' },
    { value: '10–15 s', labelEs: 'de alerta temprana', labelEn: 'early warning' },
    { value: '28.040 → 26.962', labelEs: 'reportes deduplicados', labelEn: 'deduplicated reports' },
  ];

  return (
    <section id="respuesta-digital" className="py-16 md:py-24 bg-white" aria-labelledby="dr-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="dr-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-4">
            {t('dr.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-3xl mx-auto leading-relaxed">
            {t('dr.abstract', lang)}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#1565C0]/15 bg-[#1565C0]/5 p-4 text-center flex flex-col justify-center min-h-[110px]"
            >
              <p className="text-lg md:text-xl font-bold text-[#1565C0] leading-tight">{s.value}</p>
              <p className="text-xs md:text-sm text-[#121212]/60 mt-1 leading-snug">
                {lang === 'es' ? s.labelEs : s.labelEn}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/respuesta-digital"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base bg-[#1565C0] text-white hover:bg-[#1255A0] transition-colors min-h-[48px]"
          >
            <FileText size={18} />
            {t('dr.cta_report', lang)}
          </a>
          <a
            href="#medicos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base border-2 border-[#1565C0]/30 text-[#1565C0] hover:bg-[#1565C0]/5 transition-colors min-h-[48px]"
          >
            <Stethoscope size={18} />
            {t('dr.cta_doctors', lang)}
          </a>
        </div>
      </div>
    </section>
  );
}