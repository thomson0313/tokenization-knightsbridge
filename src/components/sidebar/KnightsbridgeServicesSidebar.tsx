
import React from 'react';
import { Button } from '../ui/button';

interface KnightsbridgeServicesSidebarProps {
  onCheckout: () => void;
  selectedServices: {
    knightsbridgeService: boolean;
    serviceTax: boolean;
    vatTax: boolean;
  };
}

export const KnightsbridgeServicesSidebar: React.FC<KnightsbridgeServicesSidebarProps> = ({
  onCheckout,
  selectedServices
}) => {
  return (
    <div className="sticky top-4 border bg-bg-secondary p-6 rounded-3xl border-border-primary">
      <div className="mb-6">
        <div className="w-1 h-16 bg-text-primary mb-4"></div>
        <h2 className="text-text-primary text-2xl md:text-3xl font-normal mb-2">
          Your Selected Services
        </h2>
        <p className="text-text-secondary text-base">
          See the prices for each
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center py-2">
          <span className="text-text-primary">Knightsbridge Service</span>
          <span className="text-text-primary">$54.78</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-text-primary">Services Tax</span>
          <span className="text-text-primary">$4.78</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-text-primary">VAT Tax</span>
          <span className="text-text-primary">$4.78</span>
        </div>
        
        <div className="w-full h-px bg-border-primary my-4"></div>
        
        <div className="flex justify-between items-center py-2 font-medium">
          <span className="text-text-primary text-lg">Total</span>
          <span className="text-text-primary text-lg">$46.78</span>
        </div>
      </div>

      <Button 
        onClick={onCheckout}
        className="w-full bg-text-primary text-bg-primary hover:bg-text-secondary transition-colors py-3 text-base font-medium rounded-lg"
      >
        Check Out Now
      </Button>
    </div>
  );
};
