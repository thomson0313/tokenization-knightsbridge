
import React from 'react';

interface CategoryHeaderProps {
  title: string;
  description: string;
  hasCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
  rightContent?: React.ReactNode;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  hasCheckbox = false,
  checked = false,
  onCheckboxChange,
  rightContent
}) => {
  return (
    <div className="box-border relative mb-8 m-0 p-0">
      <div className="flex items-start gap-4">
        {hasCheckbox && (
          <div 
            className={`box-border w-6 h-6 border cursor-pointer m-0 mt-2 p-0 rounded-[5px] border-solid transition-all duration-200 flex items-center justify-center ${
              checked 
                ? 'bg-transparent border-green-500' 
                : 'border-[#535353] hover:border-green-400'
            }`}
            onClick={() => onCheckboxChange?.(!checked)}
          >
            {checked && (
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            )}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <div className="box-border w-1 h-16 bg-white m-0 p-0"></div>
            <div>
              <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 p-0 max-sm:text-[28px]">
                {title}
              </h2>
              <p className="box-border text-white text-[17px] font-normal m-0 p-0">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        {rightContent && (
          <div className="box-border m-0 p-0 max-sm:static max-sm:mt-5">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};
