import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  User, Briefcase, Calendar, BarChart2, Package, FileText,
  Clock, Star, Settings, ShieldAlert, Check, X, MapPin,
  Phone, Mail, CalendarDays, Key, Trash2, Edit, Award, Bike,
  Users, DollarSign, Zap, ChevronRight, Activity, Paperclip,
} from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import MechanicStatusBadge from '../../../components/mechanics/MechanicStatusBadge';
import MechanicTimeline from '../../../components/mechanics/MechanicTimeline';
import { BarChart } from '../../../components/mechanics/PerformanceChart';
import { useMechanic } from '../../../context/MechanicContext';
import { getPerformanceMetrics } from '../../../services/performanceService';
import { activityLogs } from '../../../data/mechanics';

const TABS = [
  { id: 'overview',   label: 'Overview',      icon: User },
  { id: 'jobs',       label: 'Jobs',          icon: Bike },
  { id: 'performance',label: 'Performance',   icon: BarChart2 },
  { id: 'attendance', label: 'Attendance',    icon: CalendarDays },
  { id: 'inventory',  label: 'Inventory',     icon: Package },
  { id: 'documents',  label: 'Documents',     icon: FileText },
  { id: 'activity',   label: 'Activity Log',  icon: Activity },
];

export default function MechanicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMechanicById, deleteMechanic } = useMechanic();

  const [mechanic, setMechanic] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceData, setPerformanceData] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(false);

  useEffect(() => {
    const data = getMechanicById(id);
    if (data) {
      setMechanic(data);
      getPerformanceMetrics(id, 'weekly').then(setPerformanceData);
    }
  }, [id, getMechanicById]);

  if (!mechanic) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Loading Profile...</p>
        </div>
      </AppShell>
    );
  }

  // Attendance stats helper
  const attendancePercentage = Math.round(
    (mechanic.attendance.present / (mechanic.attendance.present + mechanic.attendance.absent || 1)) * 100
  );

  return (
    <AppShell>
      <TopBar user={{ name: 'Admin', initials: 'AD' }} showNewBooking={false}>
        <button onClick={() => navigate('/admin/mechanics/list')} className="btn-outline text-xs">
          ← All Mechanics
        </button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        {/* Header Profile Area */}
        <div className="bg-white border border-border rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg"
            style={{ background: mechanic.color }}>
            {mechanic.initials}
          </div>

          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
              <h1 className="text-2xl font-black text-text-primary truncate">{mechanic.name}</h1>
              <MechanicStatusBadge status={mechanic.status} size="md" />
            </div>
            <p className="text-sm text-text-secondary font-medium mb-3">
              {mechanic.skillLevel} · ID: <span className="font-mono font-semibold">{mechanic.id}</span>
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs text-text-secondary font-semibold">
              <div className="flex items-center gap-1.5"><Mail size={13} /> {mechanic.email}</div>
              <div className="flex items-center gap-1.5"><Phone size={13} /> {mechanic.phone}</div>
              <div className="flex items-center gap-1.5"><Award size={13} /> {mechanic.experience} Yrs Experience</div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => navigate(`/admin/mechanics/${mechanic.id}/edit`)}>
              <Edit size={14} /> Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => setDeleteTarget(true)}>
              <Trash2 size={14} /> Delete
            </Button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-border/80 gap-6 mb-6 overflow-x-auto scrollbar-none">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  active ? 'border-accent text-accent' : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content boxes */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {/* Personal Info */}
              <Card>
                <h3 className="font-bold text-text-primary text-base mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <InfoItem label="Full Name" value={mechanic.name} />
                  <InfoItem label="Username" value={`@${mechanic.username}`} />
                  <InfoItem label="Gender" value={mechanic.gender} />
                  <InfoItem label="Date of Birth" value={mechanic.dob} />
                  <InfoItem label="Blood Group" value={mechanic.bloodGroup || '—'} />
                  <InfoItem label="Emergency Contact" value={mechanic.emergencyContact || '—'} />
                  <InfoItem label="Address" value={mechanic.address} className="col-span-2" />
                </div>
              </Card>

              {/* Specializations & Bike Brands */}
              <Card>
                <h3 className="font-bold text-text-primary text-base mb-4">Expertise & Certifications</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mechanic.specializations.map(s => (
                        <span key={s} className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Bike Brand Expertise</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mechanic.bikeBrands.map(b => (
                        <span key={b} className="bg-orange-50 text-orange-700 border border-orange-100 text-xs font-semibold px-2.5 py-1 rounded-full">{b}</span>
                      ))}
                    </div>
                  </div>
                  {mechanic.certificates.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Certificates</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {mechanic.certificates.map(c => (
                          <div key={c.number} className="bg-slate-50 border border-border p-3 rounded-xl flex items-start gap-2.5">
                            <Award size={18} className="text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-bold text-sm text-text-primary">{c.name}</p>
                              <p className="text-[10px] text-text-secondary">No: {c.number} · Exp: {c.expiry}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right sidebar info */}
            <div className="space-y-6">
              {/* Employment */}
              <Card>
                <h3 className="font-bold text-text-primary text-base mb-4">Employment Details</h3>
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-text-secondary font-medium">Joining Date</span>
                    <span className="text-text-primary font-bold">{mechanic.joiningDate}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-text-secondary font-medium">Salary</span>
                    <span className="text-text-primary font-bold">₹{mechanic.salary.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-text-secondary font-medium">Shift</span>
                    <span className="text-text-primary font-bold">{mechanic.shift}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/60 pb-2">
                    <span className="text-text-secondary font-medium">Weekly Off</span>
                    <span className="text-text-primary font-bold">{mechanic.weeklyOff}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-text-secondary font-medium">Break Time</span>
                    <span className="text-text-primary font-bold">{mechanic.breakTime}</span>
                  </div>
                </div>
              </Card>

              {/* Performance Cards */}
              <Card>
                <h3 className="font-bold text-text-primary text-base mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-blue-50/50 rounded-xl p-3 border border-blue-100">
                    <p className="text-2xl font-black text-blue-600">{mechanic.efficiency}%</p>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">Efficiency</p>
                  </div>
                  <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100">
                    <p className="text-2xl font-black text-amber-600">{mechanic.avgRating}★</p>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">Rating</p>
                  </div>
                  <div className="bg-green-50/50 rounded-xl p-3 border border-green-100">
                    <p className="text-2xl font-black text-green-600">{mechanic.totalCompleted}</p>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">Jobs Completed</p>
                  </div>
                  <div className="bg-purple-50/50 rounded-xl p-3 border border-purple-100">
                    <p className="text-2xl font-black text-purple-600">{attendancePercentage}%</p>
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mt-0.5">Attendance</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <Card padding={false}>
            <div className="px-5 py-4 border-b border-border">
              <h3 className="font-bold text-text-primary text-base">Assigned Service Jobs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {['Job ID', 'Vehicle', 'Customer', 'Service Requested', 'Completed Date', 'Rating'].map(h => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary py-3 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mechanic.totalCompleted === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-text-secondary">No jobs recorded.</td>
                    </tr>
                  ) : (
                    // Render 2 mockup rows based on actual brand expertise
                    [
                      { id: 'AC-8822', model: `${mechanic.mostServicedBrand} Classic`, customer: 'Amit Kumar', service: 'Chain cleaning and oil change', date: 'Yesterday', rating: mechanic.avgRating },
                      { id: 'AC-8819', model: `${mechanic.mostServicedBrand} Cruiser`, customer: 'Vipin Das', service: 'Brake pad replacement & tune-up', date: '3 days ago', rating: 4.5 },
                    ].map(j => (
                      <tr key={j.id} className="border-b border-border/60 hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-xs text-accent">{j.id}</td>
                        <td className="py-3.5 px-4 text-sm font-semibold text-text-primary">{j.model}</td>
                        <td className="py-3.5 px-4 text-sm text-text-primary">{j.customer}</td>
                        <td className="py-3.5 px-4 text-sm text-text-secondary">{j.service}</td>
                        <td className="py-3.5 px-4 text-sm text-text-secondary">{j.date}</td>
                        <td className="py-3.5 px-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star size={11} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold">{j.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'performance' && (
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <h3 className="font-bold text-text-primary text-base mb-4">Jobs Completed — This Week</h3>
              {performanceData ? (
                <BarChart data={performanceData.data} label="jobs" color={mechanic.color} />
              ) : (
                <div className="h-40 flex items-center justify-center text-text-secondary">Loading graph...</div>
              )}
            </Card>
            <div className="space-y-6">
              <Card>
                <h3 className="font-bold text-text-primary text-base mb-4">Analytics Metrics</h3>
                <div className="space-y-4">
                  <MetricRow label="Jobs Efficiency" value={`${mechanic.efficiency}%`} />
                  <MetricRow label="Avg Completion Time" value={`${mechanic.avgServiceTime} hrs`} />
                  <MetricRow label="Estimated Revenue" value={`₹${mechanic.revenue.toLocaleString()}`} />
                  <MetricRow label="Repeat Customers" value={`${mechanic.repeatCustomers}%`} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <h3 className="font-bold text-text-primary text-base mb-4">Attendance Log</h3>
              <div className="space-y-2.5">
                {[
                  { date: 'Today, 20 Jul', status: mechanic.status === 'offline' ? 'Absent' : 'Checked In', time: mechanic.status === 'offline' ? '—' : '08:05 AM', checkOut: '—' },
                  { date: 'Yesterday, 19 Jul', status: 'Checked Out', time: '08:00 AM', checkOut: '05:30 PM' },
                  { date: '18 Jul, 2026', status: 'Checked Out', time: '08:12 AM', checkOut: '05:30 PM' },
                  { date: '17 Jul, 2026', status: 'Checked Out', time: '07:55 AM', checkOut: '05:45 PM' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-bold text-sm text-text-primary">{l.date}</p>
                      <p className="text-xs text-text-secondary">Time check: {l.time} to {l.checkOut}</p>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      l.status.includes('Out') || l.status.includes('In') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>{l.status}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-text-primary text-base mb-4">Monthly Summary</h3>
              <div className="space-y-4">
                <MetricRow label="Present Days" value={`${mechanic.attendance.present} days`} />
                <MetricRow label="Absent Days" value={`${mechanic.attendance.absent} days`} />
                <MetricRow label="Late Arrivals" value={`${mechanic.attendance.late} times`} />
                <MetricRow label="Overtime Hours" value={`${mechanic.attendance.overtime} hrs`} />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'inventory' && (
          <Card>
            <h3 className="font-bold text-text-primary text-base mb-5">Inventory Spares Consumption</h3>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-slate-50 border border-border rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-text-primary">₹{mechanic.inventoryUsage.inventoryCost.toLocaleString()}</p>
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mt-1">Total Spares Cost</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
              <MetricRow label="Engine Oil Used" value={`${mechanic.inventoryUsage.engineOil} L`} />
              <MetricRow label="Oil Filters Used" value={`${mechanic.inventoryUsage.oilFilters} units`} />
              <MetricRow label="Brake Pads Replaced" value={`${mechanic.inventoryUsage.brakePads} pairs`} />
              <MetricRow label="Spark Plugs" value={`${mechanic.inventoryUsage.sparkPlugs} units`} />
              <MetricRow label="Batteries" value={`${mechanic.inventoryUsage.battery} units`} />
              <MetricRow label="Chain Kits" value={`${mechanic.inventoryUsage.chainKits} units`} />
            </div>
          </Card>
        )}

        {activeTab === 'documents' && (
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-text-primary text-base">Verification Documents</h3>
              <button className="btn-outline text-xs flex items-center gap-1.5"><Paperclip size={13} /> Upload Document</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Aadhaar Card', size: '1.2 MB', verified: true },
                { name: 'PAN Card', size: '840 KB', verified: true },
                { name: 'Driving License', size: '2.1 MB', verified: true },
                { name: 'ITI Certificate / Qualification', size: '3.4 MB', verified: true },
              ].map(d => (
                <div key={d.name} className="border border-border p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-text-secondary"><FileText size={18} /></div>
                    <div>
                      <p className="font-bold text-sm text-text-primary">{d.name}</p>
                      <p className="text-xs text-text-secondary">{d.size}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">Verified</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'activity' && (
          <Card>
            <h3 className="font-bold text-text-primary text-base mb-5">Timeline Actions (Today)</h3>
            <MechanicTimeline events={[
              { id: '1', type: 'check-in', time: '08:05 AM', label: 'Clocked In' },
              { id: '2', type: 'job-assigned', time: '08:20 AM', label: `Job assigned for ${mechanic.mostServicedBrand}` },
              { id: '3', type: 'job-started', time: '08:30 AM', label: 'Started Service Work' },
              { id: '4', type: 'break', time: '01:00 PM', label: 'Went on Lunch Break' },
              { id: '5', type: 'break-end', time: '01:30 PM', label: 'Resumed Work' },
            ]} />
          </Card>
        )}
      </main>

      {/* Delete Conf */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h2 className="font-bold text-text-primary text-lg mb-1">Delete {mechanic.name}?</h2>
            <p className="text-text-secondary text-sm mb-5">
              Are you sure you want to delete this mechanic profile? All records will be removed.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 justify-center" onClick={() => setDeleteTarget(false)}>Cancel</Button>
              <Button variant="danger" className="flex-1 justify-center" onClick={async () => {
                await deleteMechanic(mechanic.id);
                navigate('/admin/mechanics/list');
              }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function InfoItem({ label, value, className = '' }) {
  return (
    <div className={className}>
      <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-text-primary font-semibold">{value}</p>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-2">
      <span className="text-text-secondary font-medium">{label}</span>
      <span className="text-text-primary font-bold">{value}</span>
    </div>
  );
}
