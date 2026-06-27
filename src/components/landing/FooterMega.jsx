import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ChevronDown } from 'lucide-react';

const columns = [
  {
    titleKey: 'mfooter.col_help',
    links: [
      { key: 'mfooter.col_help_1', href: '/infodonaciones.html' },
      { key: 'mfooter.col_help_2', href: '/infodonaciones.html#dinero' },
      { key: 'mfooter.col_help_3', href: '/infodonaciones.html#fases' },
      { key: 'mfooter.col_help_4', href: '/infodonaciones.html#actuar' },
      { key: 'mfooter.col_help_5', href: '/infodonaciones.html#cooperacion' },
    ],
  },
  {
    titleKey: 'mfooter.col_digital',
    links: [
      { key: 'mfooter.col_digital_1', href: '/respuesta-digital.html#ecosistema' },
      { key: 'mfooter.col_digital_2', href: '/respuesta-digital.html#grietas' },
      { key: 'mfooter.col_digital_3', href: '/respuesta-digital.html#ia' },
      { key: 'mfooter.col_digital_4', href: '/respuesta-digital.html#toolbox' },
    ],
  },
  {
    titleKey: 'mfooter.col_contacts',
    links: [
      { key: 'mfooter.col_contacts_1', href: '/contactos.html#emergencias' },
      { key: 'mfooter.col_contacts_2', href: '/contactos.html#entidades' },
      { key: 'mfooter.col_contacts_3', href: '/contactos.html#donar' },
    ],
  },
  {
    titleKey: 'mfooter.col_initiative',
    links: [
      { key: 'mfooter.col_initiative_1', href: '/novedades.html' },
      { key: 'mfooter.col_initiative_2', href: '/#medicos' },
      { key: 'mfooter.col_initiative_3', href: '/#sumate' },
      { key: 'mfooter.col_initiative_4', href: 'mailto:contacto@canporven.org' },
    ],
  },
];

function Wordmark() {
  return (
    <span className="font-extrabold tracking-tight text-xl">
      <span style={{ color: '#5b9be0' }}>CAN</span>
      <span style={{ color: '#F2A900' }}>POR</span>
      <span style={{ color: '#e8604f' }}>VEN</span>
      <span className="text-white">.ORG</span>
    </span>
  );
}

function FooterColumn({ col }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10 md:border-0">
      {/* Mobile accordion header / desktop static title */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:cursor-default w-full flex items-center justify-between py-4 md:py-0 md:mb-4 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-white text-sm uppercase tracking-wide">{t(col.titleKey, lang)}</span>
        <ChevronDown size={18} className={`md:hidden text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <ul className={`${open ? 'block' : 'hidden'} md:block pb-4 md:pb-0 space-y-2.5`}>
        {col.links.map((link) => (
          <li key={link.key}>
            <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
              {t(link.key, lang)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterMega() {
  const { lang } = useLang();

  return (
    <footer className="bg-[#0b1322] text-white">
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Brand block */}
          <div className="lg:pr-6">
            <Wordmark />
            <p className="mt-4 text-sm text-white/65 leading-relaxed">{t('mfooter.brand_desc', lang)}</p>
            <p className="mt-3 text-sm font-medium text-white/80">{t('mfooter.domains', lang)}</p>
            <p className="mt-4 text-xs text-white/45 leading-relaxed">{t('mfooter.transparency', lang)}</p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-x-6 md:gap-y-0">
            {columns.map((col) => (
              <FooterColumn key={col.titleKey} col={col} />
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-white/55 flex flex-col gap-1">
          <p className="font-bold text-white/80">{t('mfooter.bottom_bold', lang)}</p>
          <p>{t('mfooter.bottom_note', lang)}</p>
          <p className="text-white/45">{t('mfooter.bottom_copy', lang)}</p>
        </div>
      </div>
    </footer>
  );
}