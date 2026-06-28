import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useVenezuelaStats, useVenezuelaReports } from '@/hooks/useVenezuelaData';
import { useLang, t } from '@/lib/i18n.jsx';
import { stripHtml } from '@/lib/sanitizeText';
import { Activity, TrendingUp, ArrowRight } from 'lucide-react';

/* A continuous ticker showing live Venezuela numbers (linked to /venezuela)
   and the latest news headlines (linked to each article). Numbers refresh
   automatically via the shared cache (2-min refetch). */
export default function NewsTicker() {
  const { lang } = useLang();
  const { data: stats } = useVenezuelaStats();
  const { data: reports } = useVenezuelaReports();
  const [news, setNews] = useState([]);

  useEffect(() => {
    let mounted = true;
    base44.entities.NewsItem.list('-pubDate', 8)
      .then((data) => { if (mounted) setNews(data || []); })
      .catch(() => { if (mounted) setNews([]); });
    return () => { mounted = false; };
  }, []);

  const critical = reports?.filter((r) => r.severity === 'rojo').length ?? 0;

  // Stat chips — each links to the live dashboard.
  const statItems = [
    { label: t('stats.missing', lang), value: stats?.missing ?? 0 },
    { label: t('stats.found', lang), value: stats?.found ?? 0 },
    { label: t('stats.reports', lang), value: reports?.length ?? 0 },
    { label: t('stats.critical', lang), value: critical },
  ];

  // Build a single ordered list of ticker nodes, then render it twice for the loop.
  const renderTrack = (keyPrefix) => (
    <div className="flex items-center shrink-0">
      {statItems.map((s, i) => (
        <a
          key={`${keyPrefix}-stat-${i}`}
          href="/venezuela"
          className="flex items-center gap-1.5 px-5 py-2 whitespace-nowrap hover:text-white transition-colors"
        >
          <TrendingUp size={13} className="text-red-300 shrink-0" />
          <span className="font-bold tabular-nums">{Number(s.value).toLocaleString()}</span>
          <span className="text-white/70">{s.label}</span>
        </a>
      ))}
      {news.map((n, i) => (
        <a
          key={`${keyPrefix}-news-${i}`}
          href={n.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-5 py-2 whitespace-nowrap hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
          <span className="text-white/60 text-[11px] uppercase tracking-wide font-semibold">{n.source}</span>
          <span className="text-white/90">{stripHtml(n.title, 90)}</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#0b1322] text-white text-xs md:text-sm border-b border-white/10">
      <div className="max-w-full mx-auto flex items-stretch">
        {/* Fixed label */}
        <a
          href="/venezuela"
          className="shrink-0 flex items-center gap-1.5 px-3 md:px-4 bg-red-600 font-bold uppercase tracking-wide text-[11px] md:text-xs"
        >
          <Activity size={14} className="animate-pulse" />
          <span className="hidden sm:inline">{t('vzla.badge', lang)}</span>
          <span className="sm:hidden">●</span>
        </a>

        {/* Scrolling area */}
        <div className="ticker-pause relative flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker">
            {renderTrack('a')}
            {renderTrack('b')}
          </div>
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0b1322] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0b1322] to-transparent" />
        </div>

        {/* CTA to dashboard */}
        <a
          href="/venezuela"
          className="shrink-0 hidden md:flex items-center gap-1 px-4 bg-white/5 hover:bg-white/10 transition-colors font-semibold whitespace-nowrap"
        >
          {t('vzla.cta_button', lang)}
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}