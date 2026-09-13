import type { SessionStats } from '../types/game';

import { formatTimeScorecard } from './formatTime';

/**
 * Triggers browser download of generated scorecard PNG.
 */
export function downloadScoreCardPNG(dataUrl: string, dateString: string) {
  const formattedDate = dateString.toLowerCase().replace(/ /g, '-');
  const filename = `bappas-modak-score-${formattedDate}.png`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates formatted text string for social sharing / clipboard.
 */
export function formatScoreShareText(stats: SessionStats): string {
  const durationStr = formatTimeScorecard(stats.durationMs || 0);
  return (
    `🙏 Ganpati Bappa Morya!\n\n` +
    `I ate ${stats.totalEaten} prasad sweets for Ganpati Bappa on Bappa's Modak & Laddoo! 😋\n\n` +
    `🥟 Modaks: ${stats.modaksEaten}\n` +
    `🟠 Laddoos: ${stats.laddoosEaten}\n` +
    `❤️ Total: ${stats.totalEaten}\n` +
    `⏱️ Duration: ${durationStr}\n\n` +
    `Can you beat my score? 😋🙏`
  );
}

/**
 * Uses Web Share API if supported to share image file or text.
 */
export async function shareScoreCard(blob: Blob, stats: SessionStats): Promise<{ success: boolean; mode: 'file' | 'text' | 'fallback' }> {
  const text = formatScoreShareText(stats);
  const title = "Bappa's Modak & Laddoo Score";

  if (typeof navigator !== 'undefined' && navigator.share) {
    const file = new File([blob], 'bappa-modak-score.png', { type: 'image/png' });

    // Try sharing file first if supported
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title,
          text,
          files: [file]
        });
        return { success: true, mode: 'file' };
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return { success: false, mode: 'file' };
        }
      }
    }

    // Fallback to text share
    try {
      await navigator.share({
        title,
        text,
        url: window.location.origin
      });
      return { success: true, mode: 'text' };
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return { success: false, mode: 'text' };
      }
    }
  }

  return { success: false, mode: 'fallback' };
}

/**
 * Copies formatted text to clipboard.
 */
export async function copyScoreToClipboard(stats: SessionStats): Promise<boolean> {
  const text = formatScoreShareText(stats);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Ignore
  }

  // Legacy fallback
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

/**
 * Generates shareable URL with parameters (e.g. /?modaks=12&laddoos=8&time=277)
 */
export function getShareableURL(stats: SessionStats): string {
  const timeSec = Math.floor((stats.durationMs || 0) / 1000);
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('modaks', stats.modaksEaten.toString());
  url.searchParams.set('laddoos', stats.laddoosEaten.toString());
  url.searchParams.set('time', timeSec.toString());
  return url.toString();
}

/**
 * Parses shared URL parameters if opened by a friend!
 */
export function parseSharedURLParams(): { modaks: number; laddoos: number; total: number; timeSec: number } | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const modaks = parseInt(params.get('modaks') || '', 10);
  const laddoos = parseInt(params.get('laddoos') || '', 10);
  const timeSec = parseInt(params.get('time') || '', 10);

  if (!isNaN(modaks) && !isNaN(laddoos) && !isNaN(timeSec)) {
    return {
      modaks,
      laddoos,
      total: modaks + laddoos,
      timeSec
    };
  }
  return null;
}
