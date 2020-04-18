/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { testAbstractMatcherImplementation } from '../AbstractMatcher.spec';
import Pattern from '../Pattern';
import PatternGroup from '.';

describe('PatternGroup music class', () => {

    it('can match a row with any pattern', () => {
        const group = new PatternGroup('group', [
            new Pattern('1234567890E'), // fail
            new Pattern('2314567890E'), // pass
        ]);

        expect(group.match('2314567890E')).toBe(true);
    });

    it('combines match counts from patterns', () => {
        const group = new PatternGroup('group', [
            new Pattern('2314567890E'), // pass
            new Pattern('1234567890E'), // fail
            new Pattern('2314567890E'), // pass
        ]);

        group.match('2314567890E');
        expect(group.matchCount).toBe(2);
    });

    it('ignores changes to the original patterns', () => {
        const patterns: Pattern[] = [];
        const group = new PatternGroup('group', patterns);

        // We add a pattern to the array
        patterns.push(new Pattern('2314567890E'));

        // ... but it shouldn't be added to the group
        expect(group.patterns.length).toBe(0);
    });

    it('provides read access to the name', () => {
        const group = new PatternGroup('test', []);
        expect(group.name).toBe('test');
    });

    it('provides access to the patterns', () => {
        const patterns: Pattern[] = [new Pattern('2314567890E')];
        const group = new PatternGroup('test', patterns);

        expect(group.patterns).toEqual(patterns);
    });

    it('ignores changes to the returned pattern array', () => {
        const patterns: Pattern[] = [new Pattern('2314567890E')];
        const group = new PatternGroup('test', patterns);

        expect(group.patterns).not.toBe(patterns);

        patterns.pop();
        expect(group.patterns).not.toEqual(patterns);
    });

    it('can override the match count with a parent pattern', () => {
        const group = new PatternGroup(
            'group',
            [new Pattern('1234567890E')], // fail
            new Pattern('2314567890E'), // pass
        );

        group.match('2314567890E');
        expect(group.matchCount).toBe(1);
    });

    it('still allows access to the subpattern match count', () => {
        const group = new PatternGroup(
            'group',
            [new Pattern('1234567890E')], // fail
            new Pattern('2314567890E'), // pass
        );

        group.match('2314567890E');
        expect(group.submatchCount).toBe(0);
    });

    testAbstractMatcherImplementation(() => new PatternGroup(
        'test',
        [new Pattern('2314567890E')],
    ));

});
