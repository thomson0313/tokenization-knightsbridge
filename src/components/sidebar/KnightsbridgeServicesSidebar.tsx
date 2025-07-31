import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useFormContext } from '../../contexts/FormContext';

interface KnightsbridgeServicesSidebarProps {
  onCheckout: (totalAmount: number) => void;
  selectedServices: {
    knightsbridgeService: boolean;
    serviceTax: boolean;
    vatTax: boolean;
  };
  isSubmitting?: boolean;
}

export const KnightsbridgeServicesSidebar: React.FC<KnightsbridgeServicesSidebarProps> = ({
  onCheckout,
  selectedServices,
  isSubmitting = false
}) => {
  const { formData } = useFormContext();
  const [animatedTotal, setAnimatedTotal] = useState(200); // Start with Knightsbridge Service + Mint Token

  // Calculate which services are enabled based on form data with per-item pricing
  const getEnabledServices = () => {
    const services = [];
    
    // Knightsbridge Service is always included
    services.push({ name: 'Knightsbridge Service', price: 100 });
    
    // Mint Token is always included
    services.push({ name: 'Mint Token', price: 100 });
    
    // Features - $100 per feature
    if (formData.featuresEnabled && formData.tokenFeatures && formData.tokenFeatures.length > 0) {
      const featureLabels: { [key: string]: string } = {
        'revokeOwnership': 'Revoke ownership',
        'liquidityFee': 'Liquidity Fee',
        'pausable': 'Pausable',
        'fees': 'Fees',
        'deflationary': 'Deflationary',
        'blacklist': 'Blacklist',
        'transactionLimits': 'Transaction Limits',
        'superchain': 'Superchain',
        'walletLimits': 'Wallet Limits',
        'marketingFee': 'Marketing Fee',
        'interoperability': 'Interoperability',
        'verifyContract': 'Verify Contract',
        'ableToMint': 'Able to mint?',
        'ableToBurn': 'Able to Burn?',
        'others': 'Others'
      };
      
      formData.tokenFeatures.forEach(feature => {
        const label = featureLabels[feature] || feature;
        services.push({ name: `${label} (Features)`, price: 100 });
      });
    }
    
    // Letterhead
    if (formData.letterheadEnabled) {
      services.push({ name: 'Letterhead', price: 100 });
    }
    
    // Raise Document - $100 per region
    if (formData.raiseDocumentEnabled && formData.raiseDocumentRegions && formData.raiseDocumentRegions.length > 0) {
      const regionLabels: { [key: string]: string } = {
        'usa': 'USA',
        'nonUsa': 'Non USA',
        'both': 'Both'
      };
      
      formData.raiseDocumentRegions.forEach(region => {
        const label = regionLabels[region] || region;
        services.push({ name: `${label} (Raise Document)`, price: 100 });
      });
    }
    
    // White Paper - $100 per page option
    if (formData.whitePaperEnabled && formData.whitePaperPages && formData.whitePaperPages !== 'none') {
      const pageLabels: { [key: string]: string } = {
        '30': '30 Pages',
        '60': '60 Pages'
      };
      
      const label = pageLabels[formData.whitePaperPages] || formData.whitePaperPages;
      services.push({ name: `${label} (White Paper)`, price: 100 });
    }
    
    // Website Plan
    if (formData.websitePlanEnabled) {
      services.push({ name: 'Website Plan', price: 1000 });
    }
    
    // Exchange Listing - $100 per exchange
    if (formData.exchangeListingEnabled && formData.exchangeListings && formData.exchangeListings.length > 0) {
      const exchangeLabels: { [key: string]: string } = {
        'xt': 'XT',
        'lbank': 'LBank',
        'etf': 'ETF'
      };
      
      formData.exchangeListings.forEach(exchange => {
        const label = exchangeLabels[exchange] || exchange;
        services.push({ name: `${label} (Exchange Listing)`, price: 100 });
      });
    }
    
    // Legal Documents - $100 per document
    if (formData.legalDocumentsEnabled && formData.legalDocuments && formData.legalDocuments.length > 0) {
      const documentLabels: { [key: string]: string } = {
        'offeringMemorandum': 'Offering Memorandum',
        'smartContractLegalOpinion': 'Smart Contract Legal Opinion',
        'nonDisclosureAgreement': 'Non-disclosure Agreement',
        'securityTokenOffering': 'Security Token Offering',
        'tokenPurchaseAgreement': 'Token Purchase Agreement',
        'sada': 'SADA',
        'nda': 'NDA',
        'smartContractAudit': 'Smart Contract Audit',
        'tokenomicsWhitepaper': 'Tokenomics Whitepaper',
        'mutualNda': 'Mutual NDA'
      };
      
      formData.legalDocuments.forEach(document => {
        const label = documentLabels[document] || document;
        services.push({ name: `${label} (Legal Documents)`, price: 100 });
      });
    }
    
    return services;
  };

  const enabledServices = getEnabledServices();
  const totalPrice = enabledServices.reduce((sum, service) => sum + service.price, 0);

  // Animate total price changes
  useEffect(() => {
    const currentTotal = animatedTotal;
    const targetTotal = totalPrice;

    if (currentTotal !== targetTotal) {
      const duration = 500;
      const startTime = Date.now();
      const startValue = currentTotal;
      const difference = targetTotal - startValue;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = startValue + (difference * progress);

        setAnimatedTotal(Math.round(currentValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [totalPrice]);

  const handleCheckout = () => {
    onCheckout(totalPrice);
  };

  return (
    <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto border bg-bg-secondary p-6 rounded-3xl border-border-primary">
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-1 h-16 lg:h-20 bg-text-primary flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <h2 className="text-text-primary text-2xl md:text-3xl lg:text-[35px] font-normal mb-2">
              Your Selected Services
            </h2>
            <p className="text-text-secondary text-base md:text-[17px] font-normal">
              See the prices for each
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {enabledServices.map((service, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <span className="text-text-primary">{service.name}</span>
            <span className="text-text-primary">${service.price}</span>
          </div>
        ))}
        
        <div className="w-full h-px bg-border-primary my-4"></div>
        
        <div className="flex justify-between items-center py-2 font-medium">
          <span className="text-text-primary text-lg">Total</span>
          <span className="text-text-primary text-lg">${animatedTotal}</span>
        </div>
      </div>

      <Button 
        onClick={handleCheckout}
        disabled={isSubmitting}
        className="w-full bg-text-primary text-bg-primary hover:bg-text-secondary transition-colors py-3 text-base font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Check Out Now'}
      </Button>
    </div>
  );
};
