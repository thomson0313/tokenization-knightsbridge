
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('NOWPayments function called')
    
    const { amount, currency, orderId, orderDescription } = await req.json()
    console.log('Request data:', { amount, currency, orderId, orderDescription })
    
    const nowPaymentsApiKey = Deno.env.get('NOWPAYMENTS_API_KEY')
    console.log('API key exists:', !!nowPaymentsApiKey)
    
    if (!nowPaymentsApiKey) {
      console.error('NOWPayments API key not found in environment')
      throw new Error('NOWPayments API key not configured')
    }

    const requestBody = {
      price_amount: amount,
      price_currency: 'USD',
      pay_currency: currency, // BTC or USDTTRC20
      order_id: orderId,
      order_description: orderDescription,
      ipn_callback_url: `${req.headers.get('origin')}/api/nowpayments-webhook`,
      success_url: `${req.headers.get('origin')}/payment-success`,
      cancel_url: `${req.headers.get('origin')}/payment-cancelled`,
    }
    
    console.log('Making request to NOWPayments with:', requestBody)

    // Create payment with NOWPayments
    const paymentResponse = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': nowPaymentsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    console.log('NOWPayments response status:', paymentResponse.status)

    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.text()
      console.error('NOWPayments API error:', errorData)
      return new Response(
        JSON.stringify({
          success: false,
          error: `NOWPayments API error: ${paymentResponse.status} - ${errorData}`
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const paymentData = await paymentResponse.json()
    console.log('NOWPayments success:', paymentData)

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
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
