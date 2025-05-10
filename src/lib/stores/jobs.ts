import { writable, get } from 'svelte/store';

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

// Generate a hash from the job parameters to use as a unique identifier
export function generateJobHash(analysisId: string, method: string, configuration: string): string {
  // Combine the parameters into a single string
  const hashInput = `${analysisId}:${method}:${configuration}`;
  
  // Use a simple hash function
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    const char = hashInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to a hex string and ensure it's positive
  return Math.abs(hash).toString(16);
}

// Find a job by its hash
export function findJobByHash(analysisId: string, method: string, configuration: string): Job | null {
  const hash = generateJobHash(analysisId, method, configuration);
  const allJobs = get(jobs);
  
  return allJobs.find(job => job.id === hash) || null;
}

export function addJob(job: Omit<Job, 'id' | 'createdAt'>) {
  // Generate a hash-based ID for the job
  const jobId = generateJobHash(job.analysisId, job.method, job.configuration);
  
  // Check if a job with this hash already exists
  const existingJobs = get(jobs);
  const jobExists = existingJobs.some(existingJob => existingJob.id === jobId);
  
  // If the job doesn't exist, add it
  if (!jobExists) {
    jobs.update(items => {
      const newJob = {
        ...job,
        id: jobId,
        createdAt: new Date().toISOString()
      };
      return [...items, newJob];
    });
  }
  
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

export function updateJobStatus(jobId: string, status: string) {
  jobs.update(items => items.map(item => {
    if (item.id === jobId) {
      return {
        ...item,
        status
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
