import React from 'react';
import StatsCards from '@/components/venezuela/StatsCards';
import VenezuelaMap from '@/components/venezuela/VenezuelaMap';
import PersonSearch from '@/components/venezuela/PersonSearch';
import NewsFeed from '@/components/venezuela/NewsFeed';
import ReportsList from '@/components/venezuela/ReportsList';
import DamageValidation from '@/components/venezuela/DamageValidation';

export default function VenezuelaDashboard() {
  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                🇻🇪 Venezuela Erdbeben
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Lageübersicht · 24. Juni 2026 · Daten von{' '}
                <a
                  href="https://sosvenezuela2026.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  SOS Venezuela 2026
                </a>
              </p>
            </div>
            <a
              href="https://apoyovenezuela.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Weitere Ressourcen:{' '}
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
              Vermisste
            </a>
          </p>
          <p className="mt-1">
            Die Daten werden von der Community gemeldet. Bitte vor Handlung verifizieren. Bei Lebensgefahr: 911.
          </p>
        </div>
      </div>
    </div>
  );
}
