<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/Table.svelte';
  import Text from '$lib/components/Text.svelte';
  import { analyses, removeAnalysis } from '$lib/stores/analyses';
  import type { Analysis } from '$lib/stores/analyses';
  import { jobs } from '$lib/stores/jobs';
  import type { Job } from '$lib/stores/jobs';

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
      sortable: true
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
      render: (value: string) => `<a href="${value}">View</a>`
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
</script>

<Page 
  title="My Analyses"
  breadcrumbs={[
    { label: "Home", href: "/app" },
    { label: "My Analyses" }
  ]}>
  <div slot="header">
    <Button href="/app/analyses/new" variant="primary" size="lg" maxWidth="160px">Start New Analysis</Button>
  </div>

  <div class="analyses-container">
    {#if $analyses?.length > 0}
      {#each $analyses as analysis (analysis.id)}
        <div class="analysis-card">
          <Card>
            <div class="analysis-header">
              <div class="analysis-content">
                <div class="analysis-info">
                  <h2>{analysis.name || 'Unnamed Analysis'}</h2>
                  <div class="analysis-metadata">
                    <Text variant="muted" size="sm">Dataset ID: {analysis.datasetId}</Text>
                    <Text variant="muted" size="sm">Created: {formatDate(analysis.createdAt)}</Text>
                  </div>
                  {#if analysis.description}
                    <Text>{analysis.description}</Text>
                  {/if}
                </div>
                <div class="analysis-actions">
                  <div class="button-wrapper" title={analysis.sourceType === 'imported_json' ? 'Jobs cannot be added to imported HyPhy analyses' : 'Add a new job to this analysis'}>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      maxWidth={analysis.sourceType === 'imported_json' ? "100px" : "50px"}
                      disabled={analysis.sourceType === 'imported_json'}
                      href={`/app/analyses/${analysis.id}/jobs/new`}
                    >
                      Add Job
                    </Button>
                  </div>
                </div>
              </div>
              <div class="delete-button-wrapper">
                <button
                  class="delete-button"
                  on:click={() => removeAnalysis(analysis.id)}
                  title="Delete Analysis"
                >
                  <i class="fas fa-trash-alt" aria-hidden="true"></i>
                  <span class="sr-only">Delete Analysis</span>
                </button>
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

<style>
  .analyses-container {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-lg);
  }

  .empty-state {
    padding: var(--dm-spacing-xl);
    text-align: center;
  }

  .analysis-header {
    margin-bottom: var(--dm-spacing-lg);
    position: relative;
  }

  .analysis-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-right: var(--dm-spacing-xl);
  }

  .analysis-info {
    flex: 1;
  }

  .analysis-info h2 {
    margin: 0 0 var(--dm-spacing-sm);
    font-size: 1.25rem;
    font-weight: 600;
  }

  .analysis-metadata {
    display: flex;
    gap: var(--dm-spacing-md);
    margin-bottom: var(--dm-spacing-sm);
  }

  .analysis-actions {
    margin-left: var(--dm-spacing-lg);
  }

  .delete-button-wrapper {
    position: absolute;
    top: var(--dm-spacing-sm);
    right: var(--dm-spacing-sm);
  }

  .delete-button {
    background: none;
    border: none;
    padding: 0;
    color: var(--dm-color-primary);
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
  }

  .delete-button:hover {
    color: var(--dm-color-primary-dark);
  }

  .button-wrapper {
    display: inline-block;
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
</style>
