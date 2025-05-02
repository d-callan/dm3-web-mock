import { writable } from 'svelte/store';

export interface Job {
  id: string;
  analysisId: string;
  method: string;
  status: string;
  configuration: string;
  resultsUrl: string;
  resultsData: string | null; // Stores JSON string of results
  createdAt: string;
}

// Create the store with empty initial state
const jobs = writable<Job[]>([]);

// Handle browser-side initialization
if (typeof window !== 'undefined') {
  // Load initial state from localStorage
  const storedJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  jobs.set(storedJobs);

  // Subscribe to changes and update localStorage
  jobs.subscribe(value => {
    localStorage.setItem('jobs', JSON.stringify(value));
  });
}

export function addJob(job: Omit<Job, 'id' | 'createdAt'>) {
  let jobId = '';
  jobs.update(items => {
    const newJob = {
      ...job,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    jobId = newJob.id;
    return [...items, newJob];
  });
  return jobId;
}

export function updateJobResults(jobId: string, resultsJson: string) {
  jobs.update(items => items.map(item => {
    if (item.id === jobId) {
      return {
        ...item,
        resultsData: resultsJson
      };
    }
    return item;
  }));
}

export function removeJobsByAnalysisId(analysisId: string) {
  jobs.update(items => items.filter(item => item.analysisId !== analysisId));
}

export function removeJob(jobId: string) {
  jobs.update(items => items.filter(item => item.id !== jobId));
}

export function getJobsByAnalysisId(analysisId: string) {
  let result: Job[] = [];
  jobs.subscribe(value => {
    result = value.filter(item => item.analysisId === analysisId);
  });
  return result;
}

export function getJobById(jobId: string) {
  let result: Job | null = null;
  jobs.subscribe(value => {
    result = value.find(item => item.id === jobId) || null;
  });
  return result;
}

export { jobs };
