
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

    // Fetch all submissions with related data
    const { data: submissions, error: submissionsError } = await supabaseClient
      .from('form_submissions')
      .select(`
        *,
        token_features(feature_name),
        raise_document_regions(region),
        exchange_listings(exchange_name),
        legal_documents(document_type)
      `)
      .order('created_at', { ascending: false })

    if (submissionsError) {
      throw submissionsError
    }

    // Transform the data to match the frontend interface
    const transformedSubmissions = submissions.map(submission => ({
      id: submission.id,
      type: submission.type,
      submissionDate: submission.submission_date?.split('T')[0] || '',
      contactEmail: submission.contact_email,
      contactPhone: submission.contact_phone,
      
      // KYC fields
      kycFullName: submission.kyc_full_name,
      kycIdNumber: submission.kyc_id_number,
      kycDateOfBirth: submission.kyc_date_of_birth,
      kycNationality: submission.kyc_nationality,
      kycAddress: submission.kyc_address,
      kycOccupation: submission.kyc_occupation,
      kycEmployer: submission.kyc_employer,
      kycIncomeSource: submission.kyc_income_source,
      kycNetWorth: submission.kyc_net_worth,
      kycInvestmentExperience: submission.kyc_investment_experience,
      kycRiskTolerance: submission.kyc_risk_tolerance,
      kycInvestmentObjectives: submission.kyc_investment_objectives,
      
      // Custodian fields
      custodianName: submission.custodian_name,
      custodianContact: submission.custodian_contact,
      custodianRegistration: submission.custodian_registration,
      custodianAddress: submission.custodian_address,
      custodianServices: submission.custodian_services,
      
      // Issuer fields
      issuerEntityName: submission.issuer_entity_name,
      issuerJurisdiction: submission.issuer_jurisdiction,
      issuerContactPerson: submission.issuer_contact_person,
      issuerContactInfo: submission.issuer_contact_info,
      issuerAddress: submission.issuer_address,
      issuerBusinessType: submission.issuer_business_type,
      issuerRegistrationNumber: submission.issuer_registration_number,
      
      // Business plan fields
      businessPlanType: submission.business_plan_type,
      businessPlanGuidelines: submission.business_plan_guidelines,
      businessPlanExecutiveSummary: submission.business_plan_executive_summary,
      businessPlanMarketAnalysis: submission.business_plan_market_analysis,
      businessPlanFinancialProjections: submission.business_plan_financial_projections,
      
      // Token fields
      tokenName: submission.token_name,
      tokenTicker: submission.token_ticker,
      tokenChain: submission.token_chain,
      tokenDecimals: submission.token_decimals,
      targetPrice: submission.target_price,
      treasuryAddress: submission.treasury_address,
      
      // Features and services
      wantMoreFeatures: submission.token_features?.map((f: any) => f.feature_name) || [],
      features: submission.token_features?.map((f: any) => f.feature_name) || [],
      
      letterheadEnabled: submission.letterhead_enabled,
      letterheadGuidelines: submission.letterhead_guidelines,
      
      raiseDocumentRegions: submission.raise_document_regions?.map((r: any) => r.region) || [],
      raiseDocumentCompany: submission.raise_document_company,
      raiseDocumentContactName: submission.raise_document_contact_name,
      raiseDocumentContactPerson: submission.raise_document_contact_person,
      raiseDocumentPosition: submission.raise_document_position,
      raiseDocumentEmail: submission.raise_document_email,
      raiseDocumentPhone: submission.raise_document_phone,
      raiseDocumentAddress: submission.raise_document_address,
      raiseDocumentWebsite: submission.raise_document_website,
      
      whitePaperPages: submission.white_paper_pages,
      whitePaperGuidelines: submission.white_paper_guidelines,
      
      websitePlanEnabled: submission.website_plan_enabled,
      websitePlanGuidelines: submission.website_plan_guidelines,
      
      exchangeListings: submission.exchange_listings?.map((e: any) => e.exchange_name) || [],
      
      legalDocuments: submission.legal_documents?.map((d: any) => d.document_type) || [],
      legalDocumentsPreferences: submission.legal_documents_preferences,
      
      paymentAmount: submission.payment_amount,
      status: submission.status
    }))

    return new Response(
      JSON.stringify({ submissions: transformedSubmissions }),
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
