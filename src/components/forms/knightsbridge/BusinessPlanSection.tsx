
import React from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { CheckboxField } from '../../ui/CheckboxField';
import { UploadButton } from '../../ui/UploadButton';
import { useFormContext } from '../../../contexts/FormContext';

export const BusinessPlanSection: React.FC = () => {
  const { formData, updateArrayField, updateFormData } = useFormContext();

  const handleUploadPlanGuide = (file: File) => {
    console.log('Business plan guide uploaded:', file.name);
  };

  const handleUploadDocument = (file: File) => {
    console.log('Document uploaded:', file.name);
  };

  const handleGuidelinesChange = (guidelines: string) => {
    updateFormData('businessPlanGuidelines', guidelines);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Business Plan"
        description="Outline your strategy to drive growth and achieve your goals"
        rightContent={
          <UploadButton
            label="Upload Plan guide"
            onFileUpload={handleUploadPlanGuide}
          />
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CheckboxField
          label="Utility Token"
          checked={formData.businessPlanType.includes('Utility Token')}
          onChange={(checked) => updateArrayField('businessPlanType', 'Utility Token', checked)}
        />
        <CheckboxField
          label="Security Token"
          checked={formData.businessPlanType.includes('Security Token')}
          onChange={(checked) => updateArrayField('businessPlanType', 'Security Token', checked)}
        />
        <CheckboxField
          label="Governance Token"
          checked={formData.businessPlanType.includes('Governance Token')}
          onChange={(checked) => updateArrayField('businessPlanType', 'Governance Token', checked)}
        />
        <CheckboxField
          label="Payment Token"
          checked={formData.businessPlanType.includes('Payment Token')}
          onChange={(checked) => updateArrayField('businessPlanType', 'Payment Token', checked)}
        />
        <CheckboxField
          label="Reward Token"
          checked={formData.businessPlanType.includes('Reward Token')}
          onChange={(checked) => updateArrayField('businessPlanType', 'Reward Token', checked)}
        />
        <div className="flex items-center justify-center">
          <UploadButton
            label="Upload Document"
            onFileUpload={handleUploadDocument}
          />
        </div>
      </div>
      
      <div className="flex flex-col">
        <label className="text-text-primary text-[17px] font-normal mb-[11px]">
          Mention your Guidelines
        </label>
        <textarea
          value={formData.businessPlanGuidelines || ''}
          onChange={(e) => handleGuidelinesChange(e.target.value)}
          placeholder="ENTER YOUR SERVICES"
          className="w-full h-[144px] border bg-bg-secondary text-text-primary placeholder:text-text-secondary text-[17px] font-normal px-[19px] py-[11px] rounded-xl border-solid border-border-primary focus:outline-none focus:border-blue-500 resize-none"
        />
        <div className="text-right text-text-secondary text-sm mt-2">300 max</div>
      </div>
    </section>
  );
};
