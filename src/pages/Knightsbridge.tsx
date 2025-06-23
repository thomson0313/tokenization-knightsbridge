
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { KYCInformationSection } from '../components/forms/knightsbridge/KYCInformationSection';
import { CustodianInformationSection } from '../components/forms/knightsbridge/CustodianInformationSection';
import { IssuerInformationSection } from '../components/forms/knightsbridge/IssuerInformationSection';
import { BusinessPlanSection } from '../components/forms/knightsbridge/BusinessPlanSection';
import { TokenMintForm } from '../components/forms/TokenMintForm';
import { FeaturesSection } from '../components/forms/FeaturesSection';
import { LetterheadSection } from '../components/forms/LetterheadSection';
import { RaiseDocumentSection } from '../components/forms/RaiseDocumentSection';
import { WhitePaperSection } from '../components/forms/WhitePaperSection';
import { WebsitePlanSection } from '../components/forms/WebsitePlanSection';
import { ExchangeListingSection } from '../components/forms/ExchangeListingSection';
import { LegalDocumentsSection } from '../components/forms/LegalDocumentsSection';
import { ContactInformationSection } from '../components/forms/ContactInformationSection';
import { KnightsbridgeServicesSidebar } from '../components/sidebar/KnightsbridgeServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';
import { FormProvider, useFormContext } from '../contexts/FormContext';
import { useFormSubmission } from '../hooks/useFormSubmission';

import Icon from '../assets/img/knightsbridge_icon.png';

interface KnightsbridgeProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const KnightsbridgeContent: React.FC<KnightsbridgeProps> = ({ isDarkMode, onThemeToggle }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedServices, setSelectedServices] = useState({
    knightsbridgeService: true,
    serviceTax: true,
    vatTax: true
  });

  const { formData } = useFormContext();
  const { submitForm, isSubmitting } = useFormSubmission();

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePayNow = async () => {
    try {
      // Prepare structured form data for submission
      const submissionData: any = {
        main: {
          type: 'Knightsbridge' as const,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          kyc_full_name: formData.kycFullName,
          kyc_id_number: formData.kycIdNumber,
          kyc_date_of_birth: formData.kycDateOfBirth,
          kyc_nationality: formData.kycNationality,
          kyc_address: formData.kycAddress,
          kyc_occupation: formData.kycOccupation,
          kyc_employer: formData.kycEmployer,
          kyc_income_source: formData.kycIncomeSource,
          custodian_name: formData.custodianName,
          custodian_contact: formData.custodianContact,
          custodian_registration: formData.custodianRegistration,
          custodian_address: formData.custodianAddress,
          custodian_services: formData.custodianServices,
          issuer_entity_name: formData.issuerEntityName,
          issuer_jurisdiction: formData.issuerJurisdiction,
          issuer_contact_person: formData.issuerContactPerson,
          issuer_contact_info: formData.issuerContactInfo,
          issuer_address: formData.issuerAddress,
          issuer_business_type: formData.issuerBusinessType,
          issuer_registration_number: formData.issuerRegistrationNumber,
          business_plan_type: JSON.stringify(formData.businessPlanType || {}),
          business_plan_guidelines: formData.businessPlanGuidelines,
          business_plan_executive_summary: formData.businessPlanExecutiveSummary,
          business_plan_market_analysis: formData.businessPlanMarketAnalysis,
          business_plan_financial_projections: formData.businessPlanFinancialProjections,
          token_name: formData.tokenName,
          token_ticker: formData.tokenTicker,
          token_chain: formData.tokenChain,
          token_decimals: formData.tokenDecimals,
          target_price: formData.targetPrice,
          treasury_address: formData.treasuryAddress,
          payment_amount: 15000,
          status: 'Pending'
        }
      };

      // Add optional sections only if they have data
      if (formData.tokenFeatures?.length > 0) {
        submissionData.tokenFeatures = formData.tokenFeatures;
      }

      if (formData.raiseDocumentRegions?.length > 0) {
        submissionData.raiseDocumentRegions = formData.raiseDocumentRegions;
      }

      if (formData.exchangeListings?.length > 0) {
        submissionData.exchangeListings = formData.exchangeListings;
      }

      if (formData.legalDocuments?.length > 0) {
        submissionData.legalDocuments = formData.legalDocuments;
      }

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
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 md:px-8 lg:px-16 xl:px-[68px]">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src={Icon}
                alt="Knightsbridge Icon"
                className="w-20 h-20 md:w-24 md:h-24"
              />
            </div>
            <h1 className="text-text-primary text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 leading-tight">
              Knightsbridge Approved Process
            </h1>
            <p className="text-text-secondary text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
              Submit your business plan, complete KYC, and let our team handle the legal, hosting, and compliance to ensure a secure, vetted token launch.
            </p>
          </div>
        </section>

        <div className="flex flex-col xl:flex-row gap-4 xl:gap-7 mb-[100px] px-4 pb-4 md:px-8 xl:px-16 xl:absolute right-0 w-full">
          <form className="flex-[7] border bg-bg-secondary p-4 md:p-7 rounded-3xl border-border-primary">
            <KYCInformationSection />

            <div className="w-full h-px bg-border-primary my-8" />
            <CustodianInformationSection />

            <div className="w-full h-px bg-border-primary my-8" />
            <IssuerInformationSection />

            <div className="w-full h-px bg-border-primary my-8" />
            <BusinessPlanSection />

            <div className="w-full h-px bg-border-primary my-8" />
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
              <KnightsbridgeServicesSidebar 
                onCheckout={handleCheckout} 
                selectedServices={selectedServices}
                isSubmitting={isSubmitting}
              />
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

const Knightsbridge: React.FC<KnightsbridgeProps> = (props) => {
  return (
    <FormProvider>
      <KnightsbridgeContent {...props} />
    </FormProvider>
  );
};

export default Knightsbridge;
