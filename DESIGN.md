# Design Specifications & Visual Aesthetics 🎨

## 1. Visual Theme & Feeling

- **Aesthetic**: Festive + Warm + Playful + Premium + Devotional.
- **Goal**: Make the user feel as if they are sitting before a blessed thali of Modaks and Laddoos on Ganesh Chaturthi, using their own hand to pick up and eat prasad.

---

## 2. Color System

```css
/* Festive Color Tokens */
:root {
  --color-saffron: #FF9933;
  --color-saffron-dark: #EA580C;
  --color-gold: #F59E0B;
  --color-gold-dark: #D97706;
  --color-vermilion: #DC2626;
  --color-red-dark: #991B1B;
  --color-brass: #B45309;
  --color-brass-dark: #78350F;
  --color-cream: #FFFDF7;
  --color-cream-warm: #FEF3C7;
  --color-green-leaf: #16A34A;
  --color-text-brown: #451A03;
}
```

---

## 3. Key Visual Components

### 3.1 Background & Environment
- Warm paper/cream radial gradient with subtle texture overlay.
- Marigold toran garland at top with hanging flower sways.
- Flickering oil diyas at top-left and top-right with radial golden aura.
- Pulsing Rangoli mandala centered behind the thali.
- Welcoming, respectful Ganesha silhouette in soft translucent gold (not a feeding character).

### 3.2 Brass Puja Thali
- Metallic brass thali rendered with CSS gradients, radial highlights, and deep realistic drop shadows.

### 3.3 Ukadiche Modak
- Steamed rice flour exterior (white/ivory cream `#FFFDF7` → `#FEF3C7`), folded pleats, saffron/kesar tip (`#F59E0B`), subtle animated steam particles rising upward.

### 3.4 Shahi Motichoor Laddoo
- Golden orange boondi texture (`#F59E0B`), pistachio flakes (`#16A34A`), shiny silver vark foil highlights (`#F3F4F6`).

### 3.5 First-Person User Hand
- Natural Indian hand tones, right arm extending from bottom viewport boundary, red/yellow Mauli thread on wrist, realistic finger grip animation during sweet pickup.

### 3.6 1080×1350 Digital Scorecard PNG
- Dedicated canvas design with saffron ornate borders, marigold header, vector Modak/Laddoo graphics (no native browser emojis), Ganesha header, total score text, breakdown grid, play duration, date (`13 September 2026`), and achievement badges.
