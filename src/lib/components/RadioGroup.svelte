<script lang="ts">
  export let options: { value: string; label: string; disabled?: boolean }[];
  export let name: string;
  export let value: string;
</script>

<div class="dm-radio-group">
  {#each options as option}
    <div class="dm-radio-group__item">
      <label class="dm-radio">
        <input 
          type="radio" 
          {name}
          bind:group={value}
          value={option.value}
          class="dm-radio__input"
          disabled={option.disabled}
        />
        <span class="dm-radio__custom"></span>
        <span class="dm-radio__label">{option.label}</span>
      </label>

      <div 
        class="dm-radio-group__content" 
        class:dm-radio-group__content--disabled={value !== option.value}
      >
        <slot {option} selected={value === option.value} />
      </div>
    </div>
  {/each}
</div>

<style>
  .dm-radio-group__item {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .dm-radio-group__content {
    margin-left: 1.75rem;
  }

  .dm-radio-group__content--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
</style>
