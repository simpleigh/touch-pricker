/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../../functions.ts" />

describe('text template for Pattern music class', function () {

    it('displays nothing when nothing matches', function () {
        const pattern = new Pricker.Music.Pattern('90E');
        expect(pattern.print('text')).toBe('');
    });

    it('displays a single match', function () {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match(createTestRow());
        expect(pattern.print('text')).toBe('1 90E\n');
    });

    it('displays multiple matches', function () {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match(createTestRow());
        pattern.match(createTestRow());
        expect(pattern.print('text')).toBe('2 90E\n');
    });

    it('suppresses counts for a single named row match', function () {
        const pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match(createTestRow());
        expect(pattern.print('text')).toBe('Standard start sixend\n');
    });

    it('displays counts anyway for multiple named row matches', function () {
        const pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match(createTestRow());
        pattern.match(createTestRow());
        expect(pattern.print('text')).toBe('2 Standard start sixend\n');
    });

    it('allows the line ending to be customised', function () {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match(createTestRow());
        expect(pattern.print('text', {'end': '#'})).toBe('1 90E#');
    });

    it('allows the line ending to be removed', function () {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match(createTestRow());
        expect(pattern.print('text', {'end': ''})).toBe('1 90E');
    });

});
