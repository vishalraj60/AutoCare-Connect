import React from 'react';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import VehicleCard from '../../components/shared/VehicleCard';
import ActivityTimeline from '../../components/shared/ActivityTimeline';
import ProgressStepper from '../../components/shared/ProgressStepper';
import Card from '../../components/ui/Card';
import { customerStats, vehicles } from '../../data/vehicles';
import { activity } from '../../data/activity';
import { currentUser } from '../../data/customers';
import { useJob } from '../../context/JobContext';
import { Calendar, Car, FileText, ClipboardCheck } from 'lucide-react';

const ICON_MAP = {
  calendar: Calendar,
  car: Car,
  file: FileText,
};

const STAT_CARDS = [
  { label: 'NEXT APPOINTMENT', value: customerStats.nextAppointment, icon: Calendar },
  { label: 'REGISTERED VEHICLES', value: `${customerStats.registeredVehicles} Active`, icon: Car },
  { label: 'PENDING INVOICES', value: String(customerStats.pendingInvoices), icon: FileText },
];

export default function CustomerDashboard() {
  const { getJobByVehicleId } = useJob();

  // Get active job for BMW X5
  const activeJob = getJobByVehicleId('BMW-X5-2022');
  const activeVehicle = vehicles.find(v => v.id === 'BMW-X5-2022');

  // Customer stage labels for progress stepper
  const customerStages = [
    { id: 'intake',    label: 'Intake',     completed: true,  current: false },
    { id: 'inspection',label: 'Inspection', completed: true,  current: false },
    { id: 'service',   label: 'Service',    completed: true,  current: false },
    { id: 'quality',   label: 'Quality',    completed: false, current: true  },
    { id: 'ready',     label: 'Ready',      completed: false, current: false },
  ];

  return (
    <AppShell>
      <TopBar
        greeting={`Hello, ${currentUser.firstName} ${currentUser.name.split(' ')[1]}`}
        searchPlaceholder="Search vehicles, services..."
        user={currentUser}
        showNewBooking
        unreadCount={currentUser.unreadNotifications}
      />

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        {/* Hero Active Service Card */}
        {activeJob && activeVehicle && (
          <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-6 mb-5 flex items-center justify-between gap-4">
            {/* Left */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Car size={14} className="text-blue-300" />
                <span className="text-blue-200 text-xs font-semibold uppercase tracking-widest">Active Service</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {activeVehicle.year} {activeVehicle.make} {activeVehicle.model}
              </h2>
              <p className="text-blue-200 text-sm">License Plate: {activeVehicle.licensePlate}</p>
            </div>

            {/* Right: current stage nested card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[260px] flex-shrink-0">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Current Stage</p>
              <div className="flex items-center gap-2 mb-3">
                <ClipboardCheck size={18} className="text-white" />
                <h3 className="text-white text-lg font-bold">In Quality Check</h3>
              </div>
              <ProgressStepper stages={customerStages} variant="customer" />
            </div>
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {STAT_CARDS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-xl border border-border shadow-card p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-text-secondary" />
              </div>
              <div>
                <p className="stat-label mb-0.5">{label}</p>
                <p className="text-lg font-bold text-text-primary">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Two column: My Vehicles + Recent Activity */}
        <div className="grid grid-cols-5 gap-5">
          {/* My Vehicles — 3/5 */}
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-text-primary">My Vehicles</h2>
              <button className="text-sm text-accent font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>

          {/* Recent Activity — 2/5 */}
          <div className="col-span-2">
            <h2 className="text-lg font-bold text-text-primary mb-3">Recent Activity</h2>
            <ActivityTimeline items={activity} />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
