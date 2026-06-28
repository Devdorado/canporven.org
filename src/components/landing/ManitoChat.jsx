import React, { useState, useRef, useEffect } from 'react';
import { manitoChat } from '@/functions/manitoChat';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AVATAR =
  'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/53c28afcb_Manito.png';

const WELCOME =
  '¡Hola! Soy Manito 👋 Pregúntame lo que quieras sobre Canarias por Venezuela y cómo ayudar.';

export default function ManitoChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const send = async (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await manitoChat({ message: text, conversationId });
      const data = res?.data || {};
      if (data.conversationId) setConversationId(data.conversationId);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Lo siento, no pude responder.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Lo siento, ahora mismo no puedo responder. Vuelve a intentarlo en un momento.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating bubble button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-2xl ring-2 ring-[#1565C0]/30 hover:scale-105 transition-transform"
          aria-label="Abrir chat con Manito"
        >
          <img src={AVATAR} alt="Manito" className="w-12 h-12 object-contain" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-[60] flex flex-col w-[calc(100vw-2.5rem)] max-w-sm h-[70vh] max-h-[560px] rounded-2xl bg-white shadow-2xl border border-[#1565C0]/15 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1565C0] text-white shrink-0">
            <img
              src={AVATAR}
              alt="Manito"
              className="w-10 h-10 object-contain bg-white rounded-full p-0.5"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">Manito</p>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                En línea
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/15 transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-[#F5F7FB]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <img
                    src={AVATAR}
                    alt=""
                    className="w-7 h-7 object-contain mr-2 mt-1 shrink-0"
                  />
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#1565C0] text-white rounded-br-sm'
                      : 'bg-white text-[#121212] border border-[#1565C0]/10 rounded-bl-sm'
                  }`}
                >
                  {m.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        a: ({ ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1565C0] underline"
                          />
                        ),
                        p: ({ ...props }) => <p {...props} className="mb-1.5 last:mb-0" />,
                        ul: ({ ...props }) => <ul {...props} className="list-disc pl-4 mb-1.5 space-y-0.5" />,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <img src={AVATAR} alt="" className="w-7 h-7 object-contain mr-2 mt-1 shrink-0" />
                <div className="bg-white border border-[#1565C0]/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#1565C0]/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#1565C0]/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#1565C0]/40 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={send} className="flex items-center gap-2 px-3 py-3 border-t border-[#1565C0]/10 bg-white shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje…"
              className="flex-1 rounded-full border border-[#1565C0]/20 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1565C0]/30"
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1565C0] text-white disabled:opacity-40 hover:bg-[#1255A0] transition-colors shrink-0"
              aria-label="Enviar"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}