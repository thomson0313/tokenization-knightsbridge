
import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center pt-[150px] md:pt-[200px] lg:pt-[225px] pb-[80px] md:pb-[108px] px-4">
      <div className="w-full max-w-[712px] text-center relative">
        <h1 className="text-hsl(var(--text-primary)) text-center text-3xl md:text-5xl lg:text-[75px] font-normal mb-8 md:mb-11 leading-tight">
          🚀Launch via Decentralized Path
        </h1>
        <p className="text-hsl(var(--text-primary)) text-center text-base md:text-lg lg:text-[19px] font-normal max-w-[593px] mx-auto">
          Select the services you need, enter your token details, and build
          your launch — all on your terms.
        </p>
      </div>
    </section>
  );
};
