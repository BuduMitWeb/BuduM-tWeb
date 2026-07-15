import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'Jaké konkrétní výhody přináší tvorba webu na platformě Netlify?',
      answer: (
        <div className="space-y-2 text-left">
          <p>
            Tradiční redakční systémy (např. WordPress) vyžadují drahé databáze, pravidelné placené aktualizace doplňků a drahý webhosting. S <strong>BuduMítWeb.cz</strong> stavíme weby pomocí moderních technologií (Vite, React, Tailwind) a nasazujeme je na globální Netlify CDN.
          </p>
          <p>
            To pro vás znamená:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-white/70">
            <li><strong>Hosting a SSL certifikát navždy zdarma:</strong> Neplatíte tisíce korun ročně za provoz serveru.</li>
            <li><strong>Bezkonkurenční rychlost:</strong> Statické soubory se načítají mimořádně rychle z nejbližšího serveru na světě (klíčové pro Google Core Web Vitals).</li>
            <li><strong>Maximální bezpečnost:</strong> Web nemá žádnou databázi, kterou by mohl někdo napadnout. Je prakticky nehacknutelný.</li>
          </ul>
        </div>
      )
    },
    {
      question: 'Jak se liší BuduMítWeb.cz od klasických reklamních agentur v ČR?',
      answer: (
        <div className="space-y-2 text-left">
          <p>
            Tradiční agentury v Praze, Brně či Liberci často účtují za běžné weby desítky až stovky tisíc korun kvůli vysokým režijním nákladům. My kombinujeme sílu moderních <strong>low-code šablon, optimalizovaného kódu a AI nástrojů</strong>. Díky tomu výrazně zkracujeme čas vývoje z měsíců na dny.
          </p>
          <p>
            Tuto úsporu času plně přenášíme na vás v podobě velmi nízké jednorázové ceny. Navíc u nás neplatíte žádné skryté paušály za pronájem platformy – web po dokončení kompletně vlastníte vy.
          </p>
        </div>
      )
    },
    {
      question: 'Jak probíhá spolupráce a proč je 100% online přístup výhodnější?',
      answer: (
        <div className="space-y-2 text-left">
          <p>
            Vše od prvního zadání přes konzultaci až po podpis smlouvy a spuštění webu řešíme pohodlně <strong>online a po telefonu</strong>. Osobní schůzky v kancelářích pouze prodlužují čas dodání a zbytečně zvyšují konečnou cenu projektu.
          </p>
          <p>
            Postup je jednoduchý a transparentní:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-white/70">
            <li>V naší interaktivní kalkulačce si naklikáte balíček a funkce, které potřebujete.</li>
            <li>Na e-mail vám okamžitě dorazí detailní rozpis. Ozveme se vám pro doladění zadání.</li>
            <li>Online podepíšeme Smlouvu o dílo s garantovaným termínem a uhradíte zálohu 50 %.</li>
            <li>Do 2 týdnů vám předložíme funkční návrh webu ke schválení (máte 2 kola úprav v ceně).</li>
            <li>Po doplacení zbylých 50 % web spustíme na vaší doméně s hostingem na Netlify zdarma.</li>
          </ol>
        </div>
      )
    },
    {
      question: 'Pomůžete mi s výběrem a nákupem domény?',
      answer: (
        <p className="text-left">
          Ano, samozřejmě! Pokud ještě nemáte registrovanou doménu (např. www.jmeno-firmy.cz), pomůžeme vám zdarma vybrat ten nejvhodnější název s ohledem na vaši značku a zaměření podnikání. Následně vám zašleme jednoduchý odkaz pro rychlou registraci u spolehlivého českého registrátora. Doménu si kupujete na své vlastní jméno, abyste byli jejím 100% vlastníkem. Nastavení DNS záznamů a propojení s Netlify pak kompletně zařídíme my zdarma.
        </p>
      )
    },
    {
      question: 'Jak probíhají případné budoucí změny a úpravy na webu?',
      answer: (
        <div className="space-y-2 text-left">
          <p>
            Naše weby stavíme jako moderní statické prezentace, což zaručuje jejich absolutní rychlost a bezpečnost. O veškeré pozdější změny textů, fotek nebo rozšiřování obsahu se rádi postaráme my.
          </p>
          <p>
            Můžete si vybrat buď ad-hoc údržbu se sazbou <strong>600 Kč/hodinu</strong> (platíte jen za reálně odpracované minuty), nebo bezstarostnou měsíční správu za <strong>890 Kč/měsíc</strong>, která obsahuje hodinu práce v ceně, přednostní podporu a pravidelný technický monitoring.
          </p>
        </div>
      )
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute -left-16 bottom-1/4 -z-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(0,176,255,0.04)_0,transparent_65%)] rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-[#00B0FF] uppercase tracking-widest bg-[#00B0FF]/10 px-3.5 py-1.5 rounded-lg mb-4 inline-block font-bold">
            <HelpCircle className="h-3 w-3 inline mr-1.5 align-middle" />
            <span>[ Časté dotazy ]</span>
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tighter uppercase leading-none mt-2">
            Vše o tvorbě moderních webů
          </h2>
          <p className="font-sans text-sm text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
            Přečtěte si, jak stavíme moderní webové prezentace s maximální rychlostí a hostingem navždy zdarma.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`bg-white border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#00B0FF] shadow-md shadow-slate-100/50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-slate-900 tracking-tight leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#00B0FF]/10 text-[#00B0FF]' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#00B0FF]/10 rounded-lg flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-[#00B0FF]" />
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900 text-xs sm:text-sm">Máte jiný specifický dotaz?</p>
              <p className="text-slate-500 text-xs mt-0.5">Zeptejte se přímo v poptávkovém formuláři níže.</p>
            </div>
          </div>
          <a
            href="#calculator"
            className="bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] text-black font-sans font-black uppercase text-[10px] tracking-wider py-2.5 px-4 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Sestavit web v kalkulačce
          </a>
        </div>

      </div>
    </section>
  );
}
