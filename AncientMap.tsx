
import React, { useState } from 'react';
import { Tribe } from '../types';
import { TRIBAL_MANIFESTO, TRIBE_COLORS } from '../constants';

interface Territory {
  id: Tribe;
  coords: { x: number; y: number };
  label: string;
}

/**
 * Historical Tribal Locations (Levant Region):
 * North: Asher, Naphtali, Dan (Settled North), Zebulun
 * Central: Issachar, Manasseh (West), Ephraim
 * South: Benjamin, Judah, Simeon
 * East Jordan: Manasseh (East), Gad, Reuben
 */
const LOCATIONS: Territory[] = [
  // Northern Galilee
  { id: Tribe.DAN, coords: { x: 65, y: 10 }, label: 'Dan (North)' },
  { id: Tribe.NAPHTALI, coords: { x: 70, y: 18 }, label: 'Naphtali' },
  { id: Tribe.ASHER, coords: { x: 50, y: 15 }, label: 'Asher' },
  { id: Tribe.ZEBULUN, coords: { x: 58, y: 24 }, label: 'Zebulun' },
  
  // Central Samaria / Jordan Valley
  { id: Tribe.ISSACHAR, coords: { x: 68, y: 30 }, label: 'Issachar' },
  { id: Tribe.MANASSEH, coords: { x: 55, y: 38 }, label: 'Manasseh (West)' },
  { id: Tribe.EPHRAIM, coords: { x: 60, y: 48 }, label: 'Ephraim' },
  
  // East Jordan (Transjordan)
  { id: Tribe.MANASSEH, coords: { x: 85, y: 32 }, label: 'Manasseh (East)' },
  { id: Tribe.GAD, coords: { x: 88, y: 55 }, label: 'Gad' },
  { id: Tribe.REUBEN, coords: { x: 86, y: 78 }, label: 'Reuben' },
  
  // Southern Judea / Negev
  { id: Tribe.BENJAMIN, coords: { x: 62, y: 58 }, label: 'Benjamin' },
  { id: Tribe.JUDAH, coords: { x: 55, y: 70 }, label: 'Judah' },
  { id: Tribe.SIMEON, coords: { x: 45, y: 85 }, label: 'Simeon' },
];

export const AncientMap: React.FC = () => {
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);

  return (
    <div className="space-y-10 pb-40 px-4 animate-fadeIn relative z-10">
      <header className="text-center">
        <h2 className="font-cinzel text-3xl text-amber-500 font-black tracking-widest uppercase drop-shadow-lg">Inheritance Map</h2>
        <p className="text-[10px] text-white/60 font-cinzel tracking-widest uppercase mt-2">The Covenant Land — Eretz Israel</p>
      </header>

      <div className="relative aspect-[3/5] w-full max-w-[420px] mx-auto bg-[#1a1714] rounded-[60px] border border-amber-900/40 overflow-hidden shadow-2xl">
        {/* Background Texture - Homeland Geography Stylization */}
        <div className="absolute inset-0 bg-[#12100e] opacity-100" />
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
        
        {/* Stylized River Jordan and Sea of Galilee */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 166.6">
           {/* Dead Sea */}
           <path d="M78,110 Q85,130 75,150" fill="none" stroke="#3b82f6" strokeWidth="4" />
           {/* River Jordan */}
           <path d="M78,25 L78,110" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
           {/* Sea of Galilee */}
           <circle cx="78" cy="20" r="4" fill="#3b82f6" />
        </svg>

        {/* Territory Markers */}
        {LOCATIONS.map((loc, idx) => (
          <button
            key={`${loc.id}-${idx}`}
            onClick={() => setSelectedTribe(loc.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 hover:scale-125 group"
            style={{ left: `${loc.coords.x}%`, top: `${loc.coords.y}%` }}
          >
            <div 
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl shadow-2xl transition-all ${
                selectedTribe === loc.id ? 'bg-amber-500 border-white scale-125 shadow-gold ring-4 ring-amber-500/30' : 'bg-stone-900 border-stone-800 text-stone-400'
              }`}
            >
              {TRIBAL_MANIFESTO[loc.id].symbol}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[6px] font-cinzel text-white/40 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase whitespace-nowrap">
                {loc.label}
            </span>
          </button>
        ))}

        {selectedTribe && (
          <div className="absolute inset-x-4 bottom-8 bg-black/90 backdrop-blur-2xl border border-amber-500/40 p-10 rounded-[50px] animate-fadeIn shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[85%] overflow-y-auto scrollbar-hide z-50">
            <header className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[8px] font-cinzel text-amber-500 tracking-[0.4em] block uppercase font-black">Homeland Origin</span>
                <h4 className="font-cinzel text-3xl font-black text-stone-100 tracking-widest uppercase">{selectedTribe}</h4>
              </div>
              <div className="text-5xl drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">{TRIBAL_MANIFESTO[selectedTribe].symbol}</div>
            </header>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                  <span className="text-[7px] font-cinzel text-stone-500 tracking-widest block uppercase mb-1">Territory</span>
                  <span className="text-[9px] text-amber-100 font-black uppercase leading-tight">{TRIBAL_MANIFESTO[selectedTribe].territory}</span>
                </div>
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                  <span className="text-[7px] font-cinzel text-stone-500 tracking-widest block uppercase mb-1">Tribal Burden</span>
                  <span className="text-[9px] text-amber-100 font-black uppercase leading-tight">{TRIBAL_MANIFESTO[selectedTribe].burden}</span>
                </div>
              </div>
              <div className="p-6 bg-stone-900/40 rounded-3xl border border-stone-800/50">
                 <h5 className="text-[7px] font-cinzel text-amber-900 tracking-[0.4em] uppercase font-black mb-2">Migration Records</h5>
                 <p className="text-stone-300 font-playfair italic text-xs leading-relaxed">
                   {(TRIBAL_MANIFESTO[selectedTribe] as any).migration || "The specific migration path of this seed is currently being unsealed."}
                 </p>
              </div>
              <p className="text-stone-400 font-playfair italic text-sm leading-relaxed text-center px-4">
                "{TRIBAL_MANIFESTO[selectedTribe].description}"
              </p>
              <button onClick={() => setSelectedTribe(null)} className="w-full py-4 bg-amber-500 text-stone-950 font-cinzel text-[10px] tracking-widest uppercase rounded-2xl hover:bg-amber-400 transition-colors font-black">Return to Map</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
