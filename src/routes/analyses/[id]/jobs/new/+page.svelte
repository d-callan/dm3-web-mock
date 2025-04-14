<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Expandable from '$lib/components/Expandable.svelte';
  import Form from '$lib/components/Form.svelte';
  import Select from '$lib/components/Select.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextBlock from '$lib/components/Text.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Help from '$lib/components/Help.svelte';
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
    if (!selectedMethod) {
      return; // Don't create a job if no method is selected
    }

    const jobId = addJob({
      analysisId,
      method: methods.find(method => method.id === selectedMethod)?.name || '',
      status: 'Not Started',
      configuration: JSON.stringify(data.configuration || {}),
      resultsUrl: '/analyses/view'
    });

    // Add the job ID to the analysis
    analyses.update(items => {
      return items.map(item => {
        if (item.id === analysisId) {
          return {
            ...item,
            jobIds: [...item.jobIds, jobId]
          };
        }
        return item;
      });
    });

    goto(`/app/analyses`);
  }

  let wasm = true;
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
          <div class="method-select">
            <Select
              label="Choose HyPhy Method"
              name="method"
              value={selectedMethod}
              options={methods.map(method => ({ value: method.id, label: method.name }))}
              on:change={handleMethodChange}
            />
            <Help text="Coming Soon" />
          </div>
          {#if selectedMethodDescription}
            <TextBlock variant="muted" size="sm">{selectedMethodDescription}</TextBlock>
          {/if}
          <Expandable title="Configuration">
            <div class="configuration">
              <div class="configuration-field">
                <TextBlock>Coming Soon!</TextBlock>
              </div>
            </div>
          </Expandable>
          <Toggle
            label="Use WebAssembly"
            description="Run HyPhy methods in the browser (rather than server)."
            name="wasm"
            bind:checked={wasm}
            labelPosition="right"
          />
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

  .method-select {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .actions {
    display: flex;
    gap: var(--dm-spacing-md);
    margin-top: var(--dm-spacing-lg);
  }


</style>
