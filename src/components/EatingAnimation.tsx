import type { GameStage } from '../types/game';


interface EatingAnimationProps {
  stage: GameStage;
}

export const EatingAnimation: React.FC<EatingAnimationProps> = ({ stage }) => {
  const isEating = stage === 'EATING';
  const isScoreUpdated = stage === 'SCORE_UPDATED';

  if (!isEating && !isScoreUpdated) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-end justify-center pb-24 overflow-hidden">
      {/* Bite Crumb Explosion Particles */}
      {isEating && (
        <div className="absolute bottom-28 flex justify-center items-center">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            return (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#F59E0B] border border-[#EA580C] animate-ping"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDuration: '0.6s'
                }}
              />
            );
          })}
        </div>
      )}

      {/* Floating "+1 YUM!" Score Popup */}
      <div className="transform transition-all duration-500 animate-bounce flex flex-col items-center">
        <span className="text-4xl sm:text-6xl font-extrabold text-[#EA580C] drop-shadow-[0_4px_12px_rgba(234,88,12,0.4)]">
          +1 YUM! 😋
        </span>
        <span className="text-sm sm:text-base font-bold text-[#78350F] bg-[#FFFDF7]/90 px-3 py-1 rounded-full border border-[#F59E0B] shadow">
          Prasad Eaten! 🙏
        </span>
      </div>
    </div>
  );
};
