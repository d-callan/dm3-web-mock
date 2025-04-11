<script lang="ts">
  export let compact = false;
  export let hover = true;
  export let striped = false;
  export let bordered = false;
</script>

<div class="dm-table__container">
  <table class="dm-table {compact ? 'dm-table--compact' : ''} {hover ? 'dm-table--hover' : ''} {striped ? 'dm-table--striped' : ''} {bordered ? 'dm-table--bordered' : ''}">
    <slot />
  </table>
</div>
