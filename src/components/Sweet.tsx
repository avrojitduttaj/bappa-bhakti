import React, { useRef } from 'react';
import type { SweetItem } from '../types/game';

import { Laddoo } from './Laddoo';
import { Modak } from './Modak';

interface SweetProps {
  item: SweetItem;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (item: SweetItem, coords: { x: number; y: number }) => void;
}

export const Sweet: React.FC<SweetProps> = ({ item, isSelected, isDisabled, onSelect }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (isDisabled || item.eaten) return;

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const coords = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      onSelect(item, coords);
    } else {
      onSelect(item, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  };

  if (item.eaten && !isSelected) {
    // Show subtle crumb mark on thali where sweet was eaten
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
        style={{ left: `${50 + item.x}%`, top: `${50 + item.y}%` }}
      >
        <div className="w-6 h-6 rounded-full border border-dashed border-[#B45309] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#EA580C]" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      onTouchStart={handleClick}
      className={`absolute cursor-pointer transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 select-none touch-manipulation ${
        isSelected ? 'z-40 scale-125' : 'hover:scale-110 active:scale-95'
      }`}
      style={{
        left: `${50 + item.x}%`,
        top: `${50 + item.y}%`,
        transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${isSelected ? item.scale * 1.25 : item.scale})`,
        opacity: item.eaten && isSelected ? 0 : 1
      }}
    >
      {/* Selected Gold Aura Glow */}
      {isSelected && (
        <div className="absolute inset-0 rounded-full bg-[#F59E0B]/40 blur-md animate-ping pointer-events-none" />
      )}

      {item.type === 'modak' ? <Modak size={68} /> : <Laddoo size={68} />}
    </div>
  );
};
