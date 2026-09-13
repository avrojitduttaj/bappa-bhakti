import type { Achievement, SessionStats } from '../types/game';


export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'modak_master',
    title: 'Modak Master 🥟',
    description: 'Ate 10 or more delicious Modaks in one session',
    icon: '🥟',
    unlocked: false
  },
  {
    id: 'laddoo_legend',
    title: 'Laddoo Legend 🟠',
    description: 'Ate 10 or more Shahi Motichoor Laddoos in one session',
    icon: '🟠',
    unlocked: false
  },
  {
    id: 'sweet_tooth',
    title: 'Sweet Tooth 😋',
    description: 'Ate 25 or more total prasad sweets in one session',
    icon: '😋',
    unlocked: false
  },
  {
    id: 'bhog_champion',
    title: "Bappa's Bhog Champion 🔥",
    description: 'Ultimate Prasad Feast! Ate 50 or more sweets',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'speed_eater',
    title: 'Speed Eater ⚡',
    description: 'Ate 10 sweets in under 2 minutes',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'bappa_bhakt',
    title: "Bappa's Bhakt 🙏",
    description: 'Enjoyed a peaceful feast for longer than 10 minutes',
    icon: '🙏',
    unlocked: false
  }
];

export function evaluateAchievements(
  stats: SessionStats,
  previouslyUnlockedIds: string[] = []
): Achievement[] {
  const durationMs = stats.durationMs || (stats.endTime ? stats.endTime - stats.startTime : 0);

  return INITIAL_ACHIEVEMENTS.map((ach) => {
    let unlocked = previouslyUnlockedIds.includes(ach.id);

    if (!unlocked) {
      switch (ach.id) {
        case 'modak_master':
          if (stats.modaksEaten >= 10) unlocked = true;
          break;
        case 'laddoo_legend':
          if (stats.laddoosEaten >= 10) unlocked = true;
          break;
        case 'sweet_tooth':
          if (stats.totalEaten >= 25) unlocked = true;
          break;
        case 'bhog_champion':
          if (stats.totalEaten >= 50) unlocked = true;
          break;
        case 'speed_eater':
          if (stats.totalEaten >= 10 && durationMs > 0 && durationMs <= 120000) unlocked = true;
          break;
        case 'bappa_bhakt':
          if (durationMs >= 600000) unlocked = true;
          break;
      }
    }

    return {
      ...ach,
      unlocked,
      unlockedAt: unlocked ? (ach.unlockedAt || new Date().toISOString()) : undefined
    };
  });
}
