
import React, { useState } from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { FormInput } from '../../ui/FormInput';

export const CustodianInformationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    custodianName: '',
    contactDetails: '',
    registrationNumber: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Custodian Information"
        description="Lorem ipsum dolor sit amet, consectetur"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormInput
          label="Custodian Name"
          placeholder="eg BINANCE"
          value={formData.custodianName}
          onChange={(value) => updateFormData('custodianName', value)}
        />
        
        <FormInput
          label="Contact Details"
          placeholder="eg phone no"
          value={formData.contactDetails}
          onChange={(value) => updateFormData('contactDetails', value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormInput
          label="Custodian Registration Number"
          placeholder="PASSXXX"
          value={formData.registrationNumber}
          onChange={(value) => updateFormData('registrationNumber', value)}
        />
      </div>
    </section>
  );
};
