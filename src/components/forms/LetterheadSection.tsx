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
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          Letterhead Design
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Get branded letterhead designs
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
        <div className="box-border w-[271px] h-16 border flex items-center justify-center gap-8 absolute m-0 p-0 rounded-xl border-solid border-[#535353] right-0 top-0 max-sm:static max-sm:w-full max-sm:mt-5 cursor-pointer hover:border-white transition-colors">
          <input
            type="file"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <img
            src="/upload-icon.svg"
            alt="Upload"
            className="box-border w-[21px] h-[21px] opacity-50 m-0 p-0"
          />
          <div className="box-border text-white text-xl font-normal m-0 p-0">
            Upload Brand guide
          </div>
        </div>
      </div>
      <div className="box-border mt-8 m-0 p-0">
        <label className="box-border text-white text-xl font-normal mb-8 m-0 p-0 block">
          Mention your Guidelines
        </label>
        <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-[#535353]">
          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="e.g what you want etc"
            className="box-border w-full h-full bg-transparent text-white placeholder-white placeholder-opacity-50 text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
            maxLength={500}
          />
          <div className="box-border text-white text-[15px] font-normal opacity-50 absolute m-0 p-0 right-[27px] bottom-[33px]">
            500 max
          </div>
        </div>
      </div>
    </section>
  );
};
