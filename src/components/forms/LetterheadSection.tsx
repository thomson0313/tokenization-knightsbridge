
import React, { useState } from 'react';
import { CategoryHeader } from '../ui/CategoryHeader';
import { UploadButton } from '../ui/UploadButton';

export const LetterheadSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [guidelines, setGuidelines] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Letterhead Design"
        description="Get branded letterhead designs"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={setIsEnabled}
        rightContent={
          <UploadButton
            label="Upload Brand guide"
            onFileUpload={handleFileUpload}
          />
        }
      />
      
      <div className="box-border mt-6 m-0 p-0">
        <label className="box-border text-hsl(var(--text-primary)) text-[14px] font-medium mb-2 block m-0 p-0">
          Mention your Guidelines
        </label>
        <div className="box-border h-[120px] border relative m-0 p-3 rounded-md border-solid border-hsl(var(--input-border)) bg-hsl(var(--input-bg))">
          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="e.g what you want etc"
            className="box-border w-full h-full bg-transparent text-hsl(var(--text-primary)) placeholder-hsl(var(--text-secondary)) text-[14px] font-normal resize-none border-none outline-none m-0 p-0"
            maxLength={500}
          />
          <div className="box-border text-hsl(var(--text-secondary)) text-[12px] font-normal absolute right-3 bottom-2 m-0 p-0">
            500 max
          </div>
        </div>
      </div>
    </section>
  );
};
