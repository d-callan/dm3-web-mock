import { writable } from 'svelte/store';

export interface Analysis {
  id: string;
  method: string;
  configuration: string;
  status: string;
  resultsUrl: string;
  createdAt: string;
}

// Load initial state from localStorage
const storedAnalyses = typeof window !== 'undefined' 
  ? JSON.parse(localStorage.getItem('analyses') || '[]')
  : [];

// Create the store
const analyses = writable<Analysis[]>(storedAnalyses);

// Subscribe to changes and update localStorage
if (typeof window !== 'undefined') {
  analyses.subscribe(value => {
    localStorage.setItem('analyses', JSON.stringify(value));
  });
}

export function addAnalysis(analysis: Omit<Analysis, 'id' | 'createdAt'>) {
  analyses.update(items => {
    const newAnalysis = {
      ...analysis,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    return [...items, newAnalysis];
  });
}

export function removeAnalysis(id: string) {
  analyses.update(items => items.filter(item => item.id !== id));
}

export function clearAnalyses() {
  analyses.set([]);
}

export { analyses };
