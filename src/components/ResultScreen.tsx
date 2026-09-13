import React, { useState } from 'react';
import type { PlateMode, SessionStats } from '../types/game';


import { formatTimeScorecard } from '../utils/formatTime';
import { AchievementBadge } from './AchievementBadge';
import { Celebration } from './Celebration';
import { ScoreCardPreview } from './ScoreCardPreview';
import { ShareButtons } from './ShareButtons';

interface ResultScreenProps {
  stats: SessionStats | null;
  isNewBest: boolean;
  onEatAgain: (mode: PlateMode) => void;
  onReturnHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  stats,
  isNewBest,
  onEatAgain,
  onReturnHome
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  if (!stats) return null;

  const durationStr = formatTimeScorecard(stats.durationMs || 0);
  const unlockedAchievements = stats.achievements.filter((a) => a.unlocked);

  const handleCanvasGenerated = (url: string, b: Blob) => {
    setDataUrl(url);
    setBlob(b);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between py-10 px-4 z-10 text-center select-none max-w-xl mx-auto">
      <Celebration />

      {/* Header Banner */}
      <div className="flex flex-col items-center mt-2">
        <span className="bg-[#EA580C] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow border border-[#FCD34D] mb-2 tracking-wide">
          GANPATI BAPPA MORYA! 🙏
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-[#451A03]">
          Arre wah! 😋
        </h1>
        <p className="text-sm sm:text-base font-bold text-[#78350F] mt-1">
          Bappa ka prasad toh pet bhar ke hua! ✨
        </p>

        {isNewBest && (
          <div className="mt-3 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg border border-[#FCD34D] animate-bounce">
            🎉 NEW PERSONAL BEST SCORE RECORD!
          </div>
        )}
      </div>

      {/* Score Breakdown Summary Box */}
      <div className="w-full bg-[#FFFDF7]/90 backdrop-blur-md p-4 rounded-3xl border-2 border-[#F59E0B] shadow-lg my-4 text-[#78350F]">
        <div className="text-3xl sm:text-4xl font-black text-[#EA580C]">
          {stats.totalEaten} Sweets Eaten
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-[#FEF3C7] p-2.5 rounded-2xl border border-[#FCD34D] flex flex-col items-center">
            <span className="text-xs font-bold text-[#78350F]">🥟 Modaks</span>
            <span className="text-2xl font-black text-[#451A03]">{stats.modaksEaten}</span>
          </div>

          <div className="bg-[#FEF3C7] p-2.5 rounded-2xl border border-[#FCD34D] flex flex-col items-center">
            <span className="text-xs font-bold text-[#78350F]">🟠 Laddoos</span>
            <span className="text-2xl font-black text-[#451A03]">{stats.laddoosEaten}</span>
          </div>
        </div>

        <div className="mt-3 text-xs font-bold text-[#78350F] flex items-center justify-center gap-2">
          <span>⏱️ Duration: {durationStr}</span>
          <span>•</span>
          <span>📅 Date: {stats.date}</span>
        </div>
      </div>

      {/* Unlocked Achievements List */}
      {unlockedAchievements.length > 0 && (
        <div className="w-full my-2">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#991B1B] mb-2">
            🏆 Achievements Unlocked
          </h3>
          <div className="flex flex-col gap-2">
            {unlockedAchievements.map((ach) => (
              <AchievementBadge key={ach.id} achievement={ach} />
            ))}
          </div>
        </div>
      )}

      {/* Generated Canvas 1080x1350 Scorecard Preview */}
      <ScoreCardPreview
        stats={stats}
        isNewBest={isNewBest}
        onCanvasGenerated={handleCanvasGenerated}
      />

      {/* Action Buttons: Download, Share, Copy */}
      <ShareButtons dataUrl={dataUrl} blob={blob} stats={stats} />

      {/* Eat Again / Return Home Actions */}
      <div className="flex items-center gap-3 w-full max-w-md my-4">
        <button
          onClick={() => onEatAgain('mixed')}
          className="flex-1 bg-gradient-to-r from-[#EA580C] via-[#F59E0B] to-[#EA580C] hover:from-[#C2410C] hover:to-[#D97706] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg border-2 border-[#FCD34D] transition-transform active:scale-95 text-sm sm:text-base flex items-center justify-center gap-1.5"
        >
          <span>Eat Again! 🍽️</span>
        </button>

        <button
          onClick={onReturnHome}
          className="bg-[#FFFDF7] hover:bg-[#FEF3C7] text-[#78350F] font-bold py-3.5 px-4 rounded-2xl border-2 border-[#F59E0B] shadow-sm active:scale-95 transition-transform text-xs sm:text-sm"
        >
          Home 🏠
        </button>
      </div>
    </div>
  );
};
