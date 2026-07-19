import React, { useEffect, useRef, useCallback, useState } from 'react';
import {
  X,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Wrench,
  Package,
  Truck,
  Zap,
  CreditCard,
  Wifi,
  Car,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Navigation,
  ExternalLink,
  Send,
  CalendarDays,
  User,
  Bike,
} from 'lucide-react';
import { DEFAULT_WORKSHOP } from '../../data/workshop';

/* ─── WhatsApp SVG icon (not in lucide-react) ─────────────────── */
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* ─── Facility icon resolver ───────────────────────────────────── */
const FACILITY_ICON_MAP = {
  wrench: Wrench,
  package: Package,
  truck: Truck,
  zap: Zap,
  'credit-card': CreditCard,
  sofa: Car,
  wifi: Wifi,
  parking: Car,
};

/* ─── Inline social SVG icons ──────────────────────────────────── */
function FBIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function IGIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function YTIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function LIIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Social list ──────────────────────────────────────────────── */
const SOCIAL = [
  { key: 'facebook',  Icon: FBIcon, label: 'Facebook',  color: '#1877F2' },
  { key: 'instagram', Icon: IGIcon, label: 'Instagram', color: '#E4405F' },
  { key: 'youtube',   Icon: YTIcon, label: 'YouTube',   color: '#FF0000' },
  { key: 'twitter',   Icon: XIcon,  label: 'X',         color: '#000000' },
  { key: 'linkedin',  Icon: LIIcon, label: 'LinkedIn',  color: '#0A66C2' },
];

/* ─── FAQ Accordion ────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open ? 'border-blue-200' : 'border-slate-100'}`}>
      <button
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-800 leading-snug">{q}</span>
        <span className="shrink-0 mt-0.5 text-slate-400">
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 bg-white">
          <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Section label ────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 mb-4 flex items-center gap-2">
      <span className="inline-block w-3 h-0.5 bg-blue-500 rounded-full" />
      {children}
    </p>
  );
}

/* ─── Star display ─────────────────────────────────────────────── */
function StarRow({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
          stroke={i < Math.floor(rating) ? 'none' : '#CBD5E1'}
        />
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   CONTACT WORKSHOP MODAL
════════════════════════════════════════════════════════════════ */
export default function ContactWorkshopModal({ isOpen, onClose, workshop = DEFAULT_WORKSHOP }) {
  const scrollRef = useRef(null);

  /* ── Form state ───────────────────────────────────────────────── */
  const [form, setForm] = useState({
    name: '', phone: '', brand: '', model: '',
    service: '', date: '', time: '', message: '',
  });
  const updateForm = (k, v) => setForm(f => ({ ...f, [k]: v }));

  /* ── Escape key — closes ONLY this modal ─────────────────────── */
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  /* ── Backdrop click ───────────────────────────────────────────── */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const addr = workshop.address;
  const fullAddress = `${addr.line1}, ${addr.line2}, ${addr.line3} – ${addr.pincode}`;

  /* ── Contact action cards ─────────────────────────────────────── */
  const CONTACT_CARDS = [
    {
      id: 'call',
      icon: Phone,
      label: 'Call Workshop',
      value: workshop.phone,
      sub: 'Talk to a service advisor',
      color: 'from-blue-500 to-blue-600',
      href: `tel:${workshop.phone.replace(/\s/g, '')}`,
    },
    {
      id: 'whatsapp',
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: 'Chat with Advisor',
      sub: 'Instant replies, 9 AM – 7 PM',
      color: 'from-emerald-500 to-emerald-600',
      href: `https://wa.me/${workshop.whatsapp}`,
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Email',
      value: workshop.email,
      sub: 'Response within 2 hours',
      color: 'from-violet-500 to-violet-600',
      href: `mailto:${workshop.email}`,
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Live Chat',
      value: 'Start Conversation',
      sub: 'Instant AI-assisted chat',
      color: 'from-amber-500 to-orange-500',
      href: '#',
    },
  ];

  return (
    /* ── Nested backdrop — sits above ServiceDetailsModal ─────────── */
    <div
      className="contact-modal-backdrop fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 10000,
        backgroundColor: 'rgba(15,23,42,0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Workshop"
    >
      {/* ── Modal shell ──────────────────────────────────────────── */}
      <div
        className="contact-modal-enter relative flex flex-col bg-white rounded-[24px] shadow-2xl shadow-slate-900/40 overflow-hidden"
        style={{ width: '700px', maxWidth: '90vw', maxHeight: '90vh' }}
        onClick={e => e.stopPropagation()}
      >

        {/* ══ HEADER ═══════════════════════════════════════════════ */}
        <header
          className="shrink-0 border-b border-slate-100 px-7 py-5 flex items-start gap-4"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}
          >
            <Phone size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-extrabold text-slate-900 leading-tight">Contact Workshop</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-md">
              Get in touch with our service advisors for booking assistance, pricing, pickup &amp; drop, or technical support.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close contact modal"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all shrink-0"
          >
            <X size={16} />
          </button>
        </header>

        {/* ══ BODY ═════════════════════════════════════════════════ */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-7 py-6 space-y-8">

          {/* ─ WORKSHOP INFO CARD ──────────────────────────────── */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-100 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-extrabold text-base text-slate-900">{workshop.name}</p>
                  {workshop.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={9} /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">{workshop.subtitle}</p>
              </div>
              {/* Status badge */}
              <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shrink-0 ${
                workshop.status === 'open'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${workshop.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                {workshop.status === 'open' ? `Open · Closes ${workshop.closesAt}` : 'Closed Now'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Address */}
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin size={13} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 mb-0.5">Address</p>
                  <p className="leading-relaxed">{addr.line1}, {addr.line2}, {addr.line3}</p>
                </div>
              </div>
              {/* Hours */}
              <div className="flex items-start gap-2 text-slate-600">
                <Clock size={13} className="text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 mb-0.5">Hours</p>
                  {workshop.workingHours.map((h, i) => (
                    <p key={i} className="leading-snug">{h.days}: <span className="font-semibold">{h.hours}</span></p>
                  ))}
                </div>
              </div>
              {/* Rating + distance */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <StarRow rating={workshop.rating} />
                  <span className="font-bold text-slate-900">{workshop.rating}</span>
                  <span className="text-slate-400">({workshop.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Navigation size={11} className="text-blue-500" />
                  <span>{workshop.distance} from you</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─ CONTACT ACTION CARDS ────────────────────────────── */}
          <div>
            <SectionLabel>Contact Options</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CONTACT_CARDS.map((card) => {
                const CIcon = card.icon;
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    target={card.id !== 'call' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex flex-col items-center text-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-sm`}>
                      <CIcon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{card.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{card.value}</p>
                      <p className="text-[10px] text-slate-400 leading-snug">{card.sub}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* ─ QUICK BOOKING FORM ──────────────────────────────── */}
          <div>
            <SectionLabel>Book Appointment</SectionLabel>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Customer Name</label>
                  <div className="relative">
                    <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => updateForm('name', e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50"
                    />
                  </div>
                </div>
                {/* Phone */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => updateForm('phone', e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50"
                    />
                  </div>
                </div>
                {/* Brand */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Bike Brand</label>
                  <div className="relative">
                    <Bike size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={form.brand}
                      onChange={e => updateForm('brand', e.target.value)}
                      placeholder="e.g. KTM, Honda, Bajaj"
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50"
                    />
                  </div>
                </div>
                {/* Model */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Bike Model</label>
                  <div className="relative">
                    <Bike size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={form.model}
                      onChange={e => updateForm('model', e.target.value)}
                      placeholder="e.g. Duke 390, CBR 650R"
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50"
                    />
                  </div>
                </div>
                {/* Service */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Service Required</label>
                  <select
                    value={form.service}
                    onChange={e => updateForm('service', e.target.value)}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50 text-slate-700"
                  >
                    <option value="">Select a service</option>
                    <option>Engine Oil Service</option>
                    <option>Brake Service</option>
                    <option>Engine Diagnostics</option>
                    <option>Battery Check</option>
                    <option>Chain &amp; Wheel Service</option>
                    <option>Engine Tuning</option>
                    <option>General Service</option>
                  </select>
                </div>
                {/* Date */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Preferred Date</label>
                  <div className="relative">
                    <CalendarDays size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => updateForm('date', e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50"
                    />
                  </div>
                </div>
                {/* Time */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Preferred Time</label>
                  <div className="relative">
                    <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={form.time}
                      onChange={e => updateForm('time', e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50 text-slate-700"
                    >
                      <option value="">Select time slot</option>
                      {['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Message (Optional)</label>
                  <textarea
                    value={form.message}
                    onChange={e => updateForm('message', e.target.value)}
                    placeholder="Describe your issue or any special requirements..."
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-slate-50 resize-none"
                  />
                </div>
              </div>

              {/* Form buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
                  onClick={() => alert('Callback request sent!')}
                >
                  <Phone size={13} /> Request Callback
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md shadow-blue-300/40"
                  style={{ background: 'linear-gradient(135deg,#2563EB,#1d4ed8)' }}
                  onClick={() => alert('Booking submitted!')}
                >
                  <Send size={13} /> Book Service
                </button>
              </div>
            </div>
          </div>

          {/* ─ EMERGENCY SUPPORT ───────────────────────────────── */}
          <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl p-5 text-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm mb-0.5">Need urgent roadside assistance?</p>
                <p className="text-red-100 text-xs mb-3">Call our emergency support team — available 24×7</p>
                <a
                  href={`tel:${workshop.emergency}`}
                  className="inline-flex items-center gap-2 bg-white text-red-600 font-extrabold text-sm px-4 py-2 rounded-xl hover:bg-red-50 transition-colors shadow-md"
                >
                  <Phone size={14} /> {workshop.emergency}
                  <span className="ml-2 text-[10px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">24×7</span>
                </a>
              </div>
            </div>
          </div>

          {/* ─ WORKSHOP FACILITIES ─────────────────────────────── */}
          <div>
            <SectionLabel>Workshop Facilities</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {workshop.facilities.map((f, i) => {
                const FIcon = FACILITY_ICON_MAP[f.icon] || Wrench;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FIcon size={14} className="text-blue-600" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-snug">{f.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─ GOOGLE MAP ──────────────────────────────────────── */}
          <div>
            <SectionLabel>Location</SectionLabel>
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              {/* Map embed */}
              <div className="relative bg-slate-100" style={{ height: '220px' }}>
                <iframe
                  title="Workshop Location"
                  src={workshop.coordinates.embedSrc}
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              {/* Map footer */}
              <div className="bg-white px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <MapPin size={13} className="text-blue-500 mt-0.5 shrink-0" />
                  <span>{fullAddress}</span>
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={workshop.coordinates.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Navigation size={11} /> Get Directions
                  </a>
                  <a
                    href={workshop.coordinates.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
                  >
                    <ExternalLink size={11} /> Open in Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─ SOCIAL MEDIA ────────────────────────────────────── */}
          <div>
            <SectionLabel>Follow Us</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(({ key, Icon, label, color }) => (
                workshop.social[key] ? (
                  <a
                    key={key}
                    href={workshop.social[key]}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
                  >
                    <Icon size={16} style={{ color }} className="transition-transform group-hover:scale-110" />
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">{label}</span>
                  </a>
                ) : null
              ))}
            </div>
          </div>

          {/* ─ FAQ ─────────────────────────────────────────────── */}
          <div>
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <div className="flex flex-col gap-2">
              {workshop.faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* ══ STICKY FOOTER ════════════════════════════════════════ */}
        <footer className="shrink-0 border-t border-slate-100 bg-white px-7 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left — status */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${workshop.status === 'open' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              <p className="text-sm font-bold text-slate-800">
                {workshop.status === 'open' ? 'Open Now' : 'Closed'}
              </p>
              {workshop.status === 'open' && (
                <p className="text-xs text-slate-400">· Closes at {workshop.closesAt}</p>
              )}
            </div>
            {/* Right — CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${workshop.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
              >
                <Phone size={13} /> Call Now
              </a>
              <a
                href={`https://wa.me/${workshop.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-md shadow-emerald-300/40"
                style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
              >
                <WhatsAppIcon size={13} /> WhatsApp
              </a>
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
