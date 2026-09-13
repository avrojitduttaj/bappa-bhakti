import type { PlateMode, SweetItem, SweetType } from '../types/game';


// Preset arrangements for thali items (coordinates in % from thali center -50..50)
const MODAK_POSITIONS = [
  { x: 0, y: -22, rotation: -4, scale: 1.05 },    // Top Center
  { x: -26, y: -10, rotation: -12, scale: 0.98 }, // Top Left
  { x: 26, y: -10, rotation: 10, scale: 1.02 },   // Top Right
  { x: -28, y: 16, rotation: -8, scale: 1.0 },    // Bottom Left
  { x: 28, y: 16, rotation: 14, scale: 0.96 },    // Bottom Right
  { x: 0, y: 22, rotation: 5, scale: 1.04 },      // Bottom Center
  { x: 0, y: -2, rotation: 2, scale: 1.1 }        // Center Hero
];

const LADDOO_POSITIONS = [
  { x: 0, y: -24, rotation: 15, scale: 1.02 },
  { x: -25, y: -12, rotation: -45, scale: 0.98 },
  { x: 25, y: -12, rotation: 30, scale: 1.0 },
  { x: -27, y: 14, rotation: -15, scale: 1.04 },
  { x: 27, y: 14, rotation: 60, scale: 0.95 },
  { x: 0, y: 24, rotation: -30, scale: 1.01 },
  { x: 0, y: 0, rotation: 0, scale: 1.08 }
];

const MIXED_POSITIONS: Array<{ x: number; y: number; rotation: number; scale: number; type: SweetType }> = [
  { x: 0, y: -24, rotation: -5, scale: 1.05, type: 'modak' },
  { x: -26, y: -10, rotation: 40, scale: 0.98, type: 'laddoo' },
  { x: 26, y: -10, rotation: -8, scale: 1.02, type: 'modak' },
  { x: -28, y: 16, rotation: -15, scale: 1.0, type: 'modak' },
  { x: 28, y: 16, rotation: 25, scale: 0.96, type: 'laddoo' },
  { x: 0, y: 22, rotation: -30, scale: 1.0, type: 'laddoo' },
  { x: 0, y: -1, rotation: 0, scale: 1.1, type: 'modak' }
];

export function generateThaliSweets(mode: PlateMode): SweetItem[] {
  const timestamp = Date.now();

  if (mode === 'modak') {
    return MODAK_POSITIONS.map((pos, index) => ({
      id: `modak-${timestamp}-${index}`,
      type: 'modak',
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      scale: pos.scale,
      eaten: false
    }));
  }

  if (mode === 'laddoo') {
    return LADDOO_POSITIONS.map((pos, index) => ({
      id: `laddoo-${timestamp}-${index}`,
      type: 'laddoo',
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      scale: pos.scale,
      eaten: false
    }));
  }

  // Mixed plate
  return MIXED_POSITIONS.map((pos, index) => ({
    id: `${pos.type}-${timestamp}-${index}`,
    type: pos.type,
    x: pos.x,
    y: pos.y,
    rotation: pos.rotation,
    scale: pos.scale,
    eaten: false
  }));
}
