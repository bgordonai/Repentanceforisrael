
import React, { useState, useEffect, useMemo } from 'react';
import { Onboarding } from './components/Onboarding';
import { TheAltar } from './components/TheAltar';
import { TheWatchman } from './components/TheWatchman';
import { BibleSearch } from './components/BibleSearch';
import { CelestialBackground } from './components/CelestialBackground';
import { Icons } from './constants';
import { Tribe, Gender, LifeStage, ScoreTier } from './types';

const App: React.FC = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'bible'>('home');
  const [isWatchmanOpen, setIsWatchmanOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  
  const [tribe, setTribe] = useState<Tribe>(Tribe.UNKNOWN);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [lifeStage, setLifeStage] = useState<LifeStage>(LifeStage.ADULT);
  const [age, setAge] = useState<number>(33);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = (t: Tribe, g: Gender, l: LifeStage, a: number, initialScore: number) => {
    setTribe(t); 
    setGender(g); 
    setLifeStage(l); 
    setAge(a);
    setScore(initialScore);
    setIsOnboarded(true);
  };

  const userContext = useMemo(() => ({ tribe, gender, lifeStage, score, age }), [tribe, gender, lifeStage, score, age]);
  
  const tier = useMemo(() => {
    if (score < 20) return ScoreTier.DIM;
    if (score < 50) return ScoreTier.KINDLED;
    if (score < 100) return ScoreTier.BURNING;
    if (score < 200) return ScoreTier.SEALED;
    return ScoreTier.ETERNAL;
  }, [score]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-[#0c0a09] flex flex-col items-center justify-center z-[100] p-10 text-center animate-fadeIn">
        <div className="w-24 h-24 mb-12 text-amber-500 animate-pulse"><Icons.Menorah /></div>
        <h1 className="font-cinzel text-xl font-black text-stone-300 tracking-[0.8em] mb-4 uppercase drop-shadow-lg">Remnant</h1>
        <p className="text-stone-700 font-cinzel text-[10px] tracking-widest uppercase">Holy Government Protocol</p>
      </div>
    );
  }

  if (!isOnboarded) return <Onboarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="ritual-container min-h-screen relative overflow-hidden">
      <CelestialBackground />

      <div className="relative z-10 flex flex-col h-screen max-w-lg mx-auto overflow-hidden">
        <header className="px-8 py-10 flex justify-between items-center sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-black/70 backdrop-blur-3xl px-6 py-3 rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            <div className="w-8 h-8 text-amber-500 drop-shadow-gold"><Icons.Lion /></div>
            <div className="flex flex-col">
              <span className="font-cinzel font-black tracking-[0.2em] text-[11px] uppercase text-stone-100 drop-shadow-md">{tribe} {lifeStage}</span>
              <span className="text-[8px] font-mono uppercase tracking-tighter text-white/50">{tier}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="bg-black/80 backdrop-blur-3xl px-4 py-2 rounded-full border border-amber-900/40 flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
               <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-gold"></div>
               <span className="font-mono text-[10px] text-amber-500 font-bold tracking-tighter">ALGN: {score}</span>
             </div>
          </div>
        </header>

        <main className="flex-1 px-4 relative overflow-y-auto scrollbar-hide pt-4 pb-40">
          {activeTab === 'home' && (
            <TheAltar 
              score={score} 
              lifeStage={lifeStage} 
              onObserve={(p) => setScore(s => s + (p || 5))} 
              userContext={userContext}
              onNavigate={(tab) => {
                if (tab === 'ai') setIsWatchmanOpen(true);
                else setActiveTab(tab as any);
              }}
            />
          )}
          {activeTab === 'bible' && <BibleSearch userContext={userContext} />}
        </main>
      </div>

      {isWatchmanOpen && (
        <TheWatchman 
          userContext={userContext} 
          onClose={() => setIsWatchmanOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
