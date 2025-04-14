export interface Method {
  id: string;
  name: string;
  description: string;
}

export const methods: Method[] = [
  {
    id: 'absrel',
    name: 'aBSREL',
    description: 'Adaptive Branch-Site Random Effects Likelihood - Test for episodic diversifying selection on specific branches'
  },
  {
    id: 'bgm',
    name: 'BGM',
    description: 'Bayesian Graphical Model - Detect correlated substitution patterns between sites'
  },
  {
    id: 'busted',
    name: 'BUSTED',
    description: 'Branch-Site Unrestricted Statistical Test for Episodic Diversification - Test for episodic gene-wide selection'
  },
  {
    id: 'contrast-fel',
    name: 'Contrast-FEL',
    description: 'Contrast Fixed Effects Likelihood - Test for differences in selection between groups at individual sites'
  },
  {
    id: 'fel',
    name: 'FEL',
    description: 'Fixed Effects Likelihood - Test for pervasive selection at individual sites'
  },
  {
    id: 'fubar',
    name: 'FUBAR',
    description: 'Fast Unconstrained Bayesian AppRoximation - Test for pervasive selection at individual sites using a Bayesian approach'
  },
  {
    id: 'gard',
    name: 'GARD',
    description: 'Genetic Algorithm for Recombination Detection - Screen sequences for evidence of recombination'
  },
  {
    id: 'meme',
    name: 'MEME',
    description: 'Mixed Effects Model of Evolution - Test for episodic selection at individual sites'
  },
  {
    id: 'multihit',
    name: 'Multi-Hit',
    description: 'Multi-Hit Detection - Detect sites with evidence of multiple simultaneous nucleotide substitutions'
  },
  {
    id: 'relax',
    name: 'RELAX',
    description: 'RELAX - Test for relaxation or intensification of selection between groups'
  },
  {
    id: 'slac',
    name: 'SLAC',
    description: 'Single-Likelihood Ancestor Counting - Rapid counting-based test for selection at individual sites'
  }
] as const;

export type MethodId = typeof methods[number]['id'];

export function getMethodById(id: MethodId): Method | undefined {
  return methods.find(method => method.id === id);
}
