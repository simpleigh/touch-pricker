/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Pattern from '.';
import { testAbstractMatcherImplementation } from '../AbstractMatcher.spec';
import MatchType from '../MatchType';

describe('Pattern music class', () => {

    it('uses the pattern as the name by default', () => {
        const pattern = new Pattern('231');
        expect(pattern.getName()).toBe('231');
    });

    it('can match the start of a row', () => {
        const pattern = new Pattern('231', 'test', MatchType.Front);
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('can match the end of a row', () => {
        const pattern = new Pattern('90E', 'test', MatchType.Back);
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('matches the end of a row by default', () => {
        const pattern = new Pattern('90E');
        expect(pattern.match('2314567890E')).toBe(true);
    });

    it('knows if it is a wildcard match', () => {
        const pattern = new Pattern('657890E', '65 rollup', MatchType.Back);
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    it('knows if it is not a wildcard match', () => {
        const pattern = new Pattern(
            '2314567890E',
            'Standard start sixend',
            MatchType.Row,
        );
        expect(pattern.isWildcardMatch()).toBe(false);
    });

    it('is therefore a wildcard match by default', () => {
        const pattern = new Pattern('231');
        expect(pattern.isWildcardMatch()).toBe(true);
    });

    testAbstractMatcherImplementation(() => new Pattern('2314567890E', 'test'));

});
