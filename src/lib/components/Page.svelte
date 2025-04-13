<script lang="ts">
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
</script>

<div class="dm-app dm-pattern">
  <div class="dm-container">
    <Header />
    <slot />
    <Footer />
  </div>
</div>
