// Mock bookings for Admin upcoming bookings table
export const bookings = [
  {
    id: 'BK-001',
    customer: { name: 'Alice Walker', initials: 'AW', color: '#0F2A4A' },
    vehicle: "KTM Duke 390 '20",
    serviceType: 'Full Service',
    time: '09:00 AM',
    mechanic: 'Sarah Jenkins',
    status: 'confirmed', // 'confirmed'|'in-progress'|'pending'|'cancelled'
  },
  {
    id: 'BK-002',
    customer: { name: 'Marcus Pierce', initials: 'MP', color: '#64748B' },
    vehicle: "Royal Enfield Classic 350 '22",
    serviceType: 'Brake Inspection',
    time: '10:30 AM',
    mechanic: 'Mike Torres',
    status: 'in-progress',
  },
  {
    id: 'BK-003',
    customer: { name: 'Sarah Chen', initials: 'SC', color: '#2563EB' },
    vehicle: "Yamaha YZF-R15 '21",
    serviceType: 'Oil Change',
    time: '12:00 PM',
    mechanic: 'J. Doe',
    status: 'pending',
  },
  {
    id: 'BK-004',
    customer: { name: 'David Kim', initials: 'DK', color: '#16A34A' },
    vehicle: "Ola S1 Pro '22",
    serviceType: 'Diagnostic',
    time: '02:00 PM',
    mechanic: 'M. Smith',
    status: 'confirmed',
  },
];

export const adminStats = {
  revenue: { current: '₹4.25L', previous: '₹3.80L', change: '+12%', trend: 'up' },
  activeBookings: { current: 18, dueToday: 8, change: '+3', trend: 'up' },
  mechanicUtilization: { percentage: 85, capacity: '17/20', trend: 'stable' },
};
