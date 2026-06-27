import React from 'react';
import { Link } from 'react-router-dom';

const tools = [
  { title: 'Agregador y resolución de identidad', closes: 'fragmentación y falsos positivos' },
  { title: 'Puente multilingüe y de voz', closes: 'exclusión lingüística' },
  { title: 'Telemedicina (Canarymedic.es)', closes: 'continuidad sanitaria' },
  { title: 'Verificación y anti-desinformación', closes: 'rumores y falsos positivos' },
  { title: 'Acceso resistente a cortes', closes: 'censura e infraestructura' },
  { title: 'Coordinación y derivación', closes: 'duplicación de esfuerzos' },
];

export default function RDToolbox() {
  return (
    <section id="toolbox" className="bg-[#F4F8FC] py-16 md:py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Dark intro box */}
        <div className="bg-gradient-to-br from-[#0C3F75] to-[#0a3361] text-white rounded-3xl p-8 md:p-9 shadow-lg mb-7">
          <span className="inline-block bg-[#C98700] text-white rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide mb-4">
            PROPUESTA EN FORMACIÓN
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Nuestra toolbox: cerrar la brecha</h2>
          <p className="text-[#cfdcec] leading-relaxed max-w-3xl">
            No queremos crear otro silo. Como puente Canarias–Venezuela, con socios de salud y tecnología, podemos
            organizar y construir piezas que conectan lo que ya funciona. Esto es lo que evaluamos construir, no
            sistemas ya en producción.
          </p>
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {tools.map((tl) => (
            <div key={tl.title} className="bg-white border border-[#1565C0]/12 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-[#121212] mb-3 leading-snug">{tl.title}</h4>
              <span className="inline-block text-[11.5px] font-semibold text-[#B01C0F] bg-[#E23124]/8 rounded-md px-2.5 py-1">
                Cierra: {tl.closes}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#1565C0] to-[#0C3F75] text-white p-10 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">¿Construyes, financias o coordinas? Súmate.</h2>
          <p className="text-[#dbe8f7] max-w-xl mx-auto mb-6 leading-relaxed">
            Buscamos socios de tecnología, salud y logística para convertir esta toolbox en algo real, conectado a los canales oficiales.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-bold bg-white text-[#0C3F75] hover:bg-white/90 transition-colors min-h-[48px]"
          >
            Apóyanos y conecta con nosotros
          </Link>
        </div>
      </div>
    </section>
  );
}