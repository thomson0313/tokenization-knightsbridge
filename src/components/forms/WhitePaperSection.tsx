
import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';

export const WhitePaperSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

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

  const handleCategoryToggle = (checked: boolean) => {
    setIsEnabled(checked);
    setIsExpanded(checked);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="White Paper"
        description="Create and mint your customization token"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCategoryToggle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
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
    </section>
  );
};
