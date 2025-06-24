
import { useState } from 'react';
import { useToast } from './use-toast';

interface UploadedFile {
  file: File;
  url: string;
  uploadedAt: Date;
}

export const useFileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const uploadFile = async (file: File, fieldName: string): Promise<string | null> => {
    setUploading(prev => ({ ...prev, [fieldName]: true }));
    
    try {
      // Create object URL for preview (in a real app, you'd upload to a server)
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
    removeFile,
    getFile,
    isUploading,
    uploadedFiles
  };
};
