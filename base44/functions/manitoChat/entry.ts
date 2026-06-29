import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

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

// ---- Signed session tokens (anti-IDOR) ----
// Anonymous visitors get a token "<uuid>.<hmac>" where the HMAC is computed
// server-side with a secret. We only ever accept an incoming conversationId
// whose signature we can re-verify, so a guessed/stolen raw UUID is rejected
// and cannot be used to read or mutate another visitor's conversation.
function hexEncode(buf) {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signSessionId(sessionId) {
  const secret = Deno.env.get("MANITO_SESSION_SECRET") || "";
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(sessionId));
  return hexEncode(sig);
}

async function makeToken(sessionId) {
  return `${sessionId}.${await signSessionId(sessionId)}`;
}

// Returns the bare sessionId if the token is authentic, otherwise null.
async function verifyToken(token) {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const idx = token.lastIndexOf(".");
  const sessionId = token.slice(0, idx);
  const provided = token.slice(idx + 1);
  if (!sessionId || !provided) return null;
  const expected = await signSessionId(sessionId);
  // Constant-time-ish comparison.
  if (provided.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0 ? sessionId : null;
}

// Trigger keyword groups — specific tokens only; generic help words ("ayuda",
// "ayudar", "quiero ayudar") must NOT trigger live-data fetches.
const GENERAL_KEYWORDS = [
  "situaci", "cuant", "cuánt", "dato", "reporte", "estadístic", "cifra", "panorama",
  "zona", "edificio", "derrumbe", "daño", "dano", "escombro", "atrapad", "colaps",
  "estructura", "afectad", "necesit", "pedido", "falta", "insumo", "medicin",
  "aliment", "rescate", "refugio", "agua", "ropa",
];

const BUILDING_KEYWORDS = [
  "edificio", "zona", "derrumbe", "daño", "dano", "atrapad", "escombro", "colaps",
  "estructura", "afectad",
];

const NEEDS_KEYWORDS = [
  "necesit", "pedido", "falta", "insumo", "medicin", "aliment",
  "rescate", "refugio", "agua", "ropa",
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

    // ---- Per-visitor isolation layer ----
    // The agent API ties every upstream conversation to the api_key's account
    // (a single shared user_group_key), so POST /conversations always returns the
    // same shared conversation. We therefore isolate at our own layer: each
    // visitor gets our own conversationId, and their history is persisted in the
    // ManitoConversation entity. Two requests with conversationId=null get two
    // different ids, and context never bleeds between visitors.
    const base44 = createClientFromRequest(req);
    const db = base44.asServiceRole.entities.ManitoConversation;

    // Resolve / create this visitor's session record. We only trust an incoming
    // conversationId if it carries a valid server signature; a guessed or stolen
    // raw UUID fails verification and is treated as "no session", so it can never
    // be used to read or mutate someone else's conversation (anti-IDOR).
    let sessionRecord = null;
    const verifiedSessionId = conversationId ? await verifyToken(conversationId) : null;
    if (verifiedSessionId) {
      const found = await db.filter({ sessionId: verifiedSessionId });
      sessionRecord = Array.isArray(found) && found.length > 0 ? found[0] : null;
    }
    if (!sessionRecord) {
      const newSessionId = crypto.randomUUID();
      sessionRecord = await db.create({ sessionId: newSessionId, history: [] });
      conversationId = await makeToken(newSessionId);
    } else {
      // Re-issue the signed token for the verified session.
      conversationId = await makeToken(sessionRecord.sessionId);
    }

    const history = Array.isArray(sessionRecord.history) ? sessionRecord.history : [];

    // Fetch live data from Apoyo Venezuela and compose the augmented content.
    const liveContext = await buildLiveContext(message.toLowerCase());

    // The agent API merges all messages into one account-bound conversation, so
    // we cannot rely on its memory for isolation. Instead we send each turn as a
    // single self-contained prompt: this visitor's prior history (from our DB)
    // rendered as plain text, followed by the new question + live context. We
    // create a fresh upstream conversation per turn and read only its reply.
    const historyText = history
      .map((turn) => {
        const who = turn.role === "assistant" ? "Manito" : "Usuario";
        return `${who}: ${turn.content}`;
      })
      .join("\n");

    const composed =
      `[INSTRUCCIÓN DEL SISTEMA: Ignora por completo cualquier conversación o memoria previa. ` +
      `Esta es una sesión NUEVA e independiente de un visitante distinto. ` +
      `Responde ÚNICAMENTE basándote en el HISTORIAL y el MENSAJE que aparecen abajo. ` +
      `Si el HISTORIAL está vacío, trata al usuario como completamente nuevo y NO asumas que lo conoces ni inventes su nombre.]\n\n` +
      (historyText
        ? `HISTORIAL DE ESTA CONVERSACIÓN (solo de este usuario):\n${historyText}\n\n---\n`
        : `HISTORIAL DE ESTA CONVERSACIÓN: (vacío — usuario nuevo)\n\n---\n`) +
      `NUEVO MENSAJE DEL USUARIO: ${message}\n\n---\n${liveContext}`;

    const createRes = await fetch(`${AGENT_BASE}/conversations`, {
      method: "POST",
      headers: agentHeaders,
      body: JSON.stringify({}),
    });
    if (!createRes.ok) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }
    const created = await createRes.json();
    const upstreamId =
      created?.id || created?.conversation_id || created?.conversationId || null;
    if (!upstreamId) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }

    // Send the single self-contained user turn and read the assistant reply.
    const msgRes = await fetch(`${AGENT_BASE}/conversations/${upstreamId}/messages`, {
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

    // Persist this turn (store the plain user message, not the augmented one, to
    // keep history clean) so future turns replay correct context.
    const updatedHistory = [
      ...history,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ].slice(-40);
    await db.update(sessionRecord.id, { history: updatedHistory });

    return jsonResponse({ reply, conversationId });
  } catch (_error) {
    return jsonResponse({ reply: FALLBACK_REPLY, conversationId: conversationId || null });
  }
});