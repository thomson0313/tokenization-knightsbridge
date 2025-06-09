
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="box-border w-full flex justify-center m-0 pt-[120px] pb-[80px] px-0">
      <div className="box-border w-[500px] text-center relative m-0 p-0 max-md:w-full max-md:px-5 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <div className="box-border text-[40px] mb-4 m-0 p-0">
          🚀
        </div>
        <h1 className="box-border text-white text-center text-[48px] font-medium mb-6 m-0 p-0 max-md:text-[40px] max-sm:text-[32px] leading-tight">
          Launch via<br />Decentralized Path
        </h1>
        <p className="box-border text-gray-400 text-center text-[16px] font-normal w-[400px] mx-auto my-0 p-0 max-sm:text-[14px] max-sm:w-full">
          Select the services you need, enter your token details, and build your launch — all on your terms.
        </p>
      </div>
    </section>
  );
};
