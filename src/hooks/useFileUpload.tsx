
import { useState } from 'react';
import { useToast } from './use-toast';
import { supabase } from '../utils/supabase';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
  supabasePath?: string;
}

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const uploadFile = async (file: File, fieldName: string): Promise<string | null> => {
    setUploading(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      // Create object URL for immediate preview
      const url = URL.createObjectURL(file);
      
      const uploadedFile: UploadedFile = {
        file,
        url,
        uploadedAt: new Date()
      };
      
      setUploadedFiles(prev => ({ ...prev, [fieldName]: uploadedFile }));
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      return url;
    } catch (error) {
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

  const uploadToSupabase = async (submissionId: string): Promise<Record<string, string>> => {
    const supabaseUrls: Record<string, string> = {};
    
    for (const [fieldName, uploadedFile] of Object.entries(uploadedFiles)) {
      try {
        const fileExtension = uploadedFile.file.name.split('.').pop();
        const fileName = `${submissionId}/${fieldName}.${fileExtension}`;
        
        const { data, error } = await supabase.storage
          .from('documents')
          .upload(fileName, uploadedFile.file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.error(`Error uploading ${fieldName}:`, error);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from('documents')
          .getPublicUrl(fileName);

        supabaseUrls[fieldName] = urlData.publicUrl;
        
        // Update local file with Supabase path
        setUploadedFiles(prev => ({
          ...prev,
          [fieldName]: {
            ...prev[fieldName],
            supabasePath: fileName
          }
        }));
        
      } catch (error) {
        console.error(`Error uploading ${fieldName} to Supabase:`, error);
      }
    }
    
    return supabaseUrls;
  };

  const removeFile = (fieldName: string) => {
    const file = uploadedFiles[fieldName];
    if (file) {
      URL.revokeObjectURL(file.url);
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
    uploadToSupabase,
    removeFile,
    getFile,
    isUploading,
    uploadedFiles
  };
};
