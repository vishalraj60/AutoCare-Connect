import React from 'react';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import StatCard from '../../components/shared/StatCard';
import BayCard from '../../components/shared/BayCard';
import InventoryAlert from '../../components/shared/InventoryAlert';
import DataTable from '../../components/shared/DataTable';
import StatusPill from '../../components/ui/StatusPill';
import Avatar from '../../components/ui/Avatar';
import Card from '../../components/ui/Card';
import { adminStats, bookings } from '../../data/bookings';
import { bays } from '../../data/bays';
import { inventory } from '../../data/inventory';
import {
  Car, TrendingUp, AlertTriangle, Filter, MoreHorizontal, ChevronRight, ArrowUpRight,
} from 'lucide-react';

const ADMIN_USER = { name: 'Admin User', initials: 'AU', avatar: null };

const TABLE_COLUMNS = [
  {
    key: 'customer',
    label: 'Customer',
    render: (val) => (
      <div className="flex items-center gap-2.5">
        <Avatar initials={val.initials} color={val.color} size="sm" />
        <span className="font-medium text-text-primary">{val.name}</span>
      </div>
    ),
  },
  { key: 'vehicle',     label: 'Vehicle',       render: (val) => <span className="text-text-primary">{val}</span> },
  { key: 'serviceType', label: 'Service Type',   render: (val) => <span className="text-text-primary">{val}</span> },
  { key: 'time',        label: 'Time',           render: (val) => <span className="font-medium">{val}</span> },
  { key: 'mechanic',    label: 'Mechanic',       render: (val) => <span className="text-text-secondary">{val}</span> },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusPill status={val} />,
  },
  {
    key: 'id',
    label: 'Action',
    render: () => (
      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
        <ChevronRight size={16} className="text-text-secondary" />
      </button>
    ),
  },
];

export default function AdminDashboard() {
  return (
    <AppShell>
      <TopBar
        searchPlaceholder="Search orders, customers, or VIN..."
        user={ADMIN_USER}
        showNewBooking
        unreadCount={0}
      />

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        <h1 className="text-2xl font-bold text-text-primary mb-6">Overview</h1>

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard
            label="Total Revenue"
            value={adminStats.revenue.current}
            badge="↗ +12%"
            badgeColor="green"
            subLeft="vs last month"
            subRight={adminStats.revenue.previous}
          />
          <StatCard
            label="Active Bookings"
            value={String(adminStats.activeBookings.current)}
            badge="↗ +3"
            badgeColor="green"
            subLeft="Due today"
            subRight={String(adminStats.activeBookings.dueToday)}
            watermarkIcon={Car}
          />
          <StatCard
            label="Mechanic Utilization"
            value={`${adminStats.mechanicUtilization.percentage}%`}
            badge="→ Stable"
            badgeColor="green"
            progress={adminStats.mechanicUtilization.percentage}
            progressColor="blue"
            subLeft="Capacity"
            subRight={adminStats.mechanicUtilization.capacity}
          />
        </div>

        {/* Workshop + Inventory Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Live Workshop Status — 2/3 width */}
          <Card className="col-span-2" padding={false}>
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
              <h2 className="text-base font-bold text-text-primary">Live Workshop Status</h2>
              <button className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                View Floorplan <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 px-5 pb-5">
              {bays.map(bay => <BayCard key={bay.id} bay={bay} />)}
            </div>
          </Card>

          {/* Inventory Alerts — 1/3 width */}
          <Card padding={false}>
            <div className="flex items-center gap-2 px-5 pt-5 pb-4">
              <AlertTriangle size={16} className="text-warning" />
              <h2 className="text-base font-bold text-text-primary">Inventory Alerts</h2>
            </div>
            <div className="px-4 space-y-2 pb-4">
              {inventory.slice(0, 3).map(item => (
                <InventoryAlert key={item.id} item={item} />
              ))}
            </div>
            <div className="px-4 pb-5">
              <button className="w-full py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-slate-50 transition-colors">
                View All Inventory
              </button>
            </div>
          </Card>
        </div>

        {/* Upcoming Bookings */}
        <Card padding={false}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-text-primary">Upcoming Bookings</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                <Filter size={15} className="text-text-secondary" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
                <MoreHorizontal size={15} className="text-text-secondary" />
              </button>
            </div>
          </div>
          <DataTable columns={TABLE_COLUMNS} rows={bookings} />
        </Card>
      </main>
    </AppShell>
  );
}
