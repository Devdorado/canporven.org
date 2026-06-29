import React from 'react';

const VERIF_STYLES = {
  'sí': 'bg-green-100 text-green-800',
  'si': 'bg-green-100 text-green-800',
  'no': 'bg-slate-100 text-slate-600',
};

function VerifBadge({ value }) {
  const key = (value || '').toLowerCase().trim();
  const cls = VERIF_STYLES[key] || 'bg-slate-100 text-slate-600';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>
      {value || '—'}
    </span>
  );
}

export default function ContactosTable({ rows }) {
  if (!rows.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        No hay contactos que coincidan con los filtros.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">País</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Teléfono</th>
            <th className="px-4 py-3">Verificado</th>
            <th className="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{c.nombre || '—'}</td>
              <td className="px-4 py-3 text-slate-700">{c.categoria || '—'}</td>
              <td className="px-4 py-3 text-slate-700">{c.pais || '—'}</td>
              <td className="px-4 py-3 text-slate-700">
                {c.email ? (
                  <a href={`mailto:${c.email}`} className="text-blue-700 hover:underline">
                    {c.email}
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td className="px-4 py-3 text-slate-700">{c.telefono || '—'}</td>
              <td className="px-4 py-3"><VerifBadge value={c.verificado} /></td>
              <td className="px-4 py-3 text-slate-700">{c.estadoContacto || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}