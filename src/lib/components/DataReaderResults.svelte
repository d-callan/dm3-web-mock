<script lang="ts">
  import PhyloTree from './PhyloTree.svelte';
  import { onMount } from 'svelte';
  
  export let jsonData: any;

  $: passed = jsonData?.FILE_INFO?.goodtree; // Determine if it passed based on goodtree condition
  
  onMount(() => {
    console.log('DataReaderResults component mounted');
    console.log('Received jsonData:', jsonData);
    console.log('FILE_INFO available:', !!jsonData?.FILE_INFO);
    console.log('goodtree value:', jsonData?.FILE_INFO?.goodtree);
  });
</script>

<div class="data-reader-results">
  {#if jsonData?.error}
    <div class="error-message">
      <p class="error-label">Error:</p>
      <p>{jsonData.error}</p>
    </div>
  {:else if jsonData?.FILE_INFO}
    <div class="validation-status">
      <span class="status-label">Validation Status:</span>
      <span class="status-value {passed ? 'success' : 'error'}">{passed ? 'Passed' : 'Failed'}</span>
    </div>
    
    <div class="metrics-table">
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Genetic Code ID:</td>
              <td>{jsonData.FILE_INFO.gencodeid}</td>
            </tr>
            <tr>
              <td>Good Tree:</td>
              <td>{jsonData.FILE_INFO.goodtree ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Partitions:</td>
              <td>{jsonData.FILE_INFO.partitions}</td>
            </tr>
            <tr>
              <td>Raw Sites:</td>
              <td>{jsonData.FILE_INFO.rawsites}</td>
            </tr>
            <tr>
              <td>Processed Sites:</td>
              <td>{jsonData.FILE_INFO.sites}</td>
            </tr>
            <tr>
              <td>Sequences:</td>
              <td>{jsonData.FILE_INFO.sequences}</td>
            </tr>
            <tr>
              <td>Timestamp:</td>
              <td>{new Date(parseInt(jsonData.FILE_INFO.timestamp.trim()) * 1000).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {#if jsonData.FILE_INFO?.nj}
        <div class="tree-section">
          <h4>Neighbor Joining (NJ) Tree</h4>
          <div class="tree-string">
            <p>{jsonData.FILE_INFO.nj}</p>
          </div>
          <div class="tree-visualization">
            <PhyloTree newickString={jsonData.FILE_INFO.nj} height={500} width={700} />
          </div>
        </div>
      {/if}

      {#if jsonData?.FILE_PARTITION_INFO && jsonData.FILE_PARTITION_INFO['0']?.usertree}
        <div class="tree-section">
          <h4>User Supplied Tree</h4>
          <div class="tree-string">
            <p>{jsonData.FILE_PARTITION_INFO['0'].usertree}</p>
          </div>
          <div class="tree-visualization">
            <PhyloTree 
              newickString={jsonData.FILE_PARTITION_INFO['0'].usertree} 
              height={500} 
              width={700} 
            />
          </div>
        </div>
      {/if}
      
      {#if jsonData.SEQUENCES}
        <div class="sequences-section">
          <h4>Sequences</h4>
          <div class="sequences-list">
            {#each Object.values(jsonData.SEQUENCES) as sequence}
              {@const typedSequence = sequence as {seqindex: number, name: string}}
              <div class="sequence-item">
                <span class="sequence-index">{typedSequence.seqindex + 1}.</span>
                <span class="sequence-name">{typedSequence.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}
  {:else}
    <p class="no-data">No data available.</p>
  {/if}
</div>

<style>
  .data-reader-results {
    font-family: var(--dm-font-sans);
    color: var(--dm-text);
  }
  
  .results-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  .error-message {
    margin-top: 1rem;
    color: var(--dm-error);
  }
  
  .error-label {
    font-weight: 500;
    margin-bottom: 0.25rem;
  }
  
  .validation-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: var(--dm-background-alt, #f8f9fa);
    border-radius: 0.25rem;
  }
  
  .status-label {
    font-weight: 500;
  }
  
  .status-value {
    font-weight: 600;
  }
  
  .status-value.success {
    color: var(--dm-success, #28a745);
  }
  
  .status-value.error {
    color: var(--dm-error, #dc3545);
  }
  
  .metrics-table {
    margin-top: 1rem;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  
  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid var(--dm-border);
  }
  
  th {
    font-weight: 600;
    background-color: var(--dm-background-alt);
  }
  
  td:first-child {
    font-weight: 500;
  }
  
  .tree-section, .sequences-section {
    margin-top: 1.5rem;
  }
  
  .tree-section h4, .sequences-section h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .tree-string {
    padding: 0.75rem;
    background-color: var(--dm-background-alt);
    border-radius: 0.25rem;
    font-family: var(--dm-font-mono);
    font-size: 0.875rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    margin-bottom: 1rem;
  }
  
  .tree-visualization {
    border: 1px solid var(--dm-border);
    border-radius: 0.25rem;
    padding: 1rem;
    background-color: white;
    margin-bottom: 1rem;
  }
  
  .sequences-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid var(--dm-border);
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
  
  .sequence-item {
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
  }
  
  .sequence-item:nth-child(even) {
    background-color: var(--dm-background-alt);
  }
  
  .sequence-index {
    font-weight: 500;
    margin-right: 0.5rem;
    min-width: 2rem;
  }
  
  .no-data {
    color: var(--dm-text-muted);
    margin-top: 1rem;
  }
</style>
