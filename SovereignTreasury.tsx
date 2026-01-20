
import React from 'react';

export const SovereignTreasury: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-stone-950/98 flex items-center justify-center p-6 animate-fadeIn backdrop-blur-md">
      <div className="bg-[#0c0a09] border-2 border-amber-900/30 rounded-[60px] p-10 max-w-sm w-full relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-amber-500 pointer-events-none scale-[4]">💰</div>
        
        <div className="relative z-10 text-center space-y-8">
          <header className="space-y-2">
            <span className="text-[10px] font-cinzel text-amber-600 tracking-[0.6em] uppercase font-black">Treasury Protocol</span>
            <h2 className="font-cinzel text-3xl font-black text-stone-100 tracking-widest uppercase">Sovereign Tithe</h2>
            <div className="h-px w-16 bg-amber-900/50 mx-auto" />
          </header>

          <p className="text-stone-400 font-playfair italic text-lg leading-relaxed">
            "Honor YAHAWAH with thy substance, and with the firstfruits of all thine increase."
          </p>

          <div className="p-8 bg-stone-900/40 rounded-[40px] border border-stone-800 space-y-4 shadow-inner">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[9px] font-cinzel text-stone-600 tracking-widest uppercase font-black">Beneficiary Seal</span>
              <span className="text-2xl font-cinzel text-amber-500 font-black tracking-widest">$TRILLBILLDFW</span>
            </div>
            <p className="text-[10px] text-stone-500 font-mono uppercase tracking-tighter">
              Contributing to the restoration of the 12 Tribes.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <a 
              href="https://cash.app/$TRILLBILLDFW" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-6 bg-emerald-600 text-white font-cinzel text-xs font-black rounded-3xl tracking-[0.4em] uppercase shadow-2xl active:scale-95 transition-all text-center"
            >
              Contribute Substace
            </a>
            <button 
              onClick={onClose}
              className="w-full py-4 text-stone-600 hover:text-stone-400 font-cinzel text-[9px] tracking-[0.4em] uppercase transition-all"
            >
              Return to Altar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
