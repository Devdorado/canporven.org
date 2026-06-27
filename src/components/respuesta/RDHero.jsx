import React from 'react';

const stats = [
  { n: '7,2 + 7,5', color: 'text-[#E23124]', t: 'Doblete con 39 s de diferencia, falla de San Sebastián' },
  { n: '~920', color: 'text-[#E23124]', t: 'Fallecidos confirmados, +4.500 heridos (preliminar)' },
  { n: '50.000+', color: 'text-[#C98700]', t: 'Personas reportadas como desaparecidas' },
  { n: '10–15 s', color: 'text-[#1565C0]', t: 'De aviso de la alerta de Android' },
  { n: '28.040 → 26.962', color: 'text-[#1F9D6B]', t: 'Reportes deduplicados (Tilores)' },
];

export default function RDHero() {
  return (
    <section className="bg-gradient-to-br from-[#1565C0]/8 via-white to-[#F5B301]/8 pt-14 pb-12 md:pt-20 md:pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0C3F75] bg-white border border-[#1565C0]/15 px-4 py-2 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#1565C0]" />
          Informe · Crisis Informatics · 24 jun 2026
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-[#121212] mt-5 max-w-3xl leading-tight">
          El terremoto de Venezuela, en clave digital
        </h1>
        <p className="text-base md:text-lg text-[#121212]/60 mt-5 max-w-3xl leading-relaxed">
          Mientras los equipos cavan entre escombros, otra respuesta ocurre en paralelo: alertas en el móvil,
          satélites que mapean daños y plataformas ciudadanas que buscan a más de 50.000 desaparecidos. Este es
          el mapa de esa respuesta digital y de IA, sus grietas, y dónde puede encajar una iniciativa como la nuestra.
        </p>
        <a
          href="#toolbox"
          className="inline-flex items-center justify-center mt-7 px-7 py-3.5 rounded-xl font-bold text-white bg-[#1565C0] hover:bg-[#0C3F75] transition-colors shadow-lg shadow-[#1565C0]/25 min-h-[48px]"
        >
          Dónde encajamos
        </a>

        {/* Stat infographic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mt-12">
          {stats.map((s) => (
            <div key={s.n} className="bg-white border border-[#1565C0]/12 rounded-2xl p-4 md:p-5 shadow-sm">
              <div className={`font-bold text-xl md:text-2xl leading-none ${s.color}`}>{s.n}</div>
              <div className="text-xs text-[#121212]/55 mt-2 leading-snug">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}