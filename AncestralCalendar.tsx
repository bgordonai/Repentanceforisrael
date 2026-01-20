
import React, { useState, useMemo } from 'react';
import { ANCESTRAL_CALENDAR, TRIBE_COLORS } from '../constants';
import { CalendarDay, MoonPhase } from '../types';

interface AncestralCalendarProps {
  initialSelection?: CalendarDay | null;
}

export const AncestralCalendar: React.FC<AncestralCalendarProps> = ({ initialSelection }) => {
  const [activeMonth, setActiveMonth] = useState(initialSelection?.month || 'Nissan');
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const months = Object.keys(ANCESTRAL_CALENDAR);
  
  const currentPropheticDate = useMemo(() => new Date("2026-01-15"), []);

  const getMoonPhaseEmoji = (date: Date): MoonPhase => {
    const lp = 2551443; 
    const new_moon = new Date("1970-01-07T11:57:00Z"); 
    const phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
    const res = phase / lp; 
    
    if (res < 0.03) return MoonPhase.NEW;
    if (res < 0.22) return MoonPhase.WAXING_CRESCENT;
    if (res < 0.28) return MoonPhase.FIRST_QUARTER;
    if (res < 0.47) return MoonPhase.WAXING_CRESCENT; 
    if (res < 0.53) return MoonPhase.FULL;
    if (res < 0.72) return MoonPhase.WANING_CRESCENT; 
    if (res < 0.78) return MoonPhase.LAST_QUARTER;
    return MoonPhase.WANING_CRESCENT;
  };

  const isSabbathDay = (dayNum: number) => [7, 14, 21, 28].includes(dayNum);

  const currentDays = useMemo(() => {
    const baseDays = ANCESTRAL_CALENDAR[activeMonth] || [];
    const now = currentPropheticDate;
    return baseDays.map((d) => {
      const mockDate = new Date(now.getFullYear(), months.indexOf(activeMonth), d.day);
      return { ...d, moon: getMoonPhaseEmoji(mockDate) };
    });
  }, [activeMonth, currentPropheticDate, months]);

  return (
    <div className="space-y-10 animate-fadeIn pb-32 px-4">
      <header className="text-center space-y-2">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-[0.2em] uppercase">Prophetic Cycles</h2>
        <p className="text-[10px] text-stone-600 font-cinzel tracking-[0.5em] uppercase italic">Lunar Protocol — {activeMonth}, 2026</p>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {months.map(m => (
          <button
            key={m}
            onClick={() => setActiveMonth(m)}
            className={`flex-none px-10 py-4 rounded-full font-cinzel text-[10px] tracking-widest uppercase transition-all border shadow-lg ${
              activeMonth === m ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-gold font-black' : 'bg-stone-950 text-stone-600 border-stone-900'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {currentDays.map((d) => {
          const isSabbath = isSabbathDay(d.day);
          const tribeColor = TRIBE_COLORS[d.tribe] || '#d4af37';

          return (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d)}
              className={`relative aspect-square flex flex-col items-center justify-center rounded-[25px] border transition-all duration-300 active:scale-95 group overflow-hidden ${
                isSabbath ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-500/[0.05]' : 'border-stone-900 bg-stone-950'
              }`}
            >
              <span className={`text-[10px] font-mono mb-2 relative z-10 ${isSabbath ? 'text-emerald-400 font-black' : 'text-stone-700'}`}>
                {d.day}
              </span>
              <span className={`text-xl mb-2 relative z-10 ${isSabbath ? 'animate-pulse' : ''}`}>{d.moon}</span>
              <div 
                className="w-1.5 h-1.5 rounded-full shadow-sm relative z-10"
                style={{ backgroundColor: isSabbath ? '#10b981' : tribeColor }}
              />
              {isSabbath && (
                <div className="absolute bottom-1 right-1 text-[6px] font-cinzel text-emerald-400 uppercase tracking-tighter font-black">SABBATH</div>
              )}
            </button>
          );
        })}
      </div>

      {selectedDay && (
        <div className="fixed inset-0 bg-black/98 z-[100] flex items-end justify-center backdrop-blur-2xl animate-fadeIn">
          <div className="bg-[#0c0a09] border-t border-amber-900/30 rounded-t-[60px] p-12 max-w-lg w-full relative h-[88vh] overflow-y-auto scrollbar-hide">
            <button 
              onClick={() => setSelectedDay(null)}
              className="absolute top-10 right-12 text-stone-600 hover:text-amber-500 font-cinzel text-xs tracking-widest p-4 transition-all z-50 uppercase"
            >
              Close
            </button>

            <div className="space-y-16 pt-10 relative z-10">
              <header className="text-center space-y-6">
                <div className="flex justify-center items-center gap-6">
                  <span className="text-6xl">{selectedDay.moon}</span>
                  <div 
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-cinzel font-black"
                    style={{ borderColor: TRIBE_COLORS[selectedDay.tribe], color: TRIBE_COLORS[selectedDay.tribe] }}
                  >
                    {selectedDay.tribe.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-cinzel text-[11px] text-amber-500 tracking-[0.6em] uppercase font-black">
                    {isSabbathDay(selectedDay.day) ? 'Holy Sabbath Watch' : 'Prophetic Watch'} — Day {selectedDay.day}
                  </h3>
                  <h4 className="font-playfair text-5xl font-black text-stone-100 mt-2">{selectedDay.tribe}</h4>
                </div>
              </header>

              <section className="space-y-6">
                <h5 className="text-[9px] text-stone-700 uppercase font-cinzel font-black tracking-[0.6em] border-l-2 border-stone-800 pl-4">Ancestral Lore</h5>
                <p className="text-2xl text-stone-200 leading-relaxed font-playfair italic px-4">
                  "{selectedDay.lore}"
                </p>
              </section>

              <section className="p-10 rounded-[50px] border border-amber-900/20 bg-stone-900/20 shadow-inner">
                <h5 className="text-[10px] font-cinzel font-black mb-6 tracking-[0.5em] uppercase text-amber-500">Alignment Remedy</h5>
                <h6 className="font-playfair text-3xl font-bold text-stone-100 mb-4">{selectedDay.remedyName}</h6>
                <p className="text-base text-stone-400 leading-relaxed italic">{selectedDay.codex_remedy}</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
