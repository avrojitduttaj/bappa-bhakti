import React, { useState } from 'react';
import type { SessionStats } from '../types/game';
import { copyScoreToClipboard, downloadScoreCardPNG, shareScoreCard } from '../utils/share';
import { IconCheck, IconCopy, IconDownload, IconShare2 } from './Icons';

interface ShareButtonsProps {
  dataUrl: string | null;
  blob: Blob | null;
  stats: SessionStats;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ dataUrl, blob, stats }) => {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleDownload = () => {
    if (dataUrl) {
      downloadScoreCardPNG(dataUrl, stats.date);
    }
  };

  const handleShare = async () => {
    if (!blob) return;
    setSharing(true);
    await shareScoreCard(blob, stats);
    setSharing(false);
  };

  const handleCopy = async () => {
    const success = await copyScoreToClipboard(stats);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 max-w-md mx-auto select-none">
      {/* Primary Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Download Scorecard PNG */}
        <button
          onClick={handleDownload}
          disabled={!dataUrl}
          className="w-full bg-gradient-to-r from-[#EA580C] to-[#F59E0B] hover:from-[#C2410C] hover:to-[#D97706] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg border-2 border-[#FCD34D] transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
        >
          <IconDownload size={18} />
          <span>Download Scorecard</span>
        </button>

        {/* Share via Web Share API */}
        <button
          onClick={handleShare}
          disabled={!blob || sharing}
          className="w-full bg-gradient-to-r from-[#DC2626] to-[#EA580C] hover:from-[#B91C1C] hover:to-[#C2410C] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-lg border-2 border-[#FCD34D] transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
        >
          <IconShare2 size={18} />
          <span>{sharing ? 'Sharing...' : 'Share My Score'}</span>
        </button>
      </div>

      {/* Copy Text Button */}
      <button
        onClick={handleCopy}
        className="w-full bg-[#FFFDF7] hover:bg-[#FEF3C7] text-[#78350F] font-bold py-2.5 px-4 rounded-xl border-2 border-[#F59E0B] shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2 text-xs sm:text-sm"
      >
        {copied ? <IconCheck size={16} className="text-green-600" /> : <IconCopy size={16} />}
        <span>{copied ? 'Score Copied to Clipboard! 🎉' : 'Copy Score Text'}</span>
      </button>
    </div>
  );
};
