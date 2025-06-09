
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { KYCInformationSection } from '../components/forms/knightsbridge/KYCInformationSection';
import { CustodianInformationSection } from '../components/forms/knightsbridge/CustodianInformationSection';
import { IssuerInformationSection } from '../components/forms/knightsbridge/IssuerInformationSection';
import { BusinessPlanSection } from '../components/forms/knightsbridge/BusinessPlanSection';
import { KnightsbridgeServicesSidebar } from '../components/sidebar/KnightsbridgeServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';

interface KnightsbridgeProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Knightsbridge: React.FC<KnightsbridgeProps> = ({ isDarkMode, onThemeToggle }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedServices, setSelectedServices] = useState({
    knightsbridgeService: true,
    serviceTax: true,
    vatTax: true
  });

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className={`w-full min-h-screen relative overflow-x-hidden bg-bg-primary ${!isDarkMode ? 'light' : ''}`}>
      <Header isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      
      <main>
        <HeroSection />
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-7 mb-[100px] px-4 md:px-8 lg:px-16 xl:px-[68px]">
          <form className="flex-[7] border bg-bg-secondary p-4 md:p-7 rounded-3xl border-border-primary">
            <KYCInformationSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <CustodianInformationSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <IssuerInformationSection />
            
            <div className="w-full h-px bg-border-primary my-8" />
            <BusinessPlanSection />
          </form>
          
          <div className="flex-[3] min-w-0">
            <KnightsbridgeServicesSidebar onCheckout={handleCheckout} selectedServices={selectedServices} />
            <PaymentSidebar isVisible={showPayment} onClose={handleClosePayment} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Knightsbridge;
