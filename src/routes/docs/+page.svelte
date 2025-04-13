<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Text from '$lib/components/Text.svelte';
  import Accordion from '$lib/components/Accordion.svelte';
  import AccordionItem from '$lib/components/AccordionItem.svelte';
</script>

<Page title="Documentation">
  <Accordion>
    <AccordionItem id="getting-started" title="Getting Started">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="faq" title="Frequently Asked Questions">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="api-access" title="API Access">
      <Text>Find documentation for the OpenAPI Spec <a href="https://veg.github.io/api-datamonkey/" target="_blank" rel="noopener noreferrer">here</a>.</Text>
    </AccordionItem>
    <AccordionItem id="methods-docs" title="Methods Documentation">
      <Text>Find documentation for HyPhy and its methods <a href="http://help.datamonkey.org" target="_blank" rel="noopener noreferrer">here</a>.</Text>
    </AccordionItem>
    <AccordionItem id="data-format" title="Input Data Guidelines">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="tutorials" title="Tutorials">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="glossary" title="Glossary">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="citations" title="Citations">
      <Text>Coming Soon!</Text>
    </AccordionItem>
  </Accordion>
</Page>
