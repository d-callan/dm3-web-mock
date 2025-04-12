<script lang="ts">
  export let variant: 'default' | 'primary' | 'secondary' = 'default';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let wide = false;
</script>

<button 
  {type}
  {disabled}
  class="dm-button dm-button--{variant} dm-button--{size} {wide ? 'dm-button--wide' : ''}"
  on:click
>
  <slot />
</button>
