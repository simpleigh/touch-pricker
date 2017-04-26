/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="MatcherInterface.spec.ts" />

/**
 * Tests that a scheme behaves as an AbstractScheme
 * @param {}        createFn   - function to create the sceme under test
 * @param {string}  schemeName - expected name of the scheme
 */
function testAbstractSchemeImplementation(
    createFn: () => Pricker.Music.AbstractScheme,
    schemeName: string,
) {

    testMatcherInterface(createFn, schemeName);

}
