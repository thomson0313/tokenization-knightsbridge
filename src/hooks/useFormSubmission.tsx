
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface FormSubmissionData {
  main: {
    type: 'Knightsbridge' | 'Decentralized';
    contact_email: string;
    contact_phone: string;
    [key: string]: any;
  };
  tokenFeatures?: string[];
  raiseDocumentRegions?: string[];
  exchangeListings?: string[];
  legalDocuments?: string[];
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

      // Insert related data
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

      if (data.raiseDocumentRegions && data.raiseDocumentRegions.length > 0) {
        const regions = data.raiseDocumentRegions.map((region: string) => ({
          submission_id: submissionId,
          region: region
        }));
        
        const { error: regionsError } = await supabase
          .from('raise_document_regions')
          .insert(regions);
        
        if (regionsError) {
          console.error('Regions error:', regionsError);
          throw regionsError;
        }
      }

      if (data.exchangeListings && data.exchangeListings.length > 0) {
        const exchanges = data.exchangeListings.map((exchange: string) => ({
          submission_id: submissionId,
          exchange_name: exchange
        }));
        
        const { error: exchangesError } = await supabase
          .from('exchange_listings')
          .insert(exchanges);
        
        if (exchangesError) {
          console.error('Exchanges error:', exchangesError);
          throw exchangesError;
        }
      }

      if (data.legalDocuments && data.legalDocuments.length > 0) {
        const documents = data.legalDocuments.map((doc: string) => ({
          submission_id: submissionId,
          document_type: doc
        }));
        
        const { error: documentsError } = await supabase
          .from('legal_documents')
          .insert(documents);
        
        if (documentsError) {
          console.error('Documents error:', documentsError);
          throw documentsError;
        }
      }

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

  return { submitForm, isSubmitting };
};
