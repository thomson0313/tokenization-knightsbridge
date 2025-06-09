
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="box-border w-full flex justify-center m-0 pt-[225px] pb-[108px] px-0">
      <div className="box-border w-[712px] text-center relative m-0 p-0 max-md:w-full max-md:px-5 max-md:py-0 max-sm:px-5 max-sm:py-0">
        <h1 className="box-border text-white text-center text-[75px] font-normal mb-11 m-0 p-0 max-md:text-6xl max-sm:text-[40px]">
          🚀Launch via Decentralized Path
        </h1>
        <p className="box-border text-white text-center text-[19px] font-normal w-[593px] mx-auto my-0 p-0 max-sm:text-base max-sm:w-full">
          Select the services you need, enter your token details, and build
          your launch — all on your terms.
        </p>
      </div>
    </section>
  );
};
