
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
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Listings on Exchange"
        description="Choose your preference for listing"
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
