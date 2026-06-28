import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchZonas,
  fetchZona,
  fetchPedidos,
  fetchEstadisticas,
} from '@/lib/apoyovenezuelaClient';

const PAGE_LIMIT = 20;

/* ---------- Zonas (filtered + cursor "load more") ----------
   filters: { estado, ciudad, status, categoria, urgencia, texto, soloConPedidos } */
export function useApoyoZonas(filters = {}) {
  return useInfiniteQuery({
    queryKey: ['apoyo-zonas', filters],
    queryFn: ({ pageParam }) =>
      fetchZonas({ ...filters, limit: PAGE_LIMIT, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.pagination?.nextCursor ?? undefined,
    staleTime: 60_000,
  });
}

/* ---------- All located zonas (for the unified map) ----------
   Pulls zonas pages until exhausted (capped) and keeps only those with
   lat/lng, so they can be plotted alongside SOS Venezuela reports. */
export function useApoyoZonasLocated() {
  return useQuery({
    queryKey: ['apoyo-zonas-located'],
    queryFn: async () => {
      const located = [];
      let cursor;
      let guard = 0;
      // Cap iterations to avoid runaway loops; 8 pages * 50 = 400 zonas max.
      while (guard < 8) {
        guard += 1;
        const page = await fetchZonas({ limit: 50, cursor });
        const rows = page?.data ?? [];
        for (const z of rows) {
          if (z.ubicacion && typeof z.ubicacion.lat === 'number' && typeof z.ubicacion.lng === 'number') {
            located.push(z);
          }
        }
        cursor = page?.pagination?.nextCursor;
        if (!cursor) break;
      }
      return located;
    },
    staleTime: 120_000,
  });
}

/* ---------- Single zona detail ---------- */
export function useApoyoZona(id) {
  return useQuery({
    queryKey: ['apoyo-zona', id],
    queryFn: () => fetchZona(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}

/* ---------- Pedidos (flat list) ---------- */
export function useApoyoPedidos(filters = {}) {
  return useQuery({
    queryKey: ['apoyo-pedidos', filters],
    queryFn: () => fetchPedidos({ ...filters, limit: 100 }),
    staleTime: 60_000,
  });
}

/* ---------- Estadísticas ----------
   The /estadisticas endpoint wraps its object in { data: {...} }, so unwrap it. */
export function useApoyoEstadisticas() {
  return useQuery({
    queryKey: ['apoyo-estadisticas'],
    queryFn: async () => {
      const res = await fetchEstadisticas();
      return res?.data ?? res;
    },
    staleTime: 120_000,
  });
}