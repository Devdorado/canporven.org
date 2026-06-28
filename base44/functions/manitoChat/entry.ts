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

    // Create a conversation if none provided
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

    // Send the user message
    const msgRes = await fetch(`${AGENT_BASE}/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: agentHeaders,
      body: JSON.stringify({ role: "user", content: message }),
    });

    if (!msgRes.ok) {
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }

    const msgData = await msgRes.json();

    // Extract the latest assistant message text. The endpoint may return either
    // the assistant message object directly, or an object with a `messages` array.
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
      return jsonResponse({ reply: FALLBACK_REPLY, conversationId });
    }

    return jsonResponse({ reply, conversationId });
  } catch (_error) {
    return jsonResponse({ reply: FALLBACK_REPLY, conversationId: conversationId || null });
  }
});