import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const API_BASE = 'https://sosvenezuela2026.com';
const MAX_REPORTS = 200;
const SNIPPET_MAX = 200;

// Strip HTML tags and decode common entities so stored snippets are plain text.
function stripHtml(input, maxLen = SNIPPET_MAX) {
  if (!input) return '';
  const clean = String(input)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

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

    // Auth: accept a valid shared secret (used by the scheduled automation) OR an
    // authenticated admin (manual trigger). Everyone else is rejected. This does
    // not change the sync logic — only who is allowed to run it.
    const expected = Deno.env.get('SYNC_SECRET') || '';
    let provided = req.headers.get('x-sync-secret') || '';
    if (!provided) {
      try {
        const body = await req.clone().json();
        provided = body?.secret || '';
      } catch (_e) { /* no body */ }
    }
    let authorized = expected && provided === expected;
    if (!authorized) {
      try {
        const user = await base44.auth.me();
        authorized = user?.role === 'admin';
      } catch (_e) { /* not authenticated */ }
    }
    if (!authorized) return Response.json({ error: 'Forbidden' }, { status: 403 });

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
        // Store snippets already cleaned (no HTML) so both Home and dashboard render plain text.
        news = arr.map((n) => ({
          ...n,
          title: n.title ? stripHtml(n.title, 300) : n.title,
          summary: n.summary ? stripHtml(n.summary, SNIPPET_MAX) : n.summary,
        }));
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