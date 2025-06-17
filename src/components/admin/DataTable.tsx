
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
  contactEmail: string;
  tokenName?: string;
  paymentAmount: number;
  status: 'Pending' | 'Completed' | 'Processing';
}

interface DataTableProps {
  data: FormSubmission[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Token Name</TableHead>
            <TableHead>Payment Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
                <TableCell>{submission.tokenName || 'N/A'}</TableCell>
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
