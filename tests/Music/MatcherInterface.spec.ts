/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />

/**
 * Tests that a matcher behaves appropriately
 * @param {}        createFn    - function to create the matcher under test
 * @param {string}  matcherName - expected name of the matcher
 */
function testMatcherInterface(
    createFn: () => Pricker.Music.MatcherInterface,
    matcherName: string = 'test',
) {

    describe('implements MatcherInterface and', function () {

        let matcher: Pricker.Music.MatcherInterface;

        beforeEach(() => { matcher = createFn(); });

        it('can match a row', function () {
            expect(matcher.match('2314567890E')).toBe(true);
        });

        it('can identify a mismatch', function () {
            // Unmusical test row that's not likely to be matched
            expect(matcher.match('2614E378509')).toBe(false);
        });

        it('provides read access to the matcher name', function () {
            expect(matcher.getName()).toBe(matcherName);
        });

        it('starts out with no matches', function () {
            expect(matcher.getMatchCount()).toBe(0);
        });

        it('increments the match count for each match', function () {
            matcher.match('2314567890E');
            expect(matcher.getMatchCount()).toBe(1);

            matcher.match('2314567890E');
            expect(matcher.getMatchCount()).toBe(2);
        });

    });

}
