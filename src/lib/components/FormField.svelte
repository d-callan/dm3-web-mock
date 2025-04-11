<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let name: string;
  export let label: string;
  export let type: 'text' | 'password' | 'email' | 'textarea' | 'number' = 'text';
  export let value = '';
  export let placeholder = '';
  export let required = false;
  export let rows = 3;
  export let monospace = false;

  const { formData } = getContext('form') as { formData: Writable<Record<string, any>> };

  $: $formData[name] = value;
</script>

<label class="dm-form__field">
  <span class="dm-form__label">{label}</span>
  {#if type === 'textarea'}
    <textarea
      {name}
      class="dm-form__input {monospace ? 'dm-text-mono' : ''}"
      bind:value
      {placeholder}
      {required}
      {rows}
    ></textarea>
  {:else}
    <input
      {type}
      {name}
      class="dm-form__input {monospace ? 'dm-text-mono' : ''}"
      bind:value
      {placeholder}
      {required}
    />
  {/if}
</label>
