<script lang="ts">
  export let accept = '*';
  export let label = 'Choose a file';
  export let buttonText = 'Upload';
  export let value: File | null = null;

  function handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      value = input.files[0];
    }
  }
</script>

<div class="dm-file-input">
  <label class="dm-file-input__label">
    <input 
      type="file" 
      class="dm-file-input__input" 
      {accept}
      on:change={handleFileSelect}
    />
    <span class="dm-file-input__text">{value ? value.name : label}</span>
  </label>
  <button class="dm-button dm-button--wide" disabled={!value} on:click>
    {buttonText}
  </button>
</div>
