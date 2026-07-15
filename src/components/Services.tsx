import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { SERVICE_PACKAGES, MAINTENANCE_SERVICES } from '../servicesData';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 border-y border-slate-200/80 relative overflow-hidden text-slate-900">
      {/* Background decoration orbs */}
      <div className="absolute top-1/3 left-10 -z-10 w-72 h-72 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.06)_0,transparent_65%)] rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 -z-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.04)_0,transparent_65%)] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
         {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#00B0FF] uppercase tracking-widest bg-[#00B0FF]/10 px-3.5 py-1.5 rounded-lg mb-4 inline-block font-bold"
          >
            [ Služby a Ceník ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tighter uppercase leading-none mt-2"
          >
            Naše služby a transparentní ceny
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed"
          >
            Díky efektivnímu low-code vývoji podpořenému umělou inteligencí a hostingu na Netlify dokážeme nabídnout ceny na zlomku běžných agenturních sazeb při zachování maximální kvality.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-1.5 bg-[#00B0FF]/10 border border-[#00B0FF]/20 text-[#0088FF] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#00B0FF] animate-pulse" />
            <span>Ke každé tvorbě: 2x zapracování připomínek k návrhu zdarma!</span>
          </motion.div>
        </div>

        {/* Web Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_PACKAGES.map((pkg, index) => {
            const isStandard = pkg.id === 'standard';
            return (
              <motion.div
                key={pkg.id}
                id={`pkg-card-${pkg.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`group bg-white border rounded-2xl p-8 flex flex-col relative transition-all duration-500 cursor-pointer ${
                  isStandard
                    ? 'border-[#00B0FF] shadow-[0_20px_40px_rgba(0,176,255,0.18)] ring-4 ring-[#00B0FF]/5 z-10'
                    : 'border-slate-200 shadow-xl shadow-slate-200/50 hover:border-slate-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]'
                } hover:bg-gradient-to-br hover:from-[#002535] hover:via-[#091524] hover:to-[#22042C] hover:border-[#00E5FF]/40 hover:shadow-[0_25px_50px_rgba(212,0,255,0.15)]`}
              >
                {isStandard && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-black text-[10px] font-mono font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(0,229,255,0.4)] z-20">
                    Nejpopulárnější
                  </span>
                )}

                {/* Min-height container aligned perfectly across all cards to keep prices at same height */}
                <div className="mb-6 flex flex-col min-h-[115px] md:min-h-[125px] justify-between relative z-10">
                  <div>
                    <div className="text-[#00B0FF] group-hover:text-[#00E5FF] font-mono text-[10px] mb-1.5 font-black uppercase transition-colors">
                      {pkg.id === 'landing' ? '[ 01 / START ]' : pkg.id === 'standard' ? '[ 02 / RŮST ]' : '[ 03 / PREMIUM ]'}
                    </div>
                    <h3 className="font-sans font-black text-xl sm:text-2xl text-slate-900 group-hover:text-white leading-tight transition-colors">
                      {pkg.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-500 group-hover:text-cyan-200 font-mono mt-1.5 uppercase tracking-wider transition-colors">{pkg.subtitle}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-slate-100 group-hover:border-white/10 flex items-baseline gap-1.5 transition-colors relative z-10">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-slate-900 group-hover:text-white tracking-tighter transition-colors">
                    {pkg.price.toLocaleString('cs-CZ')}
                  </span>
                  <span className="text-[#00B0FF] group-hover:text-[#00E5FF] text-sm font-black uppercase transition-colors">Kč</span>
                  <span className="text-slate-400 group-hover:text-slate-300 text-xs ml-1 font-mono transition-colors">jednorázově</span>
                </div>

                <div className="mb-6 flex-grow relative z-10">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-slate-300 uppercase tracking-widest mb-2 transition-colors">
                    Pro koho je vhodný:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed mb-6 italic font-medium transition-colors">
                    "{pkg.suitability}"
                  </p>

                  <h4 className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-slate-300 uppercase tracking-widest mb-3 transition-colors">
                    Co balíček obsahuje:
                  </h4>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 group-hover:text-slate-200 leading-normal transition-colors">
                        <Check className="h-4 w-4 text-[#00B0FF] group-hover:text-[#00E5FF] shrink-0 mt-0.5 transition-colors" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`#calculator`}
                  className={`w-full py-3.5 px-4 rounded-xl font-sans font-black text-[11px] uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2 mt-6 relative z-10 ${
                    isStandard
                      ? 'bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] text-black shadow-[0_5px_15px_rgba(0,229,255,0.3)] hover:scale-[1.02] group-hover:from-[#00E5FF] group-hover:via-[#00B0FF] group-hover:to-[#D400FF] group-hover:text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 hover:scale-[1.02] group-hover:bg-gradient-to-r group-hover:from-[#00E5FF] group-hover:to-[#00B0FF] group-hover:text-black group-hover:border-transparent'
                  }`}
                  onClick={(e) => {
                    const calcSec = document.getElementById('calculator');
                    if (calcSec) {
                      const selectEl = document.getElementById('calculator-package-select') as HTMLSelectElement;
                      if (selectEl) {
                        selectEl.value = pkg.id;
                        const event = new Event('change', { bubbles: true });
                        selectEl.dispatchEvent(event);
                      }
                    }
                  }}
                >
                  <span>Zvolit tuto službu</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Maintenance Services Section */}
        <div id="maintenance" className="mt-28 bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-slate-900">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.03)_0,transparent_60%)] rounded-full blur-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-mono text-[#00B0FF] uppercase tracking-widest flex items-center gap-1.5 mb-4 font-bold">
                <RefreshCw className="h-3.5 w-3.5 text-[#00B0FF] animate-spin" style={{ animationDuration: '6s' }} />
                <span>[ BEZSTAROSTNÝ PROVOZ ]</span>
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-slate-900 tracking-tighter leading-none uppercase">
                Nemáte čas na aktualizace? <br />
                Postaráme se o to.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
                Chcete na svém webu občas změnit texty, přidat novou fotku, napsat článek nebo jen mít jistotu, že je vše technicky v pořádku? Vyberte si jednu z našich forem levné a bezpečné údržby.
              </p>
              
              <div className="mt-6 flex items-start gap-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <AlertCircle className="h-5 w-5 text-[#00B0FF] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Žádné fixní závazky:</strong> Formu správy můžete kdykoliv změnit, pozastavit nebo zrušit. Jsme féroví a zakládáme si na spolehlivosti.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MAINTENANCE_SERVICES.map((maint, mIdx) => (
                <motion.div
                  key={maint.id}
                  whileHover={{ y: -5, borderColor: 'rgba(0, 176, 255, 0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div>
                    <span className="text-[#00B0FF] font-mono text-[9px] uppercase tracking-widest block mb-1 font-bold">
                      {maint.id === 'hourly' ? '[ AD-HOC ÚDRŽBA ]' : '[ PRAVIDELNÁ PÉČE ]'}
                    </span>
                    <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 leading-tight">
                      {maint.name}
                    </h3>

                    <div className="mt-3 mb-3 flex items-baseline gap-1 font-mono">
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">
                        {maint.price.toLocaleString('cs-CZ')}
                      </span>
                      <span className="text-xs text-slate-500">Kč {maint.billing}</span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-6 italic">
                      "{maint.description}"
                    </p>

                    <ul className="space-y-2 border-t border-slate-200/80 pt-4">
                      {maint.includes.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-500 leading-normal">
                          <Check className="h-3.5 w-3.5 text-[#00B0FF] shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
