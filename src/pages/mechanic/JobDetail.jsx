import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppShell from '../../components/layout/AppShell';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ChecklistItem from '../../components/shared/ChecklistItem';
import ProgressStepper from '../../components/shared/ProgressStepper';
import Avatar from '../../components/ui/Avatar';
import { useJob } from '../../context/JobContext';
import {
  Clock, MapPin, Phone, Camera, PlusCircle, CheckSquare,
} from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, toggleChecklistItem, completeJob } = useJob();

  const job = getJobById(id || 'AC-8829');

  if (!job) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Job not found.</p>
        </div>
      </AppShell>
    );
  }

  const completedCount = job.checklist.filter(i => i.checked).length;
  const totalCount = job.checklist.length;

  const handleComplete = () => {
    completeJob(job.id);
    navigate('/mechanic/jobs');
  };

  return (
    <AppShell>
      {/* TopBar with job title + clocked in badge */}
      <TopBar
        title={`Job #${job.id} - ${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`}
        searchPlaceholder=""
        showNewBooking={false}
        unreadCount={0}
      >
        <div className="flex items-center gap-1.5 bg-slate-100 border border-border px-3 py-1.5 rounded-lg">
          <Clock size={14} className="text-text-secondary" />
          <span className="text-sm font-medium text-text-primary">Clocked In: {job.clockedIn}</span>
        </div>
      </TopBar>

      {/* Scrollable main content + sticky footer */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <main className="flex-1 overflow-y-auto scrollbar-thin p-5 bg-page-bg">
          {/* Repair Progress */}
          <Card className="mb-4">
            <h2 className="text-base font-bold text-text-primary mb-5">Repair Progress</h2>
            <ProgressStepper stages={job.stages} variant="mechanic" />
          </Card>

          {/* Two column layout */}
          <div className="grid grid-cols-5 gap-4 mb-4">
            {/* Left: Vehicle + Customer */}
            <Card className="col-span-2 p-0" padding={false}>
              {/* Vehicle image */}
              <div className="relative">
                <div className="w-full h-44 bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-xl flex items-center justify-center overflow-hidden">
                  <span className="text-6xl">🚙</span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 shadow-card-md">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-semibold text-text-primary">In Bay {job.bayNumber}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-bold text-text-primary mb-0.5">
                  {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                </h3>
                <p className="text-xs text-text-secondary mb-4">License: {job.vehicle.license}</p>

                {/* VIN + Mileage boxes */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-text-secondary mb-0.5">VIN</p>
                    <p className="text-xs font-mono font-medium text-text-primary truncate">{job.vehicle.vin}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-text-secondary mb-0.5">Mileage</p>
                    <p className="text-xs font-medium text-text-primary">{job.vehicle.mileage.toLocaleString()} mi</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-text-secondary mb-3">Customer Details</p>
                  <div className="flex items-center gap-3">
                    <Avatar initials={job.customer.initials} color="#0F2A4A" size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-primary">{job.customer.name}</p>
                      <p className="text-xs text-text-secondary truncate">{job.customer.email}</p>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex-shrink-0">
                      <Phone size={14} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right: Checklist + Photos */}
            <div className="col-span-3 space-y-4">
              {/* Digital Inspection Checklist */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-text-primary">Digital Inspection Checklist</h2>
                  <span className="text-xs font-semibold text-accent bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                    {completedCount}/{totalCount} Completed
                  </span>
                </div>
                <div className="space-y-2">
                  {job.checklist.map(item => (
                    <ChecklistItem
                      key={item.id}
                      item={item}
                      onToggle={(itemId) => toggleChecklistItem(job.id, itemId)}
                    />
                  ))}
                </div>
              </Card>

              {/* Job Photos */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-text-primary">Job Photos</h2>
                  <button className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                    <Camera size={14} />
                    Add More
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {job.photos.map(photo => (
                    <div key={photo.id} className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                        <Camera size={20} className="text-white/70" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                        <p className="text-white text-[9px] font-medium">{photo.label}</p>
                      </div>
                    </div>
                  ))}
                  {/* Upload After Photo */}
                  <button className="aspect-square border-2 border-dashed border-accent/40 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors">
                    <PlusCircle size={22} className="text-accent" />
                    <span className="text-[10px] text-accent font-semibold text-center px-1">Upload After Photo</span>
                  </button>
                  {/* Add Photo */}
                  <button className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors">
                    <Camera size={22} className="text-slate-300" />
                    <span className="text-[10px] text-text-secondary font-medium">Add Photo</span>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </main>

        {/* Sticky Footer */}
        <div className="border-t border-border bg-white px-5 py-3 flex items-center justify-end gap-3 flex-shrink-0">
          <Button variant="outline">Request Parts</Button>
          <Button variant="accent">Send Approval to Customer</Button>
          <Button
            variant="primary"
            onClick={handleComplete}
            className="flex items-center gap-1.5"
          >
            <CheckSquare size={15} />
            Complete Job
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
