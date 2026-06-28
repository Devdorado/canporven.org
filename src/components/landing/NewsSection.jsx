import React, { useState, useEffect } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { base44 } from '@/api/base44Client';
import { stripHtml } from '@/lib/sanitizeText';
import { Newspaper, ExternalLink, ArrowRight, AlertTriangle } from 'lucide-react';

function timeAgo(dateStr, lang) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  const units = [
    { s: 86400, es: ['d', 'd'], en: ['d', 'd'] },
    { s: 3600, es: ['h', 'h'], en: ['h', 'h'] },
    { s: 60, es: ['min', 'min'], en: ['min', 'min'] },
  ];
  for (const u of units) {
    if (diff >= u.s) {
      const v = Math.floor(diff / u.s);
      return lang === 'en' ? `${v}${u.en[0]} ago` : `hace ${v}${u.es[0]}`;
    }
  }
  return lang === 'en' ? 'just now' : 'ahora';
}

export default function NewsSection() {
  const { lang } = useLang();
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    base44.entities.NewsItem.list('-pubDate', 5)
      .then((data) => { if (mounted) setItems(data); })
      .catch(() => { if (mounted) setItems([]); });
    return () => { mounted = false; };
  }, []);

  return (
    <section id="noticias" className="py-16 md:py-24 bg-[#F5F7FB]" aria-labelledby="news-heading">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center shrink-0">
            <Newspaper size={24} className="text-[#1565C0]" />
          </span>
          <div>
            <h2 id="news-heading" className="text-2xl md:text-3xl font-bold text-[#121212] leading-tight">
              {t('news.title', lang)}
            </h2>
            <p className="text-sm text-[#121212]/60">{t('news.subtitle', lang)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {items === null && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 rounded-xl bg-white border border-gray-200 animate-pulse" />
              ))}
            </>
          )}

          {items !== null && items.length === 0 && (
            <div className="rounded-xl bg-white border border-gray-200 p-6 text-center text-[#121212]/60 text-sm">
              {t('news.empty', lang)}
            </div>
          )}

          {items?.map((n) => (
            <article
              key={n.id}
              className="rounded-xl bg-white border border-gray-200 p-4 md:p-5 hover:border-[#1565C0]/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#1565C0]">{n.source}</span>
                <span className="text-xs text-[#121212]/50 shrink-0">{timeAgo(n.pubDate, lang)}</span>
              </div>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-1.5 font-semibold text-[#121212] hover:text-[#1565C0] transition-colors leading-snug"
              >
                <span>{n.title}</span>
                <ExternalLink size={14} className="mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              {stripHtml(n.snippet) && (
                <p
                  className="text-sm text-[#121212]/70 mt-1.5 leading-snug overflow-hidden"
                  style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                >{stripHtml(n.snippet)}</p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="flex items-center gap-1.5 text-xs text-[#121212]/50">
            <AlertTriangle size={13} className="shrink-0" />
            {t('news.disclaimer', lang)}
          </p>
          <a
            href="/novedades.html"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1565C0] hover:text-[#1255A0] transition-colors"
          >
            {t('news.more', lang)}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}