import React, { useState, useRef, useEffect, useCallback } from 'react';

const GREETING =
  'Hola, soy Manito. Tu asistente para ayudar mejor a Venezuela. ¿En qué te ayudo hoy?';
const NETWORK_ERROR =
  'Ahora mismo no puedo conectar. Vuelve a intentarlo o escríbenos por WhatsApp: https://wa.me/34601010101';
const STORAGE_KEY = 'manito_conv';

// Escape HTML, then apply **bold**, linkify http(s) + canporven.org, preserve line breaks.
function renderBotHtml(text) {
  const escaped = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const linkClass = 'underline text-[#1763B0] dark:text-[#7FB3F0]';

  // Full http(s) URLs
  let out = escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${url}</a>`;
  });

  // Bare canporven.org links (not already inside an href)
  out = out.replace(/(^|[^/"=>])((?:www\.)?canporven\.org[^\s<]*)/g, (m, pre, domain) => {
    return `${pre}<a href="https://${domain}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${domain}</a>`;
  });

  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Line breaks
  out = out.replace(/\n/g, '<br/>');

  return out;
}

export default function ManitoWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', content: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Esc closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Grow textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    let conversationId = null;
    try {
      conversationId = sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
      conversationId = null;
    }

    try {
      const res = await fetch('/functions/manitoChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, conversationId }),
      });
      if (!res.ok) throw new Error('bad status');
      const data = await res.json();
      if (data?.conversationId) {
        try {
          sessionStorage.setItem(STORAGE_KEY, data.conversationId);
        } catch {
          /* ignore storage errors */
        }
      }
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: data?.reply || NETWORK_ERROR },
      ]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', content: NETWORK_ERROR }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir chat con Manito"
          className="fixed bottom-5 right-5 z-[2147483000] flex items-center gap-2 pl-2 pr-4 py-2 rounded-full text-white shadow-2xl hover:scale-[1.03] active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #1763B0, #0E4C8A)' }}
        >
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full text-base shadow-inner"
            style={{
              background:
                'conic-gradient(#FFCC00 0deg 120deg, #1763B0 120deg 240deg, #CF142B 240deg 360deg)',
            }}
            aria-hidden="true"
          >
            <span className="drop-shadow">✋</span>
          </span>
          <span className="font-semibold text-sm">Manito</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Chat con Manito"
          className="fixed z-[2147483000] flex flex-col overflow-hidden bg-white dark:bg-[#0b1322] shadow-2xl
            bottom-5 right-5 w-[370px] h-[560px] rounded-2xl border border-[#1763B0]/15 dark:border-white/10
            max-[480px]:inset-0 max-[480px]:bottom-0 max-[480px]:right-0 max-[480px]:w-full max-[480px]:h-full max-[480px]:rounded-none max-[480px]:border-0"
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #1763B0, #0E4C8A)' }}
          >
            <span
              className="flex items-center justify-center w-9 h-9 rounded-full text-base shrink-0"
              style={{
                background:
                  'conic-gradient(#FFCC00 0deg 120deg, #1763B0 120deg 240deg, #CF142B 240deg 360deg)',
              }}
              aria-hidden="true"
            >
              <span className="drop-shadow">✋</span>
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm leading-tight">Manito</p>
              <p className="text-xs text-white/80 truncate">Asistente de ayuda verificada</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              className="p-1.5 rounded-full hover:bg-white/15 transition-colors text-2xl leading-none w-9 h-9 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#F5F7FB] dark:bg-[#0e1726]"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words ${
                    m.role === 'user'
                      ? 'bg-[#1763B0] text-white rounded-br-sm'
                      : 'bg-white dark:bg-[#15233b] text-[#121212] dark:text-[#E8EEF6] border border-[#1763B0]/10 dark:border-white/10 rounded-bl-sm'
                  }`}
                >
                  {m.role === 'bot' ? (
                    <span dangerouslySetInnerHTML={{ __html: renderBotHtml(m.content) }} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#15233b] border border-[#1763B0]/10 dark:border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm text-[#121212]/60 dark:text-white/60">
                  Manito está escribiendo…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#1763B0]/10 dark:border-white/10 bg-white dark:bg-[#0b1322] px-3 pt-3 pb-2 shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={(el) => {
                  textareaRef.current = el;
                  inputRef.current = el;
                }}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 2000))}
                onKeyDown={onInputKeyDown}
                rows={1}
                maxLength={2000}
                placeholder="Escribe un mensaje…"
                aria-label="Mensaje para Manito"
                className="flex-1 resize-none rounded-2xl border border-[#1763B0]/20 dark:border-white/15 bg-white dark:bg-[#0e1726] text-[#121212] dark:text-[#E8EEF6] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1763B0]/30 max-h-[120px]"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                aria-label="Enviar"
                className="flex items-center justify-center w-10 h-10 rounded-full text-white disabled:opacity-40 transition-transform hover:scale-105 active:scale-95 shrink-0"
                style={{ background: 'linear-gradient(135deg, #1763B0, #0E4C8A)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 mb-0.5 text-[11px] text-center text-[#121212]/50 dark:text-white/45">
              Manito orienta hacia ayuda verificada. No sustituye urgencias.
            </p>
          </div>
        </div>
      )}
    </>
  );
}