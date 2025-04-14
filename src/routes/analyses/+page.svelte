<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Table from '$lib/components/Table.svelte';
  import Text from '$lib/components/Text.svelte';
  import { analyses } from '$lib/stores/analyses';
  import type { Analysis } from '$lib/stores/analyses';

  const columns = [
    { 
      key: 'id', 
      title: 'Job ID',
      align: 'left' as const,
      sortable: true,
      monospace: true
    },
    { 
      key: 'method', 
      title: 'Method',
      align: 'left' as const,
      sortable: true
    },
    { 
      key: 'configuration', 
      title: 'Configuration',
      align: 'left' as const
    },
    { 
      key: 'status', 
      title: 'Status',
      align: 'center' as const,
      variant: 'success' as const
    },
    { 
      key: 'actions',
      title: 'Actions',
      align: 'center' as const,
      render: (row: { resultsUrl: string }) => `
        <a href="${row.resultsUrl}" class="dm-link dm-link--primary">View Results</a>
      `
    }
  ];

  let sortColumn: string | null = null;
  let sortDirection: 'asc' | 'desc' | 'none' = 'none';
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
    {#if $analyses.length > 0}
      <Card>
        <Table
          {columns}
          data={$analyses}
          hover
          striped
          bind:sortColumn
          bind:sortDirection
        />
      </Card>
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
  }

  .empty-state {
    padding: var(--dm-spacing-xl);
    text-align: center;
  }
</style>
