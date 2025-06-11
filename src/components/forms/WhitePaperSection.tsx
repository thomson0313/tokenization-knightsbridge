
import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';

export const WhitePaperSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [details, setDetails] = useState('');

  const pageOptions = [
    { value: '30', label: '30 Pages' },
    { value: '60', label: '60 Pages' },
    { value: 'none', label: 'None' }
  ];

  const handlePageChange = (page: string, checked: boolean) => {
    if (checked) {
      setSelectedPages(prev => [...prev, page]);
    } else {
      setSelectedPages(prev => prev.filter(p => p !== page));
    }
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="White Paper"
        description="Create and mint your customization token"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={setIsEnabled}
        rightContent={
          <div className="flex gap-[51px] max-sm:flex-wrap max-sm:gap-[15px]">
            {pageOptions.map((option) => (
              <CheckboxField
                key={option.value}
                label={option.label}
                checked={selectedPages.includes(option.value)}
                onChange={(checked) => handlePageChange(option.value, checked)}
              />
            ))}
          </div>
        }
      />
      
      {isEnabled && (
        <div className="box-border mt-8 m-0 p-0">
          <label className="box-border text-text-primary text-xl font-normal mb-8 m-0 p-0 block">
            Mention your details
          </label>
          <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-border-primary bg-bg-secondary">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="e.g what you want etc"
              className="box-border w-full h-full bg-transparent text-text-primary placeholder:text-text-secondary text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
              maxLength={500}
            />
            <div className="box-border text-text-secondary text-[15px] font-normal absolute m-0 p-0 right-[27px] bottom-[33px]">
              500 max
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
