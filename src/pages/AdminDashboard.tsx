import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { DataTable } from '../components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Header } from '../components/Header';
import { useToast } from '../hooks/use-toast';

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
      const response = await fetch('/functions/v1/get-submissions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch submissions');
      }

      setSubmissions(result.submissions);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch submissions",
        variant: "destructive",
      });
      console.error('Error fetching submissions:', error);
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
