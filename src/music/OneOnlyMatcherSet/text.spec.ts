/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Pattern } from '..';
import OneOnlyMatcherSet from '.';

describe('text template for OneOnlyMatcherSet music class', () => {
    it('displays nothing when nothing matches', () => {
        const matcher = new OneOnlyMatcherSet([]);
        expect(matcher.print('text')).toBe('');
    });

    it('displays matches by calling contained matchers', () => {
        const pattern1 = new Pattern('');
        const pattern2 = new Pattern('');
        jest.spyOn(pattern1, 'print').mockReturnValue('test1');
        jest.spyOn(pattern2, 'print').mockReturnValue('test2');

        const matcher = new OneOnlyMatcherSet([pattern1, pattern2]);

        expect(matcher.print('text')).toBe('test1test2');
        expect(pattern1.print).toHaveBeenCalled();
        expect(pattern2.print).toHaveBeenCalled();
    });
});
