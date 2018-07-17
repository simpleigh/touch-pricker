/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Pattern, PatternGroup } from '..';

describe('text template for PatternGroup music class', () => {

    it('displays nothing when nothing matches', () => {
        const group = new PatternGroup('group', [ ]);
        expect(group.print('text')).toBe('');
    });

    it('displays one match correctly', () => {
        const group = new PatternGroup(
            'group',
            [new Pattern('90E')],
        );

        group.match('2314567890E');
        expect(group.print('text')).toBe('1 group (1 90E)\n');
    });

    it('displays multiple matches correctly', () => {
        const group = new PatternGroup('group', [
            new Pattern('90E'),
            new Pattern('890E'),
        ]);

        group.match('2314567890E');
        expect(group.print('text')).toBe('2 group (1 90E, 1 890E)\n');
    });

    it('ignores unmatched patterns', () => {
        const group = new PatternGroup('group', [
            new Pattern('90E'),
            new Pattern('09E'),
        ]);

        group.match('2314567890E');
        expect(group.print('text')).toBe('1 group (1 90E)\n');
    });

    it('hides pattern counts if only the parent pattern matches', () => {
        const group = new PatternGroup(
            'group',
            [new Pattern('1234567890E')], // fail
            new Pattern('2314567890E'), // pass
        );

        group.match('2314567890E');
        expect(group.print('text')).toBe('1 group\n');
    });

});
