import React from 'react';
import type { GameStage, PlateMode, SweetItem } from '../types/game';
import { EatingAnimation } from './EatingAnimation';
import { FirstPersonHand } from './FirstPersonHand';
import { ScoreBoard } from './ScoreBoard';
import { Sweet } from './Sweet';
import { Thali } from './Thali';

interface ThaliScreenProps {
  stage: GameStage;
  mode: PlateMode;
  sweets: SweetItem[];
  selectedSweet: SweetItem | null;
  targetCoords: { x: number; y: number };
  modaksEaten: number;
  laddoosEaten: number;
  totalEaten: number;
  durationMs: number;
  onSelectSweet: (sweet: SweetItem, coords: { x: number; y: number }) => void;
  onRefillPlate: (newMode?: PlateMode) => void;
  onFinishEating: () => void;
}

export const ThaliScreen: React.FC<ThaliScreenProps> = ({
  stage,
  sweets,
  selectedSweet,
  targetCoords,
  modaksEaten,
  laddoosEaten,
  totalEaten,
  durationMs,
  onSelectSweet,
  onRefillPlate,
  onFinishEating
}) => {

  const isAnimating = stage !== 'PLATE';
  const allEaten = sweets.length > 0 && sweets.every((s) => s.eaten);

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-between items-center py-6 px-4 z-10 overflow-hidden select-none ${
        stage === 'EATING' ? 'animate-screenShake' : ''
      }`}
    >
      {/* Top HUD ScoreBoard */}
      <ScoreBoard
        modaksEaten={modaksEaten}
        laddoosEaten={laddoosEaten}
        totalEaten={totalEaten}
        durationMs={durationMs}
        onFinish={onFinishEating}
      />

      {/* Main Game Thali Section */}
      <div className="relative my-auto flex flex-col items-center justify-center">
        {/* Instruction Tag */}
        <div className="mb-4 bg-[#FFFDF7]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#F59E0B] shadow text-xs sm:text-sm font-bold text-[#78350F] flex items-center gap-1.5 animate-pulse">
          <span>{allEaten ? 'Plate Empty! Choose below 😋' : 'Tap any sweet to pick up & eat! 😋'}</span>
        </div>

        {/* The Puja Thali */}
        <Thali>
          {sweets.map((sweet) => (
            <Sweet
              key={sweet.id}
              item={sweet}
              isSelected={selectedSweet?.id === sweet.id}
              isDisabled={isAnimating}
              onSelect={onSelectSweet}
            />
          ))}
        </Thali>

        {/* Refill / Sweet Switcher Controls ("Ek aur?" Menu) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-md px-2 z-20">
          <button
            onClick={() => onRefillPlate('modak')}
            disabled={isAnimating}
            className="bg-[#FFFDF7] hover:bg-[#FEF3C7] text-[#78350F] text-xs font-bold px-3 py-2 rounded-xl border border-[#F59E0B] shadow active:scale-95 transition-transform disabled:opacity-50"
          >
            🍡 More Modaks
          </button>

          <button
            onClick={() => onRefillPlate('laddoo')}
            disabled={isAnimating}
            className="bg-[#FFFDF7] hover:bg-[#FEF3C7] text-[#78350F] text-xs font-bold px-3 py-2 rounded-xl border border-[#F59E0B] shadow active:scale-95 transition-transform disabled:opacity-50"
          >
            🟠 More Laddoos
          </button>

          <button
            onClick={() => onRefillPlate('mixed')}
            disabled={isAnimating}
            className="bg-[#FFFDF7] hover:bg-[#FEF3C7] text-[#78350F] text-xs font-bold px-3 py-2 rounded-xl border border-[#F59E0B] shadow active:scale-95 transition-transform disabled:opacity-50"
          >
            🍽️ Mixed Plate
          </button>
        </div>
      </div>

      {/* First Person User Hand Overlay */}
      <FirstPersonHand stage={stage} targetCoords={targetCoords} selectedSweet={selectedSweet} />

      {/* Eating Bite FX & Crumbs Overlay */}
      <EatingAnimation stage={stage} />
    </div>
  );
};
