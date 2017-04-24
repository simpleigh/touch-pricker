/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('PatternGroup music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    it('can match a row with one pattern', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'test'),
            );
        expect(group.match(row).isMatch).toBe(true);
    });

    it('can match a row with any pattern', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('1234567890E', 'fail'),
                new Pricker.Music.Pattern('2314567890E', 'pass'),
            );
        expect(group.match(row).isMatch).toBe(true);
    });

    it('can identify a mismatch', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('1234567890E', 'test'),
            );
        expect(group.match(row).isMatch).toBe(false);
    });

    it('concatenates pattern match text', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'pattern1'),
                new Pricker.Music.Pattern('2314567890E', 'pattern2'),
            );
        expect(group.match(row).text).toBe('group (pattern1, pattern2)');
    });

    it('stops processing after any terminating patterns', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'pattern1', true),
                new Pricker.Music.Pattern('2314567890E', 'pattern2'),
            );
        expect(group.match(row).text).toBe('group (pattern1)');
    });

    it('passes the terminate flag in its result', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'test', true),
            );
        expect(group.match(row).terminate).toBe(true);
    });

    it('only passes the terminate flag for matches', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('1234567890E', 'test', true),
            );
        expect(group.match(row).terminate).toBe(false);
    });

});
