
import React from 'react';

export const ServicesSidebar: React.FC = () => {
  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <aside className="box-border w-[320px] border bg-[#1a1a1a] m-0 p-6 rounded-lg border-solid border-gray-700 max-md:w-full">
      <div className="box-border mb-6 m-0 p-0">
        <h2 className="box-border text-white text-[20px] font-medium mb-2 m-0 p-0">
          Your Selected Services
        </h2>
        <p className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
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
          <div className="box-border flex justify-between items-center m-0 p-0">
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
              $1,023
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        className="box-border w-full h-[40px] text-black text-center text-[14px] font-medium cursor-pointer bg-white mt-6 p-0 rounded-md hover:bg-gray-200 transition-colors"
      >
        Check Out Now
      </button>
    </aside>
  );
};
