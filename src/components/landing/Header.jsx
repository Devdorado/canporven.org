import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { Menu, X, ChevronDown } from 'lucide-react';
import MegaMenu from '@/components/landing/MegaMenu';

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1565C0]/10">
      <div className="relative max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/73f9c99fa_image-removebg-preview.png"
            alt="CANPORVEN.ORG"
            className="h-10 md:h-11 w-auto object-contain"
          />
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Mega menu trigger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white bg-[#1565C0] hover:bg-[#1255A0] transition-colors min-h-[44px]"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={t('nav.menu', lang)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden sm:inline">{t('nav.menu', lang)}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Language Switch */}
          <div className="flex rounded-full border-2 border-[#1565C0]/30 overflow-hidden" role="radiogroup" aria-label="Language">
            <button
              onClick={() => setLang('es')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                lang === 'es'
                  ? 'bg-[#1565C0] text-white'
                  : 'bg-white text-[#1565C0] hover:bg-[#1565C0]/5'
              }`}
              role="radio"
              aria-checked={lang === 'es'}
              aria-label="Español"
            >
              ES
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                lang === 'en'
                  ? 'bg-[#1565C0] text-white'
                  : 'bg-white text-[#1565C0] hover:bg-[#1565C0]/5'
              }`}
              role="radio"
              aria-checked={lang === 'en'}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>

        <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}