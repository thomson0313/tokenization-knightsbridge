
import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';

export const ExchangeListingSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);

  const exchangeOptions = [
    { value: 'xt', label: 'XT' },
    { value: 'lbank', label: 'LBank' },
    { value: 'none', label: 'None' }
  ];

  const handleExchangeChange = (exchange: string, checked: boolean) => {
    if (checked) {
      setSelectedExchanges(prev => [...prev, exchange]);
    } else {
      setSelectedExchanges(prev => prev.filter(e => e !== exchange));
    }
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Listings on Exchange"
        description="Choose your preference for listing"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={setIsEnabled}
        rightContent={
          <div className="flex gap-[72px] max-sm:flex-wrap max-sm:gap-[15px]">
            {exchangeOptions.map((option) => (
              <CheckboxField
                key={option.value}
                label={option.label}
                checked={selectedExchanges.includes(option.value)}
                onChange={(checked) => handleExchangeChange(option.value, checked)}
              />
            ))}
          </div>
        }
      />
    </section>
  );
};
