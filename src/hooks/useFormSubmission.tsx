
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
      console.log('Submitting form data via edge function:', data);

      // Use the edge function for submission (same as Decentralized)
      const { data: result, error } = await supabase.functions.invoke('submit-form', {
        body: { formData: data }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      console.log('Form submitted successfully:', result);

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      return { success: true, submissionId: result.submissionId };
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

  const validateAndSubmit = async (formData: any) => {
    // Handle both direct form data (from Decentralized) and structured submission data (from Knightsbridge)
    let submissionData: FormSubmissionData;
    
    if (formData.main) {
      // Already structured (from Knightsbridge)
      submissionData = formData;
    } else {
      // Validate required fields first
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

      // Prepare structured submission data for Decentralized
      submissionData = {
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
        },
        tokenFeatures: formData.tokenFeatures,
        raiseDocumentRegions: formData.raiseDocumentRegions,
        exchangeListings: formData.exchangeListings,
        legalDocuments: formData.legalDocuments
      };
    }

    return await submitForm(submissionData);
  };

  return { submitForm, validateAndSubmit, isSubmitting };
};
