<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Text from '$lib/components/Text.svelte';
  import Card from '$lib/components/Card.svelte';
  import Button from '$lib/components/Button.svelte';
  import RadioGroup from '$lib/components/RadioGroup.svelte';
  import Form from '$lib/components/Form.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import FileInput from '$lib/components/FileInput.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  import { goto } from '$app/navigation';
  import { addAnalysis } from '$lib/stores/analyses';
  import { onMount } from 'svelte';

  let activeSection = 'import';

  const sections = [
    { id: 'import', title: 'Import Analysis' },
    { id: 'new', title: 'New Analysis' }
  ];

  // Import previous analysis
  let selectedImportMethod = 'id';
  let analysisId = '';
  let jsonFile: File | null = null;

  // Upload new dataset
  let analysisName = '';
  let description = '';
  let alignmentFile: File | null = null;
  let treeFile: File | null = null;

  function updateActiveSection() {
    const scrollY = window.scrollY;
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) { // Adjust threshold as needed
          activeSection = section.id;
        }
      }
    }
  }

  onMount(() => {
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  });

  function handleImportSubmit(data: Record<string, any>) {
    if (selectedImportMethod === 'id') {
      // Handle analysis ID submission
      // TODO: an api call, to an endpoint that doesnt yet exist
      addAnalysis({
        method: 'Import by ID',
        configuration: `ID: ${data.analysisId}`,
        status: 'Done',
        resultsUrl: '/analyses/view'
      });
      goto('/app/analyses');
    } else {
      // TODO: write functions to parse JSON files
      // In a real app, we would parse the JSON file here
      addAnalysis({
        method: 'Import from JSON',
        configuration: 'TODO: Parse from JSON',
        status: 'Done',
        resultsUrl: '/analyses/view'
      });
      goto('/app/analyses');
    }
  }

  function handleNewAnalysisSubmit(data: Record<string, any>) {
    // Handle new analysis submission
    addAnalysis({
      method: 'New Analysis',
      configuration: `Name: ${data.analysisName}\nDescription: ${data.description || 'None'}`,
      status: 'Processing',
      resultsUrl: '/analyses/view'
    });
    goto('/app/analyses');
  }

  const importOptions = [
    { value: 'id', label: 'Enter Analysis ID' },
    { value: 'json', label: 'Upload HyPhy Results JSON' }
  ];
</script>

<Page 
  title="Start New Analysis"
  breadcrumbs={[
    { label: "Home", href: "/app" },
    { label: "My Analyses", href: "/app/analyses" },
    { label: "Start New Analysis" }
  ]}>

  <div class="page-layout">
    <aside class="page-layout__sidebar">
      <TableOfContents {sections} {activeSection} />
    </aside>

    <div class="page-layout__content">
      <div id="import" class="analysis-section">
        <Card title="Import previous analysis">
          <Form onSubmit={handleImportSubmit}>
            <div class="import-options">
              <RadioGroup
                name="import-method"
                bind:value={selectedImportMethod}
                options={[
                  { value: 'id', label: 'Enter Analysis ID' },
                  { value: 'json', label: 'Upload HyPhy Results JSON' }
                ]}
              >
                <svelte:fragment let:option let:selected>
                  {#if option.value === 'id'}
                    <FormField
                      name="analysisId"
                      label=""
                      bind:value={analysisId}
                      placeholder="Enter analysis ID"
                      required={selectedImportMethod === 'id'}
                      disabled={!selected}
                    />
                  {:else if option.value === 'json'}
                    <FileInput
                      accept=".json"
                      bind:value={jsonFile}
                      disabled={!selected}
                      showButton={false}
                      required={selectedImportMethod === 'json'}
                    />
                  {/if}
                </svelte:fragment>
              </RadioGroup>

              <Button 
                variant="primary"
                type="submit"
                disabled={selectedImportMethod === 'id' ? !analysisId : !jsonFile}
              >
                Import Analysis
              </Button>
            </div>
          </Form>
        </Card>

        <br>
        <div class="divider">
          <Text size="xl" weight="bold" align="center">-- OR --</Text>
        </div>
        <br>

        <div id="new" class="analysis-section">
          <Card title="Upload new dataset">
            <Form onSubmit={handleNewAnalysisSubmit}>
              <div class="form-fields">
                <FormField
                  name="analysisName"
                  label="Analysis Name"
                  bind:value={analysisName}
                  placeholder="Enter a name for your analysis"
                  required
                />

                <FormField
                  name="description"
                  label="Description"
                  type="textarea"
                  bind:value={description}
                  placeholder="Enter a description for your analysis"
                  rows={4}
                />

                <FileInput
                  label="Alignment"
                  accept=".fasta,.fas,.fa,.aln"
                  buttonText="Select Alignment File"
                  bind:value={alignmentFile}
                  showButton={false}
                  required
                  labelPosition="above"
                />

                <FileInput
                  label="Tree"
                  accept=".nwk,.tree"
                  buttonText="Select Tree File"
                  bind:value={treeFile}
                  showButton={false}
                  labelPosition="above"
                />

                <Button 
                  variant="primary"
                  type="submit"
                  disabled={!analysisName || !alignmentFile}
                >
                  Create Analysis
                </Button>

                <Text size="sm" align="center" variant="muted">If no name/description is provided default labels like 'Unnamed Analysis 1' will be used.</Text>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  </div>
</Page>

<style>
  .page-layout {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--dm-spacing-xl);
    align-items: start;
  }

  .page-layout__sidebar {
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: auto;
    padding: var(--dm-spacing-lg) 0;
  }

  .page-layout__content {
    max-width: 800px;
  }

  .analysis-section {
    margin-bottom: var(--dm-spacing-xl);
  }

  .form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-lg);
  }

  .import-options {
    display: flex;
    flex-direction: column;
    gap: var(--dm-spacing-lg);
  }



</style>