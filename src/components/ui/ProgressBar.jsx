import React from 'react';

export default function ProgressBar({ value = 0, max = 100, color = 'blue', className = '' }) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    blue:  'bg-accent',
    red:   'bg-danger',
    green: 'bg-success',
    gray:  'bg-slate-300',
    amber: 'bg-warning',
  };
  return (
    <div className={`w-full h-1.5 bg-slate-100 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
