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

export interface BustedRequest {
    alignment?: string;

    tree?: string;

    /**
     * Include synonymous rate variation in the model
     */
    srv?: BustedRequest.SrvEnum;

    /**
     * Specify handling of multiple nucleotide substitutions
     */
    multiple_hits?: BustedRequest.MultipleHitsEnum;

    genetic_code?: models.GeneticCode;

    /**
     * Branches to include in the analysis. If empty, all branches are included.
     */
    branches?: Array<string>;

    /**
     * The number omega rate classes to include in the model
     */
    rates?: number;

    /**
     * The number synonymous rate classes to include in the model
     */
    syn_rates?: number;

    /**
     * The number of points in the initial distributional guess for likelihood fitting
     */
    grid_size?: number;

    /**
     * The number of initial random guesses to seed rate values optimization
     */
    starting_points?: number;

    /**
     * An advanced experimental setting; include a rate class to capture misalignment artifacts
     */
    error_sink?: BustedRequest.ErrorSinkEnum;

}
export namespace BustedRequest {
    export enum SrvEnum {
        Yes = <any> 'Yes',
        No = <any> 'No',
        BranchSite = <any> 'branch-site'
    }
    export enum MultipleHitsEnum {
        None = <any> 'None',
        Double = <any> 'Double',
        DoubleTriple = <any> 'Double+Triple'
    }
    export enum ErrorSinkEnum {
        Yes = <any> 'Yes',
        No = <any> 'No'
    }
}
