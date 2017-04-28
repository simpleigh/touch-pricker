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

    it('provides access to the matchers', function () {
        const scheme: Pricker.Music.AbstractScheme =
                createFn(Pricker.Stage.Cinques);
        expect(scheme.getMatchers().length).toBeGreaterThan(0);
    });

    it('ignores changes to the returned matchers array', function () {
        const scheme: Pricker.Music.AbstractScheme =
                createFn(Pricker.Stage.Cinques),
            matchers: Pricker.Music.MatcherInterface[] = scheme.getMatchers(),
            length: number = matchers.length;

        matchers.slice(1);
        expect(scheme.getMatchers().length).toBe(length);
    });

    it('matches music correctly', function () {
        for (const testCase of testCases) {
            const stage: Pricker.Stage = testCase[0],
                rowString: string = testCase[1],
                matches: number = testCase[2],
                output: string = testCase[3],
                scheme: Pricker.Music.AbstractScheme = createFn(stage);

            scheme.match(Pricker.rowFromString(rowString, stage));
            expect(scheme.getMatchCount()).toBe(matches);
            expect(scheme.print('text')).toBe(output);
        }
    });

}
