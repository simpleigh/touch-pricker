/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../../functions.ts" />

describe('text template for PatternGroup music class', function () {

    it('displays nothing when nothing matches', function () {
        const group = new Pricker.Music.PatternGroup('group', [ ]);
        expect(group.print('text')).toBe('');
    });

    it('displays one match correctly', function () {
        const group = new Pricker.Music.PatternGroup(
                    'group',
                    [new Pricker.Music.Pattern('90E')],
                );

        group.match(createTestRow());
        expect(group.print('text')).toBe('1 group (1 90E)\n');
    });

    it('displays multiple matches correctly', function () {
        const group = new Pricker.Music.PatternGroup('group', [
                    new Pricker.Music.Pattern('90E'),
                    new Pricker.Music.Pattern('890E'),
                ]);

        group.match(createTestRow());
        expect(group.print('text')).toBe('2 group (1 90E, 1 890E)\n');
    });

    it('ignores unmatched patterns', function () {
        const group = new Pricker.Music.PatternGroup('group', [
                    new Pricker.Music.Pattern('90E'),
                    new Pricker.Music.Pattern('09E'),
                ]);

        group.match(createTestRow());
        expect(group.print('text')).toBe('1 group (1 90E)\n');
    });

    it('hides pattern counts if only the parent pattern matches', function () {
        const group = new Pricker.Music.PatternGroup(
                    'group',
                    [new Pricker.Music.Pattern('1234567890E')], // fail
                    new Pricker.Music.Pattern('2314567890E'), // pass
                );

        group.match(createTestRow());
        expect(group.print('text')).toBe('1 group\n');
    });

});
