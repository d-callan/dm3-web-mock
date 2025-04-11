<script lang="ts">
  export let spacing: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="dm-section__item dm-section__item--{spacing}">
  <slot />
</div>
