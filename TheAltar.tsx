
import React, { useState, useMemo } from 'react';
import { 
  Tribe, Gender, LifeStage, 
  WitnessRecord 
} from '../types';
import { MITZVOT } from '../constants';
import { CovenantFlame } from './CovenantFlame';
import { DailyManna } from './DailyManna';
import { getDailyLawProtocol } from '../services/lawActivationEngine';
import { WitnessEngine, WitnessCard } from './WitnessEngine';
import { OracleDiagnostic } from './OracleDiagnostic';
import { HerbCodex } from './HerbCodex';
import { MinimalButtonPanel } from './MinimalButtonPanel';
import { SovereignTreasury } from './SovereignTreasury';

interface TheAltarProps {
  score: number;
  lifeStage: LifeStage;
  onObserve: (points?: number) => void;
  userContext: { tribe: Tribe, gender: Gender, age: number, lifeStage: LifeStage, score: number };
  onNavigate?: (tab: 'home' | 'ai' | 'bible') => void;
}

export const TheAltar: React.FC<TheAltarProps> = ({ score, lifeStage, onObserve, userContext, onNavigate }) => {
  const [isRecordingWitness, setIsRecordingWitness] = useState(false);
  const [activeWitness, setActiveWitness] = useState<WitnessRecord | null>(null);
  const [showOracle, setShowOracle] = useState(false);
  const [showCodex, setShowCodex] = useState(false);
  const [showTithe, setShowTithe] = useState(false);

  const protocol = useMemo(() => {
    return getDailyLawProtocol(
      {
        tribe: userContext.tribe,
        sex: userContext.gender,
        age: userContext.age,
        location: 'exile',
        currentFeast: 'None'
      },
      MITZVOT
    );
  }, [userContext]);

  return (
    <div className="space-y-10 animate-fadeIn pb-32 relative z-10">
      {/* HEADER & FLAME */}
      <section className="text-center pt-4 flex-none">
        <h2 className="font-cinzel text-[11px] text-white tracking-[0.8em] uppercase mb-4 drop-shadow-xl font-black">The Altar of Remembrance</h2>
        <div className="scale-90 origin-top drop-shadow-2xl">
          <CovenantFlame score={score} lifeStage={lifeStage} />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="px-4 flex gap-4">
        <button 
          onClick={() => onNavigate?.('ai')}
          className="flex-1 py-8 bg-black/80 backdrop-blur-3xl border-2 border-orange-900/30 rounded-[45px] flex flex-col items-center justify-center gap-3 group hover:border-orange-500/50 transition-all shadow-2xl"
        >
          <span className="text-3xl group-hover:scale-125 transition-transform drop-shadow-gold">🔥</span>
          <span className="text-[10px] font-cinzel text-white group-hover:text-orange-500 tracking-[0.4em] uppercase font-black text-center drop-shadow-md">The Watchman</span>
        </button>
        <button 
          onClick={() => onNavigate?.('bible')}
          className="flex-1 py-8 bg-black/80 backdrop-blur-3xl border-2 border-amber-900/30 rounded-[45px] flex flex-col items-center justify-center gap-3 group hover:border-amber-500/50 transition-all shadow-2xl"
        >
          <span className="text-3xl group-hover:scale-125 transition-transform drop-shadow-gold">📜</span>
          <span className="text-[10px] font-cinzel text-white group-hover:text-amber-100 tracking-[0.4em] uppercase font-black text-center drop-shadow-md">Sacred Scrolls</span>
        </button>
      </section>

      {/* TODAY'S PRIMARY OBLIGATION */}
      <section className="bg-black/90 backdrop-blur-3xl border-2 border-white/10 p-12 rounded-[70px] relative overflow-hidden group shadow-2xl mx-2">
        <div className="absolute top-0 right-0 p-10 opacity-[0.05] text-[10rem] pointer-events-none group-hover:scale-110 transition-transform">⚖️</div>
        <div className="relative z-10 text-center space-y-8">
          <header className="space-y-2">
            <span className="text-[10px] font-cinzel text-amber-500 tracking-[1em] uppercase font-black drop-shadow-lg">Sacred Duty</span>
            <div className="h-px w-20 bg-amber-900/60 mx-auto mt-2" />
          </header>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center">
               <span className="text-[9px] font-mono text-amber-500 uppercase tracking-[0.3em] mb-2 font-black">LAW #{protocol.primaryLaw.id} • {protocol.primaryLaw.severity.toUpperCase()}</span>
               <h3 className="font-cinzel text-3xl font-black text-white uppercase tracking-[0.1em] leading-tight drop-shadow-md">{protocol.primaryLaw.title}</h3>
            </div>
            <p className="font-mono text-[10px] text-white/60 uppercase tracking-[0.3em] font-bold">{protocol.primaryLaw.scripture}</p>
          </div>

          <div className="p-10 bg-white/5 rounded-[50px] border border-white/10 shadow-inner">
             <p className="text-stone-100 italic font-playfair text-2xl leading-relaxed max-w-sm mx-auto drop-shadow-md">
               "{protocol.primaryLaw.divineIntent}"
             </p>
          </div>
          
          <div className="pt-6">
            <button 
              onClick={() => setIsRecordingWitness(true)}
              className="w-full py-8 font-cinzel text-sm tracking-[0.6em] rounded-[30px] bg-amber-500 text-stone-950 shadow-gold font-black transition-all active:scale-95 hover:bg-amber-400 uppercase"
            >
              Seal Obedience
            </button>
          </div>
        </div>
      </section>

      {/* DAILY MANNA WATCH */}
      <section className="px-2">
        <DailyManna userContext={userContext} onCommit={(p) => onObserve(p)} />
      </section>

      <MinimalButtonPanel 
        onOracle={() => setShowOracle(true)}
        onCodex={() => setShowCodex(true)}
        onTithe={() => setShowTithe(true)}
        onWatchman={() => onNavigate?.('ai')}
        onScrolls={() => onNavigate?.('bible')}
        onHome={() => onNavigate?.('home')}
      />

      {/* MODALS */}
      {isRecordingWitness && (
        <WitnessEngine 
          tribe={userContext.tribe}
          onComplete={(r) => { setIsRecordingWitness(false); setActiveWitness(r); onObserve(20); }} 
          onCancel={() => setIsRecordingWitness(false)} 
        />
      )}

      {activeWitness && (
        <WitnessCard record={activeWitness} onDismiss={() => setActiveWitness(null)} tribe={userContext.tribe} />
      )}

      {showOracle && (
        <OracleDiagnostic userContext={userContext} onClose={() => setShowOracle(false)} />
      )}

      {showTithe && <SovereignTreasury onClose={() => setShowTithe(false)} />}

      {showCodex && (
        <div className="fixed inset-0 z-[160] bg-black/95 backdrop-blur-3xl overflow-y-auto scrollbar-hide animate-fadeIn p-6">
           <header className="flex justify-between items-center py-8 mb-10 max-w-lg mx-auto">
             <h2 className="font-cinzel text-amber-500 tracking-[0.6em] uppercase font-black text-xl drop-shadow-lg">Sacred Library</h2>
             <button onClick={() => setShowCodex(false)} className="bg-stone-900 border border-white/10 p-4 rounded-full text-stone-300 hover:text-amber-500 transition-all">✕</button>
           </header>
           <div className="max-w-lg mx-auto">
             <HerbCodex userContext={userContext} />
           </div>
        </div>
      )}
    </div>
  );
};
