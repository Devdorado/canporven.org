import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import PageShell from '@/components/landing/PageShell';
import SubpageHero from '@/components/landing/SubpageHero';
import { Phone, Building2, HeartHandshake } from 'lucide-react';

const emergencies = [
  { name: '911', label: 'contactos.em_911', note: 'contactos.solo_vzla' },
  { name: '171', label: 'contactos.em_171', note: 'contactos.solo_vzla' },
  { name: '0800-SISMO00', label: 'contactos.em_sismo', note: 'contactos.solo_vzla' },
];

const entities = [
  { name: 'Cruz Roja Venezolana', phone: '+58 212 571 4380' },
  { name: 'Protección Civil', phone: '+58 212 662 3055' },
  { name: 'Cáritas Venezuela', phone: '+58 212 442 0651' },
];

const donations = [
  { name: 'ACNUR / UNHCR', url: 'https://donate.unhcr.org' },
  { name: 'Cruz Roja', url: 'https://www.cruzroja.es' },
];

export default function Contactos() {
  const { lang } = useLang();
  return (
    <PageShell>
      <SubpageHero titleKey="nav.contactos" subtitleKey="contactos.intro" />
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-12">
        <section id="emergencias" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#121212] mb-4">
            <Phone size={22} className="text-[#1565C0]" /> {t('menu.ct_emergencias', lang)}
          </h2>
          <div className="space-y-3">
            {emergencies.map((e) => (
              <div key={e.name} className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                <div>
                  <p className="font-bold text-[#121212]">{e.name}</p>
                  <p className="text-sm text-[#121212]/60">{t(e.label, lang)}</p>
                </div>
                <span className="text-xs text-[#121212]/50">{t(e.note, lang)}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="entidades" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#121212] mb-4">
            <Building2 size={22} className="text-[#1565C0]" /> {t('menu.ct_entidades', lang)}
          </h2>
          <div className="space-y-3">
            {entities.map((e) => (
              <div key={e.name} className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3">
                <p className="font-medium text-[#121212]">{e.name}</p>
                <a href={`tel:${e.phone.replace(/\s/g, '')}`} className="text-sm text-[#1565C0] font-medium">{e.phone}</a>
              </div>
            ))}
          </div>
        </section>

        <section id="donar" className="scroll-mt-24">
          <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-[#121212] mb-4">
            <HeartHandshake size={22} className="text-[#1565C0]" /> {t('menu.ct_donar', lang)}
          </h2>
          <div className="space-y-3">
            {donations.map((d) => (
              <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 hover:border-[#1565C0]/50 transition-colors">
                <p className="font-medium text-[#121212]">{d.name}</p>
                <span className="text-sm text-[#1565C0] font-medium">{t('cds.open', lang)} →</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}