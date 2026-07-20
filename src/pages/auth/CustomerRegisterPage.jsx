import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FIELDS = [
  { name: 'fullName',    label: 'Full Name',                type: 'text',     placeholder: 'John Doe',           autoComplete: 'name',         col: 'full' },
  { name: 'email',       label: 'Email',                    type: 'email',    placeholder: 'you@email.com',       autoComplete: 'email',        col: 'half' },
  { name: 'phone',       label: 'Phone Number',             type: 'tel',      placeholder: '9876543210',          autoComplete: 'tel',          col: 'half' },
  { name: 'password',    label: 'Password',                 type: 'password', placeholder: 'Create a password',   autoComplete: 'new-password', col: 'half', isPassword: true },
  { name: 'confirmPassword', label: 'Confirm Password',     type: 'password', placeholder: 'Repeat password',     autoComplete: 'new-password', col: 'half', isPassword: true },
  { name: 'bikeBrand',   label: 'Bike Brand',               type: 'text',     placeholder: 'e.g. Honda, Yamaha',  autoComplete: 'off',          col: 'half' },
  { name: 'bikeModel',   label: 'Bike Model',               type: 'text',     placeholder: 'e.g. CB300R',         autoComplete: 'off',          col: 'half' },
  { name: 'bikeRegNo',   label: 'Bike Registration Number', type: 'text',     placeholder: 'e.g. MH12AB1234',     autoComplete: 'off',          col: 'full' },
];

export default function CustomerRegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    bikeBrand: '', bikeModel: '', bikeRegNo: '',
  });
  const [showPass, setShowPass] = useState({ password: false, confirmPassword: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (error) setError('');
  };

  const toggleShow = (field) => setShowPass((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const result = register(form);
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

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#f1f5f9',
    fontSize: 13.5,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#060d1f', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Ambient */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: 560, position: 'relative' }}>
        <button
          onClick={() => navigate('/login/customer')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontSize: 13, fontWeight: 600, marginBottom: 24, padding: 0, fontFamily: 'inherit' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#94a3b8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
        >
          <ArrowLeft size={15} /> Back to Login
        </button>

        <div style={{ background: 'rgba(15,22,40,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '36px 36px 32px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28, textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #059669, #065f46)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, boxShadow: `0 0 28px ${ACCENT_GLOW}` }}>
              <UserPlus size={24} color="#fff" />
            </div>
            <h1 style={{ color: '#f1f5f9', fontSize: 21, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.4px' }}>Create Account</h1>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Register to manage your bike services</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 20, color: '#fca5a5', fontSize: 13, fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {FIELDS.map((field) => (
                <div key={field.name} style={{ gridColumn: field.col === 'full' ? '1 / -1' : 'span 1' }}>
                  <label style={{ display: 'block', color: '#94a3b8', fontSize: 11, fontWeight: 700, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{field.label}</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      name={field.name}
                      type={field.isPassword ? (showPass[field.name] ? 'text' : 'password') : field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      autoComplete={field.autoComplete}
                      style={{ ...inputStyle, paddingRight: field.isPassword ? 40 : 14 }}
                      onFocus={(e) => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT_FOCUS_RING}`; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                    {field.isPassword && (
                      <button type="button" onClick={() => toggleShow(field.name)} style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0, display: 'flex' }}>
                        {showPass[field.name] ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '12px', background: loading ? `${ACCENT}80` : `linear-gradient(135deg, #059669, #047857)`, border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 20, transition: 'box-shadow 0.2s', fontFamily: 'inherit', boxShadow: loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}` }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = `0 6px 28px rgba(5,150,105,0.6)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = loading ? 'none' : `0 4px 20px ${ACCENT_GLOW}`; }}
            >
              {loading ? 'Creating Account…' : 'Register'}
            </button>
          </form>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>
              Already have an account?{' '}
              <Link to="/login/customer" style={{ color: '#34d399', fontWeight: 700, textDecoration: 'none' }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
