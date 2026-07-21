import React from 'react';
import { Clock, AlertCircle, TrendingUp } from 'lucide-react';

const STATUS_STYLES = {
  present:    'bg-green-50 text-green-700 border-green-200',
  absent:     'bg-red-50 text-red-700 border-red-200',
  'on-leave': 'bg-blue-50 text-blue-700 border-blue-200',
  late:       'bg-amber-50 text-amber-700 border-amber-200',
};

export default function AttendanceTable({ records, onMark, onEdit }) {
  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-text-secondary">
        <Clock size={40} className="mb-3 opacity-30" />
        <p className="font-medium">No attendance records</p>
        <p className="text-sm mt-1">No data for the selected date.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {['Mechanic', 'Check In', 'Check Out', 'Hours', 'Late', 'Overtime', 'Status', 'Actions'].map(h => (
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-widest text-text-secondary py-3 px-4 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => {
            let hours = '—';
            if (rec.checkIn && rec.checkOut) {
              const [ih, im] = rec.checkIn.split(':').map(Number);
              const [oh, om] = rec.checkOut.split(':').map(Number);
              const mins = (oh * 60 + om) - (ih * 60 + im);
              hours = `${Math.floor(mins / 60)}h ${mins % 60}m`;
            } else if (rec.checkIn) {
              hours = 'Active';
            }

            return (
              <tr key={rec.id || i} className="border-b border-border/60 hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-medium text-text-primary text-sm">{rec.mechanicName}</span>
                  <p className="text-xs text-text-secondary">{rec.mechanicId}</p>
                </td>
                <td className="py-3.5 px-4 text-sm text-text-primary font-mono">{rec.checkIn || '—'}</td>
                <td className="py-3.5 px-4 text-sm text-text-primary font-mono">{rec.checkOut || '—'}</td>
                <td className="py-3.5 px-4 text-sm">
                  <span className={hours === 'Active' ? 'text-green-600 font-semibold' : 'text-text-primary'}>{hours}</span>
                </td>
                <td className="py-3.5 px-4">
                  {rec.late
                    ? <span className="flex items-center gap-1 text-amber-600 text-xs font-medium"><AlertCircle size={12} /> Late</span>
                    : <span className="text-text-secondary text-xs">—</span>}
                </td>
                <td className="py-3.5 px-4">
                  {rec.overtime
                    ? <span className="flex items-center gap-1 text-blue-600 text-xs font-medium"><TrendingUp size={12} /> OT</span>
                    : <span className="text-text-secondary text-xs">—</span>}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[rec.late ? 'late' : rec.status] || STATUS_STYLES.present}`}>
                    {rec.status === 'on-leave' ? 'On Leave' : rec.late ? 'Late' : rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    {onMark && (
                      <button onClick={() => onMark(rec)} className="text-xs text-accent font-medium hover:underline">Mark</button>
                    )}
                    {onEdit && (
                      <button onClick={() => onEdit(rec)} className="text-xs text-text-secondary font-medium hover:underline">Edit</button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
