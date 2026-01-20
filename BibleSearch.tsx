
import React, { useState } from 'react';
import { searchScripture } from '../services/geminiService';
import { Tribe, Gender } from '../types';
import { VocabularyCards } from './VocabularyCards';
import { LordsPrayer } from './LordsPrayer';
import { LawEngine } from './LawEngine';

interface BibleSearchProps {
  userContext: { tribe: Tribe, gender: Gender, lifeStage: any, score: number, age: number };
}

interface ScriptureRevelation {
  verseText: string;
  reference: string;
  propheticWitness: string;
  covenantLesson: string;
  hebraicRootAnalysis: string;
  crossReferences: string[];
  targetedPrayer: string;
}

export const BibleSearch: React.FC<BibleSearchProps> = ({ userContext }) => {
  const [activeSubTab, setActiveSubTab] = useState<'search' | 'vocabulary' | 'recitations' | 'decrees'>('search');
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState('Restoration');
  const [collection, setCollection] = useState('All');
  const [result, setResult] = useState<ScriptureRevelation | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (overrideQuery?: string) => {
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim() || isSearching) return;
    setIsSearching(true);
    setResult(null);
    const response = await searchScripture(finalQuery, { 
      ...userContext, 
      focus, 
      collection 
    });
    setResult(response as any);
    setIsSearching(false);
  };

  const focusOptions = [
    { label: 'Healing', icon: '🌿' },
    { label: 'Judgment', icon: '⚖️' },
    { label: 'Lineage', icon: '🧬' },
    { label: 'Restoration', icon: '🔥' }
  ];

  const collectionOptions = ['All', 'Torah', 'Prophets', 'Writings', 'Apocrypha'];

  return (
    <div className="space-y-10 animate-fadeIn pb-40">
      <header className="text-center space-y-4">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-[0.2em] uppercase drop-shadow-md">The Sacred Scrolls</h2>
        
        <div className="flex bg-black/60 backdrop-blur-xl p-1 rounded-2xl border border-white/10 mx-2 shadow-2xl overflow-x-auto scrollbar-hide">
          {['search', 'vocabulary', 'recitations', 'decrees'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab as any)}
              className={`flex-none px-6 py-3 font-cinzel text-[8px] tracking-widest uppercase rounded-xl transition-all whitespace-nowrap ${
                activeSubTab === tab ? 'bg-amber-500 text-stone-950 shadow-gold font-black' : 'text-stone-500'
              }`}
            >
              {tab === 'search' ? 'Inquiry' : tab === 'vocabulary' ? 'Lexicon' : tab === 'recitations' ? 'Recitations' : '613 Decrees'}
            </button>
          ))}
        </div>
      </header>

      {activeSubTab === 'search' && (
        <div className="space-y-8 animate-fadeIn">
          <section className="px-4 space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Topic, law, or promise..."
                className="w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-[35px] px-8 py-6 text-sm font-cinzel tracking-widest text-stone-100 placeholder:text-stone-800 focus:outline-none focus:border-amber-900/50 shadow-inner"
              />
              <button 
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-amber-500 transition-colors border border-stone-800 shadow-xl"
              >
                {isSearching ? <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div> : '🔍'}
              </button>
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="text-[8px] font-cinzel text-stone-500 tracking-[0.3em] uppercase block mx-auto hover:text-amber-500 transition-all font-black"
            >
              {showFilters ? 'Hide Dimensional Filters' : 'Set Prophetic Dimensions ▼'}
            </button>

            {showFilters && (
              <div className="space-y-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] animate-slideDown shadow-2xl">
                <div className="space-y-3">
                  <span className="text-[7px] font-cinzel text-stone-400 tracking-widest uppercase block text-center font-black">Inquiry Focus</span>
                  <div className="flex justify-center gap-2">
                    {focusOptions.map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => setFocus(opt.label)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${
                          focus === opt.label ? 'border-amber-500 bg-amber-500/10 scale-105' : 'border-stone-800 bg-stone-950 text-stone-700'
                        }`}
                      >
                        <span className="text-sm">{opt.icon}</span>
                        <span className="text-[6px] font-cinzel tracking-widest uppercase">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[7px] font-cinzel text-stone-400 tracking-widest uppercase block text-center font-black">Sacred Collection</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {collectionOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setCollection(opt)}
                        className={`px-4 py-1.5 rounded-full border text-[7px] font-cinzel tracking-widest uppercase transition-all ${
                          collection === opt ? 'bg-stone-100 text-stone-950 border-white' : 'border-stone-800 text-stone-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {isSearching && (
            <div className="flex flex-col items-center py-20 animate-pulse">
               <div className="w-16 h-16 border-2 border-amber-500/20 rounded-full flex items-center justify-center text-3xl mb-4 shadow-gold bg-black/20">📖</div>
               <span className="text-[9px] font-cinzel text-amber-500 tracking-[0.6em] uppercase font-black text-center">Consulting the Urim & Thummim...</span>
            </div>
          )}

          {result && (
            <div className="px-4 animate-fadeIn">
              <div className="bg-black/80 backdrop-blur-3xl border-2 border-white/10 rounded-[60px] p-10 space-y-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-9xl pointer-events-none">📜</div>
                
                <header className="text-center space-y-4">
                  <span className="text-[9px] font-cinzel text-amber-500 tracking-[0.6em] uppercase font-black block">The Scriptural Witness</span>
                  <h3 className="font-playfair text-3xl text-stone-100 leading-relaxed italic">"{result.verseText}"</h3>
                  <p className="font-mono text-xs text-amber-600 font-black">— {result.reference}</p>
                </header>

                <div className="space-y-10">
                  <section className="space-y-4">
                    <h5 className="text-[8px] font-cinzel text-stone-500 tracking-[0.4em] uppercase font-black">Hebraic Root Analysis</h5>
                    <div className="p-8 bg-white/5 rounded-[40px] border border-white/5 shadow-inner">
                      <p className="text-stone-200 font-playfair italic text-lg leading-relaxed">{result.hebraicRootAnalysis}</p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h5 className="text-[8px] font-cinzel text-stone-500 tracking-[0.4em] uppercase font-black">Covenant Application</h5>
                    <p className="text-stone-300 font-inter text-sm leading-relaxed px-4">{result.covenantLesson}</p>
                  </section>

                  <div className="h-px w-full bg-stone-900" />

                  <section className="space-y-4">
                    <h5 className="text-[8px] font-cinzel text-stone-500 tracking-[0.4em] uppercase font-black">Ancestral Cross-References</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.crossReferences.map((ref, i) => (
                        <div key={i} className="px-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-[8px] font-mono text-amber-500 uppercase tracking-widest">{ref}</div>
                      ))}
                    </div>
                  </section>

                  <section className="pt-8 border-t border-amber-900/20 space-y-6">
                    <h5 className="text-[8px] font-cinzel text-amber-500 tracking-[0.6em] uppercase font-black text-center italic">The Prophet's Cry (Targeted Prayer)</h5>
                    <p className="text-stone-100 font-playfair text-2xl text-center leading-[2] italic px-6">
                      "{result.targetedPrayer}"
                    </p>
                  </section>
                </div>

                <footer className="pt-10">
                  <button 
                    onClick={() => setResult(null)}
                    className="w-full py-6 bg-stone-100 text-stone-950 font-cinzel text-xs font-black rounded-3xl tracking-[0.4em] uppercase shadow-2xl active:scale-95 transition-all"
                  >
                    Seal Inquiry
                  </button>
                </footer>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'vocabulary' && (
        <div className="px-4 animate-fadeIn">
          <VocabularyCards userTribe={userContext.tribe} />
        </div>
      )}

      {activeSubTab === 'recitations' && (
        <div className="px-4 animate-fadeIn">
          <LordsPrayer />
        </div>
      )}

      {activeSubTab === 'decrees' && (
        <div className="animate-fadeIn">
          <LawEngine userContext={userContext} onComplete={() => {}} />
        </div>
      )}
    </div>
  );
};
