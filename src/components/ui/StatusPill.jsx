import React from 'react';

// Maps status strings to tailwind color classes
const STATUS_STYLES = {
  registered:      'bg-purple-50 text-purple-700 border border-purple-200',
  'in service':    'bg-blue-50 text-blue-700 border border-blue-200',
  'in-service':    'bg-blue-50 text-blue-700 border border-blue-200',
  ready:           'bg-emerald-50 text-emerald-700 border border-emerald-200',
  delivered:       'bg-slate-100 text-slate-800 border border-slate-300',
  'pending pickup':'bg-amber-50 text-amber-700 border border-amber-200',
  completed:       'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled:       'bg-red-50 text-red-600 border border-red-200',
  confirmed:       'bg-green-50 text-green-700 border border-green-200',
  complete:        'bg-green-50 text-green-700 border border-green-200',
  ok:              'bg-green-50 text-green-700 border border-green-200',
  'in-progress':   'bg-blue-50 text-blue-700 border border-blue-200',
  pending:         'bg-amber-50 text-amber-700 border border-amber-200',
  booked:          'bg-blue-50 text-blue-700 border border-blue-200',
  occupied:        'bg-red-50 text-red-600 border border-red-200',
  available:       'bg-green-50 text-green-700 border border-green-200',
  paid:            'bg-emerald-50 text-emerald-700 border border-emerald-200',
  due:             'bg-amber-50 text-amber-600 border border-amber-200',
};

const STATUS_LABELS = {
  'in-progress': 'In Progress',
  'in-service':  'In Service',
  'in service':  'In Service',
  'pending pickup': 'Pending Pickup',
};

export default function StatusPill({ status, label, className = '' }) {
  const normalizedKey = String(status || '').toLowerCase().trim();
  const style = STATUS_STYLES[normalizedKey] || 'bg-slate-100 text-slate-600 border border-slate-200';
  const displayLabel = label || STATUS_LABELS[normalizedKey] || (status ? String(status).charAt(0).toUpperCase() + String(status).slice(1) : '');
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${style} ${className}`}>
      {displayLabel}
    </span>
  );
}
