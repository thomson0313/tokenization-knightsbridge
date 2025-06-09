import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onChange,
  className = ""
}) => {
  return (
    <div className={`box-border flex gap-[15px] m-0 p-0 ${className}`}>
      {options.map((option) => (
        <div key={option.value} className="box-border flex items-center gap-[15px] m-0 p-0">
          <div 
            className={`box-border w-6 h-6 border cursor-pointer m-0 p-0 rounded-[5px] border-solid border-[#535353] ${selectedValue === option.value ? 'bg-white' : ''}`}
            onClick={() => onChange(option.value)}
          />
          <div className="box-border text-white text-[17px] font-normal m-0 p-0">
            {option.label}
          </div>
        </div>
      ))}
    </div>
  );
};
