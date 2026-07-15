import React, { createContext, useContext, useReducer } from 'react';
import { jobs as initialJobs } from '../data/jobs';

const JobContext = createContext(null);

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CHECKLIST': {
      const { jobId, itemId } = action.payload;
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id !== jobId
            ? job
            : {
                ...job,
                checklist: job.checklist.map((item) =>
                  item.id !== itemId ? item : { ...item, checked: !item.checked }
                ),
              }
        ),
      };
    }
    case 'COMPLETE_JOB': {
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id !== action.payload.jobId
            ? job
            : { ...job, status: 'complete' }
        ),
      };
    }
    case 'ADVANCE_STAGE': {
      const { jobId } = action.payload;
      return {
        ...state,
        jobs: state.jobs.map((job) => {
          if (job.id !== jobId) return job;
          const currentIdx = job.stages.findIndex((s) => s.current);
          const nextIdx = currentIdx + 1;
          if (nextIdx >= job.stages.length) return job;
          const newStages = job.stages.map((s, i) => ({
            ...s,
            completed: i < nextIdx,
            current: i === nextIdx,
          }));
          return { ...job, stages: newStages, currentStage: newStages[nextIdx].id };
        }),
      };
    }
    default:
      return state;
  }
};

export function JobProvider({ children }) {
  const [state, dispatch] = useReducer(jobReducer, { jobs: initialJobs });

  const toggleChecklistItem = (jobId, itemId) =>
    dispatch({ type: 'TOGGLE_CHECKLIST', payload: { jobId, itemId } });

  const completeJob = (jobId) =>
    dispatch({ type: 'COMPLETE_JOB', payload: { jobId } });

  const advanceStage = (jobId) =>
    dispatch({ type: 'ADVANCE_STAGE', payload: { jobId } });

  const getJobById = (id) => state.jobs.find((j) => j.id === id) || null;

  const getJobByVehicleId = (vehicleId) =>
    state.jobs.find((j) => j.vehicleId === vehicleId) || null;

  return (
    <JobContext.Provider
      value={{ jobs: state.jobs, toggleChecklistItem, completeJob, advanceStage, getJobById, getJobByVehicleId }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJob() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJob must be used within JobProvider');
  return ctx;
}
