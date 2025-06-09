import React, { useState } from 'react';
import { CheckboxField } from '../ui/CheckboxField';

export const LegalDocumentsSection: React.FC = () => {
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

  return (
    <section className="box-border m-0 p-0">
      <div className="box-border relative mb-8 m-0 p-0">
        <h2 className="box-border text-white text-[35px] font-normal mb-2 m-0 pl-[46px] p-0 max-sm:text-[28px] max-sm:pl-[30px]">
          Legal Documents
        </h2>
        <p className="box-border text-white text-[17px] font-normal m-0 pl-[11px] p-0">
          Legal Document Templates design
        </p>
        <div className="box-border w-[54px] h-px absolute bg-white m-0 p-0 left-0 top-2" />
      </div>
      <div className="box-border mb-8 m-0 p-0">
        <div className="box-border flex gap-[66px] mb-[27px] m-0 p-0 max-sm:flex-col max-sm:gap-[15px]">
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
    </section>
  );
};
