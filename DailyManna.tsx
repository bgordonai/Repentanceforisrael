import React, { useState, useMemo, useEffect } from 'react';
import { DAILY_MANNA } from '../constants';
import { MannaSlot, Tribe, Gender } from '../types';
import { generateMannaInsight } from '../services/geminiService';

interface DailyMannaProps {
  userContext?: { tribe: Tribe, gender: Gender };
  onCommit?: (points: number) => void;
}

export const DailyManna: React.FC<DailyMannaProps> = ({ userContext, onCommit }) => {
  const [activeSlot, setActiveSlot] = useState<MannaSlot>(MannaSlot.MORNING);
  const [sealedSlots, setSealedSlots] = useState<MannaSlot[]>([]);
  const [isSealing, setIsSealing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  
  // Local manna data that can be overwritten by regeneration
  const [mannaData, setMannaData] = useState<Record<MannaSlot, { scripture: string, prayer: string }>>(() => {
    const initial: any = {};
    DAILY_MANNA.forEach(m => {
      initial[m.slot] = { scripture: m.scripture, prayer: m.prayer };
    });
    return initial;
  });

  const handleSeal = () => {
    if (sealedSlots.includes(activeSlot) || isSealing) return;
    setIsSealing(true);
    if ('vibrate' in navigator) navigator.vibrate([10, 50, 10]);
    setTimeout(() => {
      setSealedSlots(prev => [...prev, activeSlot]);
      setIsSealing(false);
      if (onCommit) onCommit(15);
    }, 1500);
  };

  const handleRegenerate = async () => {
    if (!userContext || isRegenerating) return;
    setIsRegenerating(true);
    const result = await generateMannaInsight(activeSlot, userContext);
    if (result) {
      setMannaData(prev => ({ ...prev, [activeSlot]: result }));
    }
    setIsRegenerating(false);
  };

  const current = mannaData[activeSlot];

  const slotTheme = useMemo(() => {
    switch (activeSlot) {
      case MannaSlot.MORNING: return { color: 'text-amber-400', aura: 'aura-pulse', bg: 'bg-amber-500/5', icon: '🌅', label: 'The Morning Watch' };
      case MannaSlot.AFTERNOON: return { color: 'text-orange-500', aura: 'aura-shimmer', bg: 'bg-orange-500/5', icon: '☀️', label: 'The Midday Duty' };
      case MannaSlot.NIGHT: return { color: 'text-indigo-400', aura: 'aura-swirl', bg: 'bg-indigo-500/5', icon: '🌙', label: 'The Evening Seal' };
      default: return { color: 'text-amber-500', aura: '', bg: 'bg-stone-900', icon: '⚖️', label: 'Sacred Alignment' };
    }
  }, [activeSlot]);

  const isAlreadySealed = sealedSlots.includes(activeSlot);

  return (
    <div className={`relative bg-stone-950/80 border border-stone-900 rounded-[50px] overflow-hidden p-8 shadow-2xl transition-all duration-1000 ${slotTheme.bg}`}>
      <div className={`absolute inset-0 opacity-15 pointer-events-none ${slotTheme.aura}`} style={{ backgroundColor: 'currentColor' }}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between gap-3 mb-10 bg-stone-900/40 p-1 rounded-[25px]">
          {Object.values(MannaSlot).map((slot) => (
            <button
              key={slot}
              onClick={() => setActiveSlot(slot)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-[20px] transition-all duration-500 ${activeSlot === slot ? 'bg-amber-500 text-stone-950 shadow-gold scale-[1.03] z-10' : 'text-stone-600 hover:text-stone-400'}`}
            >
              <span className={`text-xl ${activeSlot === slot ? 'scale-125' : 'opacity-30'}`}>{slot === MannaSlot.MORNING ? '🌅' : slot === MannaSlot.AFTERNOON ? '☀️' : '🌙'}</span>
              <span className="text-[7px] font-cinzel font-black tracking-[0.2em] uppercase">{sealedSlots.includes(slot) ? 'SEALED' : slot.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[220px] flex flex-col items-center text-center space-y-8 py-4">
          <div className="space-y-3">
             <div className="text-4xl">{slotTheme.icon}</div>
             <span className={`text-[10px] font-cinzel tracking-[0.6em] uppercase font-black block ${slotTheme.color}`}>{slotTheme.label}</span>
          </div>

          <p className="font-playfair italic text-xl text-stone-100 leading-relaxed px-4 max-w-sm mx-auto">"{current?.prayer}"</p>

          <div className="flex items-center gap-4 w-full px-6">
            <div className="h-px flex-1 bg-stone-900/50"></div>
            <p className="font-mono text-[9px] text-stone-600 uppercase tracking-widest font-black">{current?.scripture}</p>
            <div className="h-px flex-1 bg-stone-900/50"></div>
          </div>
          
          <button 
            onClick={handleRegenerate}
            disabled={isRegenerating || isAlreadySealed}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800 text-[8px] font-cinzel tracking-widest uppercase text-stone-600 hover:text-amber-500 transition-all ${isRegenerating ? 'animate-pulse' : ''}`}
          >
            <span className={isRegenerating ? 'animate-spin' : ''}>🔄</span>
            {isRegenerating ? 'Consulting YAHAWAH...' : 'Seek Fresh Manna'}
          </button>
        </div>
        
        <div className="mt-8">
          <button 
            onClick={handleSeal}
            disabled={isAlreadySealed || isSealing}
            className={`w-full py-6 font-cinzel text-[11px] tracking-[0.5em] rounded-3xl transition-all ${isAlreadySealed ? 'bg-stone-900 text-stone-700' : isSealing ? 'bg-amber-500/50 animate-pulse' : 'bg-amber-500 text-stone-950 shadow-gold active:scale-95 font-black'}`}
          >
            {isAlreadySealed ? 'WATCH SEALED ✅' : isSealing ? 'SEALING RITUAL...' : 'COMPLETE THE WATCH'}
          </button>
        </div>
      </div>
    </div>
  );
};