import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

/* Public unified feed endpoint. Returns canporven's normalized FeedItem hub
   as JSON so third parties can read from canporven as a source.
   Filters: source, type, estado. Pagination: limit, cursor (offset-based).
   No auth required (FeedItem read is public). */

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const url = new URL(req.url);
    const params = url.searchParams;

    const source = params.get('source') || undefined;
    const type = params.get('type') || undefined;
    const estado = params.get('estado') || undefined;

    let limit = parseInt(params.get('limit') || '50', 10);
    if (!Number.isFinite(limit) || limit < 1) limit = 50;
    if (limit > 200) limit = 200;

    let cursor = parseInt(params.get('cursor') || '0', 10);
    if (!Number.isFinite(cursor) || cursor < 0) cursor = 0;

    const query = {};
    if (source) query.source = source;
    if (type) query.type = type;
    if (estado) query.estado = estado;

    // Fetch one extra to know whether there's a next page.
    const records = await base44.asServiceRole.entities.FeedItem.filter(
      query,
      '-createdAt',
      limit + 1,
      cursor
    );

    const hasMore = records.length > limit;
    const page = hasMore ? records.slice(0, limit) : records;

    const data = page.map((r) => ({
      source: r.source,
      type: r.type,
      title: r.title,
      estado: r.estado || '',
      ciudad: r.ciudad || '',
      lat: r.lat ?? null,
      lng: r.lng ?? null,
      status: r.status || '',
      urgencia: r.urgencia ?? null,
      summary: r.summary || '',
      link: r.link || '',
      externalId: r.externalId,
      createdAt: r.createdAt,
      syncedAt: r.syncedAt,
    }));

    return new Response(
      JSON.stringify({
        success: true,
        attribution: ['SOS Venezuela 2026', 'Apoyo Venezuela'],
        filters: { source: source || null, type: type || null, estado: estado || null },
        pagination: {
          limit,
          cursor,
          nextCursor: hasMore ? cursor + limit : null,
          count: data.length,
        },
        data,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60',
        },
      }
    );
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});