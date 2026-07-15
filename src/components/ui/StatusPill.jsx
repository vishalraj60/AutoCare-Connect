import React from 'react';

// Maps status strings to tailwind color classes
const STATUS_STYLES = {
  confirmed:   'bg-green-50 text-green-700 border border-green-200',
  complete:    'bg-green-50 text-green-700 border border-green-200',
  ready:       'bg-green-50 text-green-700 border border-green-200',
  ok:          'bg-green-50 text-green-700 border border-green-200',
  'in-progress': 'bg-slate-100 text-slate-600 border border-slate-200',
  'in-service':  'bg-blue-50 text-blue-700 border border-blue-200',
  pending:     'bg-slate-100 text-slate-500 border border-slate-200',
  booked:      'bg-blue-50 text-blue-700 border border-blue-200',
  occupied:    'bg-red-50 text-red-600 border border-red-200',
  cleaning:    'bg-slate-100 text-slate-500 border border-slate-200',
  available:   'bg-green-50 text-green-700 border border-green-200',
  low:         'bg-red-50 text-red-600',
  worn:        'bg-amber-50 text-amber-600 border border-amber-200',
  overdue:     'bg-red-50 text-red-600 border border-red-200',
  paid:        'bg-green-50 text-green-700 border border-green-200',
  due:         'bg-amber-50 text-amber-600 border border-amber-200',
  cancelled:   'bg-red-50 text-red-600 border border-red-200',
};

const STATUS_LABELS = {
  'in-progress': 'In Progress',
  'in-service':  'In Service',
};

export default function StatusPill({ status, label, className = '' }) {
  const style = STATUS_STYLES[status] || 'bg-slate-100 text-slate-500 border border-slate-200';
  const displayLabel = label || STATUS_LABELS[status] || status?.charAt(0).toUpperCase() + status?.slice(1);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} ${className}`}>
      {displayLabel}
    </span>
  );
}
