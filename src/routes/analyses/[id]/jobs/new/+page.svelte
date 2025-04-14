<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Form from '$lib/components/Form.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextBlock from '$lib/components/Text.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { analyses } from '$lib/stores/analyses';
  import { addJob } from '$lib/stores/jobs';
  import { methods } from '$lib/data/methods';

  // Get the analysis ID from the URL
  const analysisId = $page.params.id;
  
  // Get the analysis details
  $: analysis = $analyses.find(a => a.id === analysisId);

  // Track selected method
  let selectedMethod = '';
  $: selectedMethodDescription = methods.find(method => method.id === selectedMethod)?.description;

  function handleMethodChange(event: CustomEvent<string>) {
    selectedMethod = event.detail;
  }

  function handleSubmit(data: Record<string, any>) {
    const jobId = addJob({
      analysisId,
      method: data.method,
      status: 'Not Started',
      configuration: JSON.stringify(data.configuration || {}),
      resultsUrl: '/analyses/view'
    });

    goto(`/app/analyses`);
  }
</script>

<Page 
  title="Add Job"
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "My Analyses", href: "/app/analyses" },
    { label: analysis?.name || "Analysis", href: undefined },
    { label: "New Job", href: `/app/analyses/${analysisId}/jobs/new` }
  ]}
>
  <div class="container">
    <Card title="Add Job">
      {#if analysis}
        <Form onSubmit={handleSubmit}>
          <Dropdown
            label="Choose HyPhy Method"
            name="method"
            value={selectedMethod}
            options={methods.map(method => ({ value: method.id, label: method.name }))}
            on:change={handleMethodChange}
          />
          {#if selectedMethodDescription}
            <TextBlock variant="muted" size="sm">{selectedMethodDescription}</TextBlock>
          {/if}
          <div class="actions">
            <Button type="submit" variant="primary">Start Job</Button>
          </div>
        </Form>
      {:else}
        <p>Analysis not found.</p>
      {/if}
    </Card>
  </div>
</Page>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  .actions {
    display: flex;
    gap: var(--dm-spacing-md);
    margin-top: var(--dm-spacing-lg);
  }


</style>
