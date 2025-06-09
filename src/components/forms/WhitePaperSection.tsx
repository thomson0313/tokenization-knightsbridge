import React, { useState } from 'react';
import { RadioGroup } from '../ui/RadioGroup';

export const WhitePaperSection: React.FC = () => {
  const [selectedPages, setSelectedPages] = useState('');

  const pageOptions = [
    { value: '30', label: '30 Pages' },
    { value: '60', label: '60 Pages' },
    { value: 'none', label: 'None' }
  ];

  return (
    <section className="box-border m-0 p-0">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          White Paper
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Create and mint your customization token
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
        <div className="box-border absolute m-0 p-0 right-0 top-6 max-sm:static max-sm:mt-5">
          <RadioGroup
            options={pageOptions}
            selectedValue={selectedPages}
            onChange={setSelectedPages}
            className="gap-[51px] max-sm:flex-wrap max-sm:gap-[15px]"
          />
        </div>
      </div>
    </section>
  );
};
