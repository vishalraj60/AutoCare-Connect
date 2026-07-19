import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  X,
  Clock,
  Tag,
  ArrowRight,
  Phone,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Calendar,
  Star,
} from 'lucide-react';
import { SERVICES_DATA, getServiceById } from '../../data/services';
import { Link } from 'react-router-dom';

/* ─── Severity colours ─────────────────────────────────────────── */
const SEVERITY = {
  critical: { bg: 'bg-red-50',    border: 'border-red-200',  text: 'text-red-700',   icon: AlertTriangle,  label: 'Critical' },
  high:     { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: AlertCircle,  label: 'High'     },
  medium:   { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: Info,         label: 'Medium'   },
  low:      { bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-700',   icon: Info,         label: 'Low'      },
};

/* ─── StarRating ───────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < count ? '#F59E0B' : 'none'}
          stroke={i < count ? 'none' : '#CBD5E1'}
        />
      ))}
    </span>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────── */
function Section({ title, children, className = '' }) {
  return (
    <div className={`mb-10 ${className}`}>
      <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 mb-5 flex items-center gap-2">
        <span className="inline-block w-4 h-0.5 bg-blue-500 rounded-full" />
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ─── FAQ Accordion Item ───────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? 'border-blue-200 shadow-sm shadow-blue-100' : 'border-slate-100'
      }`}
    >
      <button
        className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-800 leading-snug">{q}</span>
        <span className="shrink-0 mt-0.5 text-slate-400">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SERVICE DETAILS MODAL
══════════════════════════════════════════════════════════════════ */
export default function ServiceDetailsModal({ serviceId, isOpen, onClose, onServiceChange }) {
  const scrollRef = useRef(null);
  const prevScrollY = useRef(0);
  const service = serviceId ? getServiceById(serviceId) : null;

  /* ── Lock body scroll on open ─────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      prevScrollY.current = window.scrollY;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      window.scrollTo({ top: prevScrollY.current, behavior: 'instant' });
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  /* ── Reset inner scroll when service changes ──────────────────── */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [serviceId]);

  /* ── Escape key ───────────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );
  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* ── Backdrop click ───────────────────────────────────────────── */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen || !service) return null;

  const Icon = service.icon;
  const relatedServices = (service.related || [])
    .map((id) => SERVICES_DATA.find((s) => s.id === id))
    .filter(Boolean);

  return (
    /* ── Backdrop ───────────────────────────────────────────────── */
    <div
      className="modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
    >
      {/* ── Modal Shell ─────────────────────────────────────────── */}
      <div
        className="modal-enter relative flex flex-col bg-white rounded-[24px] shadow-2xl shadow-slate-900/30 overflow-hidden"
        style={{ width: '90vw', maxWidth: '1200px', height: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ══ STICKY HEADER ══════════════════════════════════════ */}
        <header
          className="shrink-0 z-10 border-b border-slate-100"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="px-8 py-5 flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm shadow-blue-200"
              style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}
            >
              <Icon size={26} className="text-white" />
            </div>

            {/* Title block */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                  {service.category}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{service.title}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-blue-500" />
                  {service.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Tag size={12} className="text-emerald-500" />
                  {service.priceRange}
                </span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/role-select"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md shadow-blue-300/40"
                style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}
                onClick={onClose}
              >
                Book Service <ArrowRight size={14} />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* ══ SCROLLABLE BODY ════════════════════════════════════ */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto scrollbar-thin px-8 py-8"
          style={{ scrollBehavior: 'smooth' }}
        >

          {/* ─ SECTION 1: Overview ─────────────────────────────── */}
          <Section title="Service Overview">
            <p className="text-slate-600 leading-[1.85] text-[15px]">{service.overview}</p>
          </Section>

          {/* ─ SECTION 2: What's Included ──────────────────────── */}
          <Section title="What's Included">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {service.included.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-blue-100 transition-shadow">
                      <ItemIcon size={15} className="text-blue-500" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ─ SECTION 3: Parts ────────────────────────────────── */}
          <Section title="Parts & Consumables">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.parts.map((part, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white text-xs font-black"
                    style={{ background: part.color }}
                  >
                    {part.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="font-bold text-sm text-slate-900 mb-1">{part.name}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{part.purpose}</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <Calendar size={10} />
                    Life: {part.life}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ─ SECTION 4: Benefits ─────────────────────────────── */}
          <Section title="Key Benefits">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.benefits.map((b, i) => {
                const BIcon = b.icon;
                return (
                  <div key={i} className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center mb-3">
                      <BIcon size={18} className="text-white" />
                    </div>
                    <p className="font-bold text-sm text-slate-900 mb-1">{b.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ─ SECTION 5: Warning Signs ────────────────────────── */}
          <Section title="Warning Signs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.warnings.map((w, i) => {
                const s = SEVERITY[w.severity] || SEVERITY.medium;
                const WIcon = s.icon;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border ${s.bg} ${s.border}`}>
                    <WIcon size={15} className={s.text} />
                    <p className={`text-xs font-semibold ${s.text} flex-1`}>{w.sign}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/60 ${s.text}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ─ SECTION 6: Interval ─────────────────────────────── */}
          <Section title="Recommended Interval">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1">By Distance</p>
                  <p className="text-2xl font-extrabold">{service.interval.km}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-[10px] font-bold uppercase tracking-wider mb-1">By Time</p>
                  <p className="text-2xl font-extrabold">{service.interval.months}</p>
                </div>
              </div>
              <p className="text-blue-100 text-xs leading-relaxed border-t border-blue-500/50 pt-4">
                {service.interval.note}
              </p>
            </div>
          </Section>

          {/* ─ SECTION 7: Process ──────────────────────────────── */}
          <Section title="Service Process">
            <div className="relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-slate-100" />
              <div className="flex flex-col gap-0">
                {service.process.map((step, i) => (
                  <div key={step.step} className="flex gap-5 pb-6 last:pb-0">
                    <div
                      className="relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-extrabold border-2 shadow-sm"
                      style={{
                        background: i === 0 ? 'linear-gradient(135deg,#2563EB,#1d4ed8)' : '#fff',
                        borderColor: i === 0 ? '#2563EB' : '#E2E8F0',
                        color: i === 0 ? '#fff' : '#94A3B8',
                      }}
                    >
                      {step.step}
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-sm text-slate-900 mb-1">{step.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─ SECTION 8: Supported Bikes ──────────────────────── */}
          <Section title="Supported Motorcycles">
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
              {service.bikes.map((bike, i) => (
                <div
                  key={i}
                  className="shrink-0 w-40 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-extrabold mb-3 mx-auto"
                    style={{ background: bike.color }}
                  >
                    {bike.initials}
                  </div>
                  <p className="font-bold text-xs text-slate-900 text-center leading-snug mb-1">{bike.name}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center">{bike.tag}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ─ SECTION 9: Pricing ──────────────────────────────── */}
          <Section title="Estimated Pricing">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.pricing.map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl border p-6 ${
                    tier.recommended
                      ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg shadow-blue-100'
                      : 'border-slate-100 bg-white shadow-sm'
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{tier.tier}</p>
                  <p className="text-3xl font-extrabold text-slate-900 mb-1">{tier.price}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{tier.note}</p>
                  <Link
                    to="/role-select"
                    onClick={onClose}
                    className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-all ${
                      tier.recommended
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
                        : 'border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    Select Plan
                  </Link>
                </div>
              ))}
            </div>
          </Section>

          {/* ─ SECTION 10: Reviews ─────────────────────────────── */}
          <Section title="Customer Reviews">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.reviews.map((r, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {r.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{r.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{r.vehicle}</p>
                    </div>
                  </div>
                  <Stars count={r.rating} />
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 italic">"{r.review}"</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ─ SECTION 11: FAQs ────────────────────────────────── */}
          <Section title="Frequently Asked Questions">
            <div className="flex flex-col gap-2">
              {service.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </Section>

          {/* ─ SECTION 12: Related Services ────────────────────── */}
          {relatedServices.length > 0 && (
            <Section title="Related Services">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedServices.map((rel) => {
                  const RelIcon = rel.icon;
                  return (
                    <button
                      key={rel.id}
                      onClick={() => onServiceChange(rel.id)}
                      className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all text-left group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <RelIcon size={20} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{rel.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{rel.priceRange}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors ml-auto shrink-0" />
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          <div className="h-6" />
        </div>

        {/* ══ STICKY FOOTER ══════════════════════════════════════ */}
        <footer className="shrink-0 border-t border-slate-100 bg-white px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-blue-500" />
                <span className="font-semibold text-slate-700">{service.duration}</span>
              </span>
              <span className="w-px h-4 bg-slate-200" />
              <span className="flex items-center gap-1.5">
                <Tag size={13} className="text-emerald-500" />
                <span className="font-semibold text-slate-700">{service.priceRange}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/role-select"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-all"
              >
                <Phone size={13} /> Contact Workshop
              </Link>
              <Link
                to="/role-select"
                onClick={onClose}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md shadow-blue-300/40"
                style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}
              >
                Book Service <ArrowRight size={14} />
              </Link>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
