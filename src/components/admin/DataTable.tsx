
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface FormSubmission {
  id: string;
  type: 'Knightsbridge' | 'Decentralized';
  submissionDate: string;
  contactEmail: string;
  contactPhone: string;
  paymentAmount: number;
  status: 'Pending' | 'Completed' | 'Processing';
  documents?: any[];
  [key: string]: any;
}

interface DataTableProps {
  data: FormSubmission[];
  renderDocuments?: (submission: FormSubmission) => React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = ({ data, renderDocuments }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (!data.length) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No submissions found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border-primary">
        <thead className="bg-bg-secondary">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
              Documents
            </th>
          </tr>
        </thead>
        <tbody className="bg-bg-primary divide-y divide-border-primary">
          {data.map((submission) => (
            <React.Fragment key={submission.id}>
              <tr className="hover:bg-bg-secondary">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(submission.id)}
                    className="p-1"
                  >
                    {expandedRows.has(submission.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {submission.id.split('-')[0]}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    submission.type === 'Knightsbridge' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {submission.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {submission.submissionDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  <div>
                    <div>{submission.contactEmail}</div>
                    <div className="text-text-secondary">{submission.contactPhone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  ${submission.paymentAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    submission.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    submission.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                  {renderDocuments ? (
                    renderDocuments(submission)
                  ) : (
                    <span className="text-text-secondary">
                      {submission.documents?.length || 0} files
                    </span>
                  )}
                </td>
              </tr>
              {expandedRows.has(submission.id) && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 bg-bg-secondary">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-text-primary">Submission Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        {/* Basic Info */}
                        {submission.tokenName && (
                          <div>
                            <span className="font-medium text-text-primary">Token Name:</span>
                            <span className="ml-2 text-text-secondary">{submission.tokenName}</span>
                          </div>
                        )}
                        {submission.tokenTicker && (
                          <div>
                            <span className="font-medium text-text-primary">Token Ticker:</span>
                            <span className="ml-2 text-text-secondary">{submission.tokenTicker}</span>
                          </div>
                        )}
                        {submission.tokenChain && (
                          <div>
                            <span className="font-medium text-text-primary">Chain:</span>
                            <span className="ml-2 text-text-secondary">{submission.tokenChain}</span>
                          </div>
                        )}
                        
                        {/* KYC Info for Knightsbridge */}
                        {submission.type === 'Knightsbridge' && submission.kycFullName && (
                          <div>
                            <span className="font-medium text-text-primary">KYC Name:</span>
                            <span className="ml-2 text-text-secondary">{submission.kycFullName}</span>
                          </div>
                        )}
                        
                        {/* Services */}
                        {submission.featuresEnabled && (
                          <div>
                            <span className="font-medium text-text-primary">Features:</span>
                            <span className="ml-2 text-text-secondary">
                              {submission.features?.join(', ') || 'N/A'}
                            </span>
                          </div>
                        )}
                        
                        {submission.letterheadEnabled && (
                          <div>
                            <span className="font-medium text-text-primary">Letterhead:</span>
                            <span className="ml-2 text-text-secondary">Enabled</span>
                          </div>
                        )}
                        
                        {submission.whitePaperEnabled && (
                          <div>
                            <span className="font-medium text-text-primary">White Paper:</span>
                            <span className="ml-2 text-text-secondary">{submission.whitePaperPages} pages</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
