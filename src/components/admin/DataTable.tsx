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
  kycDateOfBirth?: string;
  kycNationality?: string;
  kycAddress?: string;
  kycOccupation?: string;
  kycEmployer?: string;
  kycIncomeSource?: string;
  kycNetWorth?: string;
  kycInvestmentExperience?: string;
  kycRiskTolerance?: string;
  kycInvestmentObjectives?: string;
  
  custodianName?: string;
  custodianContact?: string;
  custodianRegistration?: string;
  custodianAddress?: string;
  custodianServices?: string;
  
  issuerEntityName?: string;
  issuerJurisdiction?: string;
  issuerContactPerson?: string;
  issuerContactInfo?: string;
  issuerAddress?: string;
  issuerBusinessType?: string;
  issuerRegistrationNumber?: string;
  
  businessPlanType?: string;
  businessPlanGuidelines?: string;
  businessPlanExecutiveSummary?: string;
  businessPlanMarketAnalysis?: string;
  businessPlanFinancialProjections?: string;
  
  // Token fields (both can have)
  tokenName?: string;
  tokenTicker?: string;
  tokenChain?: string;
  tokenDecimals?: string;
  targetPrice?: string;
  treasuryAddress?: string;
  
  // Features from "want more features" section
  wantMoreFeatures?: string[];
  
  // Services with guidelines
  letterheadEnabled?: boolean;
  letterheadGuidelines?: string;
  
  raiseDocumentRegions?: string[];
  raiseDocumentCompany?: string;
  raiseDocumentContactName?: string;
  raiseDocumentContactPerson?: string;
  raiseDocumentPosition?: string;
  raiseDocumentEmail?: string;
  raiseDocumentPhone?: string;
  raiseDocumentAddress?: string;
  raiseDocumentWebsite?: string;
  
  whitePaperPages?: string;
  whitePaperGuidelines?: string;
  
  websitePlanEnabled?: boolean;
  websitePlanGuidelines?: string;
  
  exchangeListings?: string[];
  
  legalDocuments?: string[];
  legalDocumentsPreferences?: string;
  
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

          {/* KYC Information (Knightsbridge only) - Expanded */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-semibold text-lg border-b pb-2">KYC Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {submission.kycFullName && (
                  <div><strong>Full Name:</strong> {submission.kycFullName}</div>
                )}
                {submission.kycIdNumber && (
                  <div><strong>ID Number:</strong> {submission.kycIdNumber}</div>
                )}
                {submission.kycDateOfBirth && (
                  <div><strong>Date of Birth:</strong> {submission.kycDateOfBirth}</div>
                )}
                {submission.kycNationality && (
                  <div><strong>Nationality:</strong> {submission.kycNationality}</div>
                )}
                {submission.kycAddress && (
                  <div><strong>Address:</strong> {submission.kycAddress}</div>
                )}
                {submission.kycOccupation && (
                  <div><strong>Occupation:</strong> {submission.kycOccupation}</div>
                )}
                {submission.kycEmployer && (
                  <div><strong>Employer:</strong> {submission.kycEmployer}</div>
                )}
                {submission.kycIncomeSource && (
                  <div><strong>Income Source:</strong> {submission.kycIncomeSource}</div>
                )}
                {submission.kycNetWorth && (
                  <div><strong>Net Worth:</strong> {submission.kycNetWorth}</div>
                )}
                {submission.kycInvestmentExperience && (
                  <div><strong>Investment Experience:</strong> {submission.kycInvestmentExperience}</div>
                )}
                {submission.kycRiskTolerance && (
                  <div><strong>Risk Tolerance:</strong> {submission.kycRiskTolerance}</div>
                )}
                {submission.kycInvestmentObjectives && (
                  <div><strong>Investment Objectives:</strong> {submission.kycInvestmentObjectives}</div>
                )}
              </div>
            </div>
          )}

          {/* Custodian Information (Knightsbridge only) - Expanded */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-semibold text-lg border-b pb-2">Custodian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {submission.custodianName && (
                  <div><strong>Name:</strong> {submission.custodianName}</div>
                )}
                {submission.custodianContact && (
                  <div><strong>Contact:</strong> {submission.custodianContact}</div>
                )}
                {submission.custodianRegistration && (
                  <div><strong>Registration:</strong> {submission.custodianRegistration}</div>
                )}
                {submission.custodianAddress && (
                  <div><strong>Address:</strong> {submission.custodianAddress}</div>
                )}
                {submission.custodianServices && (
                  <div><strong>Services:</strong> {submission.custodianServices}</div>
                )}
              </div>
            </div>
          )}

          {/* Issuer Information (Knightsbridge only) - Expanded */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-semibold text-lg border-b pb-2">Issuer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {submission.issuerEntityName && (
                  <div><strong>Entity Name:</strong> {submission.issuerEntityName}</div>
                )}
                {submission.issuerJurisdiction && (
                  <div><strong>Jurisdiction:</strong> {submission.issuerJurisdiction}</div>
                )}
                {submission.issuerContactPerson && (
                  <div><strong>Contact Person:</strong> {submission.issuerContactPerson}</div>
                )}
                {submission.issuerContactInfo && (
                  <div><strong>Contact Info:</strong> {submission.issuerContactInfo}</div>
                )}
                {submission.issuerAddress && (
                  <div><strong>Address:</strong> {submission.issuerAddress}</div>
                )}
                {submission.issuerBusinessType && (
                  <div><strong>Business Type:</strong> {submission.issuerBusinessType}</div>
                )}
                {submission.issuerRegistrationNumber && (
                  <div><strong>Registration Number:</strong> {submission.issuerRegistrationNumber}</div>
                )}
              </div>
            </div>
          )}

          {/* Business Plan (Knightsbridge only) - Expanded */}
          {submission.type === 'Knightsbridge' && (
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-semibold text-lg border-b pb-2">Business Plan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {submission.businessPlanType && (
                  <div><strong>Type:</strong> {submission.businessPlanType}</div>
                )}
                {submission.businessPlanGuidelines && (
                  <div><strong>Guidelines:</strong> {submission.businessPlanGuidelines}</div>
                )}
                {submission.businessPlanExecutiveSummary && (
                  <div><strong>Executive Summary:</strong> {submission.businessPlanExecutiveSummary}</div>
                )}
                {submission.businessPlanMarketAnalysis && (
                  <div><strong>Market Analysis:</strong> {submission.businessPlanMarketAnalysis}</div>
                )}
                {submission.businessPlanFinancialProjections && (
                  <div><strong>Financial Projections:</strong> {submission.businessPlanFinancialProjections}</div>
                )}
              </div>
            </div>
          )}

          {/* Services & Guidelines */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-2">Services & Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Letterhead Service:</strong> {submission.letterheadEnabled ? '✓ Yes' : '✗ No'}
                {submission.letterheadEnabled && submission.letterheadGuidelines && (
                  <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                    <strong>Guidelines:</strong> {submission.letterheadGuidelines}
                  </div>
                )}
              </div>
              
              <div>
                <strong>Website Plan:</strong> {submission.websitePlanEnabled ? '✓ Yes' : '✗ No'}
                {submission.websitePlanEnabled && submission.websitePlanGuidelines && (
                  <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                    <strong>Guidelines:</strong> {submission.websitePlanGuidelines}
                  </div>
                )}
              </div>
              
              <div>
                <strong>WhitePaper:</strong> {submission.whitePaperPages && submission.whitePaperPages !== 'None' ? submission.whitePaperPages : 'No'}
                {submission.whitePaperPages && submission.whitePaperPages !== 'None' && submission.whitePaperGuidelines && (
                  <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                    <strong>Guidelines:</strong> {submission.whitePaperGuidelines}
                  </div>
                )}
              </div>
              
              <div>
                <strong>Exchange Listings:</strong>
                {submission.exchangeListings && submission.exchangeListings.length > 0 ? (
                  <ul className="list-disc list-inside ml-2 mt-1">
                    {submission.exchangeListings.map((exchange, index) => (
                      <li key={index} className="text-xs">{exchange}</li>
                    ))}
                  </ul>
                ) : (
                  <span> No exchanges selected</span>
                )}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="font-semibold text-lg border-b pb-2">Documents</h3>
            
            {/* Raise Documents */}
            {submission.raiseDocumentRegions && submission.raiseDocumentRegions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-md mb-2">Raise Documents</h4>
                <div className="text-sm space-y-2">
                  <div><strong>Regions:</strong> {submission.raiseDocumentRegions.join(', ')}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {submission.raiseDocumentCompany && (
                      <div><strong>Company Name:</strong> {submission.raiseDocumentCompany}</div>
                    )}
                    {submission.raiseDocumentContactName && (
                      <div><strong>Contact Name:</strong> {submission.raiseDocumentContactName}</div>
                    )}
                    {submission.raiseDocumentContactPerson && (
                      <div><strong>Contact Person:</strong> {submission.raiseDocumentContactPerson}</div>
                    )}
                    {submission.raiseDocumentPosition && (
                      <div><strong>Position:</strong> {submission.raiseDocumentPosition}</div>
                    )}
                    {submission.raiseDocumentEmail && (
                      <div><strong>Email:</strong> {submission.raiseDocumentEmail}</div>
                    )}
                    {submission.raiseDocumentPhone && (
                      <div><strong>Phone:</strong> {submission.raiseDocumentPhone}</div>
                    )}
                    {submission.raiseDocumentAddress && (
                      <div><strong>Address:</strong> {submission.raiseDocumentAddress}</div>
                    )}
                    {submission.raiseDocumentWebsite && (
                      <div><strong>Website:</strong> {submission.raiseDocumentWebsite}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Legal Documents */}
            {submission.legalDocuments && submission.legalDocuments.length > 0 && (
              <div>
                <h4 className="font-medium text-md mb-2">Legal Documents</h4>
                <div className="text-sm space-y-2">
                  <div>
                    <strong>Selected Documents:</strong>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {submission.legalDocuments.map((doc, index) => (
                        <li key={index} className="text-xs">{doc}</li>
                      ))}
                    </ul>
                  </div>
                  {submission.legalDocumentsPreferences && (
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      <strong>Special Preferences:</strong> {submission.legalDocumentsPreferences}
                    </div>
                  )}
                </div>
              </div>
            )}
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

                        {/* KYC & Business Info (Knightsbridge) - Expanded */}
                        {submission.type === 'Knightsbridge' && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-purple-700 border-b border-purple-200 pb-1">KYC & Business</h4>
                            <div className="text-xs space-y-1">
                              {submission.kycFullName && <div><strong>KYC Name:</strong> {submission.kycFullName}</div>}
                              {submission.kycIdNumber && <div><strong>ID Number:</strong> {submission.kycIdNumber}</div>}
                              {submission.kycDateOfBirth && <div><strong>Date of Birth:</strong> {submission.kycDateOfBirth}</div>}
                              {submission.kycNationality && <div><strong>Nationality:</strong> {submission.kycNationality}</div>}
                              {submission.kycAddress && <div><strong>Address:</strong> {submission.kycAddress}</div>}
                              {submission.kycOccupation && <div><strong>Occupation:</strong> {submission.kycOccupation}</div>}
                              {submission.kycEmployer && <div><strong>Employer:</strong> {submission.kycEmployer}</div>}
                              {submission.kycIncomeSource && <div><strong>Income Source:</strong> {submission.kycIncomeSource}</div>}
                              {submission.kycNetWorth && <div><strong>Net Worth:</strong> {submission.kycNetWorth}</div>}
                              {submission.kycInvestmentExperience && <div><strong>Investment Experience:</strong> {submission.kycInvestmentExperience}</div>}
                              {submission.kycRiskTolerance && <div><strong>Risk Tolerance:</strong> {submission.kycRiskTolerance}</div>}
                              {submission.kycInvestmentObjectives && <div><strong>Investment Objectives:</strong> {submission.kycInvestmentObjectives}</div>}
                              {submission.businessPlanType && <div><strong>Business Plan Type:</strong> {submission.businessPlanType}</div>}
                              {submission.businessPlanGuidelines && <div><strong>Business Guidelines:</strong> {submission.businessPlanGuidelines}</div>}
                              {submission.businessPlanExecutiveSummary && <div><strong>Executive Summary:</strong> {submission.businessPlanExecutiveSummary}</div>}
                              {submission.businessPlanMarketAnalysis && <div><strong>Market Analysis:</strong> {submission.businessPlanMarketAnalysis}</div>}
                              {submission.businessPlanFinancialProjections && <div><strong>Financial Projections:</strong> {submission.businessPlanFinancialProjections}</div>}
                              {submission.issuerEntityName && <div><strong>Issuer Entity:</strong> {submission.issuerEntityName}</div>}
                              {submission.issuerJurisdiction && <div><strong>Jurisdiction:</strong> {submission.issuerJurisdiction}</div>}
                              {submission.issuerContactPerson && <div><strong>Issuer Contact:</strong> {submission.issuerContactPerson}</div>}
                              {submission.issuerContactInfo && <div><strong>Issuer Info:</strong> {submission.issuerContactInfo}</div>}
                              {submission.issuerAddress && <div><strong>Issuer Address:</strong> {submission.issuerAddress}</div>}
                              {submission.issuerBusinessType && <div><strong>Business Type:</strong> {submission.issuerBusinessType}</div>}
                              {submission.issuerRegistrationNumber && <div><strong>Registration Number:</strong> {submission.issuerRegistrationNumber}</div>}
                              {submission.custodianName && <div><strong>Custodian:</strong> {submission.custodianName}</div>}
                              {submission.custodianContact && <div><strong>Custodian Contact:</strong> {submission.custodianContact}</div>}
                              {submission.custodianRegistration && <div><strong>Custodian Registration:</strong> {submission.custodianRegistration}</div>}
                              {submission.custodianAddress && <div><strong>Custodian Address:</strong> {submission.custodianAddress}</div>}
                              {submission.custodianServices && <div><strong>Custodian Services:</strong> {submission.custodianServices}</div>}
                            </div>
                          </div>
                        )}

                        {/* Token Features Section */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-green-700 border-b border-green-200 pb-1">Token Features</h4>
                          <div className="text-xs space-y-1">
                            {submission.wantMoreFeatures && submission.wantMoreFeatures.length > 0 ? (
                              <>
                                {submission.wantMoreFeatures.map((feature, index) => (
                                  <div key={index}>{feature}</div>
                                ))}
                              </>
                            ) : (
                              <div className="text-gray-500">No additional features selected</div>
                            )}
                          </div>
                        </div>

                        {/* Additional Services Section */}
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-orange-700 border-b border-orange-200 pb-1">Additional Services</h4>
                          <div className="text-xs space-y-2">
                            <div>
                              <strong>Letterhead:</strong> {submission.letterheadEnabled ? '✓ Yes' : '✗ No'}
                              {submission.letterheadEnabled && submission.letterheadGuidelines && (
                                <div className="mt-1 text-gray-600">
                                  {submission.letterheadGuidelines}
                                </div>
                              )}
                            </div>
                            <div>
                              <strong>Website Plan:</strong> {submission.websitePlanEnabled ? '✓ Yes' : '✗ No'}
                              {submission.websitePlanEnabled && submission.websitePlanGuidelines && (
                                <div className="mt-1 text-gray-600">
                                  {submission.websitePlanGuidelines}
                                </div>
                              )}
                            </div>
                            <div>
                              <strong>WhitePaper:</strong> {submission.whitePaperPages && submission.whitePaperPages !== 'None' ? submission.whitePaperPages : 'No'}
                              {submission.whitePaperPages && submission.whitePaperPages !== 'None' && submission.whitePaperGuidelines && (
                                <div className="mt-1 text-gray-600">
                                  {submission.whitePaperGuidelines}
                                </div>
                              )}
                            </div>
                            <div>
                              <strong>Exchanges:</strong> {submission.exchangeListings && submission.exchangeListings.length > 0 ? submission.exchangeListings.join(', ') : 'None'}
                            </div>
                          </div>
                        </div>

                        {/* Documents Section */}
                        <div className="space-y-2 md:col-span-2">
                          <h4 className="font-semibold text-sm text-red-700 border-b border-red-200 pb-1">Documents</h4>
                          <div className="text-xs space-y-3">
                            {/* Raise Documents */}
                            {submission.raiseDocumentRegions && submission.raiseDocumentRegions.length > 0 && (
                              <div>
                                <div><strong>Raise Documents - Regions:</strong> {submission.raiseDocumentRegions.join(', ')}</div>
                                <div className="ml-2 mt-1 space-y-0.5">
                                  {submission.raiseDocumentCompany && <div><strong>Company Name:</strong> {submission.raiseDocumentCompany}</div>}
                                  {submission.raiseDocumentContactName && <div><strong>Contact Name:</strong> {submission.raiseDocumentContactName}</div>}
                                  {submission.raiseDocumentContactPerson && <div><strong>Contact Person:</strong> {submission.raiseDocumentContactPerson}</div>}
                                  {submission.raiseDocumentPosition && <div><strong>Position in Company:</strong> {submission.raiseDocumentPosition}</div>}
                                  {submission.raiseDocumentEmail && <div><strong>Email:</strong> {submission.raiseDocumentEmail}</div>}
                                  {submission.raiseDocumentPhone && <div><strong>Phone No.:</strong> {submission.raiseDocumentPhone}</div>}
                                  {submission.raiseDocumentAddress && <div><strong>Company Address:</strong> {submission.raiseDocumentAddress}</div>}
                                  {submission.raiseDocumentWebsite && <div><strong>Website URL:</strong> {submission.raiseDocumentWebsite}</div>}
                                </div>
                              </div>
                            )}
                            
                            {/* Legal Documents */}
                            {submission.legalDocuments && submission.legalDocuments.length > 0 && (
                              <div>
                                <div><strong>Legal Documents:</strong></div>
                                {submission.legalDocumentsPreferences && (
                                  <div className="mt-1 text-gray-600">
                                    {submission.legalDocumentsPreferences}
                                  </div>
                                )}
                                <div className="ml-2 mt-1 space-y-0.5">
                                  {submission.legalDocuments.map((doc, index) => (
                                    <div key={index}>{doc}</div>
                                  ))}
                                </div>
                              </div>
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
