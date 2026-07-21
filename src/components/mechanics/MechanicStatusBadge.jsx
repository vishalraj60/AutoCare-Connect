import React from 'react';

const STATUS_CONFIG = {
  available:  { label: 'Available',  dot: 'bg-green-400',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200',  pulse: true },
  working:    { label: 'Working',    dot: 'bg-orange-400', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', pulse: true },
  'on-leave': { label: 'On Leave',  dot: 'bg-blue-400',   text: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200',   pulse: false },
  break:      { label: 'Break',      dot: 'bg-purple-400', text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', pulse: false },
  offline:    { label: 'Offline',    dot: 'bg-slate-400',  text: 'text-slate-600',  bg: 'bg-slate-100', border: 'border-slate-200',  pulse: false },
};

export default function MechanicStatusBadge({ status, size = 'md', showDot = true }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.offline;
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2 py-0.5';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${cfg.bg} ${cfg.text} ${cfg.border} ${sizeClass}`}>
      {showDot && (
        <span className={`${dotSize} rounded-full flex-shrink-0 ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
      )}
      {cfg.label}
    </span>
  );
}
