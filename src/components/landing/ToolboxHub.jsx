import React, { useState } from 'react';
import { useLang, t } from '@/lib/i18n.jsx';
import {
  Fingerprint,
  ShieldCheck,
  WifiOff,
  Languages,
  MonitorSmartphone,
  Users,
} from 'lucide-react';

const BLUE = '#1763B0';
const RED = '#E23124';
const YELLOW = '#F5B301';

// tone: 'yellow' = operational focus, 'red' = potential
const tones = {
  yellow: {
    line: YELLOW,
    tile: 'bg-[#F5B301]/15',
    icon: 'text-[#C48F00]',
    title: 'text-[#9A6E00]',
  },
  red: {
    line: RED,
    tile: 'bg-[#E23124]/12',
    icon: 'text-[#E23124]',
    title: 'text-[#0F2747]',
  },
};

// Nodes in the user's requested order. side/row drive desktop layout.
const nodes = [
  { id: 'n1', icon: Fingerprint, titleKey: 'toolbox.card1_title', descKey: 'toolbox.card1_desc', closeKey: 'toolbox.card1_close', side: 'left', row: 0, tone: 'red' },
  { id: 'n2', icon: ShieldCheck, titleKey: 'toolbox.card4_title', descKey: 'toolbox.card4_desc', closeKey: 'toolbox.card4_close', side: 'left', row: 1, tone: 'red' },
  { id: 'n3', icon: WifiOff, titleKey: 'toolbox.card5_title', descKey: 'toolbox.card5_desc', closeKey: 'toolbox.card5_close', side: 'left', row: 2, tone: 'red' },
  { id: 'n4', icon: Languages, titleKey: 'toolbox.card2_title', descKey: 'toolbox.card2_desc', closeKey: 'toolbox.card2_close', side: 'right', row: 0, tone: 'red' },
  { id: 'n5', icon: MonitorSmartphone, titleKey: 'toolbox.card3_title', descKey: 'toolbox.card3_desc', closeKey: 'toolbox.card3_close', side: 'right', row: 1, tone: 'yellow' },
  { id: 'n6', icon: Users, titleKey: 'toolbox.card6_title', descKey: 'toolbox.card6_desc', closeKey: 'toolbox.card6_close', side: 'right', row: 2, tone: 'yellow' },
];

// SVG geometry (viewBox 1000 x 620). Hub center ~ (500, 310).
const HUB = { x: 500, y: 310 };
const linePoints = {
  n1: { x: 318, y: 92 },
  n2: { x: 318, y: 310 },
  n3: { x: 318, y: 528 },
  n4: { x: 682, y: 92 },
  n5: { x: 682, y: 310 },
  n6: { x: 682, y: 528 },
};

function elbowPath(p, side) {
  // gentle elbow: horizontal out from card, then toward hub, ending near the circle
  const hubEdgeX = side === 'left' ? HUB.x - 120 : HUB.x + 120;
  const midX = side === 'left' ? p.x + (hubEdgeX - p.x) * 0.55 : p.x - (p.x - hubEdgeX) * 0.55;
  return `M ${p.x} ${p.y} L ${midX} ${p.y} L ${hubEdgeX} ${HUB.y}`;
}

function NodeCard({ node, active, onActivate, onLeave }) {
  const { lang } = useLang();
  const Icon = node.icon;
  const tone = tones[node.tone] || tones.red;
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onMouseLeave={onLeave}
      onFocus={onActivate}
      onBlur={onLeave}
      onClick={onActivate}
      className={`relative z-10 text-left w-full rounded-2xl bg-white p-5 border transition-all duration-300 ${
        active
          ? 'scale-[1.04] shadow-xl border-[#1763B0]/40'
          : 'shadow-sm border-gray-200 hover:shadow-md'
      }`}
    >
      <div className={`w-11 h-11 rounded-xl ${tone.tile} flex items-center justify-center mb-3`}>
        <Icon size={22} className={tone.icon} />
      </div>
      <h3 className={`font-bold ${tone.title} mb-1.5 leading-tight`}>{t(node.titleKey, lang)}</h3>
      <p className="text-sm text-gray-500 mb-3 leading-snug">{t(node.descKey, lang)}</p>
      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F5B301]/20 text-[#9A6E00]">
        {t('toolbox.closes_label', lang)}: {t(node.closeKey, lang)}
      </span>
    </button>
  );
}

function Hub({ active }) {
  const { lang } = useLang();
  return (
    <div className="relative flex items-center justify-center">
      {/* dotted ring */}
      <div
        className={`absolute rounded-full border-2 border-dotted transition-colors duration-300 ${
          active ? 'border-[#1763B0]/50' : 'border-[#1763B0]/25'
        }`}
        style={{ width: 274, height: 274 }}
      />
      {/* main circle */}
      <div
        className={`relative rounded-full bg-white flex flex-col items-center justify-center text-center px-6 transition-all duration-300 ${
          active ? 'shadow-[0_0_40px_rgba(23,99,176,0.35)] border-[#1763B0]/60' : 'shadow-lg border-[#1763B0]/30'
        }`}
        style={{ width: 230, height: 230, borderWidth: 3 }}
      >
        <span className="text-xl font-bold text-[#0F2747] leading-tight mb-3">
          {t('toolbox.hub_title', lang)}
        </span>
        {/* suspension bridge icon */}
        <svg width="92" height="50" viewBox="0 0 92 50" fill="none" aria-hidden="true">
          {/* network of dots motif */}
          {[12, 30, 46, 62, 80].map((cx) => (
            <circle key={cx} cx={cx} cy={44} r="1.6" fill="#1763B0" opacity="0.35" />
          ))}
          {/* towers */}
          <line x1="22" y1="6" x2="22" y2="40" stroke="#1763B0" strokeWidth="2.5" />
          <line x1="70" y1="6" x2="70" y2="40" stroke="#1763B0" strokeWidth="2.5" />
          {/* deck */}
          <line x1="4" y1="40" x2="88" y2="40" stroke="#1763B0" strokeWidth="2.5" />
          {/* main cables */}
          <path d="M4 22 Q22 6 46 24 Q70 6 88 22" stroke="#1763B0" strokeWidth="2.5" fill="none" />
          {/* hangers */}
          {[10, 16, 34, 40, 52, 58, 76, 82].map((x, i) => (
            <line key={i} x1={x} y1="18" x2={x} y2="40" stroke="#1763B0" strokeWidth="1.2" opacity="0.6" />
          ))}
        </svg>
      </div>
    </div>
  );
}

export default function ToolboxHub() {
  const [active, setActive] = useState(null);
  const left = nodes.filter((n) => n.side === 'left');
  const right = nodes.filter((n) => n.side === 'right');

  return (
    <>
      {/* Desktop / tablet radial layout */}
      <div className="hidden min-[900px]:block relative mb-10">
        {/* SVG connector layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodes.map((n) => {
            const isActive = active === n.id;
            const stroke = tones[n.tone]?.line || BLUE;
            return (
              <path
                key={n.id}
                d={elbowPath(linePoints[n.id], n.side)}
                fill="none"
                stroke={stroke}
                strokeWidth={isActive ? 3 : 1.25}
                strokeOpacity={isActive ? 0.95 : 0.35}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        <div className="relative grid grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <div className="flex flex-col gap-6">
            {left.map((n) => (
              <NodeCard
                key={n.id}
                node={n}
                active={active === n.id}
                onActivate={() => setActive(n.id)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Hub active={active !== null} />
          </div>

          <div className="flex flex-col gap-6">
            {right.map((n) => (
              <NodeCard
                key={n.id}
                node={n}
                active={active === n.id}
                onActivate={() => setActive(n.id)}
                onLeave={() => setActive(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stacked layout */}
      <div className="min-[900px]:hidden mb-10">
        <div className="flex justify-center mb-8">
          <Hub active={active !== null} />
        </div>
        <div className="flex flex-col gap-4">
          {nodes.map((n) => (
            <NodeCard
              key={n.id}
              node={n}
              active={active === n.id}
              onActivate={() => setActive(active === n.id ? null : n.id)}
              onLeave={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
}