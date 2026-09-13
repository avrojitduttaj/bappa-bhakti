import React from 'react';

interface ThaliProps {
  children: React.ReactNode;
}

export const Thali: React.FC<ThaliProps> = ({ children }) => {
  return (
    <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] mx-auto select-none">
      {/* Outer Metallic Brass Rim Drop Shadow */}
      <div className="absolute inset-0 rounded-full bg-[#451A03]/30 blur-xl translate-y-6" />

      {/* Brass Metallic Outer Plate */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#B45309] to-[#78350F] p-3 sm:p-4 shadow-2xl border-4 border-[#FCD34D]">
        {/* Inner Engraved Rim */}
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#78350F] via-[#B45309] to-[#F59E0B] p-2 sm:p-3 shadow-inner">
          {/* Main Thali Surface */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#F59E0B]/30 relative overflow-hidden border border-[#D97706]/40 shadow-inner">
            {/* Subtle Metallic Radial Highlight */}
            <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-black/10 pointer-events-none" />

            {/* Traditional Banana / Mango Leaf Base Accent */}
            <div className="absolute inset-4 rounded-full bg-emerald-800/10 border border-emerald-600/20 pointer-events-none" />

            {/* Sweets Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
