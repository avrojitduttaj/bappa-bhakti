import React from 'react';
import type { AudioSettings } from '../types/game';
import { IconBell, IconBellOff, IconVolume2, IconVolumeX } from './Icons';

interface MusicControllerProps {
  settings: AudioSettings;
  onToggleBgm: () => void;
  onToggleSfx: () => void;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  settings,
  onToggleBgm,
  onToggleSfx
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[#FFFDF7]/90 backdrop-blur-md px-3 py-2 rounded-full border-2 border-[#F59E0B] shadow-lg text-[#78350F]">
      {/* BGM Toggle Button */}
      <button
        onClick={onToggleBgm}
        className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
          settings.bgm
            ? 'bg-[#EA580C] text-white shadow'
            : 'bg-[#FEF3C7] text-[#78350F] hover:bg-[#FDE68A]'
        }`}
        title="Toggle Devotional Music"
      >
        {settings.bgm ? <IconVolume2 size={14} /> : <IconVolumeX size={14} />}
        <span>Music {settings.bgm ? 'ON' : 'OFF'}</span>
      </button>

      {/* SFX Toggle Button */}
      <button
        onClick={onToggleSfx}
        className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all ${
          settings.sfx
            ? 'bg-[#D97706] text-white shadow'
            : 'bg-[#FEF3C7] text-[#78350F] hover:bg-[#FDE68A]'
        }`}
        title="Toggle Sound Effects"
      >
        {settings.sfx ? <IconBell size={14} /> : <IconBellOff size={14} />}
        <span>SFX</span>
      </button>
    </div>
  );
};
