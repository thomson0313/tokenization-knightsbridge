
import React from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { FormInput } from '../../ui/FormInput';
import { UploadButton } from '../../ui/UploadButton';
import { useFormContext } from '../../../contexts/FormContext';

export const KYCInformationSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const handleProofOfIdentityUpload = (file: File) => {
    console.log('Proof of Identity uploaded:', file.name);
  };

  const handleProofOfAddressUpload = (file: File) => {
    console.log('Proof of Address uploaded:', file.name);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="KYC Information"
        description="Quickly verify your identity to ensure a safe and compliant experience"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormInput
          label="Full Name"
          placeholder="eg John Doe"
          value={formData.kycFullName}
          onChange={(value) => updateFormData('kycFullName', value)}
        />
        
        <FormInput
          label="ID Number"
          placeholder="PASSXXX"
          value={formData.kycIdNumber}
          onChange={(value) => updateFormData('kycIdNumber', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormInput
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={formData.kycDateOfBirth}
          onChange={(value) => updateFormData('kycDateOfBirth', value)}
        />
        
        <FormInput
          label="Nationality"
          placeholder="eg American"
          value={formData.kycNationality}
          onChange={(value) => updateFormData('kycNationality', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormInput
          label="Address"
          placeholder="Full address"
          value={formData.kycAddress}
          onChange={(value) => updateFormData('kycAddress', value)}
        />
        
        <FormInput
          label="Occupation"
          placeholder="Your occupation"
          value={formData.kycOccupation}
          onChange={(value) => updateFormData('kycOccupation', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <FormInput
          label="Employer"
          placeholder="Company name"
          value={formData.kycEmployer}
          onChange={(value) => updateFormData('kycEmployer', value)}
        />
        
        <FormInput
          label="Income Source"
          placeholder="eg Salary, Business"
          value={formData.kycIncomeSource}
          onChange={(value) => updateFormData('kycIncomeSource', value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col">
          <label className="text-text-primary text-[14px] font-medium mb-4">
            Proof of Identity Upload
          </label>
          <UploadButton
            label="eg file.pdf"
            onFileUpload={handleProofOfIdentityUpload}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="text-text-primary text-[14px] font-medium mb-4">
            Proof of Address Upload
          </label>
          <UploadButton
            label="eg file.pdf"
            onFileUpload={handleProofOfAddressUpload}
          />
        </div>
      </div>
    </section>
  );
};
