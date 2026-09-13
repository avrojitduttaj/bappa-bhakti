# Product Requirements Document (PRD) 🐘

## 1. Product Summary

**Product Name**: Bappa's Modak & Laddoo  
**Type**: Ganesh Chaturthi interactive web game / festive microsite  
**Platforms**: Mobile-first responsive web + Tablet + Desktop  
**Experience**: Warm, festive, devotional, playful, premium, highly interactive and social-ready.  
**Target Reaction**: *“BRO I JUST ATE A DIGITAL MODAK 😂🙏”* and *“Wait, I need to send my score to my friends!”*

---

## 2. Complete User Flow & State Machine

```
[ HOME ] 
   │ Select Prasad Mode (Modak / Laddoo / Mixed)
   ▼
[ MODE_SELECTED ]
   │ Click "Let's Eat! 🙏" / Tap Prasad Card
   ▼
[ SESSION_STARTED ]
   │ Initialize sessionStartTime, reset active counts
   ▼
[ PLATE ] ◄─────────────────────────────────────────────┐
   │ Tap individual sweet on Thali                      │
   ▼                                                    │
[ REACHING ]                                            │
   │ User hand enters from bottom to target coords      │
   ▼                                                    │
[ PICKING ]                                             │
   │ Fingers grip sweet, sweet lifts from plate         │
   ▼                                                    │
[ BRINGING_TO_MOUTH ]                                   │ Refill Plate /
   │ Hand + sweet scale up to foreground (Mouth POV)    │ Switch Prasad /
   ▼                                                    │ Next Sweet
[ EATING ]                                              │
   │ Munch SFX, bite crumbs, screen shake, food vanishes│
   ▼                                                    │
[ SCORE_UPDATED ] ──────────────────────────────────────┘
   │ Increment modaksEaten / laddoosEaten & totalEaten
   │ (Score increments ONLY after complete eating animation)
   ▼ (Click "Finish Eating")
[ FINISHED ]
   │ Confetti explosion, freeze SessionStats, calculate duration & achievements
   ▼
[ RESULT ]
   │ Display 1080×1350 Canvas Scorecard, Download PNG, Web Share API, Copy Text, URL Share
```

---

## 3. Critical POV Rule

> **THE HAND BELONGS TO THE USER.**

- **First-Person POV**: View looking slightly down at a festive brass thali. Hand enters from the bottom of the screen representing the **USER'S OWN HAND**.
- **Forbidden**:
  - ❌ NEVER make Bappa / Lord Ganesha feed the user.
  - ❌ NEVER make the user feed Bappa / Lord Ganesha.
  - ❌ NEVER make a waiter, server, floating cursor, or 3rd-person character feed the user.
  - ❌ NEVER use CSS-only rough approximations or generic cursor graphics for the hand.

---

## 4. Key Feature Specifications

### 4.1 Home & Welcome Screen
- Festival header: `"Ganpati Bappa Morya! 🙏"`.
- Headline: `"Bappa, aaj kya khayenge?"`.
- Subtitle: `"Choose your prasad and let's eat 😋"`.
- Selection cards: Modak ("Bappa's favourite"), Laddoo ("Round, sweet & irresistible"), Mixed Plate ("Best of both worlds").
- Personal Best tracker (`🏆 Personal Best: X Sweets`).
- Floating Mute/Unmute audio controls.

### 4.2 Festive Thali & Sweets
- Traditional brass/metallic puja thali with realistic gradients and shadows.
- Modaks: Creamy steamed rice flour pleats, kesar saffron tip, subtle steam particles.
- Laddoos: Golden boondi texture, pistachio bits, shiny silver vark foil.
- Dynamic sweet target positioning calculated via bounding bounding rect / responsive coordinates.

### 4.3 First-Person Hand & Feeding Mechanics
- First-person hand asset coming smoothly from bottom boundary.
- Dynamic positioning target calculated from sweet position (`getBoundingClientRect()`).
- Motion sequence: Reach → Grip → Lift → Bring to mouth (`BRINGING_TO_MOUTH` with perspective scaling 1x → 3.5x) → Bite particles + Munch SFX → Score update → Retract.
- Strict touch lockout during animation to prevent double-tap glitches.

### 4.4 Live Scoring & Session Management
- Session starts ONLY when entering the game (`SESSION_STARTED`).
- Timer uses exact `startTime` timestamp diffs (`durationMs`), not incrementing counters.
- Modak counter, Laddoo counter, Total counter with scale-up bounce animations.
- Refill plate & mid-session sweet mode switching without resetting session timer or total score.

### 4.5 Achievements Engine
- 🍡 **Modak Master**: 10+ Modaks in one session.
- 🟠 **Laddoo Legend**: 10+ Laddoos in one session.
- 😋 **Sweet Tooth**: 25+ total sweets.
- 🔥 **Bappa's Bhog Champion**: 50+ total sweets.
- ⚡ **Speed Eater**: 10 sweets in under 2 minutes (120,000 ms).
- 🙏 **Bappa's Bhakt**: Session duration longer than 10 minutes (600,000 ms).

### 4.6 HTML5 Canvas Scorecard (1080×1350 PNG)
- Offscreen 1080×1350 canvas generator.
- Drawn SVG/PNG vector artwork for Modaks, Laddoos, Ganesha, Diyas, and Marigold garlands (never rely on browser-native emojis which look inconsistent across devices).
- High-res PNG export (`bappas-modak-score-2026-09-13.png`).
- Web Share API integration (with native image sharing or fallback).
- Copy formatted score text.
- Shareable URL parameter support (`/?modaks=12&laddoos=8&time=277`).

### 4.7 Audio Engine & Dhol-Tasha Ambience
- **Royalty-Free Dhol-Tasha Background Music**: Soft festive Dhol-Tasha instrumental (`public/audio/dhol-tasha.mp3`) playing seamlessly in the background during active gameplay.
- **Volume & Balance**: Played softly so it never overpowers UI sounds, munch crunch SFX, or bell chimes.
- **Pure Web Audio API Synthesizer Fallback**: If the audio file is unavailable or fails to load, falls back smoothly to synthesized Dhol-Tasha / Tanpura ambient drone without throwing errors.
- **Floating Audio Controls**: Mute/Unmute BGM & SFX toggles, persisted in `localStorage`.
- **Browser Autoplay Compliance**: Audio initializes upon the user's first interactive tap/click with smooth 1.5s volume fade-in and fade-out.

