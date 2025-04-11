<script lang="ts">
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import type { Writable } from 'svelte/store';

  export let id: string;
  export let title: string;
  export let defaultOpen = false;
  export let icon = '+';
  export let iconOpen = '−';

  const { openItems, multiple } = getContext('accordion') as {
    openItems: Writable<Set<string>>,
    multiple: boolean
  };

  // Initialize open state
  if (defaultOpen) {
    openItems.update(items => new Set([...items, id]));
  }

  $: isOpen = $openItems.has(id);

  function toggle() {
    $openItems = new Set(
      isOpen
        ? [...$openItems].filter(i => i !== id)
        : multiple
          ? [...$openItems, id]
          : [id]
    );
  }
</script>

<div class="dm-accordion__item" class:dm-accordion__item--open={isOpen}>
  <button
    class="dm-accordion__header"
    on:click={toggle}
    aria-expanded={isOpen}
    aria-controls="content-{id}"
  >
    <span class="dm-accordion__title">{title}</span>
    <span class="dm-accordion__icon" aria-hidden="true">
      {isOpen ? iconOpen : icon}
    </span>
  </button>

  {#if isOpen}
    <div
      class="dm-accordion__content"
      id="content-{id}"
      transition:slide={{ duration: 200 }}
    >
      <slot />
    </div>
  {/if}
</div>
