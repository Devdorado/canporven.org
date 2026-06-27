import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useLang, t } from '@/lib/i18n.jsx';
import { ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';

const apps = [
  { key: 'apoyovenezuela', name: 'Apoyo Venezuela', url: 'https://apoyovenezuela.com', descKey: 'cds.app1_desc' },
  { key: 'sosvenezuela2026', name: 'SOS Venezuela 2026', url: 'https://sosvenezuela2026.com', descKey: 'cds.app2_desc' },
  { key: 'apoyovzla', name: 'ApoyoVzla', url: 'https://apoyovzla.com', descKey: 'cds.app3_desc' },
  { key: 'redsolidariavenezuela', name: 'Red Solidaria Venezuela', url: 'https://red-solidaria-venezuela.vercel.app', descKey: 'cds.app4_desc' },
  { key: 'hospitalesenvenezuela', name: 'Hospitales en Venezuela', url: 'https://hospitalesenvenezuela.com', descKey: 'cds.app5_desc' },
];

const STORAGE_KEY = 'cds_votes';

function readVoted() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function AppCard({ app, counts, voted, onVote }) {
  const { lang } = useLang();
  const myVote = voted[app.key];

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-[#1565C0]/15 shadow-sm p-5">
      <h3 className="font-bold text-[#121212] text-lg leading-tight mb-2">{app.name}</h3>
      <p className="text-sm text-[#121212]/70 leading-snug flex-1">{t(app.descKey, lang)}</p>

      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm text-white bg-[#1565C0] hover:bg-[#1255A0] transition-colors min-h-[44px]"
      >
        {t('cds.open', lang)}
        <ExternalLink size={16} />
      </a>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onVote(app.key, 'up')}
          disabled={!!myVote}
          aria-label="thumbs up"
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-semibold transition-colors ${
            myVote === 'up'
              ? 'bg-[#1565C0] text-white border-[#1565C0]'
              : 'bg-white text-[#1565C0] border-[#1565C0]/30 hover:bg-[#1565C0]/5'
          } ${myVote ? 'cursor-default' : ''}`}
        >
          <ThumbsUp size={16} />
          {counts[app.key]?.up ?? 0}
        </button>
        <button
          type="button"
          onClick={() => onVote(app.key, 'down')}
          disabled={!!myVote}
          aria-label="thumbs down"
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border text-sm font-semibold transition-colors ${
            myVote === 'down'
              ? 'bg-[#E23124] text-white border-[#E23124]'
              : 'bg-white text-[#E23124] border-[#E23124]/30 hover:bg-[#E23124]/5'
          } ${myVote ? 'cursor-default' : ''}`}
        >
          <ThumbsDown size={16} />
          {counts[app.key]?.down ?? 0}
        </button>
      </div>
    </div>
  );
}

export default function CitizenSolutionsSection() {
  const { lang } = useLang();
  const [counts, setCounts] = useState({});
  const [voted, setVoted] = useState({});

  useEffect(() => {
    setVoted(readVoted());
    loadCounts();
  }, []);

  const loadCounts = async () => {
    const records = await base44.entities.AppVote.list('-created_date', 5000);
    const tally = {};
    for (const r of records) {
      if (!tally[r.appKey]) tally[r.appKey] = { up: 0, down: 0 };
      if (r.vote === 'up') tally[r.appKey].up += 1;
      else if (r.vote === 'down') tally[r.appKey].down += 1;
    }
    setCounts(tally);
  };

  const handleVote = async (appKey, vote) => {
    if (voted[appKey]) return;

    const updatedVoted = { ...voted, [appKey]: vote };
    setVoted(updatedVoted);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVoted));

    setCounts((prev) => {
      const cur = prev[appKey] || { up: 0, down: 0 };
      return { ...prev, [appKey]: { ...cur, [vote]: cur[vote] + 1 } };
    });

    await base44.entities.AppVote.create({ appKey, vote });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50" aria-labelledby="cds-heading">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 id="cds-heading" className="text-2xl md:text-3xl font-bold text-[#121212] mb-3">
            {t('cds.title', lang)}
          </h2>
          <p className="text-[#121212]/70 max-w-3xl mx-auto">{t('cds.intro', lang)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {apps.map((app) => (
            <AppCard key={app.key} app={app} counts={counts} voted={voted} onVote={handleVote} />
          ))}
        </div>
      </div>
    </section>
  );
}