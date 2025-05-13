declare module 'phylotree' {
  export interface PhylotreeInstance {
    render(options: any): any;
  }

  export interface PhylotreeConstructor {
    new (newickString: string): PhylotreeInstance;
    (newickString: string): PhylotreeInstance;
  }

  export const phylotree: PhylotreeConstructor;
}
