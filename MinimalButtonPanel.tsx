
import React, { useState } from 'react';

interface MinimalButtonPanelProps {
  onOracle: () => void;
  onCodex: () => void;
  onTithe: () => void;
  onWatchman: () => void;
  onScrolls: () => void;
  onHome: () => void;
}

export const MinimalButtonPanel: React.FC<MinimalButtonPanelProps> = ({ 
  onOracle, onCodex, onTithe, onWatchman, onScrolls, onHome 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: '⚖️', label: 'Altar', onClick: onHome, color: 'text-stone-100' },
    { icon: '🔥', label: 'Watchman', onClick: onWatchman, color: 'text-orange-500' },
    { icon: '📜', label: 'Scrolls', onClick: onScrolls, color: 'text-amber-500' },
    { icon: '💎', label: 'Oracle', onClick: onOracle, color: 'text-amber-500' },
    { icon: '🏺', label: 'Codex', onClick: onCodex, color: 'text-stone-400' },
    { icon: '💰', label: 'Tithe', onClick: onTithe, color: 'text-emerald-400' },
  ];

  return (
    <div className="fixed bottom-12 right-6 z-[100] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="flex flex-col gap-3 mb-2 animate-slideUp">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => { action.onClick(); setIsOpen(false); }}
              className="flex items-center gap-4 group"
            >
              <span className={`text-[8px] font-cinzel font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg ${action.color}`}>
                {action.label}
              </span>
              <div className="w-14 h-14 bg-stone-950/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:border-amber-500/50 transition-all active:scale-90">
                <span className="text-xl">{action.icon}</span>
              </div>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-gold backdrop-blur-xl border border-white/20 ${
          isOpen ? 'bg-stone-100 text-stone-950 rotate-45' : 'bg-amber-500/90 text-stone-950'
        }`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};
