import { writable } from 'svelte/store';

import { addJob as addJobToStore, removeJobsByAnalysisId } from './jobs';

export type AnalysisSourceType = 'new' | 'imported_id' | 'imported_json';

export interface Analysis {
  id: string;
  name: string;
  description: string;
  alignmentData?: string; // Alignment file content
  treeData?: string; // Tree file content (optional)
  validationData?: string; // HyPhy alignment validation results
  sourceType: AnalysisSourceType;
  jobIds: string[];
  createdAt: string;
}

// Create the store with empty initial state
const analyses = writable<Analysis[]>([]);

// Handle browser-side initialization
if (typeof window !== 'undefined') {
  // Load initial state from localStorage
  const storedAnalyses = JSON.parse(localStorage.getItem('analyses') || '[]');
  analyses.set(storedAnalyses);

  // Subscribe to changes and update localStorage
  analyses.subscribe(value => {
    localStorage.setItem('analyses', JSON.stringify(value));
  });
}

export function addAnalysis(analysis: Omit<Analysis, 'id' | 'createdAt' | 'jobIds'>) {
  let newAnalysisId = '';
  analyses.update(items => {
    const newAnalysis = {
      ...analysis,
      id: crypto.randomUUID(),
      jobIds: [],
      createdAt: new Date().toISOString()
    };
    newAnalysisId = newAnalysis.id;
    return [...items, newAnalysis];
  });

  // No longer automatically creating placeholder jobs for new analyses

  return newAnalysisId;
}

// Helper function to add a job ID to an analysis
export function addJobIdToAnalysis(analysisId: string, jobId: string) {
  analyses.update(items => {
    return items.map(item => {
      if (item.id === analysisId) {
        return {
          ...item,
          jobIds: [...item.jobIds, jobId]
        };
      }
      return item;
    });
  });
}



export function removeAnalysis(id: string) {
  removeJobsByAnalysisId(id);
  analyses.update(items => items.filter(item => item.id !== id));
}

export function clearAnalyses() {
  analyses.set([]);
}

export { analyses };
