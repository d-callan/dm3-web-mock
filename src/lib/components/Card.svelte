<script lang="ts">
  export let title: string;
  export let variant: 'default' | 'primary' | 'secondary' = 'default';
</script>

<div class="dm-card dm-card--{variant}">
  {#if title}
    <h2 class="dm-card__title">{title}</h2>
  {/if}
  <slot />
</div>
