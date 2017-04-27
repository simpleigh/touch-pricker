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
 * @param {}        testCases  - array of tests: [stage, row, matches, output]
 */
function testAbstractSchemeImplementation(
    createFn: (stage: Pricker.Stage) => Pricker.Music.AbstractScheme,
    schemeName: string,
    testCases: Array<[Pricker.Stage, string, number, string]>,
) {

    testMatcherInterface(
        function (): Pricker.Music.AbstractScheme {
            return createFn(Pricker.Stage.Cinques);
        },
        schemeName,
    );

    it('matches music correctly', function () {
        for (let i: number = 0; i < testCases.length; i += 1) {
            const stage: Pricker.Stage = testCases[i][0],
                rowString: string = testCases[i][1],
                matches: number = testCases[i][2],
                output: string = testCases[i][3],
                scheme: Pricker.Music.AbstractScheme = createFn(stage);

            scheme.match(Pricker.rowFromString(rowString, stage));
            expect(scheme.getMatches()).toBe(matches);
            expect(scheme.print('text')).toBe(output);
        }
    });

}
