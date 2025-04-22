<script lang="ts">
  import { get } from 'svelte/store';
  import { jobs } from '$lib/stores/jobs';
  import * as vizRegistry from 'hyphy-eye/registry'
  import { page } from '$app/stores';
  import type { Job } from '$lib/stores/jobs';
  import Page from '$lib/components/Page.svelte';
  import { base } from '$app/paths';
  import { analyses } from '$lib/stores/analyses';
  import VisualizationSection from '$lib/components/VisualizationSection.svelte';

  // Get the analysis ID and job ID from the URL
  const analysisId = $page.params.analysisId;
  const jobId = $page.params.jobId;
  let job: Job | undefined;
  let error: string | undefined;
  let vizOptions: vizRegistry.HyPhyMethod | undefined;
  let categorizedVisualizations: Record<string, vizRegistry.Visualization[]> = {};

  // Helper function to group visualizations by category
  function categorizeVisualizations(visualizations: vizRegistry.Visualization[]) {
    const categories: Record<string, vizRegistry.Visualization[]> = {};
    
    // First, create empty arrays for each category
    Object.values(vizRegistry.VisualizationCategories).forEach(category => {
      categories[category.id] = [];
    });
    
    // Then, add each visualization to its category
    visualizations.forEach(viz => {
      const categoryId = viz.category as string;
      if (categoryId in categories) {
        categories[categoryId].push(viz);
      }
    });
    
    return categories;
  }

  // Get the analysis from the analysis store
  $: analysis = get(analyses).find(a => a.id === analysisId);
  // Get the job from the store
  $: job = get(jobs).find(j => j.id === jobId);

  // Load results from localStorage
  $: if (job) {
    try {
      const method = job.method as string;
      if (method in vizRegistry.HyPhyMethods) {
        vizOptions = vizRegistry.HyPhyMethods[method];
        if (vizOptions) {
          categorizedVisualizations = categorizeVisualizations(vizOptions.visualizations);
        }
      } else {
        error = 'Invalid visualization method';
      }
    } catch (e) {
      error = 'Failed to load visualization options';
    }
  }
</script>

<Page
  title="Job Results"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses", href: `${base}/analyses` },
    { label: analysis?.name || "Analysis", href: undefined },
    { label: job?.id || "Job", href: `${base}/analyses/${analysisId}/jobs/${jobId}` }
  ]}
>
  {#if error}
    <div class="error">{error}</div>
  {:else if !job}
    <div class="error">Job not found</div>
  {:else if !vizOptions}
    <div class="loading">Loading visualization options...</div>
  {:else}
    <!-- TODO: change glyph attr in hyphy-eye to be only file name w no path -->
    <!-- then change glyphPath here to be base/glyphs/ or just leave empty since thats the default-->
    <div class="visualization-container">
      {#each Object.entries(categorizedVisualizations) as [categoryId, visualizations]}
        {#if visualizations.length > 0}
          <VisualizationSection
            category={vizRegistry.VisualizationCategories[categoryId]}
            visualizations={visualizations}
            glyphPath={`${base}`}
          />
        {/if}
      {/each}
    </div>
  {/if}
</Page>

<style>
  .visualization-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .error {
    color: red;
    padding: 15px;
    border-radius: 4px;
    background: #ffebee;
  }

  .loading {
    padding: 15px;
    color: #666;
  }
</style>