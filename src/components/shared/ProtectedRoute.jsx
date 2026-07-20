import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldX, ArrowRight } from 'lucide-react';

const ROLE_DASHBOARDS = {
  admin: '/admin/dashboard',
  mechanic: '/mechanic/dashboard',
  customer: '/customer/dashboard',
};

const ROLE_LOGIN = {
  admin: '/login/admin',
  mechanic: '/login/mechanic',
  customer: '/login/customer',
};

/**
 * ProtectedRoute
 *
 * @param {string} requiredRole - 'admin' | 'mechanic' | 'customer'
 * @param {ReactNode} children
 */
export default function ProtectedRoute({ requiredRole, children }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  // Not logged in at all → send to appropriate login page
  if (!isAuthenticated) {
    return <Navigate to={ROLE_LOGIN[requiredRole] || '/role-select'} state={{ from: location }} replace />;
  }

  // Logged in but wrong role → show Access Denied
  if (role !== requiredRole) {
    const ownDashboard = ROLE_DASHBOARDS[role];
    return <AccessDenied currentRole={role} ownDashboard={ownDashboard} requiredRole={requiredRole} />;
  }

  return children;
}

function AccessDenied({ currentRole, ownDashboard, requiredRole }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#060d1f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Ambient red glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div style={{ textAlign: 'center', maxWidth: 420, position: 'relative' }}>
        {/* Icon */}
        <div style={{ width: 72, height: 72, background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <ShieldX size={34} color="#f87171" />
        </div>

        <h1 style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.5px' }}>Access Denied</h1>
        <p style={{ color: '#64748b', fontSize: 15, lineHeight: 1.65, margin: '0 0 28px' }}>
          You're logged in as <strong style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{currentRole}</strong> and cannot access the{' '}
          <strong style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{requiredRole}</strong> area.
        </p>

        {ownDashboard && (
          <a
            href={ownDashboard}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #1D4ED8, #1e40af)',
              borderRadius: 10,
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(29,78,216,0.4)',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 28px rgba(29,78,216,0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(29,78,216,0.4)')}
          >
            Go to My Dashboard <ArrowRight size={16} />
          </a>
        )}
      </div>
    </div>
  );
}
