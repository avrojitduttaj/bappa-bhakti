import React from 'react';
import { SessionTimer } from './SessionTimer';

interface ScoreBoardProps {
  modaksEaten: number;
  laddoosEaten: number;
  totalEaten: number;
  durationMs: number;
  onFinish: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  modaksEaten,
  laddoosEaten,
  totalEaten,
  durationMs,
  onFinish
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col gap-2 z-20 select-none">
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between gap-2">
        <SessionTimer durationMs={durationMs} />

        <button
          onClick={onFinish}
          className="bg-gradient-to-r from-[#DC2626] to-[#EA580C] hover:from-[#B91C1C] hover:to-[#C2410C] text-white font-extrabold px-4 py-1.5 rounded-full shadow-lg border border-[#FCD34D] transition-transform active:scale-95 text-xs sm:text-sm flex items-center gap-1"
        >
          <span>Finish Eating 🏆</span>
        </button>
      </div>

      {/* Live Counters Grid */}
      <div className="grid grid-cols-3 gap-2 bg-[#FFFDF7]/90 backdrop-blur-md p-2.5 rounded-2xl border-2 border-[#F59E0B] shadow-lg text-[#78350F]">
        {/* Modak Counter */}
        <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#FEF3C7]/60 border border-[#FCD34D]">
          <div className="flex items-center gap-1 text-xs font-bold text-[#EA580C]">
            <span>🥟 Modaks</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#451A03] animate-scoreBounce">
            {modaksEaten.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Laddoo Counter */}
        <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-[#FEF3C7]/60 border border-[#FCD34D]">
          <div className="flex items-center gap-1 text-xs font-bold text-[#D97706]">
            <span>🟠 Laddoos</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#451A03] animate-scoreBounce">
            {laddoosEaten.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Total Counter */}
        <div className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#EA580C] text-white shadow">
          <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide">
            ❤️ Total
          </div>
          <span className="text-xl sm:text-2xl font-black drop-shadow">
            {totalEaten.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
};
