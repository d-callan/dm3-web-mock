<script lang="ts">
  import { slide } from 'svelte/transition';
  export let value: string;
  export let options: string[];
  export let placeholder = 'Select an option';

  let isOpen = false;
  let dropdownEl: HTMLDivElement;

  function handleClickOutside(event: MouseEvent) {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  function toggle() {
    isOpen = !isOpen;
  }

  function select(option: string) {
    value = option;
    isOpen = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="dm-dropdown" bind:this={dropdownEl}>
  <button 
    class="dm-dropdown__trigger" 
    on:click|stopPropagation={toggle}
    on:keydown={handleKeyDown}
    type="button"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
  >
    {value || placeholder}
    <span class="dm-dropdown__arrow" class:dm-dropdown__arrow--open={isOpen}>▼</span>
  </button>
  {#if isOpen}
  <div 
    class="dm-dropdown__menu" 
    transition:slide 
    role="listbox"
    aria-label="Options"
  >
    {#each options as option}
      <button 
        class="dm-dropdown__item" 
        on:click={() => select(option)}
        role="option"
        aria-selected={value === option}
      >
        {option}
      </button>
    {/each}
  </div>
  {/if}
</div>
