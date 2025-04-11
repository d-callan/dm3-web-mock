<script lang="ts">
  export let options: { value: string; label: string }[];
  export let name: string;
  export let value: string;
</script>

<div class="dm-radio-group">
  {#each options as option}
    <label class="dm-radio">
      <input 
        type="radio" 
        {name}
        bind:group={value}
        value={option.value}
        class="dm-radio__input"
      />
      <span class="dm-radio__custom"></span>
      <span class="dm-radio__label">{option.label}</span>
    </label>
  {/each}
</div>
