<script lang="ts">
  import Link from './Link.svelte';

  export let items: Array<{ label: string; href?: string }>;

  $: lastIndex = items.length - 1;
</script>

<nav class="dm-breadcrumbs" aria-label="Breadcrumbs">
  <ul>
    {#each items as item, i}
      <li>
        {#if item.href && i < lastIndex}
          <Link href={item.href} variant="muted">{item.label}</Link>
        {:else}
          <span class="dm-breadcrumbs__current">{item.label}</span>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style>
  .dm-breadcrumbs ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm);
  }

  .dm-breadcrumbs li {
    display: flex;
    align-items: center;
  }

  .dm-breadcrumbs li:not(:last-child)::after {
    content: "/";
    margin-left: var(--dm-spacing-sm);
    color: var(--dm-muted);
  }

  .dm-breadcrumbs__current {
    color: var(--dm-muted);
  }
</style>
