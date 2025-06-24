
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
  filePath?: string;
  documentId?: string;
}

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const uploadFile = async (file: File, fieldName: string, submissionId?: string): Promise<string | null> => {
    setUploading(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      // Generate unique file path
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${fieldName}_${timestamp}.${fileExtension}`;
      const filePath = submissionId 
        ? `${submissionId}/${fieldName}/${fileName}` 
        : `temp/${fieldName}/${fileName}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('form-documents')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('form-documents')
        .getPublicUrl(filePath);

      let documentId: string | undefined;

      // If we have a submission ID, store metadata in database
      if (submissionId) {
        const { data: docData, error: docError } = await supabase
          .from('uploaded_documents')
          .insert({
            submission_id: submissionId,
            field_name: fieldName,
            original_filename: file.name,
            file_path: filePath,
            file_size: file.size,
            mime_type: file.type
          })
          .select()
          .single();

        if (docError) {
          console.error('Failed to store document metadata:', docError);
        } else {
          documentId = docData.id;
        }
      }
      
      const uploadedFile: UploadedFile = {
        file,
        url: urlData.publicUrl,
        uploadedAt: new Date(),
        filePath,
        documentId
      };
      
      setUploadedFiles(prev => ({ ...prev, [fieldName]: uploadedFile }));
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const removeFile = async (fieldName: string) => {
    const file = uploadedFiles[fieldName];
    if (file) {
      try {
        // Remove from Supabase Storage
        if (file.filePath) {
          await supabase.storage
            .from('form-documents')
            .remove([file.filePath]);
        }

        // Remove from database if document ID exists
        if (file.documentId) {
          await supabase
            .from('uploaded_documents')
            .delete()
            .eq('id', file.documentId);
        }

        // Remove from local state
        setUploadedFiles(prev => {
          const newFiles = { ...prev };
          delete newFiles[fieldName];
          return newFiles;
        });
      } catch (error) {
        console.error('Failed to remove file:', error);
        toast({
          title: "Remove failed",
          description: "Failed to remove file. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getFile = (fieldName: string) => uploadedFiles[fieldName];
  const isUploading = (fieldName: string) => uploading[fieldName] || false;

  return {
    uploadFile,
    removeFile,
    getFile,
    isUploading,
    uploadedFiles
  };
};
