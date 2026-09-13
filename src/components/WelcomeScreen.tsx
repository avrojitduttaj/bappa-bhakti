import React, { useState } from 'react';
import type { PersonalBest, PlateMode } from '../types/game';

import { SweetSelector } from './SweetSelector';

interface WelcomeScreenProps {
  personalBest: PersonalBest;
  onStartSession: (mode: PlateMode) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ personalBest, onStartSession }) => {
  const [selectedMode, setSelectedMode] = useState<PlateMode>('mixed');

  const handleStart = () => {
    onStartSession(selectedMode);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-12 px-4 z-10 text-center select-none">
      {/* Top Header Badge */}
      <div className="flex flex-col items-center animate-fade-in mt-4">
        <span className="inline-block bg-linear-to-r from-[#DC2626] to-[#EA580C] text-white font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg border border-[#FCD34D] tracking-wide mb-3">
          GANPATI BAPPA MORYA! 🙏
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#451A03] drop-shadow-sm tracking-tight">
          Bappa, aaj kya khayenge?
        </h1>
        <p className="text-sm sm:text-lg font-bold text-[#78350F] mt-2 max-w-md">
          Choose your prasad, sit before the thali, and let's eat 😋
        </p>
      </div>

      {/* Middle Prasad Selection Cards */}
      <div className="w-full my-6">
        <SweetSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />
      </div>

      {/* Bottom Action Area & Personal Best Tracker */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm mb-6">
        {/* Let's Eat Button */}
        <button
          onClick={handleStart}
          className="w-full bg-linear-to-r from-[#EA580C] via-[#F59E0B] to-[#EA580C] hover:from-[#C2410C] hover:to-[#D97706] text-white text-lg sm:text-xl font-black py-4 px-8 rounded-2xl shadow-xl border-2 border-[#FCD34D] transition-transform active:scale-95 flex items-center justify-center gap-2 group"
        >
          <span>Let's Eat! 🙏</span>
          <span className="group-hover:translate-x-1 transition-transform">➔</span>
        </button>

        {/* Personal Best Display */}
        {personalBest.bestTotal > 0 ? (
          <div className="bg-[#FFFDF7]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#F59E0B] text-xs sm:text-sm font-bold text-[#78350F] shadow-sm flex items-center gap-2">
            <span>🏆 Personal Best:</span>
            <span className="text-[#EA580C] font-extrabold">{personalBest.bestTotal} Sweets</span>
            <span className="text-gray-400">({personalBest.bestModaks} Modaks, {personalBest.bestLaddoos} Laddoos)</span>
          </div>
        ) : (
          <div className="text-xs font-bold text-[#78350F]/70">
            Tap any sweet above or click "Let's Eat!" to start 🍡
          </div>
        )}
      </div>
    </div>
  );
};
