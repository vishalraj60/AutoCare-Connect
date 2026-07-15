import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Car, Calendar, Package, BarChart2,
  TrendingUp, Settings, User, LogOut, Wrench,
} from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const NAV_CONFIGS = {
  admin: [
    { label: 'Dashboard',   icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Vehicles',    icon: Car,             path: '/admin/vehicles' },
    { label: 'Bookings',    icon: Calendar,        path: '/admin/bookings' },
    { label: 'Inventory',   icon: Package,         path: '/admin/inventory' },
    { label: 'Reports',     icon: BarChart2,       path: '/admin/reports' },
  ],
  customer: [
    { label: 'Dashboard',   icon: LayoutDashboard, path: '/customer/dashboard' },
    { label: 'Vehicles',    icon: Car,             path: '/customer/vehicles' },
    { label: 'Bookings',    icon: Calendar,        path: '/customer/bookings' },
    { label: 'Inventory',   icon: Package,         path: '/customer/inventory' },
    { label: 'Reports',     icon: BarChart2,       path: '/customer/reports' },
  ],
  mechanic: [
    { label: 'Dashboard',   icon: LayoutDashboard, path: '/mechanic/dashboard' },
    { label: 'Jobs',        icon: Wrench,          path: '/mechanic/jobs' },
    { label: 'Performance', icon: TrendingUp,      path: '/mechanic/performance' },
    { label: 'Inventory',   icon: Package,         path: '/mechanic/inventory' },
    { label: 'Settings',    icon: Settings,        path: '/mechanic/settings' },
  ],
};

export default function Sidebar() {
  const { role, setRole } = useRole();
  const navigate = useNavigate();
  const navItems = NAV_CONFIGS[role] || NAV_CONFIGS.admin;

  const handleLogout = () => {
    setRole(null);
    navigate('/');
  };

  return (
    <aside className="w-56 flex-shrink-0 bg-sidebar h-full flex flex-col">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <Car size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight">AutoCare Connect</p>
            <p className="text-slate-400 text-[9px] font-semibold uppercase tracking-widest leading-tight mt-0.5">
              Enterprise Management
            </p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <NavLink
          to={`/${role}/profile`}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <User size={17} />
          <span>Profile</span>
        </NavLink>
        <button onClick={handleLogout} className="sidebar-link w-full text-left">
          <LogOut size={17} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
