const AGENT_BASE = "https://app.base44.com/api/agents/6a416c3728eed6edc93706c9";
const APOYO_BASE = "https://apoyovenezuela.com/api/v1";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const FALLBACK_REPLY =
  "Lo siento, ahora mismo no puedo responder. Vuelve a intentarlo o escríbenos por WhatsApp al +34 601 01 01 01.";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// Trigger keyword groups
const GENERAL_KEYWORDS = [
  "situaci", "cuant", "cuánt", "dato", "reporte", "zona", "edificio", "derrumbe",
  "daño", "dano", "afectad", "necesit", "pedido", "falta", "ayuda", "agua",
  "medicin", "aliment", "rescate", "refugio", "escombro", "atrapad",
];

const BUILDING_KEYWORDS = [
  "edificio", "zona", "derrumbe", "daño", "atrapad", "escombro", "colaps", "estructura",
];

const NEEDS_KEYWORDS = [
  "necesit", "pedido", "falta", "insumo", "agua", "medicin", "aliment",
  "rescate", "refugio", "ropa",
];

// State name (lowercase substring) -> proper-case for the API
const STATE_MAP = {
  "la guaira": "La Guaira",
  "vargas": "La Guaira",
  "caracas": "Caracas",
  "distrito capital": "Caracas",
  "yaracuy": "Yaracuy",
  "miranda": "Miranda",
  "aragua": "Aragua",
  "carabobo": "Carabobo",
  "lara": "Lara",
  "falcon": "Falcón",
  "falcón": "Falcón",
};

function hasAny(text, list) {
  return list.some((k) => text.includes(k));
}

function fetchJson(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .finally(() => clearTimeout(id));
}

async function buildLiveContext(lowerMsg) {
  const blocks = [];

  // Detect a mentioned state
  let stateProper = null;
  for (const key of Object.keys(STATE_MAP)) {
    if (lowerMsg.includes(key)) {
      stateProper = STATE_MAP[key];
      break;
    }
  }

  // 1) Statistics
  if (hasAny(lowerMsg, GENERAL_KEYWORDS) || stateProper) {
    try {
      const stats = await fetchJson(`${APOYO_BASE}/estadisticas`);
      if (stats) {
        const porStatus = stats.zonasPorStatus || {};
        const cats = stats.pedidosPorCategoria || {};
        const topCats = Object.entries(cats)
          .sort((a, b) => (b[1] || 0) - (a[1] || 0))
          .slice(0, 4)
          .map(([c, n]) => `${c}: ${n}`)
          .join(", ");
        blocks.push(
          `ESTADÍSTICAS: total zonas ${stats.totalZonas ?? "?"}; ` +
            `derrumbe ${porStatus.derrumbe ?? 0}, daño grave ${porStatus.dano_grave ?? 0}, ` +
            `daño parcial ${porStatus.dano_parcial ?? 0}; ` +
            `pedidos abiertos ${stats.pedidosAbiertos ?? "?"}` +
            (topCats ? `; top categorías de pedidos: ${topCats}` : "") + ".",
        );
      }
    } catch (_e) {
      // skip on any failure
    }
  }

  // 2) Zones — by state if mentioned, otherwise by collapse status if building keywords
  if (stateProper) {
    try {
      const url = `${APOYO_BASE}/zonas?estado=${encodeURIComponent(stateProper)}&limit=12`;
      const data = await fetchJson(url);
      const list = Array.isArray(data) ? data : data?.data || data?.zonas || [];
      if (Array.isArray(list) && list.length > 0) {
        const lines = list
          .slice(0, 12)
          .map((z) => `${z.nombre || "?"} — ${z.status || "?"} — ${z.ciudad || "?"}`)
          .join("; ");
        blocks.push(`ZONAS en ${stateProper}: ${lines}.`);
      }
    } catch (_e) {
      // skip
    }
  } else if (hasAny(lowerMsg, BUILDING_KEYWORDS)) {
    try {
      const data = await fetchJson(`${APOYO_BASE}/zonas?status=derrumbe&limit=12`);
      const list = Array.isArray(data) ? data : data?.data || data?.zonas || [];
      if (Array.isArray(list) && list.length > 0) {
        const lines = list
          .slice(0, 12)
          .map((z) => `${z.nombre || "?"} — ${z.status || "?"} — ${z.ciudad || "?"}`)
          .join("; ");
        blocks.push(`ZONAS con derrumbe: ${lines}.`);
      }
    } catch (_e) {
      // skip
    }
  }

  // 3) Requests / needs
  if (hasAny(lowerMsg, NEEDS_KEYWORDS)) {
    try {
      const data = await fetchJson(`${APOYO_BASE}/pedidos?limit=12`);
      const list = Array.isArray(data) ? data : data?.data || data?.pedidos || [];
      if (Array.isArray(list) && list.length > 0) {
        const lines = list
          .slice(0, 12)
          .map((p) => {
            const desc = (p.descripcion || "").slice(0, 120);
            return `${p.categoria || "?"} — ${desc}`;
          })
          .join("; ");
        blocks.push(`PEDIDOS recientes: ${lines}.`);
      }
    } catch (_e) {
      // skip
    }
  }

  let body = blocks.length > 0 ? blocks.join(" ") : "Sin datos en vivo relevantes.";
  // Keep injected context compact (~1500 chars budget for the data body)
  if (body.length > 1300) body = body.slice(0, 1300) + "…";

  return (
    "CONTEXTO EN VIVO (fuente oficial: Apoyo Venezuela, https://apoyovenezuela.com — " +
    "datos reales y actuales; úsalos para responder con cifras y nombres concretos y cita la fuente; " +
    "NO inventes datos): " +
    body +
    " Nota: para personas desaparecidas no hay API; orienta a https://desaparecidosterremotovenezuela.com"
  );
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let conversationId = null;

  try {
    const apiKey = Deno.env.get("MANITO_API_KEY");
    if (!apiKey) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId: null });
    }

    let payload;
    try {
      payload = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const message = typeof payload?.message === "string" ? payload.message.trim() : "";
    conversationId = payload?.conversationId || null;

    // Validate input
    if (!message || message.length > 2000) {
      return jsonResponse({ error: "Message must be between 1 and 2000 characters." }, 400);
    }

    const agentHeaders = {
      "api_key": apiKey,
      "Content-Type": "application/json",
    };

    // Create a fresh conversation when none is supplied (isolation guarantee).
    if (!conversationId) {
      const convRes = await fetch(`${AGENT_BASE}/conversations`, {
        method: "POST",
        headers: agentHeaders,
        body: JSON.stringify({}),
      });
      if (!convRes.ok) {
        return jsonResponse({ reply: FALLBACK_REPLY, conversationId: null });
      }
      const convData = await convRes.json();
      conversationId = convData?.id || null;
      if (!conversationId) {
        return jsonResponse({ reply: FALLBACK_REPLY, conversationId: null });
      }
    }

    // Fetch live data from Apoyo Venezuela and compose the augmented content.
    const liveContext = await buildLiveContext(message.toLowerCase());
    const composed = `${message}\n\n---\n${liveContext}`;

    // Send to the agent.
    const msgRes = await fetch(`${AGENT_BASE}/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: agentHeaders,
      body: JSON.stringify({ role: "user", content: composed }),
    });

    if (!msgRes.ok) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }

    const msgData = await msgRes.json();

    // Extract the latest assistant message text.
    let reply = "";
    if (Array.isArray(msgData?.messages)) {
      for (let i = msgData.messages.length - 1; i >= 0; i--) {
        const m = msgData.messages[i];
        if (m?.role === "assistant" && m?.content) {
          reply = m.content;
          break;
        }
      }
    } else if (msgData?.role === "assistant" && msgData?.content) {
      reply = msgData.content;
    } else if (typeof msgData?.reply === "string") {
      reply = msgData.reply;
    }

    if (!reply) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }

    return jsonResponse({ reply, conversationId });
  } catch (_error) {
    return jsonResponse({ reply: FALLBACK_REPLY, conversationId: conversationId || null });
  }
});