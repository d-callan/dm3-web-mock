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

export interface FelResultResult {
    analysis?: models.AnalysisInfo;

    input?: models.InputInfo;

    tested?: { [key: string]: { [key: string]: string; }; };

    timers?: { [key: string]: models.TimersInfoValue; };

    runtime?: string;

    data_partitions?: { [key: string]: models.PartitionsInfoValue; };

    fits?: { [key: string]: models.FelResultResultAllOfFitsValue; };

    branch_attributes?: models.FelResultResultAllOfBranchAttributes;

    MLE?: models.FelResultResultAllOfMLE;

}
export namespace FelResultResult {
    export enum TestedEnum {
        Tested = <any> 'tested',
        Background = <any> 'background'
    }
}
