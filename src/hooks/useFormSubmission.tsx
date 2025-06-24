import { useState } from 'react';
import { useToast } from './use-toast';
import { z } from "zod";
import { supabase } from '../utils/supabase';
import {
  KnightsbridgeSchema,
  DecentralizedSchema
} from '../utils/formSchemas';

// Define a combined schema type
export type FormSubmissionData = z.infer<typeof KnightsbridgeSchema> | z.infer<typeof DecentralizedSchema>;

interface DocumentInfo {
  originalFilename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const submitForm = async (formData: FormSubmissionData) => {
    setIsSubmitting(true);
    setValidationErrors([]);
    
    try {
      // Validate the form data based on the 'type' field
      let validationResult;
      if (formData.type === 'Knightsbridge') {
        validationResult = KnightsbridgeSchema.safeParse(formData);
      } else {
        validationResult = DecentralizedSchema.safeParse(formData);
      }

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(error => `${error.path.join('.')} ${error.message}`);
        setValidationErrors(errors);
        toast({
          title: "Validation Error",
          description: "Please correct the errors in the form.",
          variant: "destructive",
        });
        return;
      }

      // Create submission data based on type
      let submissionData: any;
      
      if (formData.type === 'Knightsbridge') {
        submissionData = {
          type: formData.type,
          submission_date: new Date().toISOString(),
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          token_name: formData.tokenName,
          token_ticker: formData.tokenTicker,
          token_chain: formData.tokenChain,
          token_decimals: formData.tokenDecimals,
          target_price: formData.targetPrice,
          treasury_address: formData.treasuryAddress,
          payment_amount: formData.paymentAmount,
          status: 'Pending' as const,
          // Knightsbridge-specific fields
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
          business_plan_type: formData.businessPlanType,
          business_plan_guidelines: formData.businessPlanGuidelines,
          business_plan_executive_summary: formData.businessPlanExecutiveSummary,
          business_plan_market_analysis: formData.businessPlanMarketAnalysis,
          business_plan_financial_projections: formData.businessPlanFinancialProjections,
        };
      } else {
        submissionData = {
          type: formData.type,
          submission_date: new Date().toISOString(),
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          token_name: formData.tokenName,
          token_ticker: formData.tokenTicker,
          token_chain: formData.tokenChain,
          token_decimals: formData.tokenDecimals,
          target_price: formData.targetPrice,
          treasury_address: formData.treasuryAddress,
          payment_amount: formData.paymentAmount,
          status: 'Pending' as const
        };
      }

      // Submit to Supabase
      const { data: submissionDataResult, error: submissionError } = await supabase
        .from('form_submissions')
        .insert([submissionData])
        .select('id')
        .single();

      if (submissionError) {
        throw submissionError;
      }

      const submissionId = submissionDataResult.id;

      // Store uploaded documents if any exist
      if (formData.uploadedDocuments && Object.keys(formData.uploadedDocuments).length > 0) {
        const documentsToInsert = Object.entries(formData.uploadedDocuments).map(([fieldName, docInfo]) => {
          const typedDocInfo = docInfo as DocumentInfo;
          return {
            submission_id: submissionId,
            field_name: fieldName,
            original_filename: typedDocInfo.originalFilename,
            file_path: typedDocInfo.filePath,
            file_size: typedDocInfo.fileSize,
            mime_type: typedDocInfo.mimeType
          };
        });

        const { error: documentsError } = await supabase
          .from('uploaded_documents')
          .insert(documentsToInsert);

        if (documentsError) {
          console.error('Error storing document metadata:', documentsError);
          // Don't fail the submission if document metadata storage fails
        }
      }

      // Store token features
      if (formData.features && formData.features.length > 0) {
        const featuresToInsert = formData.features.map(featureName => ({
          submission_id: submissionId,
          feature_name: featureName
        }));

        const { error: featuresError } = await supabase
          .from('token_features')
          .insert(featuresToInsert);

        if (featuresError) {
          console.error('Error storing token features:', featuresError);
          // Optionally handle the error, e.g., show a warning to the user
        }
      }
      
      // Store raise document regions
      if (formData.raiseDocumentRegions && formData.raiseDocumentRegions.length > 0) {
        const regionsToInsert = formData.raiseDocumentRegions.map(region => ({
          submission_id: submissionId,
          region: region
        }));

        const { error: regionsError } = await supabase
          .from('raise_document_regions')
          .insert(regionsToInsert);

        if (regionsError) {
          console.error('Error storing raise document regions:', regionsError);
        }
      }
      
      // Store exchange listings
      if (formData.exchangeListings && formData.exchangeListings.length > 0) {
        const exchangesToInsert = formData.exchangeListings.map(exchangeName => ({
          submission_id: submissionId,
          exchange_name: exchangeName
        }));

        const { error: exchangesError } = await supabase
          .from('exchange_listings')
          .insert(exchangesToInsert);

        if (exchangesError) {
          console.error('Error storing exchange listings:', exchangesError);
        }
      }
      
      // Store legal documents
      if (formData.legalDocuments && formData.legalDocuments.length > 0) {
        const documentsToInsert = formData.legalDocuments.map(documentType => ({
          submission_id: submissionId,
          document_type: documentType
        }));

        const { error: documentsError } = await supabase
          .from('legal_documents')
          .insert(documentsToInsert);

        if (documentsError) {
          console.error('Error storing legal documents:', documentsError);
        }
      }

      // Store letterhead services for both types
      if (formData.letterheadEnabled !== undefined) {
        const { error: letterheadError } = await supabase
          .from('letterhead_services')
          .insert([{
            submission_id: submissionId,
            enabled: formData.letterheadEnabled,
            guidelines: formData.letterheadGuidelines
          }]);

        if (letterheadError) {
          console.error('Error storing letterhead services:', letterheadError);
        }
      }

      // Store raise document details
      if (formData.raiseDocumentCompany) {
        const { error: raiseDocError } = await supabase
          .from('raise_documents')
          .insert([{
            submission_id: submissionId,
            company: formData.raiseDocumentCompany,
            contact_name: formData.raiseDocumentContactName,
            contact_person: formData.raiseDocumentContactPerson,
            position: formData.raiseDocumentPosition,
            email: formData.raiseDocumentEmail,
            phone: formData.raiseDocumentPhone,
            address: formData.raiseDocumentAddress,
            website: formData.raiseDocumentWebsite
          }]);

        if (raiseDocError) {
          console.error('Error storing raise document details:', raiseDocError);
        }
      }

      // Store whitepaper details
      if (formData.whitePaperPages) {
        const { error: whitepaperError } = await supabase
          .from('whitepapers')
          .insert([{
            submission_id: submissionId,
            pages: formData.whitePaperPages,
            guidelines: formData.whitePaperGuidelines
          }]);

        if (whitepaperError) {
          console.error('Error storing whitepaper details:', whitepaperError);
        }
      }

      // Store website plan
      if (formData.websitePlanEnabled !== undefined) {
        const { error: websiteError } = await supabase
          .from('website_plans')
          .insert([{
            submission_id: submissionId,
            enabled: formData.websitePlanEnabled,
            guidelines: formData.websitePlanGuidelines
          }]);

        if (websiteError) {
          console.error('Error storing website plan:', websiteError);
        }
      }

      // Store legal document preferences
      if (formData.legalDocumentsPreferences) {
        const { error: legalPrefError } = await supabase
          .from('legal_document_preferences')
          .insert([{
            submission_id: submissionId,
            preferences: formData.legalDocumentsPreferences
          }]);

        if (legalPrefError) {
          console.error('Error storing legal document preferences:', legalPrefError);
        }
      }

      toast({
        title: "Submission successful",
        description: "Your form has been submitted successfully!",
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateAndSubmit = async (formData: any, type: 'Knightsbridge' | 'Decentralized', paymentAmount: number) => {
    const submissionData = {
      ...formData,
      type,
      paymentAmount
    };
    
    try {
      await submitForm(submissionData);
      return { success: true, submissionId: 'temp-id' };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    isSubmitting,
    submitForm,
    validateAndSubmit,
    validationErrors
  };
};
