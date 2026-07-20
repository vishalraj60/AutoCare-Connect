import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { JobProvider } from './context/JobContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import RoleSwitcherPage from './pages/RoleSwitcherPage';

// Auth Pages
import AdminLoginPage from './pages/auth/AdminLoginPage';
import MechanicLoginPage from './pages/auth/MechanicLoginPage';
import CustomerLoginPage from './pages/auth/CustomerLoginPage';
import CustomerRegisterPage from './pages/auth/CustomerRegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import { AdminVehicles, AdminBookings, AdminInventory, AdminReports, AdminProfile } from './pages/admin/AdminPlaceholders';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';
import { CustomerVehicles, CustomerBookings, CustomerInventory, CustomerReports, CustomerProfile } from './pages/customer/CustomerPlaceholders';

// Mechanic Pages
import JobDetail from './pages/mechanic/JobDetail';
import { MechanicDashboard, MechanicJobs, MechanicPerformance, MechanicInventory, MechanicSettings, MechanicProfile } from './pages/mechanic/MechanicPlaceholders';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <JobProvider>
            <Routes>
              {/* ── Public ─────────────────────────────────────── */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/role-select" element={<RoleSwitcherPage />} />

              {/* ── Auth ───────────────────────────────────────── */}
              <Route path="/login/admin"      element={<AdminLoginPage />} />
              <Route path="/login/mechanic"   element={<MechanicLoginPage />} />
              <Route path="/login/customer"   element={<CustomerLoginPage />} />
              <Route path="/customer/register" element={<CustomerRegisterPage />} />

              {/* ── Admin (protected) ──────────────────────────── */}
              <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/vehicles"  element={<ProtectedRoute requiredRole="admin"><AdminVehicles /></ProtectedRoute>} />
              <Route path="/admin/bookings"  element={<ProtectedRoute requiredRole="admin"><AdminBookings /></ProtectedRoute>} />
              <Route path="/admin/inventory" element={<ProtectedRoute requiredRole="admin"><AdminInventory /></ProtectedRoute>} />
              <Route path="/admin/reports"   element={<ProtectedRoute requiredRole="admin"><AdminReports /></ProtectedRoute>} />
              <Route path="/admin/profile"   element={<ProtectedRoute requiredRole="admin"><AdminProfile /></ProtectedRoute>} />

              {/* ── Customer (protected) ───────────────────────── */}
              <Route path="/customer/dashboard" element={<ProtectedRoute requiredRole="customer"><CustomerDashboard /></ProtectedRoute>} />
              <Route path="/customer/vehicles"  element={<ProtectedRoute requiredRole="customer"><CustomerVehicles /></ProtectedRoute>} />
              <Route path="/customer/bookings"  element={<ProtectedRoute requiredRole="customer"><CustomerBookings /></ProtectedRoute>} />
              <Route path="/customer/inventory" element={<ProtectedRoute requiredRole="customer"><CustomerInventory /></ProtectedRoute>} />
              <Route path="/customer/reports"   element={<ProtectedRoute requiredRole="customer"><CustomerReports /></ProtectedRoute>} />
              <Route path="/customer/profile"   element={<ProtectedRoute requiredRole="customer"><CustomerProfile /></ProtectedRoute>} />

              {/* ── Mechanic (protected) ───────────────────────── */}
              <Route path="/mechanic/dashboard"   element={<ProtectedRoute requiredRole="mechanic"><MechanicDashboard /></ProtectedRoute>} />
              <Route path="/mechanic/jobs"         element={<ProtectedRoute requiredRole="mechanic"><MechanicJobs /></ProtectedRoute>} />
              <Route path="/mechanic/jobs/:id"     element={<ProtectedRoute requiredRole="mechanic"><JobDetail /></ProtectedRoute>} />
              <Route path="/mechanic/performance"  element={<ProtectedRoute requiredRole="mechanic"><MechanicPerformance /></ProtectedRoute>} />
              <Route path="/mechanic/inventory"    element={<ProtectedRoute requiredRole="mechanic"><MechanicInventory /></ProtectedRoute>} />
              <Route path="/mechanic/settings"     element={<ProtectedRoute requiredRole="mechanic"><MechanicSettings /></ProtectedRoute>} />
              <Route path="/mechanic/profile"      element={<ProtectedRoute requiredRole="mechanic"><MechanicProfile /></ProtectedRoute>} />

              {/* ── Fallback ───────────────────────────────────── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </JobProvider>
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
