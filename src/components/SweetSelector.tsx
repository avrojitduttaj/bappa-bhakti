import React from 'react';
import type { PlateMode } from '../types/game';

import { Laddoo } from './Laddoo';
import { Modak } from './Modak';

interface SweetSelectorProps {
  selectedMode: PlateMode;
  onSelectMode: (mode: PlateMode) => void;
}

export const SweetSelector: React.FC<SweetSelectorProps> = ({ selectedMode, onSelectMode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full max-w-2xl mx-auto px-4 select-none">
      {/* Card 1: Modak */}
      <div
        onClick={() => onSelectMode('modak')}
        className={`group relative flex flex-col items-center p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 border-3 ${
          selectedMode === 'modak'
            ? 'bg-linear-to-b from-[#FFFDF7] to-[#FEF3C7] border-[#EA580C] shadow-xl scale-105 shadow-[#EA580C]/20'
            : 'bg-[#FFFDF7]/80 hover:bg-[#FFFDF7] border-[#FCD34D] hover:border-[#F59E0B] shadow-md hover:scale-102'
        }`}
      >
        {selectedMode === 'modak' && (
          <div className="absolute -top-3 bg-[#EA580C] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow border border-[#FCD34D]">
            SELECTED
          </div>
        )}
        <div className="my-2 group-hover:scale-110 transition-transform duration-300">
          <Modak size={72} />
        </div>
        <h3 className="font-extrabold text-[#451A03] text-base sm:text-lg mt-1">🥟 Modak</h3>
        <p className="text-xs font-semibold text-[#78350F] text-center mt-0.5">Bappa's Favourite</p>
      </div>

      {/* Card 2: Laddoo */}
      <div
        onClick={() => onSelectMode('laddoo')}
        className={`group relative flex flex-col items-center p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 border-3 ${
          selectedMode === 'laddoo'
            ? 'bg-linear-to-b from-[#FFFDF7] to-[#FEF3C7] border-[#D97706] shadow-xl scale-105 shadow-[#D97706]/20'
            : 'bg-[#FFFDF7]/80 hover:bg-[#FFFDF7] border-[#FCD34D] hover:border-[#F59E0B] shadow-md hover:scale-102'
        }`}
      >
        {selectedMode === 'laddoo' && (
          <div className="absolute -top-3 bg-[#D97706] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow border border-[#FCD34D]">
            SELECTED
          </div>
        )}
        <div className="my-2 group-hover:scale-110 transition-transform duration-300">
          <Laddoo size={72} />
        </div>
        <h3 className="font-extrabold text-[#451A03] text-base sm:text-lg mt-1">🟠 Laddoo</h3>
        <p className="text-xs font-semibold text-[#78350F] text-center mt-0.5">Round, Sweet & Irresistible</p>
      </div>

      {/* Card 3: Mixed Plate */}
      <div
        onClick={() => onSelectMode('mixed')}
        className={`group relative flex flex-col items-center p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 border-3 ${
          selectedMode === 'mixed'
            ? 'bg-linear-to-b from-[#FFFDF7] to-[#FEF3C7] border-[#DC2626] shadow-xl scale-105 shadow-[#DC2626]/20'
            : 'bg-[#FFFDF7]/80 hover:bg-[#FFFDF7] border-[#FCD34D] hover:border-[#F59E0B] shadow-md hover:scale-102'
        }`}
      >
        {selectedMode === 'mixed' && (
          <div className="absolute -top-3 bg-[#DC2626] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow border border-[#FCD34D]">
            SELECTED
          </div>
        )}
        <div className="my-2 flex items-center justify-center -space-x-4 group-hover:scale-110 transition-transform duration-300">
          <Modak size={56} showSteam={false} />
          <Laddoo size={56} />
        </div>
        <h3 className="font-extrabold text-[#451A03] text-base sm:text-lg mt-1">🍽️ Mixed Plate</h3>
        <p className="text-xs font-semibold text-[#78350F] text-center mt-0.5">Best of Both Prasad</p>
      </div>
    </div>
  );
};
