<script lang="ts">
  export let variant: 'default' | 'primary' | 'secondary' = 'default';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let wide = false;
  export let maxWidth: string | undefined = undefined;
  export let center = false;
  export let href: string | undefined = undefined;
</script>

<div class="button-wrapper {center ? 'button-wrapper--center' : ''}" style="{maxWidth ? `max-width: ${maxWidth}` : ''}">
  {#if href && !disabled}
    <a
      {href}
      class="button-inner dm-button dm-button--{variant} dm-button--{size} {wide ? 'dm-button--wide' : ''}"
      on:click
    >
      <slot />
    </a>
  {:else}
    <button
      {type}
      {disabled}
      class="button-inner dm-button dm-button--{variant} dm-button--{size} {wide ? 'dm-button--wide' : ''}"
      on:click
    >
      <slot />
    </button>
  {/if}
</div>

<style>
  .button-wrapper {
    display: inline-block;
    width: 100%;
  }

  .button-wrapper--center {
    text-align: center;
  }

  .button-inner {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  :global(.dm-button[disabled]) {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }
</style>


