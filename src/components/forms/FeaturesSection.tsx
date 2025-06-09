
import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';

export const FeaturesSection: React.FC = () => {
  const [features, setFeatures] = useState({
    ableToMint: false,
    ableToBurn: false,
    revokeOwnership: false,
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
      <div className="box-border relative mb-6 m-0 p-0">
        <h2 className="box-border text-white text-[24px] font-medium mb-2 m-0 p-0">
          Want more Features?
        </h2>
        <p className="box-border text-gray-400 text-[14px] font-normal m-0 p-0">
          Lorem ipsum dolor sit amet, consectetur
        </p>
        <div className="box-border flex gap-6 absolute right-0 top-0 max-sm:static max-sm:mt-4">
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
      </div>
      <div className="box-border grid grid-cols-3 gap-4 mb-6 m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
        <CheckboxField
          label="Revoke Ownership?"
          checked={features.revokeOwnership}
          onChange={(checked) => updateFeature('revokeOwnership', checked)}
        />
        <CheckboxField
          label="Liquidity Fee?"
          checked={features.liquidityFee}
          onChange={(checked) => updateFeature('liquidityFee', checked)}
        />
        <CheckboxField
          label="Pausable?"
          checked={features.pausable}
          onChange={(checked) => updateFeature('pausable', checked)}
        />
        <CheckboxField
          label="Fees? Describe fee structure"
          checked={features.fees}
          onChange={(checked) => updateFeature('fees', checked)}
        />
        <CheckboxField
          label="Deflationary?"
          checked={features.deflationary}
          onChange={(checked) => updateFeature('deflationary', checked)}
        />
        <CheckboxField
          label="Blacklist?"
          checked={features.blacklist}
          onChange={(checked) => updateFeature('blacklist', checked)}
        />
        <CheckboxField
          label="Transaction Limits?"
          checked={features.transactionLimits}
          onChange={(checked) => updateFeature('transactionLimits', checked)}
        />
        <CheckboxField
          label="Superchain?"
          checked={features.superchain}
          onChange={(checked) => updateFeature('superchain', checked)}
        />
        <CheckboxField
          label="Wallet Limits?"
          checked={features.walletLimits}
          onChange={(checked) => updateFeature('walletLimits', checked)}
        />
        <CheckboxField
          label="Marketing Fee?"
          checked={features.marketingFee}
          onChange={(checked) => updateFeature('marketingFee', checked)}
        />
        <CheckboxField
          label="Interoperability?"
          checked={features.interoperability}
          onChange={(checked) => updateFeature('interoperability', checked)}
        />
        <CheckboxField
          label="Verify contract?"
          checked={features.verifyContract}
          onChange={(checked) => updateFeature('verifyContract', checked)}
        />
      </div>
      <div className="box-border mt-6 m-0 p-0">
        <label className="box-border text-white text-[14px] font-medium mb-2 block m-0 p-0">
          Mention your Guidelines
        </label>
        <div className="box-border h-[120px] border relative m-0 p-3 rounded-md border-solid border-gray-600 bg-[#1a1a1a]">
          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="e.g what you want etc"
            className="box-border w-full h-full bg-transparent text-white placeholder-gray-500 text-[14px] font-normal resize-none border-none outline-none m-0 p-0"
            maxLength={500}
          />
          <div className="box-border text-gray-500 text-[12px] font-normal absolute right-3 bottom-2 m-0 p-0">
            500 max
          </div>
        </div>
      </div>
    </section>
  );
};
