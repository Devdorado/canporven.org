import React from 'react';

const gaps = [
  {
    title: 'Censura e infraestructura',
    text: 'Cortes de luz inutilizan las torres y CONATEL bloquea redes y VPN; la OFAC dio licencia pero la censura impide difundir instrucciones. Starlink, de lujo.',
  },
  {
    title: 'Fragmentación y falsos positivos',
    text: 'Registros en silos; un falso positivo puede detener una búsqueda activa. Tilores halló 75 casos a la vez desaparecido y localizado y 947 grupos duplicados.',
  },
  {
    title: 'Exclusión lingüística',
    text: 'Respuesta casi monolingüe; quedan fuera wayuunaiki ~348.000, warao ~36.000 y pemón ~22.000, con alfabetización indígena del 70–71% y sin traductores automáticos integrados.',
  },
  {
    title: 'Falta de cultura sísmica',
    text: 'Los últimos grandes seísmos fueron 1967 y 1998; proliferan el pánico y los rumores sin verificar.',
  },
];

export default function RDGaps() {
  return (
    <section className="bg-[#F4F8FC] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1565C0] mb-3">
            <span className="w-6 h-0.5 bg-[#1565C0] rounded" /> Las grietas del sistema
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#121212]">Dónde falla la respuesta digital</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {gaps.map((g) => (
            <div key={g.title} className="bg-white border border-[#1565C0]/12 border-l-4 border-l-[#E23124] rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-[#121212] mb-2">{g.title}</h4>
              <p className="text-sm text-[#121212]/60 leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}