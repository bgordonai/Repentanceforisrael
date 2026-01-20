
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getSacredCounsel } from '../services/geminiService';
import { Message, Tribe, Gender, LifeStage } from '../types';
import { getDailyLawProtocol } from '../services/lawActivationEngine';
import { MITZVOT } from '../constants';
import { DreamGate } from './DreamGate';

interface TheWatchmanProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: LifeStage, score: number, age: number };
  onClose?: () => void;
}

export const TheWatchman: React.FC<TheWatchmanProps> = ({ userContext, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Peace be unto you, ${userContext.gender === Gender.MALE ? 'Son' : 'Daughter'} of ${userContext.tribe}. I am The Watchman. What specific burden or problem do you seek counsel and Targeted Prayer for today? #APTTMH.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDreamGate, setShowDreamGate] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const activeLaws = [protocol.primaryLaw, ...protocol.supportingLaws];
    const response = await getSacredCounsel(userMsg, messages, { ...userContext, activeLaws });
    setMessages(prev => [...prev, { role: 'model', text: response || "The scrolls are silent. Seek YAHAWAH's face." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-3xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="flex flex-col w-full max-w-lg h-[80vh] bg-stone-950 border-2 border-orange-900/40 rounded-[60px] overflow-hidden shadow-[0_0_100px_rgba(251,146,60,0.2)] relative">
        <header className="bg-orange-500/5 p-8 border-b border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full border-2 border-orange-500/60 flex items-center justify-center text-orange-500 text-3xl font-black bg-stone-900 shadow-gold shadow-orange-500/30">W</div>
            <div>
              <h3 className="font-cinzel text-orange-500 font-black tracking-[0.2em] text-lg uppercase drop-shadow-lg">THE WATCHMAN</h3>
              <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Sacred Counsel & Targeted Prayer</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDreamGate(true)}
              className="w-12 h-12 flex items-center justify-center bg-indigo-500/10 border border-indigo-900/30 rounded-2xl hover:bg-indigo-500/20 transition-all shadow-lg"
              title="Dream Interpretation"
            >
              <span className="text-xl">🌙</span>
            </button>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-stone-900 border border-white/10 rounded-2xl text-stone-400 hover:text-white transition-all shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-gradient-to-b from-stone-950 to-black">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-slideUp`}>
              <div className={`max-w-[90%] p-8 rounded-[40px] text-base leading-relaxed border shadow-2xl ${
                m.role === 'user' 
                ? 'bg-stone-900 text-stone-100 border-white/10 rounded-br-none' 
                : 'bg-black/60 text-stone-200 border-orange-900/20 rounded-bl-none font-playfair italic whitespace-pre-wrap'
              }`}>
                {m.text}
              </div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-stone-700 mt-2 px-4">
                {m.role === 'user' ? `Testimony of ${userContext.tribe}` : 'The Watchman\'s Voice'}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 p-6 bg-orange-500/5 rounded-[30px] border border-orange-900/20 animate-pulse items-center self-start">
               <div className="flex gap-1">
                 <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
               <span className="text-[10px] font-cinzel text-orange-500/80 tracking-widest uppercase font-black ml-2">Consulting the Urim & Thummim...</span>
            </div>
          )}
        </div>

        <div className="p-8 bg-stone-900/60 border-t border-white/5 flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Declare thy burden to the Watchman..."
            className="flex-1 bg-black/60 border border-white/10 rounded-[25px] px-8 py-6 text-sm focus:outline-none focus:border-orange-500/50 text-stone-100 font-cinzel tracking-[0.2em] shadow-inner"
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()} 
            className="bg-orange-500 text-stone-950 w-20 h-20 flex items-center justify-center rounded-[30px] shadow-gold hover:scale-105 active:scale-95 transition-all shadow-orange-500/40 disabled:opacity-30 disabled:grayscale"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        {showDreamGate && (
          <div className="fixed inset-0 z-[210]">
            <DreamGate userContext={userContext} onClose={() => setShowDreamGate(false)} />
          </div>
        )}
      </div>
    </div>
  );
};
