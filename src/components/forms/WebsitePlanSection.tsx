import React, { useState } from 'react';
import { CategoryHeader } from '../ui/CategoryHeader';
import { UploadButton } from '../ui/UploadButton';

export const WebsitePlanSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  const handleCategoryToggle = (checked: boolean) => {
    setIsEnabled(checked);
    setIsExpanded(checked);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Website Plan"
        description="Get website plan and structure."
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCategoryToggle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      
      <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="box-border relative h-16 mb-8 m-0 p-0">
          <div className="max-sm:static max-sm:w-full max-sm:mt-5">
            <UploadButton
              label="Upload Design guide"
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>
        <div className="box-border mt-8 m-0 p-0">
          <label className="box-border text-white text-xl font-normal mb-8 m-0 p-0 block">
            Mention your details
          </label>
          <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-[#535353]">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g what you want etc"
              className="box-border w-full h-full bg-transparent text-white placeholder-white placeholder-opacity-50 text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
              maxLength={500}
            />
            <div className="box-border text-white text-[15px] font-normal opacity-50 absolute m-0 p-0 right-[27px] bottom-[33px]">
              500 max
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
