import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import StatusPill from '../../../components/ui/StatusPill';
import { useBikes } from '../../../context/BikeContext';
import BikeCard from '../../../components/admin/bikes/BikeCard';
import RegisterBikeModal from '../../../components/admin/bikes/RegisterBikeModal';
import AssignMechanicModal from '../../../components/admin/bikes/AssignMechanicModal';
import { GenerateInvoiceModal, DeleteConfirmModal } from '../../../components/admin/bikes/QuickActionModals';
import { BIKE_BRANDS, SERVICE_TYPES, BIKE_STATUSES } from '../../../data/bikes';
import {
  Bike, LayoutGrid, List, Plus, Search, Filter, ArrowUpDown, Download,
  FileSpreadsheet, FileText, Printer, ChevronLeft, ChevronRight, Wrench,
  Clock, IndianRupee, AlertCircle, CheckCircle2, RefreshCw, XCircle, Eye, Edit3, UserCheck, Trash2
} from 'lucide-react';

const ADMIN_USER = { name: 'Admin User', initials: 'AU', avatar: null };

export default function AdminBikesPage() {
  const navigate = useNavigate();
  const {
    bikes,
    stats,
    totalCount,
    totalPages,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    brandFilter,
    setBrandFilter,
    statusFilter,
    setStatusFilter,
    serviceFilter,
    setServiceFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    loading,
    toasts,
    removeToast,
    registerBike,
    deleteBike,
    assignMechanic,
    addToast,
    exportCSV,
    loadBikes,
  } = useBikes();

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedBikeForAssign, setSelectedBikeForAssign] = useState(null);
  const [selectedBikeForInvoice, setSelectedBikeForInvoice] = useState(null);
  const [selectedBikeIdForDelete, setSelectedBikeIdForDelete] = useState(null);

  const handleCreateNewBooking = () => {
    setIsRegisterOpen(true);
  };

  return (
    <AppShell>
      <TopBar
        title="Vehicle Management"
        user={ADMIN_USER}
        showNewBooking={false}
      >
        <button
          onClick={() => setIsRegisterOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus size={15} /> Register New Bike
        </button>
      </TopBar>

      {/* Floating Toast Notification Container */}
      <div className="fixed top-16 right-6 z-50 space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border modal-enter ${
              toast.type === 'error'
                ? 'bg-red-900 text-white border-red-700'
                : toast.type === 'info'
                ? 'bg-slate-900 text-white border-slate-700'
                : 'bg-emerald-900 text-white border-emerald-700'
            }`}
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-60 hover:opacity-100">
              <XCircle size={14} />
            </button>
          </div>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-slate-50/70 space-y-6">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
              <span>Fleet Management</span>
              <ChevronRight size={13} className="text-slate-400" />
              <span className="text-blue-600 font-bold">Registered Bikes</span>
            </div>
            {/* Main Title & Subtitle */}
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vehicle Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage, monitor and track all registered customer motorcycles.
            </p>
          </div>

          {/* Top Right Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Switcher */}
            <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <LayoutGrid size={14} /> Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <List size={14} /> List View
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={15} /> Register New Bike
            </button>
            <button
              onClick={handleCreateNewBooking}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-md"
            >
              <Wrench size={15} /> New Booking
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS (8 KPIs Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-slate-900 font-mono">{stats.totalRegistered}</span>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">Fleet</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">In Service</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-blue-600 font-mono">{stats.currentlyInService}</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ready for Pickup</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-emerald-600 font-mono">{stats.readyForDelivery}</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">Ready</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Today</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-slate-900 font-mono">{stats.completedToday}</span>
              <span className="text-[10px] text-emerald-600 font-bold">✓ 100%</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pending Bookings</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-amber-600 font-mono">{stats.pendingBookings}</span>
              <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded">Queue</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Service Time</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl font-bold text-slate-900 font-mono">{stats.avgServiceTimeHours}h</span>
              <Clock size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Revenue Today (₹)</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-lg font-bold text-slate-900 font-mono">₹{stats.revenueToday.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between bg-gradient-to-br from-blue-900 to-slate-900 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Revenue Month (₹)</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-lg font-bold font-mono">₹{stats.revenueThisMonth.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Large Search Box */}
            <div className="md:col-span-4 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by Owner, Reg No, Model, Chassis, Engine..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="md:col-span-8 flex flex-wrap items-center gap-2 justify-start md:justify-end">
              {/* Brand Dropdown */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Brand:</span>
                <select
                  value={brandFilter}
                  onChange={e => setBrandFilter(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Brands</option>
                  {BIKE_BRANDS.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status:</span>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {BIKE_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Service Type Dropdown */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Service:</span>
                <select
                  value={serviceFilter}
                  onChange={e => setServiceFilter(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Services</option>
                  {SERVICE_TYPES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <ArrowUpDown size={12} className="text-slate-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="Mileage">Highest Mileage</option>
                  <option value="Next Service Date">Next Service Date</option>
                  <option value="Owner Name">Owner Name (A-Z)</option>
                </select>
              </div>

              {/* Export CSV Button */}
              <button
                onClick={exportCSV}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Export Fleet to CSV"
              >
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA: GRID OR LIST VIEW */}
        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 h-80 animate-pulse space-y-3">
                <div className="w-full h-40 bg-slate-200 rounded-xl" />
                <div className="w-3/4 h-5 bg-slate-200 rounded" />
                <div className="w-1/2 h-4 bg-slate-200 rounded" />
                <div className="w-full h-8 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : bikes.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Bike size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No Bikes Registered Yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                No matching motorcycles found for the current search/filter criteria.
              </p>
            </div>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <Plus size={16} /> Register New Bike
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bikes.map(bike => (
              <BikeCard
                key={bike.id}
                bike={bike}
                onEdit={b => navigate(`/admin/bikes/${b.id}`)}
                onAssignMechanic={b => setSelectedBikeForAssign(b)}
                onViewHistory={b => navigate(`/admin/bikes/${b.id}`)}
                onGenerateInvoice={b => setSelectedBikeForInvoice(b)}
                onDelete={id => setSelectedBikeIdForDelete(id)}
              />
            ))}
          </div>
        ) : (
          /* Professional List View Data Table */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-900 text-white font-semibold text-[11px] uppercase tracking-wider sticky top-0">
                  <tr>
                    <th className="px-4 py-3">Photo</th>
                    <th className="px-4 py-3">Reg No</th>
                    <th className="px-4 py-3">Bike Model</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Brand</th>
                    <th className="px-4 py-3">Current Service</th>
                    <th className="px-4 py-3">Mechanic</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Odometer</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bikes.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="w-12 h-10 rounded-lg bg-slate-200 overflow-hidden flex-shrink-0">
                          {b.image ? (
                            <img src={b.image} alt={b.model} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">🏍️</div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-900">
                        {b.regNumber}
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">
                        {b.model}
                        <p className="text-[10px] text-slate-400 font-normal">{b.variant}</p>
                      </td>
                      <td className="px-4 py-2.5 font-semibold text-slate-800">
                        {b.owner?.name}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-slate-500">
                        {b.owner?.phone}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                          {b.brand}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-slate-800">
                        {b.currentService || 'General Service'}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="font-medium text-slate-700">
                          {b.assignedMechanic?.name || 'Unassigned'}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusPill status={b.status} />
                      </td>
                      <td className="px-4 py-2.5 font-mono">
                        {b.odometer?.toLocaleString()} KM
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/admin/bikes/${b.id}`)}
                            className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                            title="View Profile"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => setSelectedBikeForAssign(b)}
                            className="p-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                            title="Assign Mechanic"
                          >
                            <UserCheck size={14} />
                          </button>
                          <button
                            onClick={() => setSelectedBikeForInvoice(b)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                            title="Invoice"
                          >
                            <FileText size={14} />
                          </button>
                          <button
                            onClick={() => setSelectedBikeIdForDelete(b.id)}
                            className="p-1.5 bg-slate-100 hover:bg-red-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAGINATION BAR */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{bikes.length}</span> of{' '}
            <span className="font-bold text-slate-900">{totalCount}</span> Registered Motorcycles
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl font-mono font-bold border border-blue-200">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* Modals */}
      <RegisterBikeModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={registerBike}
      />

      <AssignMechanicModal
        isOpen={!!selectedBikeForAssign}
        bike={selectedBikeForAssign}
        onClose={() => setSelectedBikeForAssign(null)}
        onAssign={assignMechanic}
      />

      <GenerateInvoiceModal
        isOpen={!!selectedBikeForInvoice}
        bike={selectedBikeForInvoice}
        onClose={() => setSelectedBikeForInvoice(null)}
        onAddInvoice={(id, data) => addToast(`Invoice created for ${id}! Total: ₹${data.totalAmount}`, 'success')}
      />

      <DeleteConfirmModal
        isOpen={!!selectedBikeIdForDelete}
        bikeId={selectedBikeIdForDelete}
        onClose={() => setSelectedBikeIdForDelete(null)}
        onConfirm={deleteBike}
      />
    </AppShell>
  );
}
