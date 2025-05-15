<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import Button from '$lib/components/Button.svelte';
  import Page from '$lib/components/Page.svelte';
</script>

<Page>
  <div class="dm-error-container">
    <div class="dm-error-content">
      <h1 class="dm-error-title">{$page.status}: {$page.error?.message || 'Page not found'}</h1>
      <p class="dm-error-message">Sorry, we couldn't find what you were looking for.</p>
      <div class="dm-error-actions">
        <Button href="{base}/" variant="primary">Go back home</Button>
      </div>
    </div>
  </div>
</Page>

<style>
  :global(body) {
    font-family: var(--dm-font-mono);
  }
  
  .dm-error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    padding: 2rem;
  }

  .dm-error-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .dm-error-title {
    font-family: var(--dm-font-mono);
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--dm-primary);
  }

  .dm-error-message {
    font-family: var(--dm-font-mono);
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: var(--dm-text);
  }

  .dm-error-actions {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
</style>
