# Non-Negotiable Operating Rules 📜

1. **The hand belongs to the user.** It MUST enter from the bottom of the viewport in first-person POV looking down at the thali.
2. **Never use Bappa's/Ganpati's hand**, waiter/server hand, another character, or a floating hand.
3. **Never use emoji/cursor as the hand.** Use a proper visual hand asset (vector/SVG/graphic).
4. **Hand positioning must be responsive and dynamic.** Use `getBoundingClientRect()` or container percentage math; NEVER use hardcoded pixel coordinates.
5. **Score increases ONLY after complete successful animation sequence**: `PICKING` → `BRINGING_TO_MOUTH` → `EATING` → `SCORE_UPDATED`. Never increment on raw tap.
6. **Prevent double taps or rapid clicks** while the eating animation is active.
7. **Session timer starts ONLY when game begins** (`SESSION_STARTED`).
8. **Timer uses timestamps** (`Date.now() - startTime`), NOT an incrementing `setInterval` counter variable.
9. **Freeze final SessionStats** before generating the scorecard.
10. **Mobile-first responsive design**: Support 360×800, 375×812, 390×844, 414×896 plus tablet and 4K desktop.
11. **No copyrighted commercial music or artwork.** Use royalty-free, CC0, appropriately licensed, or original Dhol-Tasha instrumental (`public/audio/dhol-tasha.mp3`). Must play softly in background without overpowering UI/munch SFX, loop seamlessly, fade smoothly, start on first interaction, and fall back gracefully if missing.

12. **Respectful Ganpati theme.** No inappropriate, grotesque, or disrespectful treatment.
13. **Prefer zero backend.** 100% client-side executable.
14. **Unsupported browser features** (Web Share API, audio autoplay, canvas export, missing audio files) MUST fail gracefully without crashing.
15. **`npm run build` must pass cleanly** before completing a phase.
16. **Keep Markdown documentation updated** whenever meaningful architecture, design, or implementation decisions change.
