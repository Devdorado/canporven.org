import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const API_BASE = 'https://sosvenezuela2026.com';

/* ---------- Cache record (Base44 entity) ----------
   The browser reads cached reports/stats/news from the VenezuelaCache entity,
   which is refreshed server-side (scheduled sync) at most ~once every 2 min.
   This avoids hitting the external API on every visit (rate limit + CORS).        */
async function fetchCache() {
  const list = await base44.entities.VenezuelaCache.filter({ cacheKey: 'main' });
  return list && list.length > 0 ? list[0] : null;
}

export function useVenezuelaCache() {
  return useQuery({
    queryKey: ['venezuela-cache'],
    queryFn: fetchCache,
    staleTime: 60_000,        // 1 min
    refetchInterval: 120_000, // 2 min
  });
}

/* ---------- Reports (from cache) ---------- */
export function useVenezuelaReports() {
  const { data, isLoading, error } = useVenezuelaCache();
  return { data: data?.reports ?? [], isLoading, error };
}

/* ---------- Stats (from cache) ---------- */
export function useVenezuelaStats() {
  const { data, isLoading, error } = useVenezuelaCache();
  return { data: data?.stats ?? {}, isLoading, error };
}

/* ---------- News (from cache) ---------- */
export function useVenezuelaNews() {
  const { data, isLoading, error } = useVenezuelaCache();
  return { data: data?.news ?? [], isLoading, error };
}

/* ---------- Cache metadata (last update) ---------- */
export function useVenezuelaUpdatedAt() {
  const { data, isLoading } = useVenezuelaCache();
  return { updatedAt: data?.updatedAt ?? null, isLoading };
}

/* ---------- Persons (on-demand, direct API) ----------
   Person search is user-triggered and not part of the shared cache,
   so it queries the external API directly only when a search runs.            */
export async function fetchPersons(query = '', estado = '') {
  const params = new URLSearchParams();
  if (query.length >= 2) params.set('q', query);
  if (estado) params.set('estado', estado);
  params.set('limit', '100');
  const res = await fetch(`${API_BASE}/api/persons/list?${params}`);
  if (!res.ok) throw new Error('Failed to fetch persons');
  return res.json();
}

export function useVenezuelaPersons(query, estado) {
  return useQuery({
    queryKey: ['venezuela-persons', query, estado],
    queryFn: () => fetchPersons(query, estado),
    enabled: query.length >= 2 || estado !== '',
    staleTime: 30_000,
  });
}

/* ---------- Damage (on-demand, direct API) ---------- */
export async function fetchDamage() {
  const res = await fetch(`${API_BASE}/api/damage/recent`);
  if (!res.ok) throw new Error('Failed to fetch damage');
  return res.json();
}

export function useVenezuelaDamage() {
  return useQuery({
    queryKey: ['venezuela-damage'],
    queryFn: fetchDamage,
    staleTime: 120_000,
  });
}