
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { CategoryHeader } from '../ui/CategoryHeader';

export const TokenMintForm: React.FC = () => {
  const [formData, setFormData] = useState({
    tokenName: '',
    ticker: '',
    chain: '',
    decimals: '',
    targetPrice: '',
    treasuryAddress: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Mint Token"
        description="Create and mint your customization token"
      />
      
      <div className="box-border grid grid-cols-[358px_358px] gap-[16px_20px] mb-8 m-0 p-0 max-md:grid-cols-[1fr] max-md:gap-4 max-sm:grid-cols-[1fr]">
        <FormInput
          label="Token Name"
          placeholder="Enter token name"
          value={formData.tokenName}
          onChange={(value) => updateField('tokenName', value)}
        />
        <FormInput
          label="Ticker"
          placeholder="Enter ticker"
          value={formData.ticker}
          onChange={(value) => updateField('ticker', value)}
        />
        <FormInput
          label="Chain"
          placeholder="Enter chain"
          value={formData.chain}
          onChange={(value) => updateField('chain', value)}
        />
        <FormInput
          label="Decimals"
          placeholder="Enter decimals"
          value={formData.decimals}
          onChange={(value) => updateField('decimals', value)}
        />
        <FormInput
          label="Target Price"
          placeholder="Enter target price"
          value={formData.targetPrice}
          onChange={(value) => updateField('targetPrice', value)}
        />
        <FormInput
          label="Treasury Address"
          placeholder="Enter treasury address"
          value={formData.treasuryAddress}
          onChange={(value) => updateField('treasuryAddress', value)}
        />
      </div>
    </section>
  );
};
