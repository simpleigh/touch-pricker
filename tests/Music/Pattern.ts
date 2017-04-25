/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="MatcherInterface.ts" />

describe('Pattern music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    testMatcherInterface(function () {
        return new Pricker.Music.Pattern('2314567890E', 'test');
    });

    it('can match the start of a row', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '231',
                'test',
                Pricker.Music.MatchType.Start,
            );
        expect(pattern.match(row)).toBe(true);
    });

    it('can match the end of a row', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '90E',
                'test',
                Pricker.Music.MatchType.End,
            );
        expect(pattern.match(row)).toBe(true);
    });

    it('matches the end of a row by default', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '90E',
                'test',
            );
        expect(pattern.match(row)).toBe(true);
    });

});
