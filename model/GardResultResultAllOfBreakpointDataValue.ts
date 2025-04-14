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

export interface GardResultResultAllOfBreakpointDataValue {
    /**
     * Breakpoint positions
     */
    bps?: Array<Array<number>>;

    /**
     * Newick tree for this segment
     */
    tree?: string;

}
