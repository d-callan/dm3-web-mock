<script lang="ts">
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let onSubmit: (data: Record<string, any>) => void;
  export let spacing: 'sm' | 'md' | 'lg' = 'md';

  const formData = writable<Record<string, any>>({});
  setContext('form', { formData });

  function handleSubmit(event: Event) {
    event.preventDefault();
    onSubmit($formData);
  }
</script>

<form class="dm-form dm-form--{spacing}" on:submit={handleSubmit}>
  <slot />
</form>
