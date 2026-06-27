import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RDHero from '@/components/respuesta/RDHero';
import RDEcosystem from '@/components/respuesta/RDEcosystem';
import RDComparison from '@/components/respuesta/RDComparison';
import RDGaps from '@/components/respuesta/RDGaps';
import RDAgentic from '@/components/respuesta/RDAgentic';
import RDToolbox from '@/components/respuesta/RDToolbox';

export default function RespuestaDigital() {
  return (
    <div className="bg-white">
      {/* ALPHA note */}
      <div className="bg-gradient-to-r from-[#F5B301]/15 to-[#1565C0]/10 border-b border-[#1565C0]/10 text-center text-[13px] font-semibold text-[#0C3F75] px-4 py-2.5">
        <span className="bg-[#C98700] text-white rounded-md px-2 py-0.5 text-[11px] tracking-wide mr-2">ALPHA</span>
        Iniciativa ciudadana privada en formación, sin garantía legal. Ayuda profesional y alianzas bienvenidas.
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#1565C0]/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-[#121212]">
            <span className="text-[#1565C0]">CAN</span>
            <span className="text-[#C98700]">POR</span>
            <span className="text-[#E23124]">VEN</span>
            <span className="text-[#1565C0]/60">.ORG</span>
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#1565C0] hover:bg-[#0C3F75] transition-colors px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
        </div>
      </header>

      <main>
        <RDHero />
        <RDEcosystem />
        <RDComparison />
        <RDGaps />
        <RDAgentic />
        <RDToolbox />
      </main>

      {/* Footer note */}
      <footer className="bg-[#0b1322] text-white/70 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <span className="font-bold text-lg">
            <span className="text-[#5b9be0]">CAN</span>
            <span className="text-[#F5B301]">POR</span>
            <span className="text-[#e8604f]">VEN</span>
            <span className="text-[#8fb4e0]">.ORG</span>
          </span>
          <p className="text-sm text-white/50 mt-4 leading-relaxed max-w-3xl">
            Síntesis basada en fuentes públicas (OCHA, IFRC, PAHO/WHO, Copernicus EMS, Microsoft AI for Good Lab,
            Humanitarian OpenStreetMap, Tilores, Translators without Borders) y literatura de informática de crisis.
            Cifras preliminares, actualizado a 27 de junio de 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}