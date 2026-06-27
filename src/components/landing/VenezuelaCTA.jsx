import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '@/lib/i18n.jsx';
import { MapPin, ArrowRight, Search, ExternalLink } from 'lucide-react';

export default function VenezuelaCTA() {
  const { lang } = useLang();

  return (
    <section className="py-10 md:py-14 bg-white dark:bg-background" aria-labelledby="vzla-cta-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50 to-white dark:from-red-950/30 dark:to-background p-6 md:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/10 dark:bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-700 dark:text-red-300">
                {t('vzla.badge', lang)}
              </span>
              <h2 id="vzla-cta-heading" className="mt-2 text-xl md:text-2xl font-bold text-[#121212] dark:text-white">
                {t('vzla.cta_title', lang)}
              </h2>
              <p className="mt-1 text-sm md:text-base text-[#121212]/70 dark:text-white/70">
                {t('vzla.cta_desc', lang)}
              </p>
            </div>
          </div>

          {/* Two complementary CTAs side by side */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/venezuela"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background"
            >
              {t('vzla.cta_button', lang)}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>

            <a
              href="https://desaparecidosterremotovenezuela.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-600 bg-white dark:bg-transparent px-5 py-3 text-sm font-semibold text-red-700 dark:text-red-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              {t('vzla.cta_missing', lang)}
              <ExternalLink className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3 text-xs text-[#121212]/60 dark:text-white/55 text-center sm:text-left">
            {t('vzla.cta_missing_note', lang)}
          </p>
        </div>
      </div>
    </section>
  );
}