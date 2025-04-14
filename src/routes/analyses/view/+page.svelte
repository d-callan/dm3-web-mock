<script lang="ts">
  import Page from '$lib/components/Page.svelte';
</script>

<Page 
  title="Analysis Results"
  breadcrumbs={[
    { label: "Home", href: "/app" },
    { label: "My Analyses", href: "/analyses" },
    { label: "Analysis Results" }
  ]}>
  <div class="results-container">
    <h2>Results coming soon...</h2>
  </div>
</Page>

<style>
  .results-container {
    padding: var(--dm-spacing-lg);
  }
</style>
