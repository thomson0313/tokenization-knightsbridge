
import React, { useState } from 'react';

export const PaymentSidebar: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');

  const handlePayNow = () => {
    alert(`Processing payment via ${selectedPayment}...`);
  };

  return (
    <aside className="box-border w-[320px] border bg-[#1a1a1a] m-0 p-6 rounded-lg border-solid border-gray-700 max-md:w-full">
      <div className="box-border mb-6 m-0 p-0">
        <h2 className="box-border text-white text-[20px] font-medium mb-2 m-0 p-0">
          Select Payment
        </h2>
        <p className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
          Easy to Pay now.
        </p>
      </div>
      
      <div className="box-border space-y-4 mb-6 m-0 p-0">
        <div 
          className="box-border flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-blue-500 transition-colors m-0 border-solid border-gray-600"
          onClick={() => setSelectedPayment('stripe')}
        >
          <div className="box-border w-6 h-6 bg-blue-600 rounded m-0 p-0 flex items-center justify-center">
            <span className="text-white text-[12px]">S</span>
          </div>
          <div className="box-border text-white text-[16px] font-normal flex-1 m-0 p-0">
            Stripe
          </div>
          <div className={`box-border w-4 h-4 border rounded-full flex items-center justify-center m-0 p-0 border-solid ${selectedPayment === 'stripe' ? 'border-blue-500' : 'border-gray-600'}`}>
            {selectedPayment === 'stripe' && (
              <div className="box-border w-2 h-2 bg-blue-500 rounded-full m-0 p-0" />
            )}
          </div>
        </div>
        
        <div 
          className="box-border flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-blue-500 transition-colors m-0 border-solid border-gray-600"
          onClick={() => setSelectedPayment('bitcoin')}
        >
          <div className="box-border w-6 h-6 bg-orange-500 rounded m-0 p-0 flex items-center justify-center">
            <span className="text-white text-[12px]">₿</span>
          </div>
          <div className="box-border text-white text-[16px] font-normal flex-1 m-0 p-0">
            Bitcoin
          </div>
          <div className={`box-border w-4 h-4 border rounded-full flex items-center justify-center m-0 p-0 border-solid ${selectedPayment === 'bitcoin' ? 'border-blue-500' : 'border-gray-600'}`}>
            {selectedPayment === 'bitcoin' && (
              <div className="box-border w-2 h-2 bg-blue-500 rounded-full m-0 p-0" />
            )}
          </div>
        </div>
        
        <div 
          className="box-border flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-blue-500 transition-colors m-0 border-solid border-gray-600"
          onClick={() => setSelectedPayment('usdt')}
        >
          <div className="box-border w-6 h-6 bg-green-500 rounded m-0 p-0 flex items-center justify-center">
            <span className="text-white text-[12px]">T</span>
          </div>
          <div className="box-border text-white text-[16px] font-normal flex-1 m-0 p-0">
            USDT
          </div>
          <div className={`box-border w-4 h-4 border rounded-full flex items-center justify-center m-0 p-0 border-solid ${selectedPayment === 'usdt' ? 'border-blue-500' : 'border-gray-600'}`}>
            {selectedPayment === 'usdt' && (
              <div className="box-border w-2 h-2 bg-blue-500 rounded-full m-0 p-0" />
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={handlePayNow}
        className="box-border w-full h-[40px] text-black text-center text-[14px] font-medium cursor-pointer bg-white p-0 rounded-md hover:bg-gray-200 transition-colors"
      >
        Pay Now
      </button>
    </aside>
  );
};
