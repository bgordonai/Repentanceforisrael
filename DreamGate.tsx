
import React, { useState } from 'react';
import { interpretDream } from '../services/geminiService';
import { Tribe, Gender } from '../types';

interface DreamGateProps {
  userContext: { tribe: Tribe, gender: Gender };
  onClose: () => void;
}

export const DreamGate: React.FC<DreamGateProps> = ({ userContext, onClose }) => {
  const [dreamInput, setDreamInput] = useState('');
  const [isDeciphering, setIsDeciphering] = useState(false);
  const [revelation, setRevelation] = useState<{
    interpretation: string,
    symbolicKeys: string[],
    scriptureReference: string,
    dawnAction: string
  } | null>(null);

  const handleDecipher = async () => {
    if (!dreamInput.trim() || isDeciphering) return;
    setIsDeciphering(true);
    const result = await interpretDream(dreamInput, userContext);
    setRevelation(result);
    setIsDeciphering(false);
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#020617] flex flex-col items-center justify-start overflow-y-auto scrollbar-hide animate-fadeIn p-6">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="god-ray scale-150 opacity-10"></div>
        <div className="aura-swirl opacity-5 absolute inset-0 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      <header className="w-full max-w-lg flex justify-between items-center py-6 relative z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌙</span>
          <h2 className="font-cinzel text-indigo-400 text-lg tracking-[0.4em] uppercase font-black">Dream Gate</h2>
        </div>
        <button onClick={onClose} className="text-stone-600 hover:text-indigo-400 font-cinzel text-xs tracking-widest uppercase p-2">Dismiss</button>
      </header>

      {!revelation ? (
        <div className="w-full max-w-lg space-y-12 pb-20 relative z-10 animate-fadeIn">
          <section className="text-center space-y-4">
             <div className="w-24 h-24 mx-auto bg-indigo-500/5 border border-indigo-900/30 rounded-full flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(99,102,241,0.1)] animate-pulse">
               🌌
             </div>
             <p className="font-playfair italic text-indigo-300 text-sm max-w-[280px] mx-auto">
               "For God speaketh once, yea twice, yet man perceiveth it not. In a dream, in a vision of the night..."
             </p>
          </section>

          <section className="space-y-6">
            <label className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black px-4">Recount thy Vision</label>
            <textarea
              value={dreamInput}
              onChange={(e) => setDreamInput(e.target.value)}
              placeholder="Ex: I saw seven lean kine come up out of the river..."
              className="w-full bg-stone-950/50 border border-indigo-900/20 rounded-[40px] p-10 text-stone-200 font-playfair italic text-xl focus:outline-none focus:border-indigo-500/40 min-h-[220px] shadow-inner leading-relaxed"
            />
            
            <button
              onClick={handleDecipher}
              disabled={isDeciphering || !dreamInput.trim()}
              className={`w-full py-8 font-cinzel text-xs font-black tracking-[0.6em] rounded-3xl transition-all ${
                isDeciphering ? 'bg-indigo-950 text-indigo-500/50 animate-pulse cursor-wait' : 'bg-indigo-600 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95'
              } uppercase`}
            >
              {isDeciphering ? 'Deciphering Shadows...' : 'Unlock the Nocturnal Scroll'}
            </button>
          </section>
        </div>
      ) : (
        <div className="w-full max-w-lg space-y-12 pb-40 animate-slideUp relative z-10">
          <div className="bg-stone-950 border border-indigo-900/30 rounded-[60px] p-12 space-y-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />
            
            <header className="text-center space-y-4">
              <span className="text-[10px] font-cinzel text-indigo-500 tracking-[0.8em] uppercase font-black">The Master's Deciphering</span>
              <h3 className="font-playfair text-3xl font-black text-stone-100 italic">"The Spirit of Interpretation"</h3>
            </header>

            <div className="space-y-10">
              <section className="space-y-4">
                <h5 className="text-[9px] font-cinzel text-indigo-900 tracking-[0.4em] uppercase font-black">Nocturnal Revelation</h5>
                <p className="text-xl text-stone-200 font-playfair italic leading-relaxed">"{revelation.interpretation}"</p>
              </section>

              <div className="h-px w-full bg-stone-900" />

              <section className="space-y-6">
                <h5 className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black">Symbolic Keys Unlocked</h5>
                <div className="flex flex-wrap gap-2">
                  {revelation.symbolicKeys.map((key, i) => (
                    <div key={i} className="px-4 py-2 bg-indigo-500/5 border border-indigo-900/20 rounded-xl text-[10px] font-cinzel text-indigo-300 tracking-widest uppercase">
                      {key}
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-8 bg-indigo-950/20 rounded-[40px] border border-indigo-900/20 space-y-4 shadow-inner">
                <h5 className="text-[9px] font-cinzel text-indigo-400 tracking-[0.4em] uppercase font-black">The Scripture Anchor</h5>
                <p className="text-stone-300 font-mono text-xs tracking-widest font-black uppercase">— {revelation.scriptureReference}</p>
              </section>

              <section className="space-y-6 pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-indigo-900/20" />
                  <span className="text-[8px] font-cinzel text-indigo-500 tracking-[0.5em] uppercase font-black">The Dawn Instruction</span>
                  <div className="h-px flex-1 bg-indigo-900/20" />
                </div>
                <p className="text-stone-100 font-playfair text-xl text-center leading-[2] italic px-4">
                  "{revelation.dawnAction}"
                </p>
              </section>
            </div>

            <footer className="pt-10 flex flex-col gap-4">
               <button 
                onClick={() => setRevelation(null)}
                className="py-4 text-stone-600 hover:text-indigo-400 font-cinzel text-[10px] tracking-[0.4em] uppercase transition-all"
               >
                 Submit Another Vision
               </button>
               <button 
                onClick={onClose}
                className="w-full py-6 bg-indigo-600 text-white font-cinzel text-xs font-black rounded-3xl uppercase tracking-[0.4em] shadow-xl active:scale-95 transition-all"
               >
                 Seal Revelation
               </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
