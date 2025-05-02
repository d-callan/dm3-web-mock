export interface VisualizationGenerator {
  (results: any, method: string, options: any): Promise<any>;
}

export interface Visualization {
  name: string;
  component: string;
  options?: any;
}

export interface MethodOptions {
  visualizations: Visualization[];
  // Add other method-specific options as needed
}

export interface HyPhyMethods {
  [key: string]: MethodOptions;
}
