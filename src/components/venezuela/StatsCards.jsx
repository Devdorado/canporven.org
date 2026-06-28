import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVenezuelaStats, useVenezuelaReports } from '@/hooks/useVenezuelaData';
import { useLang, t } from '@/lib/i18n.jsx';
import { Users, UserCheck, MapPin, AlertTriangle } from 'lucide-react';

export default function StatsCards() {
  const { lang } = useLang();
  const { data: stats, isLoading: statsLoading } = useVenezuelaStats();
  const { data: reports, isLoading: reportsLoading } = useVenezuelaReports();

  const cards = [
    {
      title: t('stats.missing', lang),
      value: stats?.missing ?? 0,
      icon: Users,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
    {
      title: t('stats.found', lang),
      value: stats?.found ?? 0,
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
    },
    {
      title: t('stats.reports', lang),
      value: reports?.length ?? 0,
      icon: MapPin,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: t('stats.critical', lang),
      value: reports?.filter((r) => r.severity === 'rojo').length ?? 0,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isLoading = statsLoading || reportsLoading;
        return (
          <Card key={card.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? '—' : card.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}