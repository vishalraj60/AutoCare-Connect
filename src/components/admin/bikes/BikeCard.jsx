import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusPill from '../../ui/StatusPill';
import {
  Bike, Calendar, User, Phone, Gauge, Wrench, Clock, ChevronRight,
  Eye, Edit3, UserCheck, History, FileText, Trash2, ShieldCheck, Sparkles
} from 'lucide-react';

export default function BikeCard({
  bike,
  onEdit,
  onAssignMechanic,
  onViewHistory,
  onGenerateInvoice,
  onDelete,
}) {
  const navigate = useNavigate();
  const {
    id,
    regNumber,
    brand,
    model,
    variant,
    owner,
    odometer,
    lastServiceDate,
    nextServiceDue,
    status,
    serviceProgress = 0,
    currentService,
    assignedMechanic,
    estimatedDelivery,
    image,
    priority,
  } = bike;

  const isCompletedOrReady = status === 'Ready' || status === 'Completed' || status === 'Delivered';

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Image Section */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center text-slate-400">
            <Bike size={48} className="stroke-1 text-slate-500 mb-1" />
            <span className="text-xs font-semibold uppercase tracking-wider">{brand}</span>
          </div>
        )}

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-slate-900/90 backdrop-blur-md text-white font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-md">
            {regNumber}
          </span>
          <StatusPill status={status} className="shadow-md backdrop-blur-md" />
        </div>

        {/* Priority Badge */}
        {priority === 'High' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-red-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
            <Sparkles size={11} /> High Priority
          </div>
        )}

        {/* Bike ID */}
        <div className="absolute bottom-3 right-3 text-white/80 font-mono text-[11px] font-semibold bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
          {id}
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title & Brand */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {brand} {model}
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium mb-3">
            {variant} • <span className="text-slate-700">{brand}</span>
          </p>

          {/* Owner details */}
          <div className="bg-slate-50 rounded-xl p-2.5 mb-3 border border-slate-100 space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                <User size={13} className="text-blue-600" />
                <span className="truncate">{owner?.name || 'Walk-in Customer'}</span>
              </div>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded">
                Owner
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
              <Phone size={12} />
              <span>{owner?.phone || 'N/A'}</span>
            </div>
          </div>

          {/* Mileage & Dates Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50/70 p-1.5 rounded-lg border border-slate-100">
              <Gauge size={13} className="text-slate-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 font-medium leading-none">Mileage</p>
                <p className="font-bold text-slate-800 truncate leading-tight">{odometer?.toLocaleString() || 0} KM</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50/70 p-1.5 rounded-lg border border-slate-100">
              <Calendar size={13} className="text-slate-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 font-medium leading-none">Next Due</p>
                <p className="font-bold text-slate-800 truncate leading-tight">{nextServiceDue || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Service Progress & Mechanic Section */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Wrench size={13} className="text-blue-600" />
                <span className="font-semibold text-slate-800">{currentService || 'General Service'}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                {serviceProgress}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isCompletedOrReady ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                }`}
                style={{ width: `${serviceProgress}%` }}
              />
            </div>

            {/* Mechanic & Est Delivery */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                  {assignedMechanic?.avatar || 'M'}
                </div>
                <span className="font-medium text-slate-700 truncate max-w-[110px]">
                  {assignedMechanic?.name || 'Unassigned'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Clock size={11} />
                <span className="truncate max-w-[100px]">{estimatedDelivery || 'Pending'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Footer Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
          <button
            onClick={() => navigate(`/admin/bikes/${id}`)}
            className="flex-1 py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
            title="View Full Profile"
          >
            <Eye size={13} /> View
          </button>
          <button
            onClick={() => onAssignMechanic(bike)}
            className="py-1.5 px-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            title="Assign Mechanic"
          >
            <UserCheck size={13} />
          </button>
          <button
            onClick={() => onEdit(bike)}
            className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            title="Edit Details"
          >
            <Edit3 size={13} />
          </button>
          <button
            onClick={() => onGenerateInvoice(bike)}
            className="py-1.5 px-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            title="Invoice"
          >
            <FileText size={13} />
          </button>
          <button
            onClick={() => onDelete(bike.id)}
            className="py-1.5 px-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 hover:text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            title="Delete Vehicle"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
