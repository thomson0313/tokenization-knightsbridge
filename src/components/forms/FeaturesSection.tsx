import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';

export const FeaturesSection: React.FC = () => {
  const [features, setFeatures] = useState({
    ableToMint: false,
    ableToBurn: false,
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
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          Want more Features?
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Lorem ipsum dolor sit amet, consectetur
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
        <div className="box-border flex gap-[34px] absolute m-0 p-0 right-0 top-1.5 max-sm:static max-sm:flex-wrap max-sm:gap-[15px] max-sm:mt-5">
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
      <div className="box-border flex flex-col gap-[17px] mb-8 m-0 p-0">
        <div className="box-border flex gap-[91px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
          <CheckboxField
            label="Revoke Ownership?"
            checked={features.revokeOwnership1}
            onChange={(checked) => updateFeature('revokeOwnership1', checked)}
          />
          <CheckboxField
            label="Revoke Ownership?"
            checked={features.revokeOwnership2}
            onChange={(checked) => updateFeature('revokeOwnership2', checked)}
          />
          <CheckboxField
            label="Liquidity Fee?"
            checked={features.liquidityFee}
            onChange={(checked) => updateFeature('liquidityFee', checked)}
          />
        </div>
        <div className="box-border flex gap-[91px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
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
        </div>
        <div className="box-border flex gap-[91px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
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
        </div>
        <div className="box-border flex gap-[91px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
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
        </div>
        <div className="box-border flex gap-[91px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
          <CheckboxField
            label="Verify contract?"
            checked={features.verifyContract}
            onChange={(checked) => updateFeature('verifyContract', checked)}
          />
        </div>
      </div>
      <div className="box-border mt-8 m-0 p-0">
        <label className="box-border text-white text-xl font-normal mb-8 m-0 p-0 block">
          Mention your Guidelines
        </label>
        <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-[#535353]">
          <textarea
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="e.g what you want etc"
            className="box-border w-full h-full bg-transparent text-white placeholder-white placeholder-opacity-50 text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
            maxLength={500}
          />
          <div className="box-border text-white text-[15px] font-normal opacity-50 absolute m-0 p-0 right-[27px] bottom-[33px]">
            500 max
          </div>
        </div>
      </div>
    </section>
  );
};
