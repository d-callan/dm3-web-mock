<script lang="ts">
  import Accordion from '$lib/components/Accordion.svelte';
  import AccordionItem from '$lib/components/AccordionItem.svelte';
  import Page from '$lib/components/Page.svelte';
  import Text from '$lib/components/Text.svelte';
</script>

<Page title="Support">
  <Accordion>
    <AccordionItem id="contact" title="Contact Us">
      <Text>To report a bug or request a feature, please open an issue on <a href="https://github.com/veg/hyphy" target="_blank" rel="noopener noreferrer">GitHub</a>.</Text>
      <Text>For support or inquiries, please email <a href="mailto:spond@temple.edu">spond@temple.edu</a>.</Text>
    </AccordionItem>
    <AccordionItem id="status" title="Service Status">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="release-notes" title="Release Notes">
      <Text>Coming Soon!</Text>
    </AccordionItem>
    <AccordionItem id="team" title="Meet the Team">
      <Text>Coming Soon!</Text>
    </AccordionItem>
  </Accordion>
</Page>
