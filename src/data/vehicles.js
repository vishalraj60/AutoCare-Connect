// Mock vehicle data for Customer dashboard
export const vehicles = [
  {
    id: 'RE-CLASSIC-350-2022',
    make: 'Royal Enfield',
    model: 'Classic 350',
    year: 2022,
    licensePlate: 'KA-01-AB-1234',
    vin: 'ME3U3S5C8N*******',
    mileage: 12500,
    status: 'in-service', // 'in-service'|'ready'|'booked'|'idle'
    primary: true,
    jobId: 'AC-8829',
    image: null,
  },
  {
    id: 'KTM-DUKE-390-2020',
    make: 'KTM',
    model: 'Duke 390',
    year: 2020,
    licensePlate: 'KA-03-EF-5678',
    vin: 'MD2A12HK2K*******',
    mileage: 28200,
    status: 'ready',
    primary: false,
    jobId: null,
    image: null,
  },
];

export const customerStats = {
  nextAppointment: 'Oct 24, 10:00 AM',
  registeredVehicles: 2,
  pendingInvoices: 0,
};
