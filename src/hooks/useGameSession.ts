import { useCallback, useEffect, useState } from 'react';
import { evaluateAchievements } from '../data/achievements';
import { generateThaliSweets } from '../data/sweets';
import type { GameStage, PersonalBest, PlateMode, SessionStats, SweetItem } from '../types/game';
import { getFormattedDate } from '../utils/formatTime';
import { getPersonalBest, getUnlockedAchievementIds, saveUnlockedAchievementIds, updatePersonalBest } from '../utils/storage';

export function useGameSession() {
  const [stage, setStage] = useState<GameStage>('HOME');
  const [mode, setMode] = useState<PlateMode>('mixed');

  // Stats
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(0);
  const [modaksEaten, setModaksEaten] = useState<number>(0);
  const [laddoosEaten, setLaddoosEaten] = useState<number>(0);
  const [totalEaten, setTotalEaten] = useState<number>(0);

  // Thali & Animation State
  const [sweets, setSweets] = useState<SweetItem[]>([]);
  const [selectedSweet, setSelectedSweet] = useState<SweetItem | null>(null);
  const [targetCoords, setTargetCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Persistence State
  const [personalBest, setPersonalBest] = useState<PersonalBest>(getPersonalBest);
  const [isNewBest, setIsNewBest] = useState<boolean>(false);
  const [lastStats, setLastStats] = useState<SessionStats | null>(null);

  // Live Timer Ticker
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | undefined;
    if (stage !== 'HOME' && stage !== 'FINISHED' && stage !== 'RESULT' && sessionStartTime > 0) {
      timerId = setInterval(() => {
        setDurationMs(Date.now() - sessionStartTime);
      }, 500);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [stage, sessionStartTime]);

  // Start a brand new eating session
  const startSession = useCallback((selectedMode: PlateMode) => {
    const now = Date.now();
    setMode(selectedMode);
    setSessionStartTime(now);
    setDurationMs(0);
    setModaksEaten(0);
    setLaddoosEaten(0);
    setTotalEaten(0);
    setSelectedSweet(null);
    setIsNewBest(false);

    const initialSweets = generateThaliSweets(selectedMode);
    setSweets(initialSweets);

    setStage('SESSION_STARTED');
    setTimeout(() => {
      setStage('PLATE');
    }, 100);
  }, []);

  // Refill thali sweets (allows switching mode mid-session without resetting total score)
  const refillPlate = useCallback((newMode?: PlateMode) => {
    const targetMode = newMode || mode;
    setMode(targetMode);
    const newSweets = generateThaliSweets(targetMode);
    setSweets(newSweets);
    setSelectedSweet(null);
    setStage('PLATE');
  }, [mode]);

  // Select sweet and launch first-person feeding animation pipeline
  const handleSelectSweet = useCallback(
    (sweet: SweetItem, coords: { x: number; y: number }, onPhaseComplete?: (phase: string) => void) => {
      if (stage !== 'PLATE' || sweet.eaten) return;

      setSelectedSweet(sweet);
      setTargetCoords(coords);

      // Phase 1: REACHING
      setStage('REACHING');
      if (onPhaseComplete) onPhaseComplete('REACHING');

      // Phase 2: PICKING (Hand reaches target)
      setTimeout(() => {
        setStage('PICKING');
        if (onPhaseComplete) onPhaseComplete('PICKING');
      }, 400);

      // Phase 3: BRINGING_TO_MOUTH (Hand grips and lifts sweet toward mouth/camera)
      setTimeout(() => {
        setStage('BRINGING_TO_MOUTH');
        if (onPhaseComplete) onPhaseComplete('BRINGING_TO_MOUTH');
      }, 800);

      // Phase 4: EATING (Foreground zoom, munch SFX, crumb particles)
      setTimeout(() => {
        setStage('EATING');
        if (onPhaseComplete) onPhaseComplete('EATING');
      }, 1400);

      // Phase 5: SCORE_UPDATED (Sweet disappears, score increments)
      setTimeout(() => {
        if (sweet.type === 'modak') {
          setModaksEaten((prev) => prev + 1);
        } else {
          setLaddoosEaten((prev) => prev + 1);
        }
        setTotalEaten((prev) => prev + 1);

        setSweets((prevSweets) =>
          prevSweets.map((s) => (s.id === sweet.id ? { ...s, eaten: true } : s))
        );

        setStage('SCORE_UPDATED');
        if (onPhaseComplete) onPhaseComplete('SCORE_UPDATED');
      }, 1900);

      // Return to PLATE
      setTimeout(() => {
        setSelectedSweet(null);
        setStage('PLATE');
      }, 2400);
    },
    [stage]
  );

  // Finish session, freeze stats, calculate achievements & personal best
  const finishEating = useCallback(() => {
    const endTime = Date.now();
    const finalDuration = endTime - sessionStartTime;

    setDurationMs(finalDuration);

    const prevUnlocked = getUnlockedAchievementIds();
    const statsUnchecked: SessionStats = {
      modaksEaten,
      laddoosEaten,
      totalEaten,
      startTime: sessionStartTime,
      endTime,
      durationMs: finalDuration,
      date: getFormattedDate(endTime),
      achievements: []
    };

    const achievements = evaluateAchievements(statsUnchecked, prevUnlocked);
    const newlyUnlockedIds = achievements.filter((a) => a.unlocked).map((a) => a.id);
    saveUnlockedAchievementIds(newlyUnlockedIds);

    const finalStats: SessionStats = {
      ...statsUnchecked,
      achievements
    };

    setLastStats(finalStats);

    const { isNewBest: newBestAchieved, best } = updatePersonalBest(finalStats);
    setIsNewBest(newBestAchieved);
    setPersonalBest(best);

    setStage('FINISHED');
    setTimeout(() => {
      setStage('RESULT');
    }, 400);

    return finalStats;
  }, [sessionStartTime, modaksEaten, laddoosEaten, totalEaten]);

  const returnHome = useCallback(() => {
    setStage('HOME');
  }, []);

  return {
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
    selectSweet: handleSelectSweet,
    finishEating,
    returnHome
  };
}
