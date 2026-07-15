import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Shield, Globe, Layers, CheckCircle2 } from 'lucide-react';
// @ts-ignore
import bgHero from '../assets/images/hero_dark_bg_1784111320152.jpg';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-16 sm:py-24 border-b border-white/10">
      {/* SVG Linear Gradient for icons */}
      <svg width="0" height="0" className="absolute pointer-events-none select-none">
        <defs>
          <linearGradient id="hero-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#00B0FF" />
            <stop offset="100%" stopColor="#D400FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Premium background image with custom blending and contrast overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src={bgHero} 
          alt="BuduMítWeb design background" 
          className="w-full h-full object-cover opacity-60 filter saturate-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Soft color-enriching and contrast-safe dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/70 to-[#0A0A0A]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0A0A0A_95%)]"></div>
      </div>

      {/* Background dynamic grid with glowing spots */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Interactive moving glow orbs */}
      <motion.div 
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 -z-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0,transparent_60%)] rounded-full blur-3xl"
      />
      <motion.div 
        animate={{
          x: [0, -30, 30, 0],
          y: [0, 40, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/4 -z-10 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(212,0,255,0.05)_0,transparent_60%)] rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#00E5FF]/10 to-[#00B0FF]/10 border border-[#00E5FF]/20 text-[#00E5FF] px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>[ Profesionální moderní weby ]</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-black flex flex-col items-center justify-center tracking-normal max-w-5xl mx-auto mb-8"
        >
          <span className="text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00B0FF] to-[#D400FF] leading-none mb-3 font-black">
            BUDU MÍT WEB
          </span>
          <span className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Tvorba webových stránek na míru
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Stavíme moderní, vysoce optimalizované weby na míru. Naše prezentace běží na globální zabezpečené infrastruktuře <strong className="text-white font-semibold">Netlify</strong>, díky které získáte <strong className="text-[#00E5FF] font-semibold">hosting a SSL certifikát zdarma</strong>. Žádné drahé měsíční platby za pronájem systému ani skryté poplatky.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href="#calculator"
            className="w-full sm:w-auto bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] text-black font-sans font-black uppercase tracking-wider text-xs py-3.5 px-8 rounded-lg transition-all transform hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.25)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]"
          >
            <Zap className="h-4 w-4 fill-black" />
            <span>Okamžitá kalkulace ceny</span>
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto bg-[#121212]/80 hover:bg-[#1a1a1a] text-white font-sans font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-lg border border-white/10 transition-all flex items-center justify-center gap-2 hover:border-[#00E5FF]/40"
          >
            <span>Prohlédnout služby</span>
          </a>
        </motion.div>

        {/* Highlights Grid with staggered animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 text-left"
        >
          <div className="group bg-[#131b2e]/90 border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 hover:bg-[#1a253f]/90 p-6 rounded-xl transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/20 via-[#00B0FF]/20 to-[#D400FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#D400FF]/20 via-[#00B0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full"></div>
            <div className="text-[#00E5FF] font-mono text-[10px] mb-3 flex items-center gap-1.5 font-bold">
              <Layers className="h-5 w-5" stroke="url(#hero-icon-gradient)" />
              <span>[ 01 / TERMÍN ]</span>
            </div>
            <h3 className="font-sans font-extrabold text-white text-base group-hover:text-[#00E5FF] transition-colors duration-300">Návrh do 3 týdnů</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Garantujeme dodání prvotního funkčního návrhu k připomínkám zákazníka do 3 týdnů od podpisu smlouvy.
            </p>
          </div>

          <div className="group bg-[#131b2e]/90 border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 hover:bg-[#1a253f]/90 p-6 rounded-xl transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/20 via-[#00B0FF]/20 to-[#D400FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#D400FF]/20 via-[#00B0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full"></div>
            <div className="text-[#00E5FF] font-mono text-[10px] mb-3 flex items-center gap-1.5 font-bold">
              <Globe className="h-5 w-5" stroke="url(#hero-icon-gradient)" />
              <span>[ 02 / ROZPOČET ]</span>
            </div>
            <h3 className="font-sans font-extrabold text-white text-base group-hover:text-[#00E5FF] transition-colors duration-300">Nulový hosting</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Díky Netlify neplatíte žádné pravidelné poplatky za pronájem systému. Bezplatný SSL certifikát je samozřejmostí.
            </p>
          </div>

          <div className="group bg-[#131b2e]/90 border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 hover:bg-[#1a253f]/90 p-6 rounded-xl transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/20 via-[#00B0FF]/20 to-[#D400FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#D400FF]/20 via-[#00B0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full"></div>
            <div className="text-[#00E5FF] font-mono text-[10px] mb-3 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="h-5 w-5" stroke="url(#hero-icon-gradient)" />
              <span>[ 03 / JISTOTA ]</span>
            </div>
            <h3 className="font-sans font-extrabold text-white text-base group-hover:text-[#00E5FF] transition-colors duration-300">2x revize v ceně</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Máte plnou kontrolu nad designem. Každý balíček zahrnuje dvě samostatná kola kompletního zapracování vašich připomínek.
            </p>
          </div>

          <div className="group bg-[#131b2e]/90 border border-[#00E5FF]/15 hover:border-[#00E5FF]/40 hover:bg-[#1a253f]/90 p-6 rounded-xl transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00E5FF]/20 via-[#00B0FF]/20 to-[#D400FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#D400FF]/20 via-[#00B0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full"></div>
            <div className="text-[#00E5FF] font-mono text-[10px] mb-3 flex items-center gap-1.5 font-bold">
              <Shield className="h-5 w-5" stroke="url(#hero-icon-gradient)" />
              <span>[ 04 / BEZPEČNOST ]</span>
            </div>
            <h3 className="font-sans font-extrabold text-white text-base group-hover:text-[#00E5FF] transition-colors duration-300">Maximální bezpečnost</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Moderní statické weby nelze napadnout jako zastaralý WordPress. Nemají žádnou databázi, kterou by mohl kdokoli zneužít.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
