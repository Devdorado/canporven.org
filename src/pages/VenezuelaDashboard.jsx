import React from 'react';
import { useVenezuelaUpdatedAt } from '@/hooks/useVenezuelaData';
import { Clock, Search, ExternalLink } from 'lucide-react';
import { LangProvider, useLang, t } from '@/lib/i18n.jsx';
import Header from '@/components/landing/Header';
import FooterMega from '@/components/landing/FooterMega';
import StatsCards from '@/components/venezuela/StatsCards';
import VenezuelaMap from '@/components/venezuela/VenezuelaMap';
import PersonSearch from '@/components/venezuela/PersonSearch';
import NewsFeed from '@/components/venezuela/NewsFeed';
import ReportsList from '@/components/venezuela/ReportsList';
import DamageValidation from '@/components/venezuela/DamageValidation';
import DashboardErrorBoundary from '@/components/venezuela/DashboardErrorBoundary';
import ApoyoZonasTab from '@/components/venezuela/apoyo/ApoyoZonasTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

function DashboardContent() {
  const { lang } = useLang();
  const { updatedAt } = useVenezuelaUpdatedAt();
  const updatedLabel = updatedAt
    ? new Date(updatedAt).toLocaleString(lang === 'en' ? 'en-GB' : 'es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : '—';

  return (
    <>
    <Header />
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {t('dash.title', lang)}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t('dash.subtitle_prefix', lang)}{' '}
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
                {t('dash.last_update', lang)} {updatedLabel}
              </p>
            </div>
            <a
              href="https://apoyovenezuela.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('dash.more_resources', lang)}{' '}
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
              {t('dash.missing_title', lang)}
            </p>
            <p className="text-xs text-red-700/80 dark:text-red-300/80 mt-0.5">
              {t('dash.missing_desc', lang)}
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white group-hover:bg-red-700 transition-colors">
            {t('dash.open', lang)}
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </a>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-6 space-y-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="overview">{t('tabs.overview', lang)}</TabsTrigger>
            <TabsTrigger value="zones">{t('tabs.zones', lang)}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-0">
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
          </TabsContent>

          <TabsContent value="zones" className="mt-0">
            <ApoyoZonasTab />
          </TabsContent>
        </Tabs>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
          <p>
            {t('dash.source', lang)}{' '}
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
            {t('dash.source_note', lang)}
          </p>
          <p className="mt-1">
            {t('dash.verify_note', lang)}
          </p>
        </div>
      </div>
    </div>
    <FooterMega />
    </>
  );
}

export default function VenezuelaDashboard() {
  return (
    <DashboardErrorBoundary>
      <LangProvider>
        <DashboardContent />
      </LangProvider>
    </DashboardErrorBoundary>
  );
}