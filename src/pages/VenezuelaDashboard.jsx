import React from 'react';
import { useVenezuelaUpdatedAt } from '@/hooks/useVenezuelaData';
import { Clock } from 'lucide-react';
import StatsCards from '@/components/venezuela/StatsCards';
import VenezuelaMap from '@/components/venezuela/VenezuelaMap';
import PersonSearch from '@/components/venezuela/PersonSearch';
import NewsFeed from '@/components/venezuela/NewsFeed';
import ReportsList from '@/components/venezuela/ReportsList';
import DamageValidation from '@/components/venezuela/DamageValidation';
import DashboardErrorBoundary from '@/components/venezuela/DashboardErrorBoundary';

export default function VenezuelaDashboard() {
  const { updatedAt } = useVenezuelaUpdatedAt();
  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <DashboardErrorBoundary>
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                🇻🇪 Terremoto de Venezuela
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Resumen de la situación · 24 de junio de 2026 · Datos de{' '}
                <a
                  href="https://sosvenezuela2026.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  SOS Venezuela 2026
                </a>
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                Última actualización: {updatedLabel}
              </p>
            </div>
            <a
              href="https://apoyovenezuela.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Más recursos:{' '}
              <span className="text-primary underline">apoyovenezuela.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Stats Row */}
        <StatsCards />

        {/* Map + News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VenezuelaMap />
          </div>
          <div>
            <NewsFeed />
          </div>
        </div>

        {/* Person Search + Damage Validation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PersonSearch />
          <DamageValidation />
        </div>

        {/* Reports List */}
        <ReportsList />

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          <p>
            Datenquelle:{' '}
            <a href="https://sosvenezuela2026.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              SOS Venezuela 2026
            </a>
            {' · '}
            <a href="https://apoyovenezuela.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Apoyo Venezuela
            </a>
            {' · '}
            <a href="https://desaparecidosterremotovenezuela.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Desaparecidos
            </a>
          </p>
          <p className="mt-1">
            Datos de SOS Venezuela 2026, Apoyo Venezuela y ApoyoVzla — iniciativas ciudadanas sin afiliación política.
          </p>
          <p className="mt-1">
            Los datos son reportados por la comunidad. Por favor, verifica antes de actuar. En caso de peligro vital: 911.
          </p>
        </div>
      </div>
    </div>
    </DashboardErrorBoundary>
  );
}