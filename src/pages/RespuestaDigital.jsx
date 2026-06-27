import React, { useState } from 'react';

export default function RespuestaDigital() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1565C0] rounded-full animate-spin"></div>
        </div>
      )}
      <iframe
        src="/respuesta-digital.html"
        title="Respuesta digital"
        onLoad={() => setLoading(false)}
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          margin: 0,
          display: 'block',
        }}
      />
    </div>
  );
}