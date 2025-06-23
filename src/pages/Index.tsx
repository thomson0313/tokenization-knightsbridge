
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
import { ContactInformationSection } from '../components/forms/ContactInformationSection';
import { ServicesSidebar } from '../components/sidebar/ServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';
import { FormProvider, useFormContext } from '../contexts/FormContext';
import { useFormSubmission } from '../hooks/useFormSubmission';

interface IndexProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const IndexContent: React.FC<IndexProps> = ({ isDarkMode, onThemeToggle }) => {
  const [showPayment, setShowPayment] = useState(false);
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

  const { formData } = useFormContext();
  const { submitForm, isSubmitting } = useFormSubmission();

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePayNow = async () => {
    try {
      // Prepare form data for submission
      const submissionData = {
        main: {
          type: 'Decentralized' as const,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          token_name: formData.tokenName,
          token_ticker: formData.tokenTicker,
          token_chain: formData.tokenChain,
          token_decimals: formData.tokenDecimals,
          target_price: formData.targetPrice,
          treasury_address: formData.treasuryAddress,
          letterhead_enabled: formData.letterheadEnabled,
          letterhead_guidelines: formData.letterheadGuidelines,
          raise_document_company: formData.raiseDocumentCompany,
          raise_document_contact_name: formData.raiseDocumentContactName,
          raise_document_contact_person: formData.raiseDocumentContactPerson,
          raise_document_position: formData.raiseDocumentPosition,
          raise_document_email: formData.raiseDocumentEmail,
          raise_document_phone: formData.raiseDocumentPhone,
          raise_document_address: formData.raiseDocumentAddress,
          raise_document_website: formData.raiseDocumentWebsite,
          white_paper_pages: formData.whitePaperPages,
          white_paper_guidelines: formData.whitePaperGuidelines,
          website_plan_enabled: formData.websitePlanEnabled,
          website_plan_guidelines: formData.websitePlanGuidelines,
          legal_documents_preferences: formData.legalDocumentsPreferences,
        },
        tokenFeatures: formData.tokenFeatures,
        raiseDocumentRegions: formData.raiseDocumentRegions,
        exchangeListings: formData.exchangeListings,
        legalDocuments: formData.legalDocuments,
      };

      await submitForm(submissionData);
      setShowPayment(false);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className={`w-full min-h-screen relative overflow-x-hidden bg-bg-primary ${!isDarkMode ? 'light' : ''}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      
      <main>
        <HeroSection />
        
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-7 mb-[100px] px-4 pb-4 md:px-8 xl:px-16 xl:absolute right-0 w-full">
          <form className="flex-[7] border bg-bg-secondary p-4 md:p-7 rounded-3xl border-border-primary">
            <ContactInformationSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
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
          
          <div className="flex-[3] min-w-0 relative">
            <div className="sticky top-4">
              <ServicesSidebar onCheckout={handleCheckout} selectedServices={selectedServices} />
            </div>
          </div>
        </div>
      </main>

      {/* Payment Sidebar - positioned fixed from the right */}
      <div className={`fixed inset-y-0 right-0 z-50 w-96 transform transition-transform duration-300 ease-in-out ${
        showPayment ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <PaymentSidebar 
          isVisible={showPayment} 
          onClose={handleClosePayment}
          onPayNow={handlePayNow}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* Overlay when payment is open */}
      {showPayment && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClosePayment}
        />
      )}
    </div>
  );
};

const Index: React.FC<IndexProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <FormProvider>
      <IndexContent isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
    </FormProvider>
  );
};

export default Index;
