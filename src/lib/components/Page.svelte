<script lang="ts">
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';

  export let title: string | undefined = undefined;
  export let breadcrumbs: Array<{ label: string; href?: string }> | undefined = undefined;
</script>

<div class="dm-app dm-pattern">
  <div class="dm-container dm-layout">
    <Header />
    <main class="dm-main">
      {#if breadcrumbs}
        <div class="dm-page-breadcrumbs">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      {/if}
      <div class="dm-page-header">
        {#if title}
          <h1 class="dm-page-title">{title}</h1>
        {/if}
        <slot name="header" />
      </div>
      <slot />
    </main>
    <Footer />
  </div>
</div>
