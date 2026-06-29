import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import { syncContactosFromClickup } from '@/functions/syncContactosFromClickup';
import ContactosTable from '@/components/crm/ContactosTable';
import { RefreshCw, Search, Loader2, ShieldAlert, Info } from 'lucide-react';

const ALL = '__all__';

function uniqueSorted(rows, key) {
  const set = new Set();
  rows.forEach((r) => {
    const v = (r[key] || '').trim();
    if (v) set.add(v);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'es'));
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-800 focus:border-blue-500 focus:outline-none"
      >
        <option value={ALL}>Todos</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export default function CRM() {
  const { user, isLoadingAuth } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);

  const [search, setSearch] = useState('');
  const [fCategoria, setFCategoria] = useState(ALL);
  const [fPais, setFPais] = useState(ALL);
  const [fVerificado, setFVerificado] = useState(ALL);
  const [fEstado, setFEstado] = useState(ALL);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await base44.entities.Contacto.list('-syncedAt', 5000);
    setContactos(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await syncContactosFromClickup({});
      const d = res.data || {};
      if (d.error) {
        setSyncMsg({ type: 'error', text: `Error: ${d.error}` });
      } else {
        setSyncMsg({
          type: 'ok',
          text: `Sincronizados ${d.synced} · creados ${d.created} · actualizados ${d.updated}${d.errors ? ` · errores ${d.errors}` : ''}`,
        });
        await load();
      }
    } catch (e) {
      setSyncMsg({ type: 'error', text: `Error: ${e.message}` });
    } finally {
      setSyncing(false);
    }
  };

  const categorias = useMemo(() => uniqueSorted(contactos, 'categoria'), [contactos]);
  const paises = useMemo(() => uniqueSorted(contactos, 'pais'), [contactos]);
  const verificados = useMemo(() => uniqueSorted(contactos, 'verificado'), [contactos]);
  const estados = useMemo(() => uniqueSorted(contactos, 'estadoContacto'), [contactos]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return contactos.filter((c) => {
      if (q) {
        const hit = (c.nombre || '').toLowerCase().includes(q) || (c.email || '').toLowerCase().includes(q);
        if (!hit) return false;
      }
      if (fCategoria !== ALL && (c.categoria || '') !== fCategoria) return false;
      if (fPais !== ALL && (c.pais || '') !== fPais) return false;
      if (fVerificado !== ALL && (c.verificado || '') !== fVerificado) return false;
      if (fEstado !== ALL && (c.estadoContacto || '') !== fEstado) return false;
      return true;
    });
  }, [contactos, search, fCategoria, fPais, fVerificado, fEstado]);

  const lastSync = useMemo(() => {
    let latest = null;
    contactos.forEach((c) => {
      if (c.syncedAt && (!latest || c.syncedAt > latest)) latest = c.syncedAt;
    });
    return latest;
  }, [contactos]);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-7 w-7 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-50 px-4 text-center">
        <ShieldAlert className="h-10 w-10 text-slate-400" />
        <h1 className="text-lg font-bold text-slate-800">Acceso restringido</h1>
        <p className="max-w-sm text-sm text-slate-500">
          Esta sección es solo para administradores.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CRM · Contactos (solo lectura)</h1>
            <p className="mt-1 text-sm text-slate-500">
              {loading ? 'Cargando…' : `${contactos.length} contactos`}
              {lastSync && (
                <> · Última sincronización: {new Date(lastSync).toLocaleString('es-ES')}</>
              )}
            </p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Sincronizar desde ClickUp
          </button>
        </div>

        {syncMsg && (
          <div
            className={`mt-4 rounded-lg px-4 py-2.5 text-sm ${
              syncMsg.type === 'ok' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
            }`}
          >
            {syncMsg.text}
          </div>
        )}

        {/* Read-only notice */}
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Espejo de solo lectura. La fuente de verdad es ClickUp (CANARY MEDIC › CRM Venezuela › Contactos). Edita allí.
          </span>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500 lg:col-span-1">
            Buscar
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nombre o email…"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm font-normal text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </label>
          <Select label="Categoría" value={fCategoria} onChange={setFCategoria} options={categorias} />
          <Select label="País" value={fPais} onChange={setFPais} options={paises} />
          <Select label="Verificado" value={fVerificado} onChange={setFVerificado} options={verificados} />
          <Select label="Estado de contacto" value={fEstado} onChange={setFEstado} options={estados} />
        </div>

        {/* Table */}
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : (
            <ContactosTable rows={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}