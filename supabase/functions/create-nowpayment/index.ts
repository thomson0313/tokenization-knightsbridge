
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency, orderId, orderDescription } = await req.json()
    
    const nowPaymentsApiKey = Deno.env.get('V97F98Q-CWZMR8Z-QSYSQP4-0Y0B7BW')
    
    if (!nowPaymentsApiKey) {
      throw new Error('NOWPayments API key not configured')
    }

    // Create payment with NOWPayments
    const paymentResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': nowPaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: 'USD',
        pay_currency: currency, // BTC or USDTTRC20
        order_id: orderId,
        order_description: orderDescription,
        ipn_callback_url: `${req.headers.get('origin')}/api/nowpayments-webhook`,
        success_url: `${req.headers.get('origin')}/payment-success`,
        cancel_url: `${req.headers.get('origin')}/payment-cancelled`,
      }),
    })

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.text()
      console.error('NOWPayments API error:', errorData)
      throw new Error(`NOWPayments API error: ${paymentResponse.status}`)
    }

    const paymentData = await paymentResponse.json()

    return new Response(
      JSON.stringify({
        success: true,
        payment: paymentData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error creating NOWPayment:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
