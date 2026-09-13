import React, { useEffect, useState } from 'react';
import type { SessionStats } from '../types/game';

import { generateScoreCardCanvas } from '../utils/scoreCardCanvas';

interface ScoreCardPreviewProps {
  stats: SessionStats;
  isNewBest: boolean;
  onCanvasGenerated: (dataUrl: string, blob: Blob) => void;
}

export const ScoreCardPreview: React.FC<ScoreCardPreviewProps> = ({
  stats,
  isNewBest,
  onCanvasGenerated
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function renderCanvas() {
      try {
        setLoading(true);
        const { dataUrl: url, blob } = await generateScoreCardCanvas(stats, isNewBest);
        if (isMounted) {
          setDataUrl(url);
          onCanvasGenerated(url, blob);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) setLoading(false);
      }
    }

    renderCanvas();

    return () => {
      isMounted = false;
    };
  }, [stats, isNewBest]);

  return (
    <div className="w-full max-w-sm mx-auto my-4 select-none">
      {loading ? (
        <div className="w-full aspect-[4/5] rounded-3xl bg-[#FEF3C7] border-2 border-dashed border-[#F59E0B] flex flex-col items-center justify-center p-6 text-center animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-[#EA580C] border-t-transparent animate-spin mb-3" />
          <span className="text-sm font-bold text-[#78350F]">Generating Digital Scorecard PNG...</span>
        </div>
      ) : dataUrl ? (
        <div className="group relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FCD34D] bg-[#FFFDF7] transform transition-transform hover:scale-[1.02]">
          <img src={dataUrl} alt="Ganpati Prasad Scorecard" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
            <span className="text-white text-xs font-bold bg-[#EA580C] px-3 py-1 rounded-full shadow">
              1080 × 1350 High-Res PNG
            </span>
          </div>
        </div>
      ) : (
        <div className="text-xs text-red-600 font-bold">Could not render scorecard preview</div>
      )}
    </div>
  );
};
