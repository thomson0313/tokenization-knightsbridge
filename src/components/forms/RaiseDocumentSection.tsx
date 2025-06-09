
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
      <div className="box-border relative mb-6 m-0 p-0">
        <h2 className="box-border text-white text-[24px] font-medium mb-2 m-0 p-0">
          Raise Document
        </h2>
        <p className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
          Create and mint your customization token
        </p>
        <div className="box-border absolute right-0 top-0 max-sm:static max-sm:mt-4">
          <RadioGroup
            options={regionOptions}
            selectedValue={selectedRegion}
            onChange={setSelectedRegion}
            className="gap-4"
          />
        </div>
      </div>
      <div className="box-border grid grid-cols-3 gap-4 mb-6 m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
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
      </div>
      <div className="box-border grid grid-cols-2 gap-4 m-0 p-0 max-sm:grid-cols-1">
        <FormInput
          label="Company Address"
          placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
          value={formData.companyAddress}
          onChange={(value) => updateField('companyAddress', value)}
        />
        <FormInput
          label="Website URL"
          placeholder="e.g www.your website.com"
          value={formData.websiteUrl}
          onChange={(value) => updateField('websiteUrl', value)}
        />
      </div>
    </section>
  );
};
