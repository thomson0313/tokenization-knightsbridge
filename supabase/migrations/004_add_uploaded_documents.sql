
-- Create uploaded_documents table
CREATE TABLE IF NOT EXISTS uploaded_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID NOT NULL REFERENCES form_submissions(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_uploaded_documents_submission_id ON uploaded_documents(submission_id);

-- Create storage bucket for documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the documents bucket
CREATE POLICY "Give users authenticated access to documents" ON storage.objects
FOR ALL USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
