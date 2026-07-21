import React from 'react';
import { LogIn, Wrench, Play, Coffee, PlayCircle, LogOut, CheckCircle } from 'lucide-react';

const EVENT_CONFIG = {
  'check-in':    { icon: LogIn,        color: 'text-green-500',  bg: 'bg-green-50',  border: 'border-green-200' },
  'job-assigned':{ icon: Wrench,       color: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  'job-started': { icon: Play,         color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  'job-complete':{ icon: CheckCircle,  color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  'break':       { icon: Coffee,       color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  'break-end':   { icon: PlayCircle,   color: 'text-green-500',  bg: 'bg-green-50',  border: 'border-green-200' },
  'check-out':   { icon: LogOut,       color: 'text-slate-500',  bg: 'bg-slate-100', border: 'border-slate-200' },
};

export default function MechanicTimeline({ events = [] }) {
  if (!events.length) {
    return (
      <div className="text-center py-8 text-text-secondary text-sm">
        No activity recorded today.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      <div className="space-y-4">
        {events.map((event, i) => {
          const cfg = EVENT_CONFIG[event.type] || EVENT_CONFIG['job-started'];
          const Icon = cfg.icon;
          return (
            <div key={event.id || i} className="flex gap-3 relative">
              {/* Icon bubble */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${cfg.bg} ${cfg.border} z-10`}>
                <Icon size={14} className={cfg.color} />
              </div>
              {/* Content */}
              <div className="flex-1 pb-2">
                <p className="text-sm font-semibold text-text-primary">{event.label}</p>
                <p className="text-xs text-text-secondary">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
