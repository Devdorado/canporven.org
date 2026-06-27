import React from 'react';
import { ExternalLink } from 'lucide-react';

const cards = [
  {
    tag: 'Alerta temprana', accent: 'verde',
    title: 'Google · Alertas de terremotos en Android',
    text: 'Convierte millones de móviles en una red sísmica distribuida; el nivel TakeAction tomó la pantalla completa en Caracas y La Guaira y dio segundos para evacuar.',
  },
  {
    tag: 'Conectividad', accent: 'oro',
    title: 'Starlink · Internet de emergencia',
    text: 'Un mes gratis hasta el 25 de julio de 2026 en la zona del desastre; pero el kit cuesta unos 470 USD y solo hay tres distribuidores: aún de lujo.',
  },
  {
    tag: 'Observación de la Tierra', accent: 'verde',
    title: 'Copernicus EMS (EMSR884)',
    text: 'La UE activó la cartografía rápida el 25 de junio; Sentinel genera mapas de daños bajo demanda.',
    link: 'https://mapping.emergency.copernicus.eu/news/earthquake-in-venezuela-emsr884/',
    linkText: 'Activación EMSR884',
  },
  {
    tag: 'IA · Daños', accent: 'verde',
    title: 'Microsoft AI for Good Lab',
    text: 'Redes neuronales clasifican el daño edificio por edificio en Catia La Mar, publicado como GeoPackage en el Humanitarian Data Exchange.',
    link: 'https://data.humdata.org/dataset/venezuela-earthquakes-catia-la-mar',
    linkText: 'Dataset en HDX',
  },
  {
    tag: 'Mapeo colaborativo', accent: 'verde',
    title: 'Humanitarian OpenStreetMap (HOT)',
    text: 'Voluntarios trazan edificios y vías de Caracas y La Guaira sobre imagen aérea reciente para guiar a los equipos USAR.',
    link: 'https://community.openstreetmap.org/t/mapping-to-support-the-venezuela-earthquake-response/144882',
    linkText: 'Tarea de mapeo',
  },
  {
    tag: 'Ciudadanía · Desaparecidos', accent: 'azul',
    title: 'Plataformas ciudadanas de búsqueda',
    text: 'Hazlo Hoy / Venezuela Ayuda, Desaparecidos Terremoto Venezuela y Venezuela Te Busca, esta última deduplicada con Tilores.',
    link: 'https://venezuela-ayuda.vercel.app/',
    linkText: 'Venezuela Ayuda',
  },
];

const accentClasses = {
  azul: 'text-[#0C3F75] bg-[#1565C0]/10',
  oro: 'text-[#C98700] bg-[#F5B301]/15',
  verde: 'text-[#1F9D6B] bg-[#1F9D6B]/10',
};

export default function RDEcosystem() {
  return (
    <section className="bg-[#F4F8FC] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1565C0] mb-3">
            <span className="w-6 h-0.5 bg-[#1565C0] rounded" /> El ecosistema activo
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#121212]">Qué está respondiendo en lo digital</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {cards.map((c) => (
            <div key={c.title} className="bg-white border border-[#1565C0]/12 rounded-2xl p-6 shadow-sm flex flex-col">
              <span className={`self-start text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full mb-3 ${accentClasses[c.accent]}`}>
                {c.tag}
              </span>
              <h4 className="font-bold text-[#121212] mb-2 leading-snug">{c.title}</h4>
              <p className="text-sm text-[#121212]/60 flex-1 leading-relaxed">{c.text}</p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#1565C0] hover:text-[#0C3F75] transition-colors"
                >
                  {c.linkText} <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}