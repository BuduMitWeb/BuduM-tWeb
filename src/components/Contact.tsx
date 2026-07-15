import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Shield, Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Obecný dotaz');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedIco, setCopiedIco] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('budumitweb@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyIco = () => {
    navigator.clipboard.writeText('01764365');
    setCopiedIco(true);
    setTimeout(() => setCopiedIco(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Prosím vyplňte jméno, e-mail a text vaší zprávy.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formattedMessage = `
============================================================
              ZPRÁVA Z WEBU: BUDUMÍTWEB.CZ
============================================================

 👤 Jméno odesílatele:   ${name}
 ✉️ E-mailová adresa:   ${email}
 🏷️ Předmět zprávy:     ${subject}
 📅 Odesláno dne:       ${new Date().toLocaleDateString('cs-CZ')} v ${new Date().toLocaleTimeString('cs-CZ')}

============================================================
                        TEXT DOTAZU
============================================================

"${message}"

============================================================
          Odpovězte přímo klientovi kliknutím na e-mail:
          mailto:${email}
============================================================
    `.trim();

    try {
      // 1. Submit to local API (useful for development preview / AI Studio container database)
      let localSuccess = false;
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            formattedMessage,
          }),
        });
        if (response.ok) {
          localSuccess = true;
        }
      } catch (err) {
        console.warn('Local API contact endpoint failed/not found (expected on Netlify static hosts):', err);
      }

      // 2. Submit to Netlify Forms (runs on production Netlify deployments)
      let netlifySuccess = false;
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': 'contact',
            'name': name,
            'email': email,
            'subject': subject,
            'message': message,
            'Vzhled e-mailu (Formátovaná zpráva)': formattedMessage,
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
        throw new Error('Nepodařilo se odeslat zprávu. Zkontrolujte prosím připojení a zkuste to znovu.');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setSubject('Obecný dotaz');
    } catch (err: any) {
      setError(err.message || 'Chyba při komunikaci se serverem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden text-slate-900">
      {/* Background radial gradient */}
      <div className="absolute top-1/4 left-10 -z-10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(212,0,255,0.03)_0,transparent_65%)] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[#00B0FF] uppercase tracking-widest bg-[#00B0FF]/10 px-3.5 py-1.5 rounded-lg font-bold"
          >
            [ Spojte se s námi ]
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans font-black text-3xl sm:text-4xl text-slate-900 tracking-tighter uppercase leading-none mt-4"
          >
            Nezávazný kontakt & Dotazy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed"
          >
            Máte specifické přání, doplňující otázku k technickému řešení na Netlify, nebo chcete jen probrat svůj budoucí web? Napište nám prostřednictvím formuláře nebo přímo na e-mail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 uppercase tracking-tight">
              Naše kontaktní údaje
            </h3>
            
            {/* Email Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-[#00B0FF]/10 rounded-xl flex items-center justify-center text-[#00B0FF] shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="flex-grow text-left">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Napište nám e-mail</span>
                  <a href="mailto:budumitweb@gmail.com" className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#00B0FF] transition-colors break-all">
                    budumitweb@gmail.com
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Kopírovat e-mail"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* ICO Business Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="flex-grow text-left">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Fakturační údaje (IČO)</span>
                  <span className="text-sm sm:text-base font-black text-slate-900">
                    IČO: 01764365
                  </span>
                </div>
                <button
                  onClick={handleCopyIco}
                  className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                  title="Kopírovat IČO"
                >
                  {copiedIco ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Online Operations Info */}
            <div className="bg-gradient-to-br from-[#002535]/5 to-purple-500/5 border border-slate-200 rounded-2xl p-6">
              <h4 className="font-sans font-bold text-sm text-slate-900 uppercase tracking-tight mb-2">
                100% Online komunikace
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Neztrácíme váš ani náš čas zbytečným dojížděním na schůzky. Veškeré konzultace, schválení návrhů, předání webu a podpis smluv provádíme efektivně, transparentně a bezpečně online. Díky tomu dokážeme udržet bezkonkurenční ceny a špičkovou kvalitu.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 uppercase tracking-tight mb-6 text-left">
              Kontaktní formulář
            </h3>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border-2 border-green-500 rounded-xl p-6 text-center shadow-lg"
                >
                  <div className="bg-green-100 text-green-600 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-sans font-black text-slate-900 text-lg uppercase tracking-tight mb-2">
                    Zpráva byla úspěšně odeslána!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Děkujeme za váš dotaz. Naše týmová podpora ho zpracuje a odpoví vám online na e-mail do 24 hodin.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-[10px] uppercase tracking-wider py-2.5 px-5 rounded-lg transition-colors cursor-pointer"
                  >
                    Poslat další dotaz
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-5 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-4 flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-bold">
                      Vaše jméno a příjmení *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Např. Jan Novák"
                      className="w-full bg-white border border-slate-200 focus:border-[#00B0FF] focus:ring-1 focus:ring-[#00B0FF]/30 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-bold">
                      E-mailová adresa *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Např. novak@firma.cz"
                      className="w-full bg-white border border-slate-200 focus:border-[#00B0FF] focus:ring-1 focus:ring-[#00B0FF]/30 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Subject field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-bold">
                      Téma dotazu
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-slate-200 focus:border-[#00B0FF] focus:ring-1 focus:ring-[#00B0FF]/30 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all text-slate-900 font-medium cursor-pointer"
                    >
                      <option value="Obecný dotaz">Obecný dotaz</option>
                      <option value="Zájem o konzultaci">Zájem o konzultaci</option>
                      <option value="Technický dotaz k Netlify">Technický dotaz k Netlify</option>
                      <option value="Změna stávajícího webu">Změna stávajícího webu</option>
                      <option value="Fakturační dotazy">Fakturační dotazy</option>
                      <option value="Jiné">Jiné</option>
                    </select>
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5 font-bold">
                      Zpráva / Váš dotaz *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Napište nám, co vás zajímá..."
                      className="w-full bg-white border border-slate-200 focus:border-[#00B0FF] focus:ring-1 focus:ring-[#00B0FF]/30 rounded-lg py-2.5 px-3.5 text-sm outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] hover:from-[#00c8e0] hover:to-[#009bc0] disabled:opacity-50 disabled:cursor-not-allowed text-black font-sans font-black uppercase text-[11px] tracking-widest py-3.5 px-6 rounded-xl transition-all shadow-[0_5px_15px_rgba(0,176,255,0.2)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-black border-t-transparent"></div>
                        <span>Odesílám...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 stroke-[2.5]" />
                        <span>Odeslat nezávazný dotaz</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
