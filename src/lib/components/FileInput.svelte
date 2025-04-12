<script lang="ts">
  export let accept = '*';
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
  <div class="dm-file-input__container">
    <input 
      type="file" 
      {accept}
      on:change={handleFileSelect}
    />
    {#if value}
      <span class="dm-file-input__text">{value.name}</span>
    {/if}
  </div>
  <button class="dm-button dm-button--primary dm-button--block" disabled={!value} on:click>
    {buttonText}
  </button>
</div>
