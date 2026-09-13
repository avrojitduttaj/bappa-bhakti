import type { GameStage, SweetItem } from '../types/game';

import { Laddoo } from './Laddoo';
import { Modak } from './Modak';

interface FirstPersonHandProps {
  stage: GameStage;
  targetCoords: { x: number; y: number };
  selectedSweet: SweetItem | null;
}

export const FirstPersonHand: React.FC<FirstPersonHandProps> = ({
  stage,
  targetCoords,
  selectedSweet
}) => {
  if (stage === 'HOME' || stage === 'PLATE' || stage === 'FINISHED' || stage === 'RESULT') {
    return null;
  }

  const isReaching = stage === 'REACHING';
  const isPicking = stage === 'PICKING';
  const isBringingToMouth = stage === 'BRINGING_TO_MOUTH';
  const isEating = stage === 'EATING';

  // Compute screen coordinates
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  // Resting position (bottom right offscreen)
  const restX = screenWidth / 2 + 80;
  const restY = screenHeight + 200;

  // Mouth/camera POV position (foreground bottom center)
  const mouthX = screenWidth / 2;
  const mouthY = screenHeight - 60;

  let currentX = restX;
  let currentY = restY;
  let scale = 1;
  let rotation = 0;

  if (isReaching) {
    currentX = targetCoords.x;
    currentY = targetCoords.y + 20; // Hand approaching sweet from slightly below
    scale = 1.1;
    rotation = -10;
  } else if (isPicking) {
    currentX = targetCoords.x;
    currentY = targetCoords.y;
    scale = 1.15;
    rotation = -5;
  } else if (isBringingToMouth || isEating) {
    currentX = mouthX;
    currentY = mouthY;
    scale = 3.2; // Dramatic POV scale up towards mouth
    rotation = 0;
  }

  const holdsSweet = (isPicking || isBringingToMouth) && selectedSweet;

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-500 ease-out transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${currentX}px`,
        top: `${currentY}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`
      }}
    >
      {/* User's Hand Vector Container */}
      <div className="relative flex flex-col items-center">
        {/* Sweet attached in fingers during pickup and bringing to mouth */}
        {holdsSweet && selectedSweet && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-300">
            {selectedSweet.type === 'modak' ? <Modak size={54} showSteam={false} /> : <Laddoo size={54} />}
          </div>
        )}

        {/* Hand & Arm SVG (First Person Right Hand looking down) */}
        <svg width="180" height="320" viewBox="0 0 180 320" fill="none" className="drop-shadow-2xl">
          <defs>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D0A9" />
              <stop offset="60%" stopColor="#E0AC69" />
              <stop offset="100%" stopColor="#C68642" />
            </linearGradient>
            <linearGradient id="mauliGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>

          {/* Forearm extending down */}
          <path
            d="M 50 180 L 40 320 L 140 320 L 130 180 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Mauli Sacred Red/Gold Thread on Wrist */}
          <rect x="42" y="220" width="96" height="14" rx="4" fill="url(#mauliGrad)" stroke="#78350F" strokeWidth="1" />
          <rect x="44" y="238" width="92" height="6" rx="2" fill="#F59E0B" />

          {/* Palm Base */}
          <ellipse cx="90" cy="140" rx="48" ry="45" fill="url(#skinGrad)" stroke="#B45309" strokeWidth="1.5" />

          {/* Thumb */}
          <path
            d="M 42 140 Q 20 110 32 85 Q 48 85 54 115 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Index Finger */}
          <path
            d="M 58 105 Q 60 45 74 45 Q 85 45 82 105 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Middle Finger */}
          <path
            d="M 82 100 Q 86 35 100 35 Q 112 35 106 100 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Ring Finger */}
          <path
            d="M 106 105 Q 112 48 124 50 Q 132 50 126 108 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Pinky Finger */}
          <path
            d="M 126 120 Q 138 75 146 80 Q 152 82 142 128 Z"
            fill="url(#skinGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};
