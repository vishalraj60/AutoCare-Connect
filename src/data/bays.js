// Mock workshop bay data for Admin dashboard
export const bays = [
  {
    id: 1,
    status: 'occupied', // 'occupied'|'cleaning'|'available'
    vehicle: 'Ford F-150 (V8)',
    service: 'Transmission Rebuild',
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
    vehicle: 'Honda Civic',
    service: 'Oil Change',
    mechanic: 'J. Doe',
    progress: 70,
  },
];
