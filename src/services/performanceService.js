// ─── Performance Service ──────────────────────────────────────────────────────
// API contract:
//   GET /api/performance?mechanicId=X&period=daily|weekly|monthly|yearly
//   GET /api/performance/top?limit=5

import { mechanics as mockMechanics } from '../data/mechanics';

/** Generate weekly job data for charts */
function generateWeeklyData(base, variance = 0.3) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map(day => ({
    label: day,
    jobs: Math.max(1, Math.round(base + (Math.random() - 0.5) * base * variance)),
    revenue: Math.round((base * 1800 + (Math.random() - 0.5) * base * 800)),
    efficiency: Math.max(60, Math.min(100, Math.round(80 + (Math.random() - 0.5) * 20))),
  }));
}

/** Generate monthly data */
function generateMonthlyData(base) {
  return Array.from({ length: 12 }, (_, i) => ({
    label: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    jobs: Math.max(5, Math.round(base * 22 + (Math.random() - 0.5) * 30)),
    revenue: Math.round(base * 22 * 1800 * (0.8 + Math.random() * 0.4)),
    efficiency: Math.max(60, Math.min(100, Math.round(80 + (Math.random() - 0.5) * 15))),
  }));
}

export async function getPerformanceMetrics(mechanicId, period = 'weekly') {
  await delay(120);
  const mechanic = mockMechanics.find(m => m.id === mechanicId);
  if (!mechanic) return null;

  const avgDaily = mechanic.totalCompleted / Math.max(1, mechanic.experience * 250);

  return {
    mechanicId,
    period,
    data: period === 'monthly' ? generateMonthlyData(avgDaily) : generateWeeklyData(avgDaily),
    summary: {
      totalJobs: mechanic.totalCompleted,
      completedJobs: mechanic.totalCompleted,
      pendingJobs: mechanic.pendingJobs,
      cancelledJobs: Math.round(mechanic.totalCompleted * 0.02),
      avgServiceTime: mechanic.avgServiceTime,
      customerRating: mechanic.avgRating,
      revenue: mechanic.revenue,
      efficiency: mechanic.efficiency,
      repeatCustomers: mechanic.repeatCustomers,
      mostServicedBrand: mechanic.mostServicedBrand,
    },
  };
}

export async function getTopPerformers(limit = 5) {
  await delay(100);
  return [...mockMechanics]
    .sort((a, b) => b.avgRating - a.avgRating || b.efficiency - a.efficiency)
    .slice(0, limit)
    .map(m => ({
      id: m.id,
      name: m.name,
      initials: m.initials,
      color: m.color,
      avgRating: m.avgRating,
      efficiency: m.efficiency,
      totalCompleted: m.totalCompleted,
      revenue: m.revenue,
      skillLevel: m.skillLevel,
    }));
}

export async function getDashboardStats(mechanics) {
  await delay(80);
  const list = mechanics || mockMechanics;
  return {
    total: list.length,
    available: list.filter(m => m.status === 'available').length,
    working: list.filter(m => m.status === 'working').length,
    onLeave: list.filter(m => m.status === 'on-leave').length,
    offline: list.filter(m => m.status === 'offline').length,
    onBreak: list.filter(m => m.status === 'break').length,
    pendingJobs: list.reduce((s, m) => s + (m.pendingJobs || 0), 0),
    completedToday: list.reduce((s, m) => s + (m.completedToday || 0), 0),
    newlyAdded: list.filter(m => {
      const created = new Date(m.createdAt);
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
      return created >= cutoff;
    }).length,
    avgRating: parseFloat((list.reduce((s, m) => s + m.avgRating, 0) / list.length).toFixed(1)),
    avgTime: parseFloat((list.reduce((s, m) => s + m.avgServiceTime, 0) / list.length).toFixed(1)),
    totalRevenue: list.reduce((s, m) => s + m.revenue, 0),
    avgEfficiency: Math.round(list.reduce((s, m) => s + m.efficiency, 0) / list.length),
  };
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
