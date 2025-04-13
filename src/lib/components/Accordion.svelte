<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let multiple = false;

  const openItems = writable<Set<string>>(new Set());
  setContext('accordion', { openItems, multiple });

  // Handle hash changes
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      openItems.set(new Set([hash]));
    }
  }

  onMount(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  });
</script>

<div class="dm-accordion">
  <slot />
</div>
