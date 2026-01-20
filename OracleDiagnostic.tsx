
import React, { useState } from 'react';
import { getPropheticDiagnosis } from '../services/geminiService';
import { Tribe, Gender, LifeStage } from '../types';
import { TRIBE_COLORS } from '../constants';

interface OracleDiagnosticProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: LifeStage };
  onClose: () => void;
}

export const OracleDiagnostic: React.FC<OracleDiagnosticProps> = ({ userContext, onClose }) => {
  const [burdenType, setBurdenType] = useState<'Physical' | 'Mental' | 'Spiritual'>('Physical');
  const [details, setDetails] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{
    rootCause: string,
    violationLink: string,
    remedyPath: string,
    prayer: string
  } | null>(null);

  const handleConsult = async () => {
    if (!details.trim() || isConsulting) return;
    setIsConsulting(true);
    setDiagnosis(null);
    const result = await getPropheticDiagnosis(burdenType, details, userContext);
    setDiagnosis(result);
    setIsConsulting(false);
  };

  const stones = Object.keys(TRIBE_COLORS).filter(k => k !== 'All Tribes');

  return (
    <div className="fixed inset-0 z-[150] bg-black/95 flex flex-col items-center justify-start overflow-y-auto scrollbar-hide animate-fadeIn p-6">
      <header className="w-full max-w-lg flex justify-between items-center py-6 mb-10">
        <h2 className="font-cinzel text-amber-500 text-lg tracking-[0.4em] uppercase font-black">Oracle of the Breastplate</h2>
        <button onClick={onClose} className="text-stone-600 hover:text-amber-500 font-cinzel text-xs tracking-widest uppercase p-2">Return</button>
      </header>

      {!diagnosis ? (
        <div className="w-full max-w-lg space-y-12 pb-20">
          <section className="text-center space-y-4">
            <div className="grid grid-cols-4 gap-2 px-10">
              {stones.map((t, i) => (
                <div 
                  key={t} 
                  className={`aspect-square rounded shadow-inner border border-white/10 ${isConsulting ? 'animate-pulse' : ''}`}
                  style={{ backgroundColor: (TRIBE_COLORS as any)[t], opacity: isConsulting ? 0.8 : 0.3, transitionDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <p className="font-playfair italic text-stone-500 text-sm">"The Urim and Thummim shall reveal the hidden thing."</p>
          </section>

          <section className="space-y-8">
            <div className="flex gap-2 p-1 bg-stone-900/40 rounded-2xl border border-stone-800">
              {(['Physical', 'Mental', 'Spiritual'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setBurdenType(type)}
                  className={`flex-1 py-3 font-cinzel text-[9px] tracking-widest uppercase rounded-xl transition-all ${
                    burdenType === type ? 'bg-amber-500 text-stone-950 font-black' : 'text-stone-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black px-4">Declare thy Burden</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Ex: Frequent fatigue, feeling of spiritual heaviness, pain in the liver gate..."
                className="w-full bg-stone-950 border border-stone-900 rounded-[35px] p-8 text-stone-200 font-playfair italic text-lg focus:outline-none focus:border-amber-900/40 min-h-[160px] shadow-inner"
              />
            </div>

            <button
              onClick={handleConsult}
              disabled={isConsulting || !details.trim()}
              className={`w-full py-8 font-cinzel text-xs font-black tracking-[0.6em] rounded-3xl transition-all ${
                isConsulting ? 'bg-stone-900 text-amber-500/50 animate-pulse cursor-wait' : 'bg-amber-500 text-stone-950 shadow-gold active:scale-95'
              } uppercase`}
            >
              {isConsulting ? 'Consulting the Oracle...' : 'Seek Prophetic Diagnosis'}
            </button>
          </section>
        </div>
      ) : (
        <div className="w-full max-w-lg space-y-12 pb-40 animate-slideUp">
          <div className="bg-stone-950 border border-amber-900/20 rounded-[60px] p-12 space-y-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30" />
            
            <header className="text-center space-y-4">
              <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.8em] uppercase font-black">Decree of Restoration</span>
              <h3 className="font-playfair text-3xl font-black text-stone-100 italic">"The Light of Alignment"</h3>
            </header>

            <div className="space-y-10">
              <section className="space-y-4">
                <h5 className="text-[9px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black">Root Revelation</h5>
                <p className="text-xl text-stone-200 font-playfair italic leading-relaxed">"{diagnosis.rootCause}"</p>
              </section>

              <div className="h-px w-full bg-stone-900" />

              <section className="space-y-4">
                <h5 className="text-[9px] font-cinzel text-amber-900 tracking-[0.4em] uppercase font-black">Covenant Violation Link</h5>
                <p className="text-sm text-stone-400 font-inter leading-relaxed">{diagnosis.violationLink}</p>
              </section>

              <section className="p-8 bg-stone-900/40 rounded-[40px] border border-stone-800 space-y-4 shadow-inner">
                <h5 className="text-[9px] font-cinzel text-stone-500 tracking-[0.4em] uppercase font-black">Ancestral Remedy Path</h5>
                <p className="text-stone-300 font-playfair italic text-lg leading-relaxed">{diagnosis.remedyPath}</p>
              </section>

              <section className="space-y-6 pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-amber-900/20" />
                  <span className="text-[8px] font-cinzel text-amber-500 tracking-[0.5em] uppercase font-black">Targeted Prayer</span>
                  <div className="h-px flex-1 bg-amber-900/20" />
                </div>
                <p className="text-stone-100 font-playfair text-xl text-center leading-[2] italic px-4">
                  "{diagnosis.prayer}"
                </p>
              </section>
            </div>

            <footer className="pt-10 flex flex-col gap-4">
               <button 
                onClick={() => setDiagnosis(null)}
                className="py-4 text-stone-600 hover:text-amber-500 font-cinzel text-[10px] tracking-[0.4em] uppercase transition-all"
               >
                 Consult Again
               </button>
               <button 
                onClick={onClose}
                className="w-full py-6 bg-stone-100 text-stone-950 font-cinzel text-xs font-black rounded-3xl uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all"
               >
                 Seal & Return
               </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
