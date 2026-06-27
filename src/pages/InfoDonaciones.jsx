import React, { useState } from 'react';

export default function InfoDonaciones() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {!loaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          fontSize: '14px',
          color: '#666',
        }}>
          Cargando la guía…
        </div>
      )}
      <iframe
        src="/infodonaciones.html"
        title="Cómo ayudar de verdad"
        onLoad={() => setLoaded(true)}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          border: 'none',
          margin: 0,
        }}
      />
    </div>
  );
}