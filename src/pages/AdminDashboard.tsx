
import React, { useState, useEffect } from 'react';
import { AdminLogin } from '../components/admin/AdminLogin';
import { DataTable } from '../components/admin/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface FormSubmission {
  id: string;
  type: 'Knightsbridge' | 'Decentralized';
  submissionDate: string;
  contactEmail: string;
  tokenName?: string;
  paymentAmount: number;
  status: 'Pending' | 'Completed' | 'Processing';
}

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockSubmissions: FormSubmission[] = [
      {
        id: '1',
        type: 'Knightsbridge',
        submissionDate: '2024-01-15',
        contactEmail: 'user1@example.com',
        tokenName: 'KnightToken',
        paymentAmount: 5000,
        status: 'Completed'
      },
      {
        id: '2',
        type: 'Decentralized',
        submissionDate: '2024-01-14',
        contactEmail: 'user2@example.com',
        tokenName: 'DefiCoin',
        paymentAmount: 3000,
        status: 'Processing'
      },
      {
        id: '3',
        type: 'Knightsbridge',
        submissionDate: '2024-01-13',
        contactEmail: 'user3@example.com',
        tokenName: 'SecureToken',
        paymentAmount: 7500,
        status: 'Pending'
      },
      {
        id: '4',
        type: 'Decentralized',
        submissionDate: '2024-01-12',
        contactEmail: 'user4@example.com',
        tokenName: 'OpenToken',
        paymentAmount: 2500,
        status: 'Completed'
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
