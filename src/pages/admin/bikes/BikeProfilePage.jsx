import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import StatusPill from '../../../components/ui/StatusPill';
import { useBikes } from '../../../context/BikeContext';
import { bikeService } from '../../../services/bikeService';
import AssignMechanicModal from '../../../components/admin/bikes/AssignMechanicModal';
import { GenerateInvoiceModal, DeleteConfirmModal } from '../../../components/admin/bikes/QuickActionModals';
import {
  Bike, ChevronRight, User, Phone, Mail, MapPin, Calendar, Gauge, Shield, Wrench,
  Clock, FileText, Printer, Edit3, UserCheck, Trash2, CheckCircle2, ArrowLeft,
  Camera, Upload, Download, Sparkles, AlertTriangle, Layers, FileCheck, Check
} from 'lucide-react';

const ADMIN_USER = { name: 'Admin User', initials: 'AU', avatar: null };

export default function BikeProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assignMechanic, deleteBike, addToast, updateServiceStage } = useBikes();

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, owner, history, currentJob, invoices, documents, photos, timeline

  // Modal controls
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      try {
        const data = await bikeService.getBikeById(id);
        setBike(data);
      } catch (err) {
        console.error(err);
        addToast(`Vehicle ${id} not found`, 'error');
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <TopBar title="Vehicle Profile" user={ADMIN_USER} showNewBooking={false} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Loading Motorcycle Profile...</p>
          </div>
        </main>
      </AppShell>
    );
  }

  if (!bike) {
    return (
      <AppShell>
        <TopBar title="Vehicle Profile" user={ADMIN_USER} showNewBooking={false} />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
            <p className="text-4xl">🏍️</p>
            <h3 className="text-lg font-bold text-slate-900">Vehicle Not Found</h3>
            <p className="text-xs text-slate-500">No registered bike found with ID: {id}</p>
            <button onClick={() => navigate('/admin/bikes')} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
              Return to Bikes Fleet
            </button>
          </div>
        </main>
      </AppShell>
    );
  }

  const handlePrintProfile = () => {
    window.print();
  };

  const handleStageAdvance = async (stageName) => {
    try {
      const updated = await updateServiceStage(bike.id, stageName);
      setBike(updated);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell>
      <TopBar title={`Profile: ${bike.brand} ${bike.model}`} user={ADMIN_USER} showNewBooking={false}>
        <button onClick={() => navigate('/admin/bikes')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1">
          <ArrowLeft size={14} /> Back to Fleet
        </button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-slate-50/70 space-y-6">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/admin/bikes" className="hover:text-blue-600">Registered Bikes</Link>
          <ChevronRight size={13} />
          <span className="text-slate-900 font-bold">{bike.id}</span>
        </div>

        {/* HEADER SUMMARY CARD */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Left Info with Photo */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl bg-slate-900 overflow-hidden flex-shrink-0 relative shadow-md">
                {bike.image ? (
                  <img src={bike.image} alt={bike.model} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🏍️</div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <span className="bg-slate-900 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded-lg">
                    {bike.regNumber}
                  </span>
                  <StatusPill status={bike.status} />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mt-1">
                  {bike.brand} {bike.model}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {bike.variant} ({bike.year}) • <span className="font-semibold text-slate-700">{bike.owner?.name}</span>
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mt-2">
                  <span>ENG: {bike.engineNumber}</span>
                  <span>•</span>
                  <span>VIN: {bike.chassisNumber}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons Header */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsAssignOpen(true)}
                className="px-3.5 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <UserCheck size={15} /> Assign Job
              </button>
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="px-3.5 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <FileText size={15} /> View Invoice
              </button>
              <button
                onClick={handlePrintProfile}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer size={15} /> Print
              </button>
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="px-3.5 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {[
            { id: 'overview', label: 'Overview', icon: Bike },
            { id: 'owner', label: 'Owner Details', icon: User },
            { id: 'history', label: 'Service History', icon: Calendar },
            { id: 'currentJob', label: 'Current Job', icon: Wrench },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'documents', label: 'Documents', icon: FileCheck },
            { id: 'photos', label: 'Photo Gallery', icon: Camera },
            { id: 'timeline', label: 'Timeline', icon: Layers },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Motorcycle Specifications & Status
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Brand</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{bike.brand}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Model & Variant</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{bike.model} {bike.variant}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Manufacture Year</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{bike.year}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Fuel Type</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{bike.fuelType}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Odometer (Mileage)</p>
                    <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">{bike.odometer?.toLocaleString()} KM</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Color</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{bike.color}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Engine Number</p>
                    <p className="text-xs font-bold font-mono text-slate-900 mt-0.5">{bike.engineNumber}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Chassis VIN</p>
                    <p className="text-xs font-bold font-mono text-slate-900 mt-0.5">{bike.chassisNumber}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Insurance Expiry</p>
                    <p className="text-sm font-bold text-emerald-700 font-mono mt-0.5">{bike.insuranceExpiry}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: OWNER DETAILS */}
            {activeTab === 'owner' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Registered Owner Profile
                </h3>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-xl shadow-md">
                    {bike.owner?.name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{bike.owner?.name}</h4>
                    <p className="text-xs text-slate-500">Member since {bike.owner?.memberSince || '2023'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="font-semibold text-slate-400 uppercase text-[10px]">Mobile Phone</p>
                    <p className="font-bold font-mono text-slate-800 text-sm">{bike.owner?.phone}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="font-semibold text-slate-400 uppercase text-[10px]">Email Address</p>
                    <p className="font-bold text-slate-800 text-sm">{bike.owner?.email}</p>
                  </div>
                  <div className="col-span-2 p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="font-semibold text-slate-400 uppercase text-[10px]">Customer Address</p>
                    <p className="font-semibold text-slate-800 text-xs">{bike.owner?.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SERVICE HISTORY */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Past Service & Maintenance History
                </h3>
                {bike.serviceHistory?.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center font-medium">No past service records logged.</p>
                ) : (
                  <div className="space-y-4">
                    {bike.serviceHistory?.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{item.serviceType}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Date: <span className="font-mono">{item.date}</span> • Mechanic: <span className="font-semibold text-slate-700">{item.mechanic}</span>
                          </p>
                          {item.notes && <p className="text-xs text-slate-600 mt-2 bg-white p-2 rounded border border-slate-200">{item.notes}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold font-mono text-slate-900">₹{item.cost.toLocaleString()}</p>
                          <p className="text-[10px] font-mono text-slate-400">{item.invoiceNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: CURRENT JOB */}
            {activeTab === 'currentJob' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                    Live Workshop Job Tracking
                  </h3>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {bike.currentJob?.id || 'JOB-ACTIVE'}
                  </span>
                </div>

                {/* Progress Bar & Stages Stepper */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>Current Stage: <span className="text-blue-600">{bike.currentJob?.stage || 'Inspection'}</span></span>
                    <span>{bike.serviceProgress}% Completed</span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-500 rounded-full" style={{ width: `${bike.serviceProgress}%` }} />
                  </div>

                  {/* Stage Advance Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Inspection', 'Diagnosis', 'Repair', 'Quality Check', 'Completed'].map(stageName => (
                      <button
                        key={stageName}
                        onClick={() => handleStageAdvance(stageName)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          bike.currentJob?.stage === stageName
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        Advance to {stageName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Parts Used Table */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Spare Parts & Consumables Used</h4>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 font-semibold">
                      <tr>
                        <th className="p-2.5 rounded-l-lg">Item Name</th>
                        <th className="p-2.5">Part No</th>
                        <th className="p-2.5">Qty</th>
                        <th className="p-2.5">Unit Price</th>
                        <th className="p-2.5 text-right rounded-r-lg">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bike.currentJob?.partsUsed?.map(p => (
                        <tr key={p.id}>
                          <td className="p-2.5 font-bold text-slate-900">{p.name}</td>
                          <td className="p-2.5 font-mono text-slate-500">{p.partNo}</td>
                          <td className="p-2.5 font-mono">{p.qty}</td>
                          <td className="p-2.5 font-mono">₹{p.unitPrice}</td>
                          <td className="p-2.5 text-right font-mono font-bold">₹{p.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: INVOICES */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Invoices & Billing</h3>
                  <button onClick={() => setIsInvoiceOpen(true)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1">
                    <Plus size={14} /> Create Invoice
                  </button>
                </div>
                {bike.invoices?.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">No invoices generated yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bike.invoices?.map(inv => (
                      <div key={inv.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-slate-900">{inv.invoiceNumber}</span>
                          <p className="text-xs text-slate-500">Date: {inv.date} • Mode: {inv.paymentMode}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-bold font-mono text-emerald-700">₹{inv.totalAmount.toLocaleString()}</p>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            {inv.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Vehicle Compliance & Documents
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bike.documents?.map((doc, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                        <p className="text-[11px] text-slate-500 font-mono">Valid till: {doc.validTill}</p>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 7: PHOTOS */}
            {activeTab === 'photos' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Workshop Inspection Photos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bike.photos?.before?.map((p, i) => (
                    <div key={i} className="h-32 rounded-xl overflow-hidden bg-slate-100 relative group cursor-pointer" onClick={() => setSelectedPhoto(p)}>
                      <img src={p} alt="Before Service" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Before Service
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 border-b pb-3">
                  Vehicle Life-Cycle Activity Timeline
                </h3>
                <div className="space-y-4 border-l-2 border-slate-200 pl-4">
                  {bike.timeline?.map(t => (
                    <div key={t.id} className="relative">
                      <div className="w-3 h-3 rounded-full bg-blue-600 absolute -left-[23px] top-1 border-2 border-white" />
                      <p className="text-xs font-bold text-slate-900">{t.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t.description}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">{t.date} • {t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-lg">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">Quick Workshop Actions</h3>

              <button
                onClick={() => setIsAssignOpen(true)}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors shadow-sm"
              >
                <span>Assign Mechanic</span>
                <UserCheck size={16} />
              </button>

              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors shadow-sm"
              >
                <span>Generate Service Invoice</span>
                <FileText size={16} />
              </button>

              <button
                onClick={() => handleStageAdvance('Completed')}
                className="w-full py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
              >
                <span>Mark Ready / Delivered</span>
                <CheckCircle2 size={16} />
              </button>

              <button
                onClick={() => setIsDeleteOpen(true)}
                className="w-full py-2.5 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-bold flex items-center justify-between transition-colors border border-red-500/30"
              >
                <span>Delete Motorcycle Record</span>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AssignMechanicModal
        isOpen={isAssignOpen}
        bike={bike}
        onClose={() => setIsAssignOpen(false)}
        onAssign={async (bId, mec) => {
          const updated = await assignMechanic(bId, mec);
          setBike(updated);
        }}
      />

      <GenerateInvoiceModal
        isOpen={isInvoiceOpen}
        bike={bike}
        onClose={() => setIsInvoiceOpen(false)}
        onAddInvoice={(id, data) => addToast(`Invoice created! Total: ₹${data.totalAmount}`, 'success')}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        bikeId={bike.id}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={async (bId) => {
          await deleteBike(bId);
          navigate('/admin/bikes');
        }}
      />
    </AppShell>
  );
}
