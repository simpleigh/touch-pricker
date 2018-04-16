/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="../PrintableMixin.spec.ts" />
/// <reference path="MatcherInterface.spec.ts" />

describe('Pattern music class', () => {

    it('uses the pattern as the name by default', () => {
        const pattern = new Pricker.Music.Pattern('231');
        expect(pattern.getName()).toBe('231');
    });

    it('can match the start of a row', () => {
        const pattern = new Pricker.Music.Pattern(
                    '231',
                    'test',
                    Pricker.Music.MatchType.Front,
                );
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('can match the end of a row', () => {
        const pattern = new Pricker.Music.Pattern(
                    '90E',
                    'test',
                    Pricker.Music.MatchType.Back,
                );
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('matches the end of a row by default', () => {
        const pattern = new Pricker.Music.Pattern('90E');
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('knows if it is a wildcard match', () => {
        const pattern = new Pricker.Music.Pattern(
                    '657890E',
                    '65 rollup',
                    Pricker.Music.MatchType.Back,
                );
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    it('knows if it is not a wildcard match', () => {
        const pattern = new Pricker.Music.Pattern(
                    '2314567890E',
                    'Standard start sixend',
                    Pricker.Music.MatchType.Row,
                );
        expect(pattern.isWildcardMatch()).toBe(false);
    });

    it('is therefore a wildcard match by default', () => {
        const pattern = new Pricker.Music.Pattern('231');
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    testMatcherInterface(
        () => new Pricker.Music.Pattern('2314567890E', 'test'),
    );

});
