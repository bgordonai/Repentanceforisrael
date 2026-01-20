
import React, { useState } from 'react';
import { VOCAB_CARDS } from '../constants';
import { VocabCard, Tribe } from '../types';
import { chantScripture, generatePropheticArt } from '../services/geminiService';

export const VocabularyCards: React.FC<{ userTribe?: Tribe }> = ({ userTribe = Tribe.JUDAH }) => {
  const [filter, setFilter] = useState<'All' | 'Hebrew' | 'Greek'>('All');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isChanting, setIsChanting] = useState<string | null>(null);
  const [illuminatedArt, setIlluminatedArt] = useState<Record<string, string>>({});
  const [isIlluminating, setIsIlluminating] = useState<string | null>(null);

  const filtered = VOCAB_CARDS.filter(card => filter === 'All' || card.language === filter);

  const copyToClipboard = (card: VocabCard) => {
    const text = `${card.word} (${card.original})\nLanguage: ${card.language}\nRoot: ${card.rootMeaning}\nCovenant: ${card.covenantMeaning}\nScripture: ${card.scripture}`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(card.word);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleIlluminate = async (card: VocabCard) => {
    if (isIlluminating) return;
    setIsIlluminating(card.word);
    
    const prompt = `A prophetic visualization of the Hebrew word "${card.word}" (${card.original}). Theme: ${card.covenantMeaning}. Rooted in ${card.scripture}. High spiritual contrast, gold leaf, ancient manuscript style.`;
    const imageUrl = await generatePropheticArt(prompt, userTribe);
    
    if (imageUrl) {
      setIlluminatedArt(prev => ({ ...prev, [card.word]: imageUrl }));
    }
    setIsIlluminating(null);
  };

  const handleChant = async (card: VocabCard) => {
    if (isChanting) return;
    setIsChanting(card.word);
    
    const audioData = await chantScripture(card.original, 'Hebrew');
    
    if (audioData) {
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
      source.onended = () => setIsChanting(null);
      source.start();
    } else {
      setIsChanting(null);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-32">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-[0.2em] uppercase">Sacred Lexicon</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.5em] uppercase italic">Restoring the Pure Tongue for the Remnant</p>
      </header>

      <div className="flex bg-stone-900/40 p-1 rounded-2xl mx-4 border border-stone-800">
        {['All', 'Hebrew', 'Greek'].map(lang => (
          <button
            key={lang}
            onClick={() => setFilter(lang as any)}
            className={`flex-1 py-3 font-cinzel text-[10px] tracking-widest uppercase rounded-xl transition-all ${
              filter === lang ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'text-stone-500'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="grid gap-12 px-4">
        {filtered.map((card) => (
          <div key={card.word} className="bg-stone-950 border border-stone-900 rounded-[50px] p-10 space-y-10 relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            {illuminatedArt[card.word] ? (
              <div className="absolute inset-0 z-0 opacity-20">
                <img src={illuminatedArt[card.word]} alt={card.word} className="w-full h-full object-cover scale-110 blur-sm" />
              </div>
            ) : (
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-[150px] pointer-events-none font-serif leading-none group-hover:scale-110 transition-transform">
                {card.original}
              </div>
            )}
            
            <header className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <span className="text-[10px] font-cinzel text-amber-900 tracking-[0.4em] uppercase font-black">{card.language} Protocol</span>
                <div className="flex items-baseline gap-6 flex-wrap">
                  <h3 className="font-playfair text-5xl font-black text-stone-100 leading-none">{card.word}</h3>
                  <span className="text-5xl text-amber-500 font-serif drop-shadow-lg">{card.original}</span>
                </div>
                <p className="text-xs font-mono text-stone-500 tracking-widest uppercase italic">[{card.transliteration}]</p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => copyToClipboard(card)}
                  className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-amber-500 transition-all active:scale-90 shadow-inner"
                >
                  {copyFeedback === card.word ? '✅' : '📜'}
                </button>
                <button 
                  onClick={() => handleChant(card)}
                  disabled={isChanting !== null}
                  className={`w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-500 transition-all active:scale-90 shadow-inner ${isChanting === card.word ? 'animate-pulse bg-amber-500/10' : ''}`}
                >
                   {isChanting === card.word ? '🎶' : '🔊'}
                </button>
                <button 
                  onClick={() => handleIlluminate(card)}
                  disabled={isIlluminating !== null}
                  className={`w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-indigo-400 transition-all active:scale-90 shadow-inner ${isIlluminating === card.word ? 'animate-pulse bg-indigo-500/10' : ''}`}
                >
                   {isIlluminating === card.word ? '✨' : '🎨'}
                </button>
              </div>
            </header>

            <div className="space-y-10 relative z-10">
              <section className="space-y-3">
                <h5 className="text-[9px] text-stone-600 uppercase font-cinzel font-black tracking-[0.4em]">Root Essence</h5>
                <p className="text-2xl text-stone-100 font-playfair italic leading-relaxed">"{card.rootMeaning}"</p>
              </section>

              <section className="p-10 bg-stone-900/30 rounded-[45px] border border-stone-800 shadow-inner space-y-6">
                <div>
                  <h5 className="text-[9px] font-cinzel font-black mb-4 tracking-[0.4em] uppercase text-amber-500">Covenantal Function</h5>
                  <p className="text-base text-stone-300 leading-relaxed font-inter">{card.covenantMeaning}</p>
                </div>
                <div className="h-px w-full bg-stone-800" />
                <div>
                   <h5 className="text-[9px] font-cinzel font-black mb-4 tracking-[0.4em] uppercase text-stone-600">Restored Understanding</h5>
                   <p className="text-sm text-stone-400 font-playfair italic leading-relaxed">{card.restoredUnderstanding}</p>
                </div>
              </section>

              {illuminatedArt[card.word] && (
                <div className="rounded-[40px] overflow-hidden border border-amber-900/30 shadow-gold animate-fadeIn">
                  <img src={illuminatedArt[card.word]} alt="Prophetic Vision" className="w-full aspect-square object-cover" />
                </div>
              )}

              <div className="flex items-center gap-6">
                <div className="h-px flex-1 bg-stone-900"></div>
                <span className="font-mono text-[10px] text-stone-700 uppercase tracking-widest font-black">Witness: {card.scripture}</span>
                <div className="h-px flex-1 bg-stone-900"></div>
              </div>
            </div>
            
            {copyFeedback === card.word && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 px-6 py-2 rounded-full font-cinzel text-[10px] font-black tracking-widest uppercase animate-bounce shadow-gold z-20">
                Word Written in Heart
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
