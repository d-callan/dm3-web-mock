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
  import { addAnalysis, addJobIdToAnalysis } from '$lib/stores/analyses';
  import { addJob as addJobToStore } from '$lib/stores/jobs';
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

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
        name: `Analysis ${data.analysisId}`,
        description: `Imported analysis with ID: ${data.analysisId}`,
        datasetId: data.analysisId,
        sourceType: 'imported_id'
      });
      goto(`${base}/analyses`);
    } else {
      // TODO: write functions to parse JSON files
      // In a real app, we would parse the JSON file here
      const analysisId = addAnalysis({
        name: 'Imported Analysis',
        description: 'Imported from HyPhy JSON file',
        datasetId: 'TODO: Parse from JSON',
        sourceType: 'imported_json'
      });

      // Create a completed job for this imported analysis
      const jobId = addJobToStore({
        analysisId,
        method: 'TODO: Parse from JSON',
        status: 'Done',
        configuration: 'TODO: Parse from JSON',
        resultsUrl: '/analyses/view'
      });
      addJobIdToAnalysis(analysisId, jobId);
      goto(`${base}/analyses`);
    }
  }

  function handleNewAnalysisSubmit(data: Record<string, any>) {
    // Handle new analysis submission
    addAnalysis({
      name: data.analysisName,
      description: data.description || '',
      datasetId: crypto.randomUUID(), // Temporary, should come from alignment file
      sourceType: 'new'
    });
    goto(`${base}/analyses`);
  }

  const importOptions = [
    { value: 'id', label: 'Enter Analysis ID' },
    { value: 'json', label: 'Upload HyPhy Results JSON' }
  ];
</script>

<Page 
  title="Start New Analysis"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "My Analyses", href: `${base}/analyses` },
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