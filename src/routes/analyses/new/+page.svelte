<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Text from '$lib/components/Text.svelte';
</script>

<Page 
  title="Start New Analysis"
  breadcrumbs={[
    { label: "Home", href: "/app" },
    { label: "My Analyses", href: "/app/analyses" },
    { label: "Start New Analysis" }
  ]}>

  <section>
    <Text>Coming Soon!</Text>
    <Text>This page is currently under construction.</Text>
  </section>
</Page>