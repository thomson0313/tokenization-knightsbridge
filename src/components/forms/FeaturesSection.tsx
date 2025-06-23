
import React from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';
import { useFormContext } from '../../contexts/FormContext';

export const FeaturesSection: React.FC = () => {
  const { formData, updateFormData, updateArrayField } = useFormContext();

  const updateFeature = (feature: string, checked: boolean) => {
    updateArrayField('tokenFeatures', feature, checked);
  };

  const handleCheckboxChange = (enabled: boolean) => {
    if (!enabled) {
      updateFormData('tokenFeatures', []);
    }
  };

  const isEnabled = formData.tokenFeatures?.length > 0;

  const featureOptions = [
    { key: 'revokeOwnership', label: 'Revoke ownership' },
    { key: 'liquidityFee', label: 'Liquidity Fee' },
    { key: 'pausable', label: 'Pausable' },
    { key: 'fees', label: 'Fees' },
    { key: 'deflationary', label: 'Deflationary' },
    { key: 'blacklist', label: 'Blacklist' },
    { key: 'transactionLimits', label: 'Transaction Limits' },
    { key: 'superchain', label: 'Superchain' },
    { key: 'walletLimits', label: 'Wallet Limits' },
    { key: 'marketingFee', label: 'Marketing Fee' },
    { key: 'interoperability', label: 'Interoperability' },
    { key: 'verifyContract', label: 'Verify Contract' }
  ];

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Want more Features?"
        description="Upgrade to access advanced tools and exclusive benefits"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCheckboxChange}
        rightContent={
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-[34px] max-sm:flex-wrap max-sm:gap-[15px]">
              <CheckboxField
                label="Able to mint?"
                checked={(formData.tokenFeatures || []).includes('ableToMint')}
                onChange={(checked) => updateFeature('ableToMint', checked)}
              />
              <CheckboxField
                label="Able to Burn?"
                checked={(formData.tokenFeatures || []).includes('ableToBurn')}
                onChange={(checked) => updateFeature('ableToBurn', checked)}
              />
            </div>
            <CheckboxField
              label="Others ?"
              checked={(formData.tokenFeatures || []).includes('others')}
              onChange={(checked) => updateFeature('others', checked)}
            />
          </div>
        }
      />
      
      {isEnabled && (
        <>
          <div className="box-border flex flex-col gap-[17px] mb-8 m-0 p-0">
            <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
              {featureOptions.slice(0, 3).map((option) => (
                <CheckboxField
                  key={option.key}
                  label={option.label}
                  checked={(formData.tokenFeatures || []).includes(option.key)}
                  onChange={(checked) => updateFeature(option.key, checked)}
                />
              ))}
            </div>
            
            <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
              {featureOptions.slice(3, 6).map((option) => (
                <CheckboxField
                  key={option.key}
                  label={option.label}
                  checked={(formData.tokenFeatures || []).includes(option.key)}
                  onChange={(checked) => updateFeature(option.key, checked)}
                />
              ))}
            </div>
            
            <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
              {featureOptions.slice(6, 9).map((option) => (
                <CheckboxField
                  key={option.key}
                  label={option.label}
                  checked={(formData.tokenFeatures || []).includes(option.key)}
                  onChange={(checked) => updateFeature(option.key, checked)}
                />
              ))}
            </div>
            
            <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
              {featureOptions.slice(9, 12).map((option) => (
                <CheckboxField
                  key={option.key}
                  label={option.label}
                  checked={(formData.tokenFeatures || []).includes(option.key)}
                  onChange={(checked) => updateFeature(option.key, checked)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
