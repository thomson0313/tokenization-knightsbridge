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

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className="box-border w-full min-h-screen relative overflow-x-hidden bg-[#0C0C0C] m-0 p-0">
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="box-border flex gap-[29px] mb-[100px] m-0 px-[68px] py-0 max-md:flex-col max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
          <form className="box-border flex-[7] border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] m-0 p-7 rounded-3xl border-solid border-[rgba(211,204,204,0.10)] max-md:w-full">
            <TokenMintForm />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <FeaturesSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <LetterheadSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <RaiseDocumentSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <WhitePaperSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <WebsitePlanSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <ExchangeListingSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <LegalDocumentsSection />
          </form>
          
          <div className="box-border flex-[3] m-0 p-0 max-md:w-full">
            <ServicesSidebar onCheckout={handleCheckout} />
          </div>
        </div>
      </main>
      
      <PaymentSidebar isVisible={showPayment} onClose={handleClosePayment} />
    </div>
  );
};

export default Index;
