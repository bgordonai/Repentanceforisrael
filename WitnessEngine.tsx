
import React, { useState } from 'react';
import { WitnessShift, WitnessEase, WitnessRecord, Tribe } from '../types';
import { generatePropheticArt } from '../services/geminiService';

interface WitnessEngineProps {
  onComplete: (record: WitnessRecord) => void;
  onCancel: () => void;
  tribe: Tribe;
}

export const WitnessEngine: React.FC<WitnessEngineProps> = ({ onComplete, onCancel, tribe }) => {
  const [shift, setShift] = useState<WitnessShift | null>(null);
  const [ease, setEase] = useState<WitnessEase | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!shift || !ease) return;
    const record: WitnessRecord = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      shift,
      ease,
      note: note.trim() || undefined,
      scriptureRef: 'Ecclesiastes 12:13' // Default for now
    };
    onComplete(record);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col p-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <h2 className="font-cinzel text-amber-500 tracking-widest text-lg">RECORD WITNESS</h2>
        <button onClick={onCancel} className="text-stone-500 font-cinzel text-xs">CLOSE</button>
      </div>

      <div className="space-y-10 overflow-y-auto pb-20 scrollbar-hide">
        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">What shifted?</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(WitnessShift).map((s) => (
              <button
                key={s}
                onClick={() => setShift(s)}
                className={`p-4 rounded-xl border font-cinzel text-[10px] tracking-widest uppercase transition-all ${
                  shift === s ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-gold' : 'border-stone-900 text-stone-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">Obedience Quality</h3>
          <div className="grid gap-3">
            {Object.values(WitnessEase).map((e) => (
              <button
                key={e}
                onClick={() => setEase(e)}
                className={`p-4 rounded-xl border font-cinzel text-[10px] tracking-widest uppercase text-left transition-all ${
                  ease === e ? 'border-amber-500 bg-amber-500/10 text-amber-500 shadow-gold' : 'border-stone-900 text-stone-600'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-cinzel text-xs text-stone-500 tracking-widest uppercase mb-4">Note (Prophetic Insight)</h3>
          <textarea
            maxLength={280}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Record thy witness in brief... The Altar remembers."
            className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 text-stone-300 focus:outline-none focus:border-amber-500 min-h-[140px] text-lg italic font-playfair shadow-inner leading-relaxed"
          />
        </section>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={handleSubmit}
          disabled={!shift || !ease}
          className={`w-full py-6 rounded-3xl font-cinzel text-xs font-black tracking-[0.5em] transition-all ${
            shift && ease ? 'bg-amber-500 text-stone-950 shadow-gold active:scale-95' : 'bg-stone-900 text-stone-800'
          } uppercase`}
        >
          SUBMIT WITNESS
        </button>
      </div>
    </div>
  );
};

export const WitnessCard: React.FC<{ record: WitnessRecord; onDismiss: () => void; tribe: Tribe }> = ({ record, onDismiss, tribe }) => {
  const [illumination, setIllumination] = useState<string | null>(null);
  const [isIlluminating, setIsIlluminating] = useState(false);

  const handleIlluminate = async () => {
    setIsIlluminating(true);
    const text = record.note || `Observed shift in ${record.shift} through ${record.ease}.`;
    const imageUrl = await generatePropheticArt(text, tribe);
    setIllumination(imageUrl);
    setIsIlluminating(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-6 backdrop-blur-xl">
      <div className="bg-[#0c0a09] border border-amber-900/30 w-full max-w-sm rounded-[60px] overflow-hidden shadow-2xl animate-scaleIn relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-40"></div>
        
        <div className="p-10 text-center space-y-8">
          {illumination ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="aspect-square w-full rounded-[40px] overflow-hidden border-2 border-amber-900/30 shadow-gold relative group">
                <img src={illumination} alt="Prophetic Illumination" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              </div>
              <span className="text-[9px] font-cinzel text-amber-500 tracking-[0.6em] uppercase font-black">Heavenly Witness Sealed</span>
            </div>
          ) : (
             <div className="flex justify-center mb-2">
              <div className="w-16 h-16 border-2 border-amber-900/20 rounded-full flex items-center justify-center text-amber-500/30 text-3xl">
                📜
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[10px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black">Witness of Obedience</span>
            <h3 className="font-cinzel text-amber-500 text-2xl font-black tracking-widest">{record.shift.toUpperCase()} ALIGNMENT</h3>
          </div>
          
          <div className="space-y-4 py-8 border-y border-stone-900 relative">
            <p className="text-stone-200 font-playfair italic text-lg leading-relaxed px-2">
              {record.note ? `"${record.note}"` : `The remnant acknowledges a shift in ${record.shift.toLowerCase()}.`}
            </p>
            <p className="font-mono text-[9px] text-stone-600 uppercase tracking-widest font-black">— {record.scriptureRef}</p>
          </div>

          {!illumination && (
            <button 
              onClick={handleIlluminate}
              disabled={isIlluminating}
              className={`w-full py-5 border border-amber-500/30 text-amber-500 font-cinzel text-[10px] tracking-[0.4em] rounded-2xl hover:bg-amber-500/10 transition-all uppercase flex items-center justify-center gap-3 ${isIlluminating ? 'animate-pulse' : ''}`}
            >
              {isIlluminating ? 'Decoding Symbols...' : '✨ Illuminate Testimony'}
            </button>
          )}
          
          <div className="pt-4 space-y-3">
            <button 
              onClick={onDismiss}
              className="w-full py-6 bg-stone-100 text-stone-950 font-cinzel text-xs font-black rounded-3xl tracking-[0.4em] uppercase shadow-2xl active:scale-95 transition-all"
            >
              Return to Altar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
