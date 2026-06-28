import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useFeed } from '@/hooks/useFeed';
import { useLang, t } from '@/lib/i18n.jsx';
import { stripHtml } from '@/lib/sanitizeText';
import { ExternalLink, MapPin, Activity } from 'lucide-react';

function relativeTime(iso, lang) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (isNaN(then)) return '';
  const diff = Math.max(0, Date.now() - then);
  const mins = Math.floor(diff / 60000);
  const es = lang !== 'en';
  if (mins < 1) return es ? 'ahora' : 'now';
  if (mins < 60) return es ? `hace ${mins} min` : `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return es ? `hace ${hours} h` : `${hours} h ago`;
  const days = Math.floor(hours / 24);
  return es ? `hace ${days} d` : `${days} d ago`;
}

const SOURCE_BADGE = {
  sos: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
  apoyovenezuela: 'bg-primary/10 text-primary border border-primary/20',
};
const SOURCE_LABEL = {
  sos: 'SOS Venezuela 2026',
  apoyovenezuela: 'Apoyo Venezuela',
};

export default function FeedTimeline() {
  const { lang } = useLang();
  const { data, isLoading } = useFeed(120);

  return (
    <div className="space-y-4">
      {/* Credits */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{t('dash.source', lang)}</span>
        <a href="https://sosvenezuela2026.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 font-medium text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors">
          SOS Venezuela 2026 <ExternalLink className="w-3 h-3" />
        </a>
        <a href="https://apoyovenezuela.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary hover:bg-primary/20 transition-colors">
          Apoyo Venezuela <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          {isLoading && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              {t('feed.loading', lang)}
            </div>
          )}

          {!isLoading && (!data || data.length === 0) && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              {t('feed.empty', lang)}
            </div>
          )}

          {!isLoading && data && data.length > 0 && (
            <ol className="relative border-l border-border ml-2 space-y-4">
              {data.map((item) => {
                const place = [item.estado, item.ciudad].filter(Boolean).join(' · ');
                return (
                  <li key={item.id} className="ml-4">
                    <span className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${SOURCE_BADGE[item.source] || ''}`}>
                          <Activity className="w-3 h-3" />
                          {SOURCE_LABEL[item.source] || item.source}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground capitalize">
                          {t(`feed.type.${item.type}`, lang)}
                        </span>
                        <span className="ml-auto text-[11px] text-muted-foreground">
                          {relativeTime(item.createdAt, lang)}
                        </span>
                      </div>

                      <p className="font-medium text-sm">{item.title}</p>

                      {place && (
                        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                          <MapPin className="w-3 h-3" /> {place}
                        </p>
                      )}

                      {item.summary && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {stripHtml(item.summary, 200)}
                        </p>
                      )}

                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:underline">
                          {t('feed.open', lang)} <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}