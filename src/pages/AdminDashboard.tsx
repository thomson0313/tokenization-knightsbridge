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
      console.log('Fetching submissions from Supabase...');

      // Fetch all submissions with related data
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select(`
          *,
          token_features(feature_name),
          raise_document_regions(region),
          exchange_listings(exchange_name),
          legal_documents(document_type)
        `)
        .order('created_at', { ascending: false });

      if (submissionsError) {
        console.error('Supabase error:', submissionsError);
        throw submissionsError;
      }

      console.log('Raw submissions data:', submissionsData);

      // Transform the data to match the frontend interface
      const transformedSubmissions = (submissionsData || []).map(submission => ({
        id: submission.id,
        type: submission.type,
        submissionDate: submission.submission_date?.split('T')[0] || '',
        contactEmail: submission.contact_email,
        contactPhone: submission.contact_phone,
        
        // KYC fields
        kycFullName: submission.kyc_full_name,
        kycIdNumber: submission.kyc_id_number,
        kycDateOfBirth: submission.kyc_date_of_birth,
        kycNationality: submission.kyc_nationality,
        kycAddress: submission.kyc_address,
        kycOccupation: submission.kyc_occupation,
        kycEmployer: submission.kyc_employer,
        kycIncomeSource: submission.kyc_income_source,
        kycNetWorth: submission.kyc_net_worth,
        kycInvestmentExperience: submission.kyc_investment_experience,
        kycRiskTolerance: submission.kyc_risk_tolerance,
        kycInvestmentObjectives: submission.kyc_investment_objectives,
        
        // Custodian fields
        custodianName: submission.custodian_name,
        custodianContact: submission.custodian_contact,
        custodianRegistration: submission.custodian_registration,
        custodianAddress: submission.custodian_address,
        custodianServices: submission.custodian_services,
        
        // Issuer fields
        issuerEntityName: submission.issuer_entity_name,
        issuerJurisdiction: submission.issuer_jurisdiction,
        issuerContactPerson: submission.issuer_contact_person,
        issuerContactInfo: submission.issuer_contact_info,
        issuerAddress: submission.issuer_address,
        issuerBusinessType: submission.issuer_business_type,
        issuerRegistrationNumber: submission.issuer_registration_number,
        
        // Business plan fields
        businessPlanType: submission.business_plan_type,
        businessPlanGuidelines: submission.business_plan_guidelines,
        businessPlanExecutiveSummary: submission.business_plan_executive_summary,
        businessPlanMarketAnalysis: submission.business_plan_market_analysis,
        businessPlanFinancialProjections: submission.business_plan_financial_projections,
        
        // Token fields
        tokenName: submission.token_name,
        tokenTicker: submission.token_ticker,
        tokenChain: submission.token_chain,
        tokenDecimals: submission.token_decimals,
        targetPrice: submission.target_price,
        treasuryAddress: submission.treasury_address,
        
        // Features and services
        wantMoreFeatures: submission.token_features?.map((f: any) => f.feature_name) || [],
        features: submission.token_features?.map((f: any) => f.feature_name) || [],
        
        letterheadEnabled: submission.letterhead_enabled,
        letterheadGuidelines: submission.letterhead_guidelines,
        
        raiseDocumentRegions: submission.raise_document_regions?.map((r: any) => r.region) || [],
        raiseDocumentCompany: submission.raise_document_company,
        raiseDocumentContactName: submission.raise_document_contact_name,
        raiseDocumentContactPerson: submission.raise_document_contact_person,
        raiseDocumentPosition: submission.raise_document_position,
        raiseDocumentEmail: submission.raise_document_email,
        raiseDocumentPhone: submission.raise_document_phone,
        raiseDocumentAddress: submission.raise_document_address,
        raiseDocumentWebsite: submission.raise_document_website,
        
        whitePaperPages: submission.white_paper_pages,
        whitePaperGuidelines: submission.white_paper_guidelines,
        
        websitePlanEnabled: submission.website_plan_enabled,
        websitePlanGuidelines: submission.website_plan_guidelines,
        
        exchangeListings: submission.exchange_listings?.map((e: any) => e.exchange_name) || [],
        
        legalDocuments: submission.legal_documents?.map((d: any) => d.document_type) || [],
        legalDocumentsPreferences: submission.legal_documents_preferences,
        
        paymentAmount: submission.payment_amount,
        status: submission.status
      }));

      console.log('Transformed submissions:', transformedSubmissions);
      setSubmissions(transformedSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
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
