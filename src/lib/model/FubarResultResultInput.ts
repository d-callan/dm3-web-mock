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

export interface FubarResultResultInput {
    /**
     * Name of the input file
     */
    file_name?: string;

    /**
     * Number of sequences in the alignment
     */
    number_of_sequences?: number;

    /**
     * Number of sites in the alignment
     */
    number_of_sites?: number;

    /**
     * Number of partitions in the analysis
     */
    partition_count?: number;

    /**
     * Trees used in the analysis
     */
    trees?: { [key: string]: string; };

}
