<script lang="ts">
  export let variant: 'default' | 'primary' | 'secondary' | 'link' | 'icon' | 'glyph' = 'default';
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let wide = false;
  export let maxWidth: string | undefined = undefined;
  export let center = false;
  export let href: string | undefined = undefined;
  export let icon: string | undefined = undefined; // For icon variant, specify the icon class (e.g., 'fas fa-trash-alt')
  export let title: string | undefined = undefined; // For tooltip/accessibility
  export let inline = false; // If true, button will be displayed inline without full width
</script>

<div class="button-wrapper {center ? 'button-wrapper--center' : ''} {inline ? 'button-wrapper--inline' : ''}" style="{maxWidth ? `max-width: ${maxWidth}` : ''}">
  {#if href}
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled}
      class="button-inner dm-button dm-button--{variant} dm-button--{size} {wide ? 'dm-button--wide' : ''} {inline ? 'dm-button--inline' : ''} {disabled ? 'dm-button--disabled' : ''}"
      on:click={disabled ? (e) => e.preventDefault() : undefined}
      {title}
    >
      {#if icon && (variant === 'icon' || variant === 'glyph')}
        <i class="{icon}" aria-hidden="true"></i>
        <span class="sr-only"><slot /></span>
      {:else}
        <slot />
      {/if}
    </a>
  {:else}
    <button
      {type}
      {disabled}
      class="button-inner dm-button dm-button--{variant} dm-button--{size} {wide ? 'dm-button--wide' : ''} {inline ? 'dm-button--inline' : ''}"
      on:click
      {title}
    >
      {#if icon && (variant === 'icon' || variant === 'glyph')}
        <i class="{icon}" aria-hidden="true"></i>
        <span class="sr-only"><slot /></span>
      {:else}
        <slot />
      {/if}
    </button>
  {/if}
</div>

<style>
  .button-wrapper {
    display: block;
    width: 100%;
    margin-bottom: var(--dm-spacing-md);
  }

  .button-wrapper--center {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  
  .button-wrapper--inline {
    width: auto;
    display: inline-flex;
    margin-bottom: 0;
  }

  .button-inner {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  
  /* Hero section button styles */
  :global(.dm-hero .button-wrapper) {
    margin-bottom: 0;
    width: auto;
  }
  
  :global(.dm-hero .button-inner) {
    width: auto;
  }

  /* Base button styles */
  :global(.dm-button) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--dm-spacing-sm) var(--dm-spacing-md);
    border-radius: var(--dm-border-radius);
    border: var(--dm-border-width) solid var(--dm-secondary-dark);
    background-color: var(--dm-secondary);
    color: white;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: normal;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    font-family: inherit;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.2),
      2px 2px 0px var(--dm-secondary-dark);
  }

  :global(.dm-button:hover:not(:disabled)) {
    transform: translateY(1px);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.2),
      1px 1px 0px var(--dm-secondary-dark);
  }

  :global(.dm-button:disabled),
  :global(.dm-button--disabled) {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Primary button */
  :global(.dm-button--primary) {
    background-color: var(--dm-secondary);
    color: white;
    border: 2px solid var(--dm-secondary-dark);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.2),
      2px 2px 0px var(--dm-secondary-dark);
    font-weight: normal;
  }

  :global(.dm-button--primary:hover:not(:disabled)) {
    color: var(--dm-primary-dark);
    border: 2px solid var(--dm-primary-dark);
    transform: translateY(1px);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.2),
      1px 1px 0px var(--dm-secondary-dark);
  }

  /* Secondary button */
  :global(.dm-button--secondary) {
    background-color: var(--dm-primary);
    color: white;
    border: 2px solid rgba(255, 255, 255, .3);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.1),
      2px 2px 0px rgba(0, 0, 0, 0.2);
  }

  :global(.dm-button--secondary:hover:not(:disabled)) {
    background-color: var(--dm-secondary-dark);
    color: white;
    border-color: var(--dm-secondary-dark);
    transform: translateY(1px);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.1),
      1px 1px 0px rgba(0, 0, 0, 0.2);
  }

  /* Link style button */
  :global(.dm-button--link) {
    background: none;
    border: none;
    padding: 0;
    color: var(--dm-primary, #007bff);
    font-weight: normal;
    text-decoration: underline;
    cursor: pointer;
    box-shadow: none;
    min-height: unset;
  }

  :global(.dm-button--link:hover) {
    color: var(--dm-primary-dark, #0056b3);
    background: none;
    text-decoration: underline;
    box-shadow: none;
  }

  /* Icon style button */
  :global(.dm-button--icon) {
    background: none;
    border: none;
    padding: 0.25rem;
    color: var(--dm-text, #333);
    cursor: pointer;
    box-shadow: none;
    min-height: unset;
    min-width: unset;
    width: auto;
  }

  :global(.dm-button--icon:hover) {
    color: var(--dm-primary, #007bff);
    background: none;
    box-shadow: none;
  }

  /* Glyph style button */
  :global(.dm-button--glyph) {
    background: none;
    border: none;
    padding: 0.5rem;
    color: var(--dm-text, #333);
    cursor: pointer;
    box-shadow: none;
    min-height: unset;
    min-width: unset;
    width: auto;
    transition: transform 0.2s ease;
  }

  :global(.dm-button--glyph:hover) {
    color: var(--dm-primary, #007bff);
    background: none;
    box-shadow: none;
    transform: scale(1.1);
  }

  /* Size variants */
  :global(.dm-button--sm) {
    font-size: 0.875rem !important;
    font-weight: 400;
  }

  :global(.dm-button--md) {
    font-size: 1rem !important;
    font-weight: 500;
  }

  :global(.dm-button--lg) {
    font-size: 1.25rem !important;
    font-weight: 500;
  }

  :global(.dm-button--xl) {
    font-size: 1.5rem !important;
    min-width: 200px;
    font-weight: 500;
  }

  /* Width variant */
  :global(.dm-button--wide) {
    width: 100%;
    margin: var(--dm-spacing-md) auto;
  }
  
  /* Inline variant */
  :global(.dm-button--inline) {
    border: none;
    background: transparent;
    box-shadow: none;
    padding: 0;
    color: var(--dm-primary);
    text-transform: none;
    letter-spacing: normal;
  }
  
  :global(.dm-button--inline:hover:not(:disabled)) {
    border: none;
    background: transparent;
    box-shadow: none;
    text-decoration: underline;
    transform: none;
  }

  /* Header button styles */
  :global(.dm-header .dm-button) {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1.25rem;
    font-size: 22px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.15),
      1px 1px 0px rgba(0, 0, 0, 0.2);
  }

  :global(.dm-header .dm-button:hover:not(:disabled)) {
    background-color: var(--dm-secondary);
    border-color: var(--dm-secondary);
    color: white;
    transform: translateY(1px);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.15),
      0px 0px 0px rgba(0, 0, 0, 0.2);
  }

  /* Active state */
  :global(.dm-button:active) {
    transform: translateY(2px);
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.2),
      0px 0px 0px var(--dm-secondary-dark);
  }

  /* Screen reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>


