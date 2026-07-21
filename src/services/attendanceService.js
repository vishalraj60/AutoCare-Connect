// ─── Attendance Service ───────────────────────────────────────────────────────
// API contract:
//   GET  /api/attendance?date=YYYY-MM-DD  → getAttendanceByDate()
//   POST /api/attendance                  → markAttendance()
//   GET  /api/attendance/monthly?mechanicId=X&month=YYYY-MM → getMonthlyAttendance()

import { attendanceRecords as mockRecords } from '../data/mechanics';

let _records = [...mockRecords];

export async function getAttendanceByDate(date) {
  await delay(100);
  return _records.filter(r => r.date === date);
}

export async function markAttendance(record) {
  await delay(100);
  const existing = _records.find(r => r.mechanicId === record.mechanicId && r.date === record.date);
  if (existing) {
    _records = _records.map(r =>
      r.mechanicId === record.mechanicId && r.date === record.date
        ? { ...r, ...record }
        : r
    );
  } else {
    _records = [..._records, { id: `ATT-${Date.now()}`, ...record }];
  }
  return { success: true };
}

export async function getMonthlyAttendance(mechanicId, month) {
  // month = 'YYYY-MM'
  await delay(80);
  return _records.filter(r => r.mechanicId === mechanicId && r.date.startsWith(month));
}

export async function getAllAttendanceToday() {
  const today = new Date().toISOString().split('T')[0];
  return getAttendanceByDate(today);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}
