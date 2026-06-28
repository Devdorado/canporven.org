import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const FEEDS = [
  { url: 'https://www.elnacional.com/feed', source: 'El Nacional' },
  { url: 'https://efectococuyo.com/feed', source: 'Efecto Cocuyo' },
  { url: 'https://efe.com/feed/', source: 'EFE' },
  { url: 'https://www.bbc.co.uk/mundo/index.xml', source: 'BBC Mundo' },
  { url: 'http://cnnespanol.cnn.com/feed/', source: 'CNN en Español' },
];

const KEYWORDS = ['terremoto', 'sismo', 'réplica', 'replica', 'la guaira', 'yaracuy', 'venezuela'];
const MAX_ITEMS = 40;
const SNIPPET_MAX = 200;

function decodeEntities(str) {
  if (!str) return '';
  return str
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
}

function getTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1] : '';
}

function makeSnippet(text) {
  const clean = decodeEntities(text);
  if (clean.length <= SNIPPET_MAX) return clean;
  return clean.slice(0, SNIPPET_MAX).replace(/\s+\S*$/, '') + '…';
}

function parseFeed(xml, source) {
  const items = [];
  // RSS <item> and Atom <entry>
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  for (const block of blocks) {
    const title = decodeEntities(getTag(block, 'title'));
    if (!title) continue;

    // Link: RSS <link>text</link> or Atom <link href="..."/>
    let link = decodeEntities(getTag(block, 'link'));
    if (!link) {
      const hrefMatch = block.match(/<link[^>]*href=["']([^"']+)["']/i);
      if (hrefMatch) link = hrefMatch[1];
    }
    if (!link) continue;

    const guidRaw = getTag(block, 'guid') || getTag(block, 'id') || link;
    const guid = decodeEntities(guidRaw) || link;

    const dateRaw = getTag(block, 'pubDate') || getTag(block, 'published') || getTag(block, 'updated') || getTag(block, 'dc:date');
    let pubDate = new Date().toISOString();
    if (dateRaw) {
      const d = new Date(dateRaw.trim());
      if (!isNaN(d.getTime())) pubDate = d.toISOString();
    }

    const descRaw = getTag(block, 'description') || getTag(block, 'summary') || getTag(block, 'content:encoded');
    const snippet = makeSnippet(descRaw);

    let imageUrl = '';
    const media = block.match(/<media:(?:content|thumbnail)[^>]*url=["']([^"']+)["']/i)
      || block.match(/<enclosure[^>]*url=["']([^"']+)["']/i);
    if (media) imageUrl = media[1];

    items.push({ title, link, guid, pubDate, snippet, imageUrl, source, category: 'prensa' });
  }
  return items;
}

function isRelevant(item) {
  const hay = `${item.title} ${item.snippet}`.toLowerCase();
  return KEYWORDS.some((k) => hay.includes(k));
}

async function safeFetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'CanporvenNewsBot/1.0', Accept: 'application/rss+xml, application/xml, text/xml, */*' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, feed.source);
  } catch (_err) {
    return [];
  }
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const results = await Promise.all(FEEDS.map(safeFetchFeed));
    let all = results.flat().filter(isRelevant);

    // Deduplicate by guid (fallback link).
    const seen = new Set();
    const deduped = [];
    for (const item of all) {
      const key = item.guid || item.link;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(item);
    }

    // Sort by date desc, keep most recent.
    deduped.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    const recent = deduped.slice(0, MAX_ITEMS);

    // Upsert: skip ones already stored (by guid).
    const existing = await base44.asServiceRole.entities.NewsItem.list('-pubDate', 200);
    const existingByGuid = new Map(existing.map((e) => [e.guid, e]));

    let created = 0;
    let updated = 0;
    for (const item of recent) {
      const prev = existingByGuid.get(item.guid);
      if (prev) {
        await base44.asServiceRole.entities.NewsItem.update(prev.id, item);
        updated += 1;
      } else {
        await base44.asServiceRole.entities.NewsItem.create(item);
        created += 1;
      }
    }

    return Response.json({
      success: true,
      feedsFetched: results.map((r, i) => ({ source: FEEDS[i].source, items: r.length })),
      relevant: recent.length,
      created,
      updated,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});