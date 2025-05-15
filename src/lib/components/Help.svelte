<script lang="ts">
  import { fade } from 'svelte/transition';
  import Modal from './Modal.svelte';
  export let text = '';

  let showModal = false;
  
  function toggleModal(e?: Event) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    showModal = !showModal;
  }
</script>

<button 
  class="dm-help" 
  on:click={(e) => toggleModal(e)}
  type="button"
  aria-label="Help"
>
  ?
</button>

{#if showModal}
  <Modal 
    isOpen={showModal} 
    on:close={() => showModal = false}
    width="400px"
    maxWidth="90%"
    closeOnBackdropClick={true}
    showCloseButton={true}
    ariaLabel="Help"
    title=" "
  >
    <p class="dm-help-text">{text}</p>
  </Modal>
{/if}

<style>
  .dm-help {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 2px solid #1a0a24;
    background: var(--dm-background, white);
    color: var(--dm-text, #1a0a24);
    font-family: var(--dm-font-mono, monospace);
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
    background: var(--dm-primary, #6200ee);
    color: white;
  }

  .dm-help-text {
    font-family: var(--dm-font-mono, monospace);
    color: var(--dm-text, #1a0a24);
    margin: 0;
  }

  /* Modal styling is handled by the Modal component */
</style>
