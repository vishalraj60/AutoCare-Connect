import React from 'react';
import StatusPill from '../ui/StatusPill';
import ProgressBar from '../ui/ProgressBar';
import { Wrench, User } from 'lucide-react';

export default function BayCard({ bay }) {
  const { id, status, vehicle, service, mechanic, progress } = bay;
  const isOccupied = status === 'occupied';
  const isCleaning = status === 'cleaning';

  return (
    <div className={`flex-1 min-w-0 rounded-xl border p-4 ${isOccupied ? 'border-border bg-white' : 'border-border bg-white'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-text-primary">Bay {id}</span>
        <StatusPill status={status} label={isOccupied ? 'Occupied' : isCleaning ? 'Cleaning' : 'Available'} />
      </div>

      {/* Vehicle info */}
      <p className={`text-sm font-semibold mb-1 ${isCleaning ? 'text-text-secondary' : 'text-text-primary'}`}>
        {vehicle}
      </p>
      <p className="text-xs text-text-secondary mb-3">
        {service}{mechanic ? ` - ${mechanic}` : ''}
      </p>

      {/* Progress */}
      <ProgressBar
        value={progress}
        color={isOccupied ? 'red' : 'gray'}
        className="h-1"
      />
    </div>
  );
}
