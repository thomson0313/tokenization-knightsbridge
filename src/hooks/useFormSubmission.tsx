import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface FormSubmissionData {
	main: {
		type: string;
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
	tokenFeatures?: {
		submission_id?: string;
		features: string[];
	};
	letterhead?: {
		submission_id?: string;
		enabled: boolean;
		guidelines: string;
	};
	raiseDocument?: {
		submission_id?: string;
		regions: string[];
		company: string;
		contact_name: string;
		contact_person: string;
		position: string;
		email: string;
		phone: string;
		address: string;
		website: string;
	};
	whitepaper?: {
		submission_id?: string;
		pages: string;
		guidelines: string;
	};
	websitePlan?: {
		submission_id?: string;
		enabled: boolean;
		guidelines: string;
	};
	exchangeListings?: {
		submission_id?: string;
		exchanges: string[];
	};
	legalDocuments?: {
		submission_id?: string;
		documents: string[];
		preferences: string;
	};
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

		// Token Features validation - if category is enabled, at least one feature should be selected
		if (formData.featuresEnabled) {
			if (!formData.tokenFeatures?.length) {
				errors.push({ field: 'tokenFeatures', message: 'At least one feature must be selected when Features category is enabled' });
			}
		}

		// Letterhead validation - if category is enabled, guidelines should be provided
		if (formData.letterheadEnabled) {
			if (!formData.letterheadGuidelines?.trim()) {
				errors.push({ field: 'letterheadGuidelines', message: 'Guidelines are required when Letterhead category is enabled' });
			}
		}

		// Raise Document validation - if category is enabled, regions and other fields should be filled
		if (formData.raiseDocumentEnabled) {
			if (!formData.raiseDocumentRegions?.length) {
				errors.push({ field: 'raiseDocumentRegions', message: 'At least one region must be selected when Raise Document category is enabled' });
			}
			if (!formData.raiseDocumentCompany?.trim()) {
				errors.push({ field: 'raiseDocumentCompany', message: 'Company name is required when Raise Document category is enabled' });
			}
			if (!formData.raiseDocumentContactName?.trim()) {
				errors.push({ field: 'raiseDocumentContactName', message: 'Contact name is required when Raise Document category is enabled' });
			}
			if (!formData.raiseDocumentEmail?.trim()) {
				errors.push({ field: 'raiseDocumentEmail', message: 'Email is required when Raise Document category is enabled' });
			}
		}

		// White Paper validation - if category is enabled, pages and guidelines should be provided
		if (formData.whitePaperEnabled) {
			if (!formData.whitePaperPages?.trim() || formData.whitePaperPages === 'none') {
				errors.push({ field: 'whitePaperPages', message: 'Page count must be selected when White Paper category is enabled' });
			}
			if (!formData.whitePaperGuidelines?.trim()) {
				errors.push({ field: 'whitePaperGuidelines', message: 'Guidelines are required when White Paper category is enabled' });
			}
		}

		// Website Plan validation - if category is enabled, guidelines should be provided
		if (formData.websitePlanEnabled) {
			if (!formData.websitePlanGuidelines?.trim()) {
				errors.push({ field: 'websitePlanGuidelines', message: 'Guidelines are required when Website Plan category is enabled' });
			}
		}

		// Exchange Listings validation - if category is enabled, at least one exchange should be selected
		if (formData.exchangeListingEnabled) {
			if (!formData.exchangeListings?.length) {
				errors.push({ field: 'exchangeListings', message: 'At least one exchange must be selected when Exchange Listing category is enabled' });
			}
		}

		// Legal Documents validation - if category is enabled, at least one document should be selected
		if (formData.legalDocumentsEnabled) {
			if (!formData.legalDocuments?.length) {
				errors.push({ field: 'legalDocuments', message: 'At least one legal document must be selected when Legal Documents category is enabled' });
			}
		}

		return errors;
	};

	const uploadToSupabase = async (uploadedFiles: Record<string, any>, submissionId: string) => {
		const documentsToInsert = Object.entries(uploadedFiles).map(([fieldName, fileData]) => ({
			submission_id: submissionId,
			field_name: fieldName,
			original_filename: fileData.file.name,
			file_path: fileData.storagePath,
			file_size: fileData.file.size,
			mime_type: fileData.file.type
		}));

		if (documentsToInsert.length > 0) {
			const { error: documentsError } = await supabase
				.from('uploaded_documents')
				.insert(documentsToInsert);

			if (documentsError) {
				console.error('Documents storage error:', documentsError);
				throw documentsError;
			}
		}
	};

	const submitForm = async (data: FormSubmissionData, uploadedFiles: Record<string, any> = {}) => {
		setIsSubmitting(true);

		try {
			console.log('Submitting form data:', data);
			console.log('Uploaded files:', uploadedFiles);

			// Call Supabase Edge Function instead of relative API route
			const { data: result, error } = await supabase.functions.invoke('submit-form', {
				body: { 
					formData: data,
					uploadedFiles: uploadedFiles 
				}
			});

			if (error) {
				console.error('Edge function error:', error);
				throw new Error(error.message || 'Submission failed');
			}

			console.log('Submission successful:', result);

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

	const validateAndSubmit = async (formData: any, type: string, amount: number, fileUpload?: any) => {
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

		// Prepare structured submission data with proper field mapping
		const submissionData: FormSubmissionData = {
			main: {
				type: type,
				contact_email: formData.contactEmail,
				contact_phone: formData.contactPhone,
				token_name: formData.tokenName,
				token_ticker: formData.tokenTicker,
				token_chain: formData.tokenChain,
				token_decimals: formData.tokenDecimals,
				target_price: formData.targetPrice,
				treasury_address: formData.treasuryAddress,
				// Map Knightsbridge-specific fields to snake_case database columns
				kyc_full_name: formData.kycFullName,
				kyc_id_number: formData.kycIdNumber,
				kyc_date_of_birth: formData.kycDateOfBirth && formData.kycDateOfBirth.trim() ? formData.kycDateOfBirth : null,
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
				business_plan_type: typeof formData.businessPlanType === 'object' ? JSON.stringify(formData.businessPlanType) : formData.businessPlanType,
				business_plan_guidelines: formData.businessPlanGuidelines,
				business_plan_executive_summary: formData.businessPlanExecutiveSummary,
				business_plan_market_analysis: formData.businessPlanMarketAnalysis,
				business_plan_financial_projections: formData.businessPlanFinancialProjections,
				payment_amount: amount.toString() // Store amount as string for consistency
			}
		};

		// Add optional sections only if they have data
		if (formData.tokenFeatures?.length > 0) {
			submissionData.tokenFeatures = {
				features: formData.tokenFeatures
			};
		}

		if (formData.letterheadEnabled || formData.letterheadGuidelines?.trim()) {
			submissionData.letterhead = {
				enabled: formData.letterheadEnabled,
				guidelines: formData.letterheadGuidelines || ''
			};
		}

		if (formData.raiseDocumentRegions?.length > 0) {
			submissionData.raiseDocument = {
				regions: formData.raiseDocumentRegions,
				company: formData.raiseDocumentCompany || '',
				contact_name: formData.raiseDocumentContactName || '',
				contact_person: formData.raiseDocumentContactPerson || '',
				position: formData.raiseDocumentPosition || '',
				email: formData.raiseDocumentEmail || '',
				phone: formData.raiseDocumentPhone || '',
				address: formData.raiseDocumentAddress || '',
				website: formData.raiseDocumentWebsite || ''
			};
		}

		if (formData.whitePaperPages?.trim() && formData.whitePaperPages !== 'none') {
			submissionData.whitepaper = {
				pages: formData.whitePaperPages,
				guidelines: formData.whitePaperGuidelines || ''
			};
		}

		if (formData.websitePlanEnabled) {
			submissionData.websitePlan = {
				enabled: formData.websitePlanEnabled,
				guidelines: formData.websitePlanGuidelines || ''
			};
		}

		if (formData.exchangeListings?.length > 0) {
			submissionData.exchangeListings = {
				exchanges: formData.exchangeListings
			};
		}

		if (formData.legalDocuments?.length > 0) {
			submissionData.legalDocuments = {
				documents: formData.legalDocuments,
				preferences: formData.legalDocumentsPreferences || ''
			};
		}

		// Get uploaded files from the file upload hook
		const uploadedFiles = fileUpload ? fileUpload.uploadedFiles : {};

		return await submitForm(submissionData, uploadedFiles);
	};

	return { submitForm, validateAndSubmit, isSubmitting };
};
