import { useQuery } from '@tanstack/react-query';

const API_BASE = 'https://sosvenezuela2026.com';

/* ---------- Reports ---------- */
export async function fetchReports() {
  const res = await fetch(`${API_BASE}/api/reports`);
  if (!res.ok) throw new Error('Failed to fetch reports');
  return res.json();
}

export function useVenezuelaReports() {
  return useQuery({
    queryKey: ['venezuela-reports'],
    queryFn: fetchReports,
    staleTime: 60_000,        // 1 min
    refetchInterval: 120_000,   // 2 min
  });
}

/* ---------- Persons ---------- */
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

/* ---------- Stats ---------- */
export async function fetchStats() {
  const res = await fetch(`${API_BASE}/api/persons/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export function useVenezuelaStats() {
  return useQuery({
    queryKey: ['venezuela-stats'],
    queryFn: fetchStats,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}

/* ---------- Damage ---------- */
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

/* ---------- News ---------- */
export async function fetchNews() {
  const res = await fetch(`${API_BASE}/api/news`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export function useVenezuelaNews() {
  return useQuery({
    queryKey: ['venezuela-news'],
    queryFn: fetchNews,
    staleTime: 300_000, // 5 min
  });
}
