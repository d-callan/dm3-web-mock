<script lang="ts">
  import Page from '$lib/components/Page.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Button from '$lib/components/Button.svelte';
  import Card from '$lib/components/Card.svelte';
  import Text from '$lib/components/Text.svelte';
  import List from '$lib/components/List.svelte';
  import ListItem from '$lib/components/ListItem.svelte';
  import Divider from '$lib/components/Divider.svelte';
  import Section from '$lib/components/Section.svelte';
  import { methods } from '$lib/data/methods';
  import { base } from '$app/paths';
</script>

<Page>

  <Hero>
    <Button href="{base}/analyses" variant="primary" size="xl" maxWidth="50%">Start an Analysis</Button>
    <Button href="{base}/docs#methods-docs" variant="secondary" size="xl" maxWidth="50%">Explore Methods</Button>
  </Hero>

    <div class="dm-grid dm-grid--auto-fit">
      <Card title="WHY DATAMONKEY?" minHeight="300px">
        <List>
          <ListItem>
            <Text>🌐 Browser-based, no setup required</Text>
          </ListItem>
          <ListItem>
            <Text>📁 Works with standard input formats (FASTA, Newick)</Text>
          </ListItem>
          <ListItem>
            <Text>🧠 Powered by cutting-edge HyPhy models</Text>
          </ListItem>
          <ListItem>
            <Text>📊 Publication-ready results</Text>
          </ListItem>
          <ListItem>
            <Text>💻 Reproducible and open-source</Text>
          </ListItem>
        </List>
      </Card>

      <Card title="HOW IT WORKS" minHeight="300px">
        <List type="number">
          <ListItem>
            <Text>Upload your alignment and tree</Text>
          </ListItem>
          <ListItem>
            <Text>Select an analysis method</Text>
          </ListItem>
          <ListItem>
            <Text>Run the job in the browser</Text>
          </ListItem>
          <ListItem>
            <Text>View interactive results</Text>
          </ListItem>
        </List>
      </Card>
    </div>

<style>
  .method-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--dm-spacing-sm);
  }

</style>
    <Section title="AVAILABLE METHODS" center underline={false}>
      <div class="dm-grid dm-grid--three-columns">
        {#each methods as method}
          <Card>
            <div class="method-card">
              <Text size="lg" weight="bold">{method.name}</Text>
              <Divider margin="sm" />
              <Text>{method.description}</Text>
            </div>
          </Card>
        {/each}
      </div>
    </Section>

    <Section title="TUTORIALS & EXAMPLES" center underline={false}>
      <Text align="center">Explore case studies, walkthroughs, and sample data to get the most out of Datamonkey.</Text>
      <Button href="{base}/docs#tutorials" variant="primary" size="lg" maxWidth="50%" center>Browse Tutorials</Button>
    </Section>

    <br>
    <br>
    <br>

    <h3>LATEST UPDATES</h3>
    <List>
      <ListItem>
        <Text>Run entirely in the browser with WebAssembly!</Text>
      </ListItem>
      <ListItem>
        <Text>Organize jobs into analyses!</Text>
      </ListItem>
      <ListItem>
        <Text>Now with example data and tutorials</Text>
      </ListItem>
      <ListItem>
        <Text>All new look and feel, inspired by the original Datamonkey.org</Text>
      </ListItem>
    </List>
</Page>
