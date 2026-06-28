import React from 'react';
import { Download, Image as ImageIcon, FileText } from 'lucide-react';
import ShareButtons from './ShareButtons';
import SuggestionForm from './SuggestionForm';

export default function GuiaCard({ guia, pageUrl }) {
  const hasImage = !!(guia.imagenUrl && guia.imagenUrl.trim());
  const hasPdf = !!(guia.pdfUrl && guia.pdfUrl.trim());

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[#1763B0]/12 dark:border-white/10 bg-white dark:bg-[#0e1726] shadow-sm hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full bg-[#F5F7FB] dark:bg-white/5">
        {/* Tricolor accent bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 flex">
          <span className="flex-1" style={{ backgroundColor: '#FFCC00' }} />
          <span className="flex-1" style={{ backgroundColor: '#1763B0' }} />
          <span className="flex-1" style={{ backgroundColor: '#CF142B' }} />
        </div>
        {hasImage ? (
          <img
            src={guia.imagenUrl}
            alt={guia.titulo}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-[#1763B0]/40 dark:text-white/30">
            <ImageIcon size={40} />
            <span className="mt-2 text-xs font-medium">Infografía próximamente</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-[#121212] dark:text-[#E8EEF6]">
            {guia.titulo}
          </h3>
          {guia.idioma && (
            <span className="shrink-0 rounded-full bg-[#1763B0]/10 dark:bg-[#7FB3F0]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#1763B0] dark:text-[#7FB3F0]">
              {guia.idioma}
            </span>
          )}
        </div>

        {guia.descripcion && (
          <p className="mt-2 text-sm leading-relaxed text-[#121212]/70 dark:text-white/70">
            {guia.descripcion}
          </p>
        )}

        {guia.fuente && (
          <p className="mt-2 text-xs italic text-[#121212]/50 dark:text-white/45">
            {guia.fuente}
          </p>
        )}

        {/* Downloads */}
        {(hasPdf || hasImage) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hasPdf && (
              <a
                href={guia.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1763B0] px-3 py-2 text-xs font-semibold text-white hover:bg-[#125195] transition-colors"
              >
                <FileText size={15} />
                Descargar PDF
              </a>
            )}
            {hasImage && (
              <a
                href={guia.imagenUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1763B0]/30 dark:border-white/20 px-3 py-2 text-xs font-semibold text-[#1763B0] dark:text-[#7FB3F0] hover:bg-[#1763B0]/5 dark:hover:bg-white/5 transition-colors"
              >
                <Download size={15} />
                Descargar imagen
              </a>
            )}
          </div>
        )}

        {/* Share */}
        <div className="mt-4">
          <p className="mb-1.5 text-xs font-semibold text-[#121212]/60 dark:text-white/55">Compartir</p>
          <ShareButtons titulo={guia.titulo} pageUrl={pageUrl} />
        </div>

        {/* Suggestion */}
        <div className="mt-auto pt-3">
          <SuggestionForm guiaTitulo={guia.titulo} />
        </div>
      </div>
    </article>
  );
}