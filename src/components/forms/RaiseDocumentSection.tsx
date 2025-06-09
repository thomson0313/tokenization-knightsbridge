import React, { useState } from 'react';
import { RadioGroup } from '../ui/RadioGroup';
import { FormInput } from '../ui/FormInput';

export const RaiseDocumentSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactPerson: '',
    positionInCompany: '',
    email: '',
    phoneNo: '',
    companyAddress: '',
    websiteUrl: ''
  });

  const regionOptions = [
    { value: 'usa', label: 'USA' },
    { value: 'non-usa', label: 'Non USA' },
    { value: 'both', label: 'Both' }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="box-border m-0 p-0">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          Raise Document
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Create and mint your customization token
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
        <div className="box-border absolute m-0 p-0 right-0 top-6 max-sm:static max-sm:mt-5">
          <RadioGroup
            options={regionOptions}
            selectedValue={selectedRegion}
            onChange={setSelectedRegion}
            className="gap-[61px] max-sm:flex-wrap max-sm:gap-[15px]"
          />
        </div>
      </div>
      <div className="box-border grid grid-cols-[repeat(3,243px)] gap-[32px_29px] mb-8 m-0 p-0 max-md:grid-cols-[1fr_1fr] max-md:gap-5 max-sm:grid-cols-[1fr]">
        <FormInput
          label="Company Name"
          placeholder="e.g BONAM"
          value={formData.companyName}
          onChange={(value) => updateField('companyName', value)}
        />
        <FormInput
          label="Contact Name"
          placeholder="e.g BONAM"
          value={formData.contactName}
          onChange={(value) => updateField('contactName', value)}
        />
        <FormInput
          label="Contact Person"
          placeholder="e.g BONAM"
          value={formData.contactPerson}
          onChange={(value) => updateField('contactPerson', value)}
        />
        <FormInput
          label="Position in company"
          placeholder="e.g BONAM"
          value={formData.positionInCompany}
          onChange={(value) => updateField('positionInCompany', value)}
        />
        <FormInput
          label="Email"
          placeholder="e.g BONAM"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
        />
        <FormInput
          label="Phone No"
          placeholder="e.g BONAM"
          value={formData.phoneNo}
          onChange={(value) => updateField('phoneNo', value)}
        />
        <FormInput
          label="Company Address"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
          value={formData.companyAddress}
          onChange={(value) => updateField('companyAddress', value)}
          className="col-[span_2]"
        />
        <FormInput
          label="Website URL"
          placeholder="e.g www.your website.com"
          value={formData.websiteUrl}
          onChange={(value) => updateField('websiteUrl', value)}
          className="col-[span_2]"
        />
      </div>
    </section>
  );
};
