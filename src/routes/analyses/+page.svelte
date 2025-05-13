<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/Table.svelte';
  import DataReaderResults from '$lib/components/DataReaderResults.svelte';
  import Text from '$lib/components/Text.svelte';
  import { analyses, removeAnalysis } from '$lib/stores/analyses';
  import { jobs, removeJob } from '$lib/stores/jobs';
  import { base } from '$app/paths';
  import { onMount } from 'svelte';

  // Function to pretty-print JSON configuration
  function formatConfiguration(config: any): string {
    try {
      // Handle different types of input
      let parsedConfig;
      
      if (typeof config === 'string') {
        // Try to parse if it's a JSON string
        try {
          parsedConfig = JSON.parse(config);
        } catch {
          // If parsing fails, use the string as is
          parsedConfig = config;
        }
      } else if (typeof config === 'object') {
        // If it's already an object, use it directly
        parsedConfig = config;
      } else {
        // For other types, convert to string
        parsedConfig = String(config);
      }
      
      // Extract the configuration subset if available
      let configurationData = parsedConfig;
      if (typeof parsedConfig === 'object' && parsedConfig !== null && 'configuration' in parsedConfig) {
        // Try to parse the configuration string if it's a string
        if (typeof parsedConfig.configuration === 'string') {
          try {
            configurationData = JSON.parse(parsedConfig.configuration);
          } catch {
            configurationData = parsedConfig.configuration;
          }
        } else {
          configurationData = parsedConfig.configuration;
        }
      }
      
      // Format with indentation and line breaks if it's an object
      const formattedJson = typeof configurationData === 'object' && configurationData !== null
        ? JSON.stringify(configurationData, null, 2)
        : String(configurationData);
        
      // Convert to HTML with preserved whitespace and monospace font
      return `<pre class="json-config">${formattedJson}</pre>`;
    } catch (e) {
      // If any error occurs, return a string representation
      return String(config);
    }
  }

  const jobColumns = [
    { 
      key: 'id',
      title: 'Job ID',
      sortable: true
    },
    {
      key: 'method',
      title: 'HyPhy Method',
      sortable: true
    },
    {
      key: 'configuration',
      title: 'Configuration',
      sortable: true,
      render: (row: any) => formatConfiguration(row.configuration)
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true
    },
    {
      key: 'resultsUrl',
      title: 'Results',
      sortable: false,
      render: (row: any) => `<a href="${row.resultsUrl}" class="dm-link dm-link--primary dm-link--underline-always table-link">View</a>`
    },
    {
      key: 'actions',
      title: '',
      sortable: false,
      render: (row: any) => `<button class="job-delete-button" data-job-id="${row.id}" title="Delete Job">
        <i class="fas fa-trash-alt" aria-hidden="true"></i>
        <span class="sr-only">Delete Job</span>
      </button>`
    }
  ];

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Validation modal state
  let showValidationModal = false;
  let currentValidationData: any = null;
  let currentAnalysisName = '';
  
  // Function to open the validation modal
  function openValidationModal(analysis: any) {
    console.log('Opening validation modal for analysis:', analysis);
    console.log('Validation data available:', !!analysis.validationData);
    
    try {
      if (analysis.validationData) {
        currentAnalysisName = analysis.name || 'Unnamed Analysis';
        console.log('Validation data type:', typeof analysis.validationData);
        
        currentValidationData = typeof analysis.validationData === 'string' 
          ? JSON.parse(analysis.validationData)
          : analysis.validationData;
          
        console.log('Parsed validation data:', currentValidationData);
        showValidationModal = true;
        console.log('Modal should be visible now, showValidationModal =', showValidationModal);
      } else {
        console.log('No validation data found for this analysis');
      }
    } catch (error) {
      console.error('Error parsing validation data:', error);
    }
  }
  
  // Function to close the validation modal
  function closeValidationModal() {
    showValidationModal = false;
    currentValidationData = null;
  }
  
  // Handle job deletion
  function handleJobDelete(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const deleteButton = target.closest('.job-delete-button') as HTMLButtonElement;
    
    if (deleteButton) {
      const jobId = deleteButton.dataset.jobId;
      if (jobId) {
        // Remove the job from the store
        removeJob(jobId);
        
        // Also remove the job ID from any analysis that references it
        analyses.update(items => {
          return items.map(analysis => {
            if (analysis.jobIds?.includes(jobId)) {
              return {
                ...analysis,
                jobIds: analysis.jobIds.filter(id => id !== jobId)
              };
            }
            return analysis;
          });
        });
      }
    }
  }
</script>

<svelte:window on:click={handleJobDelete} />

<Page 
  title="My Analyses"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses" }
  ]}>
  <div slot="header">
    <Button href={`${base}/analyses/new`} variant="primary" size="lg" maxWidth="160px">Start New Analysis</Button>
  </div>

  <div class="analyses-container">
    {#if $analyses?.length > 0}
      {#each $analyses as analysis (analysis.id)}
        <div class="analysis-card">
          <Card>
            <div class="card-content">
              <button
                class="delete-button"
                on:click={() => removeAnalysis(analysis.id)}
                title="Delete Analysis"
              >
                <i class="fas fa-trash-alt" aria-hidden="true"></i>
                <span class="sr-only">Delete Analysis</span>
              </button>
              <div class="analysis-header">
              <div class="analysis-content">
                <div class="analysis-info">
                  <div class="analysis-title">
                    <h2>{analysis.name || 'Unnamed Analysis'}</h2>
                    {#if analysis.validationData && analysis.sourceType !== 'imported_json'}
                      <button 
                        class="validation-link"
                        on:click={() => openValidationModal(analysis)}
                        title="View alignment validation details"
                      >
                        <i class="fas fa-check-circle" aria-hidden="true"></i>
                        <span>View Validation</span>
                      </button>
                    {/if}
                  </div>
                  <div class="analysis-metadata">
                    <Text variant="muted" size="sm">Analysis ID: {analysis.id}</Text>
                    <Text variant="muted" size="sm">Created: {formatDate(analysis.createdAt)}</Text>
                  </div>
                  {#if analysis.description}
                    <Text>{analysis.description}</Text>
                  {/if}
                </div>
                <div class="analysis-actions">
                  <div class="button-group">
                    <div class="button-wrapper" title={analysis.sourceType === 'imported_json' ? 'Jobs cannot be added to imported HyPhy analyses' : 'Add a new job to this analysis'}>
                      <Button 
                        variant="primary" 
                        size="sm" 
                        maxWidth={"50px"}
                        disabled={analysis.sourceType === 'imported_json'}
                        href={`${base}/analyses/${analysis.id}/jobs/new`}
                      >
                        Add Job
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {#if analysis.jobIds?.length > 0}
              <Table
                columns={jobColumns}
                data={$jobs.filter(job => analysis.jobIds.includes(job.id))}
                hover
                striped
              />
              

            {:else}
              <div class="empty-state">
                <Text variant="muted" align="center">No jobs yet. Click "Add Job" to run a HyPhy analysis.</Text>
              </div>
            {/if}
          </Card>
        </div>
      {/each}
    {:else}
      <Card>
        <div class="empty-state">
          <Text variant="muted" align="center" size="lg">Your analyses will appear here.</Text>
        </div>
      </Card>
    {/if}
  </div>

</Page>

<!-- Validation Results Modal -->
{#if showValidationModal}
  <!-- Debug info -->
  {@const debugInfo = console.log('Modal is being rendered, currentValidationData:', currentValidationData)}
  
  <div class="modal-backdrop" on:click={closeValidationModal} on:keydown={(e) => e.key === 'Escape' && closeValidationModal()} tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal" on:click|stopPropagation={() => {}} role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Alignment Validation Results: {currentAnalysisName}</h2>
          <button class="modal-close" on:click={closeValidationModal} aria-label="Close modal">×</button>
        </div>
        <div class="modal-body">
          {#if currentValidationData}
            <DataReaderResults jsonData={currentValidationData} />
          {:else}
            <p>No validation data available.</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .analyses-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-lg);
  }
  
  .analysis-actions {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-sm);
    justify-content: center;
  }
  
  .button-group {
    display: flex;
    gap: var(--dm-spacing-sm);
    flex-wrap: wrap;
  }
  
  /* JSON configuration styling */
  :global(.json-config) {
    font-family: var(--dm-font-mono);
    font-size: 1rem;
    background-color: transparent;
    border: none;
    padding: var(--dm-spacing-sm);
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    max-height: 200px;
    overflow-y: auto;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }
  
  /* Job delete button styling */
  :global(.job-delete-button) {
    background: none;
    border: none;
    color: var(--dm-text);
    cursor: pointer;
    padding: 4px 8px;
    transition: color 0.2s ease;
    font-size: 0.9rem;
  }
  
  :global(.job-delete-button:hover) {
    color: var(--dm-secondary);
  }
  
  /* Custom link styling for table */
  :global(.table-link) {
    transition: color 0.2s ease !important;
  }
  
  :global(.table-link:hover) {
    color: var(--dm-secondary) !important;
    opacity: 1 !important;
  }
  
  :global(.job-delete-button:focus) {
    outline: none;
    box-shadow: 0 0 0 2px var(--dm-primary-transparent);
  }

  .analysis-card {
    position: relative;
  }

  .empty-state {
    padding: var(--dm-spacing-lg);
    text-align: center;
  }

  .analysis-header {
    margin-bottom: var(--dm-spacing-lg);
    position: relative;
    padding-top: var(--dm-spacing-xs);
  }

  .analysis-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: 6rem;
  }

  .analysis-info {
    flex: 1;
  }

  .analysis-title {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm);
    margin-bottom: var(--dm-spacing-sm);
  }

  .analysis-title h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .validation-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    padding: 0;
    font-size: 0.875rem;
    color: var(--dm-primary);
    cursor: pointer;
    text-decoration: none;
  }

  .validation-link:hover {
    text-decoration: underline;
    color: var(--dm-primary-dark);
  }

  .validation-link i {
    font-size: 1rem;
  }

  .analysis-metadata {
    display: flex;
    gap: var(--dm-spacing-md);
    margin-bottom: var(--dm-spacing-sm);
  }

  .analysis-actions {
    position: absolute;
    top: var(--dm-spacing-xs);
    right: 5rem;
    display: flex;
    align-items: center;
  }

  .button-wrapper {
    display: flex;
  }

  .card-content {
    position: relative;
  }

  .delete-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    padding: var(--dm-spacing-xs);
    cursor: pointer;
    color: var(--dm-text);
    font-size: 1rem;
    z-index: 1;
  }

  .delete-button:hover {
    color: var(--dm-secondary);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Validation styles */
  .validation-status {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: #f8f9fa;
  }

  .validation-success {
    color: #28a745;
  }

  .validation-error {
    color: #dc3545;
  }
  
  /* Modal styles */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    z-index: 1001;
  }
  
  .modal-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--dm-border);
  }
  
  .modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--dm-text-muted);
  }
  
  .modal-close:hover {
    color: var(--dm-text);
  }
  
  .modal-body {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
  }
  
  .modal-footer {
    padding: 1rem;
    border-top: 1px solid var(--dm-border);
    display: flex;
    justify-content: flex-end;
  }
</style>
