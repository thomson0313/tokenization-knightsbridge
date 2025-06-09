import React, { useState, useEffect } from 'react';

interface ServicesSidebarProps {
  onCheckout: () => void;
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ onCheckout }) => {
  const [total, setTotal] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  // Simulate price calculation based on selected services
  useEffect(() => {
    const newTotal = 1023; // This should be calculated based on actual selected services
    setTotal(newTotal);
    
    // Animate total change
    const duration = 500;
    const startTime = Date.now();
    const startValue = animatedTotal;
    const difference = newTotal - startValue;
    
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
  }, []);

  return (
    <aside className="box-border w-full border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] m-0 p-5 rounded-3xl border-solid border-[rgba(211,204,204,0.10)]">
      <div className="box-border relative mb-8 m-0 p-0">
        <div className="flex items-center gap-2">
          <div className="box-border w-1 h-8 bg-white m-0 p-0"></div>
          <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 p-0">
            Your Selected Services
          </h2>
        </div>
        <p className="box-border text-white text-[17px] font-normal m-0 ml-5 p-0">
          See the prices for each
        </p>
      </div>
      
      <div className="box-border space-y-4 m-0 p-0">
        <div className="box-border">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Mint Token
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $34.78
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Features
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $106
            </div>
          </div>
          <div className="box-border space-y-1 ml-4 m-0 p-0">
            <div className="box-border flex justify-between items-center m-0 p-0">
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                • Revoke ownership
              </div>
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                $34
              </div>
            </div>
            <div className="box-border flex justify-between items-center m-0 p-0">
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                • Liquidity Fee
              </div>
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                $34
              </div>
            </div>
            <div className="box-border flex justify-between items-center m-0 p-0">
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                • Revoke ownership
              </div>
              <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
                $34
              </div>
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Letterhead
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $34.78
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Raise document
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $34
            </div>
          </div>
          <div className="box-border flex justify-between items-center ml-4 m-0 p-0">
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              • USA
            </div>
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              $34
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              WhitePaper
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $34
            </div>
          </div>
          <div className="box-border flex justify-between items-center ml-4 m-0 p-0">
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              • 60 Pages
            </div>
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              $34
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Website Plan
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $230
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center mb-2 m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Listing Exchange
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $34
            </div>
          </div>
          <div className="box-border flex justify-between items-center ml-4 m-0 p-0">
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              • LBank
            </div>
            <div className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
              $34
            </div>
          </div>
        </div>
        
        <div className="box-border border-t border-gray-600 pt-4">
          <div className="box-border flex justify-between items-center m-0 p-0">
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              Dex Listing
            </div>
            <div className="box-border text-white text-[16px] font-medium m-0 p-0">
              $0
            </div>
          </div>
        </div>
        
        <div className="box-border border-t-2 border-white pt-4 mt-6">
          <div className="box-border flex justify-between items-center mb-6 m-0 p-0">
            <div className="box-border text-white text-[18px] font-semibold m-0 p-0">
              Total:
            </div>
            <div className="box-border text-white text-[18px] font-semibold m-0 p-0">
              ${animatedTotal.toLocaleString()}
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
