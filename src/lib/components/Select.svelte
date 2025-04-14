<script lang="ts">
  import { slide } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let name: string;
  export let label: string;
  export let value: string = '';
  export let options: { value: string; label: string }[] = [];

  export let disabled = false;

  let isOpen = false;
  let dropdownEl: HTMLDivElement;

  const dispatch = createEventDispatcher<{ change: string }>();

  function handleClickOutside(event: MouseEvent) {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  function toggle() {
    if (!disabled) {
      isOpen = !isOpen;
    }
  }

  function select(option: { value: string; label: string }) {
    if (!disabled) {
      value = option.value;
      isOpen = false;
      dispatch('change', value);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }

  $: selectedLabel = options.find(opt => opt.value === value)?.label || '';
</script>

<div class="select-field">
  <label for={name}>{label}</label>
  <div class="dm-select" bind:this={dropdownEl}>
    <button 
      class="dm-select__trigger" 
      on:click|stopPropagation={toggle}
      on:keydown={handleKeyDown}
      type="button"
      {name}
      id={name}
      disabled={disabled}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {selectedLabel || 'Select an option'}
      <span class="dm-select__arrow" class:dm-select__arrow--open={isOpen}>▼</span>
    </button>
    {#if isOpen}
    <div 
      class="dm-select__menu" 
      transition:slide={{ duration: 100 }}
      role="listbox"
      aria-label="Options"
    >
      {#each options as option}
        <button 
          type="button"
          class="dm-select__item" 
          class:dm-select__item--selected={value === option.value}
          on:click|stopPropagation|preventDefault={() => select(option)}
          role="option"
          aria-selected={value === option.value}
        >
          {option.label}
        </button>
      {/each}
    </div>
    {/if}
  </div>
</div>

<svelte:window on:click={handleClickOutside} />

<style>
  .select-field {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-sm);
    margin-bottom: var(--dm-spacing-md);
  }

  label {
    font-family: var(--dm-font-mono);
    font-size: 1.125rem;
    font-weight: 500;
  }

  .dm-select {
    position: relative;
    width: 100%;
  }

  .dm-select__trigger {
    width: 100%;
    padding: var(--dm-spacing-sm);
    background: var(--dm-background);
    border-radius: var(--dm-border-radius);
    color: var(--dm-text);
    font-family: var(--dm-font-mono);
    font-size: var(--dm-font-size-base);
    cursor: pointer;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }

  .dm-select__trigger:hover:not(:disabled) {
    border-color: var(--dm-primary);
  }

  .dm-select__trigger:disabled {
    background-color: var(--dm-background-disabled);
    color: var(--dm-text-disabled);
    cursor: not-allowed;
  }

  .dm-select__arrow {
    transition: transform 0.2s;
    font-size: 0.8em;
  }

  .dm-select__arrow--open {
    transform: rotate(180deg);
  }

  .dm-select__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--dm-background);
    border-radius: var(--dm-border-radius);
    margin-top: var(--dm-spacing-xs);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .dm-select__item {
    width: 100%;
    padding: var(--dm-spacing-sm);
    border: none;
    background: none;
    color: var(--dm-text);
    font-family: var(--dm-font-mono);
    font-size: var(--dm-font-size-base);
    cursor: pointer;
    text-align: left;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }

  .dm-select__item:hover {
    background: var(--dm-primary-extra-light);
    color: var(--dm-primary);
  }

  .dm-select__item--selected {
    background: var(--dm-primary-light);
    color: var(--dm-primary);
  }
</style>
