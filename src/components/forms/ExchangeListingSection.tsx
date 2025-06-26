
import React from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';
import { useFormContext } from '../../contexts/FormContext';

export const ExchangeListingSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const exchangeOptions = [
    { value: 'xt', label: 'XT' },
    { value: 'lbank', label: 'LBank' },
    { value: 'none', label: 'None' }
  ];

  const handleExchangeChange = (exchange: string, checked: boolean) => {
    const currentExchanges = formData.exchangeListings || [];
    let updatedExchanges;
    
    if (checked) {
      updatedExchanges = [...currentExchanges, exchange];
    } else {
      updatedExchanges = currentExchanges.filter((e: string) => e !== exchange);
    }
    
    updateFormData('exchangeListings', updatedExchanges);
    console.log('Updated exchangeListings:', updatedExchanges);
  };

  const handleCheckboxChange = (enabled: boolean) => {
    updateFormData('exchangeListingEnabled', enabled);
    if (!enabled) {
      updateFormData('exchangeListings', []);
    }
    console.log('Exchange listing enabled:', enabled);
  };

  const isEnabled = formData.exchangeListingEnabled || (formData.exchangeListings && formData.exchangeListings.length > 0);

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Listings on Exchange"
        description="Choose your preference for listing"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCheckboxChange}
        rightContent={
          <div className="flex gap-[72px] max-sm:flex-wrap max-sm:gap-[15px]">
            {exchangeOptions.map((option) => (
              <CheckboxField
                key={option.value}
                label={option.label}
                checked={(formData.exchangeListings || []).includes(option.value)}
                onChange={(checked) => handleExchangeChange(option.value, checked)}
              />
            ))}
          </div>
        }
      />
    </section>
  );
};
