
import React from 'react';
import { CheckboxField } from '../ui/CheckboxField';
import { CategoryHeader } from '../ui/CategoryHeader';
import { useFormContext } from '../../contexts/FormContext';

export const LegalDocumentsSection: React.FC = () => {
  const { formData, updateFormData, updateArrayField } = useFormContext();

  const documentOptions = [
    { key: 'offeringMemorandum', label: 'Offering Memorandum' },
    { key: 'smartContractLegalOpinion', label: 'Smart Contract Legal Opinion' },
    { key: 'nonDisclosureAgreement', label: 'Non-disclosure Agreement' },
    { key: 'securityTokenOffering', label: 'Security Token Offering' },
    { key: 'tokenPurchaseAgreement', label: 'Token Purchase Agreement' },
    { key: 'sada', label: 'SADA' },
    { key: 'nda', label: 'NDA' },
    { key: 'smartContractAudit', label: 'Smart Contract Audit' },
    { key: 'tokenomicsWhitepaper', label: 'Tokenomics Whitepaper' },
    { key: 'mutualNda', label: 'Mutual NDA' },
    { key: 'all', label: 'All?' }
  ];

  const updateDocument = (document: string, checked: boolean) => {
    updateArrayField('legalDocuments', document, checked);
  };

  const handleCheckboxChange = (enabled: boolean) => {
    if (!enabled) {
      updateFormData('legalDocuments', []);
      updateFormData('legalDocumentsPreferences', '');
    }
  };

  const isEnabled = (formData.legalDocuments?.length > 0);

  return (
    <section className="box-border m-0 p-0">
      <CategoryHeader
        title="Legal Documents"
        description="Legal Document Templates design"
        hasCheckbox={true}
        checked={isEnabled}
        onCheckboxChange={handleCheckboxChange}
      />
      
      <div className={`transition-all duration-500 overflow-hidden ${isEnabled ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="box-border mb-8 m-0 p-0">
          <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
            {documentOptions.slice(0, 3).map((option) => (
              <CheckboxField
                key={option.key}
                label={option.label}
                checked={(formData.legalDocuments || []).includes(option.key)}
                onChange={(checked) => updateDocument(option.key, checked)}
              />
            ))}
          </div>
          <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
            {documentOptions.slice(3, 6).map((option) => (
              <CheckboxField
                key={option.key}
                label={option.label}
                checked={(formData.legalDocuments || []).includes(option.key)}
                onChange={(checked) => updateDocument(option.key, checked)}
              />
            ))}
          </div>
          <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
            {documentOptions.slice(6, 9).map((option) => (
              <CheckboxField
                key={option.key}
                label={option.label}
                checked={(formData.legalDocuments || []).includes(option.key)}
                onChange={(checked) => updateDocument(option.key, checked)}
              />
            ))}
          </div>
          <div className="box-border grid grid-cols-3 gap-[27px] mb-[27px] m-0 p-0 max-md:grid-cols-2 max-sm:grid-cols-1">
            {documentOptions.slice(9, 11).map((option) => (
              <CheckboxField
                key={option.key}
                label={option.label}
                checked={(formData.legalDocuments || []).includes(option.key)}
                onChange={(checked) => updateDocument(option.key, checked)}
              />
            ))}
          </div>
        </div>
        <div className="box-border mt-8 m-0 p-0">
          <label className="box-border text-text-primary text-xl font-normal mb-8 m-0 p-0 block">
            Any special preferences
          </label>
          <div className="box-border h-[200px] border relative m-0 px-[27px] py-[23px] rounded-xl border-solid border-border-primary bg-bg-secondary">
            <textarea
              value={formData.legalDocumentsPreferences || ''}
              onChange={(e) => updateFormData('legalDocumentsPreferences', e.target.value)}
              placeholder="e.g what you want etc"
              className="box-border w-full h-full bg-transparent text-text-primary placeholder:text-text-secondary text-[15px] font-normal resize-none border-none outline-none m-0 p-0"
              maxLength={500}
            />
            <div className="box-border text-text-secondary text-[15px] font-normal absolute m-0 p-0 right-[27px] bottom-[33px]">
              500 max
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
