import {
  Droplets,
  CircleDot,
  Cpu,
  BatteryCharging,
  Workflow,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  Thermometer,
  Wrench,
  RotateCcw,
  Activity,
} from 'lucide-react';

// ─── Shared motorcycle models ───────────────────────────────────────────────
const BIKES = [
  { name: 'KTM Duke 390', tag: 'Sport Naked', color: '#FF6B00', initials: 'KTM' },
  { name: 'Royal Enfield Meteor', tag: 'Cruiser', color: '#8B4513', initials: 'RE' },
  { name: 'Bajaj Pulsar NS200', tag: 'Street Fighter', color: '#1A1A2E', initials: 'BJ' },
  { name: 'Honda CBR 650R', tag: 'Sport', color: '#CC0000', initials: 'H' },
  { name: 'Yamaha R15 V4', tag: 'Super Sport', color: '#003087', initials: 'Y' },
  { name: 'Triumph Street Triple', tag: 'Naked', color: '#002147', initials: 'T' },
];

// ─── Service Catalog ─────────────────────────────────────────────────────────
export const SERVICES_DATA = [
  /* ── 1. Engine Oil Service ─────────────────────────────────────────── */
  {
    id: 'engine-oil',
    icon: Droplets,
    title: 'Engine Oil Service',
    category: 'Preventive Maintenance',
    duration: '45–60 min',
    price: '₹499',
    priceRange: '₹499 – ₹1,299',
    desc: 'Premium engine oil and oil filter replacement for smoother performance and longer engine life.',

    overview:
      'Engine oil is the lifeblood of your motorcycle. It lubricates every moving part inside the engine, dissipates heat, prevents corrosion, and keeps metal contaminants suspended until they can be filtered out. Over time, oil degrades — its additives break down, it accumulates combustion by-products, and it loses its viscosity. A timely oil change is the single most important preventive maintenance task you can perform. Our certified technicians drain the old oil completely, replace the oil filter, and refill with the correct grade and quantity of premium oil recommended for your specific engine.', 

    included: [
      { label: 'Engine oil drain & refill (correct grade)', icon: Droplets },
      { label: 'Oil filter replacement', icon: CheckCircle2 },
      { label: 'Sump plug torque check & washer replacement', icon: Wrench },
      { label: 'Oil level verification & leak inspection', icon: Activity },
      { label: 'Engine bay wipe-down', icon: Shield },
      { label: 'Digital service record update', icon: CheckCircle2 },
    ],

    parts: [
      { name: 'Engine Oil', purpose: 'Lubrication, cooling & cleaning', life: '3,000–5,000 km', color: '#F59E0B' },
      { name: 'Oil Filter', purpose: 'Traps metal particles & sludge', life: 'Every oil change', color: '#6366F1' },
      { name: 'Drain Plug Washer', purpose: 'Prevents oil seepage at sump', life: 'Every oil change', color: '#10B981' },
    ],

    benefits: [
      { icon: TrendingUp, title: 'Better Mileage', desc: 'Fresh oil reduces internal friction, improving fuel efficiency by up to 2%.' },
      { icon: Thermometer, title: 'Cooler Engine', desc: 'New oil transfers heat away from the engine more effectively than degraded oil.' },
      { icon: Shield, title: 'Engine Protection', desc: 'Prevents metal-to-metal contact that causes long-term wear and engine failure.' },
      { icon: Activity, title: 'Smoother Power', desc: 'Well-lubricated internals deliver more consistent torque and throttle response.' },
    ],

    warnings: [
      { sign: 'Oil warning light on dashboard', severity: 'critical' },
      { sign: 'Dark, gritty or milky oil on dipstick', severity: 'high' },
      { sign: 'Burning oil smell from engine', severity: 'high' },
      { sign: 'Engine running noisier than usual (ticking/knocking)', severity: 'medium' },
      { sign: 'Mileage exceeded 3,000 km since last change', severity: 'low' },
    ],

    interval: { km: '3,000 – 5,000 km', months: 'Every 3 months', note: 'Whichever comes first. Mineral oil: 3,000 km. Semi-synthetic: 4,000 km. Full synthetic: 5,000 km.' },

    process: [
      { step: 1, title: 'Vehicle Check-in', desc: 'Current mileage logged, existing oil level checked, correct oil grade confirmed from manufacturer spec.' },
      { step: 2, title: 'Warm Engine', desc: 'Engine run briefly to warm oil — warm oil flows out faster and carries more contaminants.' },
      { step: 3, title: 'Drain Old Oil', desc: 'Sump plug removed. All old oil drained completely into waste container for responsible disposal.' },
      { step: 4, title: 'Filter Replacement', desc: 'Old filter removed and discarded. New filter pre-filled with fresh oil and installed to correct torque.' },
      { step: 5, title: 'Fresh Oil Fill', desc: 'Premium oil poured to manufacturer-specified quantity. Sump plug torqued with new washer.' },
      { step: 6, title: 'Verification', desc: 'Engine started and run. Oil level rechecked on sight glass/dipstick. All joints inspected for seeps.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Mineral Oil', price: '₹499', note: 'Standard bikes, up to 150cc', recommended: false },
      { tier: 'Semi-Synthetic', price: '₹799', note: '150cc–400cc performance engines', recommended: true },
      { tier: 'Full Synthetic', price: '₹1,299', note: 'High-performance & premium bikes', recommended: false },
    ],

    reviews: [
      { name: 'Arjun K.', vehicle: 'KTM Duke 390', rating: 5, review: 'Quick, clean, and they showed me the old oil condition before draining. Transparent service.' },
      { name: 'Priya S.', vehicle: 'Yamaha R15', rating: 5, review: 'Booked online, was done in 40 minutes. The bike feels noticeably smoother.' },
      { name: 'Rahul M.', vehicle: 'Royal Enfield', rating: 4, review: 'Good service. Wish they had more semi-synthetic options but overall very professional.' },
    ],

    faqs: [
      { q: 'How do I know which oil grade to use?', a: 'Our technicians reference your bike\'s owner manual and manufacturer database to select the exact grade (10W-30, 10W-40, 20W-50, etc.) specified for your engine and climate.' },
      { q: 'Can I mix synthetic and mineral oil?', a: 'We never mix oil types. If your engine currently has mineral oil, we drain it completely before adding synthetic. Mixing degrades the performance of both.' },
      { q: 'Why does the oil turn black so quickly?', a: 'Dark oil is actually a sign the oil is doing its job — it\'s collecting combustion by-products and keeping your engine clean. Oil that stays clear for a long time may not be doing its job properly.' },
      { q: 'Do you dispose of old oil responsibly?', a: 'Yes. All used oil is collected and sent to certified recycling partners. We never drain oil into drains or waste bins.' },
    ],

    related: ['brake-service', 'engine-diagnostics', 'engine-tuning'],
  },

  /* ── 2. Brake Service ──────────────────────────────────────────────── */
  {
    id: 'brake-service',
    icon: CircleDot,
    title: 'Brake Service',
    category: 'Safety Critical',
    duration: '60–90 min',
    price: '₹699',
    priceRange: '₹699 – ₹2,499',
    desc: 'Complete inspection, brake pad adjustment or replacement, and brake fluid check for maximum safety.',

    overview:
      'Your braking system is the most safety-critical component on your motorcycle. It converts kinetic energy into heat through friction between the brake pads and rotors (discs). Over time, pads wear thin, rotors develop grooves, and brake fluid absorbs moisture — reducing stopping power significantly. A comprehensive brake service inspects and restores every element of this system: pads, rotors, calipers, brake lines, master cylinder, and hydraulic fluid. Our technicians follow a 12-point brake safety checklist and road-test every bike before handover.',

    included: [
      { label: 'Front & rear brake pad inspection / replacement', icon: CircleDot },
      { label: 'Rotor thickness measurement & resurfacing assessment', icon: Activity },
      { label: 'Brake fluid condition test (moisture content)', icon: Droplets },
      { label: 'Caliper sliding pin lubrication', icon: Wrench },
      { label: 'Brake hose visual inspection for cracks', icon: CheckCircle2 },
      { label: 'Master cylinder fluid level & seal inspection', icon: Shield },
      { label: 'Brake lever & pedal adjustment', icon: RotateCcw },
      { label: 'Post-service road test', icon: TrendingUp },
    ],

    parts: [
      { name: 'Brake Pads', purpose: 'Creates friction to stop the wheel', life: '10,000–20,000 km', color: '#EF4444' },
      { name: 'Brake Fluid (DOT 4)', purpose: 'Hydraulic pressure transmission', life: '2 years / 25,000 km', color: '#F59E0B' },
      { name: 'Brake Rotor', purpose: 'Friction surface for pads', life: '40,000–60,000 km', color: '#6B7280' },
      { name: 'Caliper Pistons', purpose: 'Push pads against rotor', life: 'Inspect every service', color: '#8B5CF6' },
    ],

    benefits: [
      { icon: Shield, title: 'Maximum Safety', desc: 'Fresh pads at full thickness provide the shortest possible stopping distance.' },
      { icon: Zap, title: 'Better Feel', desc: 'Proper caliper lubrication eliminates brake drag and restores crisp lever feel.' },
      { icon: TrendingUp, title: 'Rotor Longevity', desc: 'Fresh pads prevent scoring that causes expensive rotor replacement.' },
      { icon: Activity, title: 'Consistent Performance', desc: 'Fresh brake fluid prevents vapour lock in aggressive riding conditions.' },
    ],

    warnings: [
      { sign: 'Squealing or grinding noise when braking', severity: 'critical' },
      { sign: 'Brake lever/pedal feels soft or spongy', severity: 'critical' },
      { sign: 'Bike pulls to one side when braking', severity: 'high' },
      { sign: 'Visible pad wear below 2mm', severity: 'high' },
      { sign: 'Brake fluid appears dark or milky', severity: 'medium' },
      { sign: 'Vibration felt through brake lever', severity: 'medium' },
    ],

    interval: { km: '10,000 – 15,000 km', months: 'Every 12 months', note: 'Or immediately if any warning signs appear. Aggressive riding styles require more frequent checks.' },

    process: [
      { step: 1, title: 'Safety Inspection', desc: 'Complete visual check of brake system including fluid, hoses, calipers, and rotors before any work begins.' },
      { step: 2, title: 'Pad Measurement', desc: 'Pad thickness measured with vernier calipers. Any pad below 2mm is replaced regardless of appearance.' },
      { step: 3, title: 'Rotor Assessment', desc: 'Rotor thickness and runout measured. Surface inspected for hot spots, scoring, and cracks.' },
      { step: 4, title: 'Fluid Test', desc: 'Brake fluid moisture content tested with electronic tester. DOT rating verified for compatibility.' },
      { step: 5, title: 'Caliper Service', desc: 'Caliper sliding pins cleaned, inspected, and lubricated with high-temp silicone grease.' },
      { step: 6, title: 'Road Test', desc: 'Bike taken for a controlled road test. Multiple hard stops performed to verify full braking performance.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Inspection Only', price: '₹299', note: 'Detailed report, no parts replaced', recommended: false },
      { tier: 'Pad Replacement', price: '₹699', note: 'OEM-spec pads + fluid top-up', recommended: true },
      { tier: 'Full Brake Service', price: '₹2,499', note: 'Pads + rotors + fluid flush + caliper rebuild', recommended: false },
    ],

    reviews: [
      { name: 'Siddharth V.', vehicle: 'Honda CBR 650R', rating: 5, review: 'They caught a cracked brake hose I had no idea about. Could have been catastrophic. Life savers.' },
      { name: 'Ananya R.', vehicle: 'Bajaj NS200', rating: 5, review: 'Brake feel after service is night and day. Sharp, responsive, no more sponginess.' },
      { name: 'Vikram T.', vehicle: 'Triumph Street Triple', rating: 5, review: 'Track day prep service. They were thorough and gave me a full written inspection report.' },
    ],

    faqs: [
      { q: 'How do I know if my brake pads need replacing?', a: 'Most pads have a wear indicator groove. When the groove disappears, the pad is at minimum thickness. You\'ll also hear a high-pitched squealing sound as the wear indicator contacts the rotor.' },
      { q: 'What\'s the difference between DOT 3, 4, and 5.1?', a: 'DOT numbers indicate the boiling point of the fluid. Higher DOT ratings have higher boiling points. We always use the grade specified in your owner\'s manual — usually DOT 4 for modern bikes.' },
      { q: 'Can I just top up brake fluid instead of flushing?', a: 'Topping up only masks the problem. Old fluid absorbs moisture over time, dramatically reducing its boiling point. A full flush removes all moisture-contaminated fluid.' },
    ],

    related: ['engine-oil', 'chain-wheel', 'engine-tuning'],
  },

  /* ── 3. Engine Diagnostics ─────────────────────────────────────────── */
  {
    id: 'engine-diagnostics',
    icon: Cpu,
    title: 'Engine Diagnostics',
    category: 'Advanced Technology',
    duration: '30–45 min',
    price: '₹399',
    priceRange: '₹399 – ₹799',
    desc: 'Advanced diagnostic scan to detect engine faults, sensor issues, and performance problems.',

    overview:
      'Modern motorcycles use sophisticated Electronic Control Units (ECUs) that constantly monitor hundreds of parameters across the engine, fuel, and electrical systems. When something goes wrong, fault codes are stored in the ECU\'s memory — even if no warning light appears yet. Our advanced OBD/diagnostic interface connects directly to your bike\'s ECU, reads all stored and pending fault codes, monitors live sensor data, and generates a comprehensive health report. This is the fastest, most accurate way to identify problems — without guesswork or unnecessary parts replacement.',

    included: [
      { label: 'ECU fault code read & clear (all systems)', icon: Cpu },
      { label: 'Live sensor data monitoring (TPS, MAP, O2, coolant)', icon: Activity },
      { label: 'Fuel trim analysis & injector performance check', icon: Droplets },
      { label: 'Ignition system timing verification', icon: Zap },
      { label: 'Throttle position sensor calibration check', icon: RotateCcw },
      { label: 'Printed diagnostic report with fault explanations', icon: CheckCircle2 },
    ],

    parts: [
      { name: 'OBD Diagnostic Interface', purpose: 'ECU communication & data extraction', life: 'Tool — not replaced', color: '#6366F1' },
      { name: 'O2 Sensor (if faulty)', purpose: 'Monitors exhaust gas composition', life: '25,000–40,000 km', color: '#F59E0B' },
      { name: 'MAP Sensor (if faulty)', purpose: 'Manifold air pressure measurement', life: '60,000+ km', color: '#10B981' },
    ],

    benefits: [
      { icon: Zap, title: 'Instant Accuracy', desc: 'Eliminates guesswork — identifies the exact failing component within minutes.' },
      { icon: TrendingUp, title: 'Save Money', desc: 'Prevents replacing parts that aren\'t faulty. Fix the right thing the first time.' },
      { icon: Shield, title: 'Preventive Catch', desc: 'Detects pending faults before they cause breakdowns or damage other components.' },
      { icon: Activity, title: 'Live Data', desc: 'Monitor real-time engine parameters to catch intermittent issues not stored in memory.' },
    ],

    warnings: [
      { sign: 'Check Engine / MIL warning light on', severity: 'critical' },
      { sign: 'Engine misfiring or running rough at idle', severity: 'high' },
      { sign: 'Sudden drop in fuel economy (>15%)', severity: 'high' },
      { sign: 'Power loss or hesitation under acceleration', severity: 'high' },
      { sign: 'Hard starting or long cranking', severity: 'medium' },
      { sign: 'Exhaust smells rich (fuel smell) or lean (burning)', severity: 'medium' },
    ],

    interval: { km: 'As needed / 20,000 km', months: 'Annually or when issues arise', note: 'Recommended annually for bikes without onboard fault-code displays, or any time a warning light appears.' },

    process: [
      { step: 1, title: 'Connection', desc: 'Diagnostic interface connected to the bike\'s OBD port or ECU diagnostic connector (model-specific cable).' },
      { step: 2, title: 'Code Extraction', desc: 'All stored DTCs (Diagnostic Trouble Codes) and pending codes extracted across all ECU modules.' },
      { step: 3, title: 'Live Data Review', desc: 'Engine started and live sensor data streamed — throttle position, injector duty cycle, O2 voltage, coolant temp.' },
      { step: 4, title: 'Root Cause Analysis', desc: 'Codes cross-referenced with fault database. Root cause identified (sensor, wiring, mechanical, or software).' },
      { step: 5, title: 'Report Generation', desc: 'Full report generated detailing every fault code, its meaning, severity, and recommended repair action.' },
      { step: 6, title: 'Customer Consultation', desc: 'Findings explained in plain language. Repair quote provided. Code cleared only after repairs are authorised.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Code Read Only', price: '₹399', note: 'Read & report all fault codes', recommended: false },
      { tier: 'Full Diagnostic', price: '₹599', note: 'Codes + live data + full report', recommended: true },
      { tier: 'Diagnostic + Repair', price: '₹799+', note: 'Full diagnostic + minor sensor repair', recommended: false },
    ],

    reviews: [
      { name: 'Karthik S.', vehicle: 'KTM 390 Duke', rating: 5, review: 'Saved me from an expensive workshop bill. The real problem was just a faulty O2 sensor, not a rebuild like another garage suggested.' },
      { name: 'Deepa L.', vehicle: 'Yamaha R15 V4', rating: 5, review: 'The printed report is excellent. Very detailed and they explained everything in simple terms.' },
      { name: 'Nikhil R.', vehicle: 'Honda CBR', rating: 4, review: 'Fast service. They found two pending codes before they turned into warning lights. Very proactive.' },
    ],

    faqs: [
      { q: 'Can you diagnose ABS and traction control faults?', a: 'Yes. Our interfaces support multi-module scanning including ABS, TC, and IMU systems on compatible bikes. Coverage depends on the manufacturer\'s ECU architecture.' },
      { q: 'Will clearing the codes make my bike run better?', a: 'Clearing codes without fixing the root cause only hides the problem temporarily. Codes will return. We always fix the issue before clearing codes.' },
      { q: 'My bike has no warning light — should I still get a diagnostic?', a: 'Absolutely. Many fault codes are "pending" — they\'re logged but haven\'t triggered the warning light yet. Catching them early prevents more serious damage.' },
    ],

    related: ['engine-oil', 'battery-check', 'engine-tuning'],
  },

  /* ── 4. Battery Check ──────────────────────────────────────────────── */
  {
    id: 'battery-check',
    icon: BatteryCharging,
    title: 'Battery Check',
    category: 'Electrical Systems',
    duration: '20–30 min',
    price: '₹199',
    priceRange: '₹199 – ₹3,499',
    desc: 'Battery health inspection, charging system test, and replacement if required.',

    overview:
      'A weak or failing battery is the leading cause of unexpected motorcycle breakdowns. Unlike car batteries which give more warning signs, motorcycle batteries can fail suddenly — especially in hot climates or during extended storage. Our comprehensive battery health service uses electronic load testers and charging system analysers to measure battery cold cranking amps (CCA), internal resistance, and the full charging cycle. We also test the alternator/stator and voltage regulator to ensure the battery is being properly charged while riding.',

    included: [
      { label: 'Battery CCA & voltage load test', icon: BatteryCharging },
      { label: 'Internal resistance measurement', icon: Activity },
      { label: 'Alternator / stator output test', icon: Zap },
      { label: 'Voltage regulator output verification', icon: Shield },
      { label: 'Terminal cleaning & corrosion removal', icon: Wrench },
      { label: 'Battery terminal torque & connection check', icon: CheckCircle2 },
    ],

    parts: [
      { name: 'Motorcycle Battery', purpose: 'Engine starting & electrical power', life: '2–4 years', color: '#10B981' },
      { name: 'Terminal Clamp', purpose: 'Secure electrical connection', life: 'As needed', color: '#6B7280' },
      { name: 'Terminal Protector Spray', purpose: 'Prevents corrosion build-up', life: 'Annual application', color: '#F59E0B' },
    ],

    benefits: [
      { icon: Zap, title: 'Reliable Starting', desc: 'Prevents the #1 cause of roadside breakdowns — a dead battery at the worst time.' },
      { icon: Shield, title: 'ECU Protection', desc: 'Stable voltage prevents ECU glitches and sensor errors caused by voltage spikes.' },
      { icon: TrendingUp, title: 'Charging System Health', desc: 'Catch stator or regulator failures before they destroy a new battery.' },
      { icon: Activity, title: 'Light Output', desc: 'A healthy battery ensures full brightness from headlights and consistent instrument display.' },
    ],

    warnings: [
      { sign: 'Slow or laboured engine cranking', severity: 'critical' },
      { sign: 'Dashboard warning light flickering or dim', severity: 'high' },
      { sign: 'Battery over 3 years old', severity: 'medium' },
      { sign: 'Bike not started in more than 4 weeks', severity: 'medium' },
      { sign: 'Corroded or white powdery terminal build-up', severity: 'medium' },
      { sign: 'Headlights dim at idle, brighter at higher RPM', severity: 'high' },
    ],

    interval: { km: 'Every 10,000 km', months: 'Every 12 months', note: 'Battery replacement typically every 2–4 years depending on usage, storage conditions, and climate.' },

    process: [
      { step: 1, title: 'Visual Inspection', desc: 'Battery case checked for cracks, bulging, or leaks. Terminals inspected for corrosion and secure fit.' },
      { step: 2, title: 'Voltage Test', desc: 'Open circuit voltage measured. Fully charged battery should read 12.6V–12.8V (sealed lead-acid).' },
      { step: 3, title: 'Load Test', desc: 'Electronic load tester applies 50% of CCA rating. CCA output measured and compared to battery specification.' },
      { step: 4, title: 'Charging System Test', desc: 'Engine started. Alternator output tested at idle and revs. Should read 13.5V–14.7V across battery terminals.' },
      { step: 5, title: 'Regulator Test', desc: 'Voltage regulator checked for over-charging (>15V) or under-charging (<13V) that damages the battery.' },
      { step: 6, title: 'Terminal Service', desc: 'Terminals cleaned with wire brush, coated with anti-corrosion protector, torqued to specification.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Battery Test Only', price: '₹199', note: 'Full test report, no replacement', recommended: false },
      { tier: 'Standard Battery', price: '₹1,999', note: 'OEM-compatible sealed lead-acid + fitment', recommended: false },
      { tier: 'Lithium Battery', price: '₹3,499', note: 'Lightweight lithium-ion + fitment + 2yr warranty', recommended: true },
    ],

    reviews: [
      { name: 'Akash P.', vehicle: 'Royal Enfield Meteor', rating: 5, review: 'They found my alternator was overcharging — would have killed a new battery in weeks. Fixed the real problem.' },
      { name: 'Meera V.', vehicle: 'Yamaha R15', rating: 5, review: 'Super fast. In and out in 20 minutes with a full health report. Very professional setup.' },
      { name: 'Rohit G.', vehicle: 'KTM Duke', rating: 4, review: 'Upgraded to lithium. The weight difference is noticeable and starting is so much snappier now.' },
    ],

    faqs: [
      { q: 'Should I get a lithium or lead-acid battery?', a: 'Lithium batteries are lighter (up to 70% weight saving), have longer shelf life, and faster recharging. However, they require a lithium-compatible charger. Lead-acid batteries are cheaper and work fine for most commuter bikes.' },
      { q: 'Can I jump-start my motorcycle from a car?', a: 'We strongly advise against it. Car batteries deliver far more current than motorcycles can handle, potentially damaging the ECU and electrical system. Use a motorcycle-specific jump starter.' },
      { q: 'How can I extend my battery\'s life?', a: 'Use a smart trickle charger during storage periods longer than 2 weeks. Avoid very short trips that don\'t fully charge the battery. Clean terminals annually.' },
    ],

    related: ['engine-diagnostics', 'engine-oil', 'engine-tuning'],
  },

  /* ── 5. Chain & Wheel Service ──────────────────────────────────────── */
  {
    id: 'chain-wheel',
    icon: Workflow,
    title: 'Chain & Wheel Service',
    category: 'Drivetrain',
    duration: '60–75 min',
    price: '₹349',
    priceRange: '₹349 – ₹4,999',
    desc: 'Chain cleaning, lubrication, tension adjustment, and wheel alignment for a smoother ride.',

    overview:
      'The drive chain is the critical link between your engine\'s power and the rear wheel. It endures enormous forces with every acceleration, and it operates in a harsh environment of road grime, dust, water, and centrifugal force. A neglected chain stretches, the sprockets wear into a hooked profile, and ultimately the chain snaps — a catastrophic failure at speed. Our chain and wheel service covers the complete drivetrain: chain cleaning, lubrication, tension and alignment correction, sprocket wear assessment, and full wheel bearing inspection. Proper drivetrain maintenance is essential for both performance and safety.',

    included: [
      { label: 'Chain degreasing & deep clean', icon: Droplets },
      { label: 'O-ring / X-ring condition inspection', icon: CheckCircle2 },
      { label: 'Chain stretch measurement (% elongation)', icon: Activity },
      { label: 'Chain tension adjustment to spec', icon: Wrench },
      { label: 'Rear wheel alignment check', icon: RotateCcw },
      { label: 'Front & rear sprocket wear assessment', icon: CircleDot },
      { label: 'Quality chain lubricant application', icon: Droplets },
      { label: 'Wheel bearing play check', icon: Shield },
    ],

    parts: [
      { name: 'Drive Chain', purpose: 'Transfers engine power to rear wheel', life: '15,000–25,000 km', color: '#6B7280' },
      { name: 'Front Sprocket', purpose: 'Engine output gear (smaller)', life: '20,000–30,000 km', color: '#F59E0B' },
      { name: 'Rear Sprocket', purpose: 'Rear wheel drive gear (larger)', life: '20,000–30,000 km', color: '#EF4444' },
      { name: 'Chain Lubricant', purpose: 'Reduces friction & prevents rust', life: '500–1,000 km', color: '#10B981' },
    ],

    benefits: [
      { icon: TrendingUp, title: 'Power Delivery', desc: 'A clean, tensioned chain transfers up to 98% of engine power to the wheel — a loose chain wastes energy.' },
      { icon: Shield, title: 'Safety', desc: 'Prevents catastrophic chain snap — one of the most dangerous failures on a moving motorcycle.' },
      { icon: Activity, title: 'Smooth Ride', desc: 'Eliminates the lurching sensation caused by a tight spot or kinked link in the chain.' },
      { icon: Zap, title: 'Component Life', desc: 'A clean, lubricated chain extends sprocket life by 2–3× compared to a dry, dirty chain.' },
    ],

    warnings: [
      { sign: 'Visible rust on chain links', severity: 'critical' },
      { sign: 'Chain jumping or skipping during acceleration', severity: 'critical' },
      { sign: 'Visible hook-shaped sprocket teeth', severity: 'high' },
      { sign: 'Chain slack exceeds 30mm', severity: 'high' },
      { sign: 'Clicking or grinding sound from drivetrain', severity: 'high' },
      { sign: 'Chain appears dry with no lube visible', severity: 'medium' },
    ],

    interval: { km: 'Clean: 500 km / Adjust: 1,000 km / Replace: 20,000 km', months: 'Clean every month in wet season', note: 'Chain lubrication is the most frequently neglected but easiest maintenance task. More frequent cleaning required in monsoon/rainy conditions.' },

    process: [
      { step: 1, title: 'Pre-clean Inspection', desc: 'Chain inspected dry for visible damage, kinks, stiff links, and rust before cleaning begins.' },
      { step: 2, title: 'Deep Degrease', desc: 'Chain rotated through degreaser-soaked brush tool. Grime and old lube fully removed from all link surfaces.' },
      { step: 3, title: 'Stretch Measurement', desc: 'Chain stretch measured precisely — over 3% elongation means replacement is required.' },
      { step: 4, title: 'Sprocket Inspection', desc: 'Both sprockets inspected for hooked or shark-fin shaped teeth that indicate wear beyond service limits.' },
      { step: 5, title: 'Tension & Alignment', desc: 'Rear axle adjusted to achieve correct chain tension. Wheel alignment verified using reference marks and laser tool.' },
      { step: 6, title: 'Lubrication', desc: 'Quality O-ring-safe chain lubricant applied to inner links while rotating chain slowly. Excess wiped off.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Clean & Lube', price: '₹349', note: 'Degrease, inspect, lube & adjust', recommended: true },
      { tier: 'Chain Replacement', price: '₹1,999', note: 'Premium DID/RK O-ring chain + fitment', recommended: false },
      { tier: 'Full Kit (Chain + Sprockets)', price: '₹4,999', note: 'Chain + both sprockets + fitment', recommended: false },
    ],

    reviews: [
      { name: 'Aditya B.', vehicle: 'KTM Duke 390', rating: 5, review: 'Track day prep. Chain was perfectly tensioned and the bike felt much sharper out of corners. Great attention to detail.' },
      { name: 'Kavita N.', vehicle: 'Bajaj NS200', rating: 5, review: 'My chain was bone dry and they caught two stiff links. Very thorough inspection for the price.' },
      { name: 'Suresh D.', vehicle: 'Royal Enfield', rating: 4, review: 'Good service. The wheel alignment correction made the bike track much straighter on the highway.' },
    ],

    faqs: [
      { q: 'What type of chain lube should I use?', a: 'Always use a lube rated for O-ring or X-ring chains. Avoid WD-40 — it\'s a water displacer, not a lubricant, and it damages the rubber rings that seal the factory grease inside each link.' },
      { q: 'How do I check chain tension myself?', a: 'With the bike on the centre stand (or paddock stand), push the chain up and down at the midpoint between sprockets. Total free play should be 20–35mm (check your owner\'s manual for the exact spec).' },
      { q: 'Do I need to replace the sprockets with the chain?', a: 'Ideally yes. Chain and sprockets wear together. A new chain on worn sprockets will wear out quickly and the wear pattern mismatch can cause jumping. We recommend replacing all three as a set.' },
    ],

    related: ['brake-service', 'engine-oil', 'engine-tuning'],
  },

  /* ── 6. Engine Tuning ──────────────────────────────────────────────── */
  {
    id: 'engine-tuning',
    icon: Gauge,
    title: 'Engine Tuning',
    category: 'Performance',
    duration: '90–180 min',
    price: '₹1,499',
    priceRange: '₹1,499 – ₹8,999',
    desc: 'Complete engine tuning and performance optimization for smoother rides, better mileage, and enhanced reliability.',

    overview:
      'Engine tuning is the art and science of optimising every parameter that affects how your engine produces power. On modern fuel-injected bikes, this means ECU remapping — adjusting fuel maps, ignition timing curves, throttle response characteristics, and idle speed with precision that factory settings simply can\'t achieve for every riding style and condition. On carburetted bikes, it means jetting, needle height, air screw, and idle adjustment. The result is an engine that breathes and fires exactly as the laws of physics permit — delivering maximum power, best fuel economy, and the crispest throttle response your engine is capable of.',

    included: [
      { label: 'ECU baseline data backup', icon: Shield },
      { label: 'Fuel map optimisation (rich/lean correction)', icon: Droplets },
      { label: 'Ignition timing advance curve adjustment', icon: Zap },
      { label: 'Idle speed & mixture fine-tuning', icon: Gauge },
      { label: 'Throttle body synchronisation (multi-cylinder)', icon: Activity },
      { label: 'Spark plug condition inspection', icon: CheckCircle2 },
      { label: 'Air filter condition check', icon: Wrench },
      { label: 'Before/after dyno-equivalent report', icon: TrendingUp },
    ],

    parts: [
      { name: 'Spark Plug', purpose: 'Ignition of the fuel-air mixture', life: '8,000–12,000 km', color: '#F59E0B' },
      { name: 'Air Filter', purpose: 'Filters intake air for the engine', life: '10,000–15,000 km', color: '#10B981' },
      { name: 'Fuel Injector', purpose: 'Atomises fuel into the intake', life: '40,000+ km', color: '#6366F1' },
    ],

    benefits: [
      { icon: Gauge, title: 'More Power', desc: 'Optimised fuel and ignition timing unlocks the full potential already engineered into your engine.' },
      { icon: TrendingUp, title: 'Better Mileage', desc: 'Correct fuel mapping eliminates over-fuelling — a common factory setting to pass emission tests.' },
      { icon: Activity, title: 'Crisp Throttle', desc: 'Eliminates flat spots, hesitation, and the "surging" common on factory ECU maps at partial throttle.' },
      { icon: Zap, title: 'Smoother Idle', desc: 'Proper idle mixture ensures a stable, consistent idle — no stalling at junctions or slow speed.' },
    ],

    warnings: [
      { sign: 'Flat spot or hesitation when opening throttle', severity: 'high' },
      { sign: 'Bike surges or hunts at constant throttle', severity: 'high' },
      { sign: 'Fuel economy significantly worse than spec', severity: 'medium' },
      { sign: 'Rough or lumpy idle that won\'t smooth out', severity: 'medium' },
      { sign: 'Recent exhaust or air filter modification', severity: 'medium' },
      { sign: 'Bike runs rich (black sooty exhaust smoke)', severity: 'high' },
    ],

    interval: { km: 'After every major modification', months: 'Every 2 years', note: 'Essential after fitting an aftermarket exhaust, air filter, or camshaft. Also recommended when moving between significantly different altitude / climate zones.' },

    process: [
      { step: 1, title: 'Baseline Assessment', desc: 'Current ECU map backed up. Plug condition checked as an indicator of current running conditions (rich/lean/normal).' },
      { step: 2, title: 'Air/Fuel Ratio Check', desc: 'Wideband O2 sensor connected to exhaust. Engine run across RPM range while live AFR data is recorded.' },
      { step: 3, title: 'Ignition Timing Analysis', desc: 'Timing light used to verify actual ignition timing matches ECU map. Advance/retard corrections identified.' },
      { step: 4, title: 'Map Adjustment', desc: 'Fuel and timing maps adjusted in small increments. Each change verified with live data before saving.' },
      { step: 5, title: 'Road / Load Test', desc: 'Bike ridden through all throttle positions and RPM ranges. Fine adjustments made based on real-world feel.' },
      { step: 6, title: 'Final Verification', desc: 'Full AFR sweep repeated after tuning. Results compared to baseline. Report generated showing improvements.' },
    ],

    bikes: BIKES,

    pricing: [
      { tier: 'Carburettor Tune', price: '₹1,499', note: 'Jetting, needle, idle — carb bikes only', recommended: false },
      { tier: 'ECU Remap (Base)', price: '₹3,999', note: 'FI bikes — fuel map + ignition + idle', recommended: true },
      { tier: 'Full Performance Tune', price: '₹8,999', note: 'Remap + spark plugs + air filter + exhaust optimisation', recommended: false },
    ],

    reviews: [
      { name: 'Raj K.', vehicle: 'KTM 390 Duke', rating: 5, review: 'The mid-range surge that was driving me crazy is completely gone. Power delivery is so much smoother now.' },
      { name: 'Priya M.', vehicle: 'Honda CBR 650R', rating: 5, review: 'Got a stage 1 remap after my Akrapovic exhaust. The difference is massive. Should have done this immediately.' },
      { name: 'Aryan S.', vehicle: 'Triumph Street Triple', rating: 5, review: 'Best money I\'ve spent on the bike. The throttle response at partial opening is completely transformed.' },
    ],

    faqs: [
      { q: 'Will tuning void my warranty?', a: 'ECU remapping typically voids the powertrain warranty on the engine management system. For bikes still under warranty, we offer "safe" tunes that stay within manufacturer tolerances and are reversible.' },
      { q: 'Can you tune a stock bike with no modifications?', a: 'Yes! Factory ECU maps are often conservative for emissions compliance. Even a stock bike benefits from tuning, especially if you\'ve changed altitudes or climate zones since the map was written.' },
      { q: 'What\'s the difference between a remap and a piggyback tune?', a: 'A remap modifies the original ECU map directly. A piggyback device intercepts and alters signals between the ECU and sensors. We prefer remaps as they\'re more accurate and have no additional hardware to fail.' },
    ],

    related: ['engine-diagnostics', 'engine-oil', 'brake-service'],
  },
];

// ─── Lookup helper ────────────────────────────────────────────────────────────
export function getServiceById(id) {
  return SERVICES_DATA.find((s) => s.id === id) ?? null;
}
