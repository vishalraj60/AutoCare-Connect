// Mock job records — shared source of truth for Mechanic + Customer views
export const jobs = [
  {
    id: 'AC-8829',
    vehicleId: 'BMW-X5-2022',
    bayNumber: 3,
    mechanicId: 'M-001',
    mechanicName: 'Mike Torres',
    status: 'in-service', // 'booked'|'diagnosis'|'parts-ordered'|'in-service'|'qc'|'complete'
    stages: [
      { id: 'diagnosis',    label: 'Diagnosis',     completed: true,  current: false },
      { id: 'parts-ordered',label: 'Parts Ordered', completed: true,  current: false },
      { id: 'in-service',   label: 'In Service',    completed: false, current: true  },
      { id: 'qc-check',     label: 'QC Check',      completed: false, current: false },
    ],
    clockedIn: '2h 15m',
    checklist: [
      { id: 'c1', title: 'Synthetic Oil Change',      subtitle: 'Filter included',    checked: true,  status: 'ok',      note: '' },
      { id: 'c2', title: 'Front Brake Pads',          subtitle: 'Rotors resurfaced',  checked: true,  status: 'worn',    note: '' },
      { id: 'c3', title: 'Tire Rotation & Balance',   subtitle: 'Check tread depth',  checked: false, status: 'pending', note: '' },
    ],
    photos: [
      { id: 'p1', label: 'Before: Brakes', type: 'before', src: null },
      { id: 'p2', label: 'Before: Filter', type: 'before', src: null },
    ],
    customer: {
      name: 'John Doe',
      initials: 'JD',
      email: 'john.d@example.com',
      phone: '+1 (555) 012-3456',
    },
    vehicle: {
      make: 'BMW',
      model: 'X5 xDrive40i',
      year: 2022,
      license: 'ABC-1234',
      vin: 'WBAJV4C0......',
      mileage: 45210,
      image: null,
    },
  },
];
