
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
    const webhookData = await req.json()
    console.log('NOWPayments webhook received:', webhookData)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Map NOWPayments status to our status
    let paymentStatus = 'pending'
    if (webhookData.payment_status === 'finished' || webhookData.payment_status === 'confirmed') {
      paymentStatus = 'completed'
    } else if (webhookData.payment_status === 'expired' || webhookData.payment_status === 'failed') {
      paymentStatus = 'failed'
    } else if (webhookData.payment_status === 'refunded') {
      paymentStatus = 'refunded'
    }

    // Update form submission with payment status
    const { error } = await supabaseClient
      .from('form_submissions')
      .update({ 
        payment_status: paymentStatus,
        payment_id: webhookData.payment_id || webhookData.id,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', webhookData.order_id)

    if (error) {
      console.error('Error updating payment status:', error)
      throw error
    }

    console.log(`Payment status updated to: ${paymentStatus} for order: ${webhookData.order_id}`)

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
