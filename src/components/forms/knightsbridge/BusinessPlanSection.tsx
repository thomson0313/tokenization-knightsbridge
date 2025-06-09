
import React, { useState } from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { CheckboxField } from '../../ui/CheckboxField';
import { UploadButton } from '../../ui/UploadButton';

export const BusinessPlanSection: React.FC = () => {
  const [industries, setIndustries] = useState({
    industry1: false,
    industry2: false,
    industry3: false,
    industry4: false,
    industry5: false,
    industry6: false
  });

  const [guidelines, setGuidelines] = useState('');

  const updateIndustry = (industry: string, checked: boolean) => {
    setIndustries(prev => ({ ...prev, [industry]: checked }));
  };

  const handleUploadPlanGuide = (file: File) => {
    console.log('Business plan guide uploaded:', file.name);
  };

  const handleUploadDocument = (file: File) => {
    console.log('Document uploaded:', file.name);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Business Plan Upload"
        description="Lorem ipsum dolor sit amet, consectetur"
        rightContent={
          <UploadButton
            label="Upload Plan guide"
            onFileUpload={handleUploadPlanGuide}
          />
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CheckboxField
          label="Industry Name"
          checked={industries.industry1}
          onChange={(checked) => updateIndustry('industry1', checked)}
        />
        <CheckboxField
          label="Industry Name"
          checked={industries.industry2}
          onChange={(checked) => updateIndustry('industry2', checked)}
        />
        <CheckboxField
          label="Industry Name"
          checked={industries.industry3}
          onChange={(checked) => updateIndustry('industry3', checked)}
        />
        <CheckboxField
          label="Industry Name"
          checked={industries.industry4}
          onChange={(checked) => updateIndustry('industry4', checked)}
        />
        <CheckboxField
          label="Industry Name"
          checked={industries.industry5}
          onChange={(checked) => updateIndustry('industry5', checked)}
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
          value={guidelines}
          onChange={(e) => setGuidelines(e.target.value)}
          placeholder="ENTER YOUR SERVICES"
          className="w-full h-[144px] border bg-bg-secondary text-text-primary placeholder:text-text-secondary text-[17px] font-normal px-[19px] py-[11px] rounded-xl border-solid border-border-primary focus:outline-none focus:border-blue-500 resize-none"
        />
        <div className="text-right text-text-secondary text-sm mt-2">300 max</div>
      </div>
    </section>
  );
};
