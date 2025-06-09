import React, { useState } from 'react';
import { RadioGroup } from '../ui/RadioGroup';

export const ExchangeListingSection: React.FC = () => {
  const [selectedExchange, setSelectedExchange] = useState('');

  const exchangeOptions = [
    { value: 'xt', label: 'XT' },
    { value: 'lbank', label: 'LBank' },
    { value: 'none', label: 'None' }
  ];

  return (
    <section className="box-border m-0 p-0">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          Listings on Exchange
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          choose your prefernces for listing
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
        <div className="box-border absolute m-0 p-0 right-0 top-6 max-sm:static max-sm:mt-5">
          <RadioGroup
            options={exchangeOptions}
            selectedValue={selectedExchange}
            onChange={setSelectedExchange}
            className="gap-[72px] max-sm:flex-wrap max-sm:gap-[15px]"
          />
        </div>
      </div>
    </section>
  );
};
