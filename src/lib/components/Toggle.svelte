<script lang="ts">
  export let label: string;
  export let description = '';
  export let checked = false;
  export let name = '';
  export let labelPosition: 'left' | 'right' = 'right';
  export let disabled = false;
</script>

<label class="dm-toggle" class:dm-toggle--label-right={labelPosition === 'right'}>
  {#if labelPosition === 'left'}
    <div class="dm-toggle__text">
      <span class="dm-toggle__label">{label}</span>
      {#if description}
        <span class="dm-toggle__description">{description}</span>
      {/if}
    </div>
  {/if}
  <input 
    type="checkbox" 
    class="dm-toggle__input" 
    bind:checked
    {name}
    {disabled}
    on:change
  />
  <span class="dm-toggle__slider"></span>
  {#if labelPosition === 'right'}
    <div class="dm-toggle__text">
      <span class="dm-toggle__label">{label}</span>
      {#if description}
        <span class="dm-toggle__description">{description}</span>
      {/if}
    </div>
  {/if}
</label>

<style>
  .dm-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 2px;
    transition: background-color 0.2s;
    image-rendering: pixelated;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
    width: fit-content;
  }

  .dm-toggle:hover {
    background-color: #f5f5f5;
  }

  .dm-toggle:not(.dm-toggle--label-right) {
    flex-direction: row-reverse;
  }

  .dm-toggle__text {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-xs);
  }

  .dm-toggle__label {
    font-family: var(--dm-font-mono);
    font-size: 18px;
    color: var(--dm-text);
  }

  .dm-toggle__description {
    font-family: var(--dm-font-mono);
    font-size: var(--dm-font-size-sm);
    color: var(--dm-text-muted);
  }

  .dm-toggle__input {
    display: none;
  }

  .dm-toggle__slider {
    position: relative;
    width: 48px;
    height: 24px;
    background-color: #e0e0e0;
    transition: 0.2s;
    border: 2px solid #1a0a24;
    box-shadow: 
      inset -2px -2px 0 rgba(0, 0, 0, 0.2),
      inset 2px 2px 0 rgba(255, 255, 255, 0.2);
    /* Pixelated border effect */
    clip-path: polygon(
      0 2px,
      2px 2px,
      2px 0,
      calc(100% - 2px) 0,
      calc(100% - 2px) 2px,
      100% 2px,
      100% calc(100% - 2px),
      calc(100% - 2px) calc(100% - 2px),
      calc(100% - 2px) 100%,
      2px 100%,
      2px calc(100% - 2px),
      0 calc(100% - 2px)
    );
    image-rendering: pixelated;
  }

  .dm-toggle__slider::before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.2s;
    border: 2px solid #1a0a24;
    box-shadow: 
      inset 2px 2px 0 rgba(255, 255, 255, 0.8),
      inset -2px -2px 0 rgba(0, 0, 0, 0.1);
    /* Pixelated border effect */
    clip-path: polygon(
      0 2px,
      2px 2px,
      2px 0,
      calc(100% - 2px) 0,
      calc(100% - 2px) 2px,
      100% 2px,
      100% calc(100% - 2px),
      calc(100% - 2px) calc(100% - 2px),
      calc(100% - 2px) 100%,
      2px 100%,
      2px calc(100% - 2px),
      0 calc(100% - 2px)
    );
    image-rendering: pixelated;
  }

  .dm-toggle__input:checked + .dm-toggle__slider {
    background-color: var(--dm-secondary);
    box-shadow: 
      inset -2px -2px 0 rgba(0, 0, 0, 0.3),
      inset 2px 2px 0 rgba(255, 255, 255, 0.2);
  }

  .dm-toggle__input:checked + .dm-toggle__slider::before {
    transform: translateX(26px);
    background-color: white;
    box-shadow: 
      inset 2px 2px 0 rgba(255, 255, 255, 0.8),
      inset -2px -2px 0 rgba(0, 0, 0, 0.1),
      0 0 8px rgba(252, 102, 1, 0.4);
    border-color: #331347;
    box-shadow: 
      inset 1px 1px 0px rgba(255, 255, 255, 0.4),
      1px 1px 2px rgba(0, 0, 0, 0.3);
  }
</style>
