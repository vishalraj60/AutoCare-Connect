import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, UserCheck, Wrench, Clock, CheckCircle, Plane, WifiOff,
  UserPlus, Star, Timer, DollarSign, Zap, Plus, List, BarChart2,
  Calendar, ChevronRight, TrendingUp, TrendingDown,
} from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import { useMechanic } from '../../../context/MechanicContext';
import { getDashboardStats } from '../../../services/performanceService';
import MechanicCard from '../../../components/mechanics/MechanicCard';
import MechanicStatusBadge from '../../../components/mechanics/MechanicStatusBadge';
import { Sparkline } from '../../../components/mechanics/PerformanceChart';

// ─── Stat card definition ─────────────────────────────────────────────────────
function buildStatCards(s) {
  return [
    { key: 'total',          label: 'Total Mechanics',    value: s.total,           icon: Users,        color: '#2563EB', change: '+1 this month', up: true,  spark: [6,8,7,9,8,10,s.total] },
    { key: 'available',      label: 'Available',          value: s.available,       icon: UserCheck,    color: '#059669', change: 'Ready to assign', up: true,  spark: [3,2,4,3,2,3,s.available] },
    { key: 'working',        label: 'Working',            value: s.working,         icon: Wrench,       color: '#D97706', change: 'Active right now', up: null,  spark: [2,3,3,2,4,3,s.working] },
    { key: 'pendingJobs',    label: 'Pending Jobs',       value: s.pendingJobs,     icon: Clock,        color: '#7C3AED', change: 'Across all mechanics', up: null, spark: [4,5,6,4,7,5,s.pendingJobs] },
    { key: 'completedToday', label: 'Completed Today',    value: s.completedToday,  icon: CheckCircle,  color: '#059669', change: '↑ vs yesterday', up: true,  spark: [3,4,5,4,6,5,s.completedToday] },
    { key: 'onLeave',        label: 'On Leave',           value: s.onLeave,         icon: Plane,        color: '#2563EB', change: 'Approved leaves', up: null,  spark: [1,2,1,1,2,1,s.onLeave] },
    { key: 'offline',        label: 'Offline',            value: s.offline,         icon: WifiOff,      color: '#64748b', change: 'Not checked in', up: false, spark: [1,2,1,2,1,2,s.offline] },
    { key: 'newlyAdded',     label: 'Newly Added',        value: s.newlyAdded,      icon: UserPlus,     color: '#EA580C', change: 'Last 30 days', up: true,   spark: [0,1,1,2,1,2,s.newlyAdded] },
    { key: 'avgRating',      label: 'Average Rating',     value: `${s.avgRating}★`, icon: Star,         color: '#F59E0B', change: '↑ +0.2 this month', up: true, spark: [4.2,4.3,4.4,4.5,4.5,4.6,s.avgRating] },
    { key: 'avgTime',        label: 'Avg Job Time',       value: `${s.avgTime}h`,   icon: Timer,        color: '#0891B2', change: '↓ 12min faster', up: true,  spark: [2.5,2.4,2.2,2.3,2.1,2.2,s.avgTime] },
    { key: 'totalRevenue',   label: 'Total Revenue',      value: `₹${(s.totalRevenue/1000).toFixed(0)}K`, icon: DollarSign, color: '#059669', change: '↑ +8% this month', up: true, spark: [200,220,240,230,250,260,s.totalRevenue/1000] },
    { key: 'avgEfficiency',  label: 'Avg Efficiency',     value: `${s.avgEfficiency}%`, icon: Zap,      color: '#7C3AED', change: '↑ +3% from last week', up: true, spark: [82,84,86,85,87,88,s.avgEfficiency] },
  ];
}

export default function MechanicDashboard() {
  const navigate = useNavigate();
  const { mechanics, loading } = useMechanic();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!loading) {
      getDashboardStats(mechanics).then(setStats);
    }
  }, [mechanics, loading]);

  const cards = stats ? buildStatCards(stats) : [];

  return (
    <AppShell>
      <TopBar
        searchPlaceholder="Search mechanics..."
        user={{ name: 'Admin', initials: 'AD' }}
        showNewBooking={false}
      >
        <button
          onClick={() => navigate('/admin/mechanics/add')}
          className="btn-primary text-xs"
        >
          <Plus size={14} /> Add Mechanic
        </button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Mechanic Management</h1>
            <p className="text-text-secondary text-sm mt-0.5">Monitor, manage and assign your workforce</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/admin/mechanics/list')} className="btn-outline text-xs">
              <List size={14} /> Table View
            </button>
            <button onClick={() => navigate('/admin/mechanics/attendance')} className="btn-outline text-xs">
              <Calendar size={14} /> Attendance
            </button>
            <button onClick={() => navigate('/admin/mechanics/performance')} className="btn-outline text-xs">
              <BarChart2 size={14} /> Analytics
            </button>
          </div>
        </div>

        {/* ── Summary Stat Cards ──────────────────────────────────────── */}
        {loading || !stats ? (
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border shadow-card p-5 animate-pulse">
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-8 bg-slate-200 rounded w-1/3 mb-3" />
                <div className="h-2 bg-slate-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {cards.map(card => (
              <StatCard key={card.key} card={card} />
            ))}
          </div>
        )}

        {/* ── Live Status Board ──────────────────────────────────────── */}
        <Card padding={false} className="mb-6">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h2 className="font-bold text-text-primary">Live Status Board</h2>
              <p className="text-text-secondary text-xs mt-0.5">Real-time mechanic activity</p>
            </div>
            <button onClick={() => navigate('/admin/mechanics/list')} className="flex items-center gap-1 text-accent text-sm font-medium hover:underline">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="px-5 py-4">
            {loading ? (
              <div className="flex gap-4">
                {[1,2,3,4].map(i => <div key={i} className="w-56 h-40 bg-slate-100 rounded-2xl animate-pulse flex-shrink-0" />)}
              </div>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {mechanics.map(m => <MechanicCard key={m.id} mechanic={m} />)}
              </div>
            )}
          </div>
        </Card>

        {/* ── Quick Actions + Top Performers ─────────────────────────── */}
        <div className="grid grid-cols-3 gap-4">
          {/* Top Performers */}
          <div className="col-span-2">
            <Card padding={false}>
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-bold text-text-primary">Top Performers</h2>
                <button onClick={() => navigate('/admin/mechanics/performance')} className="text-accent text-sm font-medium hover:underline flex items-center gap-1">
                  Full Analytics <ChevronRight size={14} />
                </button>
              </div>
              <div className="divide-y divide-border/60">
                {[...mechanics]
                  .sort((a, b) => b.avgRating - a.avgRating)
                  .slice(0, 5)
                  .map((m, rank) => (
                    <div
                      key={m.id}
                      onClick={() => navigate(`/admin/mechanics/${m.id}`)}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <span className={`text-lg font-black ${rank === 0 ? 'text-yellow-500' : rank === 1 ? 'text-slate-400' : rank === 2 ? 'text-amber-700' : 'text-slate-300'}`}>
                        #{rank + 1}
                      </span>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                        style={{ background: m.color }}>
                        {m.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-text-primary text-sm">{m.name}</p>
                        <p className="text-xs text-text-secondary">{m.skillLevel} · {m.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-primary">{m.avgRating}★</p>
                        <p className="text-xs text-text-secondary">{m.totalCompleted} jobs</p>
                      </div>
                      <MechanicStatusBadge status={m.status} size="sm" />
                    </div>
                  ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <h2 className="font-bold text-text-primary mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { icon: UserPlus, label: 'Add New Mechanic',    path: '/admin/mechanics/add',         color: 'text-blue-600 bg-blue-50' },
                  { icon: List,     label: 'Mechanic Table',       path: '/admin/mechanics/list',        color: 'text-slate-600 bg-slate-100' },
                  { icon: Calendar, label: 'Attendance',           path: '/admin/mechanics/attendance',  color: 'text-green-600 bg-green-50' },
                  { icon: BarChart2,label: 'Performance Analytics', path: '/admin/mechanics/performance', color: 'text-purple-600 bg-purple-50' },
                ].map(a => (
                  <button
                    key={a.path}
                    onClick={() => navigate(a.path)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-border transition-colors text-left"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${a.color}`}>
                      <a.icon size={17} />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{a.label}</span>
                    <ChevronRight size={14} className="text-slate-300 ml-auto" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function StatCard({ card }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-card p-4 hover:-translate-y-0.5 hover:shadow-card-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: card.color + '18' }}>
          <card.icon size={18} style={{ color: card.color }} />
        </div>
        <div className="flex-shrink-0">
          <Sparkline values={card.spark} color={card.color} width={60} height={28} />
        </div>
      </div>
      <p className="text-2xl font-black text-text-primary mb-0.5">{card.value}</p>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-text-secondary mb-1">{card.label}</p>
      <p className={`text-[11px] font-medium flex items-center gap-1 ${card.up === true ? 'text-green-600' : card.up === false ? 'text-red-500' : 'text-text-secondary'}`}>
        {card.up === true && <TrendingUp size={10} />}
        {card.up === false && <TrendingDown size={10} />}
        {card.change}
      </p>
    </div>
  );
}
