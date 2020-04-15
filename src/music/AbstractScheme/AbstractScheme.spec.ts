/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractScheme from '.';
import { Stage } from '../../rows';
import { testAbstractMatcherImplementation } from '../AbstractMatcher.spec';

/**
 * Tests that a scheme behaves as an AbstractScheme
 * @param createFn   function to create the sceme under test
 * @param testCases  array of tests: [stage, row, matches, output]
 */
export const testAbstractSchemeImplementation = (
    createFn: (stage?: Stage) => AbstractScheme,
    testCases: [Stage, string, number, string][],
) => {

    describe('is derived from AbstractScheme and', () => {

        it('provides access to the matchers', () => {
            expect(createFn().matchers.length).toBeGreaterThan(0);
        });

        it('ignores changes to the returned matchers array', () => {
            const scheme = createFn();
            const matchers = scheme.matchers;
            const length = matchers.length;

            matchers.slice(1);
            expect(scheme.matchers.length).toBe(length);
        });

        it('matches music correctly', () => {
            for (const [stage, rowString, matches, output] of testCases) {
                const scheme = createFn(stage);

                scheme.match(rowString);
                expect(scheme.matchCount).toBe(matches);
                expect(scheme.print('text')).toBe(output);
            }
        });

        testAbstractMatcherImplementation(createFn);

    });

};
