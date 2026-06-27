import React from 'react';

const cards = [
  { title: 'ResQConnect', text: 'Convierte una nota de voz o un SMS caótico en una tarea estructurada y enruta con un algoritmo AET: 85% menos cálculos y a un 7–12% de la ruta óptima.' },
  { title: 'ENV-QAS', text: 'Une modelos multimodales, grafos de conocimiento temporal y RAG para preguntas predictivas.' },
  { title: 'SentEMBNet + PACO', text: 'Filtra jerga, erratas, sarcasmo y rumores y deja pasar solo peticiones accionables.' },
];

const steps = [
  { n: 1, title: 'Ingesta y filtro', tech: 'SentEMBNet + PACO' },
  { n: 2, title: 'Traducción y acceso', tech: 'UniAndes MT + Whisper' },
  { n: 3, title: 'Resolución de identidad', tech: 'Tilores' },
  { n: 4, title: 'Enrutado logístico', tech: 'ResQConnect AET' },
];

export default function RDAgentic() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1565C0] mb-3">
            <span className="w-6 h-0.5 bg-[#1565C0] rounded" /> Lo que viene
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#121212]">IA agéntica y orquestación multimodal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((c) => (
            <div key={c.title} className="bg-white border border-[#1565C0]/12 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-[#121212] mb-2">{c.title}</h4>
              <p className="text-sm text-[#121212]/60 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-[#121212] mt-12 mb-5">Un pipeline de cuatro fases</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="bg-white border border-[#1565C0]/12 rounded-2xl p-5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#1565C0] text-white font-bold flex items-center justify-center mb-3">
                {s.n}
              </div>
              <h4 className="font-semibold text-[#121212] mb-2 text-sm">{s.title}</h4>
              <span className="inline-block text-[11px] font-bold text-[#0C3F75] bg-[#1565C0]/10 rounded-md px-2 py-1">
                {s.tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}