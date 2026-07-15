import React from 'react';
import { X, Shield, FileText, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'gdpr';
}

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!isOpen) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#0D0D0D] border-4 border-black rounded-xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-[8px_8px_0px_rgba(0,229,255,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-lg">
              {isTerms ? <FileText className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-sans font-black text-xl text-white uppercase tracking-tight">
                {isTerms ? 'Obchodní podmínky' : 'Ochrana osobních údajů (GDPR)'}
              </h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                [ BuduMítWeb Studio ]
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto text-sm text-slate-300 space-y-6 leading-relaxed font-sans">
          {isTerms ? (
            <>
              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  1. Úvodní ustanovení
                </h4>
                <p>
                  Tyto obchodní podmínky upravují vztahy mezi poskytovatelem služeb tvorby webu (BuduMítWeb, dále jen „Poskytovatel“) a objednatelem služeb (dále jen „Zákazník“). Poskytovatel nabízí služby vývoje low-code webových stránek, redesignu, údržby a nasazení na CDN platformy (např. Netlify).
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  2. Nezávazná poptávka a cenový odhad
                </h4>
                <p>
                  Výstupy z online kalkulačky na webu mají informativní a orientační charakter. Odesláním kalkulace dochází k vytvoření nezávazné poptávky. Závazná specifikace díla, přesný harmonogram a finální cena jsou stvrzeny až následnou dohodou a podpisem Smlouvy o dílo.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  3. Platební podmínky a záloha
                </h4>
                <p>
                  Tvorba webu probíhá na základě rozdělení plateb na dvě části:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
                  <li>
                    <strong>Záloha 50 %</strong> z celkové kalkulované ceny je splatná před zahájením jakýchkoliv prací na základě zálohové faktury.
                  </li>
                  <li>
                    <strong>Doplatek 50 %</strong> je splatný po kompletním dokončení, odsouhlasení a předání hotového díla Zákazníkovi.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  4. Harmonogram a dodání návrhu
                </h4>
                <p>
                  Poskytovatel se zavazuje vypracovat a předložit první graficko-strukturní návrh webu <strong>do 2 týdnů (14 kalendářních dnů)</strong> od připsání 50% zálohové platby na účet Poskytovatele a dodání veškerých potřebných podkladů ze strany Zákazníka (texty, loga, přístupy).
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  5. Revize a připomínkování
                </h4>
                <p>
                  V ceně každé nabízené služby (Vizitka, Standard, Premium) jsou standardně zahrnuta <strong>2 kola zapracování připomínek</strong> k předloženému návrhu. Za kolo připomínek se považuje ucelený seznam úprav zaslaný Zákazníkem najednou. Případné další nadstandardní revize nad rámec těchto 2 kol jsou zpoplatněny hodinovou sazbou 500 Kč/hod.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  6. Hosting a provoz na Netlify
                </h4>
                <p>
                  Weby jsou standardně stavěny pro bezplatný provoz na Netlify CDN (případně obdobných cloudových službách). Základní hostingový plán Netlify je pro Zákazníka <strong>0 Kč / doživotně zdarma</strong> (při dodržení standardních limitů přenosu dat, které plně dostačují pro 99 % běžných webů). Náklady na nákup a obnovu domény si hradí Zákazník sám, pokud není dohodnuto jinak.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  7. Záruka a servis
                </h4>
                <p>
                  Poskytovatel dává na funkčnost webu (při absenci neautorizovaných zásahů třetích stran) záruku v délce 12 měsíců. V rámci záruky jsou bezplatně odstraňovány případné technické chyby kódu.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  1. Správce osobních údajů
                </h4>
                <p>
                  Správcem osobních údajů je provozovatel projektu BuduMítWeb (dále jen „Správce“). Vaše soukromí je pro nás klíčové a osobní údaje chráníme v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR).
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  2. Zpracovávané údaje
                </h4>
                <p>
                  Při odeslání nezávazné poptávky prostřednictvím naší kalkulačky zpracováváme pouze ty údaje, které nám sami dobrovolně poskytnete, konkrétně:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
                  <li>Jméno a příjmení / Název firmy</li>
                  <li>E-mailová adresa</li>
                  <li>Telefonní číslo</li>
                  <li>Údaje o poptávaném řešení (balíček, specifikace, poznámky)</li>
                  <li>Referral zdroj (informace o tom, jak jste se o nás dozvěděli)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  3. Účel a právní základ zpracování
                </h4>
                <p>
                  Vaše osobní údaje zpracováváme výhradně pro účely:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
                  <li><strong>Jednání o smlouvě:</strong> Zpracování kalkulace, příprava nabídky na míru a komunikace vedoucí k uzavření smlouvy o dílo.</li>
                  <li><strong>Oprávněný zájem:</strong> Zlepšování našich služeb na základě vyhodnocení referral zdrojů (jak se o nás lidé dozvídají).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  4. Doba uchování údajů
                </h4>
                <p>
                  Osobní údaje z poptávek uchováváme po dobu nezbytnou pro vyřízení poptávky a komunikaci se Zákazníkem, nejdéle však po dobu <strong>5 let</strong> od odeslání kalkulace, pokud nedojde k realizaci zakázky a uzavření smlouvy (v takovém případě se řídí zákonnými lhůtami pro archivaci účetních dokladů).
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  5. Zabezpečení a příjemci údajů
                </h4>
                <p>
                  Údaje jsou bezpečně uloženy v interní databázi na našich zabezpečených serverech. Osobní údaje neprodáváme ani nesdílíme s žádnými třetími stranami za marketingovými účely. Jediným zpracovatelem je náš autorizovaný tým administrátorů webu.
                </p>
              </div>

              <div>
                <h4 className="text-white font-bold uppercase text-xs tracking-wider font-mono text-[#00E5FF] mb-2">
                  6. Vaše práva podle GDPR
                </h4>
                <p>
                  Jako subjekt údajů máte plné právo na:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-400">
                  <li>Právo na přístup k vašim osobním údajům a pořízení kopie.</li>
                  <li>Právo na opravu nebo doplnění nepřesných údajů.</li>
                  <li>Právo na výmaz (právo „být zapomenut“), pokud již pominul účel zpracování.</li>
                  <li>Právo na omezení zpracování vašich údajů.</li>
                  <li>Právo vznést námitku proti zpracování na základě oprávněného zájmu.</li>
                </ul>
                <p className="mt-3">
                  Pro uplatnění jakéhokoliv z těchto práv nás stačí kontaktovat na našem e-mailu: <strong>budumitweb@gmail.com</strong>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-white/10 bg-black flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[#00E5FF] hover:bg-[#00c8e0] text-black font-sans font-black uppercase text-xs tracking-wider py-3 px-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all cursor-pointer transform active:scale-[0.98]"
          >
            Rozumím & Zavřít
          </button>
        </div>
      </div>
    </div>
  );
}
