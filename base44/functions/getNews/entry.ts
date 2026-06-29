import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Public GET endpoint: returns the latest news as JSON so non-React
// (static HTML) pages can consume it from the same origin.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const url = new URL(req.url);
    const limitParam = parseInt(url.searchParams.get('limit') || '20', 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 20 : limitParam, 1), 50);

    // NewsItem read is public (RLS read: {}), so use the RLS-respecting client
    // rather than asServiceRole — no service-role bypass for a public read.
    const items = await base44.entities.NewsItem.list('-pubDate', limit);

    const news = items.map((i) => ({
      title: i.title,
      snippet: i.snippet,
      source: i.source,
      link: i.link,
      pubDate: i.pubDate,
      imageUrl: i.imageUrl || '',
    }));

    return new Response(JSON.stringify({ news }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=120',
      },
    });
  } catch (error) {
    return Response.json({ news: [], error: error.message }, { status: 500 });
  }
});