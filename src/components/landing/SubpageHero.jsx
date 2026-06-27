import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';

export default function SubpageHero({ titleKey, subtitleKey }) {
  const { lang } = useLang();
  return (
    <section className="bg-[#0b1322] text-white">
      <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t(titleKey, lang)}</h1>
        {subtitleKey && (
          <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
            {t(subtitleKey, lang)}
          </p>
        )}
      </div>
    </section>
  );
}