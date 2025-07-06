
import React from 'react';
import { CategoryHeader } from '../../ui/CategoryHeader';
import { UploadButton } from '../../ui/UploadButton';
import { useFormContext } from '../../../contexts/FormContext';

export const PensionPlanSection: React.FC = () => {
	const { formData, updateFormData, fileUpload } = useFormContext();

	const handleUploadPlanGuide = async (file: File) => {
		const url = await fileUpload.uploadFile(file, 'pensionPlanGuide');
		if (url) {
			updateFormData('pensionPlanGuideUrl', url);
		}
	};

	const handleGuidelinesChange = (guidelines: string) => {
		updateFormData('pensionPlanGuidelines', guidelines);
	};

	return (
		<section className="box-border m-0 p-0">
			<CategoryHeader
				title="Pension Plan"
				description="Outline your strategy to drive growth and achieve your goals"
				rightContent={
					<UploadButton
						label="Upload Plan guide"
						onFileUpload={handleUploadPlanGuide}
						fieldName="pensionPlanGuide"
						uploadedFile={fileUpload.getFile('pensionPlanGuide')}
						isUploading={fileUpload.isUploading('pensionPlanGuide')}
						onRemoveFile={() => fileUpload.removeFile('pensionPlanGuide')}
					/>
				}
			/>

			<div className="flex flex-col">
				<label className="text-text-primary text-[17px] font-normal mb-[11px]">
					Mention your Guidelines
				</label>
				<textarea
					value={formData.pensionPlanGuidelines || ''}
					onChange={(e) => handleGuidelinesChange(e.target.value)}
					placeholder="ENTER YOUR SERVICES"
					className="w-full h-[144px] border bg-bg-secondary text-text-primary placeholder:text-text-secondary text-[17px] font-normal px-[19px] py-[11px] rounded-xl border-solid border-border-primary focus:outline-none focus:border-blue-500 resize-none"
				/>
				<div className="text-right text-text-secondary text-sm mt-2">300 max</div>
			</div>
		</section>
	);
};
