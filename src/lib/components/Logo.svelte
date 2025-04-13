<script lang="ts">
  import { base } from '$app/paths';
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let showText = false;
</script>

<div class="dm-logo dm-logo--{size}">
  <img src={`${base}/images/dm_whole.png`} alt="Datamonkey Logo" class="dm-logo__image" />
  {#if showText}
    <h1 class="dm-logo__text">Datamonkey</h1>
  {/if}
</div>

<style>
  .dm-logo {
    display: inline-flex;
    align-items: center;
  }

  .dm-logo--xs .dm-logo__image {
    height: 32px;
  }

  .dm-logo--sm .dm-logo__image {
    height: 50px;
  }

  .dm-logo--md .dm-logo__image {
    height: 80px;
  }

  .dm-logo--lg .dm-logo__image {
    height: 120px;
  }

  .dm-logo--xl .dm-logo__image {
    height: 160px;
  }

  .dm-logo__image {
    width: auto;
  }

  .dm-logo__text {
    font-size: 2rem;
    color: var(--dm-text-dark);
    margin: 0;
    font-family: var(--dm-font-mono);
  }

  .dm-logo--lg .dm-logo__text {
    font-size: 2.5rem;
  }

  .dm-logo--xl .dm-logo__text {
    font-size: 3rem;
  }
</style>
