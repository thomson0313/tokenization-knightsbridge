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
      <div className="box-border grid grid-cols-[358px_199px_199px] gap-[16px_20px] mb-8 m-0 p-0 max-md:grid-cols-[1fr_1fr] max-md:gap-4 max-sm:grid-cols-[1fr]">
        <FormInput
          label="Token Name"
          placeholder="e.g BONAM"
          value={formData.tokenName}
          onChange={(value) => updateField('tokenName', value)}
        />
        <FormInput
          label="Ticker"
          placeholder="e.g BONAM"
          value={formData.ticker}
          onChange={(value) => updateField('ticker', value)}
        />
        <FormInput
          label="Chain"
          placeholder="e.g BONAM"
          value={formData.chain}
          onChange={(value) => updateField('chain', value)}
        />
        <FormInput
          label="Decimals"
          placeholder="e.g 2345"
          value={formData.decimals}
          onChange={(value) => updateField('decimals', value)}
        />
        <FormInput
          label="Target Price"
          placeholder="e.g $34.67"
          value={formData.targetPrice}
          onChange={(value) => updateField('targetPrice', value)}
        />
        <FormInput
          label="Treasury Address"
          placeholder="e.g enter your code"
          value={formData.treasuryAddress}
          onChange={(value) => updateField('treasuryAddress', value)}
        />
      </div>
    </section>
  );
};
