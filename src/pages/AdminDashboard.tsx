
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

      console.log('Raw submissions data from Supabase:', submissionsData);

      // Helper function to convert various boolean representations to actual boolean
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

      // Transform the data to match the frontend interface
      const transformedSubmissions = (submissionsData || []).map(submission => {
        console.log('=== Processing submission:', submission.id, 'Type:', submission.type, '===');
        console.log('Raw boolean fields from DB:', {
          features_enabled: submission.features_enabled,
          letterhead_enabled: submission.letterhead_enabled,
          raise_document_enabled: submission.raise_document_enabled,
          white_paper_enabled: submission.white_paper_enabled,
          website_plan_enabled: submission.website_plan_enabled,
          legal_documents_enabled: submission.legal_documents_enabled
        });
        
        // Extract related data arrays
        const tokenFeatures = submission.token_features?.map((f: any) => f.feature_name) || [];
        const raiseDocumentRegions = submission.raise_document_regions?.map((r: any) => r.region) || [];
        const exchangeListings = submission.exchange_listings?.map((e: any) => e.exchange_name) || [];
        const legalDocuments = submission.legal_documents?.map((d: any) => d.document_type) || [];
        
        console.log('Related data arrays:', {
          tokenFeatures,
          raiseDocumentRegions,
          exchangeListings,
          legalDocuments
        });

        console.log('Service-related fields from DB:', {
          features_guidelines: submission.features_guidelines,
          letterhead_guidelines: submission.letterhead_guidelines,
          white_paper_pages: submission.white_paper_pages,
          white_paper_guidelines: submission.white_paper_guidelines,
          website_plan_guidelines: submission.website_plan_guidelines,
          legal_documents_preferences: submission.legal_documents_preferences,
          raise_document_company: submission.raise_document_company,
          raise_document_contact_name: submission.raise_document_contact_name,
          raise_document_email: submission.raise_document_email
        });
        
        // Enhanced service detection logic - check for actual data presence OR boolean flags
        const featuresEnabled = toBool(submission.features_enabled) || tokenFeatures.length > 0 || !!submission.features_guidelines;
        const letterheadEnabled = toBool(submission.letterhead_enabled) || !!submission.letterhead_guidelines;
        const raiseDocumentEnabled = toBool(submission.raise_document_enabled) || raiseDocumentRegions.length > 0 || 
          !!submission.raise_document_company || !!submission.raise_document_contact_name || !!submission.raise_document_email;
        const whitePaperEnabled = toBool(submission.white_paper_enabled) || !!submission.white_paper_pages || !!submission.white_paper_guidelines;
        const websitePlanEnabled = toBool(submission.website_plan_enabled) || !!submission.website_plan_guidelines;
        const legalDocumentsEnabled = toBool(submission.legal_documents_enabled) || legalDocuments.length > 0 || !!submission.legal_documents_preferences;
        
        // Detailed logging for service enablement determination
        console.log('Final service enablement results:', {
          featuresEnabled: { 
            dbFlag: toBool(submission.features_enabled), 
            hasFeatures: tokenFeatures.length > 0, 
            hasGuidelines: !!submission.features_guidelines,
            finalResult: featuresEnabled 
          },
          letterheadEnabled: { 
            dbFlag: toBool(submission.letterhead_enabled), 
            hasGuidelines: !!submission.letterhead_guidelines, 
            finalResult: letterheadEnabled 
          },
          raiseDocumentEnabled: { 
            dbFlag: toBool(submission.raise_document_enabled), 
            hasRegions: raiseDocumentRegions.length > 0,
            hasCompany: !!submission.raise_document_company,
            hasContact: !!submission.raise_document_contact_name,
            hasEmail: !!submission.raise_document_email,
            finalResult: raiseDocumentEnabled 
          },
          whitePaperEnabled: { 
            dbFlag: toBool(submission.white_paper_enabled), 
            hasPages: !!submission.white_paper_pages,
            hasGuidelines: !!submission.white_paper_guidelines,
            finalResult: whitePaperEnabled 
          },
          websitePlanEnabled: { 
            dbFlag: toBool(submission.website_plan_enabled), 
            hasGuidelines: !!submission.website_plan_guidelines, 
            finalResult: websitePlanEnabled 
          },
          legalDocumentsEnabled: { 
            dbFlag: toBool(submission.legal_documents_enabled), 
            hasDocuments: legalDocuments.length > 0,
            hasPreferences: !!submission.legal_documents_preferences,
            finalResult: legalDocumentsEnabled 
          }
        });
        
        return {
          id: submission.id,
          type: submission.type as 'Knightsbridge' | 'Decentralized',
          submissionDate: submission.submission_date?.split('T')[0] || '',
          contactEmail: submission.contact_email || '',
          contactPhone: submission.contact_phone || '',
          
          // KYC fields (Knightsbridge only)
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
          
          // Custodian fields (Knightsbridge only)
          custodianName: submission.custodian_name || undefined,
          custodianContact: submission.custodian_contact || undefined,
          custodianRegistration: submission.custodian_registration || undefined,
          custodianAddress: submission.custodian_address || undefined,
          custodianServices: submission.custodian_services || undefined,
          
          // Issuer fields (Knightsbridge only)
          issuerEntityName: submission.issuer_entity_name || undefined,
          issuerJurisdiction: submission.issuer_jurisdiction || undefined,
          issuerContactPerson: submission.issuer_contact_person || undefined,
          issuerContactInfo: submission.issuer_contact_info || undefined,
          issuerAddress: submission.issuer_address || undefined,
          issuerBusinessType: submission.issuer_business_type || undefined,
          issuerRegistrationNumber: submission.issuer_registration_number || undefined,
          
          // Business plan fields (Knightsbridge only)
          businessPlanType: submission.business_plan_type || undefined,
          businessPlanGuidelines: submission.business_plan_guidelines || undefined,
          businessPlanExecutiveSummary: submission.business_plan_executive_summary || undefined,
          businessPlanMarketAnalysis: submission.business_plan_market_analysis || undefined,
          businessPlanFinancialProjections: submission.business_plan_financial_projections || undefined,
          
          // Token fields (both forms)
          tokenName: submission.token_name || undefined,
          tokenTicker: submission.token_ticker || undefined,
          tokenChain: submission.token_chain || undefined,
          tokenDecimals: submission.token_decimals || undefined,
          targetPrice: submission.target_price || undefined,
          treasuryAddress: submission.treasury_address || undefined,
          
          // Features and services - Using enhanced detection logic
          featuresEnabled,
          featuresGuidelines: submission.features_guidelines || undefined,
          wantMoreFeatures: tokenFeatures,
          features: tokenFeatures,
          
          letterheadEnabled,
          letterheadGuidelines: submission.letterhead_guidelines || undefined,
          
          raiseDocumentEnabled,
          raiseDocumentRegions,
          raiseDocumentCompany: submission.raise_document_company || undefined,
          raiseDocumentContactName: submission.raise_document_contact_name || undefined,
          raiseDocumentContactPerson: submission.raise_document_contact_person || undefined,
          raiseDocumentPosition: submission.raise_document_position || undefined,
          raiseDocumentEmail: submission.raise_document_email || undefined,
          raiseDocumentPhone: submission.raise_document_phone || undefined,
          raiseDocumentAddress: submission.raise_document_address || undefined,
          raiseDocumentWebsite: submission.raise_document_website || undefined,
          
          whitePaperEnabled,
          whitePaperPages: submission.white_paper_pages || undefined,
          whitePaperGuidelines: submission.white_paper_guidelines || undefined,
          
          websitePlanEnabled,
          websitePlanGuidelines: submission.website_plan_guidelines || undefined,
          
          exchangeListings,
          
          legalDocumentsEnabled,
          legalDocuments,
          legalDocumentsPreferences: submission.legal_documents_preferences || undefined,
          
          paymentAmount: submission.payment_amount || 0,
          status: submission.status as 'Pending' | 'Completed' | 'Processing' || 'Pending'
        };
      });

      console.log('Final transformed submissions:', transformedSubmissions);
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
