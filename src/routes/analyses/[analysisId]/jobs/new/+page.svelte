<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Expandable from '$lib/components/Expandable.svelte';
  import Form from '$lib/components/Form.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import Select from '$lib/components/Select.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextBlock from '$lib/components/Text.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Range from '$lib/components/Range.svelte';
  import Help from '$lib/components/Help.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { jobs, updateJobResults, updateJobStatus, findJobByHash } from '$lib/stores/jobs';
  import { analyses } from '$lib/stores/analyses';
  import { addJob } from '$lib/stores/jobs';
  import { goto } from '$app/navigation';
  import { methods } from '$lib/data/methods';
  import { methodParameters } from '$lib/data/methodParameters';
  import type { ParameterDefinition } from '$lib/data/methodParameters';
  import type { Job } from '$lib/stores/jobs';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import { initHyPhy, runHyPhyJob } from '$lib/utils/hyphy-aioli';
  import { hyphyAioliStore } from '$lib/stores/hyphy-aioli';

  // Get the analysis ID from the URL
  const analysisId = $page.params.analysisId;
  
  // Get the analysis details
  $: analysis = $analyses.find(a => a.id === analysisId);

  // Track selected method
  let selectedMethod = '';
  let selectedParams: Record<string, ParameterDefinition> = {};
  let paramValues: Record<string, any> = {};
  $: selectedMethodDescription = methods.find(method => method.id === selectedMethod)?.description;
  $: selectedParams = selectedMethod ? methodParameters[selectedMethod] || {} : {};
  
  // Aioli instance
  let hyphyInstance: any;
  let hyphyLoaded = false;
  let isRunningJob = false;
  let currentJobId = '';
  let jobStatus = '';
  let showJobProgress = false;
  let showJobModal = false;
  let showDuplicateJobModal = false;
  let duplicateJobId = '';
  let currentProcess: any = null; // Store reference to the current running process
  
  // Subscribe to the jobs store to keep the local jobStatus in sync
  // This ensures we reflect status changes made by runHyPhyJob
  $: if (currentJobId && $jobs) {
    const currentJob = $jobs.find(job => job.id === currentJobId);
    if (currentJob) {
      jobStatus = currentJob.status;
      console.log(`Job status updated from store: ${jobStatus}`);
    }
  }
  
  async function initializeHyPhy() {
    console.log('Initializing HyPhy...');
    hyphyLoaded = false;
    try {
      // Add a fallback option if loading takes too long
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('HyPhy initialization timed out'));
        }, 30000); // 30 second timeout
      });
      
      // Initialize HyPhy using our utility
      // The output will be captured in the store
      await initHyPhy();
      
      // Get the instance from the store
      const store = get(hyphyAioliStore);
      hyphyInstance = store.instance;
      
      if (!hyphyInstance) {
        throw new Error('Failed to initialize HyPhy instance');
      }
      
      console.log('HyPhy initialized, checking version...');
      
      // Check the HyPhy version
      const result = await hyphyInstance.exec('hyphy --version');
      console.log('HyPhy version:', result.stdout);
      
      hyphyLoaded = true;
      console.log('HyPhy loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize HyPhy:', error);
      hyphyOutput = `Error initializing HyPhy: ${error instanceof Error ? error.message : String(error)}`;
      // Show the UI anyway if loading fails
      hyphyLoaded = true;
      return false;
    }
  }
  
  onMount(async () => {
    await initializeHyPhy();
  });
  
  // Make sure we track the HyPhy output from the store
  $: hyphyOutput = $hyphyAioliStore.output;
  
  // Initialize parameter values when method changes
  $: if (selectedMethod) {
    paramValues = {};
    // Set default values for parameters
    Object.entries(selectedParams).forEach(([key, param]) => {
      // Skip alignment and tree parameters
      if (key === 'alignment' || key === 'tree') return;
      
      // Set default value based on parameter type
      if (param.default !== undefined) {
        paramValues[key] = param.default;
      } else if (param.type === 'enum' && param.enum && param.enum.length > 0) {
        paramValues[key] = param.enum[0];
      } else if (param.type === 'number') {
        paramValues[key] = 0;
      } else if (param.type === 'boolean') {
        paramValues[key] = false;
      } else {
        paramValues[key] = '';
      }
    });
  }

  function handleMethodChange(event: CustomEvent<string>) {
    selectedMethod = event.detail;
  }

  async function submitForm(data: Record<string, any>) {
    console.log('Form submitted:', data);
    
    if (!selectedMethod) {
      console.error('No method selected');
      return; // Don't create a job if no method is selected
    }
    
    // Combine form data with parameter values
    const configuration: Record<string, any> = { 
      ...paramValues,
      wasm: wasm // Use the wasm variable directly
    };

    // Stringify the configuration for consistent hashing
    const configString = JSON.stringify(paramValues);
    
    // Check if a job with these parameters already exists
    const methodName = methods.find(m => m.id === selectedMethod)?.name || selectedMethod;
    const existingJob = findJobByHash(analysisId, methodName, configString);
    
    if (existingJob) {
      console.log('Duplicate job found:', existingJob.id);
      duplicateJobId = existingJob.id;
      showDuplicateJobModal = true;
      return; // Don't create a new job
    }
    
    console.log('Creating job with configuration:', configuration);
    
    // Create the job
    const jobId: string = addJob({ 
      analysisId,
      method: methodName,
      status: 'Queued',
      configuration: configString,
      resultsUrl: '',
      resultsData: null
    });
    
    console.log('Created job with ID:', jobId);
    
    // Set current job ID and status for tracking
    currentJobId = jobId;
    jobStatus = 'Queued';
    showJobProgress = true;
    
    // If using WebAssembly, show the modal immediately
    if (wasm) {
      console.log('WebAssembly enabled, showing modal');
      showJobModal = true;
    } else {
      console.log('WebAssembly disabled, showing inline progress');
    }

    // Update the job with the correct resultsUrl now that we have the jobId
    jobs.update((items: Job[]) => {
      return items.map((item: Job) => {
        if (item.id === jobId) {
          return {
            ...item,
            resultsUrl: `${base}/analyses/${analysisId}/jobs/${jobId}/result`
          };
        }
        return item;
      });
    });

    // Add the job ID to the analysis
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
    
    // Show job progress UI
    showJobProgress = true;
    
    // If WASM is enabled and HyPhy is loaded, run the job in the browser
    if (wasm && hyphyLoaded) {
      // Get the alignment data from the analysis
      const alignmentData = analysis?.alignmentData || '';
      
      if (alignmentData) {
        console.log('Using alignment data for HyPhy job, length:', alignmentData.length);
        // Show the job modal for WASM jobs
        showJobModal = true;
        // Run the job without redirecting - we'll stay on this page
        await runHyPhyJob(jobId, selectedMethod, alignmentData);
      } else {
        console.error('No alignment data found in analysis:', analysis);
        updateJobStatus(jobId, 'Failed');
        jobStatus = 'Failed';
      }
    } else {
      // For non-WASM jobs, just show the job progress on the page
      // The user can manually navigate to analyses when ready
      updateJobStatus(jobId, 'Queued');
      jobStatus = 'Queued';
    }
  }

  // WebAssembly is always enabled for now as server-based backend is not yet implemented
  let wasm = true;
</script>

<Page 
  title="Add Job"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses", href: `${base}/analyses` },
    { label: analysis?.name || "Analysis", href: undefined },
    { label: "New Job", href: `${base}/analyses/${analysisId}/jobs/new` }
  ]}
>
  <div class="container">
    {#if !hyphyLoaded && wasm}
      <div class="full-page-loading">
        <div class="loader"></div>
        <p>Loading HyPhy WASM module...</p>
        <p class="loading-note">This may take a few moments to download (~20MB)</p>
        <button class="skip-button" on:click={() => hyphyLoaded = true}>Skip loading and continue</button>
      </div>
    {:else}
      <Card title="Add Job">
      {#if analysis}
        <Form onSubmit={submitForm}>
          <div class="method-select">
            <Select
              label="Choose HyPhy Method"
              name="method"
              value={selectedMethod}
              options={methods.map(method => ({ value: method.id, label: method.name }))}
              on:change={handleMethodChange}
            />
            <Help text="Coming Soon" />
          </div>
          {#if selectedMethodDescription}
            <TextBlock variant="muted" size="sm">{selectedMethodDescription}</TextBlock>
          {/if}
          <Expandable title="Configuration">
            <div class="configuration">
              {#if Object.keys(selectedParams).length > 0}
                <div class="parameters-list">
                  <TextBlock size="md" variant="default">Method Parameters</TextBlock>
                  
                  {#each Object.entries(selectedParams) as [key, param]}
                    <!-- Skip alignment and tree parameters -->
                    {#if key !== 'alignment' && key !== 'tree'}
                      <div class="parameter-item">
                        <!-- Parameter name and description -->
                        <div class="parameter-header">
                          <TextBlock size="sm" variant="default"><strong>{param.name}</strong></TextBlock>
                          <TextBlock size="sm" variant="muted">{param.description}</TextBlock>
                        </div>
                        
                        <!-- Parameter input based on type -->
                        <div class="parameter-input">
                          {#if param.type === 'enum' && param.enum}
                            <Select
                              label=""
                              name={key}
                              value={paramValues[key]}
                              options={param.enum.map(value => ({ value, label: value }))}
                              on:change={(e) => paramValues[key] = e.detail}
                            />
                          {:else if param.type === 'boolean'}
                            <Toggle
                              label={param.name}
                              name={key}
                              bind:checked={paramValues[key]}
                              labelPosition="right"
                            />
                          {:else if param.type === 'number'}
                            <Range
                              name={key}
                              bind:value={paramValues[key]}
                              min={0}
                              max={param.name.includes('significance') ? 1 : 
                                  param.name.includes('samples') || param.name.includes('grid') ? 1000 : 100}
                              step={param.name.includes('significance') ? 0.01 : 1}
                              showMinMax={true}
                            />
                          {:else}
                            <FormField
                              label=""
                              name={key}
                              type="text"
                              bind:value={paramValues[key]}
                              placeholder={param.default !== undefined ? param.default.toString() : ''}
                            />
                          {/if}
                        </div>
                      </div>
                    {/if}
                  {/each}
                </div>
              {:else if selectedMethod}
                <div class="configuration-field">
                  <TextBlock>No parameters available for {methods.find(m => m.id === selectedMethod)?.name}.</TextBlock>
                </div>
              {:else}
                <div class="configuration-field">
                  <TextBlock>Select a method to view available parameters.</TextBlock>
                </div>
              {/if}
            </div>
          </Expandable>
          <Toggle
            label="Run with WebAssembly"
            name="wasm"
            bind:checked={wasm}
            labelPosition="right"
            disabled={true}
          />
          <TextBlock size="sm" variant="muted">
            Jobs currently run directly in your browser using WebAssembly.
            Server-based processing will be available in a future update.
          </TextBlock>
          
          {#if showJobProgress && !wasm}
            <div class="job-progress">
              <div class="progress-header">
                <TextBlock size="md" variant="default"><strong>Job Status: {jobStatus}</strong></TextBlock>
                {#if jobStatus === 'Completed' || jobStatus === 'Completed with warnings'}
                  <div class="status-icon completed">✓</div>
                {:else if jobStatus === 'Failed'}
                  <div class="status-icon failed">✗</div>
                {:else if jobStatus === 'Running'}
                  <div class="status-icon running"></div>
                {:else}
                  <div class="status-icon queued"></div>
                {/if}
              </div>
              
              {#if jobStatus === 'Completed' || jobStatus === 'Completed with warnings'}
                <TextBlock size="sm" variant="success">Job completed successfully!</TextBlock>
                <div class="redirect-button">
                  <Button variant="secondary" on:click={() => goto(`${base}/analyses`)}>Go to Analyses</Button>
                </div>
              {:else if jobStatus === 'Failed'}
                <TextBlock size="sm" variant="error">Job failed.</TextBlock>
                <div class="redirect-button">
                  <Button variant="secondary" on:click={() => goto(`${base}/analyses`)}>Go to Analyses</Button>
                </div>
              {/if}
            </div>
          {/if}
          
          <!-- Job Progress Modal for WebAssembly Jobs -->
          <Modal
            isOpen={showJobModal}
            title="HyPhy Job Progress"
            on:close={() => {}}
            showCloseButton={false}
            maxWidth="800px"
            ariaLabel="HyPhy Job Progress"
          >
            <div class="info-message">
              <TextBlock size="sm" variant="primary">
                <strong>Note:</strong> HyPhy is running in your browser. Please wait for the job to complete.
              </TextBlock>
            </div>
            
            <div class="job-progress">
              <div class="progress-header">
                <TextBlock size="md" variant="default"><strong>Job Status: {jobStatus}</strong></TextBlock>
                {#if jobStatus === 'Completed' || jobStatus === 'Completed with warnings'}
                  <div class="status-icon completed">✓</div>
                {:else if jobStatus === 'Failed'}
                  <div class="status-icon failed">✗</div>
                {:else if jobStatus === 'Running'}
                  <div class="status-icon running"></div>
                {:else}
                  <div class="status-icon queued"></div>
                {/if}
              </div>
              
              {#if $hyphyAioliStore.output}
                <div class="hyphy-output">
                  <TextBlock size="sm" variant="default"><strong>HyPhy Output:</strong></TextBlock>
                  <pre class="output-pre">{$hyphyAioliStore.output}</pre>
                </div>
              {/if}
              
              {#if jobStatus === 'Completed' || jobStatus === 'Completed with warnings'}
                <TextBlock size="sm" variant="success">Job completed successfully!</TextBlock>
                <div class="dm-actions">
                  <Button variant="primary" on:click={() => { showJobModal = false; goto(`${base}/analyses`); }}>Go to Analyses</Button>
                </div>
              {:else if jobStatus === 'Failed'}
                <TextBlock size="sm" variant="error">Job failed.</TextBlock>
                <div class="dm-actions">
                  <Button variant="primary" on:click={() => { showJobModal = false; goto(`${base}/analyses`); }}>Go to Analyses</Button>
                </div>
              {/if}
            </div>
          </Modal>
          
          <!-- Duplicate Job Modal -->
          <Modal
            isOpen={showDuplicateJobModal}
            title="Duplicate Job Found"
            on:close={() => showDuplicateJobModal = false}
            maxWidth="600px"
            ariaLabel="Duplicate Job Found"
            showCloseButton={true}
            closeOnBackdropClick={true}
          >
            <div class="info-message">
              <TextBlock size="sm" variant="primary">
                <strong>Note:</strong> A job with identical parameters already exists (ID: {duplicateJobId}).
              </TextBlock>
            </div>
            
            <TextBlock size="md" variant="default">
              To avoid duplicate work, we recommend using the existing job. If you need to run this job again with the same parameters, please delete the existing job first.
            </TextBlock>
          </Modal>
          
          <div class="actions">
            <Button type="submit" variant="primary">Start Job</Button>
          </div>
        </Form>
      {:else}
        <p>Analysis not found.</p>
      {/if}
    </Card>
    {/if}
  </div>
</Page>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .method-select {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .configuration {
    margin-top: 1rem;
  }

  .parameters-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .parameter-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: rgba(0, 0, 0, 0.02);
  }

  .parameter-header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .parameter-input {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .full-page-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    height: 60vh;
    width: 100%;
  }
  
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .hyphy-output {
    margin-top: 1rem;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
  
  .output-pre {
    background-color: #f5f5f5;
    padding: 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
  }
  
  .loading-note {
    margin-top: 1rem;
    color: #666;
    font-size: 0.9rem;
  }
  
  .skip-button {
    margin-top: 1.5rem;
    padding: 0.5rem 1rem;
    background-color: #f3f3f3;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;
  }
  
  .skip-button:hover {
    background-color: #e6e6e6;
  }
  
  .job-progress {
    margin-top: 1.5rem;
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 0.25rem;
    background-color: #f9f9f9;
  }
  
  .progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .status-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  
  .status-icon.completed {
    background-color: #4caf50;
    color: white;
  }
  
  .status-icon.failed {
    background-color: #f44336;
    color: white;
  }
  
  .status-icon.running {
    background-color: #2196f3;
    position: relative;
    overflow: hidden;
  }
  
  .status-icon.running::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: loading 1.5s infinite;
  }
  
  .status-icon.queued {
    background-color: #ff9800;
    position: relative;
    overflow: hidden;
  }
  
  @keyframes loading {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .redirect-button {
    margin-top: 1rem;
  }
  
  /* Modal styles are now handled by the Modal component */
  
  .info-message {
    background-color: var(--dm-color-background-secondary);
    border-left: 4px solid var(--dm-color-primary);
    padding: var(--dm-spacing-md);
    margin-bottom: var(--dm-spacing-lg);
    border-radius: var(--dm-border-radius-sm);
  }
  
  .dm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>
