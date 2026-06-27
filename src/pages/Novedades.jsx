import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import PageShell from '@/components/landing/PageShell';
import SubpageHero from '@/components/landing/SubpageHero';
import { Calendar } from 'lucide-react';

const updates = [
  { date: '2026-06-27', titleKey: 'news.item1_title', bodyKey: 'news.item1_body' },
  { date: '2026-06-25', titleKey: 'news.item2_title', bodyKey: 'news.item2_body' },
  { date: '2026-06-22', titleKey: 'news.item3_title', bodyKey: 'news.item3_body' },
];

export default function Novedades() {
  const { lang } = useLang();
  return (
    <PageShell>
      <SubpageHero titleKey="nav.novedades" subtitleKey="news.intro" />
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-6">
        {updates.map((u) => (
          <article key={u.date} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-[#1565C0] font-medium mb-2">
              <Calendar size={16} />
              {new Date(u.date).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <h2 className="text-lg font-bold text-[#121212] mb-2">{t(u.titleKey, lang)}</h2>
            <p className="text-[#121212]/75 leading-relaxed">{t(u.bodyKey, lang)}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}