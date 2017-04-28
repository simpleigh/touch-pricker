/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="MatcherInterface.spec.ts" />

describe('PatternGroup music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    testMatcherInterface(function () {
        return new Pricker.Music.PatternGroup(
            'test',
            [
                new Pricker.Music.Pattern('2314567890E'),
            ],
        );
    });

    it('can match a row with any pattern', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                [
                    new Pricker.Music.Pattern('1234567890E'), // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                ],
            );
        expect(group.match(row)).toBe(true);
    });

    it('combines match counts from patterns', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                [
                    new Pricker.Music.Pattern('2314567890E'), // pass
                    new Pricker.Music.Pattern('1234567890E'), // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                ],
            );

        group.match(row);
        expect(group.getMatchCount()).toBe(2);
    });

    it('ignores changes to the original patterns', function () {
        const row: Pricker.Row = createTestRow(),
            patterns: Pricker.Music.Pattern[] = [ ],
            group: Pricker.Music.PatternGroup =
                new Pricker.Music.PatternGroup('group', patterns);

        // We add a pattern to the array
        patterns.push(new Pricker.Music.Pattern('2314567890E'));
        group.match(row);

        // ... but it shouldn't match
        expect(group.getMatchCount()).toBe(0);
    });

    it('can override the match count with a parent pattern', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                [
                    new Pricker.Music.Pattern('1234567890E'), // fail
                ],
                new Pricker.Music.Pattern('2314567890E'), // pass
            );

        group.match(row);
        expect(group.getMatchCount()).toBe(1);
    });

    it('still allows access to the subpattern match count', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                [
                    new Pricker.Music.Pattern('1234567890E'), // fail
                ],
                new Pricker.Music.Pattern('2314567890E'), // pass
            );

        group.match(row);
        expect(group.getSubmatches()).toBe(0);
    });

});
