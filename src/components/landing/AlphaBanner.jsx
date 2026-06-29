import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { X } from 'lucide-react';

export default function AlphaBanner() {
  const { lang } = useLang();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="alert"
      aria-label="Alpha notice"
      className="w-full bg-[#F5B301]/15 border-b border-[#F5B301]/40 text-[#121212]"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-start gap-2">
        <span className="shrink-0 mt-0.5 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-[#F5B301] text-[#121212]">
          BETA
        </span>
        <p className="text-xs md:text-sm leading-snug text-[#121212]">
          {t('alpha.text', lang)}
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Cerrar"
          className="shrink-0 ml-auto -mr-1 p-1 rounded-md text-[#121212]/60 hover:text-[#121212] hover:bg-[#F5B301]/20 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}