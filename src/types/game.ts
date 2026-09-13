export type SweetType = "modak" | "laddoo";
export type PlateMode = "modak" | "laddoo" | "mixed";

export type GameStage =
  | "HOME"
  | "MODE_SELECTED"
  | "SESSION_STARTED"
  | "PLATE"
  | "REACHING"
  | "PICKING"
  | "BRINGING_TO_MOUTH"
  | "EATING"
  | "SCORE_UPDATED"
  | "FINISHED"
  | "RESULT";

export interface SweetItem {
  id: string;
  type: SweetType;
  x: number; // percentage (0-100) relative to thali center
  y: number; // percentage (0-100) relative to thali center
  rotation: number;
  scale: number;
  eaten: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SessionStats {
  modaksEaten: number;
  laddoosEaten: number;
  totalEaten: number;
  startTime: number;
  endTime?: number;
  durationMs?: number;
  date: string; // e.g. "13 September 2026"
  achievements: Achievement[];
}

export interface PersonalBest {
  bestTotal: number;
  bestModaks: number;
  bestLaddoos: number;
}

export interface AudioSettings {
  bgm: boolean;
  sfx: boolean;
}
