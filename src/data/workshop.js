// ─── Workshop Data ────────────────────────────────────────────────────────────
// Structure designed to support multiple workshop branches in the future.
// Each branch can be fetched by ID and rendered in ContactWorkshopModal.

export const WORKSHOPS = [
  {
    id: 'coimbatore-mg-road',
    name: 'BikeCare Connect',
    subtitle: 'Authorized Service Center',
    address: {
      line1: '123 MG Road',
      line2: 'Coimbatore',
      line3: 'Tamil Nadu, India',
      pincode: '641001',
    },
    phone: '+91 98765 43210',
    whatsapp: '+919876543210',
    email: 'support@bikecareconnect.com',
    emergency: '1800-123-4567',
    rating: 4.9,
    reviews: 312,
    distance: '3.2 km',
    verified: true,
    status: 'open', // 'open' | 'closed'
    closesAt: '7:00 PM',
    workingHours: [
      { days: 'Monday – Saturday', hours: '9:00 AM – 7:00 PM' },
      { days: 'Sunday', hours: 'Closed' },
    ],
    coordinates: {
      lat: 11.0168,
      lng: 76.9558,
      mapsUrl: 'https://maps.google.com/?q=11.0168,76.9558',
      embedSrc: 'https://maps.google.com/maps?q=11.0168,76.9558&output=embed',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=11.0168,76.9558',
    },
    social: {
      facebook: 'https://facebook.com/',
      instagram: 'https://instagram.com/',
      youtube: 'https://youtube.com/',
      twitter: 'https://x.com/',
      linkedin: 'https://linkedin.com/',
    },
    facilities: [
      { label: 'Certified Mechanics', icon: 'wrench' },
      { label: 'Genuine Spare Parts', icon: 'package' },
      { label: 'Pickup & Drop', icon: 'truck' },
      { label: 'Express Service', icon: 'zap' },
      { label: 'Digital Payments', icon: 'credit-card' },
      { label: 'Waiting Lounge', icon: 'sofa' },
      { label: 'Free Wi-Fi', icon: 'wifi' },
      { label: 'Customer Parking', icon: 'parking' },
    ],
    faqs: [
      {
        q: 'How long does a standard service take?',
        a: 'Most standard services (oil change, brake check, chain lube) are completed within 45–90 minutes. Major engine work or diagnostics may take 2–4 hours. We always call you before starting extended work.',
      },
      {
        q: 'Can I wait at the workshop during service?',
        a: 'Yes! Our waiting lounge has comfortable seating, free Wi-Fi, beverages, and live service tracking screens so you can watch the progress in real time.',
      },
      {
        q: 'Do you offer pickup & drop service?',
        a: 'Yes, we offer free pickup & drop within a 10 km radius for all booked services. Contact us at least 2 hours before your required time to schedule.',
      },
      {
        q: 'Can I reschedule or cancel my booking?',
        a: 'Absolutely. Rescheduling is free up to 2 hours before the appointment. Same-day cancellations are also accepted — just call or WhatsApp us and we\'ll handle it right away.',
      },
    ],
  },
];

// ─── Default Workshop ─────────────────────────────────────────────────────────
export const DEFAULT_WORKSHOP = WORKSHOPS[0];
