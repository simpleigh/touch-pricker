/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="MatcherInterface.ts" />

describe('PatternGroup music class', function () {

    function createTestRow(input: string = '231'): Pricker.Row {
        return Pricker.rowFromString(input, Pricker.Stage.Cinques);
    }

    testMatcherInterface(function () {
        return new Pricker.Music.PatternGroup(
            'test',
            new Pricker.Music.Pattern('2314567890E', 'test'),
        );
    });

    it('can match a row with any pattern', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('1234567890E', 'fail'),
                new Pricker.Music.Pattern('2314567890E', 'pass'),
            );
        expect(group.match(row).isMatch).toBe(true);
    });

    it('combines match counts from patterns', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'pass'),
                new Pricker.Music.Pattern('1234567890E', 'fail'),
                new Pricker.Music.Pattern('2314567890E', 'pass'),
            );

        group.match(row);
        expect(group.getMatches()).toBe(2);
    });

    it('concatenates pattern match text', function () {
        const row: Pricker.Row = createTestRow(),
            group: Pricker.Music.PatternGroup = new Pricker.Music.PatternGroup(
                'group',
                new Pricker.Music.Pattern('2314567890E', 'pattern1'),
                new Pricker.Music.Pattern('2314567890E', 'pattern2'),
            );
        expect(group.match(row).text).toBe('group (pattern1, pattern2)');
    });

});
