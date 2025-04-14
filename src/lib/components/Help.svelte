<script lang="ts">
  import { fade } from 'svelte/transition';
  export let text = '';

  let showModal = false;
</script>

<button 
  class="dm-help" 
  on:click={() => showModal = true}
  type="button"
  aria-label="Help"
>
  ?
</button>

{#if showModal}
  <div 
    class="dm-modal-backdrop" 
    on:click={() => showModal = false} 
    on:keydown={e => e.key === 'Escape' && (showModal = false)}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    transition:fade
  >
    <div 
      class="dm-modal"
      role="document">
      <div class="dm-modal__content">
        <p>{text}</p>
      </div>
      <button 
        class="dm-modal__close" 
        on:click={() => showModal = false}
        type="button"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  </div>
{/if}

<style>
  .dm-help {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid #1a0a24;
    background: var(--dm-background);
    color: var(--dm-text);
    font-family: var(--dm-font-mono);
    font-size: 14px;
    cursor: pointer;
    padding: 0;
    margin-left: 0.5rem;
    /* Pixelated border effect */
    clip-path: polygon(
      0 2px,
      2px 2px,
      2px 0,
      calc(100% - 2px) 0,
      calc(100% - 2px) 2px,
      100% 2px,
      100% calc(100% - 2px),
      calc(100% - 2px) calc(100% - 2px),
      calc(100% - 2px) 100%,
      2px 100%,
      2px calc(100% - 2px),
      0 calc(100% - 2px)
    );
    image-rendering: pixelated;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }

  .dm-help:hover {
    background: var(--dm-primary);
    color: white;
  }

  .dm-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .dm-modal {
    position: relative;
    background: var(--dm-background);
    padding: 1.5rem;
    border: 2px solid #1a0a24;
    max-width: 90%;
    width: 400px;
    /* Pixelated border effect */
    clip-path: polygon(
      0 4px,
      4px 4px,
      4px 0,
      calc(100% - 4px) 0,
      calc(100% - 4px) 4px,
      100% 4px,
      100% calc(100% - 4px),
      calc(100% - 4px) calc(100% - 4px),
      calc(100% - 4px) 100%,
      4px 100%,
      4px calc(100% - 4px),
      0 calc(100% - 4px)
    );
    box-shadow: 
      4px 4px 0px rgba(0, 0, 0, 0.2);
    image-rendering: pixelated;
  }

  .dm-modal__content {
    font-family: var(--dm-font-mono);
    color: var(--dm-text);
  }

  .dm-modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 24px;
    height: 24px;
    border: none;
    background: none;
    color: var(--dm-text);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dm-modal__close:hover {
    color: var(--dm-primary);
  }
</style>
