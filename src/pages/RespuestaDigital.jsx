import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import PageShell from '@/components/landing/PageShell';
import SubpageHero from '@/components/landing/SubpageHero';
import ToolboxHub from '@/components/landing/ToolboxHub';

const sections = [
  { id: 'ecosistema', titleKey: 'menu.dr_ecosistema', bodyKey: 'dr.ecosistema_body' },
  { id: 'grietas', titleKey: 'menu.dr_grietas', bodyKey: 'dr.grietas_body' },
  { id: 'ia', titleKey: 'menu.dr_ia', bodyKey: 'dr.ia_body' },
];

export default function RespuestaDigital() {
  const { lang } = useLang();
  return (
    <PageShell>
      <SubpageHero titleKey="nav.digital" subtitleKey="dr.abstract" />
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-12">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-xl md:text-2xl font-bold text-[#121212] mb-3">{t(s.titleKey, lang)}</h2>
            <p className="text-[#121212]/75 leading-relaxed">{t(s.bodyKey, lang)}</p>
          </section>
        ))}
      </div>
      <section id="toolbox" className="scroll-mt-24 bg-gray-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#121212] mb-2 text-center">{t('toolbox.title', lang)}</h2>
          <p className="text-[#121212]/70 text-center max-w-2xl mx-auto mb-8">{t('toolbox.note', lang)}</p>
          <ToolboxHub />
        </div>
      </section>
    </PageShell>
  );
}