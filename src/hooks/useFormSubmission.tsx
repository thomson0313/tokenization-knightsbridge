
import { useState } from 'react';
import { useToast } from './use-toast';

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
      // Use the correct Supabase Edge Function URL
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ formData: data }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      return result;
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
