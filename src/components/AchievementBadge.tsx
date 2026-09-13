import type { Achievement } from '../types/game';


interface AchievementBadgeProps {
  achievement: Achievement;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  if (!achievement.unlocked) return null;

  return (
    <div className="flex items-center gap-3 bg-[#FFFDF7] p-3 rounded-2xl border-2 border-[#F59E0B] shadow-sm select-none">
      <div className="w-10 h-10 rounded-full bg-[#FEF3C7] border border-[#FCD34D] flex items-center justify-center text-xl shrink-0 shadow-inner">
        {achievement.icon}
      </div>
      <div className="flex flex-col text-left">
        <h4 className="text-xs sm:text-sm font-extrabold text-[#451A03]">{achievement.title}</h4>
        <p className="text-[10px] sm:text-xs font-semibold text-[#78350F]">{achievement.description}</p>
      </div>
    </div>
  );
};
