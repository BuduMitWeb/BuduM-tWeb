import React from 'react';
import { Globe, Heart } from 'lucide-react';

export default function Footer() {
  const triggerLegal = (type: 'terms' | 'gdpr') => {
    window.dispatchEvent(new CustomEvent('open-legal', { detail: type }));
  };

  return (
    <footer className="bg-[#080808] text-slate-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#00E5FF] text-black p-2 rounded-xl flex items-center justify-center">
              <Globe className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-base text-white tracking-tight leading-none">
                BuduMítWeb
              </span>
              <span className="text-[10px] font-mono text-[#00E5FF] font-semibold uppercase tracking-wider mt-0.5">
                AI & Low-Code Studio
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right max-w-md">
            Stavíme moderní a bezúdržbové weby na moderním stacku Netlify. Žádné drahé platformy, žádný hosting k placení.
          </p>
        </div>

        {/* Local SEO Cities targeting block */}
        <div className="border-b border-white/5 pb-6 mb-6 text-left">
          <p className="text-[10px] font-mono text-[#00E5FF]/60 uppercase tracking-widest mb-2 font-bold">[ Působnost studia & online spolupráce ]</p>
          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
            Poskytujeme profesionální tvorbu webových stránek a SEO optimalizaci kompletně online po celé České republice. Naše klienty nejčastěji najdete ve městech: 
            <span className="text-slate-400"> Praha, Brno, Ostrava, Plzeň, Liberec, Olomouc, České Budějovice, Hradec Králové, Ústí nad Labem, Pardubice, Karlovy Vary, Zlín, Jihlava</span> a v dalších regionech ČR. Spolupracujte s námi bezpečně a moderně na dálku.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-mono">
          <p>© {new Date().getFullYear()} BuduMítWeb. Všechna práva vyhrazena.</p>
          
          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => triggerLegal('terms')}
              className="hover:text-[#00E5FF] transition-colors cursor-pointer text-slate-400 font-semibold"
            >
              Obchodní podmínky
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => triggerLegal('gdpr')}
              className="hover:text-[#00E5FF] transition-colors cursor-pointer text-slate-400 font-semibold"
            >
              Ochrana osobních údajů (GDPR)
            </button>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1 text-slate-500">
            <div className="flex items-center gap-1">
              <span>Vytvořeno s</span>
              <Heart className="h-3 w-3 text-[#00E5FF] fill-[#00E5FF]" />
              <span>pomocí AI a low-code</span>
            </div>
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00B0FF] to-[#D400FF]">Designed by BuduMítWeb</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
