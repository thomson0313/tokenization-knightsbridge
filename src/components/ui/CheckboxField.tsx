import React from 'react';

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
  className = ""
}) => {
  return (
    <div className={`box-border flex items-center gap-[15px] m-0 p-0 ${className}`}>
      <div 
        className={`box-border w-6 h-6 border cursor-pointer m-0 p-0 rounded-[5px] border-solid border-[#535353] ${checked ? 'bg-white' : ''}`}
        onClick={() => onChange(!checked)}
      />
      <div className="box-border text-white text-[17px] font-normal whitespace-nowrap m-0 p-0">
        {label}
      </div>
    </div>
  );
};
