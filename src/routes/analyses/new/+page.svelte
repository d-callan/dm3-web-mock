<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  
  // Components
  import Page from '$lib/components/Page.svelte';
  import Card from '$lib/components/Card.svelte';
  import Form from '$lib/components/Form.svelte';
  import Button from '$lib/components/Button.svelte';
  import Text from '$lib/components/Text.svelte';
  import FileInput from '$lib/components/FileInput.svelte';
  import Select from '$lib/components/Select.svelte';
  import RadioGroup from '$lib/components/RadioGroup.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import DataReaderResults from '$lib/components/DataReaderResults.svelte';
  import TableOfContents from '$lib/components/TableOfContents.svelte';
  
  // Stores and utilities
  import { addAnalysis, addJobIdToAnalysis } from '$lib/stores/analyses';
  import { addJob as addJobToStore, jobs } from '$lib/stores/jobs';
  import type { Job } from '$lib/stores/jobs';
  import { methods } from '$lib/data/methods';
  import { initHyPhy, validateAlignment } from '$lib/utils/hyphy-aioli';
  import { hyphyAioliStore } from '$lib/stores/hyphy-aioli';

  let activeSection = 'import';

  const sections = [
    { id: 'import', title: 'Import Analysis' },
    { id: 'new', title: 'New Analysis' }
  ];

  // Import previous analysis
  let selectedImportMethod = 'json'; // Default to JSON upload instead of ID
  let analysisId = '';
  let selectedMethod = '';
  let file: File | null = null;
  let fileContents: string | null = null;

  // Upload new dataset
  let analysisName = '';
  let description = '';
  let alignmentFile: File | null = null;
  let alignmentContent: string | null = null;
  let treeFile: File | null = null;
  let treeContent: string | null = null;
  let validationData: string | null = null;
  let validating = false;
  let validationError: string | null = null;
  let showValidationModal = false;

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

  // Watch for changes in the file value
  $: if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        fileContents = result;
      }
    };
    reader.readAsText(file);
  } else {
    fileContents = null;
  }
  
  // Watch for changes in the alignment file
  $: if (alignmentFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        alignmentContent = result;
        // Reset validation data when a new file is uploaded
        validationData = null;
        validationError = null;
        // Auto-validate the alignment when a file is uploaded
        validating = true;
        validateAlignment(result).then(data => {
          validationData = data;
          validating = false;
        }).catch(error => {
          validationError = error instanceof Error ? error.message : 'Unknown error during validation';
          validating = false;
        });
      }
    };
    reader.readAsText(alignmentFile);
  } else {
    alignmentContent = null;
    validationData = null;
    validationError = null;
  }
  
  // Watch for changes in the tree file
  $: if (treeFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        treeContent = result;
      }
    };
    reader.readAsText(treeFile);
  } else {
    treeContent = null;
  }

  function handleImportSubmit(data: Record<string, any>) {
    // Only handle JSON upload for now
    // The ID option is disabled in the UI
    if (selectedImportMethod === 'id') {
      // Handle analysis ID submission
      // TODO: an api call, to an endpoint that doesnt yet exist
      //addAnalysis({
      //  name: `Analysis ${data.analysisId}`,
      //  description: `Imported analysis with ID: ${data.analysisId}`,
      //  sourceType: 'imported_id'
      //});
      //goto(`${base}/analyses`);
      console.log('Analysis ID import is not supported yet');
      return;
    } else {
      // Handle JSON file upload
      const analysisId = addAnalysis({
        name: 'Imported Analysis',
        description: 'Imported from HyPhy JSON file',
        sourceType: 'imported_json'
      });

      // Create a completed job with temporary values
      const jobId = addJobToStore({
        analysisId,
        method: methods.find(m => m.id === selectedMethod)?.name || 'Unknown Method',
        status: 'Done',
        configuration: 'TODO: Parse from JSON',
        resultsUrl: '', // Will update this after getting the jobId
        resultsData: null // Will update this with file contents
      });

      // Update the job with the correct resultsUrl and resultsData
      jobs.update((items: Job[]) => {
        return items.map((item: Job) => {
          if (item.id === jobId) {
            return {
              ...item,
              resultsUrl: `${base}/analyses/${analysisId}/jobs/${jobId}/result`,
              resultsData: fileContents // This should be the JSON string from the file upload
            };
          }
          return item;
        });
      });

      addJobIdToAnalysis(analysisId, jobId);
      goto(`${base}/analyses`);
    }
  }

  // Initialize HyPhy on mount
  onMount(() => {
    initHyPhy().catch(error => {
      console.error('Failed to initialize HyPhy:', error);
    });
  });

  // Subscribe to HyPhy store to track loading state and errors
  $: ({ loading: hyphyLoading, error: hyphyError } = $hyphyAioliStore);

  async function handleNewAnalysisSubmit(data: Record<string, any>) {
    // Handle new analysis submission
    if (!alignmentContent) {
      console.error('No alignment content available');
      return;
    }
    
    try {
      // Validate the alignment if not already validated
      if (!validationData) {
        validating = true;
        validationData = await validateAlignment(alignmentContent);
        validating = false;
      }
      
      // Add the analysis with the alignment data and validation results
      addAnalysis({
        name: data.analysisName,
        description: data.description || '',
        alignmentData: alignmentContent || undefined, // Convert null to undefined
        treeData: treeContent || undefined, // Convert null to undefined
        validationData: validationData || undefined, // Add validation data
        sourceType: 'new'
      });
      
      console.log('Created new analysis with alignment data, length:', alignmentContent.length);
      goto(`${base}/analyses`);
    } catch (error) {
      console.error('Failed to create analysis:', error);
      validationError = error instanceof Error ? error.message : 'Unknown error creating analysis';
    }
  }

  // Function to open the validation modal
  function openValidationModal() {
    if (validationData) {
      showValidationModal = true;
    }
  }

  // Function to close the validation modal
  function closeValidationModal() {
    showValidationModal = false;
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
                  { value: 'id', label: 'Enter Analysis ID (Coming Soon)', disabled: true },
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
                    <div class="json-upload">
                      <Select
                        name="method-select"
                        label="HyPhy Method"
                        bind:value={selectedMethod}
                        options={methods.map(m => ({
                          value: m.id,
                          label: m.name
                        }))}
                        disabled={!selected}
                      />
                      <FileInput
                        accept=".json"
                        bind:value={file}
                        disabled={!selected}
                        showButton={false}
                        required={selectedImportMethod === 'json'}
                      />
                    </div>
                  {/if}
                </svelte:fragment>
              </RadioGroup>

              <Button 
                variant="primary"
                type="submit"
                disabled={selectedImportMethod === 'id' ? !analysisId : !fileContents || !selectedMethod}
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
                  accept=".fasta,.nex,.nexus,.fa,.nxs,.fas,.phy,.phylip"
                  bind:value={alignmentFile}
                  required
                  showFilename={false}
                  showButton={false}
                >
                  {#if validating}
                    <span class="file-status validating">
                      <div class="small-loader"></div>
                      <span>Validating...</span>
                    </span>
                  {:else if validationData && !validationError}
                    {#if JSON.parse(validationData)?.FILE_INFO?.goodtree}
                      <span class="file-status success">Validated successfully</span>
                    {:else}
                      <span class="file-status error">
                        Validation failed
                        <Button variant="link" size="sm" on:click={openValidationModal} inline={true}>See details</Button>
                      </span>
                    {/if}
                  {:else if validationError}
                    <span class="file-status error">Error: {validationError}</span>
                  {/if}
                </FileInput>
                
                <!-- Validation status is now shown inline with the file input -->

                <FileInput
                  label="Tree"
                  accept=".nwk,.tree"
                  buttonText="Select Tree File"
                  bind:value={treeFile}
                  showButton={false}
                  labelPosition="above"
                  showFilename={false}
                />

                <Button 
                  variant="primary"
                  type="submit"
                  disabled={!analysisName || !alignmentFile || (validationData ? !JSON.parse(validationData)?.FILE_INFO?.goodtree : true)}
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

<!-- Validation Results Modal -->
<Modal 
  isOpen={!!(showValidationModal && validationData)} 
  title="Alignment Validation Results" 
  on:close={closeValidationModal}
  maxWidth="1000px"
  ariaLabel="Alignment Validation Results"
>
  {#if validationData}
    <DataReaderResults jsonData={JSON.parse(validationData)} />
  {:else}
    <Text>No validation data available.</Text>
  {/if}
</Modal>

<style>
  .page-layout {
    display: flex;
    gap: 2rem;
  }

  .page-layout__sidebar {
    width: 15rem;
    flex-shrink: 0;
  }

  .page-layout__content {
    flex-grow: 1;
  }

  .analysis-section {
    margin-bottom: 2rem;
    scroll-margin-top: 2rem;
  }

  .import-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .json-upload {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  /* File status indicators */
  .file-status {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .file-status.success {
    color: #28a745;
  }
  
  .file-status.error {
    color: #dc3545;
  }
  
  .file-status.validating {
    color: #6c757d;
  }
  
  .small-loader {
    width: 0.875rem;
    height: 0.875rem;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>