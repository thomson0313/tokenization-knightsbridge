
-- Create form_submissions table
CREATE TABLE form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('Knightsbridge', 'Decentralized')),
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information (both types)
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  
  -- KYC Information (Knightsbridge only)
  kyc_full_name TEXT,
  kyc_id_number TEXT,
  kyc_date_of_birth DATE,
  kyc_nationality TEXT,
  kyc_address TEXT,
  kyc_occupation TEXT,
  kyc_employer TEXT,
  kyc_income_source TEXT,
  kyc_net_worth TEXT,
  kyc_investment_experience TEXT,
  kyc_risk_tolerance TEXT,
  kyc_investment_objectives TEXT,
  
  -- Custodian Information (Knightsbridge only)
  custodian_name TEXT,
  custodian_contact TEXT,
  custodian_registration TEXT,
  custodian_address TEXT,
  custodian_services TEXT,
  
  -- Issuer Information (Knightsbridge only)
  issuer_entity_name TEXT,
  issuer_jurisdiction TEXT,
  issuer_contact_person TEXT,
  issuer_contact_info TEXT,
  issuer_address TEXT,
  issuer_business_type TEXT,
  issuer_registration_number TEXT,
  
  -- Business Plan (Knightsbridge only)
  business_plan_type TEXT,
  business_plan_guidelines TEXT,
  business_plan_executive_summary TEXT,
  business_plan_market_analysis TEXT,
  business_plan_financial_projections TEXT,
  
  -- Token Information (both types)
  token_name TEXT,
  token_ticker TEXT,
  token_chain TEXT,
  token_decimals TEXT,
  target_price TEXT,
  treasury_address TEXT,
  
  -- Services Information
  letterhead_enabled BOOLEAN DEFAULT FALSE,
  letterhead_guidelines TEXT,
  
  -- Raise Document Information
  raise_document_company TEXT,
  raise_document_contact_name TEXT,
  raise_document_contact_person TEXT,
  raise_document_position TEXT,
  raise_document_email TEXT,
  raise_document_phone TEXT,
  raise_document_address TEXT,
  raise_document_website TEXT,
  
  -- White Paper Information
  white_paper_pages TEXT,
  white_paper_guidelines TEXT,
  
  -- Website Plan Information
  website_plan_enabled BOOLEAN DEFAULT FALSE,
  website_plan_guidelines TEXT,
  
  -- Legal Documents Preferences
  legal_documents_preferences TEXT,
  
  -- Payment Information
  payment_amount DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Completed')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create token_features table for many-to-many relationship
CREATE TABLE token_features (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  feature_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create raise_document_regions table
CREATE TABLE raise_document_regions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  region TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create exchange_listings table
CREATE TABLE exchange_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  exchange_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create legal_documents table
CREATE TABLE legal_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE raise_document_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchange_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - you can restrict later)
CREATE POLICY "Allow all operations on form_submissions" ON form_submissions FOR ALL USING (true);
CREATE POLICY "Allow all operations on token_features" ON token_features FOR ALL USING (true);
CREATE POLICY "Allow all operations on raise_document_regions" ON raise_document_regions FOR ALL USING (true);
CREATE POLICY "Allow all operations on exchange_listings" ON exchange_listings FOR ALL USING (true);
CREATE POLICY "Allow all operations on legal_documents" ON legal_documents FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_form_submissions_type ON form_submissions(type);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_created_at ON form_submissions(created_at);
CREATE INDEX idx_token_features_submission_id ON token_features(submission_id);
CREATE INDEX idx_raise_document_regions_submission_id ON raise_document_regions(submission_id);
CREATE INDEX idx_exchange_listings_submission_id ON exchange_listings(submission_id);
CREATE INDEX idx_legal_documents_submission_id ON legal_documents(submission_id);
