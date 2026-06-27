import React, { useEffect, useRef } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import {
  Home as HomeIcon,
  Heart,
  Newspaper,
  BookOpen,
  Stethoscope,
  Bell,
  Handshake,
  Share2,
  X,
} from 'lucide-react';

const groups = [
  {
    titleKey: 'menu.group_main',
    descKey: 'menu.group_main_desc',
    items: [
      { key: 'nav.home', descKey: 'menu.home_desc', href: '/', icon: HomeIcon },
      { key: 'nav.mission', descKey: 'menu.mission_desc', href: '/#mision', icon: Heart },
      { key: 'nav.partners', descKey: 'menu.partners_desc', href: '/#apoyos', icon: Handshake },
    ],
  },
  {
    titleKey: 'menu.group_participate',
    descKey: 'menu.group_participate_desc',
    items: [
      { key: 'nav.doctors', descKey: 'menu.doctors_desc', href: '/#sumate', icon: Stethoscope },
      { key: 'nav.notify', descKey: 'menu.notify_desc', href: '/#aviso', icon: Bell },
      { key: 'nav.share', descKey: 'menu.share_desc', href: '/#comparte', icon: Share2 },
    ],
  },
  {
    titleKey: 'menu.group_resources',
    descKey: 'menu.group_resources_desc',
    items: [
      { key: 'nav.digital', descKey: 'menu.digital_desc', href: '/respuesta-digital.html', icon: Newspaper },
      { key: 'nav.help', descKey: 'menu.help_desc', href: '/infodonaciones.html', icon: BookOpen },
    ],
  },
];

export default function MegaMenu({ open, onClose }) {
  const { lang } = useLang();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <button
        className="fixed inset-0 top-0 z-40 bg-black/30 cursor-default"
        aria-label={t('partners.close', lang)}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 right-0 top-full z-50 border-t border-[#1565C0]/10 bg-white shadow-xl"
      >
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-5 md:hidden">
            <span className="text-base font-semibold text-[#121212]">{t('nav.menu', lang)}</span>
            <button onClick={onClose} aria-label={t('partners.close', lang)} className="p-2 text-[#121212]">
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {groups.map((group) => (
              <div key={group.titleKey}>
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#1565C0] mb-1">
                  {t(group.titleKey, lang)}
                </h3>
                <p className="text-xs text-[#121212]/50 mb-3">{t(group.descKey, lang)}</p>

                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.key}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-[#1565C0]/5 transition-colors group"
                        >
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1565C0]/10 text-[#1565C0] shrink-0 group-hover:bg-[#1565C0] group-hover:text-white transition-colors">
                            <Icon size={18} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-[#121212] group-hover:text-[#1565C0] transition-colors">
                              {t(item.key, lang)}
                            </span>
                            <span className="block text-xs text-[#121212]/55 leading-snug">
                              {t(item.descKey, lang)}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}