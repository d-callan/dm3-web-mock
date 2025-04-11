<script lang="ts">
  import Expandable from './Expandable.svelte';
  
  export let title: string;
  export let defaultOpen = true;
</script>

<div class="dm-form__group">
  <Expandable {title} {defaultOpen}>
    <slot />
  </Expandable>
</div>
