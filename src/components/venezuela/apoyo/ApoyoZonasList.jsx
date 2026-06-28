import React from 'react';
import { Button } from '@/components/ui/button';
import { useLang, t } from '@/lib/i18n.jsx';
import ApoyoZonaCard from './ApoyoZonaCard';

export default function ApoyoZonasList({ query }) {
  const { lang } = useLang();
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const zonas = data?.pages?.flatMap((p) => p?.data || []) || [];

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground text-sm">
        {t('apoyo.loading', lang)}
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-6 text-center text-sm text-destructive">
        {t('apoyo.error', lang)}
      </div>
    );
  }
  if (zonas.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
        {t('apoyo.no_zones', lang)}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zonas.map((z) => (
          <ApoyoZonaCard key={z.id} zona={z} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? t('apoyo.loading_more', lang) : t('apoyo.load_more', lang)}
          </Button>
        </div>
      )}
    </div>
  );
}