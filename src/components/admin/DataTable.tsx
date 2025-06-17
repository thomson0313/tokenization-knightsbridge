
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface FormSubmission {
  id: string;
  type: 'Knightsbridge' | 'Decentralized';
  submissionDate: string;
  
  // Contact Information (both)
  contactEmail: string;
  contactPhone: string;
  
  // Knightsbridge specific fields
  kycFullName?: string;
  kycIdNumber?: string;
  custodianName?: string;
  custodianContact?: string;
  custodianRegistration?: string;
  issuerEntityName?: string;
  issuerJurisdiction?: string;
  issuerContactPerson?: string;
  issuerContactInfo?: string;
  businessPlanType?: string;
  businessPlanGuidelines?: string;
  
  // Decentralized specific fields (same as both can have)
  tokenName?: string;
  tokenTicker?: string;
  tokenChain?: string;
  tokenDecimals?: string;
  targetPrice?: string;
  treasuryAddress?: string;
  
  // Common optional services
  features?: string[];
  letterheadEnabled?: boolean;
  raiseDocumentRegions?: string[];
  raiseDocumentCompany?: string;
  whitePaperPages?: string;
  websitePlanEnabled?: boolean;
  exchangeListings?: string[];
  legalDocuments?: string[];
  
  paymentAmount: number;
  status: 'Pending' | 'Completed' | 'Processing';
}

interface DataTableProps {
  data: FormSubmission[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[120px]">Date</TableHead>
            <TableHead className="min-w-[200px]">Contact Email</TableHead>
            <TableHead className="min-w-[150px]">Contact Phone</TableHead>
            <TableHead className="min-w-[150px]">Token Name</TableHead>
            <TableHead className="min-w-[100px]">Ticker</TableHead>
            <TableHead className="min-w-[100px]">Chain</TableHead>
            <TableHead className="min-w-[150px]">KYC Name</TableHead>
            <TableHead className="min-w-[150px]">Custodian</TableHead>
            <TableHead className="min-w-[150px]">Issuer Entity</TableHead>
            <TableHead className="min-w-[150px]">Business Plan</TableHead>
            <TableHead className="min-w-[150px]">Features</TableHead>
            <TableHead className="min-w-[150px]">Services</TableHead>
            <TableHead className="min-w-[120px]">Payment</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={15} className="text-center py-8 text-muted-foreground">
                No submissions found
              </TableCell>
            </TableRow>
          ) : (
            data.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    submission.type === 'Knightsbridge' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {submission.type}
                  </span>
                </TableCell>
                <TableCell>{submission.submissionDate}</TableCell>
                <TableCell>{submission.contactEmail}</TableCell>
                <TableCell>{submission.contactPhone}</TableCell>
                <TableCell>{submission.tokenName || 'N/A'}</TableCell>
                <TableCell>{submission.tokenTicker || 'N/A'}</TableCell>
                <TableCell>{submission.tokenChain || 'N/A'}</TableCell>
                <TableCell>{submission.kycFullName || 'N/A'}</TableCell>
                <TableCell>{submission.custodianName || 'N/A'}</TableCell>
                <TableCell>{submission.issuerEntityName || 'N/A'}</TableCell>
                <TableCell>{submission.businessPlanType || 'N/A'}</TableCell>
                <TableCell>
                  {submission.features && submission.features.length > 0 
                    ? submission.features.join(', ') 
                    : 'N/A'
                  }
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {submission.letterheadEnabled && <div className="text-xs bg-gray-100 px-1 rounded">Letterhead</div>}
                    {submission.whitePaperPages && <div className="text-xs bg-gray-100 px-1 rounded">WhitePaper: {submission.whitePaperPages}</div>}
                    {submission.websitePlanEnabled && <div className="text-xs bg-gray-100 px-1 rounded">Website</div>}
                    {submission.exchangeListings && submission.exchangeListings.length > 0 && (
                      <div className="text-xs bg-gray-100 px-1 rounded">Exchange: {submission.exchangeListings.join(', ')}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>${submission.paymentAmount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    submission.status === 'Completed' 
                      ? 'bg-green-100 text-green-800'
                      : submission.status === 'Processing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
