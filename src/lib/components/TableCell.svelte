<script lang="ts">
  export let monospace = false;
  export let align: 'left' | 'center' | 'right' = 'left';
  export let variant: 'default' | 'success' | 'warning' | 'error' | 'running' = 'default';
  export let pill = false;
</script>

<td class="dm-table__cell {monospace ? 'dm-text-mono' : ''} dm-table__cell--{align}">
  {#if variant !== 'default'}
    <span class="dm-status-{variant} {pill ? 'dm-status--pill' : ''}">
      <slot />
    </span>
  {:else}
    <slot />
  {/if}
</td>
