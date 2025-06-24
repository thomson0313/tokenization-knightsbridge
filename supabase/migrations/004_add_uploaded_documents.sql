
-- Create uploaded_documents table to track file uploads
CREATE TABLE uploaded_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  field_name TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE uploaded_documents ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all documents (for admin)
CREATE POLICY "Allow authenticated users to read documents" ON uploaded_documents
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert documents
CREATE POLICY "Allow authenticated users to insert documents" ON uploaded_documents
  FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to delete documents
CREATE POLICY "Allow authenticated users to delete documents" ON uploaded_documents
  FOR DELETE TO authenticated USING (true);
