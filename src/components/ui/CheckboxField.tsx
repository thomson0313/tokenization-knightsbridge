
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
    <div className={`box-border flex items-center gap-2 m-0 p-0 ${className}`}>
      <div 
        className={`box-border w-4 h-4 border cursor-pointer m-0 p-0 rounded border-solid ${checked ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <div className="box-border w-full h-full flex items-center justify-center">
            <div className="box-border w-2 h-2 bg-white rounded-sm"></div>
          </div>
        )}
      </div>
      <div className="box-border text-white text-[14px] font-normal m-0 p-0">
        {label}
      </div>
    </div>
  );
};
