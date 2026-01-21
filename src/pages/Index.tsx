import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { TokenMintForm } from '../components/forms/TokenMintForm';
import { FeaturesSection } from '../components/forms/FeaturesSection';
import { LetterheadSection } from '../components/forms/LetterheadSection';
import { RaiseDocumentSection } from '../components/forms/RaiseDocumentSection';
import { WhitePaperSection } from '../components/forms/WhitePaperSection';
import { WebsitePlanSection } from '../components/forms/WebsitePlanSection';
import { ExchangeListingSection } from '../components/forms/ExchangeListingSection';
import { LegalDocumentsSection } from '../components/forms/LegalDocumentsSection';
import { ContactInformationSection } from '../components/forms/ContactInformationSection';
import { ServicesSidebar } from '../components/sidebar/ServicesSidebar';
import { FormProvider, useFormContext } from '../contexts/FormContext';
import { useFormSubmission } from '../hooks/useFormSubmission';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

interface IndexProps {
	isDarkMode: boolean;
	onThemeToggle: () => void;
}

const IndexContent: React.FC<IndexProps> = ({ isDarkMode, onThemeToggle }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { formData } = useFormContext();
	const { validateAndSubmit } = useFormSubmission();

	const handleCheckout = async (amount: number) => {
		setIsSubmitting(true);
		try {
		// Validate form
		const result = await validateAndSubmit(formData, 'Decentralized', amount, undefined);
		
		if (!result.success) {
			// Validation failed
			setIsSubmitting(false);
			return;
		}

		// Format selected services for email
		const selectedServices = ['Decentralized'];
		if (formData.tokenName) selectedServices.push(`Token Mint (${formData.tokenName})`);
		if (formData.tokenFeatures?.length > 0) selectedServices.push(`Features: ${formData.tokenFeatures.join(', ')}`);
		if (formData.letterheadEnabled) selectedServices.push('Letterhead');
		if (formData.websitePlanEnabled) selectedServices.push('Website Plan');
		if (formData.whitePaperPages) selectedServices.push(`Whitepaper (${formData.whitePaperPages} pages)`);
		if (formData.raiseDocumentRegion) selectedServices.push(`Raise Document: ${formData.raiseDocumentRegion}`);
		if (formData.exchangeListings?.length > 0) selectedServices.push(`Exchange Listings: ${formData.exchangeListings.join(', ')}`);
		if (formData.legalDocuments?.length > 0) selectedServices.push(`Legal Documents: ${formData.legalDocuments.join(', ')}`);

		// Send email using emailjs
		const ServiceId = import.meta.env.VITE_EMAIL_SERVICE_ID || '';
		const TemplateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID || '';
		const EmailPublicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY || '';

		const templateParams = {
			to_email: formData.contactEmail,
			from_name: 'Decentralized',
			amount: amount.toString(),
			currency: 'USD',
			orderId: 'submissionId' in result ? result.submissionId : '',
			services: selectedServices.join(' - ')
		};

		await emailjs.send(ServiceId, TemplateId, templateParams, EmailPublicKey);
			
			toast.success('Form submitted successfully! Check your email for confirmation.');
			setIsSubmitting(false);
		} catch (error) {
			console.error('Form submission error:', error);
			toast.error('Failed to submit form. Please try again.');
			setIsSubmitting(false);
		}
	};

	return (
		<div className={`w-full min-h-screen relative overflow-x-hidden bg-bg-primary ${!isDarkMode ? 'light' : ''}`}>
			<Header isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />

			<main>
				<HeroSection />

				<div className="flex flex-col xl:flex-row gap-4 xl:gap-7 mb-[100px] px-4 pb-4 md:px-8 xl:px-16 xl:absolute right-0 w-full">
					<form className="flex-[7] border bg-bg-secondary p-4 md:p-7 rounded-3xl border-border-primary">
						<ContactInformationSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<TokenMintForm />

						<div className="w-full h-px bg-border-primary my-8" />
						<FeaturesSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<LetterheadSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<RaiseDocumentSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<WhitePaperSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<WebsitePlanSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<ExchangeListingSection />

						<div className="w-full h-px bg-border-primary my-8" />
						<LegalDocumentsSection />

					</form>

					<div className="flex-[3] min-w-0 relative">
						<div className="sticky top-4">
							<ServicesSidebar 
								onCheckout={handleCheckout} 
								isSubmitting={isSubmitting}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

const Index: React.FC<IndexProps> = ({ isDarkMode, onThemeToggle }) => {
	return (
		<FormProvider>
			<IndexContent isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
		</FormProvider>
	);
};

export default Index;
