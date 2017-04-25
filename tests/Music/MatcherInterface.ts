/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/**
 * Tests that a matcher behaves appropriately
 */
function testMatcherInterface(createFn: () => Pricker.Music.MatcherInterface) {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    describe('implements MatcherInterface and', function () {

        it('can match a row', function () {
            const row: Pricker.Row = createTestRow(),
                matcher: Pricker.Music.MatcherInterface = createFn();
            expect(matcher.match(row).isMatch).toBe(true);
        });

        it('can identify a mismatch', function () {
            const row: Pricker.Row = createTestRow('123'),
                matcher: Pricker.Music.MatcherInterface = createFn();
            expect(matcher.match(row).isMatch).toBe(false);
        });

        it('provides read access to the matcher name', function () {
            const matcher: Pricker.Music.MatcherInterface = createFn();
            expect(matcher.getName()).toBe('test');
        });

        it('starts out with no matches', function () {
            const matcher: Pricker.Music.MatcherInterface = createFn();
            expect(matcher.getMatches()).toBe(0);
        });

        it('increments the match count for each match', function () {
            const row: Pricker.Row = createTestRow(),
                matcher: Pricker.Music.MatcherInterface = createFn();

            matcher.match(row);
            expect(matcher.getMatches()).toBe(1);

            matcher.match(row);
            expect(matcher.getMatches()).toBe(2);
        });

    });

}
