import React, { useMemo } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLang, t } from '@/lib/i18n.jsx';
import { STATUS_CONFIG, STATUS_ORDER, statusColor } from './apoyoConfig';
import { AlertTriangle } from 'lucide-react';

export default function ApoyoZonasMap({ zonas = [], isLoading, error }) {
  const { lang } = useLang();

  const located = useMemo(
    () => zonas.filter((z) => z.ubicacion && typeof z.ubicacion.lat === 'number' && typeof z.ubicacion.lng === 'number'),
    [zonas]
  );

  if (isLoading) {
    return (
      <div className="h-[400px] w-full rounded-xl border border-border bg-muted/50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] w-full rounded-xl border border-destructive/20 bg-destructive/5 flex items-center justify-center text-destructive">
        <AlertTriangle className="w-5 h-5 mr-2" />
        {t('apoyo.map_error', lang)}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <MapContainer
        center={[10.5, -67.0]}
        zoom={7}
        scrollWheelZoom={false}
        className="h-[400px] w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {located.map((z) => {
          const color = statusColor(z.status);
          const r = z.resumen || {};
          return (
            <CircleMarker
              key={z.id}
              center={[z.ubicacion.lat, z.ubicacion.lng]}
              radius={8}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.6, weight: 2 }}
            >
              <Popup>
                <div className="space-y-1 min-w-[200px]">
                  <p className="font-semibold text-sm">{z.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {[z.estado, z.ciudad].filter(Boolean).join(' · ')}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    {t((STATUS_CONFIG[z.status] || STATUS_CONFIG.desconocido).key, lang)}
                  </div>
                  {r.totalPedidos != null && (
                    <p className="text-xs text-muted-foreground">
                      {t('apoyo.requests', lang)}: {r.totalPedidos} · {r.urgentes ?? 0} {t('apoyo.urgent', lang)}
                    </p>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="flex flex-wrap gap-3 px-4 py-2 bg-card border-t border-border text-xs">
        {STATUS_ORDER.map((s) => (
          <div key={s} className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STATUS_CONFIG[s].color }} />
            <span className="text-muted-foreground">{t(STATUS_CONFIG[s].key, lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}