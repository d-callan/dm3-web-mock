<script lang="ts">
  export let type: 'bullet' | 'number' | 'check' | 'none' = 'bullet';
  export let spacing: 'sm' | 'md' | 'lg' = 'md';
  export let compact = false;
</script>

<ul class="dm-list dm-list--{type} dm-list--{spacing} {compact ? 'dm-list--compact' : ''}">
  <slot />
</ul>
