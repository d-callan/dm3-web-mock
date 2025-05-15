<script lang="ts">
  import PhyloTree from './PhyloTree.svelte';
  import Text from './Text.svelte';
  import Card from './Card.svelte';
  import Expandable from './Expandable.svelte';
  import TableOfContents from './TableOfContents.svelte';
  import Table from './Table.svelte';
  import TableHeader from './TableHeader.svelte';
  import TableCell from './TableCell.svelte';
  import { onMount } from 'svelte';
  
  // Component props
  
  // Define base sections for the table of contents
  $: availableSections = [
    { id: 'validation-status', title: 'Validation Status', available: !!jsonData?.FILE_INFO },
    { id: 'nj-tree', title: 'NJ Tree', available: !!jsonData?.FILE_INFO?.nj },
    { id: 'user-tree', title: 'User Tree', available: !!jsonData?.FILE_PARTITION_INFO && !!jsonData.FILE_PARTITION_INFO['0']?.usertree },
    { id: 'sequences', title: 'Sequences', available: !!jsonData?.SEQUENCES }
  ].filter(section => section.available);
  
  $: activeSection = availableSections.length > 0 ? availableSections[0].id : '';
  
  // Update active section based on scroll position
  function updateActiveSection() {
    const sectionElements = availableSections.map((section: {id: string, title: string, available: boolean}) => 
      document.getElementById(section.id)
    );
    
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const element = sectionElements[i];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          activeSection = availableSections[i].id;
          break;
        }
      }
    }
  }
  
  export let jsonData: any;

  $: passed = jsonData?.FILE_INFO?.goodtree; // Determine if it passed based on goodtree condition
  
  onMount(() => {
    console.log('DataReaderResults component mounted');
    console.log('Received jsonData:', jsonData);
    console.log('FILE_INFO available:', !!jsonData?.FILE_INFO);
    console.log('goodtree value:', jsonData?.FILE_INFO?.goodtree);
  });
</script>

<div class="dm-data-reader-results">
  <div class="dm-page-layout" class:dm-page-layout--full={availableSections.length === 0}>
    {#if availableSections.length > 0}
      <aside class="dm-page-layout__sidebar">
        <TableOfContents sections={availableSections} {activeSection} />
      </aside>
    {/if}
    
    <div class="dm-page-layout__content" class:dm-page-layout__content--full={availableSections.length === 0} on:scroll={updateActiveSection}>
      {#if jsonData?.error}
        <Card>
          <div class="dm-status dm-status-error dm-status--pill">
            <Text variant="error" weight="medium">Error</Text>
            <Text>{jsonData.error}</Text>
          </div>
        </Card>
      {:else if jsonData?.FILE_INFO}
        <section id="validation-status" class="dm-section">
          <Card title="Validation Status">
            <div class="dm-card__header">
              <h2 class="dm-validation-title">
                <span class="validation-status">
                  <span class="validation-result {passed ? 'success' : 'error'}">
                    <span class="validation-icon">
                      {#if passed}
                        <i class="fas fa-check-circle" aria-hidden="true"></i>
                      {:else}
                        <i class="fas fa-times-circle" aria-hidden="true"></i>
                      {/if}
                    </span>
                    <Text variant={passed ? 'success' : 'error'} size="xl" weight="medium">
                      {passed ? 'Passed' : 'Failed'}
                    </Text>
                  </span>
                </span>
              </h2>
            </div>
            
            <div class="dm-validation-spacer"></div>
        
            <div class="dm-metrics-table">
              <!-- Using a simple approach with the Table component that works with TypeScript -->
              <Table 
                hover 
                striped 
                bordered 
                columns={[
                  { key: 'metric', title: 'Metric' },
                  { 
                    key: 'value', 
                    title: 'Value',
                    render: (row) => {
                      // Type assertion to avoid TypeScript errors
                      const typedRow = row as {metric: string, value: string, variant?: string, pill?: boolean, monospace?: boolean};
                      if (typedRow.variant) {
                        return `<span class="dm-status-${typedRow.variant} ${typedRow.pill ? 'dm-status--pill' : ''}">${typedRow.value}</span>`;
                      } else if (typedRow.monospace) {
                        return `<span class="dm-text-mono">${typedRow.value}</span>`;
                      } else {
                        return typedRow.value;
                      }
                    }
                  }
                ]} 
                data={[
                  { metric: 'Genetic Code ID', value: jsonData.FILE_INFO.gencodeid },
                  { 
                    metric: 'Good Tree', 
                    value: jsonData.FILE_INFO.goodtree ? 'Yes' : 'No',
                    variant: jsonData.FILE_INFO.goodtree ? 'success' : 'error',
                    pill: true
                  },
                  { metric: 'Partitions', value: jsonData.FILE_INFO.partitions },
                  { metric: 'Raw Sites', value: jsonData.FILE_INFO.rawsites },
                  { metric: 'Processed Sites', value: jsonData.FILE_INFO.sites },
                  { metric: 'Sequences', value: jsonData.FILE_INFO.sequences },
                  { 
                    metric: 'Timestamp', 
                    value: new Date(parseInt(jsonData.FILE_INFO.timestamp.trim()) * 1000).toLocaleString(),
                    monospace: true
                  }
                ]}
              />
            </div>
          </Card>
        </section>
      
      {#if jsonData.FILE_INFO?.nj}
        <section id="nj-tree" class="dm-section">
          <Card title="Neighbor Joining (NJ) Tree">
            <div class="dm-tree-visualization">
              <PhyloTree newickString={jsonData.FILE_INFO.nj} height={500} width={700} />
            </div>
            <Expandable title="View Newick Tree String" defaultOpen={false}>
              <div class="dm-code-block">
                <Text size="sm" monospace>{jsonData.FILE_INFO.nj}</Text>
              </div>
            </Expandable>
          </Card>
        </section>
      {/if}

      {#if jsonData?.FILE_PARTITION_INFO && jsonData.FILE_PARTITION_INFO['0']?.usertree}
        <section id="user-tree" class="dm-section">
          <Card title="User Supplied Tree">
            <div class="dm-tree-visualization">
              <PhyloTree 
                newickString={jsonData.FILE_PARTITION_INFO['0'].usertree} 
                height={500} 
                width={700} 
              />
            </div>
            <Expandable title="View Newick Tree String" defaultOpen={false}>
              <div class="dm-code-block">
                <Text size="sm" monospace>{jsonData.FILE_PARTITION_INFO['0'].usertree}</Text>
              </div>
            </Expandable>
          </Card>
        </section>
      {/if}
      
      {#if jsonData.SEQUENCES}
        <section id="sequences" class="dm-section">
          <Card title="Sequences">
            <div class="dm-sequences-list">
              {#each Object.values(jsonData.SEQUENCES) as sequence}
                {@const typedSequence = sequence as {seqindex: number, name: string}}
                <div class="dm-list__item">
                  <Text weight="medium">{typedSequence.seqindex + 1}.</Text>
                  <Text>{typedSequence.name}</Text>
                </div>
              {/each}
            </div>
          </Card>
        </section>
      {/if}
    {:else}
      <Card>
        <Text variant="muted">No data available.</Text>
      </Card>
    {/if}
    </div>
  </div>
</div>

<style>
  .dm-data-reader-results {
    font-family: var(--dm-font-mono);
    color: var(--dm-text);
    font-size: var(--dm-font-size-base);
    line-height: var(--dm-line-height);
  }
    
  .dm-page-layout {
    display: flex;
    gap: var(--dm-spacing-xl);
  }
  
  .dm-page-layout--full {
    display: block;
  }
  
  .dm-page-layout__sidebar {
    width: 250px;
    flex-shrink: 0;
    position: sticky;
    top: var(--dm-spacing-lg);
    align-self: flex-start;
  }
  
  .dm-page-layout__content {
    flex: 1;
    min-width: 0;
    width: 100%;
    max-width: 900px; /* Make the content area wider */
  }
  
  .dm-page-layout__content--full {
    width: 100%;
    max-width: 1000px; /* Even wider when no sidebar */
  }
  
  .dm-section {
    margin-bottom: var(--dm-spacing-xl);
    scroll-margin-top: var(--dm-spacing-xl);
  }
  
  .dm-validation-title {
    margin: 0;
    font-family: var(--dm-font-mono);
    font-size: 1.5rem;
    width: 100%;
  }
  
  .validation-status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .validation-label {
    font-family: var(--dm-font-family);
    font-weight: normal;
    color: var(--dm-color-text);
  }

  .validation-result {
    display: flex;
    align-items: center;
  }

  .validation-icon {
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 1.2em;
    vertical-align: middle;
  }
  
  .validation-result.success .validation-icon {
    color: var(--dm-color-success);
  }
  
  .validation-result.error .validation-icon {
    color: var(--dm-color-error);
  }
  
  .dm-validation-spacer {
    height: 1.5rem;
  }
  
  .dm-tree-visualization {
    width: 100%;
    height: 500px;
    border: 1px solid var(--dm-border, #ddd);
    border-radius: var(--dm-border-radius, 4px);
    overflow: auto;
    margin-bottom: 1rem;
  }

  .dm-code-block {
    font-family: var(--dm-font-mono);
    white-space: pre-wrap;
    background-color: var(--dm-background-alt, #f5f5f5);
    padding: 0.5rem;
    border-radius: var(--dm-border-radius, 4px);
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  
  .dm-sequences-list {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
  }
  
  .dm-list__item {
    display: flex;
    gap: 0.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--dm-border, #eee);
  }
  
  .dm-list__item:nth-child(even) {
    background-color: var(--dm-background-alt, #f9f9f9);
  }
  
  @media (max-width: 768px) {
    .dm-page-layout {
      flex-direction: column;
    }
    
    .dm-page-layout__sidebar {
      width: 100%;
      position: static;
      margin-bottom: var(--dm-spacing-lg);
    }
  }
</style>
