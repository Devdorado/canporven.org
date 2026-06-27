import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import {
  Fingerprint,
  Languages,
  Stethoscope,
  ShieldCheck,
  WifiOff,
  Workflow,
  ArrowRight,
} from 'lucide-react';

export default function ToolboxSection() {
  const { lang } = useLang();

  const cards = [
    {
      icon: Fingerprint,
      titleKey: 'toolbox.card1_title',
      descKey: 'toolbox.card1_desc',
      closeKey: 'toolbox.card1_close',
    },
    {
      icon: Languages,
      titleKey: 'toolbox.card2_title',
      descKey: 'toolbox.card2_desc',
      closeKey: 'toolbox.card2_close',
    },
    {
      icon: Stethoscope,
      titleKey: 'toolbox.card3_title',
      descKey: 'toolbox.card3_desc',
      closeKey: 'toolbox.card3_close',
    },
    {
      icon: ShieldCheck,
      titleKey: 'toolbox.card4_title',
      descKey: 'toolbox.card4_desc',
      closeKey: 'toolbox.card4_close',
    },
    {
      icon: WifiOff,
      titleKey: 'toolbox.card5_title',
      descKey: 'toolbox.card5_desc',
      closeKey: 'toolbox.card5_close',
    },
    {
      icon: Workflow,
      titleKey: 'toolbox.card6_title',
      descKey: 'toolbox.card6_desc',
      closeKey: 'toolbox.card6_close',
    },
  ];

  return (
    <section id="toolbox" className="py-16 md:py-24 bg-gray-50" aria-labelledby="toolbox-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="toolbox-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-4">
            {t('toolbox.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto leading-relaxed">
            {t('toolbox.note', lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-[#1565C0]/30 transition-all"
              >
                <div className="w-11 h-11 rounded-lg bg-[#1565C0]/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#1565C0]" />
                </div>
                <h3 className="font-semibold text-[#121212] mb-1.5 leading-tight">
                  {t(c.titleKey, lang)}
                </h3>
                <p className="text-sm text-[#121212]/60 mb-3 leading-snug">
                  {t(c.descKey, lang)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5B301]/15 text-[#C48F00]">
                  {t('toolbox.closes_label', lang)}: {t(c.closeKey, lang)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="#apoyos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base bg-[#1565C0] text-white hover:bg-[#1255A0] transition-colors min-h-[48px]"
          >
            {t('toolbox.cta_partner', lang)}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}