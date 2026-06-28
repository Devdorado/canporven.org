/* Shared config for Apoyo Venezuela zone rendering: structural status colors,
   category and urgency option lists. Colors work in both light and dark mode. */

export const STATUS_CONFIG = {
  derrumbe:     { color: '#dc2626', key: 'apoyo.status.derrumbe' },
  dano_grave:   { color: '#ea580c', key: 'apoyo.status.dano_grave' },
  dano_parcial: { color: '#ca8a04', key: 'apoyo.status.dano_parcial' },
  desconocido:  { color: '#6b7280', key: 'apoyo.status.desconocido' },
  estable:      { color: '#16a34a', key: 'apoyo.status.estable' },
};

export const STATUS_ORDER = ['derrumbe', 'dano_grave', 'dano_parcial', 'desconocido'];

export const CATEGORIA_OPTIONS = [
  'rescate', 'agua', 'alimentos', 'medicinas', 'refugio', 'ropa',
  'higiene', 'energia', 'herramientas', 'transporte', 'comunicacion', 'otro',
];

export const URGENCIA_OPTIONS = ['alta', 'media', 'baja'];

export const URGENCIA_BADGE = {
  alta:  'bg-red-500/10 text-red-600 dark:text-red-400',
  media: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  baja:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

export function statusColor(status) {
  return (STATUS_CONFIG[status] || STATUS_CONFIG.desconocido).color;
}