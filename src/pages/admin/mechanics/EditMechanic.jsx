import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  User, Briefcase, Tag, Bike as BikeIcon, Clock, FileText,
  ChevronRight, ChevronLeft, Check, Plus, X, RefreshCw, AlertCircle,
} from 'lucide-react';
import AppShell from '../../../components/layout/AppShell';
import TopBar from '../../../components/layout/TopBar';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { useMechanic } from '../../../context/MechanicContext';
import { SPECIALIZATIONS, BIKE_BRANDS, SKILL_LEVELS, BLOOD_GROUPS } from '../../../data/mechanics';

const SECTIONS = [
  { id: 'personal',  label: 'Personal Info',   icon: User },
  { id: 'employment',label: 'Employment',       icon: Briefcase },
  { id: 'specs',     label: 'Specializations',  icon: Tag },
  { id: 'brands',    label: 'Bike Brands',      icon: BikeIcon },
  { id: 'schedule',  label: 'Schedule',         icon: Clock },
  { id: 'certs',     label: 'Certificates',     icon: FileText },
];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const SHIFTS = ['Morning', 'Evening', 'Night'];

export default function EditMechanic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMechanicById, updateMechanic } = useMechanic();

  const [step, setStep]             = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [mechanic, setMechanic]     = useState(null);

  const { register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const data = getMechanicById(id);
    if (data) {
      setMechanic(data);
      reset({
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        dob: data.dob,
        gender: data.gender,
        bloodGroup: data.bloodGroup || '',
        emergencyContact: data.emergencyContact || '',
        joiningDate: data.joiningDate,
        salary: data.salary,
        experience: data.experience,
        skillLevel: data.skillLevel,
        qualification: data.qualification,
        status: data.status,
        specializations: data.specializations || [],
        bikeBrands: data.bikeBrands || [],
        shift: data.shift || 'Morning',
        workingDays: data.workingDays || [],
        weeklyOff: data.weeklyOff || 'Sunday',
        breakTime: data.breakTime || '',
        certificates: data.certificates || [],
      });
    }
  }, [id, getMechanicById, reset]);

  if (!mechanic) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-secondary">Loading mechanic...</p>
        </div>
      </AppShell>
    );
  }

  const toggleMulti = (field, value) => {
    const curr = getValues(field) || [];
    const next = curr.includes(value) ? curr.filter(v => v !== value) : [...curr, value];
    setValue(field, next);
  };

  const watchedSpecs   = watch('specializations') || [];
  const watchedBrands  = watch('bikeBrands') || [];
  const watchedDays    = watch('workingDays') || [];
  const watchedCerts   = watch('certificates') || [];

  const addCert = () => setValue('certificates', [...watchedCerts, { name: '', number: '', expiry: '' }]);
  const removeCert = (i) => setValue('certificates', watchedCerts.filter((_, idx) => idx !== i));

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await updateMechanic(id, data);
      navigate(`/admin/mechanics/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    /* Step 0 — Personal */
    <div key="personal" className="space-y-5">
      <SectionHeader icon={User} title="Personal Information" subtitle="Update basic details" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Full Name *" error={errors.name}>
          <input {...register('name', { required: 'Required' })} placeholder="Arjun Sharma" className="field-input" />
        </Field>
        <Field label="Username (Read Only)">
          <input {...register('username')} readOnly className="field-input bg-slate-50 text-text-secondary" />
        </Field>
        <Field label="Email *" error={errors.email}>
          <input {...register('email', { required: 'Required' })} placeholder="arjun@bikecare.in" className="field-input" />
        </Field>
        <Field label="Phone *" error={errors.phone}>
          <input {...register('phone', { required: 'Required' })} placeholder="9876543210" className="field-input" />
        </Field>
        <Field label="Date of Birth">
          <input type="date" {...register('dob')} className="field-input" />
        </Field>
        <Field label="Gender">
          <select {...register('gender')} className="field-input">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </Field>
        <Field label="Blood Group">
          <select {...register('bloodGroup')} className="field-input">
            <option value="">Select</option>
            {BLOOD_GROUPS.map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Emergency Contact">
          <input {...register('emergencyContact')} placeholder="9123456789" className="field-input" />
        </Field>
        <Field label="Address" className="col-span-2">
          <textarea {...register('address')} rows={2} placeholder="Full address" className="field-input resize-none" />
        </Field>
      </div>
    </div>,

    /* Step 1 — Employment */
    <div key="employment" className="space-y-5">
      <SectionHeader icon={Briefcase} title="Employment Details" subtitle="Update salary and qualifications" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Mechanic ID">
          <input value={id} readOnly className="field-input bg-slate-50 font-mono font-semibold text-accent" />
        </Field>
        <Field label="Joining Date">
          <input type="date" {...register('joiningDate')} className="field-input" />
        </Field>
        <Field label="Salary (₹/month)">
          <input type="number" {...register('salary')} placeholder="25000" className="field-input" />
        </Field>
        <Field label="Experience (years)">
          <input type="number" {...register('experience')} placeholder="3" min="0" className="field-input" />
        </Field>
        <Field label="Skill Level">
          <select {...register('skillLevel')} className="field-input">
            {SKILL_LEVELS.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select {...register('status')} className="field-input">
            <option value="available">Available</option>
            <option value="working">Working</option>
            <option value="on-leave">On Leave</option>
            <option value="break">Break</option>
            <option value="offline">Offline</option>
          </select>
        </Field>
        <Field label="Qualification" className="col-span-2">
          <input {...register('qualification')} placeholder="ITI Automobile" className="field-input" />
        </Field>
      </div>
    </div>,

    /* Step 2 — Specializations */
    <div key="specs" className="space-y-5">
      <SectionHeader icon={Tag} title="Specializations" subtitle="Update areas of expertise" />
      <div className="flex flex-wrap gap-2">
        {SPECIALIZATIONS.map(s => {
          const sel = watchedSpecs.includes(s);
          return (
            <button key={s} type="button" onClick={() => toggleMulti('specializations', s)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                sel ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-text-primary border-border hover:border-blue-300 hover:bg-blue-50'
              }`}>
              {sel && <Check size={12} className="inline mr-1" />}{s}
            </button>
          );
        })}
      </div>
    </div>,

    /* Step 3 — Bike Brands */
    <div key="brands" className="space-y-5">
      <SectionHeader icon={BikeIcon} title="Bike Brand Expertise" subtitle="Update brand expertise" />
      <div className="flex flex-wrap gap-2">
        {BIKE_BRANDS.map(b => {
          const sel = watchedBrands.includes(b);
          return (
            <button key={b} type="button" onClick={() => toggleMulti('bikeBrands', b)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                sel ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-text-primary border-border hover:border-orange-300 hover:bg-orange-50'
              }`}>
              {sel && <Check size={12} className="inline mr-1" />}{b}
            </button>
          );
        })}
      </div>
    </div>,

    /* Step 4 — Schedule */
    <div key="schedule" className="space-y-5">
      <SectionHeader icon={Clock} title="Working Schedule" subtitle="Update shift times and weekly off" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Shift">
          <select {...register('shift')} className="field-input">
            {SHIFTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Weekly Off">
          <select {...register('weeklyOff')} className="field-input">
            {DAYS.map(d => <option key={d}>{d === 'Sun' ? 'Sunday' : d === 'Sat' ? 'Saturday' : d}</option>)}
          </select>
        </Field>
        <Field label="Break Time" className="col-span-2">
          <input {...register('breakTime')} placeholder="1:00 PM - 1:30 PM" className="field-input" />
        </Field>
        <Field label="Working Days" className="col-span-2">
          <div className="flex gap-2 flex-wrap">
            {DAYS.map(d => {
              const sel = watchedDays.includes(d);
              return (
                <button key={d} type="button" onClick={() => toggleMulti('workingDays', d)}
                  className={`w-12 h-10 rounded-xl text-xs font-bold border transition-all ${
                    sel ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-text-secondary border-border hover:border-blue-300'
                  }`}>{d}</button>
              );
            })}
          </div>
        </Field>
      </div>
    </div>,

    /* Step 5 — Certificates */
    <div key="certs" className="space-y-5">
      <SectionHeader icon={FileText} title="Certificates" subtitle="Update professional credentials" />
      <div className="space-y-3">
        {watchedCerts.map((cert, i) => (
          <div key={i} className="bg-slate-50 border border-border rounded-xl p-4 relative">
            <button type="button" onClick={() => removeCert(i)}
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-white border border-border text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors">
              <X size={12} />
            </button>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Certificate Name">
                <input {...register(`certificates.${i}.name`)} placeholder="Royal Enfield Certified" className="field-input" />
              </Field>
              <Field label="Certificate Number">
                <input {...register(`certificates.${i}.number`)} placeholder="RE-2022-001" className="field-input" />
              </Field>
              <Field label="Expiry Date">
                <input type="date" {...register(`certificates.${i}.expiry`)} className="field-input" />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addCert}
          className="w-full border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 text-text-secondary hover:border-accent hover:text-accent transition-colors">
          <Plus size={16} /> Add Certificate
        </button>
      </div>
    </div>,
  ];

  const isLast = step === SECTIONS.length - 1;

  return (
    <AppShell>
      <TopBar user={{ name: 'Admin', initials: 'AD' }} showNewBooking={false}>
        <button onClick={() => navigate(`/admin/mechanics/${id}`)} className="btn-outline text-xs">
          ← Cancel and Return
        </button>
      </TopBar>

      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-page-bg">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Edit Mechanic Details</h1>
            <p className="text-text-secondary text-sm">Updating {mechanic.name} ({id})</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-0 mb-8">
            {SECTIONS.map((sec, i) => {
              const Icon = sec.icon;
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={sec.id}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all
                        ${done ? 'bg-accent border-accent text-white cursor-pointer'
                              : active ? 'bg-white border-accent text-accent shadow-md'
                              : 'bg-white border-slate-200 text-slate-300'}`}
                    >
                      {done ? <Check size={15} /> : <Icon size={15} />}
                    </button>
                    <span className={`text-[9px] font-semibold uppercase tracking-wide ${active ? 'text-accent' : done ? 'text-green-600' : 'text-slate-400'}`}>
                      {sec.label.split(' ')[0]}
                    </span>
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div className={`flex-1 h-px mx-1 mb-4 ${done ? 'bg-accent' : 'bg-slate-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mb-5">
              {steps[step]}
            </Card>

            <div className="flex items-center justify-between">
              <Button type="button" variant="outline"
                onClick={() => step === 0 ? navigate(`/admin/mechanics/${id}`) : setStep(s => s - 1)}>
                <ChevronLeft size={14} />
                {step === 0 ? 'Cancel' : 'Back'}
              </Button>
              {isLast ? (
                <Button type="submit" variant="accent" disabled={submitting}>
                  {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                  {submitting ? 'Saving…' : 'Save Changes'}
                </Button>
              ) : (
                <Button type="button" variant="accent" onClick={() => setStep(s => s + 1)}>
                  Next <ChevronRight size={14} />
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </AppShell>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
        <Icon size={18} className="text-accent" />
      </div>
      <div>
        <h2 className="font-bold text-text-primary">{title}</h2>
        <p className="text-text-secondary text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({ label, error, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">{label}</label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-[11px] text-danger">
          <AlertCircle size={10} /> {error.message}
        </span>
      )}
    </div>
  );
}
