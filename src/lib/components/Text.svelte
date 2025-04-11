<script lang="ts">
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let variant: 'default' | 'muted' | 'success' | 'warning' | 'error' | 'primary' = 'default';
  export let weight: 'normal' | 'medium' | 'bold' = 'normal';
  export let align: 'left' | 'center' | 'right' = 'left';
  export let monospace = false;
  export let truncate = false;
  export let as: 'p' | 'span' | 'div' = 'p';
</script>

<svelte:element 
  this={as}
  class="dm-text dm-text--{size} dm-text--{variant} dm-text--{weight} dm-text--{align} {monospace ? 'dm-text--mono' : ''} {truncate ? 'dm-text--truncate' : ''}"
>
  <slot />
</svelte:element>
