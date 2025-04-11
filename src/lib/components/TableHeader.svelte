<script lang="ts">
  export let align: 'left' | 'center' | 'right' = 'left';
  export let sortable = false;
  export let sorted: 'none' | 'asc' | 'desc' = 'none';
</script>

<th 
  class="dm-table__header dm-table__header--{align} {sortable ? 'dm-table__header--sortable' : ''}"
  class:dm-table__header--sorted={sorted !== 'none'}
  on:click
>
  <div class="dm-table__header-content">
    <slot />
    {#if sortable}
      <span class="dm-table__sort-icon" class:dm-table__sort-icon--active={sorted !== 'none'}>
        {#if sorted === 'asc'}↑{:else if sorted === 'desc'}↓{:else}⇅{/if}
      </span>
    {/if}
  </div>
</th>
