/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import References from './components/References';
import FAQ from './components/FAQ';
import CalculatorSection from './components/Calculator';
import RecentInquiries from './components/RecentInquiries';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalModal from './components/LegalModals';

export default function App() {
  const [refreshInquiries, setRefreshInquiries] = useState(0);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'terms' | 'gdpr'>('terms');
  const [hasActiveInquiry, setHasActiveInquiry] = useState(false);

  useEffect(() => {
    const handleOpenLegal = (e: Event) => {
      const type = (e as CustomEvent).detail as 'terms' | 'gdpr';
      if (type) {
        setLegalType(type);
        setLegalOpen(true);
      }
    };
    window.addEventListener('open-legal', handleOpenLegal);
    return () => window.removeEventListener('open-legal', handleOpenLegal);
  }, []);

  const handleInquirySubmitted = () => {
    // Trigger list refetch in RecentInquiries component
    setRefreshInquiries((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <Header />

      {/* Hero Intro */}
      <Hero />

      {/* Services and Pricing Packages */}
      <Services />

      {/* Interactive Price Calculator & Dynamic AI Proposal Generation */}
      <CalculatorSection 
        onInquirySubmitted={handleInquirySubmitted} 
        onInquiryStateChange={setHasActiveInquiry}
      />

      {/* Portfolio References Grid */}
      <References />

      {/* How It Works workflow */}
      <HowItWorks />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FAQ />

      {/* Live submissions history */}
      {!hasActiveInquiry && <RecentInquiries refreshTrigger={refreshInquiries} />}

      {/* Direct Contact Info & Custom Question Form */}
      <Contact />

      {/* Footer Details */}
      <Footer />

      {/* Legal documents overlay */}
      <LegalModal 
        isOpen={legalOpen} 
        onClose={() => setLegalOpen(false)} 
        type={legalType} 
      />
    </div>
  );
}


