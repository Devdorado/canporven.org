import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const API_BASE = 'https://sosvenezuela2026.com';
const MAX_REPORTS = 200;

async function safeFetchJson(url) {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return { ok: true, data };
  } catch (_err) {
    return { ok: false };
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Load existing single cache record (if any) to preserve values on partial failures.
    const existingList = await base44.asServiceRole.entities.VenezuelaCache.filter({ cacheKey: 'main' });
    const existing = existingList && existingList.length > 0 ? existingList[0] : null;

    // Fetch all three sources in parallel.
    const [reportsRes, statsRes, newsRes] = await Promise.all([
      safeFetchJson(`${API_BASE}/api/reports`),
      safeFetchJson(`${API_BASE}/api/persons/stats`),
      safeFetchJson(`${API_BASE}/api/news`),
    ]);

    // Reports -> array, trimmed to the most recent MAX_REPORTS.
    let reports = existing?.reports ?? [];
    if (reportsRes.ok) {
      const arr = Array.isArray(reportsRes.data)
        ? reportsRes.data
        : (Array.isArray(reportsRes.data?.reports) ? reportsRes.data.reports : null);
      if (Array.isArray(arr)) {
        reports = arr.slice(0, MAX_REPORTS);
      }
    }

    // Stats -> object.
    let stats = existing?.stats ?? {};
    if (statsRes.ok && statsRes.data && typeof statsRes.data === 'object') {
      stats = statsRes.data;
    }

    // News -> array.
    let news = existing?.news ?? [];
    if (newsRes.ok) {
      const arr = Array.isArray(newsRes.data)
        ? newsRes.data
        : (Array.isArray(newsRes.data?.news) ? newsRes.data.news : null);
      if (Array.isArray(arr)) {
        news = arr;
      }
    }

    const anySuccess = reportsRes.ok || statsRes.ok || newsRes.ok;

    const payload = {
      cacheKey: 'main',
      reports,
      stats,
      news,
      // Only bump updatedAt when at least one source refreshed successfully.
      updatedAt: anySuccess ? new Date().toISOString() : (existing?.updatedAt ?? new Date().toISOString()),
      source: 'SOS Venezuela 2026',
    };

    let saved;
    if (existing) {
      saved = await base44.asServiceRole.entities.VenezuelaCache.update(existing.id, payload);
    } else {
      saved = await base44.asServiceRole.entities.VenezuelaCache.create(payload);
    }

    return Response.json({
      success: true,
      fetched: { reports: reportsRes.ok, stats: statsRes.ok, news: newsRes.ok },
      counts: { reports: reports.length, news: news.length },
      updatedAt: saved.updatedAt,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});