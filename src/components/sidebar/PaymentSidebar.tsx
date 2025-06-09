import React, { useState } from 'react';

export const PaymentSidebar: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');

  const handlePayNow = () => {
    alert(`Processing payment via ${selectedPayment}...`);
  };

  return (
    <aside className="box-border w-[383px] border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] m-0 p-5 rounded-3xl border-solid border-[rgba(211,204,204,0.10)] max-md:w-full max-md:flex-1 max-sm:w-full">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[11px] p-0">
          Select Payment
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Easy to Pay now.
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
      </div>
      
      <div className="box-border flex items-center gap-[13px] mb-[17px] m-0 p-0 cursor-pointer" onClick={() => setSelectedPayment('stripe')}>
        <img
          src="/stripe-icon.png"
          alt="Stripe"
          className="box-border w-[39px] h-[39px] m-0 p-0 rounded-[17px]"
        />
        <div className="box-border text-white text-xl font-normal flex-1 m-0 p-0">
          Stripe
        </div>
        <div className="box-border w-6 h-6 border rounded-full flex items-center justify-center m-0 p-0 border-solid border-white">
          {selectedPayment === 'stripe' && (
            <div className="box-border w-[14px] h-[14px] bg-white rounded-full m-0 p-0" />
          )}
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[17px] p-0" />
      
      <div className="box-border flex items-center gap-[13px] mb-[17px] m-0 p-0 cursor-pointer" onClick={() => setSelectedPayment('bitcoin')}>
        <img
          src="/bitcoin-icon.png"
          alt="Bitcoin"
          className="box-border w-[39px] h-[39px] m-0 p-0 rounded-[17px]"
        />
        <div className="box-border text-white text-xl font-normal flex-1 m-0 p-0">
          Bitcoin
        </div>
        <div className="box-border w-6 h-6 border rounded-full flex items-center justify-center m-0 p-0 border-solid border-[#535353]">
          {selectedPayment === 'bitcoin' && (
            <div className="box-border w-[14px] h-[14px] bg-white rounded-full m-0 p-0" />
          )}
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[17px] p-0" />
      
      <div className="box-border flex items-center gap-[13px] mb-[17px] m-0 p-0 cursor-pointer" onClick={() => setSelectedPayment('usdt')}>
        <img
          src="/usdt-icon.png"
          alt="USDT"
          className="box-border w-[39px] h-[39px] m-0 p-0 rounded-[17px]"
        />
        <div className="box-border text-white text-xl font-normal flex-1 m-0 p-0">
          USDT
        </div>
        <div className="box-border w-6 h-6 border rounded-full flex items-center justify-center m-0 p-0 border-solid border-[#535353]">
          {selectedPayment === 'usdt' && (
            <div className="box-border w-[14px] h-[14px] bg-white rounded-full m-0 p-0" />
          )}
        </div>
      </div>
      
      <button
        onClick={handlePayNow}
        className="box-border w-[152px] h-[54px] text-black text-center text-[17px] font-normal cursor-pointer bg-white mt-8 mb-0 mx-auto p-0 rounded-[9px] hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        Pay Now
      </button>
    </aside>
  );
};
