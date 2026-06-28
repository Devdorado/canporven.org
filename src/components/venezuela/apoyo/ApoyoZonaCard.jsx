import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLang, t } from '@/lib/i18n.jsx';
import { STATUS_CONFIG, URGENCIA_BADGE } from './apoyoConfig';
import ApoyoCredit from './ApoyoCredit';
import { Users, HelpCircle } from 'lucide-react';

function StatusBadge({ status }) {
  const { lang } = useLang();
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.desconocido;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: `${cfg.color}1a`, color: cfg.color }}>
      <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
      {t(cfg.key, lang)}
    </span>
  );
}

export default function ApoyoZonaCard({ zona }) {
  const { lang } = useLang();
  const r = zona.resumen || {};
  const pedidos = zona.pedidos || [];
  const fotos = zona.fotos || [];

  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-snug">{zona.nombre}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {[zona.estado, zona.ciudad, zona.zona].filter(Boolean).join(' · ')}
            </p>
          </div>
          <StatusBadge status={zona.status} />
        </div>

        {zona.personasAtrapadas === 'si' && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
            <Users className="w-3 h-3" />
            {t('apoyo.trapped_yes', lang)}
          </span>
        )}
        {zona.personasAtrapadas === 'no_se' && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
            <HelpCircle className="w-3 h-3" />
            {t('apoyo.trapped_unknown', lang)}
          </span>
        )}

        {zona.descripcion && (
          <p
            className="text-sm text-muted-foreground leading-snug overflow-hidden"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
          >
            {zona.descripcion}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {r.pendientes != null && r.pendientes > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              {r.pendientes} {t('apoyo.pending', lang)}
            </span>
          )}
          {r.urgentes != null && r.urgentes > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:text-red-400">
              {r.urgentes} {t('apoyo.urgent', lang)}
            </span>
          )}
        </div>

        {fotos.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {fotos.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                className="w-16 h-16 rounded-lg object-cover shrink-0 border border-border"
              />
            ))}
          </div>
        )}

        {pedidos.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <p className="text-xs font-semibold text-muted-foreground">{t('apoyo.requests', lang)}</p>
            {pedidos.map((p, i) => (
              <div key={i} className="flex items-start gap-2 text-xs rounded-lg border border-border px-2.5 py-1.5">
                <span className="font-medium shrink-0">{t(`apoyo.cat.${p.categoria}`, lang)}</span>
                <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${URGENCIA_BADGE[p.urgencia] || ''}`}>
                  {t(`apoyo.urg.${p.urgencia}`, lang)}
                </span>
                {p.descripcion && <span className="text-muted-foreground min-w-0 truncate">{p.descripcion}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="pt-1">
          <ApoyoCredit />
        </div>
      </CardContent>
    </Card>
  );
}