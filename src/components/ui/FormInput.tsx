import React from 'react';

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  className = ""
}) => {
  return (
    <div className={`box-border flex flex-col m-0 p-0 ${className}`}>
      <label className="box-border text-white text-xl font-normal mb-8 m-0 p-0">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="box-border h-16 border bg-transparent text-white placeholder-white placeholder-opacity-50 text-[15px] font-normal m-0 px-[27px] py-0 rounded-xl border-solid border-[#535353] focus:outline-none focus:border-white"
      />
    </div>
  );
};
