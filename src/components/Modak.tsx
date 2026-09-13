import React from 'react';

interface ModakProps {
  size?: number;
  showSteam?: boolean;
}

export const Modak: React.FC<ModakProps> = ({ size = 64, showSteam = true }) => {
  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Steam Keyframe Particles */}
      {showSteam && (
        <div className="absolute -top-4 inset-x-0 flex justify-center gap-1.5 pointer-events-none opacity-70">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-steamRise" style={{ animationDelay: '0s' }} />
          <div className="w-1 h-4 bg-white/80 rounded-full animate-steamRise" style={{ animationDelay: '0.4s' }} />
          <div className="w-1 h-3 bg-white/60 rounded-full animate-steamRise" style={{ animationDelay: '0.8s' }} />
        </div>
      )}

      {/* SVG Modak Vector */}
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="drop-shadow-md">
        <defs>
          <radialGradient id="modakGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#B45309" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Main Modak Body */}
        <path
          d="M 50 12 Q 85 30 85 68 Q 50 90 15 68 Q 15 30 50 12 Z"
          fill="url(#modakGrad)"
          stroke="#FCD34D"
          strokeWidth="2.5"
          filter="url(#shadow)"
        />

        {/* Vertical Steamed Pleats */}
        <path d="M 50 14 Q 50 50 50 88" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M 50 14 Q 32 45 28 72" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 50 14 Q 68 45 72 72" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 50 14 Q 20 40 18 64" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 50 14 Q 80 40 82 64" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Kesar Saffron Crown Tip */}
        <path d="M 50 10 Q 53 14 50 18 Q 47 14 50 10 Z" fill="#EA580C" />
        <circle cx="50" cy="15" r="2.5" fill="#F59E0B" />
      </svg>
    </div>
  );
};
