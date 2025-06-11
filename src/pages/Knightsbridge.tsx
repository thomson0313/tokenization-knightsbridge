
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { KYCInformationSection } from '../components/forms/knightsbridge/KYCInformationSection';
import { CustodianInformationSection } from '../components/forms/knightsbridge/CustodianInformationSection';
import { IssuerInformationSection } from '../components/forms/knightsbridge/IssuerInformationSection';
import { BusinessPlanSection } from '../components/forms/knightsbridge/BusinessPlanSection';
import { KnightsbridgeServicesSidebar } from '../components/sidebar/KnightsbridgeServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';

import Icon from '../assets/img/knightsbridge_icon.png';

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
