import { bikes as mockBikes } from '../data/bikes';

// In-memory store initialized from mock dataset
let bikeStore = [...mockBikes];

/**
 * Service layer for Bike Care Vehicle Management.
 * All functions return promises to emulate real API backend calls.
 */
export const bikeService = {
  /**
   * Fetch all bikes with optional filtering, search, sorting and pagination
   */
  async getBikes({
    search = '',
    brand = 'All',
    status = 'All',
    serviceType = 'All',
    sortBy = 'Newest',
    page = 1,
    pageSize = 12,
  } = {}) {
    await new Promise(resolve => setTimeout(resolve, 250)); // simulate latency

    let result = [...bikeStore];

    // Search filter (Owner Name, Reg Number, Model, Chassis, Engine, Brand)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(b =>
        b.owner?.name?.toLowerCase().includes(q) ||
        b.regNumber?.toLowerCase().includes(q) ||
        b.model?.toLowerCase().includes(q) ||
        b.chassisNumber?.toLowerCase().includes(q) ||
        b.engineNumber?.toLowerCase().includes(q) ||
        b.brand?.toLowerCase().includes(q) ||
        b.id?.toLowerCase().includes(q)
      );
    }

    // Brand Filter
    if (brand && brand !== 'All') {
      result = result.filter(b => b.brand?.toLowerCase() === brand.toLowerCase());
    }

    // Status Filter
    if (status && status !== 'All') {
      if (status === 'Pending') {
        result = result.filter(b => b.status === 'Pending Pickup' || b.status === 'Registered');
      } else {
        result = result.filter(b => b.status?.toLowerCase() === status.toLowerCase());
      }
    }

    // Service Type Filter
    if (serviceType && serviceType !== 'All') {
      result = result.filter(b => b.currentService?.toLowerCase() === serviceType.toLowerCase());
    }

    // Sorting
    switch (sortBy) {
      case 'Newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'Oldest':
        result.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case 'Mileage':
        result.sort((a, b) => (b.odometer || 0) - (a.odometer || 0));
        break;
      case 'Next Service Date':
        result.sort((a, b) => new Date(a.nextServiceDue || '2099-01-01') - new Date(b.nextServiceDue || '2099-01-01'));
        break;
      case 'Owner Name':
        result.sort((a, b) => (a.owner?.name || '').localeCompare(b.owner?.name || ''));
        break;
      default:
        break;
    }

    const totalCount = result.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const currentPage = Math.min(page, totalPages);
    const paginatedBikes = result.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Compute KPI stats across full stored dataset
    const stats = {
      totalRegistered: bikeStore.length,
      currentlyInService: bikeStore.filter(b => b.status === 'In Service').length,
      readyForDelivery: bikeStore.filter(b => b.status === 'Ready' || b.status === 'Pending Pickup').length,
      completedToday: bikeStore.filter(b => b.status === 'Completed' || b.status === 'Delivered').length,
      pendingBookings: bikeStore.filter(b => b.status === 'Registered').length,
      avgServiceTimeHours: 2.8,
      revenueToday: bikeStore.reduce((acc, b) => {
        const todayInv = b.invoices?.filter(i => i.date === new Date().toISOString().split('T')[0]);
        return acc + (todayInv?.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) || 0);
      }, 14850),
      revenueThisMonth: bikeStore.reduce((acc, b) => {
        return acc + (b.invoices?.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0) || 0);
      }, 184500),
    };

    return {
      bikes: paginatedBikes,
      totalCount,
      totalPages,
      currentPage,
      stats,
    };
  },

  /**
   * Fetch single bike by ID
   */
  async getBikeById(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const bike = bikeStore.find(b => b.id.toLowerCase() === id.toLowerCase());
    if (!bike) {
      throw new Error(`Bike with ID ${id} not found.`);
    }
    return { ...bike };
  },

  /**
   * Register a new bike with automatic ID generation & uniqueness checks
   */
  async registerBike(bikeData) {
    await new Promise(resolve => setTimeout(resolve, 300));

    // Uniqueness validation
    const regExists = bikeStore.some(b => b.regNumber.toUpperCase() === bikeData.regNumber.toUpperCase());
    if (regExists) {
      throw new Error(`Registration Number "${bikeData.regNumber}" already exists.`);
    }

    if (bikeData.engineNumber) {
      const engExists = bikeStore.some(b => b.engineNumber.toUpperCase() === bikeData.engineNumber.toUpperCase());
      if (engExists) {
        throw new Error(`Engine Number "${bikeData.engineNumber}" already exists.`);
      }
    }

    if (bikeData.chassisNumber) {
      const chassisExists = bikeStore.some(b => b.chassisNumber.toUpperCase() === bikeData.chassisNumber.toUpperCase());
      if (chassisExists) {
        throw new Error(`Chassis Number "${bikeData.chassisNumber}" already exists.`);
      }
    }

    // Auto generate Bike ID (e.g. BK-1027)
    const nextNum = 1000 + bikeStore.length + 1;
    const newId = `BK-${nextNum}`;

    const newBike = {
      id: newId,
      regNumber: bikeData.regNumber.toUpperCase().trim(),
      brand: bikeData.brand,
      model: bikeData.model,
      variant: bikeData.variant || 'Standard',
      year: parseInt(bikeData.year, 10) || new Date().getFullYear(),
      engineNumber: bikeData.engineNumber?.toUpperCase().trim() || `ENG-${newId}`,
      chassisNumber: bikeData.chassisNumber?.toUpperCase().trim() || `VIN-${newId}`,
      fuelType: bikeData.fuelType || 'Petrol',
      color: bikeData.color || 'Standard Color',
      odometer: parseInt(bikeData.odometer, 10) || 0,
      purchaseDate: bikeData.purchaseDate || new Date().toISOString().split('T')[0],
      insuranceExpiry: bikeData.insuranceExpiry || '2027-01-01',
      owner: {
        name: bikeData.ownerName,
        phone: bikeData.ownerPhone,
        email: bikeData.ownerEmail || `${bikeData.ownerName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        address: bikeData.ownerAddress || 'Bengaluru, KA',
        memberSince: new Date().toISOString().split('T')[0],
        totalVehicles: 1,
      },
      status: bikeData.currentService ? 'In Service' : 'Registered',
      serviceProgress: bikeData.currentService ? 15 : 0,
      currentService: bikeData.currentService || 'General Service',
      assignedMechanic: bikeData.preferredMechanic ? { id: 'MEC-CUSTOM', name: bikeData.preferredMechanic, avatar: 'M' } : null,
      estimatedDelivery: bikeData.expectedDelivery || 'Tomorrow',
      lastServiceDate: 'Not Serviced Yet',
      nextServiceDue: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      priority: bikeData.priority || 'Normal',
      image: bikeData.image || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      currentJob: bikeData.currentService ? {
        id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
        stage: 'Inspection',
        stages: [
          { name: 'Inspection', completed: false, active: true, timestamp: 'Just Started' },
          { name: 'Diagnosis', completed: false, timestamp: 'Pending' },
          { name: 'Repair', completed: false, timestamp: 'Pending' },
          { name: 'Quality Check', completed: false, timestamp: 'Pending' },
          { name: 'Completed', completed: false, timestamp: 'Pending' },
        ],
        partsUsed: [],
        labourCost: 800,
        estimatedTime: '2 Hours',
      } : null,
      serviceHistory: [],
      invoices: [],
      documents: [
        { name: 'Registration Certificate (RC)', type: 'RC', regNo: bikeData.regNumber, validTill: '2039-01-01', status: 'Valid', fileUrl: '#' },
      ],
      photos: { before: [], after: [], damage: [] },
      timeline: [
        { id: `T-${Date.now()}`, date: new Date().toLocaleString(), title: 'Bike Registered', description: `Registered by Admin. Owner: ${bikeData.ownerName}`, category: 'Registration', author: 'Admin' },
      ],
    };

    bikeStore = [newBike, ...bikeStore];
    return newBike;
  },

  /**
   * Update existing bike record
   */
  async updateBike(id, bikeData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const idx = bikeStore.findIndex(b => b.id.toLowerCase() === id.toLowerCase());
    if (idx === -1) throw new Error('Bike not found');

    bikeStore[idx] = { ...bikeStore[idx], ...bikeData };
    return { ...bikeStore[idx] };
  },

  /**
   * Delete bike record
   */
  async deleteBike(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    bikeStore = bikeStore.filter(b => b.id.toLowerCase() !== id.toLowerCase());
    return true;
  },

  /**
   * Assign or reassign mechanic to bike
   */
  async assignMechanic(bikeId, mechanic) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const bike = bikeStore.find(b => b.id.toLowerCase() === bikeId.toLowerCase());
    if (!bike) throw new Error('Bike not found');

    bike.assignedMechanic = mechanic;
    if (bike.status === 'Registered') {
      bike.status = 'In Service';
      bike.serviceProgress = 15;
    }
    bike.timeline = [
      {
        id: `T-${Date.now()}`,
        date: new Date().toLocaleString(),
        title: 'Mechanic Assigned',
        description: `Assigned to ${mechanic.name}`,
        category: 'Assignment',
        author: 'Admin',
      },
      ...(bike.timeline || []),
    ];
    return bike;
  },

  /**
   * Update current service stage
   */
  async updateServiceStage(bikeId, newStage) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const bike = bikeStore.find(b => b.id.toLowerCase() === bikeId.toLowerCase());
    if (!bike) throw new Error('Bike not found');

    const STAGE_PROGRESS = {
      'Inspection': 20,
      'Diagnosis': 40,
      'Repair': 70,
      'Quality Check': 90,
      'Completed': 100,
    };

    if (!bike.currentJob) {
      bike.currentJob = {
        id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
        stage: newStage,
        stages: [],
        partsUsed: [],
        labourCost: 800,
      };
    }

    bike.currentJob.stage = newStage;
    bike.serviceProgress = STAGE_PROGRESS[newStage] || 50;

    if (newStage === 'Completed') {
      bike.status = 'Ready';
      bike.estimatedDelivery = 'Ready for Pickup';
    }

    bike.timeline = [
      {
        id: `T-${Date.now()}`,
        date: new Date().toLocaleString(),
        title: `Service Stage Updated: ${newStage}`,
        description: `Job progress advanced to ${newStage}`,
        category: 'Stage Update',
        author: bike.assignedMechanic?.name || 'Mechanic',
      },
      ...(bike.timeline || []),
    ];

    return bike;
  },

  /**
   * Download CSV export file
   */
  exportToCSV(bikesList) {
    const headers = ['Bike ID', 'Registration No', 'Brand', 'Model', 'Owner Name', 'Owner Phone', 'Status', 'Current Service', 'Mechanic', 'Odometer (KM)', 'Insurance Expiry'];
    const rows = bikesList.map(b => [
      b.id,
      b.regNumber,
      b.brand,
      b.model,
      `"${b.owner?.name || ''}"`,
      `"${b.owner?.phone || ''}"`,
      b.status,
      `"${b.currentService || ''}"`,
      `"${b.assignedMechanic?.name || 'Unassigned'}"`,
      b.odometer || 0,
      b.insuranceExpiry || '',
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bikecare_registered_bikes_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
