
import React, { useState } from 'react';

interface PaymentSidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PaymentSidebar: React.FC<PaymentSidebarProps> = ({ isVisible, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');

  const handlePayNow = () => {
    alert(`Processing payment via ${selectedPayment}...`);
    onClose();
  };

  return (
    <div className="h-full w-full bg-bg-secondary border-l border-border-primary p-5">
      <div className="border-l-4 border-white pl-4 mb-8">
        <h2 className="text-text-primary text-[35px] font-normal mb-2">
          Select Payment
        </h2>
        <p className="text-text-secondary text-[17px] font-normal">
          Easy to Pay now.
        </p>
      </div>
      
      <div className="space-y-4">
        <div 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'stripe' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('stripe')}
        >
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">Stripe</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'stripe' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
          }`}>
            {selectedPayment === 'stripe' && (
              <div className="w-3 h-3 bg-bg-primary rounded-full"></div>
            )}
          </div>
        </div>

        <div 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'bitcoin' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('bitcoin')}
        >
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">₿</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">Bitcoin</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'bitcoin' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
          }`}>
            {selectedPayment === 'bitcoin' && (
              <div className="w-3 h-3 bg-bg-primary rounded-full"></div>
            )}
          </div>
        </div>

        <div 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'usdt' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('usdt')}
        >
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">T</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">USDT</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'usdt' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
          }`}>
            {selectedPayment === 'usdt' && (
              <div className="w-3 h-3 bg-bg-primary rounded-full"></div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handlePayNow}
        className="w-full py-4 bg-text-primary text-bg-primary text-[17px] font-medium rounded-xl hover:opacity-90 transition-opacity mt-8"
      >
        Pay Now
      </button>
    </div>
  );
};
