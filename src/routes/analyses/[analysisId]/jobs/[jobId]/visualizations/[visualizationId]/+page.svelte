<script lang="ts">
  import { get } from 'svelte/store';
  import { analyses } from '$lib/stores/analyses';
  import { jobs } from '$lib/stores/jobs';
  import { page } from '$app/stores';
  import Page from '$lib/components/Page.svelte';
  import * as vizRegistry from '@veg/hyphy-eye/registry';
  import { vizNameToId } from '$lib/index';
  import { base } from '$app/paths';
  import { generateVisualization } from '$lib/visualization-generator';
  import * as vegaEmbed from 'vega-embed';
  
  // Get the analysis ID and job ID from the URL
  const analysisId = $page.params.analysisId;
  const jobId = $page.params.jobId;
  const vizId = $page.params.visualizationId;

  let error: string | null = null;
  let visualizationSpec: vizRegistry.Visualization | null = null;
  let loading = true;
  let visualizationData: any = null;
  let visualizationContainer: HTMLDivElement | null = null;
  
  // Helper function to get the visualization for a specific glyph
  function getVisualizationSpec(vizId: string, method: string): vizRegistry.Visualization | null {
    if (!(method in vizRegistry.HyPhyMethods)) {
      return null;
    }
    
    const methodOptions = vizRegistry.HyPhyMethods[method];
    if (!methodOptions) return null;
    
    // Find the visualization with the matching ID
    const viz = methodOptions.visualizations.find(viz => {
      return vizNameToId(viz.name) === vizId;
    });

    return viz || null;
  }

  $: if (visualizationData && visualizationContainer) {
    visualizationContainer.innerHTML = '';
    if (visualizationSpec?.outputType === 'vega-spec') {
      // If it's a Vega spec, use vegaEmbed to render it
      try {
        console.log('Rendering Vega visualization with spec:', visualizationData);
        vegaEmbed.default(visualizationContainer, visualizationData, {
          actions: false,
          mode: 'vega-lite'
        }).catch((err: Error) => {
          console.error('Error rendering Vega visualization:', err);
          error = `Failed to render Vega visualization: ${err.message}`;
          loading = false;
        });
      } catch (err: unknown) {
        console.error('Error preparing Vega visualization:', err);
        error = err instanceof Error 
          ? `Failed to prepare Vega visualization: ${err.message}`
          : 'Failed to prepare Vega visualization';
        loading = false;
      }
    } else {
      // For other types (dom-element or html-string), just append
      visualizationContainer.appendChild(visualizationData);
    }
  }

  $: analysis = get(analyses).find(a => a.id === analysisId);
  $: job = get(jobs).find(j => {
    return j.id === jobId && j.analysisId === analysisId;
  });
console.log(job?.resultsData)
  // Load visualization when job is available
  $: if (job) {
    try {
      // Get the method from the job
      const method = job.method as string;
      if (method in vizRegistry.HyPhyMethods) {
        // Get the visualization spec
        visualizationSpec = getVisualizationSpec(vizId, method);
        if (visualizationSpec) {
          // Check if we have results data
          if (!job.resultsData) {
            error = 'No results data available for this job';
            loading = false;
          } else {
            // Log the visualization type and data structure
            console.log('Generating visualization:', {
              type: visualizationSpec.outputType,
              method,
              data: job.resultsData,
              options: visualizationSpec.options
            });
            
            // Generate the visualization
            generateVisualization(
              visualizationSpec.component,
              job.resultsData,
              method,
              visualizationSpec.options || {}, // Pass the options from the spec
              visualizationSpec.outputType || undefined
            ).then(data => {
              visualizationData = data;
            }).catch(e => {
              console.error('Error generating visualization:', e);
              error = e instanceof Error ? e.message : 'Failed to generate visualization';
              loading = false;
            }).finally(() => {
              loading = false;
            });
          }
        } else {
          error = 'Visualization not found';
          loading = false;
        }
      } else {
        error = 'Invalid visualization method';
        loading = false;
      }
    } catch (e) {
      console.error('Error loading visualization:', e);
      error = e instanceof Error ? e.message : 'Failed to load visualization';
      loading = false;
    }
  } else {
    error = 'Job not found';
    loading = false;
  }
</script>

<Page
  title={visualizationSpec?.name || 'Loading Visualization...'}
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses", href: `${base}/analyses` },
    { label: analysis?.name || "Analysis", href: undefined },
    { label: job?.id || "Job", href: `${base}/analyses/${analysisId}/jobs/${jobId}` }
  ]}
>
  {#if error}
    <div class="error">
      <h3>Error: {error}</h3>
      {#if error === 'Failed to parse results JSON'}
        <p>There was an issue with the results data. Please try running the analysis again.</p>
      {/if}
    </div>
  {/if}

  {#if loading}
    <div class="loading">
      <h3>Loading visualization...</h3>
      <p>Please wait while we generate your visualization.</p>
    </div>
  {/if}

  {#if visualizationData}
    <div class="visualizations" bind:this={visualizationContainer}></div>
  {/if}
</Page>

<style>
  .visualizations {
    display: grid;
    gap: 2rem;
    padding: 1rem;
  }

  .visualizations > div {
    min-height: 300px;
  }

  .error {
    color: red;
    padding: 1rem;
    border: 1px solid red;
    border-radius: 4px;
    background: #fff;
  }

  .error h3 {
    margin: 0 0 0.5rem 0;
    color: red;
  }

  .error p {
    margin: 0;
    color: #666;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
    background: #fff;
  }

  .loading h3 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .loading p {
    margin: 0;
    color: #666;
  }
</style>
