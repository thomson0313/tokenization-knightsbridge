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
    <aside className="w-full border backdrop-blur-[0.3px] bg-hsl(var(--surface-overlay)) p-4 md:p-5 rounded-3xl border-hsl(var(--border-primary))">
      <div className="relative mb-8">
        <div className="flex items-center gap-2">
          <div className="w-1 h-8 bg-hsl(var(--text-primary))"></div>
          <h2 className="text-hsl(var(--text-primary)) text-2xl md:text-3xl lg:text-[35px] font-normal mb-2">
            Your Selected Services
          </h2>
        </div>
        <p className="text-hsl(var(--text-secondary)) text-base md:text-[17px] font-normal ml-5">
          See the prices for each
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mint Token */}
        <div className="flex justify-between items-center py-2 border-b border-hsl(var(--border-primary))">
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Mint Token</span>
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.mintToken.toFixed(2)}</span>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Features</span>
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.features.toFixed(2)}</span>
          </div>
          {selectedServices.features.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.features.map((feature, index) => (
                <div key={index} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-hsl(var(--text-secondary))">• {feature}</span>
                  <span className="text-hsl(var(--text-secondary))">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Letterhead */}
        <div className="flex justify-between items-center py-2 border-b border-hsl(var(--border-primary))">
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Letterhead</span>
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.letterhead.toFixed(2)}</span>
        </div>

        {/* Raise Document */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Rasie document</span>
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.raiseDocument.toFixed(2)}</span>
          </div>
          {selectedServices.raiseDocument.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.raiseDocument.map((doc, index) => (
                <div key={index} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-hsl(var(--text-secondary))">• {doc}</span>
                  <span className="text-hsl(var(--text-secondary))">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WhitePaper */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">WhitePaper</span>
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.whitePaper.toFixed(2)}</span>
          </div>
          {selectedServices.whitePaper.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.whitePaper.map((pages, index) => (
                <div key={index} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-hsl(var(--text-secondary))">• {pages}Pages</span>
                  <span className="text-hsl(var(--text-secondary))">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Website Plan */}
        <div className="flex justify-between items-center py-2 border-b border-hsl(var(--border-primary))">
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Website Plan</span>
          <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.websitePlan.toFixed(2)}</span>
        </div>

        {/* Listing Exchange */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Listing Exchange</span>
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.exchangeListing.toFixed(2)}</span>
          </div>
          {selectedServices.exchangeListing.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.exchangeListing.map((exchange, index) => (
                <div key={index} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-hsl(var(--text-secondary))">• {exchange}</span>
                  <span className="text-hsl(var(--text-secondary))">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legal Documents */}
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">Legal Documents</span>
            <span className="text-hsl(var(--text-primary)) text-sm md:text-[16px]">${animatedPrices.legalDocuments.toFixed(2)}</span>
          </div>
          {selectedServices.legalDocuments.length > 0 && (
            <div className="ml-4 space-y-1">
              {selectedServices.legalDocuments.map((doc, index) => (
                <div key={index} className="flex justify-between items-center text-xs md:text-sm">
                  <span className="text-hsl(var(--text-secondary))">• {doc}</span>
                  <span className="text-hsl(var(--text-secondary))">$34</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t-2 border-hsl(var(--text-primary)) pt-4 mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-hsl(var(--text-primary)) text-lg font-semibold">
              Total:
            </div>
            <div className="text-hsl(var(--text-primary)) text-lg font-semibold">
              ${animatedPrices.total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full max-w-[152px] h-[54px] text-black text-center text-base md:text-[17px] font-normal cursor-pointer bg-white mx-auto p-0 rounded-[9px] hover:bg-gray-200 transition-all duration-200 hover:scale-105 flex items-center justify-center"
      >
        Check Out Now
      </button>
    </aside>
  );
};
