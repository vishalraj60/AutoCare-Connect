import React from 'react';

const DOT_COLORS = {
  blue:  'bg-accent',
  green: 'bg-success',
  gray:  'bg-slate-300',
  amber: 'bg-warning',
  red:   'bg-danger',
};

export default function ActivityTimeline({ items }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <div key={item.id} className="flex gap-4 relative">
          {/* Dot + line */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ${DOT_COLORS[item.color] || 'bg-slate-300'}`} />
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1 mb-0" style={{ minHeight: 32 }} />
            )}
          </div>

          {/* Content */}
          <div className={`pb-6 ${i === items.length - 1 ? 'pb-0' : ''} min-w-0`}>
            <p className="text-xs text-text-secondary mb-0.5">{item.date}</p>
            <p className="text-sm font-semibold text-text-primary mb-1">{item.title}</p>
            {item.quote && (
              <div className="bg-slate-50 border border-border rounded-lg p-3 text-xs text-text-secondary leading-relaxed">
                "{item.quote}"
              </div>
            )}
            {item.description && (
              <p className="text-xs text-text-secondary">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
