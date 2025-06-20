
import React from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { FormInput } from '../../ui/FormInput';
import { useFormContext } from '../../../contexts/FormContext';

export const CustodianInformationSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Custodian Information"
        description="Provide details to ensure secure and compliant management of your funds"
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
          value={formData.custodianContact}
          onChange={(value) => updateFormData('custodianContact', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormInput
          label="Custodian Registration Number"
          placeholder="PASSXXX"
          value={formData.custodianRegistration}
          onChange={(value) => updateFormData('custodianRegistration', value)}
        />
        
        <FormInput
          label="Custodian Address"
          placeholder="Full address"
          value={formData.custodianAddress}
          onChange={(value) => updateFormData('custodianAddress', value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <FormInput
          label="Custodian Services"
          placeholder="Describe services"
          value={formData.custodianServices}
          onChange={(value) => updateFormData('custodianServices', value)}
        />
      </div>
    </section>
  );
};
