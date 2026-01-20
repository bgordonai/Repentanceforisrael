
import React, { useState, useRef } from 'react';
import { LORDS_PRAYER } from '../constants';
import { chantScripture } from '../services/geminiService';

export const LordsPrayer: React.FC = () => {
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [showHebrew, setShowHebrew] = useState(false);
  const [isChanting, setIsChanting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const copyPrayer = () => {
    const text = showHebrew ? LORDS_PRAYER.transliteration : LORDS_PRAYER.text;
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const handleChant = async () => {
    if (isChanting) return;
    setIsChanting(true);
    const text = showHebrew ? LORDS_PRAYER.transliteration : LORDS_PRAYER.text;
    const audioData = await chantScripture(text, showHebrew ? 'Hebrew' : 'English');
    
    if (audioData) {
      const audioBlob = new Blob([Uint8Array.from(atob(audioData), c => c.charCodeAt(0))], { type: 'audio/pcm' });
      // Since it's raw PCM from Gemini, we'd normally use AudioContext, but for simple playback we'll try a base64 audio/wav wrapper or similar if possible. 
      // Actually, per guidelines, let's use the provided decoding logic if we were in a Live session, but for static TTS, we'll use a simpler approach for the UI:
      const url = `data:audio/wav;base64,${audioData}`; // Assuming the model returns something playable or we wrap it.
      // Guideline check: The bytes are raw PCM. We need to decode it.
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const binary = atob(audioData);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const frameCount = dataInt16.length;
      const buffer = audioCtx.createBuffer(1, frameCount, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }
      
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsChanting(false);
      source.start();
    } else {
      setIsChanting(false);
    }
  };

  return (
    <div className="bg-stone-950 border-2 border-amber-900/20 p-10 rounded-[60px] relative overflow-hidden group shadow-[0_30px_70px_rgba(0,0,0,0.8)] animate-fadeIn mx-2">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-amber-500 pointer-events-none scale-[3] group-hover:rotate-12 transition-transform duration-1000">🙏</div>
      <div className="god-ray opacity-5"></div>
      
      <div className="relative z-10 space-y-10 text-center">
        <header className="space-y-4">
          <div className="flex justify-center gap-2 mb-2">
            {[1,2,3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${isChanting ? 'bg-amber-500 animate-bounce' : 'bg-amber-900/50'}`} style={{ animationDelay: `${i * 200}ms` }}></div>)}
          </div>
          <span className="text-[10px] font-cinzel text-amber-500 tracking-[0.8em] uppercase font-black">Sacred Recitation</span>
          <h3 className="font-cinzel text-2xl font-black text-stone-100 uppercase tracking-[0.3em]">{LORDS_PRAYER.title}</h3>
          <p className="text-[10px] font-mono text-stone-600 tracking-[0.4em] font-bold uppercase">— {LORDS_PRAYER.scripture}</p>
        </header>

        <div className="flex bg-stone-900/40 p-1 rounded-2xl border border-stone-800 mx-auto max-w-xs shadow-inner">
          <button 
            onClick={() => { setShowHebrew(false); setIsChanting(false); }}
            className={`flex-1 py-2 font-cinzel text-[8px] tracking-widest uppercase rounded-xl transition-all ${!showHebrew ? 'bg-amber-500 text-stone-950 font-black' : 'text-stone-500'}`}
          >
            English
          </button>
          <button 
            onClick={() => { setShowHebrew(true); setIsChanting(false); }}
            className={`flex-1 py-2 font-cinzel text-[8px] tracking-widest uppercase rounded-xl transition-all ${showHebrew ? 'bg-amber-500 text-stone-950 font-black' : 'text-stone-500'}`}
          >
            Hebrew
          </button>
        </div>

        <div className="py-12 border-y border-stone-900/50 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-900/20 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-900/20 rounded-br-3xl"></div>
          
          <p className={`text-stone-100 font-playfair italic leading-[2.4] tracking-wide transition-all duration-700 transform ${showHebrew ? 'text-lg text-amber-100' : 'text-base'} ${isChanting ? 'opacity-100' : 'opacity-80'}`}>
            {showHebrew ? LORDS_PRAYER.transliteration : LORDS_PRAYER.text}
          </p>

          {isChanting && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex gap-1 h-20 items-end">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 bg-amber-500/20 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDuration: `${0.5 + Math.random()}s` }}></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleChant}
            disabled={isChanting}
            className={`w-full py-6 font-cinzel text-xs font-black tracking-[0.5em] rounded-3xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${isChanting ? 'bg-amber-900/20 text-amber-500' : 'bg-amber-500 text-stone-950 shadow-gold'}`}
          >
            <span>{isChanting ? '🎶 CANTILLATING...' : '🔥 LISTEN TO THE CHANT'}</span>
          </button>
          
          <button 
            onClick={copyPrayer}
            className={`w-full py-4 font-cinzel text-[9px] tracking-[0.4em] rounded-2xl transition-all uppercase ${
              copyFeedback ? 'text-amber-500' : 'text-stone-600 hover:text-stone-400'
            }`}
          >
            {copyFeedback ? 'WORD SEALED IN HEART' : 'SEAL TO MEMORY'}
          </button>
        </div>
      </div>
    </div>
  );
};
