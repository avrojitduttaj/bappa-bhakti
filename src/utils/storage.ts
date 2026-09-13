import type { AudioSettings, PersonalBest, SessionStats } from '../types/game';


const KEYS = {
  PERSONAL_BEST: 'bappa_personal_best',
  AUDIO_SETTINGS: 'bappa_audio_settings',
  ACHIEVEMENTS: 'bappa_unlocked_achievements',
  PREVIOUS_SESSION: 'bappa_previous_session'
};

export const DEFAULT_PERSONAL_BEST: PersonalBest = {
  bestTotal: 0,
  bestModaks: 0,
  bestLaddoos: 0
};

export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  bgm: true,
  sfx: true
};

export function getPersonalBest(): PersonalBest {
  try {
    const raw = localStorage.getItem(KEYS.PERSONAL_BEST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore storage errors
  }
  return DEFAULT_PERSONAL_BEST;
}

export function updatePersonalBest(session: SessionStats): { isNewBest: boolean; best: PersonalBest } {
  const current = getPersonalBest();
  let isNewBest = false;

  const newBest: PersonalBest = {
    bestTotal: Math.max(current.bestTotal, session.totalEaten),
    bestModaks: Math.max(current.bestModaks, session.modaksEaten),
    bestLaddoos: Math.max(current.bestLaddoos, session.laddoosEaten)
  };

  if (session.totalEaten > current.bestTotal && session.totalEaten > 0) {
    isNewBest = true;
  }

  try {
    localStorage.setItem(KEYS.PERSONAL_BEST, JSON.stringify(newBest));
  } catch {
    // Ignore
  }

  return { isNewBest, best: newBest };
}

export function getAudioSettings(): AudioSettings {
  try {
    const raw = localStorage.getItem(KEYS.AUDIO_SETTINGS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore
  }
  return DEFAULT_AUDIO_SETTINGS;
}

export function saveAudioSettings(settings: AudioSettings): void {
  try {
    localStorage.setItem(KEYS.AUDIO_SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function getUnlockedAchievementIds(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.ACHIEVEMENTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore
  }
  return [];
}

export function saveUnlockedAchievementIds(ids: string[]): void {
  try {
    localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(ids));
  } catch {
    // Ignore
  }
}

export function savePreviousSession(session: SessionStats): void {
  try {
    localStorage.setItem(KEYS.PREVIOUS_SESSION, JSON.stringify(session));
  } catch {
    // Ignore
  }
}

export function getPreviousSession(): SessionStats | null {
  try {
    const raw = localStorage.getItem(KEYS.PREVIOUS_SESSION);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore
  }
  return null;
}
