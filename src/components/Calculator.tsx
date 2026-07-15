import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Calculator, 
  HelpCircle, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Mail, 
  Phone, 
  FileText,
  User,
  AlertCircle
} from 'lucide-react';
import { SERVICE_PACKAGES, ADDON_FEATURES } from '../servicesData';
import { InquiryFormData, InquiryResult } from '../types';

interface CalculatorProps {
  onInquirySubmitted: () => void;
  onInquiryStateChange?: (hasActiveInquiry: boolean) => void;
}

export default function CalculatorSection({ onInquirySubmitted, onInquiryStateChange }: CalculatorProps) {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(SERVICE_PACKAGES[1].id); // Default to standard
  const isNewWeb = true; // Always true as requested to simplify process
  const [hasDomain, setHasDomain] = useState<'yes' | 'no' | 'need-help'>('yes');
  const [webTopic, setWebTopic] = useState('');
  const [designIdea, setDesignIdea] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState('');
  const [referral, setReferral] = useState('google');

  // Surcharges & Estimates
  const [priceEstimate, setPriceEstimate] = useState(0);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [copied, setCopied] = useState(false);

  const loadingMessages = [
    'Zapisujeme vaši poptávku do systému...',
    'Analyzujeme strukturu webu a vaše přání o designu...',
    'Formulujeme technické řešení pro Netlify...',
    'Generujeme kompletní cenovou nabídku a harmonogram...'
  ];

  // Rotate loading messages while submitting
  useEffect(() => {
    let interval: any;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  // Recalculate price estimate locally on the fly
  useEffect(() => {
    const selectedPkg = SERVICE_PACKAGES.find(p => p.id === serviceId);
    let base = selectedPkg ? selectedPkg.price : 0;

    // Add selected features price
    selectedFeatures.forEach(fid => {
      const addon = ADDON_FEATURES.find(f => f.id === fid);
      if (addon) {
        base += addon.price;
      }
    });

    setPriceEstimate(base);
  }, [serviceId, selectedFeatures]);

  // Handle addon checkbox toggle
  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  // Sync package changes
  const handlePackageSelect = (id: string) => {
    setServiceId(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Prosím vyplňte vaše jméno a e-mail.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Prepare payload
    const payload: InquiryFormData = {
      name,
      email,
      phone,
      serviceId,
      isNewWeb,
      hasDomain,
      webTopic,
      designIdea,
      selectedFeatures,
      customNote,
      referral
    };

    // Prepare client-side fallback variables in case local API isn't present (e.g. static Netlify)
    const selectedPkg = SERVICE_PACKAGES.find(p => p.id === serviceId);
    const packageName = selectedPkg ? selectedPkg.name : 'Vlastní řešení';
    const featureNames = selectedFeatures
      .map(fid => ADDON_FEATURES.find(f => f.id === fid)?.name || fid)
      .join(', ');
    const domainStatusText = 
      hasDomain === 'yes' ? 'Má vlastní doménu (bude se přesměrovávat)' :
      hasDomain === 'no' ? 'Nemá doménu (bude se registrovat)' :
      'Potřebuje poradit s výběrem domény';

    const fallbackProposalText = `### Děkujeme za vaši poptávku, ${name}!

Tato nabídka byla okamžitě vygenerována na základě zadaných parametrů pro **${packageName}**. Kopie byla zaznamenána do systému.

---

### 📋 REKAPITULACE SPOČTENÉHO PROJEKTU

*   **Služba/Balíček:** ${packageName}
*   **Doména:** ${domainStatusText}
*   **Téma webu:** ${webTopic || 'Nespecifikováno'}
*   **Vybrané doplňkové funkce:** ${featureNames || 'Žádné doplňkové funkce'}
*   **Jak jste se o nás dozvěděl/a:** ${referral === 'google' ? 'Google vyhledávač' : referral === 'doporuceni' ? 'Doporučení' : referral === 'muj-web' ? 'Z odkazu v patičce' : referral === 'socialni-site' ? 'Sociální sítě' : 'Jiné'}
*   **Představa o designu:** ${designIdea || 'Nespecifikováno (navrhneme nejlepší moderní vzhled na míru)'}
*   **Doplňující poznámka:** ${customNote || 'Žádná doplňující poznámka'}

---

### ⚡ PROČ BUDE VÁŠ WEB BLESKOVĚ RYCHLÝ A ZDARMA?

Váš budoucí web nasadíme na moderní globální síť **Netlify CDN**.
*   **Nulové měsíční poplatky:** Provoz hostingu i špičkový bezpečnostní SSL certifikát stojí **0 Kč navždy**.
*   **Rychlost načítání:** Protože se jedná o čistý, vysoce optimalizovaný kód (React + Tailwind), web se načítá do 0.5 sekundy.
*   **Nezávislost:** Pro stoprocentní nezávislost si sami (dle našeho podrobného návodu) založíte bezplatný účet na Netlify a zakoupíte doménu. S propojením vám kompletně zdarma pomůžeme.

---

### ⏱️ HARMONOGRAM A DALŠÍ POSTUP

1.  **Online ujasnění (do 2 dnů):** Odpovídáme vám na e-mail a upřesníme si detaily, strukturu a dodání podkladů.
2.  **Podpis smlouvy a záloha (online):** Elektronicky podepíšeme jednoduchou smlouvu o dílo a uhradíte zálohu (50 %).
3.  **Tvorba grafického návrhu a vývoj (do 2 týdnů):** Připravíme první verzi webu. Máte k dispozici **2 kola kompletního zapracování připomínek zdarma**.
4.  **Předání a spuštění na Netlify:** Jakmile web odsouhlasíte, pomůžeme vám s ním online na vaši doménu a hosting zdarma.

---

### 💰 SHRNUTÍ CENOVÉ NABÍDKY

| Položka | Cena |
| :--- | :--- |
| **Základní balíček: ${packageName}** | ${selectedPkg ? selectedPkg.price.toLocaleString('cs-CZ') : '0'} Kč |
${selectedFeatures.map(fid => {
  const f = ADDON_FEATURES.find(addon => addon.id === fid);
  return f ? `| *Doplněk: ${f.name}* | ${f.price.toLocaleString('cs-CZ')} Kč |` : '';
}).filter(Boolean).join('\n')}
| **Hosting Netlify CDN & SSL** | **0 Kč / ZDARMA** |
| **CELKOVÁ ORIENTAČNÍ CENOVÁ NABÍDKA** | **${priceEstimate.toLocaleString('cs-CZ')} Kč** |

---

### 🚀 CO UDĚLAT TEĎ?

Pokud s tímto návrhem a orientačním rozpočtem souhlasíte, klikněte níže na tlačítko **Potvrdit a spustit projekt**. Tím nám odešlete schválení na náš e-mail **budumitweb@gmail.com** a náš projektový vedoucí vás okamžitě kontaktuje pro zahájení prací.

*Tým BuduMítWeb*`;

    const formattedPriceBreakdown = `
============================================================
           BUDUMÍTWEB.CZ | PODROBNÁ KALKULACE PROJEKTU
============================================================

 👤 Klient:             ${name}
 ✉️ E-mail:             ${email}
 📞 Telefon:            ${phone || 'Neuveden'}
 🏷️ Téma webu:          ${webTopic || 'Nespecifikováno'}
 📅 Datum poptávky:     ${new Date().toLocaleDateString('cs-CZ')} v ${new Date().toLocaleTimeString('cs-CZ')}

============================================================
              POLOŽKY CENOVÉ NABÍDKY (ROZPIS)
============================================================

 📦 BALÍČEK / SLUŽBA:
    ${packageName.padEnd(40, '.')} ${selectedPkg ? selectedPkg.price.toLocaleString('cs-CZ') : '0'} Kč
    
 ➕ DOPLŇKY A FUNKCE:
${selectedFeatures.length > 0 
  ? selectedFeatures.map(fid => {
      const f = ADDON_FEATURES.find(addon => addon.id === fid);
      return f ? `    + ${f.name.padEnd(38, '.')} ${f.price.toLocaleString('cs-CZ')} Kč` : '';
    }).filter(Boolean).join('\n')
  : '    - Žádné vybrané doplňkové funkce (standardní rozsah)'
}

 ☁️ HOSTING & PROVOZ:
    Netlify CDN & SSL certifikát ................. 0 Kč (NAVŽDY ZDARMA)

============================================================
 CELKOVÁ ODHADOVANÁ CENA:                  ${priceEstimate.toLocaleString('cs-CZ')} Kč
============================================================
   * Nejsme plátci DPH. Uvedená cena je konečná a jednorázová.
   * Provoz hostingu Netlify je pro váš web ZDARMA.
============================================================
    `.trim();

    let finalResult: InquiryResult | null = null;
    let localSuccess = false;

    try {
      // 1. Submit to local API
      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        finalResult = await response.json() as InquiryResult;
        localSuccess = true;
      }
    } catch (err) {
      console.warn('Local API /api/inquire failed or not found (expected on static Netlify host):', err);
    }

    // 2. Submit to Netlify Forms (runs on production Netlify deployments)
    let netlifySuccess = false;
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'calculator',
          'name': name,
          'email': email,
          'phone': phone,
          'serviceId': serviceId,
          'hasDomain': hasDomain,
          'webTopic': webTopic,
          'designIdea': designIdea,
          'selectedFeatures': featureNames,
          'customNote': customNote,
          'referral': referral,
          'priceEstimate': priceEstimate.toString(),
          'proposalText': finalResult ? finalResult.proposalText : fallbackProposalText,
          'Podrobná kalkulace (Rozpis položek)': formattedPriceBreakdown,
          'Kompletní průvodní text nabídky': finalResult ? finalResult.proposalText : fallbackProposalText,
        }).toString(),
      });
      if (response.ok) {
        netlifySuccess = true;
      }
    } catch (err) {
      console.warn('Netlify form submission failed/not found (expected on non-Netlify environments):', err);
    }

    // If both failed, we show an error
    if (!localSuccess && !netlifySuccess) {
      setError('Nepodařilo se odeslat poptávku. Zkontrolujte prosím připojení a zkuste to znovu.');
      setIsSubmitting(false);
      return;
    }

    // If local failed but Netlify succeeded, construct a client fallback finalResult
    if (!finalResult) {
      finalResult = {
        id: Math.random().toString(36).substring(2, 11),
        submittedAt: new Date().toISOString(),
        formData: payload,
        calculatedPrice: priceEstimate,
        proposalText: fallbackProposalText,
        status: 'new'
      };
    }

    setResult(finalResult);
    onInquirySubmitted(); // Notify parent to refresh list if needed
    if (onInquiryStateChange) {
      onInquiryStateChange(true);
    }
    setIsSubmitting(false);
  };

  const handleCopyProposal = () => {
    if (result) {
      navigator.clipboard.writeText(result.proposalText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setResult(null);
    if (onInquiryStateChange) {
      onInquiryStateChange(false);
    }
    setName('');
    setEmail('');
    setPhone('');
    setServiceId(SERVICE_PACKAGES[1].id);
    setHasDomain('yes');
    setWebTopic('');
    setDesignIdea('');
    setSelectedFeatures([]);
    setCustomNote('');
    setReferral('google');
  };

  return (
    <section id="calculator" className="py-24 bg-[#0A0A0A] border-y border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest bg-[#00E5FF]/10 px-3.5 py-1.5 rounded-lg flex items-center justify-center gap-1.5 w-max mx-auto mb-4">
            <Calculator className="h-3.5 w-3.5 text-[#00E5FF]" />
            <span>[ Kalkulačka ceny ]</span>
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tighter uppercase leading-none mt-4">
            Spočítejte si cenu & získejte nabídku hned teď
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 mt-4 leading-relaxed">
            Vyberte si základní balíček, doplňte požadované funkce a zadejte svou představu. Okamžitě získáte orientační cenovou nabídku s kompletním přehledem, kterou odešleme i na váš e-mail.
          </p>
        </div>

        {/* Dynamic State: Loading Spinner */}
        {isSubmitting && (
          <div className="bg-[#151515] border border-white/10 rounded-lg p-12 text-center max-w-2xl mx-auto shadow-2xl">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00E5FF] border-t-transparent mb-6"></div>
              <h3 className="font-sans font-black text-white text-xl mb-2 uppercase tracking-tight">
                Počkejte chvilku, tvoříme kouzlo...
              </h3>
              <p className="text-sm font-mono text-[#00E5FF] font-semibold animate-pulse h-12 flex items-center justify-center">
                {loadingMessages[loadingStep]}
              </p>
              <p className="text-xs text-white/40 mt-4 font-mono">
                [ Generování nabídky na míru trvá zhruba 10-15 sekund ]
              </p>
            </div>
          </div>
        )}

        {/* Dynamic State: Result (Proposal Form Completed) */}
        {!isSubmitting && result && (
          <div className="bg-white text-black rounded-lg p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto border-4 border-black">
            <div className="text-center mb-10 border-b-2 border-black/10 pb-8">
              <div className="bg-[#00E5FF] text-black border-2 border-black h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-4xl text-black tracking-tighter uppercase leading-none mt-2">
                Nabídka úspěšně vypracována!
              </h3>
              <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
                Kopii této podrobné nabídky jsme odeslali na e-mail <strong className="text-black font-extrabold">{result.formData.email}</strong> a našemu týmu do BuduMítWeb.
              </p>

              {/* Instant price confirmation badge */}
              <div className="bg-black text-white border-2 border-[#00E5FF] rounded-lg p-5 max-w-md mx-auto mt-6 flex justify-between items-center text-left shadow-lg">
                <div>
                  <span className="text-[10px] text-[#00E5FF] font-mono uppercase tracking-widest">Kalkulovaná cena</span>
                  <p className="font-mono font-black text-3xl text-white leading-none mt-1.5">
                    {result.calculatedPrice.toLocaleString('cs-CZ')} Kč
                  </p>
                </div>
                <div className="text-right border-l border-white/10 pl-4">
                  <span className="text-[10px] text-white/60 block font-mono uppercase">Vč. 2x revizí</span>
                  <span className="text-xs text-[#00E5FF] font-bold block mt-1">Hosting Netlify: 0 Kč</span>
                </div>
              </div>
            </div>

            {/* AI Document Wrapper */}
            <div className="border-2 border-black/10 bg-slate-50 rounded-lg p-6 sm:p-8 relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleCopyProposal}
                  className="bg-black hover:bg-neutral-900 text-white p-2.5 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.15)] flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  title="Kopírovat text nabídky"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Zkopírováno!' : 'Kopírovat'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-black font-black uppercase tracking-widest mb-6">
                <Sparkles className="h-4 w-4 text-[#00E5FF] fill-[#00E5FF]" />
                <span>[ AI Projektový Návrh BuduMítWeb ]</span>
              </div>

              <div className="markdown-body prose max-w-none text-slate-800">
                <ReactMarkdown>{result.proposalText}</ReactMarkdown>
              </div>
            </div>

            {/* Action buttons at bottom */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 border-t-2 border-black/10 pt-8">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto text-xs uppercase tracking-widest font-black text-black/60 hover:text-black transition-all"
              >
                ← Nová kalkulace / spočítat jiný web
              </button>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <a
                  href={`mailto:budumitweb@gmail.com?subject=Souhlas s nabidkou - ${result.formData.name}&body=Ahoj,%0D%0Asouhlasim s vygenerovanou nabidkou pro balicek s cenou ${result.calculatedPrice} Kc. Pustme se do toho!` }
                  className="w-full sm:w-auto bg-[#00E5FF] hover:bg-[#00c8e0] text-black font-sans font-black uppercase tracking-wider text-xs py-4 px-8 rounded-lg text-center border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="h-4 w-4 stroke-[3]" />
                  <span>Potvrdit a spustit projekt</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Default State: Interactive Form */}
        {!isSubmitting && !result && (
          <div className="bg-white text-black rounded-lg overflow-hidden border-4 border-black shadow-2xl max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12">
            
            {/* Form Fields Side */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-black text-2xl text-black tracking-tighter uppercase mb-8 flex items-center gap-2 border-b-2 border-black pb-4">
                  <FileText className="h-5 w-5 text-black" />
                  <span>Specifikace poptávky</span>
                </h3>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 p-4 rounded-lg text-sm mb-6 flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Package Selector */}
                <div className="mb-6">
                  <label id="calculator-package-label" className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-2">
                    [ 1 ] Výběr základního typu webu *
                  </label>
                  <select
                    id="calculator-package-select"
                    value={serviceId}
                    onChange={(e) => handlePackageSelect(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-black rounded-lg px-4 py-3.5 text-black text-sm font-bold focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {SERVICE_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.price.toLocaleString('cs-CZ')} Kč)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Domain status */}
                <div className="mb-6">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-2.5">
                    [ 2 ] Jak jste na tom s doménou?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'yes', label: 'Mám koupenou doménu', desc: 'Přesměrujeme' },
                      { key: 'no', label: 'Nemám doménu', desc: 'Registrujeme' },
                      { key: 'need-help', label: 'Potřebuji poradit', desc: 'Vymyslíme název' }
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setHasDomain(opt.key as any)}
                        className={`p-3 rounded-lg border-2 text-xs transition-all text-center flex flex-col justify-center items-center gap-1 cursor-pointer ${
                          hasDomain === opt.key
                            ? 'border-black bg-black text-[#00E5FF] font-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                            : 'border-black/15 hover:border-black bg-white text-black font-semibold'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`text-[9px] font-mono ${hasDomain === opt.key ? 'text-[#00E5FF]/70' : 'text-slate-400'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Netlify/Domain Disclaimer */}
                  <div className="mt-3 p-3.5 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/20 text-[11px] leading-relaxed text-slate-700 flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <span>
                      <strong>Upozornění k hostingu:</strong> Standardně si klient zaregistruje zdarma sám účet Netlify a dále doménu dle vlastního výběru. S kompletním nastavením a propojením vám samozřejmě zdarma online pomůžeme.
                    </span>
                  </div>
                </div>

                {/* 3. Website Topic */}
                <div className="mb-6">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-2">
                    [ 3 ] Téma nebo zaměření vašeho budoucího webu *
                  </label>
                  <input
                    type="text"
                    required
                    value={webTopic}
                    onChange={(e) => setWebTopic(e.target.value)}
                    placeholder="Např. instalatérství, právní služby, e-shop s kávou, osobní blog..."
                    className="w-full bg-slate-50 border-2 border-black rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                {/* 4. Design Idea */}
                <div className="mb-6">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-2">
                    [ 4 ] Vaše představa o designu a obsahu (Nepovinné)
                  </label>
                  <textarea
                    rows={2}
                    value={designIdea}
                    onChange={(e) => setDesignIdea(e.target.value)}
                    placeholder="Např. moderní minimalistický styl, hodně fotek, zelená a bílá barva, vzorový web..."
                    className="w-full bg-slate-50 border-2 border-black/10 rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-medium"
                  />
                </div>

                {/* 5. Surcharges / Checked features */}
                <div className="mb-6">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-3">
                    [ 5 ] Doplňkové funkce na míru (Nepovinné)
                  </label>
                  <div className="space-y-3 bg-slate-50 p-4 rounded-lg border-2 border-black/10">
                    {ADDON_FEATURES.map((addon) => {
                      const isChecked = selectedFeatures.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`flex items-start gap-3 p-3 rounded-lg transition-all border-2 cursor-pointer select-none ${
                            isChecked 
                              ? 'bg-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                              : 'bg-transparent border-transparent hover:bg-black/5'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFeatureToggle(addon.id)}
                            className="h-4 w-4 text-black focus:ring-black border-2 border-black rounded mt-1 cursor-pointer accent-black"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs font-bold text-black">{addon.name}</span>
                              <span className="font-mono text-xs font-black text-black shrink-0 ml-2">
                                +{addon.price.toLocaleString('cs-CZ')} Kč
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{addon.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Custom Features Description */}
                <div className="mb-6">
                  <label className="block text-xs font-mono font-bold text-black uppercase tracking-widest mb-2">
                    [ 6 ] Další požadované funkce - popište, co by měl web umět (Nepovinné)
                  </label>
                  <textarea
                    rows={2}
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Např. vlastní rezervační kalendář, e-shopový košík, kalkulačka, mapa, propojení s externím API, formuláře atd."
                    className="w-full bg-slate-50 border-2 border-black/10 rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                {/* 6. Contact Details */}
                <h3 className="font-sans font-black text-xl text-black tracking-tighter uppercase mt-10 mb-6 flex items-center gap-2 border-b-2 border-black pb-3">
                  <User className="h-5 w-5 text-black" />
                  <span>Kontaktní údaje</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                      Vaše Jméno / Firma *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jan Novák"
                      className="w-full bg-slate-50 border-2 border-black/10 rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="novak@email.cz"
                      className="w-full bg-slate-50 border-2 border-black/10 rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-semibold"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                    Telefon (Doporučené)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+420 777 123 456"
                    className="w-full bg-slate-50 border-2 border-black/10 rounded-lg p-3 text-black text-sm focus:border-black focus:ring-0 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                {/* Jak jste se o nás dozvěděli dropdown */}
                <div className="mb-6">
                  <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                    Jak jste se o nás dozvěděl/a? *
                  </label>
                  <select
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-black/15 rounded-lg p-3 text-black text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black font-semibold cursor-pointer"
                  >
                    <option value="google">Vyhledávač Google</option>
                    <option value="doporuceni">Osobní doporučení</option>
                    <option value="muj-web">Přes web vytvořený od nás (v patičce)</option>
                    <option value="socialni-site">Sociální sítě (Facebook, LinkedIn apod.)</option>
                    <option value="jine">Jiné / Ostatní</option>
                  </select>
                </div>

                {/* Redundant notes block removed as custom notes is now step 4 */}
              </div>

              <button
                type="submit"
                className="w-full bg-[#00E5FF] hover:bg-[#00c8e0] text-black font-sans font-black uppercase tracking-widest py-4.5 px-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send className="h-5 w-5 stroke-[3]" />
                <span>Odeslat poptávku</span>
              </button>
            </form>

            {/* Pricing Summary Widget Side (Sticky right) */}
            <div className="bg-[#151515] text-white p-8 sm:p-10 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#00E5FF]/5 rounded-full blur-3xl"></div>

              <div>
                <span className="text-[#00E5FF] font-mono text-[10px] uppercase tracking-widest block mb-1">
                  [ SOUHRNNÁ KALKULACE ]
                </span>
                <h3 className="font-sans font-black text-2xl text-white tracking-tighter uppercase leading-none mb-8">
                  Váš balíček v reálném čase
                </h3>

                <div className="space-y-4 border-b border-white/10 pb-6 mb-6 text-sm">
                  {/* Selected base package */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-bold text-white uppercase text-xs tracking-wider">
                        {SERVICE_PACKAGES.find(p => p.id === serviceId)?.name || 'Vyberte balíček'}
                      </span>
                      <p className="text-xs text-white/50 mt-0.5">Základní balíček prezentace</p>
                    </div>
                    <span className="font-mono font-black text-[#00E5FF]">
                      {SERVICE_PACKAGES.find(p => p.id === serviceId)?.price.toLocaleString('cs-CZ')} Kč
                    </span>
                  </div>

                  {/* Features list dynamic rendering */}
                  {selectedFeatures.length > 0 && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <p className="text-[10px] font-mono font-bold text-[#00E5FF] uppercase tracking-widest">Doplňky:</p>
                      {selectedFeatures.map((fid) => {
                        const feature = ADDON_FEATURES.find(f => f.id === fid);
                        if (!feature) return null;
                        return (
                          <div key={fid} className="flex justify-between items-start gap-4 text-xs text-white/70">
                            <span>{feature.name}</span>
                            <span className="font-mono font-bold text-[#00E5FF]">{feature.price.toLocaleString('cs-CZ')} Kč</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Netlify/Hosting highlight */}
                <div className="space-y-2 mb-8 bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex justify-between text-xs text-white/60">
                    <span className="font-mono text-[10px] uppercase">Hosting (Netlify CDN)</span>
                    <span className="text-[#00E5FF] font-black font-mono">[ 0 Kč / ZDARMA ]</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <span className="font-mono text-[10px] uppercase">SSL zabezpečení</span>
                    <span className="text-[#00E5FF] font-black font-mono">[ ZDARMA ]</span>
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <span className="font-mono text-[10px] uppercase">Záruka a opravy</span>
                    <span className="text-[#00E5FF] font-black font-mono">[ V CENĚ ]</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-baseline gap-2 mb-6 border-t border-white/10 pt-6">
                  <span className="text-xs uppercase tracking-widest font-mono text-white/50">Orientační cena:</span>
                  <div className="text-right">
                    <span className="font-mono text-4xl sm:text-5xl font-black text-white tracking-tighter leading-none">
                      {priceEstimate.toLocaleString('cs-CZ')}
                    </span>
                    <span className="text-sm font-black text-[#00E5FF] ml-1 uppercase">Kč</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-white/40 leading-relaxed space-y-1">
                  <p className="flex items-start gap-1.5">
                    <span className="text-[#00E5FF] font-black">•</span>
                    <span>Cena je orientační. Po odeslání kalkulačka vytvoří přesnou specifikaci k potvrzení.</span>
                  </p>
                  <p className="flex items-start gap-1.5 mt-1">
                    <span className="text-[#00E5FF] font-black">•</span>
                    <span>Zahrnuje <strong>2 kola zapracování připomínek</strong> k návrhu grafiky.</span>
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
