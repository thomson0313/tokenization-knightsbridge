
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
      const response = await fetch('/functions/v1/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData: data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });

      return result;
    } catch (error) {
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
