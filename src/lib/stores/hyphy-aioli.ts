import { writable } from 'svelte/store';

// Store to track the global HyPhy instance and output
export const hyphyAioliStore = writable<{
  instance: any;
  loaded: boolean;
  loading: boolean;
  error: string | null;
  output: string;
}>({
  instance: null,
  loaded: false,
  loading: false,
  error: null,
  output: ''
});

/**
 * Add output to the HyPhy store
 * @param text The text to add to the output
 */
export function addHyphyOutput(text: string): void {
  hyphyAioliStore.update(state => ({
    ...state,
    output: state.output + text + '\n'
  }));
}

/**
 * Clear the HyPhy output in the store
 */
export function clearHyphyOutput(): void {
  hyphyAioliStore.update(state => ({
    ...state,
    output: ''
  }));
}