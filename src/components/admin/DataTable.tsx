import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button';
import { FormSubmission } from '../../types';
import { Badge } from '../ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CheckCheck, Copy, Mail, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { DocumentsCell } from './DocumentsCell';

interface DataTableProps {
  data: FormSubmission[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDocumentDeleted = () => {
    setRefreshKey(prev => prev + 1);
    // Optionally refresh the parent data here
  };

  const columns = [
    {
      header: "Type",
      accessor: "type" as keyof FormSubmission,
      render: (submission: FormSubmission) => (
        <Badge variant={submission.type === 'Knightsbridge' ? 'default' : 'secondary'}>
          {submission.type}
        </Badge>
      ),
    },
    {
      header: "Submission Date",
      accessor: "submissionDate" as keyof FormSubmission,
    },
    {
      header: "Contact Email",
      accessor: "contactEmail" as keyof FormSubmission,
      render: (submission: FormSubmission) => (
        <a href={`mailto:${submission.contactEmail}`} className="hover:underline">
          {submission.contactEmail}
        </a>
      ),
    },
    {
      header: "Contact Phone",
      accessor: "contactPhone" as keyof FormSubmission,
      render: (submission: FormSubmission) => (
        <a href={`tel:${submission.contactPhone}`} className="hover:underline">
          {submission.contactPhone}
        </a>
      ),
    },
    {
      header: "Payment Amount",
      accessor: "paymentAmount" as keyof FormSubmission,
      render: (submission: FormSubmission) => `$${submission.paymentAmount.toLocaleString()}`,
    },
    {
      header: "Status",
      accessor: "status" as keyof FormSubmission,
      render: (submission: FormSubmission) => (
        <Badge
          variant={
            submission.status === 'Pending'
              ? 'outline'
              : submission.status === 'Processing'
                ? 'secondary'
                : 'success'
          }
        >
          {submission.status}
        </Badge>
      ),
    },
  ];

  // Add documents column to the existing columns array
  const allColumns = [
    ...columns,
    {
      header: "Documents",
      accessor: "documents" as keyof FormSubmission,
      render: (submission: FormSubmission) => (
        <DocumentsCell 
          documents={(submission as any).uploaded_documents || []}
          onDocumentDeleted={handleDocumentDeleted}
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {allColumns.map((column) => (
                <th key={String(column.accessor)} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((submission) => (
              <tr key={submission.id}>
                {allColumns.map((column) => (
                  <td key={String(column.accessor)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(submission) : String(submission[column.accessor] || '')}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSubmission(submission)}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSubmission && (
        <DetailedViewDialog
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

interface DetailedViewDialogProps {
  submission: FormSubmission;
  onClose: () => void;
}

const DetailedViewDialog: React.FC<DetailedViewDialogProps> = ({ submission, onClose }) => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} copied`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
              <CardDescription>
                Details for submission ID: {submission.id}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ScrollArea className="h-[450px] w-full pr-6">
                <div className="grid gap-4">
                  {Object.entries(submission).map(([key, value]) => {
                    if (key === 'id' || key === 'type' || key === 'submissionDate' || key === 'paymentAmount' || key === 'status' || key === 'uploaded_documents') {
                      return null;
                    }

                    let displayValue: string;
                    if (Array.isArray(value)) {
                      displayValue = value.join(', ') || 'N/A';
                    } else if (typeof value === 'boolean') {
                      displayValue = value ? 'Yes' : 'No';
                    }
                    else if (value === null || value === undefined) {
                      displayValue = 'N/A';
                    }
                    else {
                      displayValue = String(value);
                    }

                    return (
                      <div key={key} className="grid gap-1">
                        <div className="text-sm font-semibold text-gray-500">{key}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-gray-900">{displayValue}</div>
                          {key.includes('email') ? (
                            <a href={`mailto:${displayValue}`} className="hover:underline text-blue-600">
                              <Mail className="w-4 h-4 inline-block mr-1" />
                              Email
                            </a>
                          ) : key.includes('phone') ? (
                            <a href={`tel:${displayValue}`} className="hover:underline text-blue-600">
                              <Phone className="w-4 h-4 inline-block mr-1" />
                              Call
                            </a>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(displayValue, key)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          )}
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
            <div className="flex justify-end p-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
