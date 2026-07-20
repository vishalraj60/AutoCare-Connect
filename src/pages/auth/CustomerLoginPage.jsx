import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CustomerLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ emailOrPhone: '', password: '', remember: false });
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
    const result = login('customer', { emailOrPhone: form.emailOrPhone, password: form.password });
    setLoading(false);
    if (result.success) {
      navigate('/customer/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  const ACCENT = '#059669';
  const ACCENT_GLOW = 'rgba(5,150,105,0.4)';
  const ACCENT_FOCUS_RING = 'rgba(5,150,105,0.2)';

  return (
    <div style={{ minHeight: '100vh', background: '#060d1f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: 440, position: 'relative' }}>
        <button
          onClick={() => navigate('/role-select')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13, fontWeight: 600, marginBottom: 28, padding: 0, fontFamily: 'inherit' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={15} /> Back to Role Select
        </button>

        <div style={{ background: 'rgba(15,22,40,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '36px 36px 32px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          {/* Icon + Title */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #059669, #065f46)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, boxShadow: `0 0 30px ${ACCENT_GLOW}` }}>
              <User size={26} color="#fff" />
            </div>
            <h1 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.4px' }}>Customer Login</h1>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Welcome back! Sign in to your account</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#fca5a5', fontSize: 13, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email or Phone</label>
              <input
                name="emailOrPhone"
                type="text"
                value={form.emailOrPhone}
                onChange={handleChange}
                placeholder="you@email.com or 9876543210"
                required
                autoComplete="email"
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input name="remember" type="checkbox" checked={form.remember} onChange={handleChange} style={{ accentColor: ACCENT, width: 15, height: 15 }} />
                <span style={{ color: '#94a3b8', fontSize: 13 }}>Remember me</span>
              </label>
              <button type="button" style={{ background: 'none', border: 'none', color: '#34d399', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, padding: 0 }}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? `${ACCENT}80` : `linear-gradient(135deg, #059669, #047857)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'box-shadow 0.2s', fontFamily: 'inherit', boxShadow: loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}` }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = `0 6px 28px rgba(5,150,105,0.6)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}`; }}
            >
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>

          {/* Register link */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
              Don't have an account?{' '}
              <Link to="/customer/register" style={{ color: '#34d399', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
