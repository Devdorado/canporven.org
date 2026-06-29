import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { LangProvider } from '@/lib/i18n.jsx';
import Header from '@/components/landing/Header';
import FooterMega from '@/components/landing/FooterMega';
import GuiaCard from '@/components/guias/GuiaCard';
import GuiasOverview from '@/components/guias/GuiasOverview';
import { BookOpen } from 'lucide-react';

export default function Guias() {
  const [guias, setGuias] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageUrl =
    typeof window !== 'undefined' ? window.location.origin + '/guias' : 'https://canporven.org/guias';

  useEffect(() => {
    let active = true;
    (async () => {
      const all = await base44.entities.Guia.filter({ publicado: true }, 'orden');
      if (active) {
        setGuias(Array.isArray(all) ? all : []);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <LangProvider>
      <div className="min-h-screen bg-white dark:bg-[#0b1322] flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Intro */}
          <section className="border-b border-[#1763B0]/10 dark:border-white/10 bg-[#F5F7FB] dark:bg-[#0e1726]">
            <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
              <div className="flex items-center gap-2 text-[#1763B0] dark:text-[#7FB3F0]">
                <BookOpen size={22} />
                <span className="text-sm font-semibold uppercase tracking-wide">Recursos</span>
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-[#121212] dark:text-[#E8EEF6]">
                Guías y recursos
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#121212]/70 dark:text-white/70">
                Guías verificadas para compartir, descargar e imprimir. Basadas en fuentes oficiales
                (PAHO/OMS/CICR).
              </p>
            </div>
          </section>

          {/* Gallery */}
          <section className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-8">
            {!loading && guias.length > 0 && <GuiasOverview guias={guias} />}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="animate-pulse rounded-2xl border border-[#1763B0]/10 dark:border-white/10 overflow-hidden">
                    <div className="aspect-[4/3] bg-[#1763B0]/5 dark:bg-white/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 rounded bg-[#1763B0]/10 dark:bg-white/10" />
                      <div className="h-3 w-full rounded bg-[#1763B0]/5 dark:bg-white/5" />
                      <div className="h-3 w-5/6 rounded bg-[#1763B0]/5 dark:bg-white/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : guias.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#1763B0]/20 dark:border-white/15 py-16 text-center text-[#121212]/50 dark:text-white/50">
                Aún no hay guías publicadas. Vuelve pronto.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {guias.map((g) => (
                  <GuiaCard key={g.id} guia={g} pageUrl={pageUrl} />
                ))}
              </div>
            )}
          </section>
        </main>

        <FooterMega />
      </div>
    </LangProvider>
  );
}