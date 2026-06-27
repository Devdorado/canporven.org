import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: 'nav.mission', href: '#mision' },
    { key: 'nav.doctors', href: '#medicos' },
    { key: 'nav.notify', href: '#aviso' },
    { key: 'nav.help', href: '/infodonaciones' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1565C0]/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/73f9c99fa_image-removebg-preview.png"
            alt="CANPORVEN.ORG"
            className="h-10 md:h-11 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-[#121212]/70 hover:text-[#1565C0] transition-colors"
            >
              {t(item.key, lang)}
            </a>
          ))}
        </nav>

        {/* Language Switch + Mobile Toggle */}
        <div className="flex items-center gap-3">
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

          <button
            className="md:hidden p-2 text-[#121212]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-[#1565C0]/10 bg-white px-4 py-4 space-y-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-base font-medium text-[#121212]/80 hover:text-[#1565C0] py-2"
            >
              {t(item.key, lang)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}