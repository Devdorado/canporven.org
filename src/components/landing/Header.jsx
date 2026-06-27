import React, { useState, useRef, useEffect } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#1565C0]/30 dark:border-white/20 text-[#1565C0] dark:text-yellow-300 hover:bg-[#1565C0]/5 dark:hover:bg-white/10 transition-colors"
      aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
      aria-pressed={isDark}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

const helpItems = [
  { key: 'menu.help_situacion', href: '/info-donaciones#situacion' },
  { key: 'menu.help_dinero', href: '/info-donaciones#dinero' },
  { key: 'menu.help_fases', href: '/info-donaciones#fases' },
  { key: 'menu.help_funciona', href: '/info-donaciones#funciona' },
  { key: 'menu.help_canarias', href: '/info-donaciones#canarias' },
  { key: 'menu.help_actuar', href: '/info-donaciones#actuar' },
];

const drItems = [
  { key: 'menu.dr_ecosistema', href: '/respuesta-digital#ecosistema' },
  { key: 'menu.dr_grietas', href: '/respuesta-digital#grietas' },
  { key: 'menu.dr_ia', href: '/respuesta-digital#ia' },
  { key: 'menu.dr_toolbox', href: '/respuesta-digital#toolbox' },
];

function DesktopDropdown({ labelKey, labelHref, items }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <a
        href={labelHref}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#121212] hover:text-[#1565C0] transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {t(labelKey, lang)}
        <ChevronDown size={15} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </a>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="min-w-[230px] rounded-xl border border-[#1565C0]/10 bg-white shadow-xl py-2">
            {items.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="block px-4 py-2.5 text-sm text-[#121212] hover:bg-[#1565C0]/5 hover:text-[#1565C0] transition-colors"
              >
                {t(item.key, lang)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileDropdown({ labelKey, labelHref, items, onNavigate }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#1565C0]/10">
      <div className="flex items-center justify-between">
        <a
          href={labelHref}
          onClick={onNavigate}
          className="flex-1 py-3 text-base font-semibold text-[#121212]"
        >
          {t(labelKey, lang)}
        </a>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={t(labelKey, lang)}
          className="p-3 text-[#1565C0]"
        >
          <ChevronDown size={20} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open && (
        <div className="pb-2">
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={onNavigate}
              className="block py-2.5 pl-4 text-sm text-[#121212]/70 hover:text-[#1565C0]"
            >
              {t(item.key, lang)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full border-2 border-[#1565C0]/30 overflow-hidden" role="radiogroup" aria-label="Language">
      <button
        onClick={() => setLang('es')}
        className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
          lang === 'es' ? 'bg-[#1565C0] text-white' : 'bg-white text-[#1565C0] hover:bg-[#1565C0]/5'
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
          lang === 'en' ? 'bg-[#1565C0] text-white' : 'bg-white text-[#1565C0] hover:bg-[#1565C0]/5'
        }`}
        role="radio"
        aria-checked={lang === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

export default function Header() {
  const { lang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#1565C0]/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img
            src="https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/73f9c99fa_image-removebg-preview.png"
            alt="CANPORVEN.ORG"
            className="h-10 md:h-11 w-auto object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <a href="/" className="px-3 py-2 text-sm font-semibold text-[#121212] hover:text-[#1565C0] transition-colors">
            {t('nav.home', lang)}
          </a>
          <DesktopDropdown labelKey="nav.help" labelHref="/info-donaciones" items={helpItems} />
          <DesktopDropdown labelKey="nav.digital" labelHref="/respuesta-digital" items={drItems} />
          <a href="/novedades" className="px-3 py-2 text-sm font-semibold text-[#121212] hover:text-[#1565C0] transition-colors">
            {t('nav.novedades', lang)}
          </a>
          <a href="/contactos" className="px-3 py-2 text-sm font-semibold text-[#121212] hover:text-[#1565C0] transition-colors">
            {t('nav.contactos', lang)}
          </a>
          <a href="/#medicos" className="px-3 py-2 text-sm font-semibold text-[#121212] hover:text-[#1565C0] transition-colors">
            {t('nav.medicos', lang)}
          </a>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <a
            href="/#sumate"
            className="hidden lg:inline-flex items-center px-5 py-2 rounded-full font-semibold text-sm text-white bg-[#1565C0] hover:bg-[#1255A0] transition-colors min-h-[44px]"
          >
            {t('nav.join', lang)}
          </a>

          <LangSwitch />

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#1565C0] hover:bg-[#1565C0]/5 transition-colors"
            aria-label={t('nav.menu', lang)}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#1565C0]/10 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <a
              href="/"
              onClick={closeMobile}
              className="block py-3 text-base font-semibold text-[#121212] border-b border-[#1565C0]/10"
            >
              {t('nav.home', lang)}
            </a>
            <MobileDropdown labelKey="nav.help" labelHref="/info-donaciones" items={helpItems} onNavigate={closeMobile} />
            <MobileDropdown labelKey="nav.digital" labelHref="/respuesta-digital" items={drItems} onNavigate={closeMobile} />
            <a
              href="/novedades"
              onClick={closeMobile}
              className="block py-3 text-base font-semibold text-[#121212] border-b border-[#1565C0]/10"
            >
              {t('nav.novedades', lang)}
            </a>
            <a
              href="/contactos"
              onClick={closeMobile}
              className="block py-3 text-base font-semibold text-[#121212] border-b border-[#1565C0]/10"
            >
              {t('nav.contactos', lang)}
            </a>
            <a
              href="/#medicos"
              onClick={closeMobile}
              className="block py-3 text-base font-semibold text-[#121212] border-b border-[#1565C0]/10"
            >
              {t('nav.medicos', lang)}
            </a>
            <a
              href="/#sumate"
              onClick={closeMobile}
              className="block my-3 text-center px-5 py-3 rounded-full font-semibold text-sm text-white bg-[#1565C0] hover:bg-[#1255A0] transition-colors"
            >
              {t('nav.join', lang)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}