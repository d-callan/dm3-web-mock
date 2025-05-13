<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { phylotree } from 'phylotree';

  export let newickString: string;
  export let height: number = 600;
  export let width: number = 800;

  let treeContainer: HTMLDivElement;
  let tree: any;
  let renderedTree: any;

  onMount(() => {
    renderTree();
  });

  afterUpdate(() => {
    if (newickString && treeContainer) {
      renderTree();
    }
  });

  function renderTree() {
    tree = new phylotree(newickString);
    renderedTree = tree.render({
      container: 'tree-container',
      height: height,
      width: width,
      'left-right-spacing': 'fit-to-size',
      'top-bottom-spacing': 'fit-to-size'
    });

    // Clear the container and append the SVG element
    treeContainer.innerHTML = ''; // Clear previous content if any
    treeContainer.appendChild(renderedTree.show()); // Append the SVG to the container
  }
</script>

<link rel="stylesheet" href="https://unpkg.com/phylotree@1.0.0-alpha.24/dist/phylotree.css" />

<div bind:this={treeContainer} class="phylo-tree"></div>

<style>
  .phylo-tree {
    width: 100%;
    overflow: auto;
  }
</style>
