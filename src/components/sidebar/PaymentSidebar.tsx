
import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { useToast } from '@/hooks/use-toast';
import { useFormContext } from '../../contexts/FormContext';

interface PaymentSidebarProps {
  isVisible: boolean;
  onClose: () => void;
  onPayNow: () => Promise<void>;
  isSubmitting?: boolean;
  totalAmount?: number;
  formType?: string;
}

export const PaymentSidebar: React.FC<PaymentSidebarProps> = ({ 
  isVisible, 
  onClose, 
  onPayNow,
  isSubmitting = false,
  totalAmount = 0,
  formType = 'Decentralized'
}) => {
  const [selectedPayment, setSelectedPayment] = useState('btc');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [currentSubmissionId, setCurrentSubmissionId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const { toast } = useToast();
  const { formData } = useFormContext();

  // Poll for payment status updates
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (currentSubmissionId && isProcessingPayment) {
      intervalId = setInterval(async () => {
        try {
          const { data, error } = await supabase
            .from('form_submissions')
            .select('payment_status')
            .eq('id', currentSubmissionId)
            .single();

          if (error) throw error;

          if (data?.payment_status && data.payment_status !== 'pending') {
            setPaymentStatus(data.payment_status);
            setIsProcessingPayment(false);
            
            if (data.payment_status === 'completed') {
              toast({
                title: "Payment Successful!",
                description: "Your payment has been completed successfully.",
              });
            } else if (data.payment_status === 'failed') {
              toast({
                title: "Payment Failed",
                description: "Your payment could not be processed. Please try again.",
                variant: "destructive",
              });
            }
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [currentSubmissionId, isProcessingPayment, toast]);

  const handleCryptoPayment = async (currency: string) => {
    setIsProcessingPayment(true);
    
    try {
      // First submit the form to get a submission ID
      const result = await onPayNow();
      
      // Wait a moment for the submission to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the latest submission (this is a simplified approach)
      const { data: submissions, error: fetchError } = await supabase
        .from('form_submissions')
        .select('id')
        .eq('contact_email', formData.contactEmail)
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;
      
      const submissionId = submissions?.[0]?.id;
      if (!submissionId) throw new Error('Could not create submission');
      
      setCurrentSubmissionId(submissionId);

      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase.functions.invoke('create-nowpayment', {
        body: {
          amount: totalAmount,
          currency: currency,
          orderId: orderId,
          orderDescription: `Token Services Payment - ${currency.toUpperCase()}`,
          submissionId: submissionId
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
          description: `${currency.toUpperCase()} payment page opened in new tab. Don't close this page until payment is completed.`,
        });
      } else {
        throw new Error('Failed to create payment');
      }
    } catch (error) {
      console.error('Crypto payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to create crypto payment. Please try again.",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    }
  };

  const handlePayNow = async () => {
    if (selectedPayment === 'btc' || selectedPayment === 'usdt') {
      await handleCryptoPayment(selectedPayment);
    } else {
      // Handle Stripe payment
      await onPayNow();
    }
  };

  const getButtonText = () => {
    if (isProcessingPayment) {
      return 'Processing Payment...';
    }
    if (isSubmitting) {
      return 'Processing...';
    }
    
    switch (selectedPayment) {
      case 'stripe':
        return 'Pay with Stripe';
      case 'btc':
        return `Pay ${totalAmount} USD in Bitcoin`;
      case 'usdt':
        return `Pay ${totalAmount} USD in USDT`;
      default:
        return 'Pay Now';
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
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'stripe' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('stripe')}
        >
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">Stripe</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'stripe' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
          }`}>
            {selectedPayment === 'stripe' && (
              <div className="w-3 h-3 bg-bg-primary rounded-full"></div>
            )}
          </div>
        </div>

        <div 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'btc' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('btc')}
        >
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">₿</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">Bitcoin</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'btc' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
          }`}>
            {selectedPayment === 'btc' && (
              <div className="w-3 h-3 bg-bg-primary rounded-full"></div>
            )}
          </div>
        </div>

        <div 
          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
            selectedPayment === 'usdt' 
              ? 'border-text-primary bg-[rgba(255,255,255,0.05)]' 
              : 'border-border-primary hover:border-text-primary'
          }`}
          onClick={() => setSelectedPayment('usdt')}
        >
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white text-xl font-bold">₮</span>
          </div>
          <span className="text-text-primary text-xl font-normal flex-1">USDT (Multiple Networks)</span>
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${
            selectedPayment === 'usdt' ? 'border-text-primary bg-text-primary' : 'border-border-primary'
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

      {isProcessingPayment && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-200 text-sm font-medium mb-2">⚠️ Payment in Progress</p>
          <p className="text-yellow-100 text-sm">
            Don't close this page until your payment is completed. We're monitoring your payment status.
          </p>
        </div>
      )}

      {paymentStatus && (
        <div className={`mt-6 p-4 rounded-xl ${
          paymentStatus === 'completed' 
            ? 'bg-green-500/10 border border-green-500/20' 
            : 'bg-red-500/10 border border-red-500/20'
        }`}>
          <p className={`text-sm font-medium ${
            paymentStatus === 'completed' ? 'text-green-200' : 'text-red-200'
          }`}>
            Payment {paymentStatus === 'completed' ? 'Successful!' : 'Failed'}
          </p>
        </div>
      )}

      <button
        onClick={handlePayNow}
        disabled={isSubmitting || isProcessingPayment}
        className="w-full py-4 bg-text-primary text-bg-primary text-[17px] font-medium rounded-xl hover:opacity-90 transition-opacity mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </button>
    </div>
  );
};
