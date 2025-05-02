<script lang="ts">
  import type { VisualizationCategory, Visualization } from '@veg/hyphy-eye/registry';
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { vizNameToId } from '$lib/index';

  export let category: VisualizationCategory;
  export let visualizations: Visualization[];
  export let glyphPath: string = `${base}/glyphs`;
  export let jobId: string;
  export let analysisId: string;

  // Helper function to create the visualization URL
  function createVisualizationUrl(viz: Visualization): string {
    const vizId = vizNameToId(viz.name);
    return `${base}/analyses/${analysisId}/jobs/${jobId}/visualizations/${vizId}`;
  }

  // Handle click on visualization
  function handleVisualizationClick(viz: Visualization) {
    goto(createVisualizationUrl(viz));
  }
</script>

<div class="dm-visualization-section">
  <div class="dm-category-info">
    <h2 class="dm-category-title">{category.name}</h2>
    <div class="dm-category-description">
      {category.description}
    </div>
  </div>
  <div class="dm-visualizations-container">
    {#each visualizations as viz}
      <div 
        class="dm-visualization-option"
        on:click={() => handleVisualizationClick(viz)}
        role="button"
        tabindex="0"
        on:keydown={(e) => {
          if (e.key === 'Enter') handleVisualizationClick(viz);
        }}
      >
        <img 
          src={`${glyphPath}/${viz.glyph}`} 
          alt={viz.name} 
          class="dm-visualization-glyph"
        />
        <h4 class="dm-visualization-name">{viz.name}</h4>
        <div class="dm-visualization-tooltip">{viz.description}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .dm-visualization-section {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    margin-bottom: var(--dm-spacing-lg);
  }

  .dm-category-info {
    padding: var(--dm-spacing-xl);
    background: var(--dm-color-surface);
    border-radius: var(--dm-border-radius-md);
    border: 1px solid var(--dm-color-border);
  }

  .dm-category-title {
    color: var(--dm-color-text-primary);
    margin-bottom: var(--dm-spacing-sm);
    font-weight: 500;
  }

  .dm-visualizations-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--dm-spacing-md);
    padding: var(--dm-spacing-md);
  }

  .dm-visualization-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--dm-spacing-sm);
    background: var(--dm-color-surface);
    border-radius: var(--dm-border-radius-md);
    border: 1px solid var(--dm-color-border);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dm-visualization-option:hover {
    background: var(--dm-color-surface-hover);
    transform: translateY(-2px);
  }

  .dm-visualization-option:focus {
    outline: 2px solid var(--dm-color-primary);
    outline-offset: 2px;
  }

  .dm-visualization-glyph {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: var(--dm-spacing-sm);
  }

  .dm-visualization-name {
    margin: 0;
    color: var(--dm-color-text-primary);
    font-size: 1rem;
    text-align: center;
  }

  .dm-visualization-tooltip {
    margin-top: var(--dm-spacing-xs);
    color: var(--dm-color-text-secondary);
    font-size: 0.875rem;
    text-align: center;
  }
</style>
