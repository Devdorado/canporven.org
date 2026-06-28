import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVenezuelaNews } from '@/hooks/useVenezuelaData';
import { useLang, t } from '@/lib/i18n.jsx';
import { stripHtml } from '@/lib/sanitizeText';
import { Newspaper, ExternalLink } from 'lucide-react';

export default function NewsFeed() {
  const { lang } = useLang();
  const { data, isLoading } = useVenezuelaNews();

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" />
          {t('news.recent', lang)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="py-8 text-center text-muted-foreground text-sm">
            {t('news.loading', lang)}
          </div>
        )}

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {data?.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.source} · {item.published_at
                      ? new Date(item.published_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES')
                      : ''}
                  </p>
                  {item.summary && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {stripHtml(item.summary, 200)}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}