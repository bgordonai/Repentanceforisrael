
import React, { useState } from 'react';
import { Tribe, Gender, LifeStage, CodexRevelation } from '../types';
import { getCodexRevelation } from '../services/geminiService';

interface HerbCodexProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: LifeStage };
}

export const HerbCodex: React.FC<HerbCodexProps> = ({ userContext }) => {
  const [inquiry, setInquiry] = useState('');
  const [inquiryType, setInquiryType] = useState<'Ailment' | 'Law' | 'Feast' | 'Emotion'>('Ailment');
  const [revelation, setRevelation] = useState<CodexRevelation | null>(null);
  const [isConsulting, setIsConsulting] = useState(false);

  const handleConsultArchive = async (overrideInquiry?: string) => {
    const finalInquiry = overrideInquiry || inquiry;
    // Note: inquiry is now optional. If empty, AI generates a general category revelation.
    setIsConsulting(true);
    setRevelation(null);
    
    const contextStr = finalInquiry ? `${inquiryType}: ${finalInquiry}` : `General ${inquiryType} Alignment for the Tribe`;
    const result = await getCodexRevelation(contextStr, userContext);
    setRevelation(result);
    setIsConsulting(false);
  };

  const inquiryTypes = [
    { id: 'Ailment', icon: '🌿', color: 'text-emerald-500', suggestions: ['Liver Restoration', 'Blood Purity', 'Vitality', 'Joint Ease'] },
    { id: 'Law', icon: '⚖️', color: 'text-amber-500', suggestions: ['Dietary Seal', 'Sabbath Duty', 'Speech Restraint', 'Modesty'] },
    { id: 'Feast', icon: '🌕', color: 'text-indigo-400', suggestions: ['New Moon Watch', 'Passover Prep', 'Tabernacles', 'Purim Joy'] },
    { id: 'Emotion', icon: '🔥', color: 'text-red-500', suggestions: ['Spirit of Heaviness', 'Righteous Anger', 'Peace of Heart', 'Courage'] }
  ];

  const currentTypeData = inquiryTypes.find(t => t.id === inquiryType)!;

  return (
    <div className="h-full flex flex-col space-y-6 animate-fadeIn relative pb-4">
      <header className="text-center space-y-1 flex-none">
        <h2 className="font-cinzel text-2xl text-amber-500 font-black tracking-[0.2em] uppercase">Codex Generator</h2>
        <p className="text-[9px] text-stone-600 font-cinzel tracking-[0.4em] uppercase italic">One-Tap Prophetic Alignment</p>
      </header>

      {!revelation ? (
        <div className="flex-1 flex flex-col justify-between space-y-6 animate-fadeIn px-2">
          {/* CATEGORY GRID: ONE TAP SELECTION */}
          <div className="grid grid-cols-2 gap-3">
            {inquiryTypes.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setInquiryType(type.id as any);
                  setInquiry(''); // Clear if switching
                }}
                className={`flex items-center gap-4 p-4 rounded-[25px] border transition-all duration-300 ${
                  inquiryType === type.id 
                    ? `bg-stone-900 border-amber-500 shadow-gold scale-[1.02]` 
                    : 'bg-stone-950/40 border-stone-900 opacity-60 grayscale'
                }`}
              >
                <span className={`text-2xl ${inquiryType === type.id ? 'animate-pulse' : ''}`}>{type.icon}</span>
                <div className="text-left">
                  <span className={`text-[9px] font-cinzel tracking-[0.2em] uppercase font-black block ${inquiryType === type.id ? type.color : 'text-stone-500'}`}>
                    {type.id}
                  </span>
                  <span className="text-[7px] text-stone-700 font-mono uppercase">Unseal Records</span>
                </div>
              </button>
            ))}
          </div>

          {/* SUGGESTION CHIPS: ONE TAP INQUIRY */}
          <div className="space-y-3">
             <span className="text-[8px] font-cinzel text-stone-700 tracking-[0.3em] uppercase block font-black text-center italic">Suggested Focus</span>
             <div className="flex flex-wrap justify-center gap-2">
               {currentTypeData.suggestions.map(s => (
                 <button
                   key={s}
                   onClick={() => {
                     setInquiry(s);
                     handleConsultArchive(s);
                   }}
                   className="px-4 py-2 bg-stone-900/40 border border-stone-800 rounded-full text-[8px] font-cinzel tracking-widest uppercase text-stone-500 hover:text-amber-500 hover:border-amber-500/50 transition-all active:scale-95"
                 >
                   {s}
                 </button>
               ))}
             </div>
          </div>

          {/* OPTIONAL DEEP INQUIRY */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder={`(Optional) Recount thy specific ${inquiryType.toLowerCase()} burden...`}
                className="w-full bg-stone-950/80 border border-stone-900 rounded-[35px] p-6 text-stone-300 font-playfair italic text-lg focus:outline-none focus:border-amber-500/40 min-h-[140px] shadow-inner leading-relaxed resize-none placeholder:text-stone-800"
              />
              <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none text-4xl">🕊️</div>
            </div>
            
            <button
              onClick={() => handleConsultArchive()}
              disabled={isConsulting}
              className={`w-full py-6 font-cinzel text-xs font-black tracking-[0.6em] rounded-3xl transition-all ${
                isConsulting ? 'bg-amber-900/20 text-amber-500/30 animate-pulse' : 'bg-amber-500 text-stone-950 shadow-gold active:scale-95'
              } uppercase`}
            >
              {isConsulting ? 'Consulting the Oracle...' : inquiry.trim() ? `Analyze ${inquiryType}` : `Unseal ${inquiryType} Revelation`}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center animate-slideUp">
          <div className="w-full bg-stone-950 border-2 border-amber-900/20 rounded-[50px] p-10 space-y-8 relative overflow-hidden shadow-2xl h-[560px] flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20" />
            
            <header className="text-center space-y-2">
              <div className="flex justify-center mb-1">
                <span className={`text-4xl filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]`}>{currentTypeData.icon}</span>
              </div>
              <span className={`text-[9px] font-cinzel tracking-[0.6em] uppercase font-black block ${currentTypeData.color}`}>The Record is Open</span>
              <h3 className="font-playfair text-2xl font-black text-stone-100 italic leading-tight">"{revelation.title}"</h3>
            </header>

            <div className="flex-1 flex flex-col justify-center space-y-6 overflow-hidden">
              <section className="space-y-1">
                <h5 className="text-[8px] font-cinzel text-stone-700 tracking-[0.4em] uppercase font-black">Prophetic Insight</h5>
                <p className="text-lg text-stone-200 font-playfair italic leading-snug">{revelation.focus}</p>
              </section>

              <div className="h-px w-full bg-stone-900/50" />

              <section className="space-y-3">
                <h5 className="text-[8px] font-cinzel text-amber-900 tracking-[0.4em] uppercase font-black">What You Learn</h5>
                <p className="text-[12px] text-stone-300 font-inter leading-relaxed line-clamp-4">{revelation.whatYouLearn}</p>
              </section>

              <section className="p-5 bg-stone-900/40 rounded-[30px] border border-stone-800/50 shadow-inner">
                <h5 className="text-[8px] font-cinzel text-stone-600 tracking-[0.4em] uppercase font-black mb-1">Covenant Purpose</h5>
                <p className="text-stone-400 font-mono text-[9px] tracking-tight uppercase leading-relaxed line-clamp-2">
                  {revelation.covenantPurpose}
                </p>
              </section>

              <div className="text-center">
                <span className="text-[8px] font-mono text-amber-900 tracking-[0.5em] uppercase font-black">WITNESS: {revelation.scriptureRoot}</span>
              </div>
            </div>

            <footer className="pt-4 border-t border-stone-900/50">
               <button 
                onClick={() => setRevelation(null)}
                className="w-full py-5 bg-stone-100 text-stone-950 font-cinzel text-xs font-black rounded-3xl tracking-[0.4em] uppercase shadow-2xl active:scale-95 transition-all"
               >
                 Seal & Meditate
               </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
