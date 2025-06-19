
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { formData } = await req.json()

    // Insert main form submission
    const { data: submission, error: submissionError } = await supabaseClient
      .from('form_submissions')
      .insert(formData.main)
      .select()
      .single()

    if (submissionError) {
      throw submissionError
    }

    const submissionId = submission.id

    // Insert related data
    if (formData.tokenFeatures && formData.tokenFeatures.length > 0) {
      const tokenFeatures = formData.tokenFeatures.map((feature: string) => ({
        submission_id: submissionId,
        feature_name: feature
      }))
      
      const { error: featuresError } = await supabaseClient
        .from('token_features')
        .insert(tokenFeatures)
      
      if (featuresError) throw featuresError
    }

    if (formData.raiseDocumentRegions && formData.raiseDocumentRegions.length > 0) {
      const regions = formData.raiseDocumentRegions.map((region: string) => ({
        submission_id: submissionId,
        region: region
      }))
      
      const { error: regionsError } = await supabaseClient
        .from('raise_document_regions')
        .insert(regions)
      
      if (regionsError) throw regionsError
    }

    if (formData.exchangeListings && formData.exchangeListings.length > 0) {
      const exchanges = formData.exchangeListings.map((exchange: string) => ({
        submission_id: submissionId,
        exchange_name: exchange
      }))
      
      const { error: exchangesError } = await supabaseClient
        .from('exchange_listings')
        .insert(exchanges)
      
      if (exchangesError) throw exchangesError
    }

    if (formData.legalDocuments && formData.legalDocuments.length > 0) {
      const documents = formData.legalDocuments.map((doc: string) => ({
        submission_id: submissionId,
        document_type: doc
      }))
      
      const { error: documentsError } = await supabaseClient
        .from('legal_documents')
        .insert(documents)
      
      if (documentsError) throw documentsError
    }

    return new Response(
      JSON.stringify({ success: true, submissionId }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})
