
import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';

export const FeaturesSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [features, setFeatures] = useState({
    ableToMint: false,
    ableToBurn: false,
    others: false,
    revokeOwnership1: false,
    revokeOwnership2: false,
    liquidityFee: false,
    pausable: false,
    fees: false,
    deflationary: false,
    blacklist: false,
    transactionLimits: false,
    superchain: false,
    walletLimits: false,
    marketingFee: false,
    interoperability: false,
    verifyContract: false
  });

  const [guidelines, setGuidelines] = useState('');

  const updateFeature = (feature: string, checked: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: checked }));
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Want more Features?"
        description="Lorem ipsum dolor sit amet, consectetur"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={setIsEnabled}
        rightContent={
          <div className="flex gap-[34px] max-sm:flex-wrap max-sm:gap-[15px]">
            <CheckboxField
              label="Able to mint?"
              checked={features.ableToMint}
              onChange={(checked) => updateFeature('ableToMint', checked)}
            />
            <CheckboxField
              label="Able to Burn?"
              checked={features.ableToBurn}
              onChange={(checked) => updateFeature('ableToBurn', checked)}
            />
          </div>
        }
      />
      
      <div className="box-border mb-4 m-0 p-0">
        <CheckboxField
          label="Others ?"
          checked={features.others}
          onChange={(checked) => updateFeature('others', checked)}
        />
      </div>
      
      <div className="box-border flex flex-col gap-[17px] mb-8 m-0 p-0">
        <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
          <CheckboxField
            label="Revoke ownership"
            checked={features.revokeOwnership1}
            onChange={(checked) => updateFeature('revokeOwnership1', checked)}
          />
          <CheckboxField
            label="Liquidity Fee"
            checked={features.liquidityFee}
            onChange={(checked) => updateFeature('liquidityFee', checked)}
          />
          <CheckboxField
            label="Pausable"
            checked={features.pausable}
            onChange={(checked) => updateFeature('pausable', checked)}
          />
        </div>
        
        <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
          <CheckboxField
            label="Fees"
            checked={features.fees}
            onChange={(checked) => updateFeature('fees', checked)}
          />
          <CheckboxField
            label="Deflationary"
            checked={features.deflationary}
            onChange={(checked) => updateFeature('deflationary', checked)}
          />
          <CheckboxField
            label="Blacklist"
            checked={features.blacklist}
            onChange={(checked) => updateFeature('blacklist', checked)}
          />
        </div>
        
        <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
          <CheckboxField
            label="Transaction Limits"
            checked={features.transactionLimits}
            onChange={(checked) => updateFeature('transactionLimits', checked)}
          />
          <CheckboxField
            label="Superchain"
            checked={features.superchain}
            onChange={(checked) => updateFeature('superchain', checked)}
          />
          <CheckboxField
            label="Wallet Limits"
            checked={features.walletLimits}
            onChange={(checked) => updateFeature('walletLimits', checked)}
          />
        </div>
        
        <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
          <CheckboxField
            label="Marketing Fee"
            checked={features.marketingFee}
            onChange={(checked) => updateFeature('marketingFee', checked)}
          />
          <CheckboxField
            label="Interoperability"
            checked={features.interoperability}
            onChange={(checked) => updateFeature('interoperability', checked)}
          />
          <CheckboxField
            label="Verify Contract"
            checked={features.verifyContract}
            onChange={(checked) => updateFeature('verifyContract', checked)}
          />
        </div>
      </div>
      
      <div className="box-border flex flex-col m-0 p-0">
        <label className="box-border text-text-primary text-[17px] font-normal mb-[11px] m-0 p-0">
          Guidelines
        </label>
        <textarea
          value={guidelines}
          onChange={(e) => setGuidelines(e.target.value)}
          placeholder="Enter guidelines"
          className="box-border w-full h-[144px] border bg-bg-secondary text-text-primary placeholder:text-text-secondary text-[17px] font-normal m-0 px-[19px] py-[11px] rounded-xl border-solid border-border-primary focus:outline-none focus:border-blue-500 resize-none"
        />
      </div>
    </section>
  );
};
