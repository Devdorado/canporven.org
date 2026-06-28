/* ---------- Apoyo Venezuela public API client ----------
   Public, read-only GET API. CORS open (Access-Control-Allow-Origin: *),
   so it is safe to call directly from the browser. We tag every request
   with ?source=canporven.org to identify the consumer.                       */

const API_BASE = 'https://apoyovenezuela.com/api/v1';
const SOURCE = 'canporven.org';

function buildUrl(path, params = {}) {
  const search = new URLSearchParams();
  search.set('source', SOURCE);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    search.set(key, String(value));
  });
  return `${API_BASE}${path}?${search.toString()}`;
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Apoyo Venezuela API ${res.status}`);
  return res.json();
}

/* List of zonas — returns { data, pagination: { total, nextCursor } } */
export function fetchZonas(filters = {}) {
  return getJson(buildUrl('/zonas', filters));
}

/* Single zona detail (includes contacto) */
export function fetchZona(id) {
  return getJson(buildUrl(`/zonas/${id}`));
}

/* Flat list of pedidos */
export function fetchPedidos(filters = {}) {
  return getJson(buildUrl('/pedidos', filters));
}

/* Campaigns */
export function fetchCampanas(filters = {}) {
  return getJson(buildUrl('/campanas', filters));
}

/* Aggregate statistics */
export function fetchEstadisticas() {
  return getJson(buildUrl('/estadisticas'));
}