import React from 'react';
import StatusPill from '../ui/StatusPill';
import { FileText } from 'lucide-react';

export default function ChecklistItem({ item, onToggle }) {
  const { id, title, subtitle, checked, status, note } = item;

  const isPending = !checked;

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
      isPending
        ? 'border-accent/40 bg-blue-50/30'
        : 'border-border bg-white'
    }`}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(id)}
        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-all ${
          checked
            ? 'bg-accent border-accent text-white'
            : 'border-slate-300 bg-white'
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${checked ? 'text-text-primary' : 'text-text-primary'}`}>
          {title}
        </p>
        <p className="text-xs text-text-secondary">{subtitle}</p>
      </div>

      {/* Status + Note */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <StatusPill status={status} />
        {checked ? (
          <button className="text-xs text-accent font-medium flex items-center gap-1 hover:underline">
            <FileText size={12} />
            Note
          </button>
        ) : (
          <button className="text-xs text-accent font-medium border border-accent/40 px-2 py-0.5 rounded-lg hover:bg-accent/5 transition-colors">
            + Add Note
          </button>
        )}
      </div>
    </div>
  );
}
