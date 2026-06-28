import React, { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
    </svg>
  );
}
function TelegramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.6 18.6 20.34c-.25 1.1-.91 1.37-1.85.85l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.16 9.4-8.5c.41-.36-.09-.56-.63-.2L4.07 13.1l-5-1.57c-1.09-.34-1.11-1.09.23-1.61l19.55-7.54c.9-.34 1.69.2 1.39 1.62z" />
    </svg>
  );
}
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.79l-5.32-6.96L4.3 22H1.04l8.02-9.17L1.5 2h6.96l4.81 6.36L18.244 2zm-2.38 18h1.88L7.23 4H5.21l10.654 16z" />
    </svg>
  );
}
function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

const baseBtn =
  'inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95';

export default function ShareButtons({ titulo, pageUrl }) {
  const [copied, setCopied] = useState(false);

  const encTitle = encodeURIComponent(titulo);
  const encUrl = encodeURIComponent(pageUrl);
  const waText = encodeURIComponent(`${titulo} ${pageUrl}`);

  const links = [
    { name: 'WhatsApp', href: `https://wa.me/?text=${waText}`, color: '#25D366', Icon: WhatsAppIcon },
    { name: 'Telegram', href: `https://t.me/share/url?url=${encUrl}&text=${encTitle}`, color: '#229ED9', Icon: TelegramIcon },
    { name: 'X', href: `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`, color: '#111111', Icon: XIcon },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`, color: '#1877F2', Icon: FacebookIcon },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = pageUrl;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ name, href, color, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${name}`}
          className={baseBtn}
          style={{ backgroundColor: color }}
        >
          <Icon />
          <span>{name}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copiar enlace"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#1763B0] dark:text-[#7FB3F0] border border-[#1763B0]/30 dark:border-white/20 hover:bg-[#1763B0]/5 dark:hover:bg-white/5 transition-colors"
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
        <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
      </button>
    </div>
  );
}