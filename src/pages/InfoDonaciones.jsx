import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import PageShell from '@/components/landing/PageShell';
import SubpageHero from '@/components/landing/SubpageHero';

const sections = [
  { id: 'situacion', titleKey: 'menu.help_situacion', bodyKey: 'help.situacion_body' },
  { id: 'dinero', titleKey: 'menu.help_dinero', bodyKey: 'help.dinero_body' },
  { id: 'fases', titleKey: 'menu.help_fases', bodyKey: 'help.fases_body' },
  { id: 'funciona', titleKey: 'menu.help_funciona', bodyKey: 'help.funciona_body' },
  { id: 'canarias', titleKey: 'menu.help_canarias', bodyKey: 'help.canarias_body' },
  { id: 'actuar', titleKey: 'menu.help_actuar', bodyKey: 'help.actuar_body' },
  { id: 'cooperacion', titleKey: 'menu.help_cooperacion', bodyKey: 'help.cooperacion_body' },
];

export default function InfoDonaciones() {
  const { lang } = useLang();
  return (
    <PageShell>
      <SubpageHero titleKey="nav.help" subtitleKey="help.intro" />
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-[#121212] mb-3">{t(s.titleKey, lang)}</h2>
            <p className="text-[#121212]/75 leading-relaxed">{t(s.bodyKey, lang)}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}