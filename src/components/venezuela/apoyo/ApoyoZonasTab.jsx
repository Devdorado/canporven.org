import React, { useState, useMemo } from 'react';
import { useApoyoZonas } from '@/hooks/useApoyoVenezuela';
import { useLang, t } from '@/lib/i18n.jsx';
import ApoyoSummary from './ApoyoSummary';
import ApoyoZonasMap from './ApoyoZonasMap';
import ApoyoFilters from './ApoyoFilters';
import ApoyoZonasList from './ApoyoZonasList';
import ApoyoCredit from './ApoyoCredit';
import { MapPin } from 'lucide-react';

export default function ApoyoZonasTab() {
  const { lang } = useLang();
  const [filters, setFilters] = useState({
    estado: '', status: '', categoria: '', urgencia: '', soloConPedidos: '',
  });

  // Clean filters (drop empty values) for the query key
  const cleanFilters = useMemo(() => {
    const out = {};
    Object.entries(filters).forEach(([k, v]) => { if (v) out[k] = v; });
    return out;
  }, [filters]);

  const zonasQuery = useApoyoZonas(cleanFilters);
  const zonas = zonasQuery.data?.pages?.flatMap((p) => p?.data || []) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {t('apoyo.summary_title', lang)}
        </h2>
        <ApoyoCredit />
      </div>

      <ApoyoSummary />

      <div>
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">{t('apoyo.map_title', lang)}</h3>
        <ApoyoZonasMap zonas={zonas} isLoading={zonasQuery.isLoading} error={zonasQuery.error} />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-muted-foreground">{t('apoyo.zones_list', lang)}</h3>
        </div>
        <ApoyoFilters filters={filters} setFilters={setFilters} />
        <ApoyoZonasList query={zonasQuery} />
      </div>
    </div>
  );
}