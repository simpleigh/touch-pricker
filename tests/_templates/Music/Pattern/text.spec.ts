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
        const pattern: Pricker.Music.Pattern =
            new Pricker.Music.Pattern('2314567890E');
        expect(pattern.print('text')).toBe('');
    });

    it('displays a single match', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern =
                new Pricker.Music.Pattern('2314567890E');

        pattern.match(row);
        expect(pattern.print('text')).toBe('1 2314567890E\n');
    });

    it('displays multiple matches', function () {
        const row: Pricker.Row = createTestRow(),
            pattern: Pricker.Music.Pattern =
                new Pricker.Music.Pattern('2314567890E');

        pattern.match(row);
        pattern.match(row);
        expect(pattern.print('text')).toBe('2 2314567890E\n');
    });

});
