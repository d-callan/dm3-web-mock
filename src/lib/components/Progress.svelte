<script lang="ts">
  export let value = 0;
  export let max = 100;
  
  $: percentage = Math.min(100, Math.max(0, (value / max) * 100));
</script>

<div class="dm-progress" role="progressbar" aria-valuenow={value} aria-valuemin="0" aria-valuemax={max}>
  <div class="dm-progress__fill" style="width: {percentage}%"></div>
</div>
