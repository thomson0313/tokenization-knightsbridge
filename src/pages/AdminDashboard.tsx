
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
        issuerContactPerson: 'John Doe',
        issuerContactInfo: 'john.doe@techcorp.com',
        businessPlanType: 'Utility Token',
        businessPlanGuidelines: 'Technology and innovation platform',
        tokenName: 'TechCorpToken',
        tokenTicker: 'TCT',
        tokenChain: 'Ethereum',
        tokenDecimals: '18',
        targetPrice: '1.50',
        treasuryAddress: '0x1234...abcd',
        features: ['Multi-sig', 'Governance', 'Staking'],
        letterheadEnabled: true,
        raiseDocumentRegions: ['USA', 'Non USA'],
        raiseDocumentCompany: 'TechCorp Solutions',
        whitePaperPages: '30 Pages',
        websitePlanEnabled: true,
        exchangeListings: ['XT', 'LBank'],
        legalDocuments: ['Terms', 'Privacy Policy'],
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
        features: ['Liquidity Mining', 'Yield Farming'],
        letterheadEnabled: true,
        raiseDocumentRegions: ['Both'],
        raiseDocumentCompany: 'DeFi Innovations Ltd',
        whitePaperPages: '60 Pages',
        websitePlanEnabled: false,
        exchangeListings: ['XT'],
        legalDocuments: ['Terms'],
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
        issuerContactPerson: 'Maria Rodriguez',
        issuerContactInfo: 'maria@tokenventures.com',
        businessPlanType: 'Security Token',
        businessPlanGuidelines: 'Real estate tokenization platform',
        tokenName: 'SecureToken',
        tokenTicker: 'ST',
        tokenChain: 'Ethereum',
        tokenDecimals: '8',
        targetPrice: '100.00',
        treasuryAddress: '0x9abc...def0',
        features: ['KYC Integration', 'Compliance'],
        letterheadEnabled: true,
        raiseDocumentRegions: ['USA'],
        raiseDocumentCompany: 'SecureVentures LLC',
        whitePaperPages: '30 Pages',
        websitePlanEnabled: true,
        exchangeListings: ['None'],
        legalDocuments: ['Terms', 'Privacy Policy', 'Compliance'],
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
        features: ['DAO Governance', 'Cross-chain'],
        letterheadEnabled: false,
        raiseDocumentRegions: ['Non USA'],
        raiseDocumentCompany: 'Open Protocol Foundation',
        whitePaperPages: 'None',
        websitePlanEnabled: true,
        exchangeListings: ['LBank'],
        legalDocuments: ['Terms'],
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
        issuerContactPerson: 'Robert Chen',
        issuerContactInfo: 'robert@fintechsolutions.com',
        businessPlanType: 'Payment Token',
        businessPlanGuidelines: 'Digital payments and remittance platform',
        tokenName: 'PayToken',
        tokenTicker: 'PAY',
        tokenChain: 'Solana',
        tokenDecimals: '9',
        targetPrice: '0.50',
        treasuryAddress: 'Sol123...456abc',
        features: ['Fast Payments', 'Low Fees', 'Mobile Integration'],
        letterheadEnabled: true,
        raiseDocumentRegions: ['Both'],
        raiseDocumentCompany: 'FinTech Solutions Inc',
        whitePaperPages: '60 Pages',
        websitePlanEnabled: true,
        exchangeListings: ['XT', 'LBank'],
        legalDocuments: ['Terms', 'Privacy Policy'],
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
