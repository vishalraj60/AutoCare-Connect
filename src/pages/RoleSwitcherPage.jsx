import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import { LayoutDashboard, Car, Wrench, ArrowRight } from 'lucide-react';

const ROLE_OPTIONS = [
  {
    role: ROLES.ADMIN,
    title: 'Admin / Manager',
    subtitle: 'Full workshop overview, bookings, inventory alerts, and KPI dashboard.',
    icon: LayoutDashboard,
    color: 'from-primary to-primary/80',
    redirect: '/admin/dashboard',
  },
  {
    role: ROLES.CUSTOMER,
    title: 'Customer',
    subtitle: 'Track active service, manage vehicles, and view appointment history.',
    icon: Car,
    color: 'from-accent to-accent/80',
    redirect: '/customer/dashboard',
  },
  {
    role: ROLES.MECHANIC,
    title: 'Mechanic / Technician',
    subtitle: 'View assigned jobs, complete checklists, and update repair stages.',
    icon: Wrench,
    color: 'from-slate-700 to-slate-800',
    redirect: '/mechanic/jobs/AC-8829',
  },
];

export default function RoleSwitcherPage() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setRole(option.role);
    navigate(option.redirect);
  };

  return (
    <div className="min-h-screen bg-page-bg flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Car size={24} className="text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-text-primary leading-tight">BikeCare Connect</h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Enterprise Management</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">Choose your role</h2>
        <p className="text-text-secondary text-base max-w-md">
          Select a dashboard to explore. All three views share live mock data — changes in the Mechanic view instantly reflect in the Customer view.
        </p>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {ROLE_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.role}
              onClick={() => handleSelect(option)}
              className="group text-left bg-white rounded-2xl border border-border shadow-card hover:shadow-card-md transition-all duration-200 overflow-hidden hover:-translate-y-0.5"
            >
              {/* Colored top strip */}
              <div className={`bg-gradient-to-r ${option.color} p-6 flex items-center justify-center`}>
                <Icon size={40} className="text-white" />
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="text-base font-bold text-text-primary mb-1">{option.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">{option.subtitle}</p>
                <div className="flex items-center gap-1 text-accent text-sm font-semibold group-hover:gap-2 transition-all">
                  <span>Enter</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-10 text-xs text-text-secondary text-center">
        No authentication required — this is a demo environment.
      </p>
    </div>
  );
}
