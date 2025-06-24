
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
  filePath?: string;
}

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const uploadFile = async (file: File, fieldName: string): Promise<string | null> => {
    setUploading(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `form-documents/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('form-documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('form-documents')
        .getPublicUrl(filePath);
      
      const uploadedFile: UploadedFile = {
        file,
        url: publicUrl,
        uploadedAt: new Date(),
        filePath
      };
      
      setUploadedFiles(prev => ({ ...prev, [fieldName]: uploadedFile }));
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      return publicUrl;
    } catch (error) {
      console.error('Upload failed:', error);
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
      // Remove from Supabase Storage if it was uploaded there
      if (file.filePath) {
        try {
          await supabase.storage
            .from('form-documents')
            .remove([file.filePath]);
        } catch (error) {
          console.error('Error removing file from storage:', error);
        }
      } else {
        // For locally created object URLs
        URL.revokeObjectURL(file.url);
      }
      
      setUploadedFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[fieldName];
        return newFiles;
      });
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
