// Mock workshop bay data for Admin dashboard
export const bays = [
  {
    id: 1,
    status: 'occupied', // 'occupied'|'cleaning'|'available'
    vehicle: 'Royal Enfield Himalayan',
    service: 'Gearbox Overhaul',
    mechanic: 'M. Smith',
    progress: 80,
  },
  {
    id: 2,
    status: 'cleaning',
    vehicle: 'Empty',
    service: 'Prep for next booking',
    mechanic: null,
    progress: 0,
  },
  {
    id: 3,
    status: 'occupied',
    vehicle: 'TVS Apache RTR 160',
    service: 'Oil Change',
    mechanic: 'J. Doe',
    progress: 70,
  },
];
