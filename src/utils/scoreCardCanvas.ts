import type { SessionStats } from '../types/game';

import { formatTimeScorecard } from './formatTime';

/**
 * Draws a pixel-perfect 1080x1350 digital scorecard PNG on an offscreen canvas.
 * Uses pure HTML5 Canvas API vector drawing so critical artwork (Modaks, Laddoos, Ganesha, Diyas)
 * renders consistently across all operating systems without relying on browser native emojis.
 */
export async function generateScoreCardCanvas(
  stats: SessionStats,
  isNewBest: boolean = false
): Promise<{ dataUrl: string; blob: Blob }> {
  const width = 1080;
  const height = 1350;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // 1. Background Gradient
  const bgGradient = ctx.createRadialGradient(
    width / 2, height / 2, 100,
    width / 2, height / 2, width * 0.8
  );
  bgGradient.addColorStop(0, '#FFFDF7');
  bgGradient.addColorStop(0.6, '#FEF3C7');
  bgGradient.addColorStop(1, '#FDE68A');

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // 2. Outer Saffron Border
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#EA580C'; // Saffron orange
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Inner Gold Filigree Border
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#D97706'; // Gold
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // 3. Draw Corner Diya Accents
  drawCornerDiya(ctx, 60, 60);
  drawCornerDiya(ctx, width - 60, 60);

  // 4. Draw Marigold Top Garland String
  drawMarigoldGarland(ctx, width);

  // 5. Draw Central Ganesha Vector Artwork
  drawGaneshaHeader(ctx, width / 2, 190);

  // 6. Main Header Text
  ctx.fillStyle = '#991B1B'; // Kumkum red
  ctx.font = 'bold 36px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GANPATI BAPPA MORYA 🙏', width / 2, 290);

  ctx.fillStyle = '#451A03';
  ctx.font = '800 52px Outfit, sans-serif';
  ctx.fillText("BAPPA'S MODAK & LADDOO", width / 2, 355);

  ctx.fillStyle = '#B45309';
  ctx.font = '600 28px Outfit, sans-serif';
  ctx.fillText('Grand Festival Prasad Feast', width / 2, 395);

  // 7. Hero Score Container Box
  const boxY = 430;
  const boxWidth = 920;
  const boxHeight = 220;
  const boxX = (width - boxWidth) / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(217, 119, 6, 0.25)';
  ctx.shadowBlur = 30;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 28);
  ctx.fill();
  ctx.shadowColor = 'transparent'; // reset shadow

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#F59E0B';
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 28);
  ctx.stroke();

  // Big Score Text
  ctx.fillStyle = '#EA580C';
  ctx.font = '900 100px Outfit, sans-serif';
  ctx.fillText(`${stats.totalEaten}`, width / 2, boxY + 115);

  ctx.fillStyle = '#78350F';
  ctx.font = '700 32px Outfit, sans-serif';
  ctx.fillText('TOTAL SWEETS EATEN', width / 2, boxY + 175);

  // New Personal Best Tag if applicable
  if (isNewBest) {
    drawBestBadge(ctx, width / 2, boxY + 24);
  }

  // 8. Breakdown Grid Cards (Modaks vs Laddoos)
  const gridY = 680;
  const cardWidth = 440;
  const cardHeight = 200;

  // Left Card: Modaks
  const card1X = 70;
  ctx.fillStyle = '#FFFDF7';
  roundRect(ctx, card1X, gridY, cardWidth, cardHeight, 24);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FCD34D';
  roundRect(ctx, card1X, gridY, cardWidth, cardHeight, 24);
  ctx.stroke();

  // Draw Modak Icon Vector
  drawModakVector(ctx, card1X + 80, gridY + 100, 60);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#EA580C';
  ctx.font = '900 64px Outfit, sans-serif';
  ctx.fillText(`${stats.modaksEaten}`, card1X + 170, gridY + 110);

  ctx.fillStyle = '#78350F';
  ctx.font = '700 26px Outfit, sans-serif';
  ctx.fillText('Ukadiche Modaks', card1X + 170, gridY + 150);

  // Right Card: Laddoos
  const card2X = 570;
  ctx.fillStyle = '#FFFDF7';
  roundRect(ctx, card2X, gridY, cardWidth, cardHeight, 24);
  ctx.fill();
  ctx.strokeStyle = '#FCD34D';
  roundRect(ctx, card2X, gridY, cardWidth, cardHeight, 24);
  ctx.stroke();

  // Draw Laddoo Icon Vector
  drawLaddooVector(ctx, card2X + 80, gridY + 100, 60);

  ctx.fillStyle = '#D97706';
  ctx.font = '900 64px Outfit, sans-serif';
  ctx.fillText(`${stats.laddoosEaten}`, card2X + 170, gridY + 110);

  ctx.fillStyle = '#78350F';
  ctx.font = '700 26px Outfit, sans-serif';
  ctx.fillText('Motichoor Laddoos', card2X + 170, gridY + 150);

  // 9. Session Details Bar (Duration & Date)
  const metaY = 910;
  ctx.textAlign = 'center';

  ctx.fillStyle = '#FEF3C7';
  roundRect(ctx, 70, metaY, 940, 90, 20);
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  roundRect(ctx, 70, metaY, 940, 90, 20);
  ctx.stroke();

  const durationStr = formatTimeScorecard(stats.durationMs || 0);

  ctx.fillStyle = '#451A03';
  ctx.font = '600 28px Outfit, sans-serif';
  ctx.fillText(`⏱️ Duration: ${durationStr}    •    📅 Date: ${stats.date}`, width / 2, metaY + 54);

  // 10. Achievements Section
  const achY = 1030;
  ctx.fillStyle = '#991B1B';
  ctx.font = '700 28px Outfit, sans-serif';
  ctx.fillText('FEAST ACHIEVEMENTS UNLOCKED', width / 2, achY);

  const unlocked = stats.achievements.filter((a) => a.unlocked);
  if (unlocked.length > 0) {
    const achBoxY = achY + 20;
    const itemWidth = Math.min(180, (width - 160) / unlocked.length);
    const startX = (width - itemWidth * unlocked.length) / 2 + itemWidth / 2;

    unlocked.slice(0, 4).forEach((ach, index) => {
      const cx = startX + index * itemWidth;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, achBoxY + 50, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = '32px sans-serif';
      ctx.fillText(ach.icon, cx, achBoxY + 62);

      ctx.fillStyle = '#78350F';
      ctx.font = '600 18px Outfit, sans-serif';
      ctx.fillText(ach.title.split(' ')[0], cx, achBoxY + 110);
    });
  } else {
    ctx.fillStyle = '#78350F';
    ctx.font = '500 24px Outfit, sans-serif';
    ctx.fillText('Devotional Prasad Feaster 🙏', width / 2, achY + 60);
  }

  // 11. Footer Invitation
  ctx.fillStyle = '#EA580C';
  ctx.font = 'bold 36px Outfit, sans-serif';
  ctx.fillText('“Can you beat my score? 😋”', width / 2, 1240);

  ctx.fillStyle = '#B45309';
  ctx.font = '500 22px Outfit, sans-serif';
  ctx.fillText('Made with ❤️ for Ganpati Bappa', width / 2, 1290);

  // Return PNG Data URL and Blob
  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));

  return { dataUrl, blob };
}

// Canvas Helper Functions

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCornerDiya(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);

  // Flame aura
  const flameGlow = ctx.createRadialGradient(0, -10, 2, 0, -10, 24);
  flameGlow.addColorStop(0, 'rgba(252, 211, 77, 0.9)');
  flameGlow.addColorStop(0.5, 'rgba(234, 88, 12, 0.5)');
  flameGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = flameGlow;
  ctx.beginPath();
  ctx.arc(0, -10, 24, 0, Math.PI * 2);
  ctx.fill();

  // Brass Base
  ctx.fillStyle = '#B45309';
  ctx.beginPath();
  ctx.ellipse(0, 10, 20, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Flame
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.moveTo(0, -25);
  ctx.quadraticCurveTo(8, -10, 0, 0);
  ctx.quadraticCurveTo(-8, -10, 0, -25);
  ctx.fill();

  ctx.restore();
}

function drawMarigoldGarland(ctx: CanvasRenderingContext2D, width: number) {
  ctx.save();
  const flowers = 11;
  const step = width / (flowers + 1);

  ctx.strokeStyle = '#15803D';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 50);
  for (let i = 1; i <= flowers; i++) {
    ctx.quadraticCurveTo(i * step - step / 2, 70, i * step, 50);
  }
  ctx.stroke();

  for (let i = 1; i <= flowers; i++) {
    const x = i * step;
    const y = 60;

    // Orange Marigold
    ctx.fillStyle = '#EA580C';
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawGaneshaHeader(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);

  // Crown (Mukut)
  ctx.fillStyle = '#D97706';
  ctx.beginPath();
  ctx.moveTo(0, -50);
  ctx.lineTo(25, -15);
  ctx.lineTo(-25, -15);
  ctx.closePath();
  ctx.fill();

  // Head Circle
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(0, 5, 30, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.beginPath();
  ctx.ellipse(-32, 5, 14, 20, -0.2, 0, Math.PI * 2);
  ctx.ellipse(32, 5, 14, 20, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Trunk
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.quadraticCurveTo(15, 35, 20, 45);
  ctx.stroke();

  // Tilak
  ctx.fillStyle = '#DC2626';
  ctx.beginPath();
  ctx.ellipse(0, -5, 4, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawModakVector(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx, cy);

  // Modak Body
  ctx.fillStyle = '#FFFDF7';
  ctx.beginPath();
  ctx.moveTo(0, -size / 2);
  ctx.quadraticCurveTo(size / 2, -size / 6, size / 2, size / 3);
  ctx.quadraticCurveTo(0, size / 2 + 5, -size / 2, size / 3);
  ctx.quadraticCurveTo(-size / 2, -size / 6, 0, -size / 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#FCD34D';
  ctx.stroke();

  // Kesar tip
  ctx.fillStyle = '#EA580C';
  ctx.beginPath();
  ctx.arc(0, -size / 2 + 2, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawLaddooVector(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.save();
  ctx.translate(cx, cy);

  // Laddoo Base
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D97706';
  ctx.stroke();

  // Pistachio specks
  ctx.fillStyle = '#16A34A';
  ctx.beginPath();
  ctx.arc(-8, -6, 3, 0, Math.PI * 2);
  ctx.arc(6, 8, 3, 0, Math.PI * 2);
  ctx.arc(10, -5, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBestBadge(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.fillStyle = '#DC2626';
  roundRect(ctx, -140, -18, 280, 36, 18);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🎉 NEW PERSONAL BEST!', 0, 6);

  ctx.restore();
}
