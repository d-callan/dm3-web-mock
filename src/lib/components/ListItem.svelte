<script lang="ts">
  export let active = false;
  export let disabled = false;
  export let icon: string | undefined = undefined;
</script>

<li class="dm-list__item" class:dm-list__item--active={active} class:dm-list__item--disabled={disabled}>
  {#if icon}
    <span class="dm-list__item-icon">{icon}</span>
  {/if}
  <span class="dm-list__item-content">
    <slot />
  </span>
</li>

<style>
  .dm-list__item {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm);
  }

  .dm-list__item--active {
    color: var(--dm-primary);
    font-weight: 500;
  }

  .dm-list__item--disabled {
    color: var(--dm-text-muted);
    cursor: not-allowed;
  }

  .dm-list__item-icon {
    flex-shrink: 0;
    color: var(--dm-text-muted);
  }

  .dm-list__item-content {
    flex: 1;
  }
</style>
