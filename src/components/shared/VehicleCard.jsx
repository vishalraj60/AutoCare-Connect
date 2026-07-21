import React from 'react';
import StatusPill from '../ui/StatusPill';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useNavigate } from 'react-router-dom';

export default function VehicleCard({ vehicle, role = 'customer' }) {
  const navigate = useNavigate();
  const { make, model, year, vin, mileage, status, primary, jobId, image } = vehicle;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-border shadow-card hover:shadow-card-md transition-shadow">
      {/* Vehicle image */}
      <div className="w-28 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 relative">
        {image ? (
          <img src={image} alt={`${year} ${make} ${model}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <span className="text-2xl">🏍️</span>
          </div>
        )}
        {primary && (
          <span className="absolute top-1 left-1 bg-white/90 text-text-secondary text-[9px] font-semibold px-1.5 py-0.5 rounded">
            Primary
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-base font-bold text-text-primary">{year} {make} {model}</h3>
          <StatusPill status={status} />
        </div>
        <p className="text-xs text-text-secondary mb-3">
          VIN: {vin} • Mileage: {mileage?.toLocaleString()} km
        </p>
        <div className="flex gap-2">
          {status === 'in-service' ? (
            <>
              <Button variant="accent" size="sm" onClick={() => navigate(`/mechanic/jobs/${jobId}`)}>
                View Status
              </Button>
              <Button variant="outline" size="sm">History</Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">Book Service</Button>
              <Button variant="outline" size="sm">History</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
