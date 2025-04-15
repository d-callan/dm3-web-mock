<script lang="ts">
  import Accordion from '$lib/components/Accordion.svelte';
  import AccordionItem from '$lib/components/AccordionItem.svelte';
  import Page from '$lib/components/Page.svelte';
  import Text from '$lib/components/Text.svelte';
  import Link from '$lib/components/Link.svelte';
  import { base } from '$app/paths';
</script>

<Page 
  title="Support"
  breadcrumbs={[
    { label: "Home", href: `${base}` },
    { label: "Support" }
  ]}>
  <Accordion>
    <AccordionItem id="contact" title="Contact Us">
      <Text>To report a bug or request a feature, please open an issue on <Link href="https://github.com/veg/hyphy" external variant="primary">GitHub</Link>.</Text>
      <Text>For support or inquiries, please email <Link href="mailto:spond@temple.edu" variant="primary">spond@temple.edu</Link>.</Text>
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
