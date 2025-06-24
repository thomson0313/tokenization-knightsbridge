
-- Create uploaded_documents table
CREATE TABLE uploaded_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  field_name TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE uploaded_documents ENABLE ROW LEVEL SECURITY;

-- Create policy for uploaded_documents
CREATE POLICY "Allow all operations on uploaded_documents" ON uploaded_documents FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_uploaded_documents_submission_id ON uploaded_documents(submission_id);
CREATE INDEX idx_uploaded_documents_field_name ON uploaded_documents(field_name);
CREATE INDEX idx_uploaded_documents_uploaded_at ON uploaded_documents(uploaded_at);
