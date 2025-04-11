<script lang="ts">
  export let label: string;
  export let checked = false;
  export let name = '';
</script>

<label class="dm-toggle">
  <span class="dm-toggle__label">{label}</span>
  <input 
    type="checkbox" 
    class="dm-toggle__input" 
    bind:checked
    {name}
    on:change
  />
  <span class="dm-toggle__slider"></span>
</label>
