
import React from 'react';
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
  return (
    <div className="box-border w-full min-h-screen relative overflow-x-hidden bg-[#0a0a0a] m-0 p-0">
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="box-border flex gap-8 mb-[100px] m-0 px-8 py-0 max-lg:flex-col max-md:px-6 max-sm:px-4">
          <div className="box-border flex-1 border bg-[#111111] m-0 p-8 rounded-lg border-solid border-gray-700 max-lg:w-full">
            <TokenMintForm />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <FeaturesSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <LetterheadSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <RaiseDocumentSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <WhitePaperSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <WebsitePlanSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <ExchangeListingSection />
            
            <div className="box-border w-full h-px bg-gray-700 mx-0 my-8 p-0" />
            <LegalDocumentsSection />
          </div>
          
          <div className="box-border flex flex-col gap-6 m-0 p-0 max-lg:flex-row max-lg:w-full max-sm:flex-col">
            <ServicesSidebar />
            <PaymentSidebar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
