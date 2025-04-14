<script lang="ts">
  import TableHeader from './TableHeader.svelte';
  import TableCell from './TableCell.svelte';
  import type { ComponentType } from 'svelte';

  export let compact = false;
  export let hover = true;
  export let striped = false;
  export let bordered = false;
  export let columns: Array<{
    key: string;
    title: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'running';
    render?: (row: any) => string;
    component?: ComponentType;
    componentProps?: (row: any) => Record<string, any>;
  }> = [];
  export let data: Array<Record<string, any>> = [];
  export let sortColumn: string | null = null;
  export let sortDirection: 'asc' | 'desc' | 'none' = 'none';

  function handleSort(column: typeof columns[0]) {
    if (!column.sortable) return;
    
    if (sortColumn === column.key) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 
                     sortDirection === 'desc' ? 'none' : 'asc';
    } else {
      sortColumn = column.key;
      sortDirection = 'asc';
    }
  }
</script>

<div class="dm-table__container">
  <table class="dm-table {compact ? 'dm-table--compact' : ''} {hover ? 'dm-table--hover' : ''} {striped ? 'dm-table--striped' : ''} {bordered ? 'dm-table--bordered' : ''}">
    {#if columns.length > 0}
      <thead>
        <tr>
          {#each columns as column}
            <TableHeader
              align={column.align || 'left'}
              sortable={column.sortable || false}
              sorted={sortColumn === column.key ? sortDirection : 'none'}
              on:click={() => handleSort(column)}
            >
              {column.title}
            </TableHeader>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as row}
          <tr>
            {#each columns as column}
              <TableCell
                align={column.align || 'left'}
                variant={column.variant || 'default'}
              >
                {#if column.component}
                  <svelte:component this={column.component} {...column.componentProps?.(row) || {}} />
                {:else if column.render}
                  {@html column.render(row)}
                {:else}
                  {row[column.key]}
                {/if}
              </TableCell>
            {/each}
          </tr>
        {/each}
      </tbody>
    {:else}
      <slot />
    {/if}
  </table>
</div>
