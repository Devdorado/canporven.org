import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Lightbulb, CheckCircle2 } from 'lucide-react';

export default function SuggestionForm({ guiaTitulo }) {
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [contacto, setContacto] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!mensaje.trim() || submitting) return;
    setSubmitting(true);
    await base44.entities.GuiaSugerencia.create({
      guiaTitulo: guiaTitulo || '',
      mensaje: mensaje.trim(),
      contacto: contacto.trim(),
      estado: 'pendiente',
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 px-3 py-2.5 text-sm text-green-800 dark:text-green-300">
        <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
        <span>¡Gracias! Hemos recibido tu sugerencia y la revisaremos.</span>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1763B0] dark:text-[#7FB3F0] hover:underline"
      >
        <Lightbulb size={15} />
        Sugerir una mejora
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-2 rounded-lg border border-[#1763B0]/15 dark:border-white/10 bg-[#F5F7FB] dark:bg-white/5 p-3">
      <p className="text-xs font-semibold text-[#121212] dark:text-[#E8EEF6]">Sugerir una mejora</p>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        required
        rows={3}
        placeholder="¿Qué mejorarías de esta guía? (obligatorio)"
        className="w-full resize-none rounded-lg border border-[#1763B0]/20 dark:border-white/15 bg-white dark:bg-[#0e1726] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1763B0]/30"
      />
      <input
        type="text"
        value={contacto}
        onChange={(e) => setContacto(e.target.value)}
        placeholder="Tu email o teléfono (opcional)"
        className="w-full rounded-lg border border-[#1763B0]/20 dark:border-white/15 bg-white dark:bg-[#0e1726] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1763B0]/30"
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={!mensaje.trim() || submitting}
          className="rounded-lg bg-[#1763B0] px-4 py-2 text-xs font-semibold text-white hover:bg-[#125195] disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Enviando…' : 'Enviar sugerencia'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg px-3 py-2 text-xs font-semibold text-[#121212]/60 dark:text-white/60 hover:bg-[#1763B0]/5 dark:hover:bg-white/5 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}