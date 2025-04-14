// Method parameter definitions for HyPhy methods
// These are extracted from the API schema but stored in a format that can be used at runtime

export interface ParameterDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'array';
  description: string;
  enum?: string[];
  default?: any;
}

export type MethodParameters = Record<string, Record<string, ParameterDefinition>>;

// Common parameters used by multiple methods
const commonParameters: Record<string, ParameterDefinition> = {
  alignment: {
    name: 'alignment',
    type: 'string',
    description: 'The sequence alignment in FASTA format'
  },
  tree: {
    name: 'tree',
    type: 'string',
    description: 'The phylogenetic tree in Newick format'
  },
  genetic_code: {
    name: 'genetic_code',
    type: 'enum',
    description: 'The genetic code to use for translation',
    enum: ['Universal', 'Vertebrate mtDNA', 'Yeast mtDNA', 'Mold mtDNA', 'Invertebrate mtDNA', 'Ciliate Nuclear', 'Echinoderm mtDNA', 'Euplotid Nuclear', 'Bacterial', 'Alternative Yeast Nuclear', 'Ascidian mtDNA', 'Flatworm mtDNA', 'Blepharisma Nuclear']
  }
};

// Method-specific parameters
export const methodParameters: MethodParameters = {
  'Absrel': {
    ...commonParameters,
    srv: {
      name: 'srv',
      type: 'enum',
      description: 'Include synonymous rate variation in the model',
      enum: ['Yes', 'No'],
      default: 'No'
    },
    multiple_hits: {
      name: 'multiple_hits',
      type: 'enum',
      description: 'Specify handling of multiple nucleotide substitutions',
      enum: ['None', 'Double', 'Double+Triple'],
      default: 'None'
    },
    branches: {
      name: 'branches',
      type: 'array',
      description: 'Branches to include in the analysis. If empty, all branches are included.'
    }
  },
  'Fel': {
    ...commonParameters,
    ci: {
      name: 'ci',
      type: 'enum',
      description: 'Confidence interval estimation method',
      enum: ['Yes', 'No'],
      default: 'No'
    }
  },
  'Meme': {
    ...commonParameters,
    alpha: {
      name: 'alpha',
      type: 'number',
      description: 'Significance level threshold',
      default: 0.1
    }
  },
  'Busted': {
    ...commonParameters,
    branches: {
      name: 'branches',
      type: 'array',
      description: 'Branches to test for selection. If empty, all branches are tested.'
    },
    syn_rate_distribution: {
      name: 'syn_rate_distribution',
      type: 'enum',
      description: 'The distribution to use for synonymous rates',
      enum: ['Constant', 'General Discrete'],
      default: 'General Discrete'
    }
  },
  'Slac': {
    ...commonParameters,
    samples: {
      name: 'samples',
      type: 'number',
      description: 'Number of samples used to assess ancestral reconstruction uncertainty',
      default: 100
    },
    significance_level: {
      name: 'significance_level',
      type: 'number',
      description: 'P-value threshold to use for significance testing',
      default: 0.05
    }
  },
  'Fubar': {
    ...commonParameters,
    grid_points: {
      name: 'grid_points',
      type: 'number',
      description: 'Number of grid points for discretizing the distribution',
      default: 20
    },
    mcmc_samples: {
      name: 'mcmc_samples',
      type: 'number',
      description: 'Number of MCMC samples to draw',
      default: 2000
    },
    burn_in: {
      name: 'burn_in',
      type: 'number',
      description: 'Number of MCMC samples to discard as burn-in',
      default: 1000
    }
  },
  'Gard': {
    ...commonParameters,
    rate_classes: {
      name: 'rate_classes',
      type: 'number',
      description: 'Number of rate classes to use',
      default: 2
    },
    site_rate_variation: {
      name: 'site_rate_variation',
      type: 'enum',
      description: 'Whether to model site-to-site rate variation',
      enum: ['Yes', 'No'],
      default: 'No'
    }
  },
  'Relax': {
    ...commonParameters,
    test_branches: {
      name: 'test_branches',
      type: 'array',
      description: 'Branches to test for selection relaxation'
    },
    reference_branches: {
      name: 'reference_branches',
      type: 'array',
      description: 'Reference branches to compare against test branches'
    }
  },
  'Bgm': {
    ...commonParameters,
    substitution_model: {
      name: 'substitution_model',
      type: 'enum',
      description: 'The nucleotide substitution model to use',
      enum: ['JC69', 'K80', 'F81', 'HKY85', 'TN93', 'GTR'],
      default: 'HKY85'
    }
  },
  'ContrastFel': {
    ...commonParameters,
    test_branches: {
      name: 'test_branches',
      type: 'array',
      description: 'Branches to test for selection'
    },
    reference_branches: {
      name: 'reference_branches',
      type: 'array',
      description: 'Reference branches to compare against test branches'
    }
  },
  'Multihit': {
    ...commonParameters,
    significance_level: {
      name: 'significance_level',
      type: 'number',
      description: 'P-value threshold to use for significance testing',
      default: 0.05
    }
  }
};
