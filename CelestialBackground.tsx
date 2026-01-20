
import React, { useMemo, useEffect, useState } from 'react';
import { CelestialState, MoonPhase } from '../types';

export const CelestialBackground: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const celestial = useMemo((): CelestialState => {
    const hours = now.getHours();
    let timeOfDay: CelestialState['timeOfDay'] = 'Night';
    if (hours >= 5 && hours < 8) timeOfDay = 'Dawn';
    else if (hours >= 8 && hours < 11) timeOfDay = 'Morning';
    else if (hours >= 11 && hours < 14) timeOfDay = 'Midday';
    else if (hours >= 14 && hours < 18) timeOfDay = 'Afternoon';
    else if (hours >= 18 && hours < 21) timeOfDay = 'Dusk';

    const refDate = new Date("2024-01-11T11:57:00Z");
    const diff = (now.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24);
    const lunarAge = diff % 29.53059;
    
    let moonPhase: MoonPhase = MoonPhase.NEW;
    let isWaxing = lunarAge < 14.76;
    
    if (lunarAge < 1.8) moonPhase = MoonPhase.NEW;
    else if (lunarAge < 5.5) moonPhase = MoonPhase.WAXING_CRESCENT;
    else if (lunarAge < 9.2) moonPhase = MoonPhase.FIRST_QUARTER;
    else if (lunarAge < 12.9) moonPhase = MoonPhase.WAXING_GIBBOUS;
    else if (lunarAge < 16.6) moonPhase = MoonPhase.FULL;
    else if (lunarAge < 20.3) moonPhase = MoonPhase.WANING_GIBBOUS;
    else if (lunarAge < 24.0) moonPhase = MoonPhase.LAST_QUARTER;
    else if (lunarAge < 27.7) moonPhase = MoonPhase.WANING_CRESCENT;
    else moonPhase = MoonPhase.NEW;

    const insights = {
      [MoonPhase.NEW]: "The month is hidden. A time for internal sealing.",
      [MoonPhase.WAXING_CRESCENT]: "Look west after sunset — the moon is growing. Time is being added.",
      [MoonPhase.FIRST_QUARTER]: "Balance is achieved. The work of the month solidifies.",
      [MoonPhase.WAXING_GIBBOUS]: "The light approaches its fullness. Preparation for assembly.",
      [MoonPhase.FULL]: "The heavens declare fullness. The night is as the day.",
      [MoonPhase.WANING_GIBBOUS]: "The cycle begins to release. Reflect on thy harvest.",
      [MoonPhase.LAST_QUARTER]: "The watch shifts to the final descent.",
      [MoonPhase.WANING_CRESCENT]: "The descent is nearly complete. Rest before the renewal."
    };

    return {
      timeOfDay,
      moonPhase,
      lunarAge,
      isWaxing,
      insight: insights[moonPhase]
    };
  }, [now]);

  const skyColors = {
    Dawn: 'from-[#ff7e5f] via-[#feb47b] to-[#86a8e7]',
    Morning: 'from-[#86a8e7] via-[#91eae4] to-[#f5f5f4]',
    Midday: 'from-[#2980b9] via-[#6dd5fa] to-[#ffffff]',
    Afternoon: 'from-[#f1c40f] via-[#e67e22] to-[#3498db]',
    Dusk: 'from-[#2c3e50] via-[#fd746c] to-[#ff9068]',
    Night: 'from-[#0f0c29] via-[#302b63] to-[#24243e]'
  };

  const sunMoonPosition = useMemo(() => {
    const hours = now.getHours() + now.getMinutes() / 60;
    const x = ((hours + 6) % 24) / 24 * 100;
    const y = Math.sin((hours - 6) / 12 * Math.PI) * 40 + 50;
    return { x, y };
  }, [now]);

  return (
    <div className={`fixed inset-0 z-0 transition-colors duration-[5000ms] bg-gradient-to-b ${skyColors[celestial.timeOfDay]} overflow-hidden`}>
      {/* Visual Contrast Layer: Darkens the background slightly to let UI pop */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Sun/Moon Object */}
      <div 
        className={`absolute w-32 h-32 rounded-full transition-all duration-1000 blur-xl z-10 ${
          celestial.timeOfDay === 'Night' ? 'bg-stone-100 shadow-[0_0_60px_rgba(255,255,255,0.4)]' : 'bg-amber-400 shadow-[0_0_100px_rgba(251,191,36,0.8)]'
        }`}
        style={{ left: `${sunMoonPosition.x}%`, top: `${100 - sunMoonPosition.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        {celestial.timeOfDay === 'Night' && (
          <div className="absolute inset-0 bg-stone-900 rounded-full scale-95" style={{ 
            clipPath: celestial.isWaxing 
              ? `inset(0 0 0 ${100 - (celestial.lunarAge / 14.76 * 100)}%)`
              : `inset(0 ${(celestial.lunarAge - 14.76) / 14.76 * 100}% 0 0)`
          }} />
        )}
      </div>

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
        <div className="god-ray scale-150" />
      </div>

      {/* Celestial Overlay */}
      <div className="absolute top-28 left-0 right-0 text-center pointer-events-none px-8 z-20">
        <div className="inline-block px-6 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 animate-fadeIn">
          <span className="text-[10px] font-cinzel text-white/80 tracking-[0.4em] uppercase block font-black mb-1">
            {celestial.timeOfDay} Watch • {celestial.moonPhase}
          </span>
          <p className="text-[9px] font-playfair italic text-white leading-tight">
            {celestial.insight}
          </p>
        </div>
      </div>
    </div>
  );
};
