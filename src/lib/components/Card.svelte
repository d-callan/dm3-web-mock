<script lang="ts">
  export let title: string | undefined = undefined;
  export let variant: 'default' | 'primary' | 'secondary' = 'default';
  export let minHeight: string | undefined = undefined;
</script>

<div class="dm-card dm-card--{variant}" style="min-height: {minHeight || 'auto'};">
  {#if title}
    <h2 class="dm-card__title">{title}</h2>
  {/if}
  <slot />
</div>
