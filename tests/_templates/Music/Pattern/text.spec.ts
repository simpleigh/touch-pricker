/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template for Pattern music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    it('displays nothing when nothing matches', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');
        expect(pattern.print('text')).toBe('');
    });

    it('displays a single match', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');

        pattern.match(row);
        expect(pattern.print('text')).toBe('1 90E\n');
    });

    it('displays multiple matches', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');

        pattern.match(row);
        pattern.match(row);
        expect(pattern.print('text')).toBe('2 90E\n');
    });

    it('suppresses counts for a single named row match', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match(row);
        expect(pattern.print('text')).toBe('Standard start sixend\n');
    });

    it('displays counts anyway for multiple named row matches', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match(row);
        pattern.match(row);
        expect(pattern.print('text')).toBe('2 Standard start sixend\n');
    });

    it('allows the line ending to be customised', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');

        pattern.match(row);
        expect(pattern.print('text', {'end': '#'})).toBe('1 90E#');
    });

    it('allows the line ending to be removed', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');

        pattern.match(row);
        expect(pattern.print('text', {'end': ''})).toBe('1 90E');
    });

});
