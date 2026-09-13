import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const Celebration: React.FC = () => {
  useEffect(() => {
    // Festive Marigold Orange & Gold Confetti Burst
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF9933', '#F59E0B', '#DC2626']
    });

    fire(0.2, {
      spread: 60,
      colors: ['#FFFDF7', '#FCD34D', '#EA580C']
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#16A34A', '#F59E0B', '#DC2626']
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#FF9933', '#FFFDF7', '#D97706']
    });
  }, []);

  return null;
};
