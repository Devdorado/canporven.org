import React from 'react';

const cols = ['Variable', 'Haití 2010', 'Nepal 2015', 'Türkiye/Siria 2023', 'Marruecos 2023', 'Venezuela 2026'];

const rows = [
  ['Crowdsourcing', 'Ushahidi / OSM', 'HOT', 'Deprem.io / scrapers', 'WhatsApp y SMS', 'Venezuela Ayuda y Venezuela Te Busca'],
  ['Satélite e IA', 'Interpretación manual', 'GIS remoto', 'Microsoft AI + Planet Labs', 'Copernicus EMS', 'Copernicus EMSR884 y Microsoft AI en Catia La Mar'],
  ['Telecomunicaciones', 'Colapso total', 'Aislamiento rural', '4G/5G con cortes', 'Alto Atlas sin señal', 'Starlink + bloqueos de CONATEL'],
  ['Idiomas', 'Creole a inglés', 'Inglés y nepalí', 'Turco y árabe', 'Exclusión del tashelhit', 'Solo español, exclusión de wayuunaiki/warao/pemón'],
  ['Identidad', 'Limpieza manual', 'Limpieza de CSV', 'Deduplicado en Python', 'Validación manual', 'Motor Tilores'],
];

export default function RDComparison() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1565C0] mb-3">
            <span className="w-6 h-0.5 bg-[#1565C0] rounded" /> Aprendizajes
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#121212]">Qué enseñaron otras catástrofes</h2>
        </div>
        <div className="bg-white border border-[#1565C0]/12 rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th
                    key={c}
                    className={`text-left text-xs font-bold uppercase tracking-wide px-4 py-3 text-white ${
                      c === 'Venezuela 2026' ? 'bg-[#C98700]' : 'bg-[#0C3F75]'
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-b border-[#1565C0]/8 last:border-0">
                  {r.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3 text-sm align-top ${
                        i === 0 ? 'font-bold text-[#121212]' : 'text-[#121212]/65'
                      } ${i === 5 ? 'bg-[#F5B301]/12 font-medium text-[#121212]/80' : ''}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}