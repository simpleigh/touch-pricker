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
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '567890E',
                '567890E',
                Pricker.Music.MatchType.End,
            );
        expect(pattern.print('text')).toBe('');
    });

    it('displays a single match', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '567890E',
                '567890E',
                Pricker.Music.MatchType.End,
            );

        pattern.match(row);
        expect(pattern.print('text')).toBe('1 567890E\n');
    });

    it('displays multiple matches', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '567890E',
                '567890E',
                Pricker.Music.MatchType.End,
            );

        pattern.match(row);
        pattern.match(row);
        expect(pattern.print('text')).toBe('2 567890E\n');
    });

    it('suppresses counts for a single named row match', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.All,
            );

        pattern.match(row);
        expect(pattern.print('text')).toBe('Standard start sixend\n');
    });

    it('displays counts anyway for multiple named row matches', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.All,
            );

        pattern.match(row);
        pattern.match(row);
        expect(pattern.print('text')).toBe('2 Standard start sixend\n');
    });

});
