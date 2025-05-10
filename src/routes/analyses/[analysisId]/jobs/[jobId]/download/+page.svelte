<script lang="ts">
  import { get } from 'svelte/store';
  import { jobs } from '$lib/stores/jobs';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

  // Get the job ID from the URL
  const jobId = $page.params.jobId;
  const analysisId = $page.params.analysisId;
  
  // Function to trigger download
  function downloadResults(jobData: string, filename: string) {
    // Create a blob with the JSON data
    const blob = new Blob([jobData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  onMount(() => {
    // Get the job from the store
    const job = get(jobs).find(j => j.id === jobId);
    
    if (job && job.resultsData) {
      // Download the results data
      downloadResults(job.resultsData, `hyphy-${job.method}-results.json`);
      
      // Redirect back to the results page
      setTimeout(() => {
        goto(`${base}/analyses/${analysisId}/jobs/${jobId}/result`);
      }, 100);
    } else {
      // If no results data, redirect back to the results page
      console.error('No results data available for this job');
      goto(`${base}/analyses/${analysisId}/jobs/${jobId}/result`);
    }
  });
</script>

<div>
  Downloading results...
</div>
