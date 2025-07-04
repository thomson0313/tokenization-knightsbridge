
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormContextType {
  formData: any;
  setFormData: (data: any) => void;
  updateFormData: (field: string, value: any) => void;
  updateArrayField: (field: string, item: string, checked: boolean) => void;
  resetFormData: () => void;
  fileUpload: any;
  setFileUpload: (data: any) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData = {
  // Contact Information
  contactEmail: '',
  contactPhone: '',
  
  // Token Mint
  tokenName: '',
  tokenTicker: '',
  tokenChain: '',
  tokenDecimals: '',
  targetPrice: '',
  treasuryAddress: '',
  
  // Features
  featuresEnabled: false,
  tokenFeatures: [],
  
  // Letterhead
  letterheadEnabled: true,
  letterheadGuidelines: '',
  
  // Raise Document
  raiseDocumentEnabled: false,
  raiseDocumentRegions: [],
  raiseDocumentCompany: '',
  raiseDocumentContactName: '',
  raiseDocumentContactPerson: '',
  raiseDocumentPosition: '',
  raiseDocumentEmail: '',
  raiseDocumentPhone: '',
  raiseDocumentAddress: '',
  raiseDocumentWebsite: '',
  
  // White Paper
  whitePaperEnabled: false,
  whitePaperPages: 'none',
  whitePaperGuidelines: '',
  
  // Website Plan
  websitePlanEnabled: false,
  websitePlanGuidelines: '',
  
  // Exchange Listing
  exchangeListingEnabled: false,
  exchangeListings: [],
  
  // Legal Documents
  legalDocumentsEnabled: false,
  legalDocuments: [],
  legalDocumentsPreferences: '',
  
  // Knightsbridge specific fields
  kycFullName: '',
  kycIdNumber: '',
  kycDateOfBirth: '',
  kycNationality: '',
  kycAddress: '',
  kycOccupation: '',
  kycEmployer: '',
  kycIncomeSource: '',
  
  custodianName: '',
  custodianContact: '',
  custodianRegistration: '',
  custodianAddress: '',
  custodianServices: '',
  
  issuerEntityName: '',
  issuerJurisdiction: '',
  issuerContactPerson: '',
  issuerContactInfo: '',
  issuerAddress: '',
  issuerBusinessType: '',
  issuerRegistrationNumber: '',
  
  businessPlanType: [],
  businessPlanGuidelines: '',
  businessPlanExecutiveSummary: '',
  businessPlanMarketAnalysis: '',
  businessPlanFinancialProjections: ''
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [fileUpload, setFileUpload] = useState({});

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateArrayField = (field: string, item: string, checked: boolean) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      let updatedArray;
      
      if (checked) {
        updatedArray = [...currentArray, item];
      } else {
        updatedArray = currentArray.filter((i: string) => i !== item);
      }
      
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };

  const resetFormData = () => {
    setFormData(initialFormData);
    setFileUpload({});
  };

  return (
    <FormContext.Provider value={{
      formData,
      setFormData,
      updateFormData,
      updateArrayField,
      resetFormData,
      fileUpload,
      setFileUpload
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
