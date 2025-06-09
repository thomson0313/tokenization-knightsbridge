import React from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TokenMintForm } from '../components/forms/TokenMintForm';
import { FeaturesSection } from '../components/forms/FeaturesSection';
import { LetterheadSection } from '../components/forms/LetterheadSection';
import { RaiseDocumentSection } from '../components/forms/RaiseDocumentSection';
import { WhitePaperSection } from '../components/forms/WhitePaperSection';
import { WebsitePlanSection } from '../components/forms/WebsitePlanSection';
import { ExchangeListingSection } from '../components/forms/ExchangeListingSection';
import { LegalDocumentsSection } from '../components/forms/LegalDocumentsSection';
import { ServicesSidebar } from '../components/sidebar/ServicesSidebar';
import { PaymentSidebar } from '../components/sidebar/PaymentSidebar';

const Index: React.FC = () => {
  return (
    <div className="box-border w-full min-h-screen relative overflow-x-hidden bg-[#0C0C0C] m-0 p-0">
      <Header />
      
      <main>
        <HeroSection />
        
        <div className="box-border flex gap-[29px] mb-[100px] m-0 px-[68px] py-0 max-md:flex-col max-md:px-10 max-md:py-0 max-sm:px-5 max-sm:py-0">
          <form className="box-border w-[875px] border backdrop-blur-[0.3px] bg-[rgba(98,87,87,0.10)] m-0 p-7 rounded-3xl border-solid border-[rgba(211,204,204,0.10)] max-md:w-full">
            <TokenMintForm />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <FeaturesSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <LetterheadSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <RaiseDocumentSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <WhitePaperSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <WebsitePlanSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <ExchangeListingSection />
            
            <div className="box-border w-full h-px bg-[#535353] mx-0 my-8 p-0" />
            <LegalDocumentsSection />
          </form>
          
          <div className="box-border flex flex-col gap-[37px] m-0 p-0 max-md:w-full max-md:flex-row max-md:gap-5 max-sm:flex-col">
            <ServicesSidebar />
            <PaymentSidebar />
          </div>
        </div>
      </main>
      
      <div className="box-border absolute top-[-367px] left-[422px] w-[581px] h-[581px] opacity-63 pointer-events-none z-[-1]">
        <svg
          width="581"
          height="581"
          viewBox="0 0 1440 1114"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="box-border m-0 p-0"
        >
          <g opacity="0.63" filter="url(#filter0_f_68_4)">
            <circle cx="290.5" cy="290.5" r="290.5" fill="white" />
          </g>
          <defs>
            <filter
              id="filter0_f_68_4"
              x="-450"
              y="-450"
              width="1481"
              height="1481"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="450"
                result="effect1_foregroundBlur_68_4"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Index;
