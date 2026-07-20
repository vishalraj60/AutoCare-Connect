import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wrench, User, ArrowRight, ShieldCheck } from 'lucide-react';

const ROLES = [
  {
    id: 'admin',
    title: 'Admin',
    description: 'Manage workshops, bookings, mechanics, reports, and customers.',
    icon: LayoutDashboard,
    loginPath: '/login/admin',
    buttonLabel: 'Login as Admin',
    accent: '#1D4ED8',
    accentLight: 'rgba(29,78,216,0.12)',
    borderGlow: 'rgba(29,78,216,0.35)',
    gradientFrom: '#1D4ED8',
    gradientTo: '#1e3a8a',
    badgeLabel: 'Full Access',
  },
  {
    id: 'mechanic',
    title: 'Mechanic',
    description: 'View assigned jobs, update repair status, manage inspections.',
    icon: Wrench,
    loginPath: '/login/mechanic',
    buttonLabel: 'Login as Mechanic',
    accent: '#D97706',
    accentLight: 'rgba(217,119,6,0.12)',
    borderGlow: 'rgba(217,119,6,0.35)',
    gradientFrom: '#D97706',
    gradientTo: '#92400e',
    badgeLabel: 'Technician',
  },
  {
    id: 'customer',
    title: 'Customer',
    description: 'Book bike services, track repairs, manage vehicles and invoices.',
    icon: User,
    loginPath: '/login/customer',
    buttonLabel: 'Login as Customer',
    accent: '#059669',
    accentLight: 'rgba(5,150,105,0.12)',
    borderGlow: 'rgba(5,150,105,0.35)',
    gradientFrom: '#059669',
    gradientTo: '#065f46',
    badgeLabel: 'Self Service',
  },
];

export default function RoleSwitcherPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#060d1f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '45%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #1D4ED8, #2563EB)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(37,99,235,0.5)' }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0, letterSpacing: '-0.3px' }}>BikeCare Connect</p>
            <p style={{ color: '#64748b', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Enterprise Management</p>
          </div>
        </div>

        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.5px' }}>
          Select Your Role
        </h1>
        <p style={{ color: '#64748b', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
          Choose your portal to access the platform. Each role provides a tailored experience.
        </p>
      </div>

      {/* Role Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 20, width: '100%', maxWidth: 900 }}>
        {ROLES.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              style={{
                background: 'rgba(15,22,40,0.7)',
                border: `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 20,
                overflow: 'hidden',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                cursor: 'pointer',
                transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 60px ${role.borderGlow}, 0 0 0 1px ${role.borderGlow}`;
                e.currentTarget.style.borderColor = role.borderGlow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
              onClick={() => navigate(role.loginPath)}
            >
              {/* Top gradient strip with icon */}
              <div style={{ background: `linear-gradient(135deg, ${role.gradientFrom}, ${role.gradientTo})`, padding: '28px 28px 24px', position: 'relative', overflow: 'hidden' }}>
                {/* Background pattern */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: -30, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.15)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  <span style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 20 }}>
                    {role.badgeLabel}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px 24px 24px' }}>
                <h3 style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.3px' }}>{role.title}</h3>
                <p style={{ color: '#64748b', fontSize: 13.5, lineHeight: 1.65, margin: '0 0 22px' }}>{role.description}</p>

                {/* Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(role.loginPath); }}
                  style={{
                    width: '100%',
                    padding: '11px 16px',
                    background: role.accentLight,
                    border: `1.5px solid ${role.accent}`,
                    borderRadius: 10,
                    color: role.accent,
                    fontSize: 13.5,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = role.accent;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.boxShadow = `0 4px 20px ${role.borderGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = role.accentLight;
                    e.currentTarget.style.color = role.accent;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {role.buttonLabel}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p style={{ marginTop: 36, color: '#334155', fontSize: 12, textAlign: 'center' }}>
        Demo platform — credentials shown on each login page
      </p>
    </div>
  );
}
