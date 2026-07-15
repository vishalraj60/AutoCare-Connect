import React from 'react';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';

function PlaceholderPage({ title }) {
  return (
    <AppShell>
      <TopBar searchPlaceholder="Search..." showNewBooking={false} />
      <main className="flex-1 overflow-y-auto p-6 bg-page-bg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">{title}</h1>
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

export const CustomerVehicles  = () => <PlaceholderPage title="My Vehicles" />;
export const CustomerBookings  = () => <PlaceholderPage title="My Bookings" />;
export const CustomerInventory = () => <PlaceholderPage title="Parts & Inventory" />;
export const CustomerReports   = () => <PlaceholderPage title="Reports" />;
export const CustomerProfile   = () => <PlaceholderPage title="Profile" />;
