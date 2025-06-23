import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface FormSubmissionData {
  main: {
    type: 'Knightsbridge' | 'Decentralized';
    contact_email: string;
    contact_phone: string;
    token_name: string;
    token_ticker: string;
    token_chain: string;
    token_decimals: string;
    target_price: string;
    treasury_address: string;
    [key: string]: any;
  };
  tokenFeatures?: string[];
  raiseDocumentRegions?: string[];
  exchangeListings?: string[];
  legalDocuments?: string[];
}

interface ValidationError {
  field: string;
  message: string;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateRequiredFields = (formData: any): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Contact Information validation
    if (!formData.contactEmail?.trim()) {
      errors.push({ field: 'contactEmail', message: 'Email is required' });
    }
    if (!formData.contactPhone?.trim()) {
      errors.push({ field: 'contactPhone', message: 'Phone number is required' });
    }

    // Token Mint validation
    if (!formData.tokenName?.trim()) {
      errors.push({ field: 'tokenName', message: 'Token name is required' });
    }
    if (!formData.tokenTicker?.trim()) {
      errors.push({ field: 'tokenTicker', message: 'Token ticker is required' });
    }
    if (!formData.tokenChain?.trim()) {
      errors.push({ field: 'tokenChain', message: 'Token chain is required' });
    }
    if (!formData.tokenDecimals?.trim()) {
      errors.push({ field: 'tokenDecimals', message: 'Token decimals is required' });
    }
    if (!formData.targetPrice?.trim()) {
      errors.push({ field: 'targetPrice', message: 'Target price is required' });
    }
    if (!formData.treasuryAddress?.trim()) {
      errors.push({ field: 'treasuryAddress', message: 'Treasury address is required' });
    }

    return errors;
  };

  const validateOptionalSections = (formData: any): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Token Features validation - if any features are selected
    if (formData.tokenFeatures?.length > 0) {
      // Features are valid if at least one is selected
    }

    // Letterhead validation - always enabled, just check guidelines if needed
    
    // Raise Document validation - if regions are selected, other fields should be filled
    if (formData.raiseDocumentRegions?.length > 0) {
      if (!formData.raiseDocumentCompany?.trim()) {
        errors.push({ field: 'raiseDocumentCompany', message: 'Company name is required when raise document regions are selected' });
      }
      if (!formData.raiseDocumentContactName?.trim()) {
        errors.push({ field: 'raiseDocumentContactName', message: 'Contact name is required when raise document regions are selected' });
      }
      if (!formData.raiseDocumentEmail?.trim()) {
        errors.push({ field: 'raiseDocumentEmail', message: 'Email is required when raise document regions are selected' });
      }
    }

    // White Paper validation - if pages are selected, guidelines should be provided
    if (formData.whitePaperPages?.trim() && formData.whitePaperPages !== 'none') {
      if (!formData.whitePaperGuidelines?.trim()) {
        errors.push({ field: 'whitePaperGuidelines', message: 'Guidelines are required when white paper pages are selected' });
      }
    }

    // Website Plan validation - if enabled, guidelines should be provided
    if (formData.websitePlanEnabled) {
      if (!formData.websitePlanGuidelines?.trim()) {
        errors.push({ field: 'websitePlanGuidelines', message: 'Guidelines are required when website plan is enabled' });
      }
    }

    // Exchange Listings validation - if exchanges are selected
    if (formData.exchangeListings?.length > 0) {
      // Valid if at least one exchange is selected
    }

    // Legal Documents validation - if documents are selected
    if (formData.legalDocuments?.length > 0) {
      // Valid if at least one document is selected
    }

    return errors;
  };

  const submitForm = async (data: FormSubmissionData) => {
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', data);

      // First check if the tables exist
      const { error: testError } = await supabase
        .from('form_submissions')
        .select('id')
        .limit(1);

      if (testError) {
        console.error('Database tables not found:', testError);
        toast({
          title: "Database Error",
          description: "Database tables are not set up. Please run the database migrations first.",
          variant: "destructive",
        });
        throw new Error('Database tables not found. Please run migrations.');
      }

      // Insert main form submission
      const { data: submission, error: submissionError } = await supabase
        .from('form_submissions')
        .insert(data.main)
        .select()
        .single();

      if (submissionError) {
        console.error('Submission error:', submissionError);
        throw submissionError;
      }

      const submissionId = submission.id;
      console.log('Created submission with ID:', submissionId);

      // Insert optional sections data
      if (data.tokenFeatures && data.tokenFeatures.length > 0) {
        const tokenFeatures = data.tokenFeatures.map((feature: string) => ({
          submission_id: submissionId,
          feature_name: feature
        }));
        
        const { error: featuresError } = await supabase
          .from('token_features')
          .insert(tokenFeatures);
        
        if (featuresError) {
          console.error('Features error:', featuresError);
          throw featuresError;
        }
      }

      // Insert letterhead data
      // if (data.letterhead && data.letterhead.enabled) {
      //   const { error: letterheadError } = await supabase
      //     .from('letterhead_services')
      //     .insert({
      //       submission_id: submissionId,
      //       enabled: data.letterhead.enabled,
      //       guidelines: data.letterhead.guidelines
      //     });
        
      //   if (letterheadError) {
      //     console.error('Letterhead error:', letterheadError);
      //     throw letterheadError;
      //   }
      // }

      // Insert raise document data
      // if (data.raiseDocument && data.raiseDocument.regions?.length > 0) {
      //   const regions = data.raiseDocument.regions.map((region: string) => ({
      //     submission_id: submissionId,
      //     region: region
      //   }));
        
      //   const { error: regionsError } = await supabase
      //     .from('raise_document_regions')
      //     .insert(regions);
        
      //   if (regionsError) {
      //     console.error('Regions error:', regionsError);
      //     throw regionsError;
      //   }

      //   // Insert raise document details
      //   const { error: raiseDocError } = await supabase
      //     .from('raise_documents')
      //     .insert({
      //       submission_id: submissionId,
      //       company: data.raiseDocument.company,
      //       contact_name: data.raiseDocument.contact_name,
      //       contact_person: data.raiseDocument.contact_person,
      //       position: data.raiseDocument.position,
      //       email: data.raiseDocument.email,
      //       phone: data.raiseDocument.phone,
      //       address: data.raiseDocument.address,
      //       website: data.raiseDocument.website
      //     });
        
      //   if (raiseDocError) {
      //     console.error('Raise document error:', raiseDocError);
      //     throw raiseDocError;
      //   }
      // }

      // Insert whitepaper data
      // if (data.whitepaper && data.whitepaper.pages && data.whitepaper.pages !== 'none') {
      //   const { error: whitepaperError } = await supabase
      //     .from('whitepapers')
      //     .insert({
      //       submission_id: submissionId,
      //       pages: data.whitepaper.pages,
      //       guidelines: data.whitepaper.guidelines
      //     });
        
      //   if (whitepaperError) {
      //     console.error('Whitepaper error:', whitepaperError);
      //     throw whitepaperError;
      //   }
      // }

      // Insert website plan data
      // if (data.websitePlan && data.websitePlan.enabled) {
      //   const { error: websiteError } = await supabase
      //     .from('website_plans')
      //     .insert({
      //       submission_id: submissionId,
      //       enabled: data.websitePlan.enabled,
      //       guidelines: data.websitePlan.guidelines
      //     });
        
      //   if (websiteError) {
      //     console.error('Website plan error:', websiteError);
      //     throw websiteError;
      //   }
      // }

      // Insert exchange listings data
      // if (data.exchangeListings && data.exchangeListings.exchanges?.length > 0) {
      //   const exchanges = data.exchangeListings.exchanges.map((exchange: string) => ({
      //     submission_id: submissionId,
      //     exchange_name: exchange
      //   }));
        
      //   const { error: exchangesError } = await supabase
      //     .from('exchange_listings')
      //     .insert(exchanges);
        
      //   if (exchangesError) {
      //     console.error('Exchanges error:', exchangesError);
      //     throw exchangesError;
      //   }
      // }

      // Insert legal documents data
      // if (data.legalDocuments && data.legalDocuments.documents?.length > 0) {
      //   const documents = data.legalDocuments.documents.map((doc: string) => ({
      //     submission_id: submissionId,
      //     document_type: doc
      //   }));
        
      //   const { error: documentsError } = await supabase
      //     .from('legal_documents')
      //     .insert(documents);
        
      //   if (documentsError) {
      //     console.error('Documents error:', documentsError);
      //     throw documentsError;
      //   }

      //   // Insert legal document preferences
      //   const { error: legalPrefError } = await supabase
      //     .from('legal_document_preferences')
      //     .insert({
      //       submission_id: submissionId,
      //       preferences: data.legalDocuments.preferences
      //     });
        
      //   if (legalPrefError) {
      //     console.error('Legal preferences error:', legalPrefError);
      //     throw legalPrefError;
      //   }
      // }

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      return { success: true, submissionId };
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitKnightsbridgeForm = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredErrors = validateRequiredFields(formData);
      
      if (requiredErrors.length > 0) {
        const errorMessages = requiredErrors.map(error => error.message).join('\n');
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        });
        return { success: false, errors: requiredErrors };
      }

      // Prepare structured form data for edge function
      const submissionData = {
        main: {
          type: 'Knightsbridge' as const,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          kyc_full_name: formData.kycFullName,
          kyc_id_number: formData.kycIdNumber,
          kyc_date_of_birth: formData.kycDateOfBirth,
          kyc_nationality: formData.kycNationality,
          kyc_address: formData.kycAddress,
          kyc_occupation: formData.kycOccupation,
          kyc_employer: formData.kycEmployer,
          kyc_income_source: formData.kycIncomeSource,
          custodian_name: formData.custodianName,
          custodian_contact: formData.custodianContact,
          custodian_registration: formData.custodianRegistration,
          custodian_address: formData.custodianAddress,
          custodian_services: formData.custodianServices,
          issuer_entity_name: formData.issuerEntityName,
          issuer_jurisdiction: formData.issuerJurisdiction,
          issuer_contact_person: formData.issuerContactPerson,
          issuer_contact_info: formData.issuerContactInfo,
          issuer_address: formData.issuerAddress,
          issuer_business_type: formData.issuerBusinessType,
          issuer_registration_number: formData.issuerRegistrationNumber,
          business_plan_type: JSON.stringify(formData.businessPlanType || {}),
          business_plan_guidelines: formData.businessPlanGuidelines,
          business_plan_executive_summary: formData.businessPlanExecutiveSummary,
          business_plan_market_analysis: formData.businessPlanMarketAnalysis,
          business_plan_financial_projections: formData.businessPlanFinancialProjections,
          token_name: formData.tokenName,
          token_ticker: formData.tokenTicker,
          token_chain: formData.tokenChain,
          token_decimals: formData.tokenDecimals,
          target_price: formData.targetPrice,
          treasury_address: formData.treasuryAddress,
          payment_amount: 15000,
          status: 'Pending'
        }
      };

      // Add optional sections only if they have data
      if (formData.tokenFeatures?.length > 0) {
        submissionData.tokenFeatures = formData.tokenFeatures;
      }

      if (formData.raiseDocumentRegions?.length > 0) {
        submissionData.raiseDocumentRegions = formData.raiseDocumentRegions;
      }

      if (formData.exchangeListings?.length > 0) {
        submissionData.exchangeListings = formData.exchangeListings;
      }

      if (formData.legalDocuments?.length > 0) {
        submissionData.legalDocuments = formData.legalDocuments;
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('submit-form', {
        body: { formData: submissionData }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: "Your Knightsbridge form has been submitted successfully.",
      });

      return { success: true, submissionId: data?.submissionId };
    } catch (error) {
      console.error('Knightsbridge form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateAndSubmit = async (formData: any) => {
    // Validate required fields
    const requiredErrors = validateRequiredFields(formData);
    const optionalErrors = validateOptionalSections(formData);
    
    const allErrors = [...requiredErrors, ...optionalErrors];
    
    if (allErrors.length > 0) {
      const errorMessages = allErrors.map(error => error.message).join('\n');
      toast({
        title: "Validation Error",
        description: errorMessages,
        variant: "destructive",
      });
      return { success: false, errors: allErrors };
    }

    // Prepare structured submission data
    const submissionData: FormSubmissionData = {
      main: {
        type: 'Decentralized' as const,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        token_name: formData.tokenName,
        token_ticker: formData.tokenTicker,
        token_chain: formData.tokenChain,
        token_decimals: formData.tokenDecimals,
        target_price: formData.targetPrice,
        treasury_address: formData.treasuryAddress,
      }
    };

    // Add optional sections only if they have data
    if (formData.tokenFeatures?.length > 0) {
      submissionData.tokenFeatures = formData.tokenFeatures;
    }

    if (formData.raiseDocumentRegions?.length > 0) {
      submissionData.raiseDocumentRegions = formData.raiseDocumentRegions;
    }

    if (formData.exchangeListings?.length > 0) {
      submissionData.exchangeListings = formData.exchangeListings;
    }

    if (formData.legalDocuments?.length > 0) {
      submissionData.legalDocuments = formData.legalDocuments;
    }

    return await submitForm(submissionData);
  };

  return { submitForm, validateAndSubmit, submitKnightsbridgeForm, isSubmitting };
};
