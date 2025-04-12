<script lang="ts">
  import { base } from '$app/paths';
  import { slide } from 'svelte/transition';
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Card from '$lib/components/Card.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import Section from '$lib/components/Section.svelte';
  import SectionItem from '$lib/components/SectionItem.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import RadioGroup from '$lib/components/RadioGroup.svelte';
  import Progress from '$lib/components/Progress.svelte';
  import FileInput from '$lib/components/FileInput.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Button from '$lib/components/Button.svelte';
  import Tabs from '$lib/components/Tabs.svelte';
  import Form from '$lib/components/Form.svelte';
  import FormField from '$lib/components/FormField.svelte';
  import FormGroup from '$lib/components/FormGroup.svelte';
  import Table from '$lib/components/Table.svelte';
  import TableHeader from '$lib/components/TableHeader.svelte';
  import TableCell from '$lib/components/TableCell.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import AccordionItem from '$lib/components/AccordionItem.svelte';
  import List from '$lib/components/List.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import Text from '$lib/components/Text.svelte';
  import Link from '$lib/components/Link.svelte';

  let selectedMethod = 'Select Method';
  let advancedMode = false;
  let autoSave = false;
  let analysisType = 'quick';
  let uploadProgress = 70;
  let activeTab = 'analyses';

  const tabs = [
    { id: 'analyses', label: 'Analyses' },
    { id: 'upload', label: 'Upload Results' },
    { id: 'summary', label: 'Summary' }
  ];
</script>

<div class="dm-app">
  <div class="dm-container">
  <Header />

  <Hero>
    <Button variant="primary" size="xl">Start an Analysis</Button>
    <Button variant="secondary" size="xl">Explore Methods</Button>
  </Hero>

  <!-- Tabs -->
  <Tabs
    items={tabs}
    bind:activeId={activeTab}
    variant="underline"
  />

  <!-- Cards Container -->
  <div class="dm-grid dm-grid--auto-fit">
    <!-- Left Card -->
    <Card title="Upload a HyPhy JSON">
      <FileInput 
        accept=".json"
        buttonText="Upload File"
      />

      <!-- Progress Bar -->
      <Section title="Upload Progress" variant="card">
        <Progress value={uploadProgress} />
      </Section>

      <!-- Analysis Type -->
      <Section title="Analysis Type" variant="card">
        <Dropdown
          bind:value={selectedMethod}
          options={['SLAC', 'FEL', 'MEME', 'FUBAR', 'aBSREL']}
          placeholder="Select Method"
        />
      </Section>

      <!-- Settings Section -->
      <Section title="Analysis Settings" variant="card">
        <!-- Toggle Switches -->
        <SectionItem>
          <Toggle 
            label="Enable Advanced Mode"
            bind:checked={advancedMode}
            name="advanced-mode"
          />
        </SectionItem>

        <SectionItem>
          <Toggle 
            label="Auto-save Results"
            bind:checked={autoSave}
            name="auto-save"
          />
        </SectionItem>

        <!-- Radio Buttons -->
        <SectionItem spacing="lg">
          <Section title="Analysis Type" level="secondary" variant="card">
            <RadioGroup
              name="analysis"
              bind:value={analysisType}
              options={[
                { value: 'quick', label: 'Quick Analysis' },
                { value: 'standard', label: 'Standard Analysis' },
                { value: 'detailed', label: 'Detailed Analysis' }
              ]}
            />
          </Section>
        </SectionItem>
      </Section>
    </Card>

    <!-- Right Card -->
    <Card title="Configuration">
      <Form onSubmit={data => console.log('Form data:', data)}>
        <FormGroup title="Basic Settings">
          <FormField
            name="projectName"
            label="Project Name"
            placeholder="Enter project name"
            required
          />

          <FormField
            name="description"
            label="Description"
            type="textarea"
            placeholder="Enter project description"
          />
        </FormGroup>

        <FormGroup title="Advanced Settings" defaultOpen={false}>
          <FormField
            name="version"
            label="Version Tag"
            value="v1.0.0"
            monospace
          />

          <FormField
            name="apiKey"
            label="API Key"
            type="password"
            placeholder="Enter API key"
            monospace
          />
        </FormGroup>
      </Form>

      <Divider margin="lg" />

      <!-- Recent Analyses Table -->
      <Table hover striped>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader align="right">Time</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell monospace>#A1B2</TableCell>
            <TableCell>Quick</TableCell>
            <TableCell variant="success">Done</TableCell>
            <TableCell align="right">2m ago</TableCell>
          </tr>
          <tr>
            <TableCell monospace>#C3D4</TableCell>
            <TableCell>Standard</TableCell>
            <TableCell variant="running">Running</TableCell>
            <TableCell align="right">5m ago</TableCell>
          </tr>
          <tr>
            <TableCell monospace>#E5F6</TableCell>
            <TableCell>Detailed</TableCell>
            <TableCell variant="error">Failed</TableCell>
            <TableCell align="right">12m ago</TableCell>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>

  <!-- Accordion Section -->
  <Card title="Documentation">
    <Accordion>
      <AccordionItem id="docs" title="Analysis Documentation" defaultOpen>
        <Text>The HyPhy analysis suite provides a comprehensive set of methods for detecting selection. Here's what you need to know:</Text>
        <List>
          <ListItem>
            <Link href="#/methods/quick" variant="primary">Quick Analysis</Link>: Best for initial screening, uses default parameters
          </ListItem>
          <ListItem>
            <Link href="#/methods/standard" variant="primary">Standard Analysis</Link>: Balanced approach with customizable options
          </ListItem>
          <ListItem>
            <Link href="#/methods/detailed" variant="primary">Detailed Analysis</Link>: In-depth analysis with full parameter control
          </ListItem>
        </List>
        <Text variant="muted" size="sm">See our <Link href="#/documentation" variant="primary" size="sm">complete documentation</Link> for detailed explanations.</Text>
      </AccordionItem>

      <AccordionItem id="faq" title="Frequently Asked Questions">
        <Text>Common questions about using Datamonkey:</Text>
        <List type="check" spacing="lg">
          <ListItem>
            What file formats are supported? We accept <Link href="#/formats/fasta">FASTA</Link>, <Link href="#/formats/nexus">NEXUS</Link>, and <Link href="#/formats/hyphy">HyPhy batch files</Link>
          </ListItem>
          <ListItem>
            How long do analyses take? Check our <Link href="#/performance">performance guide</Link> for estimates
          </ListItem>
          <ListItem>
            Can I save my results? Yes, all results can be downloaded in multiple formats - see <Link href="#/export">export options</Link>
          </ListItem>
        </List>
      </AccordionItem>

      <AccordionItem id="troubleshooting" title="Troubleshooting">
        <Text>If you encounter issues:</Text>
        <List type="number" spacing="md">
          <ListItem>
            Check our <Link href="#/validation">file validation guide</Link>
          </ListItem>
          <ListItem>
            Use our <Link href="#/tools/alignment">sequence alignment validator</Link>
          </ListItem>
          <ListItem>
            Review our <Link href="#/errors">common error messages</Link>
          </ListItem>
          <ListItem>
            Contact <Link href="#/support" variant="primary">support</Link> with your job ID if problems persist
          </ListItem>
        </List>
        <Text variant="muted" size="sm">Visit our <Link href="#/troubleshooting" variant="primary" size="sm">troubleshooting guide</Link> for more help.</Text>
      </AccordionItem>
    </Accordion>
  </Card>
  </div>
</div>
