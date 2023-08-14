/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import testAbstractMatcherImplementation from
    '../testAbstractMatcherImplementation';
import MatchType from '../MatchType';
import Pattern from '.';

describe('Pattern music class', () => {
    it('provides read access to the name', () => {
        const pattern = new Pattern('1234', 'test');
        expect(pattern.name).toBe('test');
    });

    it('uses the pattern as the name by default', () => {
        const pattern = new Pattern('1234');
        expect(pattern.name).toBe('1234');
    });

    it('can match the start of a row', () => {
        const pattern = new Pattern('1234', 'test', MatchType.Front);
        expect(pattern.match('12345678')).toBe(true);
    });

    it('can match the end of a row', () => {
        const pattern = new Pattern('5678', 'test', MatchType.Back);
        expect(pattern.match('12345678')).toBe(true);
    });

    it('matches the end of a row by default', () => {
        const pattern = new Pattern('5678');
        expect(pattern.match('12345678')).toBe(true);
    });

    it('knows if it is a wildcard match', () => {
        const pattern = new Pattern('5678', 'roll-up', MatchType.Back);
        expect(pattern.isWildcardMatch).toBe(true);
    });

    it('knows if it is not a wildcard match', () => {
        const pattern = new Pattern('12345678', 'Rounds', MatchType.Row);
        expect(pattern.isWildcardMatch).toBe(false);
    });

    it('is therefore a wildcard match by default', () => {
        const pattern = new Pattern('1234');
        expect(pattern.isWildcardMatch).toBe(true);
    });

    testAbstractMatcherImplementation(() => new Pattern('2314567890E', 'test'));
});
