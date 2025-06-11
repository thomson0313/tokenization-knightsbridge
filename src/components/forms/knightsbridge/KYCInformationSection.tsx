
import React, { useState } from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { FormInput } from '../../ui/FormInput';
import { UploadButton } from '../../ui/UploadButton';

export const KYCInformationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    companyNumber: '',
    companyIdNumber: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
          label="Full Name/ Company Number"
          placeholder="eg BINANCE"
          value={formData.fullName}
          onChange={(value) => updateFormData('fullName', value)}
        />
        
        <FormInput
          label="Id Number/ Company Number"
          placeholder="PASSXXX"
          value={formData.idNumber}
          onChange={(value) => updateFormData('idNumber', value)}
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
