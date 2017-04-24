/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Pattern music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    it('can match a row', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'test',
            );
        expect(pattern.match(row).isMatch).toBe(true);
    });

    it('can identify a mismatch', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '1234567890E',
                'test',
            );
        expect(pattern.match(row).isMatch).toBe(false);
    });

    it('passes the match name in its result', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'test',
            );
        expect(pattern.match(row).text).toBe('test');
    });

    it('passes the terminate flag in its result', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'test',
                true,
            );
        expect(pattern.match(row).terminate).toBe(true);
    });

    it('can match the start of a row', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '231',
                'test',
                false,
                Pricker.Music.MatchType.Start,
            );
        expect(pattern.match(row).isMatch).toBe(true);
    });

    it('can match the end of a row', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '90E',
                'test',
                false,
                Pricker.Music.MatchType.End,
            );
        expect(pattern.match(row).isMatch).toBe(true);
    });

});
