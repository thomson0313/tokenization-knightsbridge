import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { FormInput } from '../ui/FormInput';
import { CategoryHeader } from '../ui/CategoryHeader';

export const RaiseDocumentSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
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

  const handleRegionChange = (region: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions(prev => [...prev, region]);
    } else {
      setSelectedRegions(prev => prev.filter(r => r !== region));
    }
  };

  const handleCategoryToggle = (checked: boolean) => {
    setIsEnabled(checked);
    setIsExpanded(checked);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Raise Document"
        description="Create and mint your customization token"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCategoryToggle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        rightContent={
          <div className="flex gap-[61px] max-sm:flex-wrap max-sm:gap-[15px]">
            {regionOptions.map((option) => (
              <CheckboxField
                key={option.value}
                label={option.label}
                checked={selectedRegions.includes(option.value)}
                onChange={(checked) => handleRegionChange(option.value, checked)}
              />
            ))}
          </div>
        }
      />
      
      <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="box-border grid grid-cols-[358px_358px] gap-[16px_20px] mb-8 m-0 p-0 max-md:grid-cols-[1fr] max-md:gap-4 max-sm:grid-cols-[1fr]">
          <FormInput
            label="Company Name"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={(value) => updateField('companyName', value)}
          />
          <FormInput
            label="Contact Name"
            placeholder="Enter contact name"
            value={formData.contactName}
            onChange={(value) => updateField('contactName', value)}
          />
          <FormInput
            label="Contact Person"
            placeholder="Enter contact person"
            value={formData.contactPerson}
            onChange={(value) => updateField('contactPerson', value)}
          />
          <FormInput
            label="Position in Company"
            placeholder="Enter position"
            value={formData.positionInCompany}
            onChange={(value) => updateField('positionInCompany', value)}
          />
        </div>
        <div className="box-border grid grid-cols-[358px_358px] gap-[16px_20px] mb-8 m-0 p-0 max-md:grid-cols-[1fr] max-md:gap-4 max-sm:grid-cols-[1fr]">
          <FormInput
            label="Email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
          />
          <FormInput
            label="Phone No."
            placeholder="Enter phone number"
            value={formData.phoneNo}
            onChange={(value) => updateField('phoneNo', value)}
          />
          <FormInput
            label="Company Address"
            placeholder="Enter address"
            value={formData.companyAddress}
            onChange={(value) => updateField('companyAddress', value)}
          />
          <FormInput
            label="Website URL"
            placeholder="Enter website URL"
            value={formData.websiteUrl}
            onChange={(value) => updateField('websiteUrl', value)}
          />
        </div>
      </div>
    </section>
  );
};
