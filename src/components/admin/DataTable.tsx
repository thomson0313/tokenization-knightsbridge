
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

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
  
  // Token fields (both can have)
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

const SubmissionDetailDialog: React.FC<{ submission: FormSubmission }> = ({ submission }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submission Details - {submission.type}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Type:</strong></div>
              <div>{submission.type}</div>
              <div><strong>Date:</strong></div>
              <div>{submission.submissionDate}</div>
              <div><strong>Status:</strong></div>
              <div>{submission.status}</div>
              <div><strong>Payment:</strong></div>
              <div>${submission.paymentAmount}</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><strong>Email:</strong></div>
              <div>{submission.contactEmail}</div>
              <div><strong>Phone:</strong></div>
              <div>{submission.contactPhone}</div>
            </div>
          </div>

          {/* Token Information */}
          {(submission.tokenName || submission.tokenTicker) && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Token Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {submission.tokenName && (
                  <>
                    <div><strong>Token Name:</strong></div>
                    <div>{submission.tokenName}</div>
                  </>
                )}
                {submission.tokenTicker && (
                  <>
                    <div><strong>Ticker:</strong></div>
                    <div>{submission.tokenTicker}</div>
                  </>
                )}
                {submission.tokenChain && (
                  <>
                    <div><strong>Chain:</strong></div>
                    <div>{submission.tokenChain}</div>
                  </>
                )}
                {submission.tokenDecimals && (
                  <>
                    <div><strong>Decimals:</strong></div>
                    <div>{submission.tokenDecimals}</div>
                  </>
                )}
                {submission.targetPrice && (
                  <>
                    <div><strong>Target Price:</strong></div>
                    <div>${submission.targetPrice}</div>
                  </>
                )}
                {submission.treasuryAddress && (
                  <>
                    <div><strong>Treasury:</strong></div>
                    <div className="break-all">{submission.treasuryAddress}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* KYC Information (Knightsbridge only) */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">KYC Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {submission.kycFullName && (
                  <>
                    <div><strong>Full Name:</strong></div>
                    <div>{submission.kycFullName}</div>
                  </>
                )}
                {submission.kycIdNumber && (
                  <>
                    <div><strong>ID Number:</strong></div>
                    <div>{submission.kycIdNumber}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Custodian Information (Knightsbridge only) */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Custodian Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {submission.custodianName && (
                  <>
                    <div><strong>Name:</strong></div>
                    <div>{submission.custodianName}</div>
                  </>
                )}
                {submission.custodianContact && (
                  <>
                    <div><strong>Contact:</strong></div>
                    <div>{submission.custodianContact}</div>
                  </>
                )}
                {submission.custodianRegistration && (
                  <>
                    <div><strong>Registration:</strong></div>
                    <div>{submission.custodianRegistration}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Issuer Information (Knightsbridge only) */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Issuer Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {submission.issuerEntityName && (
                  <>
                    <div><strong>Entity Name:</strong></div>
                    <div>{submission.issuerEntityName}</div>
                  </>
                )}
                {submission.issuerJurisdiction && (
                  <>
                    <div><strong>Jurisdiction:</strong></div>
                    <div>{submission.issuerJurisdiction}</div>
                  </>
                )}
                {submission.issuerContactPerson && (
                  <>
                    <div><strong>Contact Person:</strong></div>
                    <div>{submission.issuerContactPerson}</div>
                  </>
                )}
                {submission.issuerContactInfo && (
                  <>
                    <div><strong>Contact Info:</strong></div>
                    <div>{submission.issuerContactInfo}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Business Plan (Knightsbridge only) */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Business Plan</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {submission.businessPlanType && (
                  <>
                    <div><strong>Type:</strong></div>
                    <div>{submission.businessPlanType}</div>
                  </>
                )}
                {submission.businessPlanGuidelines && (
                  <>
                    <div><strong>Guidelines:</strong></div>
                    <div>{submission.businessPlanGuidelines}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Features & Services */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-2">Features & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {submission.features && submission.features.length > 0 && (
                <div>
                  <strong>Features:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {submission.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <strong>Services:</strong>
                <ul className="list-disc list-inside mt-1">
                  {submission.letterheadEnabled && <li>Letterhead Service</li>}
                  {submission.websitePlanEnabled && <li>Website Plan</li>}
                  {submission.whitePaperPages && submission.whitePaperPages !== 'None' && (
                    <li>WhitePaper ({submission.whitePaperPages})</li>
                  )}
                </ul>
              </div>

              <div>
                <strong>Additional Info:</strong>
                <ul className="list-disc list-inside mt-1">
                  {submission.raiseDocumentRegions && submission.raiseDocumentRegions.length > 0 && (
                    <li>Raise Regions: {submission.raiseDocumentRegions.join(', ')}</li>
                  )}
                  {submission.raiseDocumentCompany && (
                    <li>Company: {submission.raiseDocumentCompany}</li>
                  )}
                  {submission.exchangeListings && submission.exchangeListings.length > 0 && (
                    <li>Exchanges: {submission.exchangeListings.join(', ')}</li>
                  )}
                  {submission.legalDocuments && submission.legalDocuments.length > 0 && (
                    <li>Legal Docs: {submission.legalDocuments.join(', ')}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
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

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="min-w-[100px]">Type</TableHead>
            <TableHead className="min-w-[120px]">Date</TableHead>
            <TableHead className="min-w-[200px]">Contact Email</TableHead>
            <TableHead className="min-w-[150px]">Contact Phone</TableHead>
            <TableHead className="min-w-[150px]">Token/Project</TableHead>
            <TableHead className="min-w-[120px]">Payment</TableHead>
            <TableHead className="min-w-[100px]">Status</TableHead>
            <TableHead className="min-w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No submissions found
              </TableCell>
            </TableRow>
          ) : (
            data.map((submission) => (
              <React.Fragment key={submission.id}>
                <TableRow className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(submission.id)}
                      className="p-0 h-6 w-6"
                    >
                      {expandedRows.has(submission.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
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
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{submission.tokenName || 'N/A'}</div>
                      {submission.tokenTicker && (
                        <div className="text-xs text-muted-foreground">
                          {submission.tokenTicker} • {submission.tokenChain}
                        </div>
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
                  <TableCell>
                    <SubmissionDetailDialog submission={submission} />
                  </TableCell>
                </TableRow>
                
                {expandedRows.has(submission.id) && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={9} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Token Details */}
                        {(submission.tokenName || submission.tokenTicker) && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-blue-700 border-b border-blue-200 pb-1">Token Information</h4>
                            <div className="text-xs space-y-1">
                              {submission.tokenDecimals && <div><strong>Decimals:</strong> {submission.tokenDecimals}</div>}
                              {submission.targetPrice && <div><strong>Target Price:</strong> ${submission.targetPrice}</div>}
                              {submission.treasuryAddress && (
                                <div><strong>Treasury:</strong> {submission.treasuryAddress.substring(0, 20)}...</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* KYC & Business Info (Knightsbridge) */}
                        {submission.type === 'Knightsbridge' && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-purple-700 border-b border-purple-200 pb-1">KYC & Business</h4>
                            <div className="text-xs space-y-1">
                              {submission.kycFullName && <div><strong>KYC:</strong> {submission.kycFullName}</div>}
                              {submission.kycIdNumber && <div><strong>ID:</strong> {submission.kycIdNumber}</div>}
                              {submission.businessPlanType && <div><strong>Plan Type:</strong> {submission.businessPlanType}</div>}
                              {submission.issuerEntityName && <div><strong>Issuer:</strong> {submission.issuerEntityName}</div>}
                              {submission.issuerJurisdiction && <div><strong>Jurisdiction:</strong> {submission.issuerJurisdiction}</div>}
                              {submission.custodianName && <div><strong>Custodian:</strong> {submission.custodianName}</div>}
                            </div>
                          </div>
                        )}

                        {/* Features Section */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-green-700 border-b border-green-200 pb-1">Token Features</h4>
                          <div className="text-xs space-y-1">
                            {submission.features && submission.features.length > 0 ? (
                              <>
                                <div><strong>Count:</strong> {submission.features.length} features</div>
                                <div className="max-h-20 overflow-y-auto">
                                  <ul className="list-disc list-inside space-y-0.5">
                                    {submission.features.map((feature, index) => (
                                      <li key={index} className="text-xs">{feature}</li>
                                    ))}
                                  </ul>
                                </div>
                              </>
                            ) : (
                              <div className="text-gray-500">No features selected</div>
                            )}
                          </div>
                        </div>

                        {/* Services Section */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-orange-700 border-b border-orange-200 pb-1">Additional Services</h4>
                          <div className="text-xs space-y-1">
                            <div><strong>Letterhead:</strong> {submission.letterheadEnabled ? '✓ Yes' : '✗ No'}</div>
                            <div><strong>Website Plan:</strong> {submission.websitePlanEnabled ? '✓ Yes' : '✗ No'}</div>
                            {submission.whitePaperPages && submission.whitePaperPages !== 'None' && (
                              <div><strong>WhitePaper:</strong> {submission.whitePaperPages}</div>
                            )}
                            {submission.raiseDocumentCompany && (
                              <div><strong>Raise Company:</strong> {submission.raiseDocumentCompany}</div>
                            )}
                          </div>
                        </div>

                        {/* Regions & Documents */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-red-700 border-b border-red-200 pb-1">Regions & Documents</h4>
                          <div className="text-xs space-y-1">
                            {submission.raiseDocumentRegions && submission.raiseDocumentRegions.length > 0 && (
                              <div><strong>Raise Regions:</strong> {submission.raiseDocumentRegions.join(', ')}</div>
                            )}
                            {submission.legalDocuments && submission.legalDocuments.length > 0 && (
                              <div>
                                <strong>Legal Docs:</strong>
                                <ul className="list-disc list-inside ml-2 mt-0.5">
                                  {submission.legalDocuments.map((doc, index) => (
                                    <li key={index} className="text-xs">{doc}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Exchange Listings */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-indigo-700 border-b border-indigo-200 pb-1">Exchange Listings</h4>
                          <div className="text-xs space-y-1">
                            {submission.exchangeListings && submission.exchangeListings.length > 0 ? (
                              <div>
                                <strong>Exchanges:</strong>
                                <ul className="list-disc list-inside ml-2 mt-0.5">
                                  {submission.exchangeListings.map((exchange, index) => (
                                    <li key={index} className="text-xs">{exchange}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <div className="text-gray-500">No exchanges selected</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
