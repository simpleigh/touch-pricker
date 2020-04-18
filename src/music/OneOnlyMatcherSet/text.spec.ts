/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import OneOnlyMatcherSet from '.';

describe('text template for OneOnlyMatcherSet music class', () => {

    it('displays nothing when nothing matches', () => {
        const matcher = new OneOnlyMatcherSet([]);
        expect(matcher.print('text')).toBe('');
    });

    it('displays matches by calling contained matchers', () => {
        const pattern1 = jasmine.createSpyObj('Pattern', ['print']);
        const pattern2 = jasmine.createSpyObj('Pattern', ['print']);

        pattern1.print.and.returnValue('test1');
        pattern2.print.and.returnValue('test2');
        const matcher = new OneOnlyMatcherSet([pattern1, pattern2]);

        expect(matcher.print('text')).toBe('test1test2');
        expect(pattern1.print).toHaveBeenCalled();
        expect(pattern2.print).toHaveBeenCalled();
    });

});
