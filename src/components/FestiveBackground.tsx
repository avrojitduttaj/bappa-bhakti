import React from 'react';

export const FestiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-radial from-[#FFFDF7] via-[#FEF3C7] to-[#FDE68A] opacity-95" />

      {/* Ganesha Warm Golden Silhouette Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-[1px]">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none">
          {/* Crown */}
          <path d="M50 10 L65 35 L35 35 Z" fill="#D97706" />
          {/* Head */}
          <circle cx="50" cy="50" r="22" fill="#F59E0B" />
          {/* Ears */}
          <ellipse cx="25" cy="50" rx="10" ry="15" fill="#F59E0B" />
          <ellipse cx="75" cy="50" rx="10" ry="15" fill="#F59E0B" />
          {/* Trunk */}
          <path d="M50 58 Q62 72 66 82" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
          {/* Tilak */}
          <ellipse cx="50" cy="42" rx="3" ry="6" fill="#DC2626" />
        </svg>
      </div>

      {/* Pulsing Rangoli Mandala Pattern Behind Thali */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] opacity-20 animate-pulse">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#D97706]">
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <path d="M100 10 Q110 30 100 50 Q90 30 100 10 Z" fill="currentColor" opacity="0.6" />
              <circle cx="100" cy="25" r="3" fill="#DC2626" />
            </g>
          ))}
        </svg>
      </div>

      {/* Top Hanging Marigold Toran Garland */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-2 sm:px-6">
        <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 1000 60">
          {/* Vine */}
          <path d="M 0 10 Q 250 40 500 10 Q 750 40 1000 10" stroke="#16A34A" strokeWidth="3" fill="none" />
          {/* Marigold Flowers */}
          {[50, 150, 250, 350, 450, 550, 650, 750, 850, 950].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 25 : 32})`}>
              <circle r="14" fill="#EA580C" className="animate-bounce" style={{ animationDuration: `${2.5 + (i % 3) * 0.5}s` }} />
              <circle r="8" fill="#F59E0B" />
              <circle r="4" fill="#FEF3C7" />
              {/* Green leaf accent */}
              <path d="M-6 -10 Q0 -20 6 -10" stroke="#16A34A" strokeWidth="2.5" fill="none" />
            </g>
          ))}
        </svg>
      </div>

      {/* Left Diya */}
      <div className="absolute top-4 left-3 sm:left-8 flex flex-col items-center">
        {/* Flame */}
        <div className="w-4 h-6 bg-gradient-to-t from-[#EA580C] via-[#F59E0B] to-[#FEF3C7] rounded-full animate-flicker shadow-[0_0_15px_#F59E0B]" />
        {/* Brass Diya Base */}
        <div className="w-8 h-4 bg-[#B45309] rounded-b-full border-t-2 border-[#F59E0B]" />
      </div>

      {/* Right Diya */}
      <div className="absolute top-4 right-3 sm:right-8 flex flex-col items-center">
        <div className="w-4 h-6 bg-gradient-to-t from-[#EA580C] via-[#F59E0B] to-[#FEF3C7] rounded-full animate-flicker shadow-[0_0_15px_#F59E0B]" />
        <div className="w-8 h-4 bg-[#B45309] rounded-b-full border-t-2 border-[#F59E0B]" />
      </div>
    </div>
  );
};
