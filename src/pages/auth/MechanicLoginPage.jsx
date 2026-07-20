import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Wrench, ArrowLeft, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function MechanicLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ username: '', password: '', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login('mechanic', { username: form.username, password: form.password });
    setLoading(false);
    if (result.success) {
      navigate('/mechanic/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  const ACCENT = '#D97706';
  const ACCENT_GLOW = 'rgba(217,119,6,0.4)';
  const ACCENT_SOFT = 'rgba(217,119,6,0.12)';
  const ACCENT_BORDER = 'rgba(217,119,6,0.25)';
  const ACCENT_FOCUS_RING = 'rgba(217,119,6,0.2)';

  return (
    <div style={{ minHeight: '100vh', background: '#060d1f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <button
          onClick={() => navigate('/role-select')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13, fontWeight: 600, marginBottom: 28, padding: 0, fontFamily: 'inherit', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={15} /> Back to Role Select
        </button>

        <div style={{ background: 'rgba(15,22,40,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '36px 36px 32px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #D97706, #92400e)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 0 30px ${ACCENT_GLOW}` }}>
              <Wrench size={26} color="#fff" />
            </div>
            <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.4px' }}>Mechanic Login</h1>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Sign in to manage your assigned jobs</p>
          </div>

          {/* Demo hint */}
          <div style={{ background: ACCENT_SOFT, border: `1px solid ${ACCENT_BORDER}`, borderRadius: 10, padding: '10px 14px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <Info size={14} color="#fbbf24" style={{ marginTop: 1, flexShrink: 0 }} />
            <p style={{ color: '#fde68a', fontSize: 12, margin: 0, lineHeight: 1.6 }}>
              <strong>Demo credentials:</strong> Username: <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>mech</code> &nbsp; Password: <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4 }}>m123</code>
            </p>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#fca5a5', fontSize: 13, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Username</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                autoComplete="username"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' }}
                onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT_FOCUS_RING}`; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 40px 11px 14px', color: '#f1f5f9', fontSize: 14, outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT_FOCUS_RING}`; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0, display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} style={{ accentColor: ACCENT, width: 15, height: 15 }} />
              <span style={{ color: '#94a3b8', fontSize: 13 }}>Remember me</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? `${ACCENT}80` : `linear-gradient(135deg, #D97706, #b45309)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'box-shadow 0.2s', fontFamily: 'inherit', boxShadow: loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}` }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = `0 6px 28px rgba(217,119,6,0.6)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}`; }}
            >
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
