import React from 'react';
import { formatTimeHUD } from '../utils/formatTime';
import { IconTimer } from './Icons';

interface SessionTimerProps {
  durationMs: number;
}

export const SessionTimer: React.FC<SessionTimerProps> = ({ durationMs }) => {
  return (
    <div className="flex items-center gap-1.5 bg-[#FFFDF7]/90 backdrop-blur-md px-3 py-1.5 rounded-full border-2 border-[#F59E0B] shadow text-[#78350F] font-bold text-sm select-none">
      <IconTimer size={16} className="text-[#EA580C] animate-pulse" />
      <span>{formatTimeHUD(durationMs)}</span>
    </div>
  );
};
