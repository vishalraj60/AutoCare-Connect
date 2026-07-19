import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Bike,
  Target,
  Shield,
  Cloud,
  Play,
  ArrowRight,
  ChevronRight,
  Star,
  Droplets,
  CircleDot,
  Cpu,
  BatteryCharging,
  Globe,
  Rss,
  AtSign,
  Send,
  Smartphone,
  Menu,
  X,
  Gauge,
  Workflow,
} from 'lucide-react';
import heroWork from '../assets/hero-work.jpg';
import heroBike from '../assets/hero-work2.jpg';
import testimonialAvatars from '../assets/testimonial-avatars.png';
import ServiceDetailsModal from '../components/ui/ServiceDetailsModal';
import { SERVICES_DATA } from '../data/services';

const HERO_SLIDES = [
  {
    img: heroWork,
    badge: 'Trusted by 500+ Vehicle Owners',
    tag: 'Service Complete',
    tagSub: 'Your vehicle is ready for pickup',
  },
  {
    img: heroBike,
    badge: 'Certified Mechanics On Call',
    tag: 'Live Tracking',
    tagSub: 'Real-time service updates',
  },
];

/* ─── Constants ─── */
const ACCENT = '#2563EB';
const NAVY = '#0F1E38';

const NAV_LINKS = ['Home', 'Services', 'How It Works'];

const STATS_BAR = [
  { value: '10K+', label: 'Vehicles Managed' },
  { value: '500+', label: 'Global Customers' },
  { value: '50+', label: 'Certified Pros' },
  { value: '98%', label: 'Satisfaction' },
];

/* Service list driven from SERVICES_DATA */
const SERVICES = SERVICES_DATA.map((s) => ({
  id: s.id,
  icon: s.icon,
  title: s.title,
  desc: s.desc,
  price: s.price,
}));

const FEATURES = [
  { icon: Target, title: 'Real-Time Tracking', desc: 'Watch every step of the service through our live dashboard, from intake to final hand-off.' },
  { icon: Shield, title: 'Certified Mechanics', desc: 'Our technicians are brand-certified experts who treat every vehicle with clinical precision.' },
  { icon: Cloud, title: 'Digital Records', desc: 'Say goodbye to paper invoices. Access your full vehicle history and invoices anytime, anywhere.' },
];

const STEPS = [
  { num: 1, title: 'Book Service', desc: 'Select your vehicle and desired services via our intuitive online booking portal.' },
  { num: 2, title: 'Inspection', desc: 'Drop your car off and receive a high-definition digital inspection report with photos.' },
  { num: 3, title: 'Live Updates', desc: 'Approve repairs instantly and watch the progress through your live tracking link.' },
  { num: 4, title: 'Pickup', desc: 'Easy mobile payment and pickup. Your digital receipt is already in your dashboard.' },
];

const TESTIMONIALS = [
  { name: 'Vishal Raj', vehicle: 'NS 400z', avatarPos: '16.5%', quote: "The transparency is unmatched. I've never had a garage send me a video walkthrough of my engine before approving service. Truly the future." },
  { name: 'KUTTY', vehicle: 'D390', avatarPos: '50%', quote: "The digital service records are a game-changer. Selling my last vehicle was so easy because I could prove every single service was done on time." },
  { name: 'MYTH', vehicle: 'NS200', avatarPos: '83.5%', quote: "Booking is so fast. I can schedule a service while waiting in line for coffee, and I know exactly what it's going to cost before I arrive." },
];

const FOOTER_SERVICES = ['General Maintenance', 'Brake Specialist', 'Engine Diagnostic', 'Tire & Alignment', 'Electric Vehicle Care'];
const FOOTER_SUPPORT = ['Help Center', 'Booking Guide', 'Service Areas', 'Contact Us', 'Partner With Us'];
const SOCIAL_ICONS = [Globe, Rss, AtSign];

/* ─── StarRating ─── */
function Stars() {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill="#F59E0B" stroke="none" />
      ))}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════════════════ */
const CAROUSEL_STYLES = `
  @keyframes slideProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .carousel-progress {
    animation: slideProgress 3s linear forwards;
  }
`;

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [slideIdx, setSlideIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [activeLink, setActiveLink] = useState('Home');
  const intervalRef = useRef(null);

  /* ─── Modal state ─── */
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((serviceId) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedServiceId(null), 300);
  }, []);

  const handleServiceChange = useCallback((serviceId) => {
    setSelectedServiceId(serviceId);
  }, []);

  /* ─── Smooth-scroll helper ─── */
  const SECTION_IDS = {
    'Home': 'home',
    'Services': 'services',
    'How It Works': 'how-it-works',
  };

  const scrollToSection = useCallback((linkName) => {
    const id = SECTION_IDS[linkName];
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveLink(linkName);
  }, []);

  /* ─── Active-link tracker via IntersectionObserver ─── */
  useEffect(() => {
    const sectionEntries = Object.entries(SECTION_IDS);
    const observers = sectionEntries.map(([name, id]) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveLink(name); },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback((idx) => {
    setSlideIdx(idx);
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((slideIdx + 1) % HERO_SLIDES.length), [goTo, slideIdx]);
  const prev = useCallback(() => goTo((slideIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [goTo, slideIdx]);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSlideIdx((i) => (i + 1) % HERO_SLIDES.length);
      setAnimKey((k) => k + 1);
    }, 4000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoPlay]);

  const pauseAutoPlay = () => clearInterval(intervalRef.current);
  const slide = HERO_SLIDES[slideIdx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased">
      <style>{CAROUSEL_STYLES}</style>

      {/* ══════════════════════════════════════
          SECTION 1 — NAVBAR
      ══════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 xl:px-8 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: NAVY }}>
              <Bike size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A] leading-none">BikeCare Connect</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#64748B] mt-0.5">Premium Service</p>
            </div>
          </Link>

          {/* Center nav — desktop */}
          <ul className="hidden md:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollToSection(link)}
                  className={`text-sm font-medium transition-colors duration-150 pb-0.5 bg-transparent border-0 cursor-pointer ${activeLink === link
                    ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* Right CTAs — desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              to="/role-select"
              id="nav-sign-in"
              className="px-5 py-2 rounded-lg text-sm font-semibold border-2 border-[#2563EB] text-[#2563EB] hover:bg-blue-50 transition-colors duration-150"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#64748B] hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-white px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => { scrollToSection(link); setMobileOpen(false); }}
                className={`text-sm font-medium bg-transparent border-0 cursor-pointer text-left ${activeLink === link ? 'text-[#2563EB] font-bold' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
              >
                {link}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#E2E8F0]">
              <Link to="/role-select" className="text-center py-2.5 rounded-lg border-2 border-[#2563EB] text-[#2563EB] text-sm font-semibold">Sign In</Link>
              <Link to="/role-select" className="text-center py-2.5 rounded-lg text-white text-sm font-semibold" style={{ background: ACCENT }}>Book Service</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
          SECTION 2 — HERO
      ══════════════════════════════════════ */}
      <section id="home" className="max-w-7xl mx-auto px-6 xl:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left — text */}
          <div className="flex flex-col gap-7">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-[#2563EB] border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse inline-block" />
              Trusted by 500+ Vehicle Owners
            </div>

            {/* H1 */}
            <h1 className="text-5xl xl:text-6xl font-extrabold text-[#0F172A] leading-[1.06] tracking-tight">
              Premium Vehicle Care<br />
              <span style={{ color: ACCENT }}>Made Simple.</span>
            </h1>

            {/* Body copy */}
            <p className="text-lg text-[#64748B] leading-relaxed max-w-[480px]">
              Experience concierge-level maintenance management. Book certified services, track real-time repairs, and access digital records—all from one precise interface.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-[#0F172A] bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                  <Play size={11} fill="white" stroke="none" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Inline stats */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-bold text-[#64748B] uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Stars />
                <span>4.5 Rating</span>
              </div>
              <div className="w-px h-4 bg-[#E2E8F0]" />
              <span>5K+ Vehicles</span>
              <div className="w-px h-4 bg-[#E2E8F0]" />
              <span>10+ Mechanics</span>
            </div>
          </div>

          {/* Right — Hero Image Carousel */}
          <div
            className="relative mt-6 lg:mt-0 select-none overflow-hidden rounded-2xl shadow-2xl"
            style={{ height: '420px' }}
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={startAutoPlay}
          >
            {/* Sliding strip — all images in a row */}
            <div
              className="flex h-full"
              style={{
                width: `${HERO_SLIDES.length * 100}%`,
                transform: `translateX(-${(slideIdx * 100) / HERO_SLIDES.length}%)`,
                transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)',
              }}
            >
              {HERO_SLIDES.map((s, i) => (
                <div
                  key={i}
                  className="relative h-full shrink-0"
                  style={{ width: `${100 / HERO_SLIDES.length}%` }}
                >
                  <img
                    src={s.img}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Prev button */}
            <button
              onClick={() => { prev(); startAutoPlay(); }}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Next button */}
            <button
              onClick={() => { next(); startAutoPlay(); }}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Slide counter label */}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10">
              {slideIdx + 1} / {HERO_SLIDES.length}
            </div>

            {/* Progress bar indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); startAutoPlay(); }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative overflow-hidden rounded-full"
                  style={{
                    width: i === slideIdx ? '40px' : '8px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.35)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'width 0.3s ease',
                  }}
                >
                  {i === slideIdx && (
                    <span
                      key={animKey}
                      className="carousel-progress absolute left-0 top-0 h-full rounded-full"
                      style={{ background: '#2563EB' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — IMPACT STATS BAR
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 xl:px-8 pb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS_BAR.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm text-center py-8 px-6 hover:shadow-md transition-shadow">
              <p className="text-4xl xl:text-5xl font-extrabold mb-2" style={{ color: ACCENT }}>{s.value}</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#64748B]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — COMPREHENSIVE CARE
      ══════════════════════════════════════ */}
      <section id="services" className="max-w-7xl mx-auto px-6 xl:px-8 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>What We Offer</p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#0F172A] mb-4">Comprehensive Care</h2>
          <p className="text-[#64748B] text-base max-w-xl mx-auto leading-relaxed">
            Precision diagnostics and maintenance for every aspect of your vehicle's health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.title} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon size={22} style={{ color: ACCENT }} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0F172A] mb-1.5">{svc.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{svc.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F1F5F9]">
                  <button
                    onClick={() => openModal(svc.id)}
                    className="flex items-center gap-1 text-xs font-bold hover:underline transition-all hover:gap-2 group/btn"
                    style={{ color: ACCENT }}
                    aria-label={`Learn more about ${svc.title}`}
                  >
                    Learn More
                    <ChevronRight size={13} className="transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — DARK FEATURE BAND
      ══════════════════════════════════════ */}
      <section id="features" className="w-full py-20" style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 xl:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-20">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex flex-col items-center text-center gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/40" style={{ background: ACCENT }}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — THE SEAMLESS PROCESS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 xl:px-8 py-20">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>How It Works</p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#0F172A]">The Seamless Process</h2>
        </div>

        {/* Stepper */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-[#E2E8F0] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative z-10 flex flex-col items-center text-center gap-4">
                {/* Numbered circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-extrabold border-2 shadow-sm ${idx === 0
                    ? 'text-white border-transparent shadow-blue-200 shadow-lg'
                    : 'bg-white text-[#64748B] border-[#E2E8F0]'
                    }`}
                  style={idx === 0 ? { background: ACCENT } : {}}
                >
                  {step.num}
                </div>
                <h3 className="font-bold text-base text-[#0F172A]">{step.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — THE DRIVER'S VOICE
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 xl:px-8 py-16">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Customer Stories</p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#0F172A]">The Driver's Voice</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-7 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200">
              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#E2E8F0]"
                  style={{
                    backgroundImage: `url(${testimonialAvatars})`,
                    backgroundSize: '300% 100%',
                    backgroundPosition: `${t.avatarPos} center`,
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <div>
                  <p className="font-bold text-sm text-[#0F172A]">{t.name}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">{t.vehicle}</p>
                </div>
              </div>
              <Stars />
              <p className="text-sm text-[#64748B] leading-relaxed italic">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 8 — MOBILE APP PROMO
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 xl:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — phone mockup */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative w-60 xl:w-64 rounded-[3rem] border-[10px] shadow-2xl overflow-hidden flex flex-col"
              style={{ background: '#0F172A', borderColor: '#0F172A', height: '460px' }}
            >
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10" style={{ background: '#0F172A' }} />
              {/* Screen */}
              <div className="flex-1 bg-gradient-to-b from-[#1E3A5F] to-[#0F172A] p-4 pt-10 flex flex-col gap-3 overflow-hidden">
                <p className="text-[9px] font-bold uppercase tracking-widest text-blue-400 text-center mb-1">BikeCare Connect</p>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-[9px] text-blue-300 font-semibold uppercase tracking-wider mb-1">Active Service</p>
                  <p className="text-white font-bold text-sm">Oil Change · In Progress</p>
                  <div className="mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '65%', background: ACCENT }} />
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-[9px] text-blue-300 font-semibold uppercase tracking-wider mb-1">Next Up</p>
                  <p className="text-white font-bold text-sm">Brake Inspection</p>
                  <p className="text-blue-300 text-[10px] mt-0.5">Due in 2 weeks</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {['History', 'Invoice', 'Track', 'Support'].map((item) => (
                    <div key={item} className="bg-white/10 rounded-xl p-3 text-center">
                      <Smartphone size={15} style={{ color: ACCENT }} className="mx-auto mb-1" />
                      <p className="text-[10px] text-white font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-6">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT }}>Mobile App</p>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-[#0F172A] leading-tight">
              Manage Your Vehicle<br />Anywhere.
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              The BikeCare Connect app puts the entire garage in your pocket. Receive push notifications for maintenance, track your technician live, and pay with a single tap.
            </p>

            {/* App store buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* App Store */}
              <button className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity border border-white/10 shadow-md" style={{ background: NAVY }}>
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#0F172A">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-white/60 uppercase tracking-wider">Download on the</p>
                  <p className="font-bold text-sm leading-tight">App Store</p>
                </div>
              </button>

              {/* Google Play */}
              <button className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity border border-white/10 shadow-md" style={{ background: NAVY }}>
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#4CAF50" d="M1.22 0L13.4 12 1.22 24c-.49-.43-.74-1.05-.74-1.86V1.86C.48 1.05.73.43 1.22 0z" />
                    <path fill="#FF3D00" d="m16.93 15.52-3.03-3.03 3.03-3.03 3.13 1.8c.9.52.9 1.94 0 2.46l-3.13 1.8z" />
                    <path fill="#FFD600" d="M1.22 24 13.4 12l3.53 3.52L3.52 24.7A2.24 2.24 0 0 1 1.22 24z" />
                    <path fill="#2196F3" d="M1.22 0a2.24 2.24 0 0 1 2.3.7l13.41 8.78L13.4 12 1.22 0z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-white/60 uppercase tracking-wider">Get it on</p>
                  <p className="font-bold text-sm leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 9 — CTA BANNER
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 xl:px-8 py-8 pb-20">
        <div className="rounded-2xl text-center py-20 px-8" style={{ background: NAVY }}>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-5 max-w-2xl mx-auto leading-tight">
            Ready to Keep Your Vehicle in Perfect Condition?
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto mb-10">
            Join thousands of owners who trust us for precision maintenance and transparent communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/role-select"
              id="cta-book-service"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/40"
              style={{ background: ACCENT }}
            >
              Book Your Service <ArrowRight size={16} />
            </Link>
            <Link
              to="/role-select"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white border-2 border-white/25 hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 10 — FOOTER
      ══════════════════════════════════════ */}
      <footer style={{ background: NAVY }} className="w-full pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-6 xl:px-8">

          {/* 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-12 pb-12 border-b border-white/10">

            {/* Col 1 — Brand */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ACCENT }}>
                  <Bike size={18} className="text-white" />
                </div>
                <p className="text-sm font-bold text-white">BikeCare Connect</p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Precision vehicle management for the modern driver. Experience the fusion of high-tech diagnostics and concierge service.
              </p>
              <div className="flex gap-3">
                {SOCIAL_ICONS.map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/50 transition-colors"
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>

            {/* Col 2 — Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Services</h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Support */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Support</h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_SUPPORT.map((s) => (
                  <li key={s}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Newsletter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-5">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-5 leading-relaxed">Get maintenance tips and exclusive offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB] transition-colors"
                />
                <button
                  onClick={() => setEmail('')}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 hover:opacity-90 transition-opacity"
                  style={{ background: ACCENT }}
                  aria-label="Subscribe"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
            <p>© 2026 BikeCare Connect. Precision in Every Part.</p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="hover:text-slate-300 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ══ SERVICE DETAILS MODAL ═══════════════════════════════════ */}
      <ServiceDetailsModal
        serviceId={selectedServiceId}
        isOpen={isModalOpen}
        onClose={closeModal}
        onServiceChange={handleServiceChange}
      />
    </div>
  );
}
