
import React, { useState } from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { FormInput } from '../../ui/FormInput';

export const IssuerInformationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    entityName: '',
    jurisdiction: '',
    contactPerson: '',
    contactInformation: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Issuer Information"
        description="Lorem ipsum dolor sit amet, consectetur"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <FormInput
          label="Entity Name"
          placeholder="eg BINANCE"
          value={formData.entityName}
          onChange={(value) => updateFormData('entityName', value)}
        />
        
        <FormInput
          label="Jurisdiction"
          placeholder="eg California"
          value={formData.jurisdiction}
          onChange={(value) => updateFormData('jurisdiction', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Contact Person"
          placeholder="eg phone no"
          value={formData.contactPerson}
          onChange={(value) => updateFormData('contactPerson', value)}
        />
        
        <FormInput
          label="Contact Information"
          placeholder="eg email"
          value={formData.contactInformation}
          onChange={(value) => updateFormData('contactInformation', value)}
        />
      </div>
    </section>
  );
};
