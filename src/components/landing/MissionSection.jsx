import React from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import { CircleDollarSign, Stethoscope, Building2 } from 'lucide-react';

const MISSION_IMG = 'https://media.base44.com/images/public/6a3fe712a7f72f3df9b00ca1/dcae4875e_image.png';

const cards = [
  {
    icon: CircleDollarSign,
    titleKey: 'mission.card1_title',
    textKey: 'mission.card1_text',
    badgeKey: 'mission.card1_badge',
    accent: '#C48F00',
  },
  {
    icon: Stethoscope,
    titleKey: 'mission.card2_title',
    textKey: 'mission.card2_text',
    accent: '#1565C0',
  },
  {
    icon: Building2,
    titleKey: 'mission.card3_title',
    textKey: 'mission.card3_text',
    accent: '#D32F2F',
  },
];

export default function MissionSection() {
  const { lang } = useLang();

  return (
    <section id="mision" className="py-16 md:py-24 bg-white" aria-labelledby="mission-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-4">
            {t('mission.title', lang)}
          </h2>
        </div>

        {/* Image */}
        <div className="max-w-2xl mx-auto mb-12 rounded-xl overflow-hidden">
          <img
            src={MISSION_IMG}
            alt={lang === 'es' ? 'Coordinación humanitaria' : 'Humanitarian coordination'}
            className="w-full h-48 md:h-64 object-cover"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.titleKey}
                className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${card.accent}15` }}
                >
                  <Icon size={24} style={{ color: card.accent }} />
                </div>
                <h3 className="text-lg font-semibold text-[#121212] mb-2">
                  {t(card.titleKey, lang)}
                </h3>
                <p className="text-[#121212]/70 text-base leading-relaxed">
                  {t(card.textKey, lang)}
                </p>
                {card.badgeKey && (
                  <span className="inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full bg-[#C48F00]/15 text-[#C48F00]">
                    {t(card.badgeKey, lang)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}