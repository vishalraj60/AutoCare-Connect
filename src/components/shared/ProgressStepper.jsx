import React from 'react';
import { CheckCircle2, Circle, MoreHorizontal } from 'lucide-react';

export default function ProgressStepper({ stages, variant = 'mechanic' }) {
  // variant: 'mechanic' (4 stages, horizontal circles+labels)
  //          'customer' (5 stage labels + progress bar)

  if (variant === 'customer') {
    const labels = stages.map(s => s.label);
    const currentIdx = stages.findIndex(s => s.current);
    const progressPct = ((currentIdx + 1) / stages.length) * 100;

    return (
      <div>
        <div className="w-full h-1.5 bg-white/20 rounded-full mb-2">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between">
          {stages.map((s, i) => (
            <span
              key={s.id}
              className={`text-[10px] font-medium ${
                s.current ? 'text-white font-bold' :
                s.completed ? 'text-blue-200' : 'text-blue-300/60'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // mechanic variant — circles with check/current/pending
  return (
    <div className="flex items-center gap-0">
      {stages.map((stage, i) => {
        const isLast = i === stages.length - 1;
        return (
          <React.Fragment key={stage.id}>
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                stage.completed
                  ? 'bg-accent border-accent text-white'
                  : stage.current
                    ? 'bg-white border-accent text-accent shadow-md shadow-accent/20'
                    : 'bg-white border-slate-200 text-slate-300'
              }`}>
                {stage.completed ? (
                  <CheckCircle2 size={20} className="text-white" fill="currentColor" />
                ) : stage.current ? (
                  <div className="w-3 h-3 bg-accent rounded-full" />
                ) : (
                  <MoreHorizontal size={18} className="text-slate-300" />
                )}
              </div>
              {/* Label */}
              <span className={`text-xs font-medium text-center whitespace-nowrap ${
                stage.completed || stage.current ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {stage.label}
              </span>
            </div>
            {/* Connector */}
            {!isLast && (
              <div className={`flex-1 h-0.5 mb-5 mx-1 ${
                stages[i + 1]?.completed || stage.completed ? 'bg-accent' : 'bg-slate-200'
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
