import React from 'react';
import { useVenezuelaUpdatedAt } from '@/hooks/useVenezuelaData';
import { Clock, Search, ExternalLink } from 'lucide-react';
import { LangProvider } from '@/lib/i18n.jsx';
import Header from '@/components/landing/Header';
import FooterMega from '@/components/landing/FooterMega';
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
    <LangProvider>
    <Header />
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

      {/* External missing-persons platform */}
      <div className="container mx-auto max-w-7xl px-4 pt-6">
        <a
          href="https://desaparecidosterremotovenezuela.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 px-4 py-4 hover:border-red-300 dark:hover:border-red-800 transition-colors"
        >
          <div className="shrink-0 w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-red-800 dark:text-red-200">
              Buscar o reportar personas desaparecidas
            </p>
            <p className="text-xs text-red-700/80 dark:text-red-300/80 mt-0.5">
              Plataforma ciudadana externa e independiente · desaparecidosterremotovenezuela.com — no gestiona dinero ni donaciones.
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-red-700 transition-colors">
            Abrir
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </a>
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
    <FooterMega />
    </LangProvider>
    </DashboardErrorBoundary>
  );
}