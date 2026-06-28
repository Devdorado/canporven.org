import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useApoyoEstadisticas } from '@/hooks/useApoyoVenezuela';
import { useLang, t } from '@/lib/i18n.jsx';
import { STATUS_CONFIG, STATUS_ORDER } from './apoyoConfig';
import { AlertTriangle, Building2, ClipboardList, ListChecks } from 'lucide-react';

function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="border-border">
      <CardContent className="p-4 flex items-center gap-3">
        <span className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4.5 h-4.5 text-primary" />
        </span>
        <div className="min-w-0">
          <p className="text-xl font-bold leading-none">{value ?? '—'}</p>
          <p className="text-xs text-muted-foreground mt-1 truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Breakdown({ title, entries, labelFn }) {
  const { lang } = useLang();
  if (!entries || entries.length === 0) return null;
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <p className="text-sm font-semibold mb-3">{title}</p>
        <div className="flex flex-wrap gap-2">
          {entries.map(([key, count]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs"
            >
              <span className="text-muted-foreground">{labelFn(key, lang)}</span>
              <span className="font-semibold">{count}</span>
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ApoyoSummary() {
  const { lang } = useLang();
  const { data, isLoading, error } = useApoyoEstadisticas();

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

  const byStatus = data?.zonasPorStatus || {};
  const byCategory = Object.entries(data?.pedidosPorCategoria || {});
  const byUrgency = Object.entries(data?.pedidosPorUrgencia || {});

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Building2} label={t('apoyo.total_zonas', lang)} value={data?.zonas} />
        <StatCard icon={ListChecks} label={t('apoyo.pedidos_abiertos', lang)} value={data?.pedidosAbiertos} />
        <StatCard icon={ClipboardList} label={t('apoyo.pedidos_totales', lang)} value={data?.pedidosTotales} />
        <StatCard
          icon={AlertTriangle}
          label={t('apoyo.status.derrumbe', lang)}
          value={byStatus.derrumbe}
        />
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          <p className="text-sm font-semibold mb-3">{t('apoyo.by_status', lang)}</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_ORDER.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs"
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_CONFIG[s].color }}
                />
                <span className="text-muted-foreground">{t(STATUS_CONFIG[s].key, lang)}</span>
                <span className="font-semibold">{byStatus[s] ?? 0}</span>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Breakdown
          title={t('apoyo.by_category', lang)}
          entries={byCategory}
          labelFn={(key, l) => t(`apoyo.cat.${key}`, l)}
        />
        <Breakdown
          title={t('apoyo.by_urgency', lang)}
          entries={byUrgency}
          labelFn={(key, l) => t(`apoyo.urg.${key}`, l)}
        />
      </div>
    </div>
  );
}