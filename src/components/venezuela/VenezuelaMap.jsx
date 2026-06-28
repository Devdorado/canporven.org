import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useVenezuelaReports } from '@/hooks/useVenezuelaData';
import { useApoyoZonasLocated } from '@/hooks/useApoyoVenezuela';
import { useLang, t } from '@/lib/i18n.jsx';
import { STATUS_CONFIG, STATUS_ORDER, statusColor } from '@/components/venezuela/apoyo/apoyoConfig';
import { Switch } from '@/components/ui/switch';
import { AlertTriangle, Building2 } from 'lucide-react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const severityConfig = {
  rojo:      { color: '#dc2626', label: 'Crítico',      fillOpacity: 0.7 },
  naranja:   { color: '#ea580c', label: 'Alto',         fillOpacity: 0.6 },
  amarillo:  { color: '#ca8a04', label: 'Medio',        fillOpacity: 0.5 },
  verde:     { color: '#16a34a', label: 'Bajo',         fillOpacity: 0.4 },
};

// Square divIcon for Apoyo Venezuela zones — distinct shape from the SOS circles.
function squareIcon(color) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:14px;height:14px;background:${color};border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,0.3);transform:rotate(45deg);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7],
  });
}

export default function VenezuelaMap() {
  const { lang } = useLang();
  const { data: reports, isLoading, error } = useVenezuelaReports();
  const { data: apoyoZonas } = useApoyoZonasLocated();

  const [showSos, setShowSos] = useState(true);
  const [showApoyo, setShowApoyo] = useState(true);

  const apoyoIcons = useMemo(() => {
    const cache = {};
    Object.keys(STATUS_CONFIG).forEach((s) => { cache[s] = squareIcon(STATUS_CONFIG[s].color); });
    return cache;
  }, []);

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
        {t('map.error', lang)}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Source toggles */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 bg-card border-b border-border">
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Switch checked={showSos} onCheckedChange={setShowSos} />
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
          <span className="text-muted-foreground">{t('map.src_sos', lang)}</span>
        </label>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <Switch checked={showApoyo} onCheckedChange={setShowApoyo} />
          <span className="inline-block w-2.5 h-2.5 bg-[#dc2626] rotate-45" />
          <span className="text-muted-foreground">{t('map.src_apoyo', lang)}</span>
        </label>
      </div>

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

        {/* SOS Venezuela 2026 — circles */}
        {showSos && reports?.map((r) => {
          const sev = severityConfig[r.severity] || severityConfig.amarillo;
          return (
            <CircleMarker
              key={`sos-${r.id}`}
              center={[r.lat_pub, r.lng_pub]}
              radius={8}
              pathOptions={{
                color: sev.color,
                fillColor: sev.color,
                fillOpacity: sev.fillOpacity,
                weight: 2,
              }}
            >
              <Popup>
                <div className="space-y-1 min-w-[200px]">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {t('map.src_sos', lang)}
                  </p>
                  <p className="font-semibold text-sm">{r.title}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: sev.color }}
                    />
                    {sev.label} · {r.category}
                  </div>
                  <p className="text-xs text-muted-foreground">{r.municipio}</p>
                  {r.verification && (
                    <p className="text-xs text-muted-foreground">
                      {t('reports.verification', lang)} {r.verification}
                    </p>
                  )}
                  {r.source_url && (
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline"
                    >
                      {t('map.open_source', lang)}
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Apoyo Venezuela — squares colored by structural status */}
        {showApoyo && apoyoZonas?.map((z) => {
          const color = statusColor(z.status);
          const r = z.resumen || {};
          return (
            <Marker
              key={`apoyo-${z.id}`}
              position={[z.ubicacion.lat, z.ubicacion.lng]}
              icon={apoyoIcons[z.status] || apoyoIcons.desconocido}
            >
              <Popup>
                <div className="space-y-1 min-w-[200px]">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {t('map.src_apoyo', lang)}
                  </p>
                  <p className="font-semibold text-sm">{z.nombre}</p>
                  <p className="text-xs text-muted-foreground">
                    {[z.estado, z.ciudad].filter(Boolean).join(' · ')}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="inline-block w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
                    {t((STATUS_CONFIG[z.status] || STATUS_CONFIG.desconocido).key, lang)}
                  </div>
                  {r.totalPedidos != null && (
                    <p className="text-xs text-muted-foreground">
                      {t('apoyo.requests', lang)}: {r.totalPedidos} · {r.urgentes ?? 0} {t('apoyo.urgent', lang)}
                    </p>
                  )}
                  <a
                    href="https://apoyovenezuela.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary underline"
                  >
                    {t('map.open_source', lang)}
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="space-y-1.5 px-4 py-2.5 bg-card border-t border-border text-xs">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-foreground/80 flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            {t('map.src_sos', lang)}
          </span>
          {Object.entries(severityConfig).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: val.color }}
              />
              <span className="text-muted-foreground">{val.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-semibold text-foreground/80 flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 bg-[#dc2626] rotate-45" />
            {t('map.src_apoyo', lang)}
          </span>
          {STATUS_ORDER.map((s) => (
            <div key={s} className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rotate-45" style={{ backgroundColor: STATUS_CONFIG[s].color }} />
              <span className="text-muted-foreground">{t(STATUS_CONFIG[s].key, lang)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}