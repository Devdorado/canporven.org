import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LangProvider, useLang, t } from '@/lib/i18n.jsx';

function RespuestaDigitalContent() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center bg-white rounded-2xl border border-[#1565C0]/15 shadow-sm p-8 md:p-12">
        <h1 className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
          {t('nav.digital', lang)}
        </h1>
        <p className="text-[#121212]/60 mb-8">
          {lang === 'es'
            ? 'Estamos añadiendo el contenido completo del informe. Vuelve pronto.'
            : "We're adding the full report content. Please check back soon."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-[#1565C0] text-white hover:bg-[#1255A0] transition-colors min-h-[48px]"
        >
          <ArrowLeft size={18} />
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </div>
    </div>
  );
}

export default function RespuestaDigital() {
  return (
    <LangProvider>
      <RespuestaDigitalContent />
    </LangProvider>
  );
}