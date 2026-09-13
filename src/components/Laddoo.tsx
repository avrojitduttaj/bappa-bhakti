import React from 'react';

interface LaddooProps {
  size?: number;
}

export const Laddoo: React.FC<LaddooProps> = ({ size = 64 }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        <defs>
          <radialGradient id="laddooGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          <filter id="laddooShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#78350F" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer Irregular Boondi Ball */}
        <circle cx="50" cy="50" r="38" fill="url(#laddooGrad)" stroke="#B45309" strokeWidth="2" filter="url(#laddooShadow)" />

        {/* Motichoor Boondi Specks */}
        {[
          { cx: 35, cy: 35, r: 6 },
          { cx: 58, cy: 32, r: 7 },
          { cx: 44, cy: 50, r: 8 },
          { cx: 64, cy: 55, r: 6.5 },
          { cx: 30, cy: 56, r: 7 },
          { cx: 50, cy: 70, r: 7.5 },
          { cx: 38, cy: 68, r: 5 }
        ].map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="#FCD34D" opacity="0.45" />
        ))}

        {/* Pistachio / Cashew Flakes */}
        <path d="M 32 32 Q 38 28 35 36 Z" fill="#16A34A" />
        <path d="M 58 60 Q 64 54 62 64 Z" fill="#16A34A" />
        <path d="M 52 38 Q 56 34 54 42 Z" fill="#15803D" />

        {/* Silver Vark Foil Highlight */}
        <polygon points="40,25 48,22 45,30 38,28" fill="#F3F4F6" opacity="0.85" />
        <polygon points="60,40 68,36 66,45" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};
