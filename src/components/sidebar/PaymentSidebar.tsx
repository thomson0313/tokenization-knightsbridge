
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
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`absolute right-0 top-0 h-full w-[400px] bg-[#1a1a1a] border-l border-[rgba(211,204,204,0.10)] transform transition-transform duration-500 ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="border-l-4 border-white pl-4 mb-8">
            <h2 className="text-white text-[35px] font-normal mb-2">
              Select Payment
            </h2>
            <p className="text-white text-[17px] font-normal">
              Easy to Pay now.
            </p>
          </div>
          
          <div className="flex-1 space-y-4">
            <div 
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedPayment === 'stripe' 
                  ? 'border-white bg-[rgba(255,255,255,0.05)]' 
                  : 'border-[#535353] hover:border-white'
              }`}
              onClick={() => setSelectedPayment('stripe')}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <span className="text-white text-xl font-normal flex-1">Stripe</span>
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                selectedPayment === 'stripe' ? 'border-white bg-white' : 'border-[#535353]'
              }`}>
                {selectedPayment === 'stripe' && (
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                )}
              </div>
            </div>

            <div 
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedPayment === 'bitcoin' 
                  ? 'border-white bg-[rgba(255,255,255,0.05)]' 
                  : 'border-[#535353] hover:border-white'
              }`}
              onClick={() => setSelectedPayment('bitcoin')}
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">₿</span>
              </div>
              <span className="text-white text-xl font-normal flex-1">Bitcoin</span>
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                selectedPayment === 'bitcoin' ? 'border-white bg-white' : 'border-[#535353]'
              }`}>
                {selectedPayment === 'bitcoin' && (
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                )}
              </div>
            </div>

            <div 
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedPayment === 'usdt' 
                  ? 'border-white bg-[rgba(255,255,255,0.05)]' 
                  : 'border-[#535353] hover:border-white'
              }`}
              onClick={() => setSelectedPayment('usdt')}
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <span className="text-white text-xl font-normal flex-1">USDT</span>
              <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
                selectedPayment === 'usdt' ? 'border-white bg-white' : 'border-[#535353]'
              }`}>
                {selectedPayment === 'usdt' && (
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handlePayNow}
            className="w-full py-4 bg-white text-black text-[17px] font-medium rounded-xl hover:bg-gray-200 transition-colors mt-8"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};
