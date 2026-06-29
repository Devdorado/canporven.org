import React from 'react';
import { ArrowRight } from 'lucide-react';

// Slugify the guide id into a stable anchor target used by GuiaCard.
export function guiaAnchorId(guia) {
  return `guia-${guia.id}`;
}

export default function GuiasOverview({ guias }) {
  if (!guias || guias.length === 0) return null;

  const handleClick = (e, guia) => {
    e.preventDefault();
    const el = document.getElementById(guiaAnchorId(guia));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Índice de guías"
      className="rounded-2xl border border-[#1763B0]/12 dark:border-white/10 bg-white dark:bg-[#0e1726] p-5 md:p-6 shadow-sm"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[#1763B0] dark:text-[#7FB3F0]">
        Índice de guías
      </p>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {guias.map((g, i) => (
          <li key={g.id}>
            <a
              href={`#${guiaAnchorId(g)}`}
              onClick={(e) => handleClick(e, g)}
              className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[#1763B0]/5 dark:hover:bg-white/5 transition-colors"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1763B0]/10 dark:bg-[#7FB3F0]/15 text-xs font-bold text-[#1763B0] dark:text-[#7FB3F0]">
                {i + 1}
              </span>
              <span className="flex-1 text-sm font-medium leading-snug text-[#121212] dark:text-[#E8EEF6] group-hover:text-[#1763B0] dark:group-hover:text-[#7FB3F0]">
                {g.titulo}
              </span>
              <ArrowRight
                size={16}
                className="mt-0.5 shrink-0 text-[#1763B0]/40 dark:text-white/30 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}