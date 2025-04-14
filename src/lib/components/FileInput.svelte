<script lang="ts">
  export let accept = '*';
  export let buttonText = 'Upload';
  export let value: File | null = null;
  export let disabled = false;
  export let showButton = true;
  export let label = '';
  export let required = false;
  export let labelPosition: 'above' | 'inline' = 'above';

  $: displayLabel = required ? `${label}*` : label;

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      value = input.files[0];
    }
  }
</script>

<label class="dm-file-input" class:dm-file-input--inline={labelPosition === 'inline'}>
  {#if label}
    <span class="dm-form__label">{displayLabel}</span>
  {/if}
  <div class="dm-file-input__container">
    <input 
      type="file" 
      {accept}
      {disabled}
      on:change={handleFileSelect}
    />
    {#if value}
      <span class="dm-file-input__text">{value.name}</span>
    {/if}
  </div>
  {#if showButton}
    <button class="dm-button dm-button--primary dm-button--block" disabled={!value} on:click>
      {buttonText}
    </button>
  {/if}
</label>

<style>
  .dm-file-input {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dm-file-input--inline {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .dm-file-input--inline .dm-form__label {
    flex: 0 0 auto;
    min-width: 100px;
  }

  .dm-file-input__container {
    flex: 1;
  }

  .dm-file-input__text {
    margin-left: 0.5rem;
    color: var(--dm-color-text-secondary);
  }
</style>
