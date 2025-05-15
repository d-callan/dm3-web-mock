<script lang="ts">
  import Button from './Button.svelte';
  import { base } from '$app/paths';
  
  // Props
  export let message: string = 'Loading...';
  export let subMessage: string = '';
  export let showSkipButton: boolean = false;
  export let skipButtonText: string = 'Skip loading and continue';
  export let buttonVariant: 'default' | 'primary' | 'secondary' | 'link' = 'secondary';
  
  // Events
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  function handleSkip() {
    dispatch('skip');
  }
</script>

<div class="dm-loading">
  <div class="dm-loader-container">
    <img src="{base}/images/hourglass.png" alt="Loading" class="dm-hourglass-img" />
  </div>
  <p class="dm-loading-message">{message}</p>
  {#if subMessage}
    <p class="dm-loading-submessage">{subMessage}</p>
  {/if}
  {#if showSkipButton}
    <div class="dm-skip-button-container">
      <Button 
        variant={buttonVariant} 
        on:click={handleSkip}
        size="md"
      >
        {skipButtonText}
      </Button>
    </div>
  {/if}
</div>

<style>
  .dm-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    min-height: 200px;
  }
  
  .dm-loader-container {
    width: 64px;
    height: 64px;
    margin-bottom: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dm-hourglass-img {
    width: 64px;
    height: 64px;
    image-rendering: pixelated;
    animation: flip 2s steps(2) infinite;
    transform-origin: center;
  }
  
  @keyframes flip {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .dm-loading-message {
    font-family: var(--dm-font-mono);
    font-size: 1.6rem;
    color: var(--dm-primary);
    margin: 0.5rem 0;
    text-shadow: 2px 2px 0px var(--dm-primary-extra-light);
  }
  
  .dm-loading-submessage {
    font-family: var(--dm-font-mono);
    font-size: 1.1rem;
    color: var(--dm-text);
    opacity: 0.9;
    margin: 0.5rem 0 1.5rem;
  }
  
  .dm-skip-button-container {
    margin-top: 1.5rem;
  }
  
  /* Full page loading variant */
  :global(.dm-loading-fullpage) {
    min-height: 60vh;
  }
</style>
