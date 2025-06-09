
import React, { useState, useEffect } from 'react';

interface ServicesSidebarProps {
  onCheckout: () => void;
}

export const ServicesSidebar: React.FC<ServicesSidebarProps> = ({ onCheckout }) => {
  const [total, setTotal] = useState(0);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  // Simulate price calculation based on selected services
  useEffect(() => {
    const newTotal = 0; // Start with 0 as requested
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
