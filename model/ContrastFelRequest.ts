/**
 * Datamonkey API
 * Datamonkey is a free public server for comparative analysis of sequence alignments using state-of-the-art statistical models. <br> This is the OpenAPI definition for the Datamonkey API. 
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: spond@temple.edu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as models from './models';

export interface ContrastFelRequest {
    /**
     * Path to the in-frame codon alignment file (e.g., .fasta, .phy)
     */
    alignment: string;

    /**
     * Path to the phylogenetic tree file
     */
    tree: string;

    /**
     * Array of branch sets to be used for comparison (e.g., \"Source\" and \"Test\" groups)
     */
    branch_sets: Array<string>;

    /**
     * Which genetic code should be used
     */
    genetic_code?: string;

    /**
     * Include synonymous rate variation in the model (\"Yes\" or \"No\")
     */
    srv?: string;

    /**
     * Perform permutation significance tests (\"Yes\" or \"No\")
     */
    permutations?: string;

    /**
     * Significance value for site tests
     */
    p_value?: number;

    /**
     * Significance value for False Discovery Rate reporting
     */
    q_value?: number;

}
