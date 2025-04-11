<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let multiple = false;

  const openItems = writable<Set<string>>(new Set());
  setContext('accordion', { openItems, multiple });
</script>

<div class="dm-accordion">
  <slot />
</div>
