<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import Text from './Text.svelte';

  // Props
  export let title: string = '';
  export let isOpen: boolean = false;
  export let width: string = '90%';
  export let maxWidth: string = '1000px';
  export let closeOnBackdropClick: boolean = true;
  export let showCloseButton: boolean = true;
  export let ariaLabel: string = 'Modal';

  // Event dispatcher
  const dispatch = createEventDispatcher();

  // Close modal function
  function closeModal(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    dispatch('close');
  }

  // Handle backdrop click
  function handleBackdropClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    if (closeOnBackdropClick) {
      dispatch('close');
    }
  }

  // Handle modal content click to prevent propagation
  function handleModalClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Handle escape key press
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal(event);
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div 
    class="dm-modal-backdrop" 
    on:click={handleBackdropClick} 
    on:keydown={handleKeydown}
    tabindex="-1" 
    role="dialog" 
    aria-modal="true"
    aria-label={ariaLabel}
    transition:fade
  >
    <div 
      class="dm-modal" 
      on:click={handleModalClick} 
      on:keydown={(e) => e.stopPropagation()}
      style="width: {width}; max-width: {maxWidth};"
      role="document"
      tabindex="-1"
    >
      <div class="dm-modal-content">
        <div class="dm-modal-header">
          {#if title}
            <h2 class="dm-modal-title">{title}</h2>
          {/if}
          {#if showCloseButton}
            <button class="dm-modal-close" on:click={(e) => closeModal(e)} aria-label="Close modal">×</button>
          {/if}
        </div>
        <div class="dm-modal-body">
          <slot></slot>
        </div>
        {#if $$slots.footer}
          <div class="dm-modal-footer">
            <slot name="footer"></slot>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>

  /* Modal styling */
  .dm-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dm-modal {
    background-color: white;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    z-index: 1001;
    overflow: hidden;
    border: 2px solid #1a0a24;
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
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
    image-rendering: pixelated;
  }
  
  .dm-modal-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  
  .dm-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--dm-border, #e0e0e0);
  }
  
  .dm-modal-title {
    font-family: var(--dm-font-mono, monospace);
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .dm-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--dm-text-muted, #757575);
    line-height: 1;
    padding: 0;
  }
  
  .dm-modal-close:hover {
    color: var(--dm-text, #1a0a24);
  }
  
  .dm-modal-body {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
  }
  
  .dm-modal-footer {
    padding: 1rem;
    border-top: 1px solid var(--dm-border, #e0e0e0);
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
</style>
