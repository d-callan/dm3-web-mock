<script lang="ts">
  import type { VisualizationCategory, Visualization } from 'hyphy-eye/registry';
  import { base } from '$app/paths';

  export let category: VisualizationCategory;
  export let visualizations: Visualization[];
  export let glyphPath: string = `${base}/glyphs`;
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
      <div class="dm-visualization-option">
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

  .dm-category-description {
    color: var(--dm-color-text-secondary);
    font-size: var(--dm-text-md);
  }

  .dm-visualizations-container {
    display: flex;
    flex-wrap: wrap;
  }

  .dm-visualization-option {
    position: relative;
    flex: 0 1 calc(25% - var(--dm-spacing-md));
    text-align: center;
    background: var(--dm-color-surface);
    border-radius: var(--dm-border-radius-md);
    padding: var(--dm-spacing-xl);
    transition: transform var(--dm-transition-duration) var(--dm-transition-timing);
  }

  .dm-visualization-option:hover {
    transform: translateY(-2px);
  }

  .dm-visualization-glyph {
    max-width: 100%;
    height: auto;
    border-radius: var(--dm-border-radius-sm);
    cursor: pointer;
  }

  .dm-visualization-name {
    margin: var(--dm-spacing-xs) 0;
    font-size: var(--dm-font-size-md);
    color: var(--dm-color-text-primary);
    font-weight: 500;
  }

  .dm-visualization-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--dm-text);
    color: var(--dm-background);
    padding: var(--dm-spacing-xs);
    border-radius: 3px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity var(--dm-transition-duration) var(--dm-transition-timing);
    z-index: 10;
  }

  .dm-visualization-option:hover .dm-visualization-tooltip {
    opacity: 1;
  }
</style>
