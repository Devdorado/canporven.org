import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const AGENT_BASE = "https://app.base44.com/api/agents/6a416c3728eed6edc93706c9";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const FALLBACK_REPLY =
  "Lo siento, ahora mismo no puedo responder. Vuelve a intentarlo en un momento o escríbenos por WhatsApp al +34 601 01 01 01.";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

// Build a single prompt that carries the isolated history of THIS session only,
// so visitors never share conversational context.
function buildPrompt(history, message) {
  if (!history || history.length === 0) return message;
  const transcript = history
    .map((m) => `${m.role === "assistant" ? "Manito" : "Usuario"}: ${m.content}`)
    .join("\n");
  return (
    "Continúa esta conversación. Historial previo:\n" +
    transcript +
    "\n\nUsuario: " +
    message
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

  let sessionId = null;

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
    sessionId = payload?.conversationId || null;

    // Validate input
    if (!message || message.length > 2000) {
      return jsonResponse({ error: "Message must be between 1 and 2000 characters." }, 400);
    }

    const base44 = createClientFromRequest(req);

    // Load (or start) the isolated history for this session.
    let history = [];
    let record = null;
    if (sessionId) {
      const found = await base44.asServiceRole.entities.ManitoConversation.filter({ sessionId });
      if (found && found.length > 0) {
        record = found[0];
        history = Array.isArray(record.history) ? record.history : [];
      }
    }

    // No valid existing session => start a brand-new, unique one.
    if (!record) {
      sessionId = crypto.randomUUID();
      history = [];
    }

    const agentHeaders = {
      "api_key": apiKey,
      "Content-Type": "application/json",
    };

    // The agent API returns a single shared conversation per API key, so we do
    // NOT rely on its conversation storage for isolation. We create/reuse one
    // conversation only as a transport and pass the full per-session history
    // inline in the prompt.
    const convRes = await fetch(`${AGENT_BASE}/conversations`, {
      method: "POST",
      headers: agentHeaders,
      body: JSON.stringify({}),
    });
    if (!convRes.ok) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId: sessionId });
    }
    const convData = await convRes.json();
    const agentConversationId = convData?.id;
    if (!agentConversationId) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId: sessionId });
    }

    // Send the user message together with this session's prior context.
    const msgRes = await fetch(`${AGENT_BASE}/conversations/${agentConversationId}/messages`, {
      method: "POST",
      headers: agentHeaders,
      body: JSON.stringify({ role: "user", content: buildPrompt(history, message) }),
    });

    if (!msgRes.ok) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId: sessionId });
    }

    const msgData = await msgRes.json();

    // Extract the assistant reply (object directly, or a messages array).
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
    }

    if (!reply) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId: sessionId });
    }

    // Persist the updated, isolated history for this session.
    const newHistory = [
      ...history,
      { role: "user", content: message },
      { role: "assistant", content: reply },
    ].slice(-40);

    if (record) {
      await base44.asServiceRole.entities.ManitoConversation.update(record.id, { history: newHistory });
    } else {
      await base44.asServiceRole.entities.ManitoConversation.create({ sessionId, history: newHistory });
    }

    return jsonResponse({ reply, conversationId: sessionId });
  } catch (_error) {
    return jsonResponse({ reply: FALLBACK_REPLY, conversationId: sessionId || null });
  }
});