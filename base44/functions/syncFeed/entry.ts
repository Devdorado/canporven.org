import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/* Unified sync-engine: pulls complementary data from SOS Venezuela 2026 (reports)
   and Apoyo Venezuela (zonas + pedidos), normalizes each item into the FeedItem
   model, dedupes within each source by externalId (upsert), and keeps the most
   recent records. Per-source failures are handled gracefully: if a source is down,
   its previously stored items are preserved. */

const SOS_BASE = 'https://sosvenezuela2026.com';
const APOYO_BASE = 'https://apoyovenezuela.com/api/v1';
const APOYO_SOURCE = 'canporven.org';
const KEEP_RECENT = 300;
const SUMMARY_MAX = 220;

function stripHtml(input, maxLen = SUMMARY_MAX) {
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
    .replace(/&[a-zA-Z0-9#]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function toNum(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function toIso(v) {
  if (!v) return new Date().toISOString();
  const d = new Date(v);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

async function safeFetchJson(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!res.ok) return { ok: false };
    return { ok: true, data: await res.json() };
  } catch (_err) {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

function pickArray(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  return null;
}

/* ---------- Normalizers ---------- */
function normalizeSosReport(r) {
  const externalId = String(r.id ?? r._id ?? r.uuid ?? '');
  if (!externalId) return null;
  const ciudad = r.ciudad || r.city || r.municipio || '';
  const estado = r.estado || r.state || '';
  const title = r.titulo || r.title || r.categoria || r.category || 'Reporte';
  return {
    source: 'sos',
    type: 'reporte',
    title: stripHtml(title, 120),
    estado,
    ciudad,
    lat: toNum(r.lat ?? r.latitude ?? r.latitud),
    lng: toNum(r.lng ?? r.lon ?? r.longitude ?? r.longitud),
    status: String(r.severity || r.severidad || r.status || ''),
    urgencia: null,
    summary: stripHtml(r.descripcion || r.description || r.detalle || title),
    link: r.url || `${SOS_BASE}/reportes`,
    externalId,
    createdAt: toIso(r.created_at || r.createdAt || r.fecha || r.timestamp),
    syncedAt: new Date().toISOString(),
  };
}

function normalizeApoyoZona(z) {
  const externalId = String(z.id ?? z._id ?? '');
  if (!externalId) return null;
  const ciudad = z.ciudad || z.municipio || z.localidad || '';
  const estado = z.estado || z.state || '';
  const nombre = z.nombre || z.name || `Zona ${externalId}`;
  return {
    source: 'apoyovenezuela',
    type: 'zona',
    title: stripHtml(nombre, 120),
    estado,
    ciudad,
    lat: toNum(z.lat ?? z.latitude ?? z.latitud),
    lng: toNum(z.lng ?? z.lon ?? z.longitude ?? z.longitud),
    status: String(z.status || z.estado_estructural || z.structural_status || ''),
    urgencia: z.urgencia ? String(z.urgencia) : null,
    summary: stripHtml(z.descripcion || z.description || nombre),
    link: `https://apoyovenezuela.com/zonas/${externalId}`,
    externalId,
    createdAt: toIso(z.created_at || z.createdAt || z.fecha),
    syncedAt: new Date().toISOString(),
  };
}

function normalizeApoyoPedido(p) {
  const externalId = String(p.id ?? p._id ?? '');
  if (!externalId) return null;
  const ciudad = p.ciudad || p.municipio || '';
  const estado = p.estado || p.state || '';
  const categoria = p.categoria || p.category || p.tipo || 'Pedido';
  return {
    source: 'apoyovenezuela',
    type: 'pedido',
    title: stripHtml(`Pedido: ${categoria}`, 120),
    estado,
    ciudad,
    lat: toNum(p.lat ?? p.latitude ?? p.latitud),
    lng: toNum(p.lng ?? p.lon ?? p.longitude ?? p.longitud),
    status: String(p.status || p.estado_pedido || ''),
    urgencia: p.urgencia ? String(p.urgencia) : null,
    summary: stripHtml(p.descripcion || p.description || p.detalle || categoria),
    link: p.zonaId || p.zona_id
      ? `https://apoyovenezuela.com/zonas/${p.zonaId || p.zona_id}`
      : 'https://apoyovenezuela.com',
    externalId,
    createdAt: toIso(p.created_at || p.createdAt || p.fecha),
    syncedAt: new Date().toISOString(),
  };
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const [sosRes, zonasRes, pedidosRes] = await Promise.all([
      safeFetchJson(`${SOS_BASE}/api/reports`),
      safeFetchJson(`${APOYO_BASE}/zonas?source=${APOYO_SOURCE}&limit=200`),
      safeFetchJson(`${APOYO_BASE}/pedidos?source=${APOYO_SOURCE}&limit=200`),
    ]);

    const items = [];
    const sourcesOk = { sos: false, apoyovenezuela: false };

    if (sosRes.ok) {
      const arr = pickArray(sosRes.data, 'reports');
      if (Array.isArray(arr)) {
        sourcesOk.sos = true;
        for (const r of arr) {
          const n = normalizeSosReport(r);
          if (n) items.push(n);
        }
      }
    }

    if (zonasRes.ok) {
      const arr = pickArray(zonasRes.data, 'zonas');
      if (Array.isArray(arr)) {
        sourcesOk.apoyovenezuela = true;
        for (const z of arr) {
          const n = normalizeApoyoZona(z);
          if (n) items.push(n);
        }
      }
    }

    if (pedidosRes.ok) {
      const arr = pickArray(pedidosRes.data, 'pedidos');
      if (Array.isArray(arr)) {
        sourcesOk.apoyovenezuela = true;
        for (const p of arr) {
          const n = normalizeApoyoPedido(p);
          if (n) items.push(n);
        }
      }
    }

    // Existing records, keyed by source+externalId for upsert.
    const existing = await base44.asServiceRole.entities.FeedItem.list('-createdAt', 1000);
    const byKey = new Map(existing.map((e) => [`${e.source}:${e.externalId}`, e]));

    // Split incoming items into creates vs updates; batch each with bulk ops.
    const toCreate = [];
    const toUpdate = [];
    const kept = new Map(byKey); // running view of what will exist after upsert
    for (const item of items) {
      const key = `${item.source}:${item.externalId}`;
      const prev = byKey.get(key);
      if (prev) {
        toUpdate.push({ id: prev.id, ...item });
        kept.set(key, { ...prev, ...item });
      } else {
        toCreate.push(item);
      }
    }

    if (toUpdate.length) {
      await base44.asServiceRole.entities.FeedItem.bulkUpdate(toUpdate);
    }
    let createdRecords = [];
    if (toCreate.length) {
      createdRecords = await base44.asServiceRole.entities.FeedItem.bulkCreate(toCreate);
      createdRecords.forEach((rec) => {
        if (rec && rec.source && rec.externalId) kept.set(`${rec.source}:${rec.externalId}`, rec);
      });
    }
    const created = toCreate.length;
    const updated = toUpdate.length;

    // Prune: keep only the KEEP_RECENT most recent by createdAt.
    const all = Array.from(kept.values()).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    let pruned = 0;
    if (all.length > KEEP_RECENT) {
      const toDelete = all.slice(KEEP_RECENT).filter((e) => e.id);
      for (const e of toDelete) {
        await base44.asServiceRole.entities.FeedItem.delete(e.id);
        pruned += 1;
      }
    }

    return Response.json({
      success: true,
      sourcesOk,
      fetched: items.length,
      created,
      updated,
      pruned,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});