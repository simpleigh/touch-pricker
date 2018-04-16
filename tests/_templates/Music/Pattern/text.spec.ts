/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../../functions.ts" />

describe('text template for Pattern music class', () => {

    it('displays nothing when nothing matches', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        expect(pattern.print('text')).toBe('');
    });

    it('displays a single match', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match('2314567890E');
        expect(pattern.print('text')).toBe('1 90E\n');
    });

    it('displays multiple matches', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match('2314567890E');
        pattern.match('2314567890E');
        expect(pattern.print('text')).toBe('2 90E\n');
    });

    it('suppresses counts for a single named row match', () => {
        const pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match('2314567890E');
        expect(pattern.print('text')).toBe('Standard start sixend\n');
    });

    it('displays counts anyway for multiple named row matches', () => {
        const pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );

        pattern.match('2314567890E');
        pattern.match('2314567890E');
        expect(pattern.print('text')).toBe('2 Standard start sixend\n');
    });

    it('allows the line ending to be customised', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match('2314567890E');
        expect(pattern.print('text', {'end': '#'})).toBe('1 90E#');
    });

    it('allows the line ending to be removed', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        pattern.match('2314567890E');
        expect(pattern.print('text', {'end': ''})).toBe('1 90E');
    });

});
