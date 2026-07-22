import React, { useState } from 'react';
import { mechanics } from '../../../data/mechanics';
import { X, UserCheck, Wrench, Check } from 'lucide-react';

export default function AssignMechanicModal({ isOpen, bike, onClose, onAssign }) {
  const [selectedMechanicId, setSelectedMechanicId] = useState(bike?.assignedMechanic?.id || 'MEC-001');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !bike) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const mec = mechanics.find(m => m.id === selectedMechanicId);
      if (mec) {
        await onAssign(bike.id, {
          id: mec.id,
          name: mec.name,
          phone: mec.phone,
          avatar: mec.initials || 'M',
        });
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-backdrop">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden modal-enter flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck size={18} className="text-blue-400" />
            <h2 className="text-base font-bold">Assign Workshop Mechanic</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        {/* Bike summary banner */}
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-900">{bike.brand} {bike.model}</p>
            <p className="text-[11px] font-mono text-blue-700">{bike.regNumber} • {bike.currentService || 'General Service'}</p>
          </div>
          <span className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded font-mono font-bold border border-blue-200">
            {bike.id}
          </span>
        </div>

        {/* Mechanics Selection List */}
        <div className="p-6 space-y-3 max-h-[350px] overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Available Technicians</p>
          {mechanics.map((m) => {
            const isSelected = selectedMechanicId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setSelectedMechanicId(m.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    {m.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{m.name}</h4>
                    <p className="text-xs text-slate-500">{m.skillLevel} • {m.experience} yrs exp</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {m.specializations?.slice(0, 2).map((s) => (
                        <span key={s} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'}`}>
                  {isSelected && <Check size={14} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            {loading ? 'Assigning...' : 'Confirm Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
}
