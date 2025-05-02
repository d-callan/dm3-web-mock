<script lang="ts">
  import { get } from 'svelte/store';
  import { jobs } from '$lib/stores/jobs';
  import * as vizRegistry from '@veg/hyphy-eye/registry'
  import { page } from '$app/stores';
  import type { Job } from '$lib/stores/jobs';
  import Page from '$lib/components/Page.svelte';
  import { base } from '$app/paths';
  import { analyses } from '$lib/stores/analyses';
  import VisualizationSection from '$lib/components/VisualizationSection.svelte';
  import Button from '$lib/components/Button.svelte';

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
    
    // Filter out empty categories
    const filteredCategories: Record<string, vizRegistry.Visualization[]> = {};
    Object.entries(categories).forEach(([categoryId, vizzes]) => {
      if (vizzes.length > 0) {
        filteredCategories[categoryId] = vizzes;
      }
    });
    
    return filteredCategories;
  }

  // Get the analysis from the analysis store
  $: analysis = get(analyses).find(a => a.id === analysisId);
  // Get the job from the store
  $: job = get(jobs).find(j => j.id === jobId);

  // Load results from localStorage
  $: if (job) {
    try {
      // Get the method from the job
      const method = job.method as string;
      if (method in vizRegistry.HyPhyMethods) {
        vizOptions = vizRegistry.HyPhyMethods[method];
        // Categorize the visualizations
        categorizedVisualizations = categorizeVisualizations(vizOptions.visualizations);
      } else {
        error = 'Visualization not yet supported for this HyPhy method';
      }
    } catch (e) {
      error = 'Failed to load visualizations';
      console.error(e);
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
  <!-- TODO: implement the download button for real-->
  <div slot="header">
    <Button href={`${base}/analyses/${analysisId}/jobs/${jobId}/download`} variant="primary" size="lg" maxWidth="160px">Download Results</Button>
  </div>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  {#if job && vizOptions}
    <div class="visualizations">
      {#each Object.entries(categorizedVisualizations) as [categoryId, visualizations]}
        <VisualizationSection
          category={vizRegistry.VisualizationCategories[categoryId]}
          visualizations={visualizations}
          jobId={jobId}
          analysisId={analysisId}
        />
      {/each}
    </div>
  {/if}
</Page>

<style>
  .visualizations {
    display: grid;
    gap: 2rem;
    padding: 1rem;
  }

  .error {
    color: red;
    padding: 1rem;
    border: 1px solid red;
    border-radius: 4px;
  }
</style>