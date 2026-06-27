import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '@/lib/i18n.jsx';
import { MapPin, ArrowRight } from 'lucide-react';

export default function VenezuelaCTA() {
  const { lang } = useLang();

  return (
    <section className="py-10 md:py-14 bg-white" aria-labelledby="vzla-cta-heading">
      <div className="max-w-5xl mx-auto px-4">
        <Link
          to="/venezuela"
          aria-label={`${t('vzla.cta_title', lang)} — ${t('vzla.cta_button', lang)}`}
          className="group block rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 md:p-8 shadow-sm hover:shadow-md hover:border-red-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 px-2.5 py-1 text-xs font-semibold text-red-700">
                {t('vzla.badge', lang)}
              </span>
              <h2 id="vzla-cta-heading" className="mt-2 text-xl md:text-2xl font-bold text-[#121212]">
                {t('vzla.cta_title', lang)}
              </h2>
              <p className="mt-1 text-sm md:text-base text-[#121212]/70">
                {t('vzla.cta_desc', lang)}
              </p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white group-hover:bg-red-700 transition-colors min-h-[44px] w-full sm:w-auto">
                {t('vzla.cta_button', lang)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}