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

export interface MemeRequest {
    alignment?: string;

    tree?: string;

    genetic_code?: models.GeneticCode;

    /**
     * Specify handling of multiple nucleotide substitutions
     */
    multiple_hits?: MemeRequest.MultipleHitsEnum;

    /**
     * Specify whether to estimate multiple hit rates for each site
     */
    site_multihit?: MemeRequest.SiteMultihitEnum;

    /**
     * Number of different categories of non-synonymous rates
     */
    rates?: number;

    /**
     * Number of bootstrapping replicates
     */
    resample?: number;

    /**
     * Option to impute likely character states for missing data
     */
    impute_states?: MemeRequest.ImputeStatesEnum;

}
export namespace MemeRequest {
    export enum MultipleHitsEnum {
        None = <any> 'None',
        Double = <any> 'Double',
        DoubleTriple = <any> 'Double+Triple'
    }
    export enum SiteMultihitEnum {
        Estimate = <any> 'Estimate',
        Global = <any> 'Global'
    }
    export enum ImputeStatesEnum {
        Yes = <any> 'Yes',
        No = <any> 'No'
    }
}
