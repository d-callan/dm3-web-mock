<script lang="ts">
  import type { VisualizationCategory, Visualization } from 'hyphy-eye/registry';
  import { base } from '$app/paths';

  export let category: VisualizationCategory;
  export let visualizations: Visualization[];
  export let glyphPath: string = `${base}`;
</script>

<div class="visualization-section">
  <div class="category-info">
    <h2>{category.name}</h2>
    <div class="category-description">
      {category.description}
    </div>
  </div>
  <div class="visualizations-container">
    {#each visualizations as viz}
      <div class="visualization-option">
        <img 
          src={`${glyphPath}/${viz.glyph}`} 
          alt={viz.name} 
          title={viz.description}
        />
        <h4>{viz.name}</h4>
        <div class="tooltip">{viz.description}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .visualization-section {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
    margin-bottom: 20px;
  }

  .category-info {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .category-info h2 {
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .category-info .category-description {
    color: #666;
    font-size: 0.9em;
  }

  .visualizations-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .visualization-option {
    position: relative;
    flex: 0 1 200px;
    text-align: center;
  }

  .visualization-option img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    cursor: pointer;
  }

  .visualization-option h4 {
    margin: 10px 0;
    font-size: 0.9em;
    color: #333;
  }

  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 10;
  }

  .visualization-option:hover .tooltip {
    opacity: 1;
  }
</style>
