import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useVenezuelaReports } from '@/hooks/useVenezuelaData';
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

const categoryIcons = {
  collapsed_building: Building2,
  damaged_building:   Building2,
  gas_leak:           AlertTriangle,
  blocked_road:       AlertTriangle,
  trapped_person:     AlertTriangle,
  collection_center:  Building2,
  default:            AlertTriangle,
};

export default function VenezuelaMap() {
  const { data: reports, isLoading, error } = useVenezuelaReports();

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
        No se pudo cargar el mapa
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
        {reports?.map((r) => {
          const sev = severityConfig[r.severity] || severityConfig.amarillo;
          const IconComp = categoryIcons[r.category] || categoryIcons.default;
          return (
            <CircleMarker
              key={r.id}
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
                      Verificación: {r.verification}
                    </p>
                  )}
                  {r.source_url && (
                    <a
                      href={r.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline"
                    >
                      Abrir fuente
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="flex flex-wrap gap-3 px-4 py-2 bg-card border-t border-border text-xs">
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
    </div>
  );
}