<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Expandable from '$lib/components/Expandable.svelte';
  import Form from '$lib/components/Form.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import Select from '$lib/components/Select.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import TextBlock from '$lib/components/Text.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import Range from '$lib/components/Range.svelte';
  import Help from '$lib/components/Help.svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { analyses } from '$lib/stores/analyses';
  import { addJob } from '$lib/stores/jobs';
  import { methods } from '$lib/data/methods';
  import { methodParameters } from '$lib/data/methodParameters';
  import type { ParameterDefinition } from '$lib/data/methodParameters';
  import { base } from '$app/paths';

  // Get the analysis ID from the URL
  const analysisId = $page.params.id;
  
  // Get the analysis details
  $: analysis = $analyses.find(a => a.id === analysisId);

  // Track selected method
  let selectedMethod = '';
  let selectedParams: Record<string, ParameterDefinition> = {};
  let paramValues: Record<string, any> = {};
  $: selectedMethodDescription = methods.find(method => method.id === selectedMethod)?.description;
  $: selectedParams = selectedMethod ? methodParameters[selectedMethod] || {} : {};
  
  // Initialize parameter values when method changes
  $: if (selectedMethod) {
    paramValues = {};
    // Set default values for parameters
    Object.entries(selectedParams).forEach(([key, param]) => {
      // Skip alignment and tree parameters
      if (key === 'alignment' || key === 'tree') return;
      
      // Set default value based on parameter type
      if (param.default !== undefined) {
        paramValues[key] = param.default;
      } else if (param.type === 'enum' && param.enum && param.enum.length > 0) {
        paramValues[key] = param.enum[0];
      } else if (param.type === 'number') {
        paramValues[key] = 0;
      } else if (param.type === 'boolean') {
        paramValues[key] = false;
      } else {
        paramValues[key] = '';
      }
    });
  }

  function handleMethodChange(event: CustomEvent<string>) {
    selectedMethod = event.detail;
  }

  function handleSubmit(data: Record<string, any>) {
    if (!selectedMethod) {
      return; // Don't create a job if no method is selected
    }
    
    // Combine form data with parameter values
    const configuration = {
      ...paramValues,
      wasm: data.wasm
    };

    const jobId = addJob({
      analysisId,
      method: methods.find(method => method.id === selectedMethod)?.name || '',
      status: 'Not Started',
      configuration: JSON.stringify(configuration),
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

    goto(`${base}/analyses`);
  }

  let wasm = true;
</script>

<Page 
  title="Add Job"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses", href: `${base}/analyses` },
    { label: analysis?.name || "Analysis", href: undefined },
    { label: "New Job", href: `${base}/analyses/${analysisId}/jobs/new` }
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
              {#if Object.keys(selectedParams).length > 0}
                <div class="parameters-list">
                  <TextBlock size="md" variant="default">Method Parameters</TextBlock>
                  
                  {#each Object.entries(selectedParams) as [key, param]}
                    <!-- Skip alignment and tree parameters -->
                    {#if key !== 'alignment' && key !== 'tree'}
                      <div class="parameter-item">
                        <!-- Parameter name and description -->
                        <div class="parameter-header">
                          <TextBlock size="sm" variant="default"><strong>{param.name}</strong></TextBlock>
                          <TextBlock size="sm" variant="muted">{param.description}</TextBlock>
                        </div>
                        
                        <!-- Parameter input based on type -->
                        <div class="parameter-input">
                          {#if param.type === 'enum' && param.enum}
                            <Select
                              label=""
                              name={key}
                              value={paramValues[key]}
                              options={param.enum.map(value => ({ value, label: value }))}
                              on:change={(e) => paramValues[key] = e.detail}
                            />
                          {:else if param.type === 'boolean'}
                            <Toggle
                              label={param.name}
                              name={key}
                              bind:checked={paramValues[key]}
                              labelPosition="right"
                            />
                          {:else if param.type === 'number'}
                            <Range
                              name={key}
                              bind:value={paramValues[key]}
                              min={0}
                              max={param.name.includes('significance') ? 1 : 
                                  param.name.includes('samples') || param.name.includes('grid') ? 1000 : 100}
                              step={param.name.includes('significance') ? 0.01 : 1}
                              showMinMax={true}
                            />
                          {:else}
                            <FormField
                              label=""
                              name={key}
                              type="text"
                              bind:value={paramValues[key]}
                              placeholder={param.default !== undefined ? param.default.toString() : ''}
                            />
                          {/if}
                        </div>
                      </div>
                    {/if}
                  {/each}
                </div>
              {:else if selectedMethod}
                <div class="configuration-field">
                  <TextBlock>No parameters available for {methods.find(m => m.id === selectedMethod)?.name}.</TextBlock>
                </div>
              {:else}
                <div class="configuration-field">
                  <TextBlock>Select a method to view available parameters.</TextBlock>
                </div>
              {/if}
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

  .configuration {
    padding: var(--dm-spacing-md);
  }

  .parameters-list {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-md);
  }

  .parameter-item {
    padding: var(--dm-spacing-sm);
    border-left: 2px solid var(--dm-primary-light);
    padding-left: var(--dm-spacing-md);
    margin-bottom: var(--dm-spacing-lg);
  }
  
  .parameter-header {
    margin-bottom: var(--dm-spacing-sm);
  }
  
  .parameter-input {
    margin-top: var(--dm-spacing-sm);
  }

  .actions {
    display: flex;
    gap: var(--dm-spacing-md);
    margin-top: var(--dm-spacing-lg);
    justify-content: flex-end;
  }
</style>
