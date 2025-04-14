<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  
  // Custom action to focus an element
  function focusElement(node: HTMLElement) {
    // Focus the element on the next tick to ensure it's in the DOM
    setTimeout(() => node.focus(), 0);
    return {};
  }

  export let name: string;
  export let label: string = '';
  export let value: number = 0;
  export let min: number = 0;
  export let max: number = 100;
  export let step: number = 1;
  export let disabled: boolean = false;
  export let showValue: boolean = true;
  export let showMinMax: boolean = true;
  
  // For direct input
  let inputValue: string = '';
  let isEditing: boolean = false;
  
  // Get form context if available
  const formContext = getContext('form') as { formData: Writable<Record<string, any>> } | undefined;
  
  // Update form data if in a form context
  $: if (formContext) {
    formContext.formData.update(data => {
      data[name] = value;
      return data;
    });
  }
  
  // Format value for display
  function formatValue(val: number): string {
    return Number.isInteger(val) ? val.toString() : val.toFixed(2);
  }
  
  // Update value when input changes
  function updateValue() {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      // Clamp value between min and max
      value = Math.max(min, Math.min(max, newValue));
    }
    isEditing = false;
  }
  
  // Start editing
  function startEditing() {
    if (disabled) return;
    inputValue = formatValue(value);
    isEditing = true;
  }
  
  // Handle keyboard events
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      updateValue();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      isEditing = false;
      event.preventDefault();
    }
  }
</script>

<div class="dm-range-field">
  {#if label}
    <label for={name} class="dm-range-label">{label}</label>
  {/if}
  
  <div class="dm-range-container">
    {#if showMinMax}
      <span class="dm-range-min">{formatValue(min)}</span>
    {/if}
    
    <div class="dm-range-input-container">
      <input
        type="range"
        {name}
        id={name}
        bind:value
        {min}
        {max}
        {step}
        {disabled}
        class="dm-range-input"
      />
      
      {#if showValue}
        {#if isEditing}
          <input
            type="text"
            class="dm-range-value dm-range-value--editing"
            bind:value={inputValue}
            on:blur={updateValue}
            on:keydown={handleKeydown}
            autocomplete="off"
            {disabled}
            use:focusElement
          />
        {:else}
          <button 
            type="button"
            class="dm-range-value"
            on:click={startEditing}
            on:keydown={e => e.key === 'Enter' && startEditing()}
            title="Click to edit value"
            aria-label="Edit value: {formatValue(value)}"
          >
            {formatValue(value)}
          </button>
        {/if}
      {/if}
    </div>
    
    {#if showMinMax}
      <span class="dm-range-max">{formatValue(max)}</span>
    {/if}
  </div>
</div>

<style>
  .dm-range-field {
    margin-bottom: var(--dm-spacing-md);
    width: 100%;
  }
  
  .dm-range-label {
    display: block;
    font-size: 0.875rem;
    margin-bottom: var(--dm-spacing-xs);
    color: var(--dm-text);
  }
  
  .dm-range-container {
    display: flex;
    align-items: center;
    gap: var(--dm-spacing-sm);
    width: 100%;
  }
  
  .dm-range-input-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .dm-range-input {
    width: 100%;
    height: 24px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
  }
  
  /* Track styles */
  .dm-range-input::-webkit-slider-runnable-track {
    height: 12px;
    background: #e0e0e0;
    border: 2px solid var(--dm-border-color);
    box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    /* Pixelated track effect - more squared corners */
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 100%
    );
    image-rendering: pixelated;
  }
  
  .dm-range-input::-moz-range-track {
    height: 12px;
    background: #e0e0e0;
    border: 2px solid var(--dm-border-color);
    box-shadow: inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
  
  /* Thumb styles */
  .dm-range-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--dm-primary);
    margin-top: -6px;
    border: 2px solid var(--dm-primary-dark);
    /* Perfectly square thumb */
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 100%
    );
    image-rendering: pixelated;
  }
  
  .dm-range-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--dm-primary);
    border: 2px solid var(--dm-primary-dark);
    border-radius: 0;
  }
  
  /* Focus styles */
  .dm-range-input:focus {
    outline: none;
  }
  
  .dm-range-input:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 2px var(--dm-primary-transparent);
  }
  
  .dm-range-input:focus::-moz-range-thumb {
    box-shadow: 0 0 0 2px var(--dm-primary-transparent);
  }
  
  /* Disabled styles */
  .dm-range-input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  /* Value display */
  .dm-range-value {
    font-family: var(--dm-font-mono);
    font-size: 0.875rem;
    color: var(--dm-text);
    margin-top: var(--dm-spacing-xs);
    background: #f5f5f5;
    border: 1px solid var(--dm-border-color);
    padding: 2px 6px;
    min-width: 40px;
    text-align: center;
    cursor: pointer;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }
  
  .dm-range-value:hover {
    border-color: var(--dm-primary);
    background-color: white;
  }
  
  .dm-range-value--editing {
    cursor: text;
    background-color: white;
    border-color: var(--dm-primary);
    outline: none;
    box-shadow: 0 0 0 2px var(--dm-primary-transparent);
    font-family: var(--dm-font-mono);
    font-size: 0.875rem;
    width: 60px;
  }
  
  .dm-range-min,
  .dm-range-max {
    font-family: var(--dm-font-mono);
    font-size: 0.75rem;
    color: var(--dm-text-muted);
    min-width: 1.5rem;
    text-align: center;
    background: #f5f5f5;
    border: 1px solid var(--dm-border-color);
    padding: 2px 4px;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }
</style>
