// Job service shim — replace body with real fetch() calls when backend is ready
import { jobs } from '../data/jobs';

let _jobs = [...jobs]; // local mutable copy

export const getJobById = (id) =>
  Promise.resolve(_jobs.find((j) => j.id === id) || null);

export const getAllJobs = () =>
  Promise.resolve([..._jobs]);

export const updateChecklist = (jobId, checklistItemId, checked) => {
  _jobs = _jobs.map((j) =>
    j.id === jobId
      ? {
          ...j,
          checklist: j.checklist.map((c) =>
            c.id === checklistItemId ? { ...c, checked } : c
          ),
        }
      : j
  );
  return Promise.resolve(_jobs.find((j) => j.id === jobId));
};

export const completeJob = (jobId) => {
  _jobs = _jobs.map((j) =>
    j.id === jobId ? { ...j, status: 'complete' } : j
  );
  return Promise.resolve(_jobs.find((j) => j.id === jobId));
};

// TODO: swap with real API:
// export const getJobById = (id) => fetch(`/api/jobs/${id}`).then(r => r.json());
