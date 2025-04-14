#!/usr/bin/env node

/**
 * This script generates methods.ts and methodParameters.ts files from the OpenAPI-generated
 * model files in src/lib/model. It extracts method information and parameters to create
 * runtime-friendly data files for the application.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

// Paths
const MODEL_DIR = path.join(__dirname, '..', 'src', 'lib', 'model');
const DATA_DIR = path.join(__dirname, '..', 'src', 'lib', 'data');
const METHODS_FILE = path.join(DATA_DIR, 'methods.ts');
const PARAMETERS_FILE = path.join(DATA_DIR, 'methodParameters.ts');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Method name mapping (lowercase to proper case)
const methodNameMapping = {
  'absrel': 'aBSREL',
  'bgm': 'BGM',
  'busted': 'BUSTED',
  'contrastfel': 'Contrast-FEL',
  'fel': 'FEL',
  'fubar': 'FUBAR',
  'gard': 'GARD',
  'meme': 'MEME',
  'multihit': 'Multi-Hit',
  'relax': 'RELAX',
  'slac': 'SLAC'
};

// Method descriptions
const methodDescriptions = {
  'absrel': 'Adaptive Branch-Site Random Effects Likelihood - Test for episodic diversifying selection on specific branches',
  'bgm': 'Bayesian Graphical Model - Detect correlated substitution patterns between sites',
  'busted': 'Branch-Site Unrestricted Statistical Test for Episodic Diversification - Test for episodic gene-wide selection',
  'contrastfel': 'Contrast Fixed Effects Likelihood - Test for differences in selection between groups at individual sites',
  'fel': 'Fixed Effects Likelihood - Test for pervasive selection at individual sites',
  'fubar': 'Fast Unconstrained Bayesian AppRoximation - Test for pervasive selection at individual sites using a Bayesian approach',
  'gard': 'Genetic Algorithm for Recombination Detection - Screen sequences for evidence of recombination',
  'meme': 'Mixed Effects Model of Evolution - Test for episodic selection at individual sites',
  'multihit': 'Multi-Hit Detection - Detect sites with evidence of multiple simultaneous nucleotide substitutions',
  'relax': 'RELAX - Test for relaxation or intensification of selection between groups',
  'slac': 'Single-Likelihood Ancestor Counting - Rapid counting-based test for selection at individual sites'
};

// Common parameters across methods
const commonParameters = {
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
    enum: [
      'Universal',
      'Vertebrate mtDNA',
      'Yeast mtDNA',
      'Mold mtDNA',
      'Invertebrate mtDNA',
      'Ciliate Nuclear',
      'Echinoderm mtDNA',
      'Euplotid Nuclear',
      'Bacterial',
      'Alternative Yeast Nuclear',
      'Ascidian mtDNA',
      'Flatworm mtDNA',
      'Blepharisma Nuclear'
    ]
  }
};

/**
 * Extracts parameter information from a TypeScript interface file
 */
async function extractParameters(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const parameters = { ...commonParameters };
    
    // Extract parameter definitions using regex
    const interfaceMatch = content.match(/export interface (\w+)Request \{([^}]+)\}/s);
    if (!interfaceMatch) return parameters;
    
    const interfaceBody = interfaceMatch[2];
    
    // Find all property definitions
    const propertyRegex = /(\w+)\??: ([^;]+);(?:\s*\/\*\*\s*([^*]*)\s*\*\/)?/g;
    let match;
    
    while ((match = propertyRegex.exec(interfaceBody)) !== null) {
      const [_, name, type, comment] = match;
      
      // Skip common parameters as they're already included
      if (['alignment', 'tree', 'genetic_code'].includes(name)) continue;
      
      const description = comment ? comment.trim() : '';
      
      // Handle different parameter types
      if (type.includes('Enum')) {
        // Extract enum values
        const enumMatch = content.match(new RegExp(`export enum ${name}Enum \\{([^}]+)\\}`, 'i'));
        if (enumMatch) {
          const enumValues = enumMatch[1]
            .split(',')
            .map(v => v.trim().split('=')[0].trim())
            .filter(Boolean);
          
          parameters[name] = {
            name,
            type: 'enum',
            description,
            enum: enumValues
          };
        }
      } else if (type.includes('Array<')) {
        parameters[name] = {
          name,
          type: 'array',
          description
        };
      } else if (type.includes('number')) {
        parameters[name] = {
          name,
          type: 'number',
          description
        };
      } else if (type.includes('boolean')) {
        parameters[name] = {
          name,
          type: 'boolean',
          description
        };
      } else {
        parameters[name] = {
          name,
          type: 'string',
          description
        };
      }
    }
    
    return parameters;
  } catch (error) {
    console.error(`Error extracting parameters from ${filePath}:`, error);
    return { ...commonParameters };
  }
}

/**
 * Generates the methods.ts file
 */
async function generateMethodsFile(methods) {
  const content = `export interface Method {
  id: string;
  name: string;
  description: string;
}

export const methods: Method[] = [
${methods.map(method => `  {
    id: '${method.id}',
    name: '${method.name}',
    description: '${method.description}'
  }`).join(',\n')}
];`;

  await writeFile(METHODS_FILE, content);
  console.log(`Generated ${METHODS_FILE}`);
}

/**
 * Generates the methodParameters.ts file
 */
async function generateParametersFile(methodParams) {
  const content = `// Method parameter definitions for HyPhy methods
// These are extracted from the API schema and stored in a format that can be used at runtime

export interface ParameterDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'enum' | 'array';
  description: string;
  enum?: string[];
  default?: any;
}

export type MethodParameters = Record<string, Record<string, ParameterDefinition>>;

// Common parameters used by multiple methods
const commonParameters: Record<string, ParameterDefinition> = ${JSON.stringify(commonParameters, null, 2)};

// Method-specific parameters
export const methodParameters: MethodParameters = ${JSON.stringify(methodParams, null, 2)};`;

  await writeFile(PARAMETERS_FILE, content);
  console.log(`Generated ${PARAMETERS_FILE}`);
}

/**
 * Main function to generate the data files
 */
async function main() {
  try {
    // Get all files in the model directory
    const files = await readdir(MODEL_DIR);
    
    // Find all request files
    const requestFiles = files.filter(file => 
      file.endsWith('Request.ts') && 
      !file.startsWith('index') && 
      !file.startsWith('models')
    );
    
    console.log(`Found ${requestFiles.length} request files`);
    
    const methods = [];
    const methodParams = {};
    
    // Process each request file
    for (const file of requestFiles) {
      const filePath = path.join(MODEL_DIR, file);
      const fileStats = await stat(filePath);
      
      if (!fileStats.isFile()) continue;
      
      // Extract method name from file name
      const methodId = file.replace('Request.ts', '');
      const methodKey = methodId.charAt(0).toUpperCase() + methodId.slice(1);
      
      // Get method display name
      const methodName = methodNameMapping[methodId.toLowerCase()] || methodId;
      
      // Get method description
      const description = methodDescriptions[methodId.toLowerCase()] || `HyPhy ${methodName} method`;
      
      methods.push({
        id: methodKey,
        name: methodName,
        description
      });
      
      // Extract parameters
      const parameters = await extractParameters(filePath);
      methodParams[methodKey] = parameters;
    }
    
    // Sort methods alphabetically by name
    methods.sort((a, b) => a.name.localeCompare(b.name));
    
    // Generate the files
    await generateMethodsFile(methods);
    await generateParametersFile(methodParams);
    
    console.log('Successfully generated method data files');
  } catch (error) {
    console.error('Error generating method data:', error);
    process.exit(1);
  }
}

main();
