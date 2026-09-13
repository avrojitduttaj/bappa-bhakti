import React, { useEffect, useState } from 'react';
import { FestiveBackground } from './components/FestiveBackground';
import { MusicController } from './components/MusicController';
import { ResultScreen } from './components/ResultScreen';
import { ThaliScreen } from './components/ThaliScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useAudio } from './hooks/useAudio';
import { useGameSession } from './hooks/useGameSession';
import type { PlateMode, SweetItem } from './types/game';

import { parseSharedURLParams } from './utils/share';

export const App: React.FC = () => {
  const {
    settings,
    toggleBgm,
    toggleSfx,
    initAudioOnInteraction,
    playSelect,
    playPickup,
    playMunch,
    playCelebration
  } = useAudio();

  const {
    stage,
    mode,
    modaksEaten,
    laddoosEaten,
    totalEaten,
    durationMs,
    sweets,
    selectedSweet,
    targetCoords,
    personalBest,
    isNewBest,
    lastStats,
    startSession,
    refillPlate,
    selectSweet,
    finishEating,
    returnHome
  } = useGameSession();

  const [sharedChallenge, setSharedChallenge] = useState<{
    modaks: number;
    laddoos: number;
    total: number;
  } | null>(null);

  // Check for shared URL parameters on mount
  useEffect(() => {
    const params = parseSharedURLParams();
    if (params && params.total > 0) {
      setSharedChallenge(params);
    }
  }, []);

  const handleStartSession = (selectedMode: PlateMode) => {
    initAudioOnInteraction();
    startSession(selectedMode);
  };

  const handleSelectSweet = (sweet: SweetItem, coords: { x: number; y: number }) => {
    initAudioOnInteraction();
    playSelect();

    selectSweet(sweet, coords, (phase) => {
      if (phase === 'PICKING') {
        playPickup();
      } else if (phase === 'EATING') {
        playMunch();
      }
    });
  };

  const handleFinishEating = () => {
    const stats = finishEating();
    if (stats) {
      playCelebration();
    }
  };

  return (
    <div
      onClick={initAudioOnInteraction}
      onTouchStart={initAudioOnInteraction}
      className="relative min-h-screen w-full bg-[#FFFDF7] text-[#451A03] font-sans overflow-x-hidden antialiased select-none"
    >
      {/* Festive Background (Toran, Diyas, Pulsing Rangoli, Ganesha silhouette) */}
      <FestiveBackground />

      {/* Floating Audio Controls */}
      <MusicController settings={settings} onToggleBgm={toggleBgm} onToggleSfx={toggleSfx} />

      {/* Shared Challenge Banner if opened via friend's link */}
      {stage === 'HOME' && sharedChallenge && (
        <div className="fixed top-16 inset-x-4 z-40 max-w-md mx-auto bg-linear-to-r from-[#EA580C] to-[#F59E0B] text-white p-3 rounded-2xl shadow-xl border-2 border-[#FCD34D] flex items-center justify-between text-xs sm:text-sm font-bold animate-bounce">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span>Friend's Challenge: Ate {sharedChallenge.total} sweets ({sharedChallenge.modaks} Modaks, {sharedChallenge.laddoos} Laddoos)!</span>
          </div>
          <button
            onClick={() => setSharedChallenge(null)}
            className="text-white/80 hover:text-white font-extrabold px-1.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* App Views Lifecycle */}
      <main className="relative z-10">
        {stage === 'HOME' && (
          <WelcomeScreen personalBest={personalBest} onStartSession={handleStartSession} />
        )}

        {(stage === 'SESSION_STARTED' ||
          stage === 'PLATE' ||
          stage === 'REACHING' ||
          stage === 'PICKING' ||
          stage === 'BRINGING_TO_MOUTH' ||
          stage === 'EATING' ||
          stage === 'SCORE_UPDATED') && (
          <ThaliScreen
            stage={stage}
            mode={mode}
            sweets={sweets}
            selectedSweet={selectedSweet}
            targetCoords={targetCoords}
            modaksEaten={modaksEaten}
            laddoosEaten={laddoosEaten}
            totalEaten={totalEaten}
            durationMs={durationMs}
            onSelectSweet={handleSelectSweet}
            onRefillPlate={refillPlate}
            onFinishEating={handleFinishEating}
          />
        )}

        {(stage === 'FINISHED' || stage === 'RESULT') && (
          <ResultScreen
            stats={lastStats}
            isNewBest={isNewBest}
            onEatAgain={handleStartSession}
            onReturnHome={returnHome}
          />
        )}
      </main>
    </div>
  );
};

export default App;
