// Mock vehicle data for Customer dashboard
export const vehicles = [
  {
    id: 'BMW-X5-2022',
    make: 'BMW',
    model: 'X5',
    year: 2022,
    licensePlate: 'XYZ-9876',
    vin: 'WBAJB5C58N*******',
    mileage: 24500,
    status: 'in-service', // 'in-service'|'ready'|'booked'|'idle'
    primary: true,
    jobId: 'AC-8829',
    image: null,
  },
  {
    id: 'TOYOTA-CAMRY-2019',
    make: 'Toyota',
    model: 'Camry',
    year: 2019,
    licensePlate: 'ABC-5678',
    vin: '4T1B11HK2K*******',
    mileage: 58200,
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
