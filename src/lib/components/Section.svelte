<script lang="ts">
  import { setContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { writable } from 'svelte/store';

  export let title: string;
  export let subtitle = '';
  export let level: 'primary' | 'secondary' = 'primary';
  export let spacing: 'sm' | 'md' | 'lg' = 'md';

  const items = writable<HTMLElement[]>([]);
  setContext('section', { items, spacing });
</script>

<div class="dm-section dm-section--{level}">
  <div class="dm-section__header">
    <div class="dm-section__title">{title}</div>
    {#if subtitle}
      <div class="dm-section__subtitle">{subtitle}</div>
    {/if}
  </div>
  <div class="dm-section__content dm-section__content--{spacing}">
    <slot />
  </div>
</div>
