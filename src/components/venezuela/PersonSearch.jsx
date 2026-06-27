import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVenezuelaPersons } from '@/hooks/useVenezuelaData';
import { Search, User, Hospital } from 'lucide-react';

export default function PersonSearch() {
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('all');
  const { data, isLoading } = useVenezuelaPersons(query, estado === 'all' ? '' : estado);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Buscar personas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Escribe un nombre (mín. 2 caracteres)…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="seeking_info">Desaparecido</SelectItem>
              <SelectItem value="found_alive">Encontrado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && (
          <div className="py-8 text-center text-muted-foreground text-sm">
            Buscando…
          </div>
        )}

        {!isLoading && data?.length === 0 && query.length >= 2 && (
          <div className="py-8 text-center text-muted-foreground text-sm">
            Sin resultados para «{query}»
          </div>
        )}

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {data?.map((p) => (
            <div
              key={p.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.display_name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.cedula_masked} · {p.municipio}
                </p>
                {p.hospital_name && (
                  <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                    <Hospital className="w-3 h-3" />
                    {p.hospital_name}
                  </p>
                )}
                <span
                  className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                    p.status === 'found_alive'
                      ? 'bg-emerald-500/10 text-emerald-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {p.status === 'found_alive' ? 'Encontrado' : 'Desaparecido'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}