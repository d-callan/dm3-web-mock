<script lang="ts">
  export let href: string;
  export let variant: 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' = 'default';
  export let external = false;
  export let underline: 'always' | 'hover' | 'none' = 'hover';
  export let disabled = false;
  export let icon: string | undefined = undefined;
  export let iconPosition: 'start' | 'end' = 'end';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  // Handle external links
  $: target = external ? '_blank' : undefined;
  $: rel = external ? 'noopener noreferrer' : undefined;

  function handleClick(e: MouseEvent) {
    if (disabled) {
      e.preventDefault();
    }
  }
</script>

<a
  {href}
  class="dm-link dm-link--{variant} dm-link--{size} dm-link--underline-{underline}"
  class:dm-link--disabled={disabled}
  {target}
  {rel}
  on:click={handleClick}
  {...$$restProps}
>
  {#if icon && iconPosition === 'start'}
    <span class="dm-link__icon">{icon}</span>
  {/if}
  
  <span class="dm-link__content">
    <slot />
  </span>
  
  {#if icon && iconPosition === 'end'}
    <span class="dm-link__icon">{icon}</span>
  {/if}
  
  {#if external}
    <span class="dm-link__external" aria-hidden="true">↗</span>
  {/if}
</a>
