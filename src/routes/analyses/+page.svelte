<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Button from '$lib/components/Button.svelte';
  import Text from '$lib/components/Text.svelte';
</script>

<Page 
  title="My Analyses"
  breadcrumbs={[
    { label: "Home", href: "/app" },
    { label: "My Analyses" }
  ]}>
  <div slot="header">
    <Button href="/app/analyses/new" variant="primary" size="lg" maxWidth="160px">Start New Analysis</Button>
  </div>

  <br>
  <br>

  <div class="dm-section">
    <div class="dm-placeholder">
      <Text variant="muted" align="center">Your analyses will appear here</Text>
    </div>
  </div>
</Page>
