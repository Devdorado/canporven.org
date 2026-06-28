const API_BASE = 'https://sosvenezuela2026.com';

/**
 * Fetch persons from SOS Venezuela 2026 public API
 * @param {string} query - Optional search query (min 2 chars)
 * @param {string} estado - Optional filter: 'seeking_info' | 'found_alive'
 * @param {number} limit - Max results (default 100)
 */
export async function fetchPersons(query = '', estado = '', limit = 100) {
  const params = new URLSearchParams();
  if (query.length >= 2) params.set('q', query);
  if (estado) params.set('estado', estado);
  params.set('limit', String(limit));

  const res = await fetch(`${API_BASE}/api/persons/list?${params}`);
  if (!res.ok) throw new Error(`SOS Venezuela API error: ${res.status}`);
  return res.json();
}

/**
 * Fetch all missing persons (convenience wrapper)
 */
export async function fetchAllMissingPersons(limit = 1000) {
  const all = [];
  let offset = 0;
  const batchSize = 100;

  while (offset < limit) {
    const params = new URLSearchParams();
    params.set('estado', 'seeking_info');
    params.set('limit', String(batchSize));
    params.set('offset', String(offset));

    const res = await fetch(`${API_BASE}/api/persons/list?${params}`);
    if (!res.ok) throw new Error(`SOS Venezuela API error: ${res.status}`);
    const batch = await res.json();
    if (!batch || batch.length === 0) break;

    all.push(...batch);
    offset += batchSize;

    // Rate limit safety
    if (batch.length < batchSize) break;
  }

  return all;
}

/**
 * Normalize SOS Venezuela person to standard format
 */
export function normalizeSOSPerson(raw) {
  return {
    id: raw.id,
    source: 'sosvenezuela2026',
    displayName: raw.display_name || '',
    cedula: raw.cedula_masked || '',
    cedulaFull: raw.cedula || '', // may be null/empty
    age: raw.age ?? null,
    sex: raw.sex || '',
    municipio: raw.municipio || '',
    estado: raw.estado || 'seeking_info',
    hospitalName: raw.hospital_name || '',
    photoPath: raw.photo_path || '',
    status: raw.status || 'seeking_info',
    raw,
  };
}

/**
 * Fetch all missing persons and normalize
 */
export async function fetchNormalizedMissingPersons(limit = 1000) {
  const raw = await fetchAllMissingPersons(limit);
  return raw.map(normalizeSOSPerson);
}
