
import React from 'react';
import { Upload } from 'lucide-react';

interface UploadButtonProps {
  label: string;
  onFileUpload: (file: File) => void;
  acceptedTypes?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  label,
  onFileUpload,
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png"
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="box-border w-[271px] h-16 border flex items-center justify-center gap-8 m-0 p-0 rounded-xl border-solid border-hsl(var(--input-border)) max-sm:w-full cursor-pointer hover:border-hsl(var(--text-primary)) transition-colors relative">
      <input
        type="file"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        accept={acceptedTypes}
      />
      <Upload className="w-[21px] h-[21px] text-hsl(var(--text-primary)) opacity-50" />
      <div className="box-border text-hsl(var(--text-primary)) text-xl font-normal m-0 p-0">
        {label}
      </div>
    </div>
  );
};
