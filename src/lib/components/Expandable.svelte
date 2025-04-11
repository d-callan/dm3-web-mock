<script lang="ts">
  export let title: string;
  export let defaultOpen = false;

  let isOpen = defaultOpen;

  function toggle() {
    isOpen = !isOpen;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  }
</script>

<div class="dm-expandable" class:dm-expandable--open={isOpen}>
  <div class="dm-expandable__header" on:click={toggle} on:keydown={handleKeyDown} role="button" tabindex="0">
    <div class="dm-expandable__title">{title}</div>
    <div class="dm-expandable__icon">▼</div>
  </div>
  <div class="dm-expandable__content">
    <slot />
  </div>
</div>
