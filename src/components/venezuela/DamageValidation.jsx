import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVenezuelaDamage } from '@/hooks/useVenezuelaData';
import { ShieldAlert, Building2 } from 'lucide-react';

export default function DamageValidation() {
  const { data, isLoading } = useVenezuelaDamage();

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" />
          Strukturelle Schadensvalidierung
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="py-8 text-center text-muted-foreground text-sm">
            Daten werden geladen…
          </div>
        )}

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {data?.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <p className="font-medium text-sm">{item.zona}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.municipio} · {item.building_type}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="text-emerald-600">
                  Bewohnbar: {item.habitable_votes}
                </span>
                <span className="text-destructive">
                  Unbewohnbar: {item.inhabitable_votes}
                </span>
                <span className="text-muted-foreground">
                  Validierungen: {item.validations}
                </span>
              </div>
              {item.photo_ids?.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.photo_ids.length} Foto(s)
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
