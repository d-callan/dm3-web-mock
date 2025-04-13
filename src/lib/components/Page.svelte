<script lang="ts">
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  export let title: string | undefined = undefined;
</script>

<div class="dm-app dm-pattern">
  <div class="dm-container">
    <Header />
    <main class="dm-main">
      {#if title}
        <h1 class="dm-page-title">{title}</h1>
      {/if}
      <slot />
    </main>
    <Footer />
  </div>
</div>
