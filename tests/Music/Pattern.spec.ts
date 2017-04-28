/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../PrintableMixin.spec.ts" />
/// <reference path="MatcherInterface.spec.ts" />

describe('Pattern music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    const row: Pricker.Row = createTestRow();

    it('uses the pattern as the name by default', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('231');
        expect(pattern.getName()).toBe('231');
    });

    it('can match the start of a row', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '231',
                'test',
                Pricker.Music.MatchType.Front,
            );
        expect(pattern.match(row)).toBe(true);
    });

    it('can match the end of a row', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '90E',
                'test',
                Pricker.Music.MatchType.Back,
            );
        expect(pattern.match(row)).toBe(true);
    });

    it('matches the end of a row by default', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('90E');
        expect(pattern.match(row)).toBe(true);
    });

    it('knows if it is a wildcard match', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
            '657890E',
            '65 rollup',
            Pricker.Music.MatchType.Back,
        );
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    it('knows if it is not a wildcard match', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern(
                '2314567890E',
                'Standard start sixend',
                Pricker.Music.MatchType.Row,
            );
        expect(pattern.isWildcardMatch()).toBe(false);
    });

    it('is therefore a wildcard match by default', function () {
        const pattern: Pricker.Music.Pattern = new Pricker.Music.Pattern('231');
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    testMatcherInterface(
        () => new Pricker.Music.Pattern('2314567890E', 'test'),
    );

    testPrintableMixinImplementation(() => new Pricker.Music.Pattern('231'));

});
