
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
      <label className="box-border text-white dark:text-white light:text-gray-900 text-[14px] font-medium mb-2 m-0 p-0">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="box-border h-[40px] border bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white text-white dark:text-white light:text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-500 light:placeholder:text-gray-400 text-[14px] font-normal m-0 px-3 py-0 rounded-md border-solid border-[#535353] dark:border-[#535353] light:border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};
