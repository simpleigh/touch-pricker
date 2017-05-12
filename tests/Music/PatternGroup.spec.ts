/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="../PrintableMixin.spec.ts" />
/// <reference path="MatcherInterface.spec.ts" />

describe('PatternGroup music class', function () {

    it('can match a row with any pattern', function () {
        const group = new Pricker.Music.PatternGroup('group', [
                    new Pricker.Music.Pattern('1234567890E'), // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                ]);

        expect(group.match('2314567890E')).toBe(true);
    });

    it('combines match counts from patterns', function () {
        const group = new Pricker.Music.PatternGroup('group', [
                    new Pricker.Music.Pattern('2314567890E'), // pass
                    new Pricker.Music.Pattern('1234567890E'), // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                ]);

        group.match('2314567890E');
        expect(group.getMatchCount()).toBe(2);
    });

    it('ignores changes to the original patterns', function () {
        const patterns: Pricker.Music.Pattern[] = [ ],
            group = new Pricker.Music.PatternGroup('group', patterns);

        // We add a pattern to the array
        patterns.push(new Pricker.Music.Pattern('2314567890E'));

        // ... but it shouldn't be added to the group
        expect(group.getPatterns().length).toBe(0);
    });

    it('provides access to the patterns', function () {
        const patterns: Pricker.Music.Pattern[] =
                [new Pricker.Music.Pattern('2314567890E')],
            group = new Pricker.Music.PatternGroup('test', patterns);

        expect(group.getPatterns()).toEqual(patterns);
    });

    it('ignores changes to the returned pattern array', function () {
        const patterns: Pricker.Music.Pattern[] =
                [new Pricker.Music.Pattern('2314567890E')],
            group = new Pricker.Music.PatternGroup('test', patterns);

        expect(group.getPatterns()).not.toBe(patterns);

        patterns.pop();
        expect(group.getPatterns()).not.toEqual(patterns);
    });

    it('can override the match count with a parent pattern', function () {
        const group = new Pricker.Music.PatternGroup(
                    'group',
                    [new Pricker.Music.Pattern('1234567890E')], // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                );

        group.match('2314567890E');
        expect(group.getMatchCount()).toBe(1);
    });

    it('still allows access to the subpattern match count', function () {
        const group = new Pricker.Music.PatternGroup(
                    'group',
                    [new Pricker.Music.Pattern('1234567890E')], // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                );

        group.match('2314567890E');
        expect(group.getSubmatchCount()).toBe(0);
    });

    testMatcherInterface(() => new Pricker.Music.PatternGroup(
        'test',
        [new Pricker.Music.Pattern('2314567890E')],
    ));

    testPrintableMixinImplementation(
        () => new Pricker.Music.PatternGroup('test', [ ]),
    );

});
