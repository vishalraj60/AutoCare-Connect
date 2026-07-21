// ─── Mechanic Service — API-ready CRUD layer ─────────────────────────────────
// Replace the mock implementations below with real fetch() calls when backend is ready.
// API contract:
//   GET    /api/mechanics            → getMechanics()
//   GET    /api/mechanics/:id        → getMechanicById()
//   POST   /api/mechanics            → addMechanic()
//   PUT    /api/mechanics/:id        → updateMechanic()
//   DELETE /api/mechanics/:id        → deleteMechanic()
//   POST   /api/mechanics/assign-job → assignJob()

import { mechanics as mockMechanics } from '../data/mechanics';

let _store = [...mockMechanics];
let _idCounter = _store.length + 1;

/** Generate next sequential mechanic ID */
export function generateMechanicId() {
  const next = String(_idCounter + 1).padStart(3, '0');
  return `MEC-${next}`;
}

/** Generate a random temp password */
export function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function getMechanics() {
  // FUTURE: return fetch('/api/mechanics').then(r => r.json());
  await delay(150);
  return [..._store];
}

export async function getMechanicById(id) {
  // FUTURE: return fetch(`/api/mechanics/${id}`).then(r => r.json());
  await delay(80);
  return _store.find(m => m.id === id) || null;
}

export async function addMechanic(data) {
  // FUTURE: return fetch('/api/mechanics', { method:'POST', body: JSON.stringify(data) }).then(r => r.json());
  await delay(200);
  _idCounter++;
  const newId = `MEC-${String(_idCounter).padStart(3, '0')}`;
  const tempPassword = generateTempPassword();
  const newMechanic = {
    id: newId,
    ...data,
    initials: data.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
    color: '#' + Math.floor(Math.random() * 0xAAAAAA + 0x333333).toString(16),
    currentJob: null,
    todaysJobs: 0,
    pendingJobs: 0,
    completedToday: 0,
    totalCompleted: 0,
    avgRating: 0,
    efficiency: 0,
    avgServiceTime: 0,
    revenue: 0,
    repeatCustomers: 0,
    mostServicedBrand: data.bikeBrands?.[0] || '-',
    inventoryUsage: { oilFilters: 0, brakePads: 0, sparkPlugs: 0, battery: 0, engineOil: 0, chainKits: 0, inventoryCost: 0 },
    attendance: { present: 0, absent: 0, late: 0, onLeave: 0, overtime: 0 },
    loginActivity: { lastLogin: null, device: null, browser: null, logoutTime: null },
    createdAt: new Date().toISOString(),
    _tempPassword: tempPassword,
  };
  _store = [..._store, newMechanic];
  return { mechanic: newMechanic, tempPassword };
}

export async function updateMechanic(id, data) {
  // FUTURE: return fetch(`/api/mechanics/${id}`, { method:'PUT', body: JSON.stringify(data) }).then(r => r.json());
  await delay(150);
  _store = _store.map(m => m.id === id ? { ...m, ...data, id } : m);
  return _store.find(m => m.id === id);
}

export async function deleteMechanic(id) {
  // FUTURE: return fetch(`/api/mechanics/${id}`, { method:'DELETE' });
  await delay(150);
  _store = _store.filter(m => m.id !== id);
  return { success: true };
}

export async function assignJob(mechanicId, jobData) {
  // FUTURE: return fetch('/api/mechanics/assign-job', { method:'POST', body: JSON.stringify({ mechanicId, jobData }) });
  await delay(100);
  _store = _store.map(m => m.id === mechanicId
    ? { ...m, status: 'working', currentJob: jobData, pendingJobs: (m.pendingJobs || 0) + 1 }
    : m
  );
  return { success: true };
}

export async function updateMechanicStatus(id, status) {
  return updateMechanic(id, { status });
}

export async function checkUsernameAvailable(username, excludeId = null) {
  await delay(50);
  return !_store.some(m => m.username === username && m.id !== excludeId);
}

export async function checkEmailAvailable(email, excludeId = null) {
  await delay(50);
  return !_store.some(m => m.email === email && m.id !== excludeId);
}

export async function checkPhoneAvailable(phone, excludeId = null) {
  await delay(50);
  return !_store.some(m => m.phone === phone && m.id !== excludeId);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
