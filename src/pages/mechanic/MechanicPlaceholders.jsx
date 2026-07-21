import React from 'react';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

function PlaceholderPage({ title }) {
  return (
    <AppShell>
      <TopBar title={title} searchPlaceholder="Search..." showNewBooking={false} />
      <main className="flex-1 overflow-y-auto p-6 bg-page-bg">
        <Card className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-4xl mb-3">🚧</p>
            <p className="text-lg font-semibold text-text-primary mb-1">{title}</p>
            <p className="text-sm text-text-secondary">This page is coming soon.</p>
          </div>
        </Card>
      </main>
    </AppShell>
  );
}

export function MechanicDashboard() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <TopBar title="Mechanic Dashboard" searchPlaceholder="Search jobs..." showNewBooking={false} />
      <main className="flex-1 overflow-y-auto p-6 bg-page-bg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">My Jobs</h1>
        <Card className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-text-primary">Job #AC-8829</p>
              <p className="text-sm text-text-secondary">2022 Royal Enfield Classic 350 — In Service</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/mechanic/jobs/AC-8829')}>
              Open Job
            </Button>
          </div>
        </Card>
      </main>
    </AppShell>
  );
}

export function MechanicJobs() {
  const navigate = useNavigate();
  return (
    <AppShell>
      <TopBar title="Jobs" searchPlaceholder="Search jobs..." showNewBooking={false} />
      <main className="flex-1 overflow-y-auto p-6 bg-page-bg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Active Jobs</h1>
        <Card className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-text-primary">Job #AC-8829</p>
              <p className="text-sm text-text-secondary">2022 Royal Enfield Classic 350 — In Service · Bay 3</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/mechanic/jobs/AC-8829')}>
              View Details
            </Button>
          </div>
        </Card>
      </main>
    </AppShell>
  );
}

export const MechanicPerformance  = () => <PlaceholderPage title="My Performance" />;
export const MechanicInventory    = () => <PlaceholderPage title="Inventory" />;
export const MechanicSettings     = () => <PlaceholderPage title="Settings" />;
export const MechanicProfile      = () => <PlaceholderPage title="Profile" />;
