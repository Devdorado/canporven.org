import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  const { lang, setLang } = useLang();

  return (
    <footer className="bg-[#121212] text-white/80">
      {/* Transparency notice */}
      <div className="max-w-4xl mx-auto px-4 pt-14 pb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8">
          <div className="flex items-start gap-3 mb-4">
            <ShieldAlert size={24} className="text-[#C48F00] shrink-0 mt-0.5" />
            <h3 className="text-lg font-semibold text-white">
              {t('footer.transparency_title', lang)}
            </h3>
          </div>
          <p className="text-sm text-white/65 leading-relaxed font-mono">
            {t('footer.transparency', lang)}
          </p>
        </div>
      </div>

      {/* Contact + Language + Copyright */}
      <div className="max-w-4xl mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 md:gap-6 pt-6 border-t border-white/10 flex-wrap">
          <div className="text-sm text-white/50">
            <span className="font-medium text-white/70">{t('footer.contact', lang)}: </span>
            <a
              href="mailto:contacto@canporven.org"
              className="underline text-[#1565C0] hover:text-[#1565C0]/80"
            >
              {t('footer.contact_email_placeholder', lang)}
            </a>
          </div>

          {/* Language toggle */}
          <div className="flex rounded-full border border-white/20 overflow-hidden">
            <button
              onClick={() => setLang('es')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                lang === 'es' ? 'bg-[#1565C0] text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                lang === 'en' ? 'bg-[#1565C0] text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="/respuesta-digital"
            className="text-sm font-medium text-[#1565C0] hover:text-[#1565C0]/80 underline"
          >
            {t('nav.digital', lang)}
          </a>

          <a
            href="/info-donaciones"
            className="text-sm font-medium text-[#1565C0] hover:text-[#1565C0]/80 underline"
          >
            {t('nav.help', lang)}
          </a>

          <p className="text-xs text-white/40">
            {t('footer.rights', lang)}
          </p>
        </div>
      </div>
    </footer>
  );
}