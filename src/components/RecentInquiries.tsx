import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Calendar, Badge, User, Clock, CheckCircle2, ChevronRight, Eye, X } from 'lucide-react';
import { InquiryResult } from '../types';
import { SERVICE_PACKAGES } from '../servicesData';

interface RecentInquiriesProps {
  refreshTrigger: number;
}

export default function RecentInquiries({ refreshTrigger }: RecentInquiriesProps) {
  const [inquiries, setInquiries] = useState<InquiryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryResult | null>(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [refreshTrigger]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('cs-CZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  const getPackageName = (serviceId: string) => {
    const pkg = SERVICE_PACKAGES.find(p => p.id === serviceId);
    return pkg ? pkg.name : 'Vlastní řešení';
  };

  if (inquiries.length === 0 && !loading) {
    return null; // Silently hide if empty
  }

  return (
    <section className="py-24 bg-[#0A0A0A] border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-widest bg-[#00E5FF]/10 px-3.5 py-1.5 rounded-lg">
              [ Transparentnost & Inspirace ]
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tighter uppercase leading-none mt-5">
              Poslední vygenerované nabídky
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-xl leading-relaxed">
              Podívejte se na reálné příklady kalkulací a projektových plánů, které náš AI asistent na míru sestavil pro předchozí zájemce.
            </p>
          </div>
          
          <button
            onClick={fetchInquiries}
            className="font-mono text-xs font-bold text-[#00E5FF] hover:underline mt-4 md:mt-0 flex items-center gap-1.5 cursor-pointer uppercase tracking-widest"
          >
            Aktualizovat seznam [ ↻ ]
          </button>
        </div>

        {/* Loading state */}
        {loading && inquiries.length === 0 ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00E5FF] border-t-transparent"></div>
          </div>
        ) : (
          /* Grid of recent inquiries */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiries.slice(0, 6).map((inquiry) => {
              return (
                <div
                  key={inquiry.id}
                  className="bg-[#151515] border-2 border-white/10 p-6 rounded-lg flex flex-col justify-between hover:border-[#00E5FF]/50 transition-all duration-300 shadow-lg"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm">
                        ID: {inquiry.id}
                      </div>
                      <span className="text-[11px] text-white/40 flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3 text-[#00E5FF]" />
                        {formatDate(inquiry.submittedAt).split(' v ')[0]}
                      </span>
                    </div>

                    <h4 className="font-sans font-black text-white text-base tracking-tight flex items-center gap-1.5">
                      <User className="h-4 w-4 text-white/40 shrink-0" />
                      <span>{inquiry.formData.name.length > 25 ? `${inquiry.formData.name.substring(0, 25)}...` : inquiry.formData.name}</span>
                    </h4>

                    <p className="text-xs text-white/60 mt-2 font-semibold">
                      Poptávka: <span className="text-[#00E5FF] font-bold">{getPackageName(inquiry.formData.serviceId)}</span>
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-baseline">
                      <span className="text-[11px] text-white/40 font-mono">Orientační cena:</span>
                      <span className="font-mono text-base font-black text-[#00E5FF]">
                        {inquiry.calculatedPrice.toLocaleString('cs-CZ')} Kč
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="w-full mt-6 bg-transparent hover:bg-[#00E5FF]/10 text-white hover:text-[#00E5FF] border-2 border-white/10 hover:border-[#00E5FF] py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Zobrazit celou nabídku</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Viewer for Selected Inquiry AI Proposal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-white text-black rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border-4 border-black">
              
              {/* Modal Header */}
              <div className="p-6 border-b-2 border-black/10 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="bg-black text-[#00E5FF] p-2.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="h-4 w-4 fill-[#00E5FF]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-black text-lg tracking-tight uppercase leading-none">
                      AI Nabídka pro: {selectedInquiry.formData.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                      Vytvořeno {formatDate(selectedInquiry.submittedAt)} • Kalkulace: {selectedInquiry.calculatedPrice.toLocaleString('cs-CZ')} Kč
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="bg-white hover:bg-slate-100 text-black p-2 rounded-lg border-2 border-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <X className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>

              {/* Modal content body (scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow bg-white">
                <div className="markdown-body prose max-w-none text-slate-800">
                  <ReactMarkdown>{selectedInquiry.proposalText}</ReactMarkdown>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-4 border-t-2 border-black/10 bg-slate-50 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="bg-black hover:bg-neutral-900 text-white font-sans font-black uppercase tracking-wider text-xs py-3.5 px-6 rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-[1.01] cursor-pointer"
                >
                  Zavřít náhled
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
