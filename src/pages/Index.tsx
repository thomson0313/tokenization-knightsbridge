
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TokenMintForm } from '../components/forms/TokenMintForm';
import { FeaturesSection } from '../components/forms/FeaturesSection';
import { LetterheadSection } from '../components/forms/LetterheadSection';
import { RaiseDocumentSection } from '../components/forms/RaiseDocumentSection';
import { WhitePaperSection } from '../components/forms/WhitePaperSection';
import { WebsitePlanSection } from '../components/forms/WebsitePlanSection';
import { ExchangeListingSection } from '../components/forms/ExchangeListingSection';
import { LegalDocumentsSection } from '../components/forms/LegalDocumentsSection';
import { ServicesSidebar } from '../components/sidebar/ServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';

const Index: React.FC = () => {
  const [showPayment, setShowPayment] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedServices, setSelectedServices] = useState({
    mintToken: false,
    features: [] as string[],
    letterhead: true, // Always enabled for letterhead
    raiseDocument: [] as string[],
    whitePaper: [] as string[],
    websitePlan: false,
    exchangeListing: [] as string[],
    legalDocuments: [] as string[]
  });

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <div className={`w-full min-h-screen relative overflow-x-hidden bg-bg-primary ${!isDarkMode ? 'light' : ''}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      
      <main>
        <HeroSection />
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7 mb-[100px] px-4 md:px-8 lg:px-16 xl:px-[68px]">
          <form className="flex-[7] border bg-bg-secondary p-4 md:p-7 rounded-3xl border-border-primary">
            <TokenMintForm />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <FeaturesSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <LetterheadSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <RaiseDocumentSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <WhitePaperSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <WebsitePlanSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <ExchangeListingSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <LegalDocumentsSection />
          </form>
          
          <div className="flex-[3] min-w-0">
            <ServicesSidebar onCheckout={handleCheckout} selectedServices={selectedServices} />
            <PaymentSidebar isVisible={showPayment} onClose={handleClosePayment} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
