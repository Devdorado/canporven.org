import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { ExternalLink } from 'lucide-react';

export default function ApoyoCredit({ className = '' }) {
  const { lang } = useLang();
  return (
    <a
      href="https://apoyovenezuela.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary hover:bg-primary/20 transition-colors ${className}`}
    >
      {t('apoyo.credit', lang)}
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>
  );
}