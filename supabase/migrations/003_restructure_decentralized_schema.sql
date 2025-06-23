
-- Create additional tables for the restructured schema

-- Letterhead services table
CREATE TABLE IF NOT EXISTS letterhead_services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT false,
  guidelines TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Raise documents table (for detailed info)
CREATE TABLE IF NOT EXISTS raise_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  company TEXT,
  contact_name TEXT,
  contact_person TEXT,
  position TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Whitepapers table
CREATE TABLE IF NOT EXISTS whitepapers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  pages TEXT,
  guidelines TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Website plans table
CREATE TABLE IF NOT EXISTS website_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT false,
  guidelines TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Legal document preferences table
CREATE TABLE IF NOT EXISTS legal_document_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  preferences TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Remove unnecessary columns from form_submissions table for cleaner separation
ALTER TABLE form_submissions 
DROP COLUMN IF EXISTS letterhead_enabled,
DROP COLUMN IF EXISTS letterhead_guidelines,
DROP COLUMN IF EXISTS raise_document_company,
DROP COLUMN IF EXISTS raise_document_contact_name,
DROP COLUMN IF EXISTS raise_document_contact_person,
DROP COLUMN IF EXISTS raise_document_position,
DROP COLUMN IF EXISTS raise_document_email,
DROP COLUMN IF EXISTS raise_document_phone,
DROP COLUMN IF EXISTS raise_document_address,
DROP COLUMN IF EXISTS raise_document_website,
DROP COLUMN IF EXISTS white_paper_pages,
DROP COLUMN IF EXISTS white_paper_guidelines,
DROP COLUMN IF EXISTS website_plan_enabled,
DROP COLUMN IF EXISTS website_plan_guidelines,
DROP COLUMN IF EXISTS legal_documents_preferences;

-- Enable RLS on new tables
ALTER TABLE letterhead_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE raise_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitepapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_document_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for new tables (allow all operations for now)
CREATE POLICY "Allow all operations on letterhead_services" ON letterhead_services FOR ALL USING (true);
CREATE POLICY "Allow all operations on raise_documents" ON raise_documents FOR ALL USING (true);
CREATE POLICY "Allow all operations on whitepapers" ON whitepapers FOR ALL USING (true);
CREATE POLICY "Allow all operations on website_plans" ON website_plans FOR ALL USING (true);
CREATE POLICY "Allow all operations on legal_document_preferences" ON legal_document_preferences FOR ALL USING (true);
