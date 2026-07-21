import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, SlidersHorizontal, Download, Printer,
  Plus, Eye, Edit, Trash2, Wrench, Key, ChevronDown,
  Star, MoreVertical, ArrowUpDown, X, CheckSquare,
} from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import MechanicStatusBadge from '../../../components/mechanics/MechanicStatusBadge';
import { useMechanic } from '../../../context/MechanicContext';
import { SPECIALIZATIONS, BIKE_BRANDS, SKILL_LEVELS } from '../../../data/mechanics';

const STATUSES = ['available', 'working', 'on-leave', 'break', 'offline'];
const SORT_OPTIONS = [
  { value: 'name-asc',      label: 'Name A–Z' },
  { value: 'name-desc',     label: 'Name Z–A' },
  { value: 'rating-desc',   label: 'Rating ↓' },
  { value: 'completed-desc',label: 'Most Jobs' },
  { value: 'revenue-desc',  label: 'Revenue ↓' },
  { value: 'efficiency-desc',label: 'Efficiency ↓' },
  { value: 'newest',        label: 'Newest' },
  { value: 'oldest',        label: 'Oldest' },
];

export default function MechanicTable() {
  const navigate = useNavigate();
  const { mechanics, loading, deleteMechanic } = useMechanic();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSpec, setFilterSpec]     = useState('');
  const [filterBrand, setFilterBrand]   = useState('');
  const [filterSkill, setFilterSkill]   = useState('');
  const [sort, setSort]                 = useState('name-asc');
  const [selected, setSelected]         = useState(new Set());
  const [showFilters, setShowFilters]   = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionMenu, setActionMenu]     = useState(null);

  // ── Filtered + sorted list ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...mechanics];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q) ||
        m.phone.includes(q) ||
        m.specializations.some(s => s.toLowerCase().includes(q)) ||
        m.bikeBrands.some(b => b.toLowerCase().includes(q))
      );
    }
    if (filterStatus) list = list.filter(m => m.status === filterStatus);
    if (filterSpec)   list = list.filter(m => m.specializations.includes(filterSpec));
    if (filterBrand)  list = list.filter(m => m.bikeBrands.includes(filterBrand));
    if (filterSkill)  list = list.filter(m => m.skillLevel === filterSkill);

    list.sort((a, b) => {
      switch (sort) {
        case 'name-asc':       return a.name.localeCompare(b.name);
        case 'name-desc':      return b.name.localeCompare(a.name);
        case 'rating-desc':    return b.avgRating - a.avgRating;
        case 'completed-desc': return b.totalCompleted - a.totalCompleted;
        case 'revenue-desc':   return b.revenue - a.revenue;
        case 'efficiency-desc':return b.efficiency - a.efficiency;
        case 'newest':         return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':         return new Date(a.createdAt) - new Date(b.createdAt);
        default: return 0;
      }
    });
    return list;
  }, [mechanics, search, filterStatus, filterSpec, filterBrand, filterSkill, sort]);

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleAll = () => setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(m => m.id)));

  const handleExportCSV = () => {
    const headers = ['ID','Name','Username','Phone','Email','Skill Level','Status','Experience','Rating','Completed','Revenue','Efficiency'];
    const rows = filtered.map(m => [
      m.id, m.name, m.username, m.phone, m.email, m.skillLevel,
      m.status, `${m.experience}y`, m.avgRating, m.totalCompleted,
      m.revenue, `${m.efficiency}%`,
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'mechanics.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const activeFilters = [filterStatus, filterSpec, filterBrand, filterSkill].filter(Boolean).length;

  return (
    <AppShell>
      <TopBar searchPlaceholder="Search mechanics..." user={{ name: 'Admin', initials: 'AD' }} showNewBooking={false}>
        <Button variant="accent" size="sm" onClick={() => navigate('/admin/mechanics/add')}>
          <Plus size={14} /> Add Mechanic
        </Button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-text-primary">All Mechanics</h1>
            <p className="text-text-secondary text-sm">{filtered.length} of {mechanics.length} mechanics</p>
          </div>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <span className="text-sm text-accent font-semibold bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                {selected.size} selected
              </span>
            )}
            <button onClick={handleExportCSV} className="btn-outline text-xs gap-1.5">
              <Download size={13} /> Export CSV
            </button>
            <button onClick={() => window.print()} className="btn-outline text-xs gap-1.5">
              <Printer size={13} /> Print
            </button>
          </div>
        </div>

        <Card padding={false}>
          {/* Search & filter bar */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, ID, phone, specialization…"
                className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(v => !v)}
              className={`btn-outline text-xs gap-1.5 ${activeFilters ? 'border-accent text-accent bg-blue-50' : ''}`}
            >
              <SlidersHorizontal size={13} />
              Filters {activeFilters > 0 && <span className="bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{activeFilters}</span>}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-3 pr-7 py-2 text-xs bg-white border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-accent/50 font-medium text-text-primary cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ArrowUpDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
            </div>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="px-5 py-3 border-b border-border bg-slate-50 flex items-center gap-3 flex-wrap">
              <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={STATUSES.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))} />
              <FilterSelect label="Specialization" value={filterSpec} onChange={setFilterSpec} options={SPECIALIZATIONS.map(s => ({ value: s, label: s }))} />
              <FilterSelect label="Bike Brand" value={filterBrand} onChange={setFilterBrand} options={BIKE_BRANDS.map(s => ({ value: s, label: s }))} />
              <FilterSelect label="Skill Level" value={filterSkill} onChange={setFilterSkill} options={SKILL_LEVELS.map(s => ({ value: s, label: s }))} />
              {activeFilters > 0 && (
                <button
                  onClick={() => { setFilterStatus(''); setFilterSpec(''); setFilterBrand(''); setFilterSkill(''); }}
                  className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1"
                >
                  <X size={12} /> Clear All
                </button>
              )}
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 w-8">
                    <input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll} className="w-3.5 h-3.5 accent-accent cursor-pointer" />
                  </th>
                  {['Profile', 'ID', 'Contact', 'Specializations', 'Experience', 'Skill', 'Status', "Today's Jobs", 'Rating', 'Efficiency', 'Actions'].map(h => (
                    <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary py-3 px-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/60">
                      {Array.from({ length: 12 }).map((_, j) => (
                        <td key={j} className="py-4 px-3"><div className="h-3 bg-slate-100 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="py-16 text-center">
                      <Search size={36} className="mx-auto mb-3 text-slate-200" />
                      <p className="font-medium text-text-secondary">No mechanics found</p>
                      <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(m => (
                    <tr
                      key={m.id}
                      className={`border-b border-border/60 hover:bg-slate-50/70 transition-colors ${selected.has(m.id) ? 'bg-blue-50/40' : ''}`}
                    >
                      <td className="py-3.5 px-4">
                        <input type="checkbox" checked={selected.has(m.id)} onChange={() => toggleSelect(m.id)}
                          className="w-3.5 h-3.5 accent-accent cursor-pointer" />
                      </td>
                      {/* Profile */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: m.color }}>
                            {m.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary text-sm">{m.name}</p>
                            <p className="text-xs text-text-secondary">@{m.username}</p>
                          </div>
                        </div>
                      </td>
                      {/* ID */}
                      <td className="py-3.5 px-3">
                        <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-medium">{m.id}</span>
                      </td>
                      {/* Contact */}
                      <td className="py-3.5 px-3">
                        <p className="text-sm text-text-primary">{m.phone}</p>
                        <p className="text-xs text-text-secondary">{m.email}</p>
                      </td>
                      {/* Specializations */}
                      <td className="py-3.5 px-3 max-w-[160px]">
                        <div className="flex flex-wrap gap-1">
                          {m.specializations.slice(0, 2).map(s => (
                            <span key={s} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded-full whitespace-nowrap font-medium">{s}</span>
                          ))}
                          {m.specializations.length > 2 && (
                            <span className="text-[10px] text-text-secondary">+{m.specializations.length - 2}</span>
                          )}
                        </div>
                      </td>
                      {/* Experience */}
                      <td className="py-3.5 px-3 text-sm text-text-primary whitespace-nowrap">{m.experience}y exp</td>
                      {/* Skill Level */}
                      <td className="py-3.5 px-3">
                        <SkillBadge level={m.skillLevel} />
                      </td>
                      {/* Status */}
                      <td className="py-3.5 px-3"><MechanicStatusBadge status={m.status} size="sm" /></td>
                      {/* Today's jobs */}
                      <td className="py-3.5 px-3 text-sm font-semibold text-text-primary text-center">{m.todaysJobs}</td>
                      {/* Rating */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-semibold text-text-primary">{m.avgRating}</span>
                        </div>
                      </td>
                      {/* Efficiency */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-accent" style={{ width: `${m.efficiency}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-text-primary">{m.efficiency}%</span>
                        </div>
                      </td>
                      {/* Actions */}
                      <td className="py-3.5 px-3">
                        <div className="relative">
                          <button
                            onClick={(e) => { e.stopPropagation(); setActionMenu(actionMenu === m.id ? null : m.id); }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                          >
                            <MoreVertical size={14} className="text-text-secondary" />
                          </button>
                          {actionMenu === m.id && (
                            <div className="absolute right-0 top-8 z-20 bg-white border border-border rounded-xl shadow-card-md py-1.5 w-44" onClick={e => e.stopPropagation()}>
                              <ActionItem icon={Eye}   label="View Profile"   onClick={() => { setActionMenu(null); navigate(`/admin/mechanics/${m.id}`); }} />
                              <ActionItem icon={Edit}  label="Edit"           onClick={() => { setActionMenu(null); navigate(`/admin/mechanics/${m.id}/edit`); }} />
                              <ActionItem icon={Wrench}label="Assign Job"     onClick={() => setActionMenu(null)} />
                              <ActionItem icon={Key}   label="Reset Password" onClick={() => setActionMenu(null)} />
                              <div className="border-t border-border/60 my-1" />
                              <ActionItem icon={Trash2} label="Delete" danger  onClick={() => { setActionMenu(null); setDeleteTarget(m); }} />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      {/* Delete confirmation dialog */}
      {deleteTarget && (
        <DeleteDialog
          mechanic={deleteTarget}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await deleteMechanic(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Click-outside to close action menu */}
      {actionMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setActionMenu(null)} />
      )}
    </AppShell>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none text-xs bg-white border border-border rounded-lg pl-3 pr-6 py-1.5 font-medium text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/50 cursor-pointer"
      >
        <option value="">{label}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
    </div>
  );
}

function ActionItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-slate-50 transition-colors text-left ${danger ? 'text-danger hover:bg-red-50' : 'text-text-primary'}`}>
      <Icon size={13} />
      {label}
    </button>
  );
}

function SkillBadge({ level }) {
  const MAP = {
    'Beginner':          'bg-slate-100 text-slate-600',
    'Intermediate':      'bg-blue-50 text-blue-700',
    'Senior':            'bg-purple-50 text-purple-700',
    'Master Technician': 'bg-amber-50 text-amber-700',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${MAP[level] || 'bg-slate-100 text-slate-600'}`}>
      {level}
    </span>
  );
}

function DeleteDialog({ mechanic, onCancel, onConfirm }) {
  const hasActiveJobs = mechanic.pendingJobs > 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h2 className="font-bold text-text-primary text-lg mb-1">Delete Mechanic?</h2>
        {hasActiveJobs ? (
          <p className="text-text-secondary text-sm mb-5">
            <strong className="text-red-500">{mechanic.name}</strong> currently has{' '}
            <strong>{mechanic.pendingJobs} active job(s)</strong> assigned.
            Please reassign them before deleting.
          </p>
        ) : (
          <p className="text-text-secondary text-sm mb-5">
            Are you sure you want to delete <strong className="text-text-primary">{mechanic.name}</strong> ({mechanic.id})?
            This action cannot be undone.
          </p>
        )}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 justify-center" onClick={onCancel}>Cancel</Button>
          {hasActiveJobs ? (
            <Button variant="accent" className="flex-1 justify-center" onClick={onCancel}>Reassign Jobs</Button>
          ) : (
            <Button variant="danger" className="flex-1 justify-center" onClick={onConfirm}>
              <Trash2 size={13} /> Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
