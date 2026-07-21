import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Star, Clock, Zap, DollarSign, TrendingUp, Sparkles, ChevronRight, BarChart2 } from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import { BarChart } from '../../../components/mechanics/PerformanceChart';
import { useMechanic } from '../../../context/MechanicContext';
import { getTopPerformers } from '../../../services/performanceService';

export default function Performance() {
  const { mechanics, loading } = useMechanic();
  const navigate = useNavigate();

  const [period, setPeriod] = useState('weekly');
  const [topList, setTopList] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!loading) {
      getTopPerformers().then(setTopList);

      // Build overall daily workload chart mockup
      const data = [
        { label: 'Mon', jobs: 18, revenue: 32000 },
        { label: 'Tue', jobs: 24, revenue: 46000 },
        { label: 'Wed', jobs: 20, revenue: 38000 },
        { label: 'Thu', jobs: 26, revenue: 52000 },
        { label: 'Fri', jobs: 30, revenue: 64000 },
        { label: 'Sat', jobs: 34, revenue: 78000 },
        { label: 'Sun', jobs: 8,  revenue: 14000 },
      ];
      setChartData(data);
    }
  }, [mechanics, loading]);

  const topPerformer = topList[0];

  return (
    <AppShell>
      <TopBar user={{ name: 'Admin', initials: 'AD' }} showNewBooking={false} />

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Performance Analytics</h1>
            <p className="text-text-secondary text-sm">Analyze mechanics output, ratings, satisfaction and efficiency</p>
          </div>

          <div className="flex border border-border bg-white rounded-lg p-0.5 font-semibold text-xs text-text-secondary">
            {['weekly', 'monthly', 'yearly'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md capitalize transition-colors ${
                  period === p ? 'bg-accent text-white font-bold' : 'hover:bg-slate-50 hover:text-text-primary'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Top Performer Card */}
          {topPerformer && (
            <Card className="col-span-1 bg-gradient-to-br from-indigo-900 to-slate-900 border-none text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              {/* Subtle background glow */}
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 filter blur-2xl" />
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full" />
              
              <div className="relative">
                <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase w-fit mb-4">
                  <Sparkles size={11} className="text-yellow-400" /> Top Performer
                </div>
                <h2 className="text-xl font-black">{topPerformer.name}</h2>
                <p className="text-indigo-200 text-xs mt-0.5">{topPerformer.skillLevel}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-6">
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-indigo-300">Rating</p>
                  <p className="text-lg font-black mt-0.5">{topPerformer.avgRating} ★</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-indigo-300">Efficiency</p>
                  <p className="text-lg font-black mt-0.5">{topPerformer.efficiency}%</p>
                </div>
              </div>
            </Card>
          )}

          {/* Core Daily Workload chart */}
          <Card className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-text-primary text-base">Weekly Overall Workload (Completed Jobs)</h3>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                <TrendingUp size={14} /> +12% from last week
              </div>
            </div>
            <BarChart data={chartData} label="jobs" color="#4F46E5" />
          </Card>
        </div>

        {/* Ranking List of Mechanics */}
        <Card padding={false}>
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-bold text-text-primary text-base">Efficiency & Output Ranking</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Rank', 'Mechanic', 'Skill Level', 'Jobs Completed', 'Avg Rating', 'Revenue Contribution', 'Efficiency', 'View'].map(h => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center py-10">Loading ranks...</td></tr>
                ) : (
                  topList.map((m, i) => (
                    <tr key={m.id} className="border-b border-border/60 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/mechanics/${m.id}`)}>
                      <td className="py-3.5 px-4 font-black text-slate-400 text-sm">#{i + 1}</td>
                      <td className="py-3.5 px-4 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: m.color }}>{m.initials}</div>
                        <div>
                          <p className="font-bold text-text-primary text-sm">{m.name}</p>
                          <p className="text-xs text-text-secondary">{m.id}</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-text-primary">{m.skillLevel}</td>
                      <td className="py-3.5 px-4 text-sm font-semibold text-text-primary">{m.totalCompleted}</td>
                      <td className="py-3.5 px-4 text-sm">
                        <div className="flex items-center gap-1 font-semibold text-text-primary"><Star size={11} className="text-yellow-400 fill-yellow-400" /> {m.avgRating}</div>
                      </td>
                      <td className="py-3.5 px-4 text-sm font-semibold text-text-primary">₹{m.revenue.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${
                          m.efficiency >= 90 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                        }`}>{m.efficiency}%</span>
                      </td>
                      <td className="py-3.5 px-4"><ChevronRight size={16} className="text-slate-300" /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </AppShell>
  );
}
