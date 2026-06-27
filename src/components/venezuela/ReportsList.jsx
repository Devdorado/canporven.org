import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVenezuelaReports } from '@/hooks/useVenezuelaData';
import { MapPin, AlertTriangle, Building2, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categoryLabels = {
  collapsed_building: 'Eingestürzt',
  damaged_building: 'Beschädigt',
  gas_leak: 'Gasleck',
  blocked_road: 'Straße blockiert',
  trapped_person: 'Person eingeschlossen',
  collection_center: 'Sammelstelle',
};

const severityLabels = {
  rojo: 'Kritisch',
  naranja: 'Hoch',
  amarillo: 'Mittel',
  verde: 'Niedrig',
};

const severityBadge = {
  rojo: 'bg-red-500/10 text-red-600 border-red-200',
  naranja: 'bg-orange-500/10 text-orange-600 border-orange-200',
  amarillo: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
  verde: 'bg-green-500/10 text-green-600 border-green-200',
};

export default function ReportsList() {
  const { data: reports, isLoading } = useVenezuelaReports();
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filtered = reports?.filter((r) => {
    const catMatch = filterCategory === 'all' || r.category === filterCategory;
    const sevMatch = filterSeverity === 'all' || r.severity === filterSeverity;
    return catMatch && sevMatch;
  }) || [];

  const categories = [...new Set(reports?.map((r) => r.category) || [])];
  const severities = [...new Set(reports?.map((r) => r.severity) || [])];

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Aktuelle Reports
          </CardTitle>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px] h-8 text-xs">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue placeholder="Kategorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {categoryLabels[c] || c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Schwere" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                {severities.map((s) => (
                  <SelectItem key={s} value={s}>
                    {severityLabels[s] || s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="py-8 text-center text-muted-foreground text-sm">
            Reports werden geladen…
          </div>
        )}

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {filtered.slice(0, 50).map((r) => (
            <div
              key={r.id}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                {r.category === 'collapsed_building' || r.category === 'damaged_building' ? (
                  <Building2 className="w-4 h-4 text-primary" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{r.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${severityBadge[r.severity] || ''}`}>
                    {severityLabels[r.severity] || r.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {categoryLabels[r.category] || r.category}
                  </span>
                  <span className="text-xs text-muted-foreground">· {r.municipio}</span>
                </div>
                {r.verification && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Verifizierung: {r.verification}
                  </p>
                )}
              </div>
            </div>
          ))}
          {filtered.length > 50 && (
            <p className="text-xs text-center text-muted-foreground py-2">
              + {filtered.length - 50} weitere Reports
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}