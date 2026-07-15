import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, FileSignature, Layers, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Detail poptávky & kalkulace',
      icon: ClipboardList,
      description: 'Vyberete si základní typ webu, zaškrtnete doplňkové funkce a kalkulačka vám okamžitě spočítá orientační cenu. Vyplníte zadání a odešlete poptávku.',
      details: 'Okamžitě získáte navrženou strukturu s rozpisem přímo na e-mail.'
    },
    {
      number: '02',
      title: 'Smlouva o dílo & platba zálohy (50 %)',
      icon: FileSignature,
      description: 'Plně online s vámi potvrdíme zadání. Podepíšeme Smlouvu o dílo s garantovaným termínem a uhradíte zálohu ve výši 50 %.',
      details: 'Díky smlouvě máte 100% jistotu doručení a jasně dané ceny.'
    },
    {
      number: '03',
      title: 'Návrh webu do 2 týdnů',
      icon: Layers,
      description: 'Do 14 dnů od zaplacení zálohy vám připravíme kompletní grafický a funkční návrh. Uvidíte reálnou strukturu webu a rozmístění prvků.',
      details: 'Vše je plně responzivní a optimalizované pro mobily i desktopy.'
    },
    {
      number: '04',
      title: 'Připomínky & precizní úpravy',
      icon: RefreshCw,
      description: 'Návrh si detailně projdete. V ceně každého balíčku máte 2 kola zapracování vašich připomínek. Společně doladíme detaily, barvy a texty.',
      details: 'Upravujeme tak dlouho, dokud není návrh do puntíku dokonalý.'
    },
    {
      number: '05',
      title: 'Finální doplatek, předání & spuštění',
      icon: CheckCircle,
      description: 'Po odsouhlasení finální verze doplatíte zbylých 50 %. Web spustíme na Netlify CDN s hostingem a SSL certifikátem navždy zdarma.',
      details: 'Předáme vám plně funkční hotové dílo připravené pro bezproblémový provoz.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0A0A0A] border-b border-white/10 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/4 -z-10 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.02)_0,transparent_60%)] rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest bg-[#00E5FF]/10 px-3.5 py-1.5 rounded-lg font-bold"
          >
            [ JASNÝ A FÉR PROCES ]
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase leading-none mt-4"
          >
            Jak probíhá tvorba vašeho webu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed"
          >
            Žádné skryté háčky ani nekonečné čekání. Celým procesem vás provedeme krok za krokem, abyste přesně věděli, v jaké fázi se váš projekt nachází.
          </motion.p>
        </div>

        {/* Steps Grid with stagger effect */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(0, 229, 255, 0.3)' }}
                className="bg-[#111111]/95 border border-white/5 p-6 rounded-2xl relative flex flex-col justify-between hover:bg-[#1a1a1a] hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 shadow-xl group text-left"
              >
                {/* Number Accent */}
                <div className="absolute top-4 right-4 font-mono font-black text-2xl text-white/5 group-hover:text-[#00E5FF]/10 transition-colors">
                  {step.number}
                </div>

                <div>
                  {/* Icon */}
                  <div className="bg-[#00E5FF]/10 text-[#00E5FF] p-3 rounded-xl w-max mb-6 border border-[#00E5FF]/20 group-hover:scale-110 group-hover:bg-[#00E5FF]/20 transition-all duration-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-black text-sm sm:text-base text-white tracking-tight uppercase mb-3 leading-snug group-hover:text-[#00E5FF] transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[11px] sm:text-xs text-slate-400 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                {/* Footnote details */}
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-slate-500 leading-normal">
                  <span className="text-[#00E5FF] font-bold mr-1">⚡ Info:</span>
                  {step.details}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Info box */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-[#111111]/90 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
            <div className="bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] text-lg font-black font-mono px-4 py-2 rounded-xl shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              50% / 50%
            </div>
            <div>
              <h4 className="font-sans font-bold text-white text-sm sm:text-base uppercase tracking-tight">Férové rozdělení plateb a jistota</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">Záloha 50 % se platí před zahájením prací po podpisu smlouvy. Zbývajících 50 % uhradíte až po schválení hotového webu před spuštěním.</p>
            </div>
          </div>
          <a
            href="#calculator"
            className="w-full sm:w-auto bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] text-black font-sans font-black uppercase tracking-wider text-xs py-3.5 px-6 rounded-lg text-center transition-all whitespace-nowrap shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-[1.03] active:scale-[0.97]"
          >
            Zkusit kalkulaci hned
          </a>
        </motion.div>

      </div>
    </section>
  );
}
