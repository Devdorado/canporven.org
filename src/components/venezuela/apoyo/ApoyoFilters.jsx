import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useLang, t } from '@/lib/i18n.jsx';
import { STATUS_CONFIG, STATUS_ORDER, CATEGORIA_OPTIONS, URGENCIA_OPTIONS } from './apoyoConfig';

const ESTADOS = [
  'Distrito Capital', 'Miranda', 'Vargas', 'Aragua', 'Carabobo',
  'Falcón', 'Lara', 'Yaracuy', 'Zulia', 'Trujillo', 'Mérida', 'Táchira',
];

function FilterSelect({ value, onChange, placeholder, children }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

export default function ApoyoFilters({ filters, setFilters }) {
  const { lang } = useLang();
  const set = (key) => (val) =>
    setFilters((f) => ({ ...f, [key]: val === '__all' ? '' : val }));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterSelect value={filters.estado || '__all'} onChange={set('estado')} placeholder={t('apoyo.filter_estado', lang)}>
        <SelectItem value="__all">{t('apoyo.filter_estado', lang)}: {t('apoyo.filter_all', lang)}</SelectItem>
        {ESTADOS.map((e) => (
          <SelectItem key={e} value={e}>{e}</SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect value={filters.status || '__all'} onChange={set('status')} placeholder={t('apoyo.filter_status', lang)}>
        <SelectItem value="__all">{t('apoyo.filter_status', lang)}: {t('apoyo.filter_all', lang)}</SelectItem>
        {STATUS_ORDER.concat('estable').map((s) => (
          <SelectItem key={s} value={s}>{t(STATUS_CONFIG[s].key, lang)}</SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect value={filters.categoria || '__all'} onChange={set('categoria')} placeholder={t('apoyo.filter_categoria', lang)}>
        <SelectItem value="__all">{t('apoyo.filter_categoria', lang)}: {t('apoyo.filter_all', lang)}</SelectItem>
        {CATEGORIA_OPTIONS.map((c) => (
          <SelectItem key={c} value={c}>{t(`apoyo.cat.${c}`, lang)}</SelectItem>
        ))}
      </FilterSelect>

      <FilterSelect value={filters.urgencia || '__all'} onChange={set('urgencia')} placeholder={t('apoyo.filter_urgencia', lang)}>
        <SelectItem value="__all">{t('apoyo.filter_urgencia', lang)}: {t('apoyo.filter_all', lang)}</SelectItem>
        {URGENCIA_OPTIONS.map((u) => (
          <SelectItem key={u} value={u}>{t(`apoyo.urg.${u}`, lang)}</SelectItem>
        ))}
      </FilterSelect>

      <div className="flex items-center gap-2">
        <Switch
          id="solo-pedidos"
          checked={!!filters.soloConPedidos}
          onCheckedChange={(v) => setFilters((f) => ({ ...f, soloConPedidos: v ? 'true' : '' }))}
        />
        <Label htmlFor="solo-pedidos" className="text-sm text-muted-foreground cursor-pointer">
          {t('apoyo.solo_pedidos', lang)}
        </Label>
      </div>
    </div>
  );
}