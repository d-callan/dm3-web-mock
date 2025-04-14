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

export interface FubarResultResult {
    analysis?: models.FubarResultResultAnalysis;

    input?: models.FubarResultResultInput;

    /**
     * Model fit statistics
     */
    fits?: { [key: string]: object; };

    /**
     * Timing information for different stages of the analysis
     */
    timers?: { [key: string]: object; };

    MLE?: models.ContrastFelResultResultMLE;

}
