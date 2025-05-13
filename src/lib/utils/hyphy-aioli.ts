import Aioli from '@biowasm/aioli';
import { hyphyAioliStore, addHyphyOutput, clearHyphyOutput } from '$lib/stores/hyphy-aioli';
import { get } from 'svelte/store';
import { base } from '$app/paths';

// Simple utility for initializing and using HyPhy WebAssembly

/**
 * Creates a callback function for processing HyPhy output
 * @returns A callback function that updates the output in the store
 */
function createHyphyCallback() {
  return function(data: any) {
    console.log('HyPhy callback received:', data);
    if (data && data.type === 'print' && data.text) {
      console.log('HyPhy print:', data.text);
      addHyphyOutput(data.text);
    } else if (data && data.stdout) {
      console.log('HyPhy stdout:', data.stdout);
      addHyphyOutput(data.stdout);
    } else if (data && typeof data === 'string') {
      console.log('HyPhy string:', data);
      addHyphyOutput(data);
    } else if (data && typeof data === 'object') {
      try {
        const text = JSON.stringify(data);
        console.log('HyPhy object:', text);
        addHyphyOutput(text);
      } catch (e) {
        console.log('HyPhy complex object');
        addHyphyOutput('[Complex object data]');
      }
    }
  };
}

/**
 * Initialize the HyPhy WebAssembly instance
 * @returns A promise that resolves when HyPhy is initialized
 */
export async function initHyPhy(): Promise<void> {
  const store = get(hyphyAioliStore);
  
  // If already loaded or loading, return
  if (store.loaded || store.loading) {
    return;
  }
  
  // Set loading state
  hyphyAioliStore.update(state => ({ ...state, loading: true, error: null }));
  
  // Clear any existing output
  clearHyphyOutput();
  
  try {
    console.log('Creating Aioli instance...');
    const instance = await new Aioli(
        {
          tool: 'hyphy',
          version: "2.5.70",
          urlPrefix: 'https://data.hyphy.org/web/biowasm'
        },
        {
          printInterleaved: false,
          callback: createHyphyCallback()
        }
      );
    
    // The callback will be set by individual components as needed
    // This avoids the DataCloneError issue by not setting a complex callback here
    
    console.log('HyPhy instance created successfully');
    
    // Update store with successful initialization
    hyphyAioliStore.update(state => ({
      ...state,
      instance,
      loaded: true,
      loading: false,
      error: null
    }));
  } catch (error) {
    console.error('Failed to initialize HyPhy:', error);
    
    // Update store with error
    hyphyAioliStore.update(state => ({
      ...state,
      loading: false,
      error: error instanceof Error ? error.message : 'Unknown error initializing HyPhy'
    }));
    
    throw error;
  }
}

/**
 * Load HyPhy support files from the static directory
 * @returns An object containing the content of all support files
 */
export async function loadHyPhySupportFiles(): Promise<{
  dataReader: string;
  hyPhyGlobals: string;
  chooseGeneticCode: string;
  readDelimitedFiles: string;
  treeTools: string;
  nj: string;
  partitionReader: string;
  grabBag: string;
}> {
  try {
    // Fetch all required support files from the static directory
    const [dataReader, hyPhyGlobals, chooseGeneticCode, readDelimitedFiles, treeTools, nj, partitionReader, grabBag] = await Promise.all([
      fetch(`${base}/wasm/hyphy/datareader.bf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/HyPhyGlobals.ibf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/chooseGeneticCode.def`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/ReadDelimitedFiles.bf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/TreeTools.ibf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/NJ.bf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/PartitionReader.ibf`).then(r => r.text()),
      fetch(`${base}/wasm/hyphy/shared/GrabBag.bf`).then(r => r.text())
    ]);
    
    return {
      dataReader,
      hyPhyGlobals,
      chooseGeneticCode,
      readDelimitedFiles,
      treeTools,
      nj,
      partitionReader,
      grabBag
    };
  } catch (error) {
    console.error('Failed to load HyPhy support files:', error);
    throw new Error('Failed to load HyPhy support files');
  }
}

/**
 * Validate an alignment using HyPhy
 * @param alignmentContent The content of the alignment file
 * @returns A promise that resolves to the validation results JSON string
 */
export async function validateAlignment(alignmentContent: string): Promise<string | null> {
  // Initialize HyPhy if not already initialized
  if (!get(hyphyAioliStore).loaded) {
    await initHyPhy();
  }
  
  const { instance, loaded } = get(hyphyAioliStore);
  
  if (!loaded || !instance) {
    throw new Error('HyPhy failed to initialize');
  }
  
  try {
    // Load support files
    const supportFiles = await loadHyPhySupportFiles();
    
    // Mount the alignment file and support files
    const inputFiles = await instance.mount([
      { name: 'user.nex', data: alignmentContent },
      { name: 'datareader.bf', data: supportFiles.dataReader },
      { name: 'HyPhyGlobals.ibf', data: supportFiles.hyPhyGlobals },
      { name: 'chooseGeneticCode.def', data: supportFiles.chooseGeneticCode },
      { name: 'ReadDelimitedFiles.bf', data: supportFiles.readDelimitedFiles },
      { name: 'TreeTools.ibf', data: supportFiles.treeTools },
      { name: 'NJ.bf', data: supportFiles.nj },
      { name: 'PartitionReader.ibf', data: supportFiles.partitionReader },
      { name: 'GrabBag.bf', data: supportFiles.grabBag }
    ]);
    
    // Run HyPhy validation
    const result = await instance.exec('hyphy LIBPATH=/shared/hyphy/ ' + inputFiles[1]);
    const stdout = await result.stdout;
    
    // Download the results JSON
    const jsonBlob = await instance.download('/shared/data/results.json');
    const response = await fetch(jsonBlob);
    const blob = await response.blob();
    const jsonText = await blob.text();
    
    return jsonText;
  } catch (error) {
    console.error('Alignment validation failed:', error);
    throw error;
  }
}

/**
 * Run a HyPhy job
 * @param method The HyPhy method to run
 * @param alignmentContent The content of the alignment file
 * @param options Additional options for the job
 * @returns A promise that resolves to the job results
 */
export async function runHyPhyJob(
  jobId: string,
  method: string,
  alignmentContent: string,
  options: {
    configOptions?: Record<string, any>;
    onProgress?: (data: any) => void;
  } = {}
): Promise<{
  stdout: string;
  resultsData: string | null;
}> {
  // Initialize HyPhy if not already initialized
  if (!get(hyphyAioliStore).loaded) {
    await initHyPhy();
  }
  
  const { instance, loaded } = get(hyphyAioliStore);
  
  if (!loaded || !instance) {
    throw new Error('HyPhy failed to initialize');
  }
  
  // Clear previous output
  clearHyphyOutput();
  
  // Add job start message to output
  addHyphyOutput(`Running HyPhy ${method} job...`);
  
  // We don't need to set a custom callback as our createHyphyCallback
  // is already writing to the store
  
  try {
    // Mount the alignment file
    const inputFiles = await instance.mount([
      { name: 'user.nex', data: alignmentContent }
    ]);
    
    // Prepare command arguments
    let configArgs = '';
    if (options.configOptions && Object.keys(options.configOptions).length > 0) {
      configArgs = Object.entries(options.configOptions).map(([key, value]) => {
        // Handle different types of values
        if (typeof value === 'boolean') {
          // For boolean values, just include the flag if true
          return value ? `--${key}` : '';
        } else if (value !== null && value !== undefined && value !== '') {
          // For other values, format as key=value
          return `--${key}=${value}`;
        }
        return '';
      }).filter(arg => arg !== '').join(' ');
    }
    
    // Run HyPhy job
    const command = `hyphy ${method} --alignment ${inputFiles[0]} --output /shared/data/${jobId}_results.json ${configArgs}`;
    console.log('Running HyPhy command:', command);
    
    const result = await instance.exec(command);
    const stdout = await result.stdout;
    
    // Download the results JSON
    let resultsData = null;
    try {
      const jsonBlob = await instance.download(`/shared/data/${jobId}_results.json`);
      const response = await fetch(jsonBlob);
      const blob = await response.blob();
      resultsData = await blob.text();
    } catch (error) {
      console.error('Failed to download results JSON:', error);
    }
    
    return {
      stdout,
      resultsData
    };
  } catch (error) {
    console.error('HyPhy job failed:', error);
    throw error;
  } finally {
    // No cleanup needed as we're setting the callback directly
  }
}
