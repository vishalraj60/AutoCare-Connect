import React, { useState, useEffect } from 'react';
import { Calendar, UserCheck, UserX, AlertCircle, Download, Printer, Plus } from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import AttendanceTable from '../../../components/mechanics/AttendanceTable';
import { getAttendanceByDate, markAttendance } from '../../../services/attendanceService';
import { useMechanic } from '../../../context/MechanicContext';

export default function Attendance() {
  const { mechanics } = useMechanic();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMarkModal, setShowMarkModal] = useState(false);
  const [selectedMech, setSelectedMech] = useState('');
  const [checkInTime, setCheckInTime] = useState('08:00');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [isLate, setIsLate] = useState(false);
  const [isOT, setIsOT] = useState(false);
  const [status, setStatus] = useState('present');

  useEffect(() => {
    loadAttendance();
  }, [date, mechanics]);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await getAttendanceByDate(date);
      // Map missing mechanics to absent by default if no record exists for that day
      const mapped = mechanics.map(m => {
        const rec = data.find(r => r.mechanicId === m.id);
        if (rec) return rec;
        return {
          id: `ATT-${m.id}-${date}`,
          mechanicId: m.id,
          mechanicName: m.name,
          date,
          checkIn: null,
          checkOut: null,
          hours: null,
          late: false,
          overtime: false,
          status: 'absent',
        };
      });
      setRecords(mapped);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const mech = mechanics.find(m => m.id === selectedMech);
    if (!mech) return;

    await markAttendance({
      mechanicId: selectedMech,
      mechanicName: mech.name,
      date,
      checkIn: status === 'present' ? checkInTime : null,
      checkOut: status === 'present' ? checkOutTime || null : null,
      late: isLate,
      overtime: isOT,
      status,
    });

    setShowMarkModal(false);
    loadAttendance();
  };

  const openMark = (rec) => {
    setSelectedMech(rec.mechanicId);
    setCheckInTime(rec.checkIn || '08:00');
    setCheckOutTime(rec.checkOut || '');
    setIsLate(rec.late);
    setIsOT(rec.overtime);
    setStatus(rec.status);
    setShowMarkModal(true);
  };

  // Stats summaries
  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount  = records.filter(r => r.status === 'absent').length;
  const onLeaveCount = records.filter(r => r.status === 'on-leave').length;
  const lateCount    = records.filter(r => r.late).length;

  return (
    <AppShell>
      <TopBar user={{ name: 'Admin', initials: 'AD' }} showNewBooking={false}>
        <Button variant="accent" size="sm" onClick={() => {
          setSelectedMech(mechanics[0]?.id || '');
          setCheckInTime('08:00');
          setCheckOutTime('');
          setIsLate(false);
          setIsOT(false);
          setStatus('present');
          setShowMarkModal(true);
        }}>
          <Plus size={14} /> Mark Attendance
        </Button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Attendance Registry</h1>
            <p className="text-text-secondary text-sm">Track clock-in, late arrivals and working hours</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="appearance-none border border-border bg-white text-sm font-semibold rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button className="btn-outline text-xs gap-1.5" onClick={() => window.print()}><Printer size={13} /> Print List</button>
          </div>
        </div>

        {/* Status Counts Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <CountCard title="Present Today" value={presentCount} icon={UserCheck} color="text-green-600 bg-green-50 border-green-100" />
          <CountCard title="Absent" value={absentCount} icon={UserX} color="text-red-500 bg-red-50 border-red-100" />
          <CountCard title="On Leave" value={onLeaveCount} icon={Calendar} color="text-blue-600 bg-blue-50 border-blue-100" />
          <CountCard title="Late Arrivals" value={lateCount} icon={AlertCircle} color="text-amber-600 bg-amber-50 border-amber-100" />
        </div>

        {/* Main Table */}
        <Card padding={false}>
          {loading ? (
            <div className="p-8 text-center text-text-secondary animate-pulse">Loading list...</div>
          ) : (
            <AttendanceTable records={records} onMark={openMark} />
          )}
        </Card>
      </main>

      {/* Mark modal dialog */}
      {showMarkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h2 className="font-bold text-text-primary text-base">Mark Attendance</h2>
              <button type="button" onClick={() => setShowMarkModal(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
            </div>

            <div className="space-y-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-secondary uppercase">Select Mechanic</label>
                <select value={selectedMech} onChange={e => setSelectedMech(e.target.value)} className="field-input">
                  {mechanics.map(m => <option key={m.id} value={m.id}>{m.name} ({m.id})</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-text-secondary uppercase">Attendance Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="field-input">
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>

              {status === 'present' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-text-secondary uppercase">Check In</label>
                      <input type="time" value={checkInTime} onChange={e => setCheckInTime(e.target.value)} className="field-input font-mono" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-text-secondary uppercase">Check Out</label>
                      <input type="time" value={checkOutTime} onChange={e => setCheckOutTime(e.target.value)} className="field-input font-mono" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-1">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary cursor-pointer select-none">
                      <input type="checkbox" checked={isLate} onChange={e => setIsLate(e.target.checked)} className="w-4 h-4 rounded text-accent cursor-pointer" />
                      Late Arrival
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-text-primary cursor-pointer select-none">
                      <input type="checkbox" checked={isOT} onChange={e => setIsOT(e.target.checked)} className="w-4 h-4 rounded text-accent cursor-pointer" />
                      Overtime Shift
                    </label>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1 justify-center" onClick={() => setShowMarkModal(false)}>Cancel</Button>
              <Button type="submit" variant="accent" className="flex-1 justify-center">Save Status</Button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  );
}

function CountCard({ title, value, icon: Icon, color }) {
  return (
    <div className={`bg-white border rounded-xl p-4 flex items-center justify-between shadow-card hover:-translate-y-0.5 transition-transform duration-200`}>
      <div>
        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-text-primary mt-1">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
        <Icon size={18} />
      </div>
    </div>
  );
}
