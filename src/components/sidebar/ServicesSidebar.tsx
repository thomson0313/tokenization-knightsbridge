
import React, { useState, useEffect } from 'react';

interface ServicesSidebarProps {
  onCheckout: () => void;
  selectedServices: {
    mintToken: boolean;
    features: string[];
    letterhead: boolean;
    raiseDocument: string[];
    whitePaper: string[];
    websitePlan: boolean;
    exchangeListing: string[];
    legalDocuments: string[];
  };
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ onCheckout, selectedServices }) => {
  const [animatedPrices, setAnimatedPrices] = useState({
    mintToken: 0,
    features: 0,
    letterhead: 0,
    raiseDocument: 0,
    whitePaper: 0,
    websitePlan: 0,
    exchangeListing: 0,
    dexListing: 0,
    total: 0
  });

  // Calculate prices based on selected services
  const calculatePrices = () => {
    const prices = {
      mintToken: selectedServices.mintToken ? 34.78 : 0,
      features: selectedServices.features.length * 34,
      letterhead: selectedServices.letterhead ? 34.78 : 0,
      raiseDocument: selectedServices.raiseDocument.length * 34,
      whitePaper: selectedServices.whitePaper.length * 34,
      websitePlan: selectedServices.websitePlan ? 230 : 0,
      exchangeListing: selectedServices.exchangeListing.length * 34,
      dexListing: 0,
    };
    
    const total = Object.values(prices).reduce((sum, price) => sum + price, 0);
    return { ...prices, total };
  };

  useEffect(() => {
    const newPrices = calculatePrices();
    
    // Animate each price change
    Object.keys(newPrices).forEach((key) => {
      const currentPrice = animatedPrices[key as keyof typeof animatedPrices];
      const targetPrice = newPrices[key as keyof typeof newPrices];
      
      if (currentPrice !== targetPrice) {
        const duration = 500;
        const startTime = Date.now();
        const startValue = currentPrice;
        const difference = targetPrice - startValue;
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentValue = startValue + (difference * progress);
          
          setAnimatedPrices(prev => ({
            ...prev,
            [key]: Math.round(currentValue * 100) / 100
          }));
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }
    });
  }, [selectedServices]);

  return (
    <aside className="box-border w-full border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] dark:bg-[rgba(98,87,87,0.10)] bg-[rgba(200,200,200,0.10)] m-0 p-5 rounded-3xl border-solid border-[rgba(211,204,204,0.10)] dark:border-[rgba(211,204,204,0.10)] border-[rgba(100,100,100,0.10)]">
      <div className="box-border relative mb-8 m-0 p-0">
        <div className="flex items-center gap-2">
          <div className="box-border w-1 h-8 bg-white dark:bg-white bg-gray-900 m-0 p-0"></div>
          <h2 className="box-border text-white dark:text-white text-gray-900 text-[35px] font-normal mb-2 m-0 p-0">
            Your Selected Services
          </h2>
        </div>
        <p className="box-border text-white dark:text-white text-gray-600 text-[17px] font-normal m-0 ml-5 p-0">
          See the prices for each
        </p>
      </div>
      
      <div className="box-border space-y-4 m-0 p-0">
        {/* Mint Token */}
        <div className="flex justify-between items-center py-2 border-b border-gray-600 dark:border-gray-600 border-gray-300">
          <span className="text-white dark:text-white text-gray-900 text-[16px]">Mint Token</span>
          <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.mintToken.toFixed(2)}</span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-white dark:text-white text-gray-900 text-[16px]">Features</span>
            <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.features.toFixed(2)}</span>
          </div>
          {selectedServices.features.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.features.map((feature, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">• {feature}</span>
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Letterhead */}
        <div className="flex justify-between items-center py-2 border-b border-gray-600 dark:border-gray-600 border-gray-300">
          <span className="text-white dark:text-white text-gray-900 text-[16px]">Letterhead</span>
          <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.letterhead.toFixed(2)}</span>
        </div>

        {/* Raise Document */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-white dark:text-white text-gray-900 text-[16px]">Rasie document</span>
            <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.raiseDocument.toFixed(2)}</span>
          </div>
          {selectedServices.raiseDocument.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.raiseDocument.map((doc, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">• {doc}</span>
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WhitePaper */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-white dark:text-white text-gray-900 text-[16px]">WhitePaper</span>
            <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.whitePaper.toFixed(2)}</span>
          </div>
          {selectedServices.whitePaper.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.whitePaper.map((pages, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">• {pages}Pages</span>
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Website Plan */}
        <div className="flex justify-between items-center py-2 border-b border-gray-600 dark:border-gray-600 border-gray-300">
          <span className="text-white dark:text-white text-gray-900 text-[16px]">Website Plan</span>
          <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.websitePlan.toFixed(2)}</span>
        </div>

        {/* Listing Exchange */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-white dark:text-white text-gray-900 text-[16px]">Listing Exchange</span>
            <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.exchangeListing.toFixed(2)}</span>
          </div>
          {selectedServices.exchangeListing.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.exchangeListing.map((exchange, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">• {exchange}</span>
                  <span className="text-gray-300 dark:text-gray-300 text-gray-600">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dex Listing */}
        <div className="flex justify-between items-center py-2 border-b border-gray-600 dark:border-gray-600 border-gray-300">
          <span className="text-white dark:text-white text-gray-900 text-[16px]">Dex Listing</span>
          <span className="text-white dark:text-white text-gray-900 text-[16px]">${animatedPrices.dexListing.toFixed(2)}</span>
        </div>

        <div className="box-border border-t-2 border-white dark:border-white border-gray-900 pt-4 mt-6">
          <div className="box-border flex justify-between items-center mb-6 m-0 p-0">
            <div className="box-border text-white dark:text-white text-gray-900 text-[18px] font-semibold m-0 p-0">
              Total:
            </div>
            <div className="box-border text-white dark:text-white text-gray-900 text-[18px] font-semibold m-0 p-0">
              ${animatedPrices.total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="box-border w-[152px] h-[54px] text-black text-center text-[17px] font-normal cursor-pointer bg-white mx-auto my-0 p-0 rounded-[9px] hover:bg-gray-200 transition-all duration-200 hover:scale-105 flex items-center justify-center"
      >
        Check Out Now
      </button>
    </aside>
  );
};
