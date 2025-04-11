<script lang="ts">
  export let items: { id: string; label: string }[] = [];
  export let activeId: string;
  export let variant: 'default' | 'underline' = 'default';

  function handleClick(id: string) {
    activeId = id;
  }
</script>

<div class="dm-tabs dm-tabs--{variant}">
  {#each items as item}
    <button
      class="dm-tabs__item"
      class:dm-tabs__item--active={activeId === item.id}
      on:click={() => handleClick(item.id)}
      role="tab"
      aria-selected={activeId === item.id}
      aria-controls="panel-{item.id}"
    >
      {item.label}
    </button>
  {/each}
</div>
