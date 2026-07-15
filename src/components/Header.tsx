import React from 'react';
import { Globe, Calculator, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group cursor-pointer">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#00E5FF] via-[#00B0FF] to-[#D400FF] text-black p-2.5 rounded-xl flex items-center justify-center font-black shadow-[0_0_20px_rgba(0,229,255,0.4)] border border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-[0_0_30px_rgba(212,0,255,0.6)]">
              <Globe className="h-5 w-5 stroke-[2.5] text-black animate-pulse" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-xl sm:text-2xl text-white tracking-tighter leading-none transition-all duration-300 group-hover:text-[#00E5FF] flex items-center gap-1">
                BuduMít<span className="text-[#00E5FF] group-hover:text-white transition-colors duration-300">Web</span><span className="text-white/40 text-xs font-normal">.cz</span>
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="font-sans text-xs uppercase tracking-widest font-bold text-white/75 hover:text-[#00E5FF] transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
              Služby a ceny
            </a>
            <a href="#how-it-works" className="font-sans text-xs uppercase tracking-widest font-bold text-white/75 hover:text-[#00E5FF] transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
              Jak to funguje
            </a>
            <a href="#references" className="font-sans text-xs uppercase tracking-widest font-bold text-white/75 hover:text-[#00E5FF] transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
              Ukázky práce
            </a>
            <a href="#calculator" className="font-sans text-xs uppercase tracking-widest font-bold text-white/75 hover:text-[#00E5FF] transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
              Kalkulačka
            </a>
            <a href="#contact" className="font-sans text-xs uppercase tracking-widest font-bold text-white/75 hover:text-[#00E5FF] transition-all duration-200 hover:translate-y-[-1px] active:translate-y-0">
              Kontakt
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#calculator"
              className="bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] text-black font-sans text-xs uppercase tracking-wider font-black py-2.5 px-5 rounded-lg flex items-center gap-2 transition-all transform hover:scale-[1.05] active:scale-[0.95] shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]"
            >
              <Calculator className="h-4 w-4 stroke-[3]" />
              <span>Spočítat cenu</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
