import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Globe2, Sparkles, ShoppingBag, Sliders, Leaf, Calendar, Heart, Eye } from 'lucide-react';
import { PORTFOLIO_REFERENCES } from '../servicesData';

export default function References() {
  return (
    <section id="references" className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden text-slate-900">
      {/* Dynamic background element */}
      <div className="absolute bottom-1/4 right-10 -z-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.04)_0,transparent_65%)] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#00B0FF] uppercase tracking-widest bg-[#00B0FF]/10 px-3.5 py-1.5 rounded-lg font-bold"
          >
            [ Důkaz místo slibů ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tighter uppercase leading-none mt-4"
          >
            Ukázky našich spuštěných webů
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed"
          >
            Podívejte se na reálné projekty spuštěné pro naše spokojené klienty. Všechny tyto weby běží na Netlify, načítají se mimořádně rychle a jejich provoz stojí majitele přesně 0 Kč měsíčně.
          </motion.p>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_REFERENCES.map((ref, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:border-[#00B0FF]/30 hover:bg-white hover:shadow-[0_15px_40px_rgba(0,176,255,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Website screenshot header */}
                <div className="relative overflow-hidden aspect-[4/3] border-b border-slate-200 select-none w-full bg-slate-100">
                  <img 
                    src={idx === 0 ? "https://i.imgur.com/kSxZZal.png" : idx === 1 ? "https://i.imgur.com/inVOEax.png" : "https://i.imgur.com/LRjTalT.png"} 
                    alt={ref.title} 
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 justify-center">
                    <span className="text-xs text-white bg-black/80 px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 backdrop-blur-sm border border-white/10 shadow-lg">
                      <Eye className="h-4 w-4 text-[#00B0FF]" /> Zobrazit web
                    </span>
                  </div>
                </div>

                {/* Info and action area */}
                <div className="p-6 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <h3 className="font-sans font-black text-base sm:text-lg text-slate-900 flex items-center justify-between gap-2">
                      <span className="truncate">{ref.title}</span>
                      <span className="text-[9px] text-[#00B0FF] font-mono bg-[#00B0FF]/10 px-2 py-0.5 rounded border border-[#00B0FF]/20 shrink-0 font-bold">{ref.category}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                      {ref.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-widest font-black text-[#00B0FF] hover:text-[#0088ff] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Otevřít web</span>
                      <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
