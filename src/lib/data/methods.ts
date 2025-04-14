export interface Method {
  id: string;
  name: string;
  description: string;
}

export const methods: Method[] = [
  {
    id: 'Absrel',
    name: 'aBSREL',
    description: 'Adaptive Branch-Site Random Effects Likelihood - Test for episodic diversifying selection on specific branches'
  },
  {
    id: 'Bgm',
    name: 'BGM',
    description: 'Bayesian Graphical Model - Detect correlated substitution patterns between sites'
  },
  {
    id: 'Busted',
    name: 'BUSTED',
    description: 'Branch-Site Unrestricted Statistical Test for Episodic Diversification - Test for episodic gene-wide selection'
  },
  {
    id: 'ContrastFel',
    name: 'Contrast-FEL',
    description: 'Contrast Fixed Effects Likelihood - Test for differences in selection between groups at individual sites'
  },
  {
    id: 'Fel',
    name: 'FEL',
    description: 'Fixed Effects Likelihood - Test for pervasive selection at individual sites'
  },
  {
    id: 'Fubar',
    name: 'FUBAR',
    description: 'Fast Unconstrained Bayesian AppRoximation - Test for pervasive selection at individual sites using a Bayesian approach'
  },
  {
    id: 'Gard',
    name: 'GARD',
    description: 'Genetic Algorithm for Recombination Detection - Screen sequences for evidence of recombination'
  },
  {
    id: 'Meme',
    name: 'MEME',
    description: 'Mixed Effects Model of Evolution - Test for episodic selection at individual sites'
  },
  {
    id: 'Multihit',
    name: 'Multi-Hit',
    description: 'Multi-Hit Detection - Detect sites with evidence of multiple simultaneous nucleotide substitutions'
  },
  {
    id: 'Relax',
    name: 'RELAX',
    description: 'RELAX - Test for relaxation or intensification of selection between groups'
  },
  {
    id: 'Slac',
    name: 'SLAC',
    description: 'Single-Likelihood Ancestor Counting - Rapid counting-based test for selection at individual sites'
  }
] as const;

export type MethodId = typeof methods[number]['id'];

export function getMethodById(id: MethodId): Method | undefined {
  return methods.find(method => method.id === id);
}
