
import React, { useState, useMemo } from 'react';
import { MITZVOT } from '../constants';
import { LawCategory, LawSeverity, AuthorityLevel, Mitzvah, Tribe, Gender } from '../types';
import { explainMitzvah } from '../services/geminiService';

interface LawEngineProps {
  onComplete?: (points: number) => void;
  userContext: { tribe: Tribe, gender: Gender };
}

export const LawEngine: React.FC<LawEngineProps> = ({ onComplete, userContext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<LawCategory | 'All'>('All');
  const [activeSeverity, setActiveSeverity] = useState<LawSeverity | 'All'>('All');
  const [activeAuthority, setActiveAuthority] = useState<AuthorityLevel | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMitzvah, setSelectedMitzvah] = useState<Mitzvah | null>(null);
  const [lawRevelation, setLawRevelation] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const filteredMitzvot = useMemo(() => {
    return MITZVOT.filter((m) => {
      const matchesSearch = 
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.scripture.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.id.toString() === searchTerm;
      
      const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
      const matchesSeverity = activeSeverity === 'All' || m.severity === activeSeverity;
      const matchesAuthority = activeAuthority === 'All' || m.authorityLevel === activeAuthority;

      return matchesSearch && matchesCategory && matchesSeverity && matchesAuthority;
    });
  }, [searchTerm, activeCategory, activeSeverity, activeAuthority]);

  const categories = Object.values(LawCategory);
  const severities = Object.values(LawSeverity);

  const handleDeepInquiry = async (law: Mitzvah) => {
    setIsRevealing(true);
    setLawRevelation(null);
    const result = await explainMitzvah(law, userContext);
    setLawRevelation(result);
    setIsRevealing(false);
  };

  const getSeverityColor = (s: LawSeverity) => {
    switch (s) {
      case LawSeverity.JUDGMENT: return 'text-red-500 border-red-900/30 bg-red-900/10';
      case LawSeverity.COMMAND: return 'text-amber-500 border-amber-900/30 bg-amber-900/10';
      case LawSeverity.INSTRUCTION: return 'text-blue-400 border-blue-900/30 bg-blue-900/10';
      default: return 'text-stone-500 border-stone-800 bg-stone-900/20';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-40">
      <header className="text-center px-4">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-[0.3em] uppercase">The Law Repository</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.5em] uppercase italic mt-2">150+ Mitzvot Unsealed</p>
      </header>

      <section className="px-4 space-y-4 sticky top-0 z-30 pt-4 pb-2 bg-[#0c0a09]/80 backdrop-blur-md">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search Law #, title, or scripture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-stone-950 border border-stone-900 rounded-[30px] px-8 py-5 text-sm font-cinzel tracking-widest text-stone-100 placeholder:text-stone-800 focus:outline-none focus:border-amber-900/50 shadow-inner transition-all"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-700">🔍</div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-fade-edges">
          <button
            onClick={() => setActiveCategory('All')}
            className={`flex-none px-6 py-2.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase transition-all border ${
              activeCategory === 'All' ? 'bg-amber-500 text-stone-950 border-amber-400 font-black' : 'bg-stone-900/50 text-stone-600 border-stone-900'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-6 py-2.5 rounded-full font-cinzel text-[9px] tracking-widest uppercase transition-all border ${
                activeCategory === cat ? 'bg-amber-500 text-stone-950 border-amber-400 font-black' : 'bg-stone-900/50 text-stone-600 border-stone-900'
              }`}
            >
              {cat.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-[8px] font-cinzel tracking-[0.3em] uppercase text-stone-500 hover:text-amber-500 transition-all mx-auto"
        >
          {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'} 
          <span className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {showFilters && (
          <div className="grid grid-cols-2 gap-4 p-6 bg-stone-900/20 border border-stone-900 rounded-[40px] animate-slideDown">
            <div className="space-y-3">
              <label className="text-[8px] font-cinzel text-stone-700 tracking-widest uppercase font-black px-2">Severity</label>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setActiveSeverity('All')} className={`px-3 py-1.5 rounded-lg border text-[8px] font-cinzel uppercase ${activeSeverity === 'All' ? 'bg-stone-100 text-stone-950' : 'bg-stone-950 text-stone-600 border-stone-800'}`}>All</button>
                {severities.map(s => (
                  <button key={s} onClick={() => setActiveSeverity(s)} className={`px-3 py-1.5 rounded-lg border text-[8px] font-cinzel uppercase ${activeSeverity === s ? 'bg-amber-500/20 text-amber-500 border-amber-500' : 'bg-stone-950 text-stone-600 border-stone-800'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="px-4 space-y-6">
        <div className="grid gap-4">
          {filteredMitzvot.map((m) => (
            <div 
              key={m.id}
              onClick={() => { setSelectedMitzvah(m); setLawRevelation(null); }}
              className="group relative bg-stone-950 border border-stone-900 rounded-[40px] p-8 hover:border-amber-900/40 transition-all cursor-pointer active:scale-98 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-7xl font-serif pointer-events-none group-hover:scale-110 transition-transform">⚖️</div>
              <header className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-amber-500 font-black">LAW #{m.id}</span>
                  <span className="text-[7px] font-cinzel text-stone-600 tracking-[0.3em] uppercase">{m.category.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-[7px] font-cinzel font-black tracking-widest uppercase transition-colors ${getSeverityColor(m.severity)}`}>
                  {m.severity}
                </div>
              </header>
              <div className="space-y-2">
                <h3 className="font-playfair text-2xl font-bold text-stone-100 group-hover:text-amber-500 transition-colors leading-tight">{m.title}</h3>
                <p className="font-mono text-[9px] text-stone-500 uppercase tracking-tighter">{m.scripture}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedMitzvah && (
        <div className="fixed inset-0 z-[100] bg-black/98 flex items-end justify-center backdrop-blur-3xl animate-fadeIn">
          <div className="bg-[#0c0a09] border-t border-amber-900/30 rounded-t-[60px] p-10 max-w-xl w-full relative h-[92vh] overflow-y-auto scrollbar-hide">
            <button onClick={() => setSelectedMitzvah(null)} className="absolute top-8 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-stone-900 text-stone-500 hover:text-amber-500 transition-colors">✕</button>
            <div className="space-y-12 pt-10 pb-20">
              <header className="text-center space-y-6">
                <span className="text-[11px] font-cinzel font-black tracking-[0.8em] uppercase block text-amber-500">Decree of YAHAWAH</span>
                <div className="space-y-2">
                  <h3 className="font-playfair text-6xl font-black text-stone-100 leading-none">#{selectedMitzvah.id}</h3>
                  <h4 className="font-cinzel text-3xl font-bold text-amber-100 tracking-widest uppercase leading-tight">{selectedMitzvah.title}</h4>
                </div>
                <p className="font-mono text-sm text-stone-500 tracking-widest uppercase">— {selectedMitzvah.scripture}</p>
              </header>

              <section className="p-10 bg-stone-900/40 rounded-[50px] border border-stone-800 shadow-inner">
                <h5 className="text-[10px] text-amber-500 uppercase font-cinzel font-black mb-6 tracking-[0.4em]">Divine Intent</h5>
                <p className="text-2xl text-stone-200 leading-relaxed font-playfair italic">"{selectedMitzvah.divineIntent}"</p>
              </section>

              {/* NEW PENALTY & MODERN STORY SECTIONS */}
              <div className="grid gap-6">
                <section className="p-8 bg-red-950/10 border border-red-900/30 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-4xl pointer-events-none group-hover:scale-110 transition-transform">🌑</div>
                  <h5 className="text-[10px] text-red-500 uppercase font-cinzel font-black mb-4 tracking-[0.4em]">The Curse of Disobedience</h5>
                  <p className="text-sm text-stone-300 font-playfair italic leading-relaxed">
                    {selectedMitzvah.penalty || "The specific judgment for this violation remains unsealed but active in the Spirit."}
                  </p>
                </section>

                <section className="p-8 bg-amber-950/5 border border-stone-800 rounded-[40px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.05] text-4xl pointer-events-none group-hover:scale-110 transition-transform">🏢</div>
                  <h5 className="text-[10px] text-stone-500 uppercase font-cinzel font-black mb-4 tracking-[0.4em]">Modern Manifestation</h5>
                  <p className="text-sm text-stone-400 font-inter leading-relaxed">
                    {selectedMitzvah.modernApplication || "Observe the modern world; the lack of this Law is seen in the systemic decay of thy people."}
                  </p>
                </section>
              </div>

              {!lawRevelation && (
                <button 
                  onClick={() => handleDeepInquiry(selectedMitzvah)}
                  disabled={isRevealing}
                  className="w-full py-6 bg-stone-900 border border-stone-800 text-amber-500 font-cinzel text-[10px] tracking-[0.3em] rounded-3xl uppercase hover:bg-stone-800 transition-all flex items-center justify-center gap-3"
                >
                  {isRevealing ? <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div> : '🔍'}
                  {isRevealing ? 'Consulting the Watchman...' : 'Seek Prophetic Revelation'}
                </button>
              )}

              {lawRevelation && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="h-px w-full bg-amber-900/20" />
                  <section className="space-y-6">
                    <h5 className="text-[10px] text-amber-500 uppercase font-cinzel font-black tracking-[0.4em]">The Watchman's Witness</h5>
                    <div className="text-stone-300 font-playfair italic text-lg leading-relaxed whitespace-pre-wrap">
                      {lawRevelation}
                    </div>
                  </section>
                  <button 
                    onClick={() => setLawRevelation(null)}
                    className="text-[9px] font-cinzel text-stone-600 tracking-widest uppercase underline"
                  >
                    Hide Revelation
                  </button>
                </div>
              )}

              <button 
                onClick={() => { onComplete?.(25); setSelectedMitzvah(null); }}
                className="w-full py-6 bg-amber-500 text-stone-950 font-cinzel text-xs font-black rounded-3xl uppercase tracking-[0.4em] shadow-gold active:scale-95 transition-all mt-4"
              >
                Mark as Witnessed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
