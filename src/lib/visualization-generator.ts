import type { VisualizationGenerator } from './types';
import type { VisualizationOutputType } from '@veg/hyphy-eye/registry';

// Helper functions for visualization handling
function createVisualizationElement(output: any, outputType: VisualizationOutputType): any {
  switch (outputType) {
    case 'vega-spec':
      // For Vega specs, just return the spec object
      return output;
    case 'dom-element':
      // For DOM elements, just return the element
      return output;
    case 'html-string':
      // For HTML strings, just return the string
      return output;
    default:
      throw new Error(`Unknown output type: ${outputType}`);
  }
}

// Generate a visualization
export async function generateVisualization(
  component: string,
  resultsJson: string,
  method: string,
  options = {},
  outputType: VisualizationOutputType
): Promise<any> {
  try {
    // Parse the results JSON string
    const results = JSON.parse(resultsJson);
    
    // Get the visualization component
    const vizs = await import('@veg/hyphy-eye');
    const generatorName = `${component}Generator`;
    const generator = (vizs as any)[generatorName] as VisualizationGenerator;
    
    if (!generator) {
      throw new Error(`Generator function not found for component: ${component}`);
    }
    console.log('Generating visualization with options:', options);
    // Call the generator with the correct arguments
    const spec = generator(results, method, options);

    // Create the visualization element
    return createVisualizationElement(spec, outputType);
  } catch (error) {
    // Handle different types of errors
    if (error instanceof Error) {
      throw error;
    } else if (typeof error === 'string') {
      throw new Error(error);
    } else if (error instanceof SyntaxError) {
      throw new Error(`Error parsing results JSON: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while generating visualization');
    }
  }
}
