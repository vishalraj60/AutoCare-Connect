import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Star, Clock, ChevronRight } from 'lucide-react';
import MechanicStatusBadge from './MechanicStatusBadge';

export default function MechanicCard({ mechanic }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/mechanics/${mechanic.id}`)}
      className="bg-white border border-border rounded-2xl p-4 cursor-pointer hover:-translate-y-1 hover:shadow-card-md transition-all duration-200 min-w-[220px] flex-shrink-0"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: mechanic.color }}
        >
          {mechanic.initials}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-text-primary text-sm truncate">{mechanic.name}</p>
          <p className="text-text-secondary text-xs">{mechanic.id}</p>
        </div>
        <div className="ml-auto">
          <MechanicStatusBadge status={mechanic.status} size="sm" />
        </div>
      </div>

      {/* Current job */}
      {mechanic.currentJob ? (
        <div className="bg-slate-50 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Bike size={12} className="text-accent" />
            <span className="text-xs font-semibold text-text-primary truncate">{mechanic.currentJob.model}</span>
          </div>
          <p className="text-[11px] text-text-secondary mb-2 truncate">{mechanic.currentJob.service}</p>
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${mechanic.currentJob.progress}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-accent flex-shrink-0">{mechanic.currentJob.progress}%</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Clock size={10} className="text-text-secondary" />
            <span className="text-[10px] text-text-secondary">ETA: {mechanic.currentJob.eta}</span>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-3 text-center">
          <p className="text-xs text-green-600 font-medium">Ready for assignment</p>
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between text-[11px] text-text-secondary">
        <div className="flex items-center gap-1">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-text-primary">{mechanic.avgRating}</span>
        </div>
        <span>{mechanic.todaysJobs} jobs today</span>
        <ChevronRight size={13} className="text-slate-300" />
      </div>
    </div>
  );
}
