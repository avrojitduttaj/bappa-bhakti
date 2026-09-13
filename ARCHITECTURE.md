# Architecture & System Design 🏗️

## 1. Technology Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Keyframes
- **Animation**: Motion / Framer Motion + Canvas Confetti
- **Audio Engine**: Web Audio API Sound Synthesizer + HTML5 Audio fallback
- **Scorecard Generator**: Standalone HTML5 Canvas API (1080×1350 resolution PNG)
- **Persistence**: Browser `localStorage`
- **Sharing**: Web Share API + Clipboard + Query Parameters

---

## 2. Type System (`src/types/game.ts`)

```typescript
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
  x: number; // percentage offset (0-100)
  y: number; // percentage offset (0-100)
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
  date: string;
  achievements: Achievement[];
}

export interface PersonalBest {
  bestTotal: number;
  bestModaks: number;
  bestLaddoos: number;
}
```

---

## 3. Directory Layout

```text
src/
├── assets/
│   ├── ganpati/         # Ganesha vector graphics & silhouettes
│   ├── sweets/          # Custom SVG Modak & Laddoo vector assets
│   ├── hand/            # Clean 1st-person right hand SVG asset
│   └── decorations/     # Marigold toran, diyas, rangoli mandalas
├── components/
│   ├── WelcomeScreen.tsx
│   ├── FestiveBackground.tsx
│   ├── SweetSelector.tsx
│   ├── ThaliScreen.tsx
│   ├── Thali.tsx
│   ├── Sweet.tsx
│   ├── Modak.tsx
│   ├── Laddoo.tsx
│   ├── FirstPersonHand.tsx
│   ├── EatingAnimation.tsx
│   ├── ScoreBoard.tsx
│   ├── SessionTimer.tsx
│   ├── MusicController.tsx
│   ├── Celebration.tsx
│   ├── ResultScreen.tsx
│   ├── ScoreCardPreview.tsx
│   ├── AchievementBadge.tsx
│   └── ShareButtons.tsx
├── hooks/
│   ├── useGameSession.ts
│   ├── useAudio.ts
│   ├── useLocalStorage.ts
│   └── useSweetInteraction.ts
├── data/
│   ├── sweets.ts
│   └── achievements.ts
├── types/
│   └── game.ts
├── utils/
│   ├── audio.ts
│   ├── scoreCardCanvas.ts
│   ├── share.ts
│   ├── formatTime.ts
│   └── storage.ts
├── App.tsx
├── index.css
└── main.tsx
```

---

## 4. State Machine Transition Flow

```
[ HOME ]
   │ Mode Choice
   ▼
[ MODE_SELECTED ] 
   │ Click "Let's Eat!"
   ▼
[ SESSION_STARTED ] ──► Set startTime, reset session counters ──► [ PLATE ]
                                                                      │
                                                           Tap Sweet  │
                                                                      ▼
                                                                [ REACHING ]
                                                                      │ Hand moves to target
                                                                      ▼
                                                                [ PICKING ]
                                                                      │ Grip & lift
                                                                      ▼
                                                          [ BRINGING_TO_MOUTH ]
                                                                      │ Perspective scale
                                                                      ▼
                                                                 [ EATING ]
                                                                      │ Munch & crumbs
                                                                      ▼
[ RESULT ] ◄── Freeze stats & Confetti ◄── [ FINISHED ] ◄── [ SCORE_UPDATED ]
```

---

## 5. First-Person Hand Positioning Pipeline

To prevent hardcoded coordinates across screen resolutions:
1. When user taps a sweet on the `Thali`, query `getBoundingClientRect()` of the tapped sweet target element relative to the container.
2. Translate target center `(X_target, Y_target)` into normalized percentage or viewport coordinates.
3. Compute `FirstPersonHand` keyframe offsets starting from bottom viewport `(X_center, Y_bottom)` extending directly to `(X_target, Y_target)`.
4. Animate sweet attachment to hand fingers during `PICKING`.
5. Animate hand + sweet zoom towards `(X_center, Y_mouth_bottom)` with scale factor `3.5x` during `BRINGING_TO_MOUTH`.

---

## 6. HTML5 Canvas Scorecard Generator (1080×1350)

- Uses an offscreen HTML5 `<canvas width="1080" height="1350">`.
- Draws custom vector geometry and raster artwork for Modaks, Laddoos, Ganesha, Diyas, and Marigold garlands.
- Does NOT rely on OS native emoji rendering which varies across browsers.
- Returns a Blob or Data URL for immediate PNG download (`bappas-modak-score-2026-09-13.png`) and Web Share API file sharing.
