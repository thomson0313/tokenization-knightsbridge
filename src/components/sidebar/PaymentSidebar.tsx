import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useToast } from '@/hooks/use-toast';

interface PaymentSidebarProps {
	isVisible: boolean;
	onClose: () => void;
	onPayNow: () => Promise<void>;
	isSubmitting?: boolean;
	totalAmount?: number;
}

export const PaymentSidebar: React.FC<PaymentSidebarProps> = ({
	isVisible,
	onClose,
	onPayNow,
	isSubmitting = false,
	totalAmount = 0
}) => {
	const [selectedPayment, setSelectedPayment] = useState('btc');
	const [isProcessingCrypto, setIsProcessingCrypto] = useState(false);
	const { toast } = useToast();

	const handleCryptoPayment = async (currency: string) => {
		setIsProcessingCrypto(true);

		try {
			// First submit the form data
			const submissionDataResult: any = await onPayNow();

			if (!submissionDataResult) {
				throw new Error('Form submission failed');
			}

			// Only proceed with crypto payment if form submission was successful
			const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

			const { data, error } = await supabase.functions.invoke('create-nowpayment', {
				body: {
					amount: totalAmount,
					currency: currency === 'btc' ? 'BTC' : 'USDTTRC20',
					orderId: orderId,
					orderDescription: `Token Services Payment - ${currency.toUpperCase()}`
				}
			});

			if (error) {
				throw error;
			}

			if (data.success && data.payment) {
				// Open payment URL in new tab
				window.open(data.payment.payment_url, '_blank');

				toast({
					title: "Payment Page Opened",
					description: `${currency.toUpperCase()} payment page opened in new tab.`,
				});
			} else {
				throw new Error('Failed to create payment');
			}
		} catch (error) {
			console.error('Payment process error:', error);
			toast({
				title: "Payment Error",
				description: "Failed to process payment. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsProcessingCrypto(false);
		}
	};

	const handlePayNow = async () => {
		if (selectedPayment === 'btc' || selectedPayment === 'usdt') {
			await handleCryptoPayment(selectedPayment);
		} else {
			// Handle Stripe payment - submit form first, then proceed with Stripe
			await onPayNow();
		}
	};

	return (
		<div className="h-full w-full bg-bg-secondary border-l border-border-primary p-5">
			<div className="border-l-4 border-white pl-4 mb-8">
				<h2 className="text-text-primary text-[35px] font-normal mb-2">
					Select Payment
				</h2>
				<p className="text-text-secondary text-[17px] font-normal">
					Choose your preferred payment method.
				</p>
			</div>

			<div className="space-y-4">
				<div
					className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === 'stripe'
						? 'border-text-primary bg-[rgba(255,255,255,0.05)]'
						: 'border-border-primary hover:border-text-primary'
						}`}
					onClick={() => setSelectedPayment('stripe')}
				>
					<div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
						<span className="text-white text-xl font-bold">S</span>
					</div>
					<span className="text-text-primary text-xl font-normal flex-1">Stripe</span>
					<div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedPayment === 'stripe' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
						}`}>
						{selectedPayment === 'stripe' && (
							<div className="w-3 h-3 bg-bg-primary rounded-full"></div>
						)}
					</div>
				</div>

				<div
					className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === 'btc'
						? 'border-text-primary bg-[rgba(255,255,255,0.05)]'
						: 'border-border-primary hover:border-text-primary'
						}`}
					onClick={() => setSelectedPayment('btc')}
				>
					<div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
						<span className="text-white text-xl font-bold">₿</span>
					</div>
					<span className="text-text-primary text-xl font-normal flex-1">Bitcoin</span>
					<div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedPayment === 'btc' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
						}`}>
						{selectedPayment === 'btc' && (
							<div className="w-3 h-3 bg-bg-primary rounded-full"></div>
						)}
					</div>
				</div>

				<div
					className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === 'usdt'
						? 'border-text-primary bg-[rgba(255,255,255,0.05)]'
						: 'border-border-primary hover:border-text-primary'
						}`}
					onClick={() => setSelectedPayment('usdt')}
				>
					<div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
						<span className="text-white text-xl font-bold">₮</span>
					</div>
					<span className="text-text-primary text-xl font-normal flex-1">USDT (TRC20)</span>
					<div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${selectedPayment === 'usdt' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
						}`}>
						{selectedPayment === 'usdt' && (
							<div className="w-3 h-3 bg-bg-primary rounded-full"></div>
						)}
					</div>
				</div>
			</div>

			{totalAmount > 0 && (
				<div className="mt-6 p-4 bg-[rgba(255,255,255,0.05)] rounded-xl">
					<div className="flex justify-between items-center">
						<span className="text-text-secondary">Total Amount:</span>
						<span className="text-text-primary text-xl font-medium">${totalAmount}</span>
					</div>
				</div>
			)}

			<button
				onClick={handlePayNow}
				disabled={isSubmitting || isProcessingCrypto}
				className="w-full py-4 bg-text-primary text-bg-primary text-[17px] font-medium rounded-xl hover:opacity-90 transition-opacity mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isProcessingCrypto ? 'Processing...' :
					isSubmitting ? 'Submitting Data...' :
						selectedPayment === 'stripe' ? 'Pay with Stripe' :
							selectedPayment === 'btc' ? `Pay ${totalAmount} USD in Bitcoin` :
								`Pay ${totalAmount} USD in USDT`}
			</button>
		</div>
	);
};
