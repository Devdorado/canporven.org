import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ArrowRight } from 'lucide-react';
import ToolboxHub from '@/components/landing/ToolboxHub';

export default function ToolboxSection() {
  const { lang } = useLang();

  return (
    <section id="toolbox" className="py-16 md:py-24 bg-[#F7FAFD]" aria-labelledby="toolbox-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="toolbox-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-4">
            {t('toolbox.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-2xl mx-auto leading-relaxed">
            {t('toolbox.note', lang)}
          </p>
        </div>

        <ToolboxHub />

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