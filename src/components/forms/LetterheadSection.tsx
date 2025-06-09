
import React, { useState } from 'react';

export const LetterheadSection: React.FC = () => {
  const [guidelines, setGuidelines] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <section className="box-border m-0 p-0">
      <div className="box-border relative mb-6 m-0 p-0">
        <h2 className="box-border text-white text-[24px] font-medium mb-2 m-0 p-0">
          Letterhead Design
        </h2>
        <p className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
          Get branded letterhead designs
        </p>
        <div className="box-border w-[200px] h-[40px] border flex items-center justify-center gap-2 absolute right-0 top-0 m-0 p-0 rounded-md border-solid border-gray-600 bg-[#1a1a1a] max-sm:static max-sm:w-full max-sm:mt-4 cursor-pointer hover:border-blue-500 transition-colors">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <span className="box-border text-[16px] m-0 p-0">📁</span>
          <div className="box-border text-white text-[14px] font-normal m-0 p-0">
            Upload Brand guide
          </div>
        </div>
      </div>
      <div className="box-border mt-6 m-0 p-0">
        <label className="box-border text-white text-[14px] font-medium mb-2 block m-0 p-0">
          Mention your Guidelines
        </label>
        <div className="box-border h-[120px] border relative m-0 p-3 rounded-md border-solid border-gray-600 bg-[#1a1a1a]">
          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="e.g what you want etc"
            className="box-border w-full h-full bg-transparent text-white placeholder-gray-500 text-[14px] font-normal resize-none border-none outline-none m-0 p-0"
            maxLength={500}
          />
          <div className="box-border text-gray-500 text-[12px] font-normal absolute right-3 bottom-2 m-0 p-0">
            500 max
          </div>
        </div>
      </div>
    </section>
  );
};
