
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
	tokenFeatures?: string[];
	letterhead?: {
		submission_id?: string;
		enabled: boolean;
		guidelines: string;
	};
	raiseDocumentRegions?: string[];
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
	whitePaperPages?: string;
	whitePaperGuidelines?: string;
	whitepaper?: {
		submission_id?: string;
		pages: string;
		guidelines: string;
	};
	websitePlanEnabled?: boolean;
	websitePlanGuidelines?: string;
	websitePlan?: {
		submission_id?: string;
		enabled: boolean;
		guidelines: string;
	};
	exchangeListings?: string[];
	legalDocuments?: string[];
	legalDocumentsPreferences?: string;
}

interface ValidationError {
	field: string;
	message: string;
}

export const useFormSubmission = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	const validateRequiredFields = (formData: any, type: string): ValidationError[] => {
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

		// Knightsbridge-specific required fields
		if (type === 'Knightsbridge') {
			// KYC Information validation
			if (!formData.kycFullName?.trim()) {
				errors.push({ field: 'kycFullName', message: 'KYC Full Name is required' });
			}
			if (!formData.kycIdNumber?.trim()) {
				errors.push({ field: 'kycIdNumber', message: 'KYC ID Number is required' });
			}
			if (!formData.kycNationality?.trim()) {
				errors.push({ field: 'kycNationality', message: 'KYC Nationality is required' });
			}
			if (!formData.kycAddress?.trim()) {
				errors.push({ field: 'kycAddress', message: 'KYC Address is required' });
			}
			if (!formData.kycOccupation?.trim()) {
				errors.push({ field: 'kycOccupation', message: 'KYC Occupation is required' });
			}

			// Custodian Information validation
			if (!formData.custodianName?.trim()) {
				errors.push({ field: 'custodianName', message: 'Custodian Name is required' });
			}
			if (!formData.custodianContact?.trim()) {
				errors.push({ field: 'custodianContact', message: 'Custodian Contact is required' });
			}
			if (!formData.custodianRegistration?.trim()) {
				errors.push({ field: 'custodianRegistration', message: 'Custodian Registration is required' });
			}

			// Issuer Information validation
			if (!formData.issuerEntityName?.trim()) {
				errors.push({ field: 'issuerEntityName', message: 'Issuer Entity Name is required' });
			}
			if (!formData.issuerJurisdiction?.trim()) {
				errors.push({ field: 'issuerJurisdiction', message: 'Issuer Jurisdiction is required' });
			}
			if (!formData.issuerContactPerson?.trim()) {
				errors.push({ field: 'issuerContactPerson', message: 'Issuer Contact Person is required' });
			}
			if (!formData.issuerContactInfo?.trim()) {
				errors.push({ field: 'issuerContactInfo', message: 'Issuer Contact Info is required' });
			}

			// Business Plan validation
			if (!formData.businessPlanType || formData.businessPlanType.length === 0) {
				errors.push({ field: 'businessPlanType', message: 'At least one Business Plan Type is required' });
			}
			if (!formData.businessPlanGuidelines?.trim()) {
				errors.push({ field: 'businessPlanGuidelines', message: 'Business Plan Guidelines are required' });
			}
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

			// Submit to Supabase Edge Function
			const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-form`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
				},
				body: JSON.stringify({ formData: data }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to submit form');
			}

			const result = await response.json();
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

	const validateAndSubmit = async (formData: any, type: string) => {
		// Validate required fields
		const requiredErrors = validateRequiredFields(formData, type);
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
				business_plan_type: Array.isArray(formData.businessPlanType) ? JSON.stringify(formData.businessPlanType) : formData.businessPlanType,
				business_plan_guidelines: formData.businessPlanGuidelines,
				business_plan_executive_summary: formData.businessPlanExecutiveSummary,
				business_plan_market_analysis: formData.businessPlanMarketAnalysis,
				business_plan_financial_projections: formData.businessPlanFinancialProjections
			}
		};

		// Add optional sections only if they have data
		if (formData.tokenFeatures?.length > 0) {
			submissionData.tokenFeatures = formData.tokenFeatures;
		}

		if (formData.letterheadEnabled || formData.letterheadGuidelines?.trim()) {
			submissionData.letterhead = {
				enabled: formData.letterheadEnabled,
				guidelines: formData.letterheadGuidelines || ''
			};
		}

		if (formData.raiseDocumentRegions?.length > 0) {
			submissionData.raiseDocumentRegions = formData.raiseDocumentRegions;
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
			submissionData.whitePaperPages = formData.whitePaperPages;
			submissionData.whitePaperGuidelines = formData.whitePaperGuidelines || '';
		}

		if (formData.websitePlanEnabled) {
			submissionData.websitePlanEnabled = formData.websitePlanEnabled;
			submissionData.websitePlanGuidelines = formData.websitePlanGuidelines || '';
		}

		if (formData.exchangeListings?.length > 0) {
			submissionData.exchangeListings = formData.exchangeListings;
		}

		if (formData.legalDocuments?.length > 0) {
			submissionData.legalDocuments = formData.legalDocuments;
			submissionData.legalDocumentsPreferences = formData.legalDocumentsPreferences || '';
		}

		return await submitForm(submissionData);
	};

	return { submitForm, validateAndSubmit, isSubmitting };
};
