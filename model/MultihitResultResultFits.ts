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
 * Model fitting information
 */
export interface MultihitResultResultFits {
    MG94_with_double_and_triple_instantaneous_substitutions?: models.MultihitResultResultFitsMG94WithDoubleAndTripleInstantaneousSubstitutions;

    MG94_with_double_and_triple_instantaneous_substitutions_only_synonymous_islands?: models.MultihitResultResultFitsMG94WithDoubleAndTripleInstantaneousSubstitutions;

    MG94_with_double_instantaneous_substitutions?: models.MultihitResultResultFitsMG94WithDoubleAndTripleInstantaneousSubstitutions;

    Nucleotide_GTR?: models.MultihitResultResultFitsMG94WithDoubleAndTripleInstantaneousSubstitutions;

    Standard_MG94?: models.MultihitResultResultFitsMG94WithDoubleAndTripleInstantaneousSubstitutions;

}
