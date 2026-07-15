import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import { JobProvider } from './context/JobContext';

// Pages
import RoleSwitcherPage from './pages/RoleSwitcherPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AdminVehicles, AdminBookings, AdminInventory, AdminReports, AdminProfile } from './pages/admin/AdminPlaceholders';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import { CustomerVehicles, CustomerBookings, CustomerInventory, CustomerReports, CustomerProfile } from './pages/customer/CustomerPlaceholders';
import JobDetail from './pages/mechanic/JobDetail';
import { MechanicDashboard, MechanicJobs, MechanicPerformance, MechanicInventory, MechanicSettings, MechanicProfile } from './pages/mechanic/MechanicPlaceholders';

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <JobProvider>
          <Routes>
            {/* Role Switcher */}
            <Route path="/" element={<RoleSwitcherPage />} />

            {/* Admin routes */}
            <Route path="/admin/dashboard"  element={<AdminDashboard />} />
            <Route path="/admin/vehicles"   element={<AdminVehicles />} />
            <Route path="/admin/bookings"   element={<AdminBookings />} />
            <Route path="/admin/inventory"  element={<AdminInventory />} />
            <Route path="/admin/reports"    element={<AdminReports />} />
            <Route path="/admin/profile"    element={<AdminProfile />} />

            {/* Customer routes */}
            <Route path="/customer/dashboard"  element={<CustomerDashboard />} />
            <Route path="/customer/vehicles"   element={<CustomerVehicles />} />
            <Route path="/customer/bookings"   element={<CustomerBookings />} />
            <Route path="/customer/inventory"  element={<CustomerInventory />} />
            <Route path="/customer/reports"    element={<CustomerReports />} />
            <Route path="/customer/profile"    element={<CustomerProfile />} />

            {/* Mechanic routes */}
            <Route path="/mechanic/dashboard"       element={<MechanicDashboard />} />
            <Route path="/mechanic/jobs"            element={<MechanicJobs />} />
            <Route path="/mechanic/jobs/:id"        element={<JobDetail />} />
            <Route path="/mechanic/performance"     element={<MechanicPerformance />} />
            <Route path="/mechanic/inventory"       element={<MechanicInventory />} />
            <Route path="/mechanic/settings"        element={<MechanicSettings />} />
            <Route path="/mechanic/profile"         element={<MechanicProfile />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </JobProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}
