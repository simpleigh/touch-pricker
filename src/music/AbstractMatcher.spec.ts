/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import matchers from '../templates/matchers';
import AbstractMatcher from './AbstractMatcher';

/**
 * Tests that a matcher behaves appropriately
 * @param createFn  function to create the matcher under test
 */
export const testAbstractMatcherImplementation = (
    createFn: () => AbstractMatcher,
) => {

    describe('is derived from AbstractMatcher and', () => {

        let matcher: AbstractMatcher;

        beforeEach(() => {
            jasmine.addMatchers(matchers);
            matcher = createFn();
        });

        it('can match a row', () => {
            expect(matcher.match('2314567890E')).toBe(true);
        });

        it('can identify a mismatch', () => {
            // Unmusical test row that's not likely to be matched
            expect(matcher.match('2614E378509')).toBe(false);
        });

        it('starts out with no matches', () => {
            expect(matcher.matchCount).toBe(0);
        });

        it('increments the match count for each match', () => {
            matcher.match('2314567890E');
            expect(matcher.matchCount).toBe(1);

            matcher.match('2314567890E');
            expect(matcher.matchCount).toBe(2);
        });

        it('is printable', () => {
            expect(matcher).toBePrintable();
        });

        it('is printable as text', () => {
            expect(matcher).toHaveTemplate('text');
        });

    });

};
