import React from 'react';

export const ServicesSidebar: React.FC = () => {
  const handleCheckout = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <aside className="box-border w-[383px] border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] m-0 p-5 rounded-3xl border-solid border-[rgba(211,204,204,0.10)] max-md:w-full max-md:flex-1 max-sm:w-full">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[11px] p-0">
          Your Selected Services
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          See the prices for each
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
      </div>
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Mint Token
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $34,78
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Features
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $106
        </div>
      </div>
      <div className="box-border mb-[23px] m-0 p-0">
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            Revoke ownership
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            Liquidity Fee
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            Revoke ownership
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            Liquidity Fee
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Letterhead
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $34,78
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Rasie document
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $34
        </div>
      </div>
      <div className="box-border mb-[23px] m-0 p-0">
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            USA
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          WhitePaper
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $34
        </div>
      </div>
      <div className="box-border mb-[23px] m-0 p-0">
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            60Pages
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Website Plan
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $230
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Listing Exchgane
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $34
        </div>
      </div>
      <div className="box-border mb-[23px] m-0 p-0">
        <div className="box-border flex justify-between items-center mb-[11px] m-0 p-0">
          <div className="box-border text-white text-lg font-normal m-0 p-0">
            LBank
          </div>
          <div className="box-border text-white text-lg font-normal text-right m-0 p-0">
            $34
          </div>
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Dex Listing
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $0
        </div>
      </div>
      <div className="box-border w-full h-px bg-[#535353] mx-0 my-[23px] p-0" />
      
      <div className="box-border flex justify-between items-center mb-[23px] m-0 p-0">
        <div className="box-border text-white text-xl font-normal m-0 p-0">
          Total:
        </div>
        <div className="box-border text-white text-xl font-normal text-right m-0 p-0">
          $1,023
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        className="box-border w-[152px] h-[54px] text-black text-center text-[17px] font-normal cursor-pointer bg-white mx-auto my-0 p-0 rounded-[9px] hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        Check Out Now
      </button>
    </aside>
  );
};
