
import React, { useState } from 'react';
import { TRIBAL_MANIFESTO } from '../constants';
import { Tribe, Gender, LifeStage } from '../types';

interface OnboardingProps {
  onComplete: (tribe: Tribe, gender: Gender, lifeStage: LifeStage, age: number, initialScore: number) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedLifeStage, setSelectedLifeStage] = useState<LifeStage | null>(null);
  const [age, setAge] = useState<number>(33);
  const [acknowledged, setAcknowledged] = useState(false);

  const tribes = Object.entries(TRIBAL_MANIFESTO);

  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center p-10 text-center animate-fadeIn">
        <div className="mb-12">
          <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.8em] uppercase mb-4 block">Seal of Purity</span>
          <h2 className="font-cinzel text-2xl text-stone-100 tracking-widest uppercase mb-12">Do you acknowledge YAHAWAH as the only True Power?</h2>
          
          <button 
            onClick={() => setAcknowledged(true)}
            className={`w-full py-8 border-2 rounded-3xl font-cinzel text-sm tracking-[0.5em] uppercase transition-all ${
              acknowledged ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-stone-900 text-stone-600'
            }`}
          >
            I ACKNOWLEDGE YAHAWAH
          </button>
        </div>
        
        <button 
          onClick={() => acknowledged && setStep(2)}
          disabled={!acknowledged}
          className={`w-full py-6 font-cinzel text-xs font-black tracking-[0.4em] rounded-3xl transition-all ${
            acknowledged ? 'bg-amber-500 text-stone-950 shadow-gold' : 'bg-stone-900 text-stone-800'
          }`}
        >
          APPROACH THE GATE
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="h-screen bg-[#0c0a09] flex flex-col animate-fadeIn">
        <header className="p-10 border-b border-stone-900 text-center">
          <h2 className="font-cinzel text-lg text-amber-500 tracking-widest uppercase">Select Thy Gate</h2>
        </header>
        <div className="flex-1 overflow-x-auto snap-x snap-mandatory flex scrollbar-hide">
          {tribes.map(([tribe, info]) => (
            <div key={tribe} className="min-w-full h-full snap-start flex items-center justify-center p-10">
              <div className="w-full max-w-sm border-[12px] border-amber-900/10 rounded-[60px] p-10 space-y-8 bg-stone-950/40 relative shadow-2xl">
                <div className="text-8xl text-center animate-pulse">{info.symbol}</div>
                <div className="text-center space-y-2">
                  <h3 className="font-cinzel text-3xl font-black text-stone-100 tracking-widest uppercase">{tribe}</h3>
                  <p className="text-amber-500/70 text-[10px] font-cinzel tracking-widest uppercase">{info.motto}</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-stone-900/50 p-4 rounded-2xl">
                    <span className="text-[8px] font-cinzel text-stone-500 tracking-widest block mb-1 uppercase">TERRITORY</span>
                    <span className="text-[10px] text-amber-100 font-bold uppercase">{info.territory}</span>
                  </div>
                  <p className="text-stone-500 font-playfair italic text-sm text-center">"{info.description}"</p>
                </div>
                <button 
                  onClick={() => { setSelectedTribe(tribe as Tribe); setStep(3); }}
                  className="w-full py-6 bg-amber-500 text-stone-950 font-cinzel text-xs font-black rounded-3xl uppercase tracking-widest shadow-gold active:scale-95 transition-all"
                >
                  Enter Gate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center p-10 animate-fadeIn text-center">
        <h2 className="font-cinzel text-2xl text-stone-100 tracking-widest mb-12 uppercase">The Watch of Identity</h2>
        <div className="grid gap-4 w-full max-w-sm">
          {Object.values(Gender).map(g => (
            <button key={g} onClick={() => setSelectedGender(g)} className={`p-6 rounded-3xl border-2 font-cinzel text-sm tracking-widest uppercase transition-all ${selectedGender === g ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-stone-900 text-stone-600'}`}>{g}</button>
          ))}
        </div>
        
        <div className="mt-12 w-full max-w-sm">
          <span className="text-[10px] font-cinzel text-stone-500 tracking-[0.4em] uppercase block mb-4">Years in Exile (Age)</span>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-6 py-4 text-center font-cinzel text-amber-500 tracking-widest text-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <button onClick={() => selectedGender && setStep(4)} className={`mt-16 w-full py-6 rounded-3xl font-cinzel text-xs tracking-widest uppercase font-black transition-all ${selectedGender ? 'bg-amber-500 text-stone-950 shadow-gold active:scale-95' : 'bg-stone-900 text-stone-700'}`}>Next Watch</button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center p-10 animate-fadeIn text-center">
        <h2 className="font-cinzel text-2xl text-stone-100 tracking-widest mb-12 uppercase">Stage of Life</h2>
        <div className="grid gap-4 w-full max-w-sm">
          {Object.values(LifeStage).map(l => (
            <button key={l} onClick={() => setSelectedLifeStage(l)} className={`p-6 rounded-3xl border-2 font-cinzel text-sm tracking-widest uppercase transition-all ${selectedLifeStage === l ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-stone-900 text-stone-600'}`}>{l}</button>
          ))}
        </div>
        <button 
          onClick={() => selectedTribe && selectedGender && selectedLifeStage && onComplete(selectedTribe, selectedGender, selectedLifeStage, age, 10)} 
          className={`mt-16 w-full py-6 rounded-3xl font-cinzel text-xs tracking-widest uppercase font-black transition-all ${selectedLifeStage ? 'bg-amber-500 text-stone-950 shadow-gold active:scale-95' : 'bg-stone-900 text-stone-700'}`}
        >
          Seal Identity
        </button>
      </div>
    );
  }

  return null;
};
