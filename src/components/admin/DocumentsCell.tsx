
import React from 'react';
import { Download, Eye, File, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { supabase } from '../../utils/supabase';

interface Document {
  id: string;
  field_name: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

interface DocumentsCellProps {
  submissionId: string;
  documents: Document[];
  onDocumentDeleted: () => void;
}

export const DocumentsCell: React.FC<DocumentsCellProps> = ({ 
  submissionId, 
  documents, 
  onDocumentDeleted 
}) => {
  const { toast } = useToast();

  const handleDownload = async (document: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from('form-documents')
        .download(document.file_path);

      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.original_filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleView = async (document: Document) => {
    try {
      const { data } = supabase.storage
        .from('form-documents')
        .getPublicUrl(document.file_path);

      window.open(data.publicUrl, '_blank');
    } catch (error) {
      console.error('View error:', error);
      toast({
        title: "View failed",
        description: "Failed to open file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (document: Document) => {
    if (!confirm(`Are you sure you want to delete ${document.original_filename}?`)) {
      return;
    }

    try {
      // Delete from storage
      await supabase.storage
        .from('form-documents')
        .remove([document.file_path]);

      // Delete from database
      await supabase
        .from('uploaded_documents')
        .delete()
        .eq('id', document.id);

      toast({
        title: "File deleted",
        description: `${document.original_filename} has been deleted.`,
      });

      onDocumentDeleted();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="text-text-secondary text-sm">
        No documents
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-2 border rounded-lg bg-bg-secondary border-border-primary"
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <File className="w-4 h-4 text-text-secondary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-text-primary truncate">
                {doc.original_filename}
              </div>
              <div className="text-xs text-text-secondary">
                {doc.field_name} • {formatFileSize(doc.file_size)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleView(doc)}
              className="h-8 w-8 p-0"
            >
              <Eye className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownload(doc)}
              className="h-8 w-8 p-0"
            >
              <Download className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(doc)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
