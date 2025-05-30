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

/**
 * Request parameters for SLAC (Single Likelihood Ancestor Counting) analysis
 */
export interface SlacRequest {
    /**
     * Path to the alignment file (e.g., .fasta, .nex, .phy)
     */
    alignment_file: string;

    /**
     * The genetic code to use for the analysis
     */
    genetic_code: string;

    /**
     * Specify branches to test
     */
    branches?: string;

    /**
     * Number of samples for ancestral reconstruction uncertainty
     */
    samples?: number;

    /**
     * Threshold for statistical significance
     */
    pvalue?: number;

}
