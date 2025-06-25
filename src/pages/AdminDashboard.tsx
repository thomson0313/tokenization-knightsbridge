import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { DataTable } from '../components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Header } from '../components/Header';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../utils/supabase';

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
  
  // Token features
  wantMoreFeatures?: string[];
  features?: string[];
  featuresEnabled?: boolean;
  featuresGuidelines?: string;
  
  // Services with guidelines
  letterheadEnabled?: boolean;
  letterheadGuidelines?: string;
  
  raiseDocumentEnabled?: boolean;
  raiseDocumentRegions?: string[];
  raiseDocumentCompany?: string;
  raiseDocumentContactName?: string;
  raiseDocumentContactPerson?: string;
  raiseDocumentPosition?: string;
  raiseDocumentEmail?: string;
  raiseDocumentPhone?: string;
  raiseDocumentAddress?: string;
  raiseDocumentWebsite?: string;
  
  whitePaperEnabled?: boolean;
  whitePaperPages?: string;
  whitePaperGuidelines?: string;
  
  websitePlanEnabled?: boolean;
  websitePlanGuidelines?: string;
  
  exchangeListings?: string[];
  
  legalDocumentsEnabled?: boolean;
  legalDocuments?: string[];
  legalDocumentsPreferences?: string;
  
  paymentAmount: number;
  status: 'Pending' | 'Completed' | 'Processing';
  
  // Add uploaded documents
  uploadedDocuments?: Array<{
    id: string;
    fieldName: string;
    originalFilename: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
  }>;
}

interface AdminDashboardProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isDarkMode, onThemeToggle }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      // Fetch form submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (submissionsError) {
        throw submissionsError;
      }

      // Fetch uploaded documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('uploaded_documents')
        .select('*');

      if (documentsError) {
        console.warn('Error fetching documents:', documentsError);
      }

      // Fetch related data
      const { data: tokenFeaturesData } = await supabase
        .from('token_features')
        .select('submission_id, feature_name');

      const { data: raiseRegionsData } = await supabase
        .from('raise_document_regions')
        .select('submission_id, region');

      const { data: exchangeListingsData } = await supabase
        .from('exchange_listings')  
        .select('submission_id, exchange_name');

      const { data: legalDocumentsData } = await supabase
        .from('legal_documents')
        .select('submission_id, document_type');

      const { data: letterheadServicesData } = await supabase
        .from('letterhead_services')
        .select('submission_id, enabled, guidelines');

      const { data: raiseDocumentsData } = await supabase
        .from('raise_documents')
        .select('submission_id, company, contact_name, contact_person, position, email, phone, address, website');

      const { data: whitepapersData } = await supabase
        .from('whitepapers')
        .select('submission_id, pages, guidelines');

      const { data: websitePlansData } = await supabase
        .from('website_plans')
        .select('submission_id, enabled, guidelines');

      const { data: legalPreferencesData } = await supabase
        .from('legal_document_preferences')
        .select('submission_id, preferences');

      const toBool = (value: any): boolean => {
        if (value === null || value === undefined) return false;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'string') {
          const lower = value.toLowerCase();
          return lower === 'true' || lower === 'yes' || lower === '1';
        }
        if (typeof value === 'number') return value !== 0;
        return Boolean(value);
      };

      const transformedSubmissions = (submissionsData || []).map(submission => {
        const tokenFeatures = tokenFeaturesData?.filter(f => f.submission_id === submission.id).map(f => f.feature_name) || [];
        const raiseDocumentRegions = raiseRegionsData?.filter(r => r.submission_id === submission.id).map(r => r.region) || [];
        const exchangeListings = exchangeListingsData?.filter(e => e.submission_id === submission.id).map(e => e.exchange_name) || [];
        const legalDocuments = legalDocumentsData?.filter(d => d.submission_id === submission.id).map(d => d.document_type) || [];
        
        const letterheadService = letterheadServicesData?.find(l => l.submission_id === submission.id);
        const raiseDocumentService = raiseDocumentsData?.find(r => r.submission_id === submission.id);
        const whitepaperService = whitepapersData?.find(w => w.submission_id === submission.id);
        const websitePlanService = websitePlansData?.find(w => w.submission_id === submission.id);
        const legalDocumentPreferences = legalPreferencesData?.find(l => l.submission_id === submission.id);
        
        // Map uploaded documents for this submission
        const uploadedDocuments = documentsData?.filter(doc => doc.submission_id === submission.id).map(doc => ({
          id: doc.id,
          fieldName: doc.field_name,
          originalFilename: doc.original_filename,
          filePath: doc.file_path,
          fileSize: doc.file_size || 0,
          mimeType: doc.mime_type || 'application/octet-stream'
        })) || [];
        
        const featuresEnabled = tokenFeatures.length > 0;
        const letterheadEnabled = letterheadService ? toBool(letterheadService.enabled) : false;
        const raiseDocumentEnabled = raiseDocumentRegions.length > 0 || !!raiseDocumentService;
        const whitePaperEnabled = !!whitepaperService;
        const websitePlanEnabled = websitePlanService ? toBool(websitePlanService.enabled) : false;
        const legalDocumentsEnabled = legalDocuments.length > 0;
        
        return {
          id: submission.id,
          type: submission.type as 'Knightsbridge' | 'Decentralized',
          submissionDate: submission.submission_date?.split('T')[0] || '',
          contactEmail: submission.contact_email || '',
          contactPhone: submission.contact_phone || '',
          
          kycFullName: submission.kyc_full_name || undefined,
          kycIdNumber: submission.kyc_id_number || undefined,
          kycDateOfBirth: submission.kyc_date_of_birth || undefined,
          kycNationality: submission.kyc_nationality || undefined,
          kycAddress: submission.kyc_address || undefined,
          kycOccupation: submission.kyc_occupation || undefined,
          kycEmployer: submission.kyc_employer || undefined,
          kycIncomeSource: submission.kyc_income_source || undefined,
          kycNetWorth: submission.kyc_net_worth || undefined,
          kycInvestmentExperience: submission.kyc_investment_experience || undefined,
          kycRiskTolerance: submission.kyc_risk_tolerance || undefined,
          kycInvestmentObjectives: submission.kyc_investment_objectives || undefined,
          
          custodianName: submission.custodian_name || undefined,
          custodianContact: submission.custodian_contact || undefined,
          custodianRegistration: submission.custodian_registration || undefined,
          custodianAddress: submission.custodian_address || undefined,
          custodianServices: submission.custodian_services || undefined,
          
          issuerEntityName: submission.issuer_entity_name || undefined,
          issuerJurisdiction: submission.issuer_jurisdiction || undefined,
          issuerContactPerson: submission.issuer_contact_person || undefined,
          issuerContactInfo: submission.issuer_contact_info || undefined,
          issuerAddress: submission.issuer_address || undefined,
          issuerBusinessType: submission.issuer_business_type || undefined,
          issuerRegistrationNumber: submission.issuer_registration_number || undefined,
          
          businessPlanType: submission.business_plan_type || undefined,
          businessPlanGuidelines: submission.business_plan_guidelines || undefined,
          businessPlanExecutiveSummary: submission.business_plan_executive_summary || undefined,
          businessPlanMarketAnalysis: submission.business_plan_market_analysis || undefined,
          businessPlanFinancialProjections: submission.business_plan_financial_projections || undefined,
          
          tokenName: submission.token_name || undefined,
          tokenTicker: submission.token_ticker || undefined,
          tokenChain: submission.token_chain || undefined,
          tokenDecimals: submission.token_decimals || undefined,
          targetPrice: submission.target_price || undefined,
          treasuryAddress: submission.treasury_address || undefined,
          
          featuresEnabled,
          featuresGuidelines: undefined,
          wantMoreFeatures: tokenFeatures,
          features: tokenFeatures,
          
          letterheadEnabled,
          letterheadGuidelines: letterheadService?.guidelines || undefined,
          
          raiseDocumentEnabled,
          raiseDocumentRegions,
          raiseDocumentCompany: raiseDocumentService?.company || undefined,
          raiseDocumentContactName: raiseDocumentService?.contact_name || undefined,
          raiseDocumentContactPerson: raiseDocumentService?.contact_person || undefined,
          raiseDocumentPosition: raiseDocumentService?.position || undefined,
          raiseDocumentEmail: raiseDocumentService?.email || undefined,
          raiseDocumentPhone: raiseDocumentService?.phone || undefined,
          raiseDocumentAddress: raiseDocumentService?.address || undefined,
          raiseDocumentWebsite: raiseDocumentService?.website || undefined,
          
          whitePaperEnabled,
          whitePaperPages: whitepaperService?.pages || undefined,
          whitePaperGuidelines: whitepaperService?.guidelines || undefined,
          
          websitePlanEnabled,
          websitePlanGuidelines: websitePlanService?.guidelines || undefined,
          
          exchangeListings,
          
          legalDocumentsEnabled,
          legalDocuments,
          legalDocumentsPreferences: legalDocumentPreferences?.preferences || undefined,
          
          paymentAmount: submission.payment_amount || 0,
          status: submission.status as 'Pending' | 'Completed' | 'Processing' || 'Pending',
          
          // Add uploaded documents
          uploadedDocuments
        };
      });

      setSubmissions(transformedSubmissions);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const totalSubmissions = submissions.length;
  const knightsbridgeSubmissions = submissions.filter(s => s.type === 'Knightsbridge').length;
  const decentralizedSubmissions = submissions.filter(s => s.type === 'Decentralized').length;
  const totalRevenue = submissions.reduce((sum, s) => sum + s.paymentAmount, 0);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header isDarkMode={isDarkMode} onThemeToggle={onThemeToggle} />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-text-secondary">
              Manage and monitor form submissions from Knightsbridge and Decentralized processes
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-text-secondary">
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text-primary">
                  {totalSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-text-secondary">
                  Knightsbridge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {knightsbridgeSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-text-secondary">
                  Decentralized
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {decentralizedSubmissions}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-text-secondary">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text-primary">
                  ${totalRevenue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Form Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-text-secondary">Loading submissions...</div>
                </div>
              ) : (
                <DataTable data={submissions} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
