import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';

export const LegalDocumentsSection: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [documents, setDocuments] = useState({
    offeringMemorandum: false,
    smartContractLegalOpinion: false,
    nonDisclosureAgreement: false,
    securityTokenOffering: false,
    tokenPurchaseAgreement: false,
    sada: false,
    nda: false,
    smartContractAudit: false,
    tokenomicsWhitepaper: false,
    mutualNda: false,
    all: false
  });

  const [preferences, setPreferences] = useState('');

  const updateDocument = (document: string, checked: boolean) => {
    setDocuments(prev => ({ ...prev, [document]: checked }));
  };

  const handleCategoryToggle = (checked: boolean) => {
    setIsEnabled(checked);
    setIsExpanded(checked);
  };

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Legal Documents"
        description="Legal Document Templates design"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCategoryToggle}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      
      <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="box-border mb-8 m-0 p-0">
          <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
            <CheckboxField
              label="Offering Memorandum"
              checked={documents.offeringMemorandum}
              onChange={(checked) => updateDocument('offeringMemorandum', checked)}
            />
            <CheckboxField
              label="Smart Contract Legal Opinion"
              checked={documents.smartContractLegalOpinion}
              onChange={(checked) => updateDocument('smartContractLegalOpinion', checked)}
            />
            <CheckboxField
              label="Non-disclosure Agreement"
              checked={documents.nonDisclosureAgreement}
              onChange={(checked) => updateDocument('nonDisclosureAgreement', checked)}
            />
          </div>
          <div className="box-border flex gap-[66px] mb-[27px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
            <CheckboxField
              label="Security Token Offering"
              checked={documents.securityTokenOffering}
              onChange={(checked) => updateDocument('securityTokenOffering', checked)}
            />
            <CheckboxField
              label="Token Purchase Agreement"
              checked={documents.tokenPurchaseAgreement}
              onChange={(checked) => updateDocument('tokenPurchaseAgreement', checked)}
            />
            <CheckboxField
              label="SADA"
              checked={documents.sada}
              onChange={(checked) => updateDocument('sada', checked)}
            />
          </div>
          <div className="box-border flex gap-[66px] mb-[27px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
            <CheckboxField
              label="NDA"
              checked={documents.nda}
              onChange={(checked) => updateDocument('nda', checked)}
            />
            <CheckboxField
              label="Smart Contract Audit"
              checked={documents.smartContractAudit}
              onChange={(checked) => updateDocument('smartContractAudit', checked)}
            />
            <CheckboxField
              label="Tokenomics Whitepaper"
              checked={documents.tokenomicsWhitepaper}
              onChange={(checked) => updateDocument('tokenomicsWhitepaper', checked)}
            />
          </div>
          <div className="box-border flex gap-[66px] mb-[27px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
            <CheckboxField
              label="Mutual NDA"
              checked={documents.mutualNda}
              onChange={(checked) => updateDocument('mutualNda', checked)}
            />
            <CheckboxField
              label="All?"
              checked={documents.all}
              onChange={(checked) => updateDocument('all', checked)}
            />
          </div>
        </div>
        <div className="box-border mt-8 m-0 p-0">
          <label className="box-border text-white text-xl font-normal mb-8 m-0 p-0 block">
            Any special prefernces
          </label>
          <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-[#535353]">
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="e.g what you want etc"
              className="box-border w-full h-full bg-transparent text-white placeholder-white placeholder-opacity-50 text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
              maxLength={500}
            />
            <div className="box-border text-white text-[15px] font-normal opacity-50 absolute m-0 p-0 right-[27px] bottom-[33px]">
              500 max
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
