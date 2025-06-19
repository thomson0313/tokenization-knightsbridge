import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { DataTable } from '../components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

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

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    // Comprehensive mock data for both submission types
    const mockSubmissions: FormSubmission[] = [
      {
        id: '1',
        type: 'Knightsbridge',
        submissionDate: '2024-01-15',
        contactEmail: 'john.doe@techcorp.com',
        contactPhone: '+1-555-0123',
        kycFullName: 'John Doe / TechCorp Inc',
        kycIdNumber: 'PASS123456',
        custodianName: 'BINANCE',
        custodianContact: '+1-555-0199',
        custodianRegistration: 'CUSTPASS001',
        issuerEntityName: 'TechCorp Solutions',
        issuerJurisdiction: 'Delaware',
        issuerContactPerson: '+1-555-0123',
        issuerContactInfo: 'john.doe@techcorp.com',
        businessPlanType: 'Utility Token',
        businessPlanGuidelines: 'Technology and innovation platform for enterprise solutions',
        tokenName: 'TechCorpToken',
        tokenTicker: 'TCT',
        tokenChain: 'Ethereum',
        tokenDecimals: '18',
        targetPrice: '1.50',
        treasuryAddress: '0x1234...abcd',
        wantMoreFeatures: ['Revoke ownership', 'Pausable', 'Fees', 'Verify Contract'],
        letterheadEnabled: true,
        letterheadGuidelines: 'Professional letterhead with company logo and blockchain integration details',
        raiseDocumentRegions: ['USA', 'Non USA'],
        raiseDocumentCompany: 'TechCorp Solutions',
        raiseDocumentContactName: 'John Doe',
        raiseDocumentContactPerson: 'John Doe',
        raiseDocumentPosition: 'CEO & Founder',
        raiseDocumentEmail: 'john.doe@techcorp.com',
        raiseDocumentPhone: '+1-555-0123',
        raiseDocumentAddress: '789 Business Blvd, Delaware, DE 19801',
        raiseDocumentWebsite: 'https://techcorp.com',
        whitePaperPages: '30 Pages',
        whitePaperGuidelines: 'Comprehensive technical whitepaper covering tokenomics and platform architecture',
        websitePlanEnabled: true,
        websitePlanGuidelines: 'Modern responsive website with token integration and user dashboard',
        exchangeListings: ['XT', 'LBank'],
        legalDocuments: ['Offering Memorandum', 'Smart Contract Legal Opinion', 'Token Purchase Agreement'],
        legalDocumentsPreferences: 'Focus on regulatory compliance and investor protection with detailed legal framework',
        paymentAmount: 15000,
        status: 'Completed'
      },
      {
        id: '2',
        type: 'Decentralized',
        submissionDate: '2024-01-14',
        contactEmail: 'alice@defiproject.com',
        contactPhone: '+1-555-0456',
        tokenName: 'DefiCoin',
        tokenTicker: 'DFC',
        tokenChain: 'Polygon',
        tokenDecimals: '18',
        targetPrice: '0.75',
        treasuryAddress: '0x5678...efgh',
        wantMoreFeatures: [], // Empty features to show optional case
        letterheadEnabled: true,
        letterheadGuidelines: 'Decentralized finance focused letterhead with DeFi branding elements',
        raiseDocumentRegions: [], // Empty to show optional case
        whitePaperPages: '60 Pages',
        whitePaperGuidelines: 'Detailed DeFi protocol explanation with yield farming mechanisms and liquidity strategies',
        websitePlanEnabled: false,
        exchangeListings: [], // Empty to show optional case
        legalDocuments: [], // Empty to show optional case
        paymentAmount: 8500,
        status: 'Processing'
      },
      {
        id: '3',
        type: 'Knightsbridge',
        submissionDate: '2024-01-13',
        contactEmail: 'secure@tokenventures.com',
        contactPhone: '+1-555-0789',
        kycFullName: 'Maria Rodriguez / SecureVentures LLC',
        kycIdNumber: 'PASS789012',
        custodianName: 'COINBASE',
        custodianContact: '+1-555-0888',
        custodianRegistration: 'CUSTPASS002',
        issuerEntityName: 'SecureVentures LLC',
        issuerJurisdiction: 'Nevada',
        issuerContactPerson: '+1-555-0789',
        issuerContactInfo: 'maria@tokenventures.com',
        businessPlanType: 'Security Token',
        businessPlanGuidelines: 'Real estate tokenization platform with fractional ownership',
        tokenName: 'SecureToken',
        tokenTicker: 'ST',
        tokenChain: 'Ethereum',
        tokenDecimals: '8',
        targetPrice: '100.00',
        treasuryAddress: '0x9abc...def0',
        wantMoreFeatures: ['Blacklist', 'Transaction Limits', 'Wallet Limits', 'Verify Contract'],
        letterheadEnabled: true,
        letterheadGuidelines: 'Security-focused letterhead with compliance and regulatory emphasis',
        raiseDocumentRegions: ['USA'],
        raiseDocumentCompany: 'SecureVentures LLC',
        raiseDocumentContactName: 'Maria Rodriguez',
        raiseDocumentContactPerson: 'Maria Rodriguez',
        raiseDocumentPosition: 'Managing Partner',
        raiseDocumentEmail: 'maria@tokenventures.com',
        raiseDocumentPhone: '+1-555-0789',
        raiseDocumentAddress: '456 Security Blvd, Miami, FL 33101',
        raiseDocumentWebsite: 'https://secureventures.com',
        whitePaperPages: '30 Pages',
        whitePaperGuidelines: 'Security token whitepaper with regulatory compliance focus and real estate backing details',
        websitePlanEnabled: true,
        websitePlanGuidelines: 'Professional website with investor portal and compliance documentation',
        exchangeListings: [], // Empty to show optional case
        legalDocuments: ['Security Token Offering', 'Non-disclosure Agreement', 'SADA', 'Mutual NDA'],
        legalDocumentsPreferences: 'Comprehensive legal framework for security token offering with full regulatory compliance',
        paymentAmount: 25000,
        status: 'Pending'
      },
      {
        id: '4',
        type: 'Decentralized',
        submissionDate: '2024-01-12',
        contactEmail: 'team@openprotocol.io',
        contactPhone: '+1-555-0321',
        tokenName: 'OpenToken',
        tokenTicker: 'OPEN',
        tokenChain: 'Binance Smart Chain',
        tokenDecimals: '18',
        targetPrice: '2.25',
        treasuryAddress: '0xdef0...1234',
        wantMoreFeatures: ['Superchain', 'Interoperability', 'Verify Contract'],
        letterheadEnabled: false,
        raiseDocumentRegions: ['Non USA'],
        raiseDocumentCompany: 'Open Protocol Foundation',
        raiseDocumentContactName: 'David Kim',
        raiseDocumentContactPerson: 'David Kim',
        raiseDocumentPosition: 'Protocol Lead',
        raiseDocumentEmail: 'david@openprotocol.io',
        raiseDocumentPhone: '+1-555-0321',
        raiseDocumentAddress: '987 Protocol Street, Singapore 018989',
        raiseDocumentWebsite: 'https://openprotocol.io',
        whitePaperPages: 'None',
        websitePlanEnabled: true,
        websitePlanGuidelines: 'Open-source focused website with developer documentation and community features',
        exchangeListings: ['LBank'],
        legalDocuments: ['All'],
        legalDocumentsPreferences: 'Complete legal package for international deployment with focus on decentralized governance',
        paymentAmount: 6500,
        status: 'Completed'
      },
      {
        id: '5',
        type: 'Knightsbridge',
        submissionDate: '2024-01-11',
        contactEmail: 'contact@fintechsolutions.com',
        contactPhone: '+1-555-0654',
        kycFullName: 'Robert Chen / FinTech Solutions Inc',
        kycIdNumber: 'PASS345678',
        custodianName: 'KRAKEN',
        custodianContact: '+1-555-0777',
        custodianRegistration: 'CUSTPASS003',
        issuerEntityName: 'FinTech Solutions Inc',
        issuerJurisdiction: 'California',
        issuerContactPerson: '+1-555-0654',
        issuerContactInfo: 'robert@fintechsolutions.com',
        businessPlanType: 'Payment Token',
        businessPlanGuidelines: 'Digital payments and remittance platform for cross-border transactions',
        tokenName: 'PayToken',
        tokenTicker: 'PAY',
        tokenChain: 'Solana',
        tokenDecimals: '9',
        targetPrice: '0.50',
        treasuryAddress: 'Sol123...456abc',
        wantMoreFeatures: [], // Empty features to show optional case
        letterheadEnabled: true,
        letterheadGuidelines: 'FinTech-focused letterhead with payment processing and blockchain technology emphasis',
        raiseDocumentRegions: ['Both'],
        raiseDocumentCompany: 'FinTech Solutions Inc',
        raiseDocumentContactName: 'Robert Chen',
        raiseDocumentContactPerson: 'Robert Chen',
        raiseDocumentPosition: 'CEO',
        raiseDocumentEmail: 'robert@fintechsolutions.com',
        raiseDocumentPhone: '+1-555-0654',
        raiseDocumentAddress: '789 Innovation Way, San Francisco, CA 94107',
        raiseDocumentWebsite: 'https://fintechsolutions.com',
        whitePaperPages: '60 Pages',
        whitePaperGuidelines: 'Comprehensive payment token whitepaper with technical specifications and market analysis',
        websitePlanEnabled: true,
        websitePlanGuidelines: 'Modern FinTech website with payment integration demos and enterprise solutions showcase',
        exchangeListings: ['XT', 'LBank'],
        legalDocuments: [], // Empty to show optional case
        paymentAmount: 18500,
        status: 'Processing'
      }
    ];
    
    setSubmissions(mockSubmissions);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const totalSubmissions = submissions.length;
  const knightsbridgeSubmissions = submissions.filter(s => s.type === 'Knightsbridge').length;
  const decentralizedSubmissions = submissions.filter(s => s.type === 'Decentralized').length;
  const totalRevenue = submissions.reduce((sum, s) => sum + s.paymentAmount, 0);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-bg-primary p-6">
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
            <DataTable data={submissions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
