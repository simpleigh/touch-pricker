/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { CustomScheme } from '..';
import { Stage } from '../../rows';

describe('text template for AbstractScheme music class', () => {

    let scheme: CustomScheme;

    beforeEach(() => {
        scheme = new CustomScheme(Stage.Cinques);
    });

    it('displays nothing when nothing matches', () => {
        expect(scheme.print('text')).toBe('');
    });

    it('displays matches by calling contained matchers', () => {
        const pattern1 = jasmine.createSpyObj('Pattern', ['print']);
        const pattern2 = jasmine.createSpyObj('Pattern', ['print']);

        pattern1.print.and.returnValue('test1');
        pattern2.print.and.returnValue('test2');
        scheme.addMatcher(pattern1);
        scheme.addMatcher(pattern2);

        expect(scheme.print('text')).toBe('test1test2');
        expect(pattern1.print).toHaveBeenCalled();
        expect(pattern2.print).toHaveBeenCalled();
    });

});
